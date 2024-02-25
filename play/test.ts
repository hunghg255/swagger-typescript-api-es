import { generateApi, generateTemplates } from '../src';

const start = async () => {
  /* NOTE: all fields are optional expect one of `input`, `url`, `spec` */
  const r = await generateApi({
    name: 'MySuperbApi.ts',
    // set to `false` to prevent the tool from writing to disk
    output: './play',
    url: 'http://localhost:5002/api-json',
    httpClientType: 'axios',
  });
};

start();
