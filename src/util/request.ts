import { merge, startsWith } from 'lodash-es';
import { Agent, EnvHttpProxyAgent, fetch, type Dispatcher } from 'undici';

import type { RequestOptions } from '../types/config';
import type { Logger } from './logger';
import { isRecord } from './type-guards';

/** default timeout (ms) for downloading the swagger schema */
const DEFAULT_REQUEST_TIMEOUT = 60_000;

export interface DispatcherParams {
  url: string;
  disableStrictSSL?: boolean;
  disableProxy?: boolean;
}

export interface DownloadParams extends DispatcherParams, RequestOptions {
  authToken?: string;
}

/** config fields used by `Request` */
export interface RequestConfig {
  requestOptions?: RequestOptions | null;
}

class Request {
  config: RequestConfig;
  logger: Pick<Logger, 'warn'>;

  constructor(config: RequestConfig, logger: Pick<Logger, 'warn'>) {
    this.config = config;
    this.logger = logger;
  }

  /**
   * - by default `HTTP_PROXY` / `HTTPS_PROXY` / `NO_PROXY` env variables are respected
   * - `disableProxy` connects directly, ignoring those env variables
   * - `disableStrictSSL` skips TLS certificate validation (for https urls)
   * - a custom undici `dispatcher` in `requestOptions` replaces all of the above
   */
  createDispatcher({ url, disableStrictSSL, disableProxy }: DispatcherParams): Dispatcher {
    const tls =
      disableStrictSSL && !startsWith(url, 'http://') ? { rejectUnauthorized: false } : {};

    if (disableProxy) {
      return new Agent({ connect: tls });
    }

    // `requestTls` (tls options for the proxied request) is passed through to undici's ProxyAgent,
    // but it is missing in the EnvHttpProxyAgent options type
    return new EnvHttpProxyAgent({ connect: tls, requestTls: tls } as EnvHttpProxyAgent.Options);
  }

  /**
   * @returns downloaded text
   */
  async download({
    url,
    disableStrictSSL,
    disableProxy,
    authToken,
    ...options
  }: DownloadParams): Promise<string> {
    const requestOptions: RequestOptions = {};

    if (authToken) {
      requestOptions.headers = {
        Authorization: authToken,
      };
    }

    merge(requestOptions, options, this.config.requestOptions);

    const { timeout = DEFAULT_REQUEST_TIMEOUT, agent, ...fetchOptions } = requestOptions;

    if (agent) {
      this.logger.warn(
        '"requestOptions.agent" is not supported anymore, use an undici "dispatcher" instead'
      );
    }

    const ownDispatcher = fetchOptions.dispatcher
      ? null
      : this.createDispatcher({ url, disableStrictSSL, disableProxy });

    if (ownDispatcher) {
      fetchOptions.dispatcher = ownDispatcher;
    }

    const timeoutSignal = !fetchOptions.signal && timeout > 0 ? AbortSignal.timeout(timeout) : null;

    if (timeoutSignal) {
      fetchOptions.signal = timeoutSignal;
    }

    let response: Awaited<ReturnType<typeof fetch>>;
    let body: string;

    try {
      response = await fetch(url, fetchOptions);
      body = await response.text();
    } catch (error: unknown) {
      const errorRecord = isRecord(error) ? error : undefined;
      const cause = isRecord(errorRecord?.cause) ? errorRecord.cause : undefined;
      const isTimeout = !!timeoutSignal?.aborted || errorRecord?.name === 'TimeoutError';
      const reason = isTimeout
        ? `request timed out after ${timeout}ms`
        : cause?.message || errorRecord?.message || String(error);
      throw new Error(`Failed to fetch swagger schema from "${url}": ${reason}`);
    } finally {
      ownDispatcher?.destroy().catch(() => {});
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
