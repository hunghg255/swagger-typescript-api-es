import fs from 'node:fs';
import path from 'node:path';

import { cac } from 'cac';
import pc from 'picocolors';
import { loadConf, readConfig } from 'unreadconfig';

import { generateApi } from '.';
import { version } from '../package.json';
import { formatOptions } from './util/formatOptions';

const FILE_NAME_CONFIG = 'swagger-typescript-api';

const createCli = () =>
  cac('swagger-typescript-api-es')
    .version(version)
    .option('--u <url>', 'path/url to swagger scheme')
    .option('--o <output>', 'output path of typescript api file (default: "./")')
    .option('--n <name>', 'name of output typescript api file (default: "Api.ts")')
    .option('--t <templates>', 'path to folder containing templates')
    .option(
      '--d <default-as-success>',
      'use "default" response status code as success response too.'
    )
    .option(
      '--r <responses>',
      'generate additional information about request responses also add typings for bad responses (default: false)'
    )
    .option(
      '--union-enums <union-enums>',
      'generate all "enum" types as union types (T1 | T2 | TN) (default: false)'
    )
    .option('--add-readonly <add-readonly>', 'generate readonly properties (default: false)')
    .option(
      '--route-types <route-types>',
      'generate type definitions for API routes (default: false)'
    )
    .option('--noClient <noClient>', 'do not generate an API class')
    .option(
      '--enum-names-as-values <enum-names-as-values>',
      'use values in "x-enumNames" as enum values (not only as keys) (default: false)'
    )
    .option(
      '--extract-request-params <extract-request-params>',
      'extract request params to data contract (Also combine path params and query params into one object) (default: false)'
    )
    .option(
      '--extract-request-body <extract-request-body>',
      'extract request body type to data contract (default: false)'
    )
    .option(
      '--extract-response-body <extract-response-body>',
      'extract response body type to data contract (default: false)'
    )
    .option(
      '--extract-response-error <extract-response-error>',
      'extract response error type to data contract (default: false)'
    )
    .option(
      '--modular <modular>',
      'generate separated files for http client, data contracts, and routes (default: false)'
    )
    .option('--js <js>', 'generate js api module with declaration file (default: false)')
    .option(
      '--module-name-index <module-name-index>',
      'determines which path index should be used for routes separation (example: GET:/fruites/getFruit -> index:0 -> moduleName -> fruites) (default: 0)'
    )
    .option(
      '--module-name-first-tag <module-name-first-tag>',
      'splits routes based on the first tag (default: false)'
    )
    .option('--disableStrictSSL <disableStrictSSL>', 'disabled strict SSL (default: false)')
    .option('--disableProxy <disableProxy>', 'disabled proxy (default: false)')
    .option('--httpClientType <httpClientType>', 'generate axios http client (default: fetch)')
    .option(
      '--unwrap-response-data <unwrap-response-data>',
      'unwrap the data item from the response (default: false)'
    )
    .option(
      '--disable-throw-on-error <disable-throw-on-error>',
      'Do not throw an error when response.ok is not true (default: false)'
    )
    .option(
      '--single-http-client <single-http-client>',
      'Ability to send HttpClient instance to Api constructor (default: false)'
    )
    .option('--silent <silent>', 'Output only errors to console (default: false)')
    .option(
      '--default-response <default-response>',
      'default type for empty response schema (default: "void")'
    )
    .option('--type-prefix <type-prefix>', 'data contract name prefix (default: "")')
    .option('--type-suffix <type-suffix>', 'data contract name suffix (default: "")')
    .option(
      '--clean-output <clean-output>',
      'clean output folder before generate api. WARNING: May cause data loss (default: false)'
    )
    .option('--api-class-name <api-class-name>', 'name of the api class (default: "Api")')
    .option(
      '--patch <patch>',
      'fix up small errors in the swagger source definition (default: false)'
    )
    .option(
      '--debug <debug>',
      'additional information about processes inside this tool (default: false)'
    )
    .option(
      '--another-array-type <another-array-type>',
      'generate array types as Array<Type> (by default Type[]) (default: false)'
    )
    .option('--sort-types <sort-types>', 'sort fields and types (default: false)')
    .option('--sort-routes <sort-routes>', 'sort routes in alphabetical order (default: false)')
    .option(
      '--custom-config <custom-config>',
      'path to a config file (js/ts/json) with extra options: primitiveTypeConstructs, hooks, ... (default: "")'
    )
    .option(
      '--extract-enums',
      'extract all enums from inline interface\type content to typescript enum construction (default: false)'
    )
    .help();

/**
 * `unreadconfig` merges the loaded config into `{}`, so a config exporting an
 * array arrives as `{ 0: {...}, 1: {...} }`.
 */
const normalizeFileConfig = (config: any): Record<string, any> | Record<string, any>[] | null => {
  if (!config || typeof config !== 'object') {
    return null;
  }

  if (Array.isArray(config)) {
    return config;
  }

  if ('0' in config) {
    return Object.keys(config)
      .filter((key) => /^\d+$/.test(key))
      .sort((a, b) => Number(a) - Number(b))
      .map((key) => config[key]);
  }

  return config;
};

const loadCustomConfig = (customConfig: string) => {
  const configPath = path.resolve(process.cwd(), customConfig);

  if (!fs.existsSync(configPath)) {
    throw new Error(`custom config file "${configPath}" does not exist`);
  }

  const config: any = loadConf(configPath);

  if (!config || typeof config !== 'object' || Array.isArray(config)) {
    throw new Error(`custom config file "${configPath}" must export an object`);
  }

  return config;
};

/**
 * Config file (if present) < `--custom-config` file < CLI flags.
 */
export const resolveCliOptions = (args: Record<string, any>) => {
  const { customConfig, ...cliOptions } = formatOptions(args);
  const flags = customConfig ? { ...loadCustomConfig(customConfig), ...cliOptions } : cliOptions;
  const fileConfig = normalizeFileConfig(readConfig(FILE_NAME_CONFIG, { mustExist: true }));

  const options = Array.isArray(fileConfig)
    ? fileConfig.map((config) => ({ ...config, ...flags }))
    : { ...fileConfig, ...flags };

  const optionsList = Array.isArray(options) ? options : [options];

  if (
    optionsList.length === 0 ||
    optionsList.some((option) => !option.url && !option.input && !option.spec)
  ) {
    throw new Error(
      `missing swagger schema. Pass it with "--u <url>" or create a "${FILE_NAME_CONFIG}.config.ts" file`
    );
  }

  return options;
};

export async function startCli(argv: string[] = process.argv) {
  try {
    const cli = createCli();

    cli.command('').action(async (args) => {
      await generateApi(resolveCliOptions(args) as any);
    });

    cli.parse(argv, { run: false });
    // `run: false` + awaiting here, so rejections of the async action are caught below
    await cli.runMatchedCommand();
  } catch (error: any) {
    console.log(pc.red('❌ SWAGGER-TYPESCRIPT-API error: ' + (error?.message ?? error)));

    process.exit(1);
    return;
  }

  process.exit(0);
}
