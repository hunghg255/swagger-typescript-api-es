/* eslint-disable @typescript-eslint/no-unused-vars */
import { cac } from 'unprompts';
import { readConfig } from 'unreadconfig';

import { generateApi } from '~src/index';
import { formatOptions } from '~src/util/formatOptions';

import { version } from '../package.json';

const cli = cac('swagger-typescript-api-es');

const COLORS = {
  black: '\u001B[30m',
  red: '\u001B[31m',
  green: '\u001B[32m',
  yellow: '\u001B[33m',
  blue: '\u001B[34m',
  magenta: '\u001B[35m',
  cyan: '\u001B[36m',
  white: '\u001B[37m',
  console_color: '\u001B[0m',
} as const;

const colorConsoleText = (text: string, color: keyof typeof COLORS) => {
  const coloredText = `${COLORS[color]}${text}${COLORS.console_color}`;
  return console.log(coloredText);
};

const FILE_NAME_CONFIG = 'swagger-typescript-api';

cli
  .version(version)
  .option('--u <url>', 'path/url to swagger scheme')
  .option('--o <output>', 'output path of typescript api file (default: "./")')
  .option('--n <name>', 'name of output typescript api file (default: "Api.ts")')
  .option('--t <templates>', 'path to folder containing templates')
  .option('--d <default-as-success>', 'use "default" response status code as success response too.')
  .option(
    '--r <responses>',
    'generate additional information about request responses also add typings for bad responses (default: false)',
  )
  .option(
    '--union-enums <union-enums>',
    'generate all "enum" types as union types (T1 | T2 | TN) (default: false)',
  )
  .option('--add-readonly <add-readonly>', 'generate readonly properties (default: false)')
  .option(
    '--route-types <route-types>',
    'generate type definitions for API routes (default: false)',
  )
  .option('--noClient <noClient>', 'do not generate an API class')
  .option(
    '--enum-names-as-values <enum-names-as-values>',
    'use values in "x-enumNames" as enum values (not only as keys) (default: false)',
  )
  .option(
    '--extract-request-params <extract-request-params>',
    'extract request params to data contract (Also combine path params and query params into one object) (default: false)',
  )
  .option(
    '--extract-request-body <extract-request-body>',
    'extract request body type to data contract (default: false)',
  )
  .option(
    '--extract-response-body <extract-response-body>',
    'extract response body type to data contract (default: false)',
  )
  .option(
    '--extract-response-error <extract-response-error>',
    'extract response error type to data contract (default: false)',
  )
  .option(
    '--modular <modular>',
    'generate separated files for http client, data contracts, and routes (default: false)',
  )
  .option('--js <js>', 'generate js api module with declaration file (default: false)')
  .option(
    '--module-name-index <module-name-index>',
    'determines which path index should be used for routes separation (example: GET:/fruites/getFruit -> index:0 -> moduleName -> fruites) (default: 0)',
  )
  .option(
    '--module-name-first-tag <module-name-first-tag>',
    'splits routes based on the first tag (default: false)',
  )
  .option('--disableStrictSSL <disableStrictSSL>', 'disabled strict SSL (default: false)')
  .option('--disableProxy <disableProxy>', 'disabled proxy (default: false)')
  .option('--httpClientType <httpClientType>', 'generate axios http client (default: fetch)')
  .option(
    '--unwrap-response-data <unwrap-response-data>',
    'unwrap the data item from the response (default: false)',
  )
  .option(
    '--disable-throw-on-error <disable-throw-on-error>',
    'Do not throw an error when response.ok is not true (default: false)',
  )
  .option(
    '--single-http-client <single-http-client>',
    'Ability to send HttpClient instance to Api constructor (default: false)',
  )
  .option('--silent <silent>', 'Output only errors to console (default: false)')
  .option(
    '--default-response <default-response>',
    'default type for empty response schema (default: "void")',
  )
  .option('--type-prefix <type-prefix>', 'data contract name prefix (default: "")')
  .option('--type-suffix <type-suffix>', 'data contract name suffix (default: "")')
  .option(
    '--clean-output <clean-output>',
    'clean output folder before generate api. WARNING: May cause data loss (default: false)',
  )
  .option('--api-class-name <api-class-name>', 'name of the api class (default: "Api")')
  .option(
    '--patch <patch>',
    'fix up small errors in the swagger source definition (default: false)',
  )
  .option(
    '--debug <debug>',
    'additional information about processes inside this tool (default: false)',
  )
  .option(
    '--another-array-type <another-array-type>',
    'generate array types as Array<Type> (by default Type[]) (default: false)',
  )
  .option('--sort-types <sort-types>', 'sort fields and types (default: false)')
  .option('--sort-routes <sort-routes>', 'sort routes in alphabetical order (default: false)')
  .option(
    '--custom-config <custom-config>',
    'custom config: primitiveTypeConstructs, hooks, ...  (default: "")',
  )
  .option(
    '--extract-enums',
    'extract all enums from inline interface\type content to typescript enum construction (default: false)',
  )
  .help();

export function startCli() {
  try {
    cli.command('').action((args) => {
      let optionsConfig = args;

      optionsConfig =
        Object.keys(optionsConfig).length <= 1
          ? readConfig(FILE_NAME_CONFIG)
          : formatOptions(optionsConfig);

      console.log({
        args,
      });

      generateApi(optionsConfig);
    });

    cli.parse();
  } catch (error: any) {
    colorConsoleText('❌ SWAGGER-TYPESCRIPT-API error: ' + error.message, 'red');
  }
}
