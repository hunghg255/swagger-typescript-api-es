import { generateApi } from '../src';

const start = async () => {
  /* NOTE: all fields are optional expect one of `input`, `url`, `spec` */
  const r = await generateApi({
    name: 'MySuperbApi.ts',
    output: './play',
    url: 'http://localhost:5002/api-json',
    httpClientType: 'axios',
  });
};

start();
