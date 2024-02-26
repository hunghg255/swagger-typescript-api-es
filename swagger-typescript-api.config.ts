import { defaultConfig } from './src/index';

export default defaultConfig({
  name: 'api-axios.ts',
  output: './play',
  url: 'http://localhost:5002/api-json',
  httpClientType: 'axios',
});
