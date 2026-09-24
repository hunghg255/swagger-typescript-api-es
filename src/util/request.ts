import https from 'node:https';

import { merge, startsWith } from 'lodash-es';
// @ts-ignore
import nodeFetch from 'node-fetch-h2';

/** default timeout (ms) for downloading the swagger schema */
const DEFAULT_REQUEST_TIMEOUT = 60_000;

class Request {
  /**
   * @type {CodeGenConfig}
   */
  config;
  /**
   * @type {Logger}
   */
  logger;

  constructor(config: any, logger: any) {
    this.config = config;
    this.logger = logger;
  }

  /**
   *
   * @param url {string}
   * @param disableStrictSSL
   * @param authToken
   * @param options {Partial<RequestInit> & { timeout?: number }}
   * @return {Promise<string>}
   */
  async download({
    url,
    disableStrictSSL,
    authToken,
    // accepted for compatibility: neither the global fetch nor node-fetch use HTTP(S)_PROXY,
    // so the schema is always downloaded without a proxy
    disableProxy: _disableProxy,
    ...options
  }: any) {
    const requestOptions: any = {};

    if (disableStrictSSL && !startsWith(url, 'http://')) {
      requestOptions.agent = new https.Agent({
        rejectUnauthorized: false,
      });
    }
    if (authToken) {
      requestOptions.headers = {
        Authorization: authToken,
      };
    }

    merge(requestOptions, options, this.config.requestOptions);

    const { timeout = DEFAULT_REQUEST_TIMEOUT, ...fetchOptions } = requestOptions;

    const timeoutSignal = !fetchOptions.signal && timeout > 0 ? AbortSignal.timeout(timeout) : null;

    if (timeoutSignal) {
      fetchOptions.signal = timeoutSignal;
    }

    // The global fetch (undici) doesn't support node http(s) agents, which are needed
    // for `disableStrictSSL` (or a custom `requestOptions.agent`)
    const fetchFn =
      fetchOptions.agent || typeof globalThis.fetch !== 'function' ? nodeFetch : globalThis.fetch;

    let response: any;
    let body: string;

    try {
      response = await fetchFn(url, fetchOptions);
      body = await response.text();
    } catch (error: any) {
      const isTimeout =
        !!timeoutSignal?.aborted ||
        error?.name === 'TimeoutError' ||
        error?.type === 'request-timeout';
      const reason = isTimeout
        ? `request timed out after ${timeout}ms`
        : error?.cause?.message || error?.message || String(error);
      throw new Error(`Failed to fetch swagger schema from "${url}": ${reason}`);
    }

    if (!response.ok) {
      throw new Error(
        `Failed to fetch swagger schema from "${url}": server responded with ${response.status} ${response.statusText || ''}`.trimEnd()
      );
    }

    return body;
  }
}

export { Request };
