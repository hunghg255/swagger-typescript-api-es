import { createRequire } from 'node:module';
import path, { resolve } from 'node:path';

import * as Eta from 'eta';
import type { EtaConfig } from 'eta';
import { endsWith, lowerCase, reduce, replace, startsWith } from 'lodash-es';

import type { CodeGenConfig } from './configuration';
import { TEMPLATES_DIR } from './constants';
import { PrettyError } from './errors';
import type { TemplateInfo, TemplatePaths } from './types/config';
import type { FileSystem } from './util/file-system';
import type { Logger } from './util/logger';
import { isRecord } from './util/type-guards';

/** options of `Eta.render` */
export type TemplateRenderOptions = Partial<EtaConfig>;

/** template to read: by `path`, or by `fileName` from the templates folders */
export interface GetTemplateParams {
  fileName?: string;
  /** template name (for logs) */
  name?: string;
  path?: string;
}

/** code generation process fields used by `TemplatesWorker` */
export interface TemplatesWorkerDeps {
  config: CodeGenConfig;
  logger: Pick<Logger, 'log' | 'warn'>;
  fileSystem: Pick<FileSystem, 'getFileContent' | 'pathIsExist'>;
  /** base template data (`utils`, `config`) */
  getRenderTemplateData: () => object;
}

/** `require` for an ESM-only package (works from sources and from `dist`) */
const packageRequire = createRequire(import.meta.url);

class TemplatesWorker {
  config: CodeGenConfig;

  logger: TemplatesWorkerDeps['logger'];

  fileSystem: TemplatesWorkerDeps['fileSystem'];

  getRenderTemplateData: TemplatesWorkerDeps['getRenderTemplateData'];

  constructor({ config, logger, fileSystem, getRenderTemplateData }: TemplatesWorkerDeps) {
    this.config = config;
    this.logger = logger;
    this.fileSystem = fileSystem;
    this.getRenderTemplateData = getRenderTemplateData;
  }

  getTemplatePaths = (config: Pick<CodeGenConfig, 'modular' | 'templates'>): TemplatePaths => {
    const baseTemplatesPath = resolve(TEMPLATES_DIR, 'base');

    // e.g. the library was bundled and its templates were not copied next to it:
    // fail loudly instead of generating empty files
    if (!this.fileSystem.pathIsExist(baseTemplatesPath)) {
      throw new PrettyError(
        `Built-in templates were not found in "${TEMPLATES_DIR}". If swagger-typescript-api-es is bundled, mark it as an external package so its "templates" folder stays next to the code.`
      );
    }
    const defaultTemplatesPath = resolve(TEMPLATES_DIR, 'default');
    const modularTemplatesPath = resolve(TEMPLATES_DIR, 'modular');
    const originalTemplatesPath = config.modular ? modularTemplatesPath : defaultTemplatesPath;
    const customTemplatesPath =
      (config.templates && resolve(process.cwd(), config.templates)) || null;

    return {
      /** `templates/base` */
      base: baseTemplatesPath,
      /** `templates/default` */
      default: defaultTemplatesPath,
      /** `templates/modular` */
      modular: modularTemplatesPath,
      /** usage path if `--templates` option is not set */
      original: originalTemplatesPath,
      /** custom path to templates (`--templates`) */
      custom: customTemplatesPath,
    };
  };

  cropExtension = (path: string) =>
    this.config.templateExtensions.reduce(
      (path, ext) => (endsWith(path, ext) ? path.replace(ext, '') : path),
      path
    );

  getTemplateFullPath = (path: string, fileName: string) => {
    const raw = resolve(path, './', this.cropExtension(fileName));
    const pathVariants = this.config.templateExtensions.map((extension) => `${raw}${extension}`);

    return pathVariants.find((variant) => !!this.fileSystem.pathIsExist(variant));
  };

  /** `require` available in templates */
  requireFnFromTemplate = (packageOrPath: string): unknown => {
    const isPath = startsWith(packageOrPath, './') || startsWith(packageOrPath, '../');

    if (isPath) {
      return packageRequire(
        path.resolve(
          this.config.templatePaths.custom || this.config.templatePaths.original,
          packageOrPath
        )
      );
    }

    // resolve packages from the user's project first, then from this package
    try {
      return createRequire(resolve(process.cwd(), 'noop.js'))(packageOrPath);
    } catch (error: unknown) {
      if (!isRecord(error) || error.code !== 'MODULE_NOT_FOUND') {
        throw error;
      }

      return packageRequire(packageOrPath);
    }
  };

  /**
   * @returns template content (`null` / `undefined` if it is not found)
   */
  getTemplate = ({ fileName, name, path }: GetTemplateParams): string | null | undefined => {
    const { templatePaths } = this.config;

    if (path) {
      return this.fileSystem.getFileContent(path);
    }

    if (!fileName) {
      return '';
    }

    const customFullPath =
      templatePaths.custom && this.getTemplateFullPath(templatePaths.custom, fileName);
    let fileContent = customFullPath && this.fileSystem.getFileContent(customFullPath);

    if (fileContent) {
      this.logger.log(`"${lowerCase(name)}" template found in "${templatePaths.custom}"`);
      return fileContent;
    }

    const baseFullPath = this.getTemplateFullPath(templatePaths.base, fileName);

    if (baseFullPath) {
      fileContent = this.fileSystem.getFileContent(baseFullPath);
    } else if (templatePaths.custom) {
      this.logger.warn(
        `"${lowerCase(name)}" template not found in "${templatePaths.custom}"`,
        '\nCode generator will use the default template'
      );
    } else {
      this.logger.log(`Code generator will use the default template for "${lowerCase(name)}"`);
    }

    const originalFullPath = this.getTemplateFullPath(templatePaths.original, fileName);

    if (originalFullPath) {
      fileContent = this.fileSystem.getFileContent(originalFullPath);
    }

    return fileContent;
  };

  /**
   * @returns Record<templateName, templateContent>
   */
  getTemplates = ({
    templatePaths,
  }: Pick<CodeGenConfig, 'templatePaths'>): Record<string, string | null | undefined> => {
    if (templatePaths.custom) {
      this.logger.log(`try to read templates from directory "${templatePaths.custom}"`);
    }

    return reduce<TemplateInfo, Record<string, string | null | undefined>>(
      this.config.templateInfos,
      (acc, { fileName, name }) => ({
        ...acc,
        [name]: this.getTemplate({ fileName, name }),
      }),
      {}
    );
  };

  findTemplateWithExt = (path: string) => {
    const raw = this.cropExtension(path);
    const pathVariants = this.config.templateExtensions.map((extension) => `${raw}${extension}`);
    return pathVariants.find((variant) => this.fileSystem.pathIsExist(variant));
  };

  /**
   * Reads a template included from another template (`includeFile("@base/route-docs", data)`).
   * `@base`, `@default`, `@modular`, `@original` and `@custom` prefixes are replaced with the template paths.
   */
  getTemplateContent = (path: string) => {
    const templatePaths: Record<string, string | null | undefined> = this.config.templatePaths;
    const foundTemplatePathKey = Object.keys(templatePaths).find((key) =>
      startsWith(path, `@${key}`)
    );

    const rawPath = resolve(
      replace(
        path,
        `@${foundTemplatePathKey}`,
        // `String()`: the same conversion as the one of `String.prototype.replace` (`"undefined"`, `"null"`)
        String(templatePaths[`${foundTemplatePathKey}`])
      )
    );
    const fixedPath = this.findTemplateWithExt(rawPath);

    if (fixedPath) {
      return this.fileSystem.getFileContent(fixedPath);
    }

    const customPath =
      this.config.templatePaths.custom &&
      this.findTemplateWithExt(resolve(this.config.templatePaths.custom, path));

    if (customPath) {
      return this.fileSystem.getFileContent(customPath);
    }

    const originalPath = this.findTemplateWithExt(
      resolve(this.config.templatePaths.original, path)
    );

    if (originalPath) {
      return this.fileSystem.getFileContent(originalPath);
    }

    return '';
  };

  /**
   * Renders a template (synchronously) with the base template data (`utils`, `config`) and `configuration`.
   */
  renderTemplate = (
    template: string | undefined | null,
    configuration: object = {},
    options?: TemplateRenderOptions
  ): string => {
    if (!template) {
      return '';
    }
    return Eta.render(
      template,
      {
        ...this.getRenderTemplateData(),
        ...configuration,
      },
      {
        async: false,
        ...options,
        includeFile: (path: string, configuration?: object, options?: TemplateRenderOptions) => {
          return this.renderTemplate(this.getTemplateContent(path), configuration, options);
        },
      }
    );
  };
}

export { TemplatesWorker };
