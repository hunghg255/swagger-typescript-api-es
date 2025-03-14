/* eslint-disable indent */
/* eslint-disable unicorn/consistent-destructuring */
/* eslint-disable new-cap */
/* eslint-disable unicorn/no-null */
import {
  camelCase,
  compact,
  each,
  get,
  isEmpty,
  isObject,
  isString,
  isUndefined,
  join,
  lowerCase,
  map,
  merge,
  noop,
  replace,
  size,
  sortBy,
  uniq,
  upperCase,
  values,
} from 'lodash-es';
import pc from 'picocolors';
import ts from 'typescript';

import { CodeFormatter } from './code-formatter';
import { CodeGenConfig } from './configuration.js';
import { SchemaComponentsMap } from './schema-components-map.js';
import { SchemaParserFabric } from './schema-parser/schema-parser-fabric';
import { SchemaRoutes } from './schema-routes/schema-routes.js';
import { SchemaWalker } from './schema-walker';
import { SwaggerSchemaResolver } from './swagger-schema-resolver.js';
import { TemplatesWorker } from './templates-worker';
import { JavascriptTranslator } from './translators/javascript';
import { TypeNameFormatter } from './type-name-formatter.js';
import { IOptions } from './types';
import { FileSystem } from './util/file-system';
import { internalCase } from './util/internal-case';
import { Logger } from './util/logger.js';
import { NameResolver } from './util/name-resolver';
import { pascalCase } from './util/pascal-case';
import { sortByProperty } from './util/sort-by-property';

const PATCHABLE_INSTANCES = [
  'schemaWalker',
  'swaggerSchemaResolver',
  'schemaComponentsMap',
  'typeNameFormatter',
  'templatesWorker',
  'codeFormatter',
  'schemaParserFabric',
  'schemaRoutes',
  'javascriptTranslator',
];

class CodeGenProcess {
  /** @type {CodeGenConfig} */
  config;
  /** @type {SwaggerSchemaResolver} */
  swaggerSchemaResolver;
  /** @type {SchemaComponentsMap} */
  schemaComponentsMap;
  /** @type {Logger} */
  logger;
  /** @type {TypeNameFormatter} */
  typeNameFormatter;
  /** @type {SchemaParserFabric} */
  schemaParserFabric;
  /** @type {SchemaRoutes} */
  schemaRoutes;
  /** @type {FileSystem} */
  fileSystem;
  /** @type {CodeFormatter} */
  codeFormatter;
  /** type {TemplatesWorker} */
  templatesWorker: any;
  /** @type {SchemaWalker} */
  schemaWalker;
  /** @type {JavascriptTranslator} */
  javascriptTranslator;

  /**
   *
   * @param config {Partial<import("../index.d.ts").GenerateApiConfiguration['config']>}
   */
  constructor(config: IOptions) {
    this.config = new CodeGenConfig(config);
    this.logger = new Logger(this);
    this.fileSystem = new FileSystem(this);
    this.schemaWalker = new SchemaWalker(this);
    this.swaggerSchemaResolver = new SwaggerSchemaResolver(this);
    this.schemaComponentsMap = new SchemaComponentsMap(this);
    this.typeNameFormatter = new TypeNameFormatter(this);
    this.templatesWorker = new TemplatesWorker(this);
    this.codeFormatter = new CodeFormatter(this);
    this.schemaParserFabric = new SchemaParserFabric(this);
    this.schemaRoutes = new SchemaRoutes(this);
    this.javascriptTranslator = new JavascriptTranslator(this);
    this.config.componentTypeNameResolver.logger = this.logger;
  }

  async start() {
    this.config.update({
      templatePaths: this.templatesWorker.getTemplatePaths(this.config),
    });
    this.config.update({
      templatesToRender: this.templatesWorker.getTemplates(this.config),
    });

    const swagger: any = await this.swaggerSchemaResolver.create();

    this.swaggerSchemaResolver.fixSwaggerSchema(swagger);

    this.config.update({
      swaggerSchema: swagger.usageSchema,
      originalSchema: swagger.originalSchema,
    });

    this.schemaWalker.addSchema('$usage', swagger.usageSchema);
    this.schemaWalker.addSchema('$original', swagger.originalSchema);

    this.logger.event('Start generating your typescript api');

    this.config.update(this.config.hooks.onInit(this.config, this) || this.config);

    this.schemaComponentsMap.clear();

    each(swagger.usageSchema.components, (component, componentName) =>
      each(component, (rawTypeData, typeName) => {
        this.schemaComponentsMap.createComponent(
          this.schemaComponentsMap.createRef(['components', componentName, typeName]),
          rawTypeData,
        );
      }),
    );

    /**
     * @type {SchemaComponent[]}
     */
    const componentsToParse = this.schemaComponentsMap.filter(
      compact(['schemas', this.config.extractResponses && 'responses']),
    );

    const parsedSchemas = componentsToParse.map((schemaComponent: any) => {
      const parsed = this.schemaParserFabric.parseSchema(
        schemaComponent.rawTypeData,
        schemaComponent.typeName,
      );
      schemaComponent.typeData = parsed;
      return parsed;
    });

    this.schemaRoutes.attachSchema({
      usageSchema: swagger.usageSchema,
      parsedSchemas,
    });

    const rawConfiguration = {
      apiConfig: this.createApiConfig(swagger.usageSchema),
      config: this.config,
      modelTypes: this.collectModelTypes(),
      hasSecurityRoutes: this.schemaRoutes.hasSecurityRoutes,
      hasQueryRoutes: this.schemaRoutes.hasQueryRoutes,
      hasFormDataRoutes: this.schemaRoutes.hasFormDataRoutes,
      generateResponses: this.config.generateResponses,
      routes: this.schemaRoutes.getGroupedRoutes(),
      extraTemplates: this.config.extraTemplates,
      fileName: this.config.fileName,
      translateToJavaScript: this.config.toJS,
      customTranslator: this.config.customTranslator
        ? new this.config.customTranslator(this)
        : null,
      utils: this.getRenderTemplateData().utils,
    };

    const configuration = this.config.hooks.onPrepareConfig(rawConfiguration) || rawConfiguration;

    if (this.fileSystem.pathIsExist(this.config.output)) {
      if (this.config.cleanOutput) {
        this.logger.debug(`Cleaning dir ${this.config.output}`);
        this.fileSystem.cleanDir(this.config.output);
      }
    } else {
      this.logger.debug(`Path ${this.config.output} is not exist. creating dir by this path`);
      this.fileSystem.createDir(this.config.output);
    }

    const files = await this.generateOutputFiles({
      configuration,
    });

    const isDirPath = this.fileSystem.pathIsDir(this.config.output);

    if (isDirPath) {
      for (const file of files) {
        this.fileSystem.createFile({
          path: this.config.output,
          fileName: `${file.fileName}${file.fileExtension}`,
          content: file.fileContent,
          withPrefix: true,
        });

        this.logger.success(
          'API file',
          pc.green(`"${file.fileName}${file.fileExtension}"`),
          `created in ${pc.green(this.config.output)}`,
        );
      }
    }

    return {
      files,
      configuration,
      getTemplate: this.templatesWorker.getTemplate,
      renderTemplate: this.templatesWorker.renderTemplate,
      createFile: this.fileSystem.createFile,
      formatTSContent: this.codeFormatter.formatCode,
    };
  }

  getRenderTemplateData = () => {
    return {
      utils: {
        Ts: this.config.Ts,
        formatDescription: this.schemaParserFabric.schemaFormatters.formatDescription,
        internalCase,
        classNameCase: pascalCase,
        pascalCase,
        getInlineParseContent: this.schemaParserFabric.getInlineParseContent,
        getParseContent: this.schemaParserFabric.getParseContent,
        getComponentByRef: this.schemaComponentsMap.get,
        parseSchema: this.schemaParserFabric.parseSchema,
        checkAndAddNull: this.schemaParserFabric.schemaUtils.safeAddNullToType,
        safeAddNullToType: this.schemaParserFabric.schemaUtils.safeAddNullToType,
        isNeedToAddNull: this.schemaParserFabric.schemaUtils.isNullMissingInType,
        inlineExtraFormatters: this.schemaParserFabric.schemaFormatters.inline,
        formatters: this.schemaParserFabric.schemaFormatters.base,
        formatModelName: this.typeNameFormatter.format,
        fmtToJSDocLine: function fmtToJSDocLine(line: any, { eol = true }) {
          return ` * ${line}${eol ? '\n' : ''}`;
        },
        NameResolver,
        _: {
          compact,
          merge,
          each,
          isEmpty,
          sortByProperty,
          noop,
          isObject,
          isString,
          isUndefined,
          map,
          uniq,
          size,
          replace,
          camelCase,
          lowerCase,
          values,
          join,
          get,
          upperCase,
          sortBy,
        },
        require: this.templatesWorker.requireFnFromTemplate,
      },
      config: this.config,
    };
  };

  collectModelTypes = () => {
    const components = this.schemaComponentsMap.getComponents();
    let modelTypes = [];

    const modelTypeComponents = compact(['schemas', this.config.extractResponses && 'responses']);

    const getSchemaComponentsCount = () =>
      this.schemaComponentsMap.filter(...modelTypeComponents).length;

    let schemaComponentsCount = getSchemaComponentsCount();
    let processedCount = 0;

    while (processedCount < schemaComponentsCount) {
      modelTypes = [];
      processedCount = 0;
      for (const component of components) {
        if (modelTypeComponents.includes((component as any).componentName)) {
          const modelType = this.prepareModelType(component);
          if (modelType) {
            modelTypes.push(modelType);
          }
          processedCount++;
        }
      }
      schemaComponentsCount = getSchemaComponentsCount();
    }

    if (this.config.sortTypes) {
      return modelTypes.sort(sortByProperty('name'));
    }

    return modelTypes;
  };

  prepareModelType = (typeInfo: any) => {
    if (typeInfo.$prepared) {
      return typeInfo.$prepared;
    }

    if (!typeInfo.typeData) {
      typeInfo.typeData = this.schemaParserFabric.parseSchema(
        typeInfo.rawTypeData,
        typeInfo.typeName,
      );
    }
    const rawTypeData = typeInfo.typeData;
    const typeData = this.schemaParserFabric.schemaFormatters.base[rawTypeData.type]
      ? this.schemaParserFabric.schemaFormatters.base[rawTypeData.type](rawTypeData)
      : rawTypeData;
    const { typeIdentifier, name: originalName, content, description } = typeData;
    // @ts-ignore
    const name = this.typeNameFormatter.format(originalName);

    if (name === null) {
      return null;
    }

    const preparedModelType = {
      ...typeData,
      typeIdentifier,
      name,
      description,
      $content: rawTypeData.content,
      rawContent: rawTypeData.content,
      content,
      typeData,
    };

    typeInfo.$prepared = preparedModelType;

    return preparedModelType;
  };

  /**
   *
   * @param configuration
   * @returns {Promise<TranslatorIO[]>}
   */
  generateOutputFiles = async ({ configuration }: any) => {
    const { modular, templatesToRender } = this.config;

    const output = modular
      ? await this.createMultipleFileInfos(templatesToRender, configuration)
      : await this.createSingleFileInfo(templatesToRender, configuration);

    if (!isEmpty(configuration.extraTemplates)) {
      for (const extraTemplate of configuration.extraTemplates) {
        // @ts-ignore
        const content = this.templatesWorker.renderTemplate(
          this.fileSystem.getFileContent(extraTemplate.path),
          configuration,
        );

        output.push(
          ...(await this.createOutputFileInfo(configuration, extraTemplate.name, content)),
        );
      }
    }

    return output.filter((fileInfo: any) => !!fileInfo && !!fileInfo.fileContent);
  };

  /**
   * @param templatesToRender
   * @param configuration
   * @returns {Promise<TranslatorIO[]>}
   */
  createMultipleFileInfos = async (templatesToRender: any, configuration: any) => {
    const { routes } = configuration;
    const { fileNames, generateRouteTypes, generateClient } = configuration.config;
    /**
     * @type {TranslatorIO[]}
     */
    const modularApiFileInfos = [];

    if (routes.$outOfModule) {
      if (generateRouteTypes) {
        // @ts-ignore
        const outOfModuleRouteContent = this.templatesWorker.renderTemplate(
          templatesToRender.routeTypes,
          {
            ...configuration,
            route: configuration.routes.$outOfModule,
          },
        );

        modularApiFileInfos.push(
          ...(await this.createOutputFileInfo(
            configuration,
            fileNames.outOfModuleApi,
            outOfModuleRouteContent,
          )),
        );
      }
      if (generateClient) {
        // @ts-ignore
        const outOfModuleApiContent = this.templatesWorker.renderTemplate(templatesToRender.api, {
          ...configuration,
          route: configuration.routes.$outOfModule,
        });

        modularApiFileInfos.push(
          ...(await this.createOutputFileInfo(
            configuration,
            fileNames.outOfModuleApi,
            outOfModuleApiContent,
          )),
        );
      }
    }

    if (routes.combined) {
      for (const route of routes.combined) {
        if (generateRouteTypes) {
          // @ts-ignore
          const routeModuleContent = this.templatesWorker.renderTemplate(
            templatesToRender.routeTypes,
            {
              ...configuration,
              route,
            },
          );

          modularApiFileInfos.push(
            ...(await this.createOutputFileInfo(
              configuration,
              pascalCase(`${route.moduleName}_Route`),
              routeModuleContent,
            )),
          );
        }

        if (generateClient) {
          // @ts-ignore
          const apiModuleContent = this.templatesWorker.renderTemplate(templatesToRender.api, {
            ...configuration,
            route,
          });

          modularApiFileInfos.push(
            ...(await this.createOutputFileInfo(
              configuration,
              pascalCase(route.moduleName),
              apiModuleContent,
            )),
          );
        }
      }
    }

    return [
      ...(await this.createOutputFileInfo(
        configuration,
        fileNames.dataContracts,
        // @ts-ignore
        this.templatesWorker.renderTemplate(templatesToRender.dataContracts, configuration),
      )),
      ...(generateClient
        ? await this.createOutputFileInfo(
            configuration,
            fileNames.httpClient,
            // @ts-ignore
            this.templatesWorker.renderTemplate(templatesToRender.httpClient, configuration),
          )
        : []),
      ...modularApiFileInfos,
    ];
  };

  /**
   *
   * @param templatesToRender
   * @param configuration
   * @returns {Promise<TranslatorIO[]>}
   */
  createSingleFileInfo = (templatesToRender: any, configuration: any) => {
    const { generateRouteTypes, generateClient } = configuration.config;

    return this.createOutputFileInfo(
      configuration,
      configuration.fileName,
      compact([
        this.templatesWorker.renderTemplate(templatesToRender.dataContracts, configuration),
        generateRouteTypes &&
          this.templatesWorker.renderTemplate(templatesToRender.routeTypes, configuration),
        generateClient &&
          this.templatesWorker.renderTemplate(templatesToRender.httpClient, configuration),
        generateClient && this.templatesWorker.renderTemplate(templatesToRender.api, configuration),
      ]).join('\n'),
    );
  };

  /**
   *
   * @param configuration
   * @param fileNameFull
   * @param content
   * @returns {Promise<TranslatorIO[]>}
   */
  createOutputFileInfo = async (configuration: any, fileNameFull: any, content: any) => {
    const fileName = this.fileSystem.cropExtension(fileNameFull);
    const fileExtension = ts.Extension.Ts;

    if (configuration.translateToJavaScript) {
      this.logger.debug('Using js translator for', fileName);
      return await this.javascriptTranslator.translate({
        fileName,
        fileExtension,
        fileContent: content,
      });
    }

    if (configuration.customTranslator) {
      this.logger.debug('Using custom translator for', fileName);
      return await configuration.customTranslator.translate({
        fileName,
        fileExtension,
        fileContent: content,
      });
    }

    this.logger.debug('Generating output for', `${fileName}${fileExtension}`);

    return [
      {
        fileName,
        fileExtension,
        fileContent: await this.codeFormatter.formatCode(content),
      },
    ];
  };

  createApiConfig = (swaggerSchema: any) => {
    const { info, servers, host, basePath, externalDocs, tags } = swaggerSchema;
    const server = (servers && servers[0]) || { url: '' };
    const { title = 'No title', version } = info || {};
    const { url: serverUrl } = server;

    return {
      info: info || {},
      servers: servers || [],
      basePath,
      host,
      externalDocs: merge(
        {
          url: '',
          description: '',
        },
        externalDocs,
      ),
      tags: compact(tags),
      baseUrl: serverUrl,
      title,
      version,
    };
  };

  injectClassInstance = (key: any, value: any) => {
    // @ts-ignore
    this[key] = value;
    for (const instanceKey of PATCHABLE_INSTANCES) {
      // @ts-ignore
      if (instanceKey !== key && key in this[instanceKey]) {
        // @ts-ignore
        this[instanceKey][key] = value;
      }
    }
  };
}

export { CodeGenProcess };
