import https from 'node:https';

import merge from 'lodash/merge';
import startsWith from 'lodash/startsWith';
// @ts-ignore
import fetch from 'node-fetch-h2';

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
   * @param options {Partial<import("node-fetch").RequestInit>}
   * @return {Promise<string>}
   */
  async download({ url, disableStrictSSL, authToken, ...options }: any) {
    /**
     * @type {Partial<import("node-fetch").RequestInit>}
     */
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

    try {
      const response = await fetch(url, requestOptions);
      return await response.text();
    } catch (error) {
      const message = `error while fetching data from URL "${url}"`;
      // @ts-ignore
      this.logger.error(message, 'response' in error ? error.response : error);
      return message;
    }
  }
}

export { Request };
