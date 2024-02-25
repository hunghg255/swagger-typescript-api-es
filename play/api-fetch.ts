/* eslint-disable */
/*
 * ----------------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API-ES            ##
 * ## SOURCE: https://github.com/hunghg255/swagger-typescript-api-es   ##
 * ----------------------------------------------------------------------
 */

export interface Post {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface GetPostsDtoRes {
  posts: Post;
  current_page: number;
  total_page: number;
  page_size: number;
  total: number;
}

export interface CreatePostsDtoReq {
  title: string;
  description: string;
  /** @example ["Html"] */
  tags?: string[];
}

export interface LoginDtoReq {
  /** @example "admin" */
  username: string;
}

export interface LoginDtoRes {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenDtoReq {
  refreshToken: string;
}

export interface RefreshTokenDtoRes {
  accessToken: string;
  refreshToken: string;
}

export interface GalleriesRes {
  id: string;
  imageUrl: string;
  description: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string' ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
        },
        signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
        body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Agiletech test
 * @version 1.0
 * @contact
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: 'GET',
      ...params,
    });

  posts = {
    /**
     * @description Get tags
     *
     * @tags Posts
     * @name Tags
     * @summary Get tags
     * @request GET:/posts/tags
     * @secure
     */
    tags: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/posts/tags`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description Get post
     *
     * @tags Posts
     * @name Posts
     * @summary Get posts
     * @request GET:/posts
     * @secure
     */
    posts: (
      query?: {
        /** @example "1" */
        page?: string;
        /** @example "title" */
        title?: string;
        /** @example "Html" */
        tags?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, GetPostsDtoRes>({
        path: `/posts`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Create new post
     *
     * @tags Posts
     * @name CraetePosts
     * @summary Create new post
     * @request POST:/posts
     * @secure
     */
    craetePosts: (data: CreatePostsDtoReq, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/posts`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Edit post
     *
     * @tags Posts
     * @name EditPosts
     * @summary Edit post
     * @request PATCH:/posts/{postId}
     * @secure
     */
    editPosts: (postId: any, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/posts/${postId}`,
        method: 'PATCH',
        secure: true,
        ...params,
      }),

    /**
     * @description Delete post
     *
     * @tags Posts
     * @name DeletePost
     * @summary Delete post
     * @request DELETE:/posts/{postId}
     * @secure
     */
    deletePost: (postId: any, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/posts/${postId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
  auth = {
    /**
     * @description Account: admin, admin1, admin2, adminRefresh, adminRefresh1, adminRefresh2
     *
     * @tags Auth
     * @name Login
     * @summary Login
     * @request POST:/auth/login
     */
    login: (data: LoginDtoReq, params: RequestParams = {}) =>
      this.request<any, LoginDtoRes>({
        path: `/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name RefreshToken
     * @summary Refresh token
     * @request POST:/auth/refresh-token
     */
    refreshToken: (data: RefreshTokenDtoReq, params: RequestParams = {}) =>
      this.request<any, RefreshTokenDtoRes>({
        path: `/auth/refresh-token`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name Logout
     * @summary Logout
     * @request DELETE:/auth/logout
     * @secure
     */
    logout: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/logout`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
  galleries = {
    /**
     * No description
     *
     * @tags Galleries
     * @name Galleries
     * @summary Get galleries
     * @request GET:/galleries
     */
    galleries: (params: RequestParams = {}) =>
      this.request<GalleriesRes, any>({
        path: `/galleries`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
}
