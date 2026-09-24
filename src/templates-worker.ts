import { createRequire } from 'node:module';
import path, { resolve } from 'node:path';

import * as Eta from 'eta';
import { endsWith, keys, lowerCase, reduce, replace, startsWith } from 'lodash-es';

import { TEMPLATES_DIR } from './constants';

/** `require` for an ESM-only package (works from sources and from `dist`) */
const packageRequire = createRequire(import.meta.url);

class TemplatesWorker {
  /**
   * @type {CodeGenConfig}
   */
  config;

  /**
   * @type {Logger}
   */
  logger;

  /**
   * @type {FileSystem}
   */
  fileSystem;

  getRenderTemplateData;

  constructor({ config, logger, fileSystem, getRenderTemplateData }: any) {
    this.config = config;
    this.logger = logger;
    this.fileSystem = fileSystem;
    this.getRenderTemplateData = getRenderTemplateData;
  }

  /**
   *
   * @param config {CodeGenConfig}
   * @returns {CodeGenConfig.templatePaths}
   */
  getTemplatePaths = (config: any) => {
    const baseTemplatesPath = resolve(TEMPLATES_DIR, 'base');
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

  cropExtension = (path: any) =>
    this.config.templateExtensions.reduce(
      (path: any, ext: any) => (endsWith(path, ext) ? path.replace(ext, '') : path),
      path
    );

  getTemplateFullPath = (path: any, fileName: any) => {
    const raw = resolve(path, './', this.cropExtension(fileName));
    const pathVariants = this.config.templateExtensions.map(
      (extension: any) => `${raw}${extension}`
    );

    return pathVariants.find((variant: any) => !!this.fileSystem.pathIsExist(variant));
  };

  requireFnFromTemplate = (packageOrPath: any) => {
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
    } catch (error: any) {
      if (error?.code !== 'MODULE_NOT_FOUND') {
        throw error;
      }

      return packageRequire(packageOrPath);
    }
  };

  getTemplate = ({ fileName, name, path }: any) => {
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

  getTemplates = ({ templatePaths }: any) => {
    if (templatePaths.custom) {
      this.logger.log(`try to read templates from directory "${templatePaths.custom}"`);
    }

    return reduce(
      this.config.templateInfos,
      (acc, { fileName, name }) => ({
        ...acc,
        [name]: this.getTemplate({ fileName, name }),
      }),
      {}
    );
  };

  findTemplateWithExt = (path: any) => {
    const raw = this.cropExtension(path);
    const pathVariants = this.config.templateExtensions.map(
      (extension: any) => `${raw}${extension}`
    );
    return pathVariants.find((variant: any) => this.fileSystem.pathIsExist(variant));
  };

  getTemplateContent = (path: any) => {
    const foundTemplatePathKey: any = keys(this.config.templatePaths).find((key) =>
      startsWith(path, `@${key}`)
    );

    const rawPath = resolve(
      replace(path, `@${foundTemplatePathKey}`, this.config.templatePaths[foundTemplatePathKey])
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
   * @param template
   * @param configuration
   * @param options
   * @returns {Promise<string|string|void>}
   */
  renderTemplate = (template: string, configuration: any, options: any) => {
    if (!template) {
      return '';
    }
    // @ts-ignore
    return Eta.render(
      template,
      {
        ...this.getRenderTemplateData(),
        ...configuration,
      },
      {
        async: false,
        ...options,
        includeFile: (path: any, configuration: any, options: any) => {
          return this.renderTemplate(this.getTemplateContent(path), configuration, options);
        },
      }
    );
  };
}

export { TemplatesWorker };
