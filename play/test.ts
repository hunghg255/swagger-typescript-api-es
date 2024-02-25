import { generateApi } from '../src';

const start = async () => {
  /* NOTE: all fields are optional expect one of `input`, `url`, `spec` */
  const r = await generateApi({
    name: 'api-axios.ts',
    output: './play',
    url: 'http://localhost:5002/api-json',
    httpClientType: 'axios',
  });

  const r1 = await generateApi({
    name: 'api-fetch.ts',
    output: './play',
    url: 'http://localhost:5002/api-json',
    httpClientType: 'fetch',
  });

  const r2 = await generateApi({
    name: 'api-types.ts',
    output: './play',
    url: 'http://localhost:5002/api-json',
    generateClient: false,
  });
};

start();
