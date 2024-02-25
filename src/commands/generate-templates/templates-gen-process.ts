/* eslint-disable quotes */
import path from 'node:path';

import { TemplatesGenConfig } from '~src/commands/generate-templates/configuration';
import { __dirname_esm } from '~src/constants';
import { GenerateTemplatesParams } from '~src/types';
import { FileSystem } from '~src/util/file-system';
import { Logger } from '~src/util/logger';

class TemplatesGenProcess {
  /**
   * @type {TemplatesGenConfig}
   */
  config;
  /**
   * @type {FileSystem}
   */
  fileSystem;
  /**
   * @type {Logger}
   */
  logger;

  rootDir = path.resolve(__dirname_esm, '../../../');

  paths = {
    baseTemplates: 'templates/base',
    httpClientTemplates: 'templates/base/http-clients',
    moduleApiTemplates: 'templates/modular',
    defaultApiTemplates: 'templates/default',
  };

  importTemplatePrefixes = ['@base', '@modular', '@default'];

  constructor(config: GenerateTemplatesParams) {
    this.config = new TemplatesGenConfig(config);
    this.logger = new Logger(this);
    this.fileSystem = new FileSystem(this);
  }

  /**
   * @return {Promise<GenerateTemplatesOutput>}
   */
  start() {
    this.logger.event('start generating source templates ".ejs" for code generator');

    const templates = this.getTemplates();

    if (this.config.output) {
      this.logger.log('preparing output directory for source templates');
      const outputPath = path.resolve(process.cwd(), this.config.output);

      if (this.fileSystem.pathIsExist(outputPath)) {
        if (this.config.cleanOutput) {
          this.fileSystem.cleanDir(outputPath);
        }
      } else {
        this.fileSystem.createDir(outputPath);
      }

      for (const template of templates) {
        const templateName = this.fileSystem.cropExtension(template.name);
        const templateEjsPath = path.resolve(outputPath, `${templateName}.ejs`);
        const templateEtaPath = path.resolve(outputPath, `${templateName}.eta`);
        const templateEjsPathExist = this.fileSystem.pathIsExist(templateEjsPath);
        const templateEtaPathExist = this.fileSystem.pathIsExist(templateEtaPath);

        const templateNotExist = !templateEjsPathExist && !templateEtaPathExist;

        if (templateNotExist) {
          this.fileSystem.createFile({
            path: outputPath,
            fileName: template.name,
            content: template.content,
            withPrefix: false,
          });
        } else if (this.config.rewrite) {
          if (templateEjsPathExist) {
            this.fileSystem.createFile({
              path: outputPath,
              fileName: `${templateName}.ejs`,
              content: template.content,
              withPrefix: false,
            });
          } else if (templateEtaPathExist) {
            this.fileSystem.createFile({
              path: outputPath,
              fileName: `${templateName}.eta`,
              content: template.content,
              withPrefix: false,
            });
          }
        }
      }

      this.logger.success(`source templates has been successfully created in "${outputPath}"`);
    }

    return {
      files: templates,
      configuration: this.config,
      createFile: this.fileSystem.createFile,
    };
  }

  getTemplates = () => {
    const outputFiles = [];
    const baseTemplates = this.getTemplateNamesFromDir(this.paths.baseTemplates);
    const httpClientTemplates = this.getTemplateNamesFromDir(this.paths.httpClientTemplates);
    const apiTemplatesPath = this.config.modular
      ? this.paths.moduleApiTemplates
      : this.paths.defaultApiTemplates;
    const apiTemplates = this.getTemplateNamesFromDir(apiTemplatesPath);

    const usingHttpClientTemplate = httpClientTemplates.find((template: any) =>
      template.startsWith(`${this.config.httpClientType}-`),
    );

    let httpClientTemplateContent = '';

    if (usingHttpClientTemplate) {
      httpClientTemplateContent = this.fixTemplateContent(
        this.getTemplateContent(`${this.paths.httpClientTemplates}/${usingHttpClientTemplate}`),
      );
    }

    for (const fileName of baseTemplates) {
      const templateContent =
        (fileName === 'http-client.ejs' && httpClientTemplateContent) ||
        this.fixTemplateContent(this.getTemplateContent(`${this.paths.baseTemplates}/${fileName}`));

      outputFiles.push({
        name: fileName,
        content: templateContent,
      });
    }

    for (const fileName of apiTemplates) {
      outputFiles.push({
        name: fileName,
        content: this.fixTemplateContent(
          this.getTemplateContent(`${apiTemplatesPath}/${fileName}`),
        ),
      });
    }

    return outputFiles;
  };

  fixTemplateContent = (content: any) => {
    // includeFile("@base/
    const importsRegExp1 = new RegExp(
      `includeFile\\("(${this.importTemplatePrefixes.map((v) => `(${v})`).join('|')})/`,
      'g',
    );
    // includeFile(`@base/
    const importsRegExp2 = new RegExp(
      `includeFile\\(\`(${this.importTemplatePrefixes.map((v) => `(${v})`).join('|')})/`,
      'g',
    );
    // includeFile('@base/
    const importsRegExp3 = new RegExp(
      `includeFile\\('(${this.importTemplatePrefixes.map((v) => `(${v})`).join('|')})/`,
      'g',
    );

    return content
      .replace(importsRegExp1, 'includeFile("./')
      .replace(importsRegExp2, 'includeFile(`./')
      .replace(importsRegExp3, "includeFile('./");
  };

  getTemplateNamesFromDir = (dir: any) => {
    return this.fileSystem
      .readDir(path.resolve(this.rootDir, dir))
      .filter((file: any) => file.endsWith('.ejs'));
  };

  getTemplateContent = (pathToFile: any) => {
    return this.fileSystem.getFileContent(path.resolve(this.rootDir, pathToFile));
  };
}

export { TemplatesGenProcess };
