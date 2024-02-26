import { defaultConfig } from './src/index';

export default defaultConfig({
  name: 'api-axios-config.ts',
  output: './play',
  url: 'http://localhost:5002/api-json',
  httpClientType: 'axios',
});
