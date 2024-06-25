/* eslint-disable */
/*
 * ----------------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API-ES            ##
 * ## SOURCE: https://github.com/hunghg255/swagger-typescript-api-es   ##
 * ----------------------------------------------------------------------
 */

export interface HealthcheckRes {
  message: string;
}

export interface ValidationErrorResponse {
  /** @example 400 */
  statusCode: number;
  /** @example ["[field name] must be a string","[field name] should not be empty","[field name] must be an email","..."] */
  message: string[];
  /** @example "Bad Request" */
  error: string;
}

export interface UnauthorizedResponse {
  /** @example 401 */
  statusCode: number;
  /** @example "Unauthorized" */
  message: string;
  /** @example "Unauthorized" */
  error: string;
}

export interface ForbiddenResponse {
  /** @example 403 */
  statusCode: number;
  /** @example "Forbidden" */
  message: string;
  /** @example "Forbidden" */
  error: string;
}

export interface NotFoundResponse {
  /** @example 404 */
  statusCode: number;
  /** @example "Not Found" */
  message: string;
  /** @example "Not Found" */
  error: string;
}

export interface InternalServerErrorResponse {
  /** @example 500 */
  statusCode: number;
  /** @example "Internal Server Error" */
  message: string;
  /** @example "Internal Server Error" */
  error: string;
}

export interface UserResgisterDTO {
  /**
   * Wallet address of the user
   * @example "0x1234567890123456789012345678901234567890"
   */
  walletAddress: string;
  /**
   * Recommender code of the user
   * @example "ABC123"
   */
  recommenderCode: string;
}

export interface DiscordInfoDto {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: string | null;
  accent_color: number | null;
  global_name: string;
  avatar_decoration_data: string | null;
  banner_color: string | null;
  clan: string | null;
  mfa_enabled: boolean;
  locale: string;
  premium_type: number;
  email: string;
  verified: boolean;
}

export interface UserDto {
  /** @example "uuid-value" */
  id: string;
  /** @example "user@example.com" */
  email?: string;
  /** @example "John Doe" */
  name?: string;
  /** @example "This is my bio" */
  bio?: string;
  /** @example {"key":"value"} */
  xInfo?: object;
  discordInfo?: DiscordInfoDto;
  /** @example "https://example.com/avatar.jpg" */
  avatar?: string;
  /** @example "0x1234567890123456789012345678901234567890" */
  walletId: string;
  /** @example "AAB123" */
  referralCode?: string;
  /** @example "AAB123/AAB124/AAB125/AAB126" */
  path: string;
  /** @example "AAB123" */
  recommenderCode?: string;
  /** @example "uuid-value" */
  recommenderId?: string;
  /**
   * @format date-time
   * @example "2022-01-01T00:00:00.000Z"
   */
  createdAt: string;
  /**
   * @format date-time
   * @example "2022-01-01T00:00:00.000Z"
   */
  updatedAt: string;
  /**
   * @format date-time
   * @example "2022-01-01T00:00:00.000Z"
   */
  deletedAt?: string;
}

export interface ConnectWalletRepsonse {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}

export interface GetRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}

export interface GetInfoResponse {
  user: UserDto;
}

export interface UpdateUserDTO {
  /** bio of the user */
  bio?: string;
}

export interface UpdateProfileResponse {
  user: UserDto;
}

export type CreateUserDto = object;

export type UpdateUserDto = object;

export interface ResponseGetLinkDiscord {
  /** @example "`https://discord.com/api/oauth2/xxxxx" */
  url: string;
}

export interface ResponseDisconnectDiscord {
  /** @example 200 */
  statusCode: number;
  /** @example "Success" */
  message: string;
}

export interface ResponseGetLinkX {
  /** @example "https://api.twitter.com/oauth/xxxxx" */
  url: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;

  instance?: AxiosInstance;
  injectHeaders?: (data: any) => any;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;
  private injectHeaders?: (data: any) => any;

  constructor({
    securityWorker,
    secure,
    format,
    instance,
    injectHeaders,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance =
      instance ?? axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
    this.injectHeaders = injectHeaders;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T, _E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    let headers = {
      ...(requestParams.headers || {}),
      ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
    };

    if (this.injectHeaders) {
      headers = await this.injectHeaders(headers);
    }

    return this.instance.request({
      ...requestParams,
      headers,
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Backend API
 * @version 1.0
 * @contact
 *
 * The Backend API description1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  healthcheck = {
    /**
     * No description
     *
     * @tags /healthcheck
     * @name HealthcheckControllerGetHealthCheck
     * @request GET:/healthcheck
     */
    healthcheckControllerGetHealthCheck: (params: RequestParams = {}) =>
      this.request<HealthcheckRes, any>({
        path: `/healthcheck`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  sms = {
    /**
     * No description
     *
     * @tags sms
     * @name SmsControllerSendSms
     * @request POST:/sms
     */
    smsControllerSendSms: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sms`,
        method: 'POST',
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerConnectAccountByWallet
     * @request POST:/auth/connect-wallet
     */
    authControllerConnectAccountByWallet: (data: UserResgisterDTO, params: RequestParams = {}) =>
      this.request<
        ConnectWalletRepsonse,
        | ValidationErrorResponse
        | UnauthorizedResponse
        | ForbiddenResponse
        | NotFoundResponse
        | InternalServerErrorResponse
      >({
        path: `/auth/connect-wallet`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerGetRefreshToken
     * @request GET:/auth/refresh-token
     * @secure
     */
    authControllerGetRefreshToken: (params: RequestParams = {}) =>
      this.request<
        GetRefreshTokenResponse,
        | ValidationErrorResponse
        | UnauthorizedResponse
        | ForbiddenResponse
        | NotFoundResponse
        | InternalServerErrorResponse
      >({
        path: `/auth/refresh-token`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerGetInfo
     * @request GET:/auth/me
     * @secure
     */
    authControllerGetInfo: (params: RequestParams = {}) =>
      this.request<
        GetInfoResponse,
        | ValidationErrorResponse
        | UnauthorizedResponse
        | ForbiddenResponse
        | NotFoundResponse
        | InternalServerErrorResponse
      >({
        path: `/auth/me`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerUpdate
     * @request PATCH:/auth/update-profile
     * @secure
     */
    authControllerUpdate: (data: UpdateUserDTO, params: RequestParams = {}) =>
      this.request<
        UpdateProfileResponse,
        | ValidationErrorResponse
        | UnauthorizedResponse
        | ForbiddenResponse
        | NotFoundResponse
        | InternalServerErrorResponse
      >({
        path: `/auth/update-profile`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @name UserControllerCreate
     * @request POST:/user
     */
    userControllerCreate: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerFindAll
     * @request GET:/user
     */
    userControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerFindOne
     * @request GET:/user/{id}
     */
    userControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/${id}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerUpdate
     * @request PATCH:/user/{id}
     */
    userControllerUpdate: (id: string, data: UpdateUserDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerRemove
     * @request DELETE:/user/{id}
     */
    userControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/${id}`,
        method: 'DELETE',
        ...params,
      }),
  };
  discord = {
    /**
     * No description
     *
     * @tags discord
     * @name DiscordControllerConnect
     * @request GET:/discord/connect
     * @secure
     */
    discordControllerConnect: (params: RequestParams = {}) =>
      this.request<
        ResponseGetLinkDiscord,
        | ValidationErrorResponse
        | UnauthorizedResponse
        | ForbiddenResponse
        | NotFoundResponse
        | InternalServerErrorResponse
      >({
        path: `/discord/connect`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags discord
     * @name DiscordControllerCallback
     * @request GET:/discord/callback
     */
    discordControllerCallback: (
      query: {
        code: string;
        state: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | ValidationErrorResponse
        | UnauthorizedResponse
        | ForbiddenResponse
        | NotFoundResponse
        | InternalServerErrorResponse
      >({
        path: `/discord/callback`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags discord
     * @name DiscordControllerDisconnect
     * @request GET:/discord/disconnect
     * @secure
     */
    discordControllerDisconnect: (params: RequestParams = {}) =>
      this.request<
        ResponseDisconnectDiscord,
        | ValidationErrorResponse
        | UnauthorizedResponse
        | ForbiddenResponse
        | NotFoundResponse
        | InternalServerErrorResponse
      >({
        path: `/discord/disconnect`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  x = {
    /**
     * No description
     *
     * @tags x
     * @name XControllerConnectTwitter
     * @request GET:/x/connect
     * @secure
     */
    xControllerConnectTwitter: (params: RequestParams = {}) =>
      this.request<ResponseGetLinkX, any>({
        path: `/x/connect`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags x
     * @name XControllerTwitterCallback
     * @request GET:/x/callback
     */
    xControllerTwitterCallback: (
      query: {
        oauth_verifier: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/x/callback`,
        method: 'GET',
        query: query,
        ...params,
      }),
  };
}
