/* eslint-disable */
/*
 * ----------------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API-ES            ##
 * ## SOURCE: https://github.com/hunghg255/swagger-typescript-api-es   ##
 * ----------------------------------------------------------------------
 */

export interface HelloResponseDto {
  /**
   * Greeting message
   * @example "Hello from Auth!"
   */
  message: string;
  /**
   * Response timestamp in ISO format
   * @format date-time
   * @example "2025-02-23T10:30:00.000Z"
   */
  timestamp?: string;
  /**
   * Request ID for tracing
   * @format uuid
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  requestId?: string;
}

/** Service health status */
export enum HealthStatus {
  Ok = 'ok',
  Error = 'error',
  Degraded = 'degraded',
}

export interface HealthResponseDto {
  /**
   * Service health status
   * @example "ok"
   */
  status: HealthStatus;
  /**
   * Current timestamp in ISO format
   * @format date-time
   * @example "2025-02-23T10:30:00.000Z"
   */
  timestamp: string;
  /**
   * Service name
   * @example "auth"
   */
  service?: string;
  /**
   * Service version
   * @example "1.0.0"
   */
  version?: string;
  /**
   * Server uptime in seconds
   * @format int64
   */
  uptime?: number;
}

export interface UserResponseDto {
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  id: string;
  /** @example "John Doe" */
  name: string | null;
  /** @example "user@example.com" */
  email: string | null;
  /** @example "+84901234567" */
  phone: string | null;
  /** @example "https://cdn.example.com/avatar.jpg" */
  avatar: string | null;
  /** @example "vi" */
  language: string | null;
  /** @example false */
  verified: boolean;
  /** @example "2024-02-24T12:00:00.000Z" */
  created_at: string | null;
}

export interface AuthResponseDto {
  /**
   * JWT access token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  access_token: string;
  /**
   * JWT refresh token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  refresh_token: string;
  /**
   * Token type
   * @example "Bearer"
   */
  token_type: string;
  /**
   * Access token expiration in seconds
   * @example 3600
   */
  expires_in: number;
  user: UserResponseDto;
  /**
   * Whether user must set password after OAuth login
   * @example true
   */
  requires_password_setup: boolean;
}

export interface UnverifiedAuthResponseDto {
  user: UserResponseDto;
  /** @example true */
  requires_verification: boolean;
}

export interface SignUpDto {
  /**
   * Email address or phone number
   * @example "user@example.com"
   */
  identifier: string;
  /**
   * @minLength 8
   * @example "StrongPass123!"
   */
  password: string;
}

export interface SignUpResponseDto {
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  userId: string;
  /** @example "user@example.com" */
  identifier: string;
  /** @example "OTP sent" */
  message: string;
}

export interface SendOtpDto {
  /**
   * Email address or phone number
   * @example "user@example.com"
   */
  identifier: string;
}

export interface VerifyOtpDto {
  /**
   * Email or phone number
   * @example "user@example.com"
   */
  target: string;
  /**
   * 6-digit OTP code
   * @example "123456"
   */
  code: string;
}

export interface ForgotPasswordDto {
  /**
   * Email address or phone number
   * @example "user@example.com"
   */
  identifier: string;
}

export interface ForgotPasswordResponseDto {
  /**
   * The identity (email or phone) the OTP was sent to
   * @example "user@example.com"
   */
  identifier: string;
  /**
   * OTP expiry duration in seconds
   * @example 300
   */
  expires_in: number;
}

export interface ResetPasswordDto {
  /**
   * Email address or phone number
   * @example "user@example.com"
   */
  target: string;
  /**
   * 6-digit OTP code
   * @example "123456"
   */
  otp: string;
  /**
   * New password (min 8 chars, must include uppercase, lowercase, number, and special character)
   * @example "NewSecurePass123!"
   */
  new_password: string;
}

export interface SetPasswordDto {
  /**
   * Password to set for accounts without password
   * @minLength 8
   * @example "SecurePass123!"
   */
  password: string;
}

export interface SignInDto {
  /**
   * Email address or phone number
   * @example "user@example.com"
   */
  identifier: string;
  /**
   * User password
   * @example "SecurePass123!"
   */
  password: string;
}

export interface RefreshTokenDto {
  /** JWT refresh token */
  refresh_token: string;
}

export interface TokenResponseDto {
  /**
   * JWT access token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  access_token: string;
  /**
   * JWT refresh token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  refresh_token: string;
  /**
   * Token type
   * @example "Bearer"
   */
  token_type: string;
  /**
   * Access token expiration in seconds
   * @example 3600
   */
  expires_in: number;
}

export interface UpdateProfileMultipartDto {
  /** @example "John Doe" */
  name?: string;
  /** @example "+84901234567" */
  phone?: string;
  /**
   * Avatar image (jpeg, png, webp, avif — max 20MB)
   * @format binary
   */
  avatar?: File;
}

export interface UpdateProfileResponseDto {
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  id: string;
  /** @example "John Doe" */
  name: string | null;
  /** @example "user@example.com" */
  email: string | null;
  /** @example "+84901234567" */
  phone: string | null;
  /** @example "https://cdn.example.com/avatar.jpg" */
  avatar: string | null;
  /** @example "vi" */
  language: string | null;
  /** @example "2024-02-24T12:00:00.000Z" */
  created_at: string | null;
}

export interface UpdatePreferencesDto {
  /** @example "vi" */
  language: 'vi' | 'en';
}

export interface PreferencesResponseDto {
  language: 'vi' | 'en';
}

export interface DeleteAccountPasswordDto {
  /**
   * Current account password for identity confirmation
   * @example "SecurePass123!"
   */
  password: string;
}

export interface OAuthVerifyDto {
  /**
   * Token from OAuth provider (id_token for Google, access_token for Facebook)
   * @example "eyJhbGciOiJSUzI1NiIs..."
   */
  access_token: string;
}

export interface CmsSignInDto {
  /** @example "admin@example.com" */
  email: string;
  /** @example "StrongPassword123!" */
  password: string;
}

export interface CmsAdminDto {
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  id: string;
  /** @example "admin@example.com" */
  email: string;
  /** @example "Super Admin" */
  name?: string | null;
  /** @example ["SUPER_ADMIN","CONTENT_MANAGER"] */
  roles: string[];
  /** @example ["landmark:create","landmark:delete","category:read"] */
  permissions: string[];
}

export interface CmsAuthResponseDto {
  /** @example "eyJhbGciOiJSUzI1NiJ9..." */
  access_token: string;
  /** @example "eyJhbGciOiJSUzI1NiJ9..." */
  refresh_token: string;
  /** @example "Bearer" */
  token_type: string;
  /** @example 3600 */
  expires_in: number;
  admin: CmsAdminDto;
}

export interface CmsRefreshTokenDto {
  /** @example "eyJhbGciOiJSUzI1NiJ9..." */
  refresh_token: string;
}

export interface CreateRoleDto {
  /** @example "content_reviewer" */
  name: string;
  /** @example "Can review and approve content" */
  description?: string;
  /**
   * List of admin_permission IDs to assign
   * @example ["perm-landmark-read","perm-landmark-publish"]
   */
  permission_ids: string[];
}

export interface PermissionDto {
  /** @example "perm-landmark-create" */
  id: string;
  /** @example "landmark:create" */
  name: string;
  /** @example "Create a landmark" */
  description?: string | null;
  /** @example "landmark" */
  group: string;
}

export interface RoleResponseDto {
  /** @example "role-super-admin" */
  id: string;
  /** @example "super_admin" */
  name: string;
  /** @example "Full access to all CMS features" */
  description?: string | null;
  /** @example true */
  is_system: boolean;
  permissions: PermissionDto[];
  /** @example "2026-01-01T00:00:00.000Z" */
  created_at: string;
}

export interface UpdateRoleDto {
  /** @example "Updated description" */
  description?: string;
  /**
   * Full replacement list of admin_permission IDs
   * @example ["perm-landmark-read","perm-landmark-publish"]
   */
  permission_ids?: string[];
}

export interface AppUserDto {
  /** @example "uuid-..." */
  id: string;
  /** @example "Nguyễn Văn A" */
  name?: string | null;
  /** @example "user@example.com" */
  email?: string | null;
  /** @example "0901234567" */
  phone?: string | null;
  /** @example true */
  is_active: boolean;
  /** @example true */
  verified: boolean;
  /** @example "2026-01-01T00:00:00.000Z" */
  created_at: string;
}

export interface AppUserListResponseDto {
  data: AppUserDto[];
  /** @example 100 */
  total: number;
  /** @example 1 */
  page: number;
  /** @example 20 */
  limit: number;
}

export interface AssignRoleDto {
  /**
   * Full replacement list of role IDs to assign to the admin user
   * @example ["role-super-admin","role-editor"]
   */
  role_ids: string[];
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
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export const ContentType = {
  Json: 'application/json',
  FormData: 'multipart/form-data',
  UrlEncoded: 'application/x-www-form-urlencoded',
  Text: 'text/plain',
} as const;

export type ContentType = (typeof ContentType)[keyof typeof ContentType];

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = 'https://api.heritage360.xyz/api';
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
          : this.addQueryParam(query, key)
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
              : `${property}`
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
      }
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
 * @title AUTH API
 * @version 1.0.0
 * @baseUrl https://api.heritage360.xyz/api
 * @contact
 *
 * API documentation for auth service
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  v1 = {
    /**
     * No description
     *
     * @tags Auth
     * @name AppControllerGetHelloV1
     * @summary Health check endpoint
     * @request GET:/v1/auth
     */
    appControllerGetHelloV1: (params: RequestParams = {}) =>
      this.request<HelloResponseDto, any>({
        path: `/v1/auth`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AppControllerHealthCheckV1
     * @summary Health check
     * @request GET:/v1/auth/health
     */
    appControllerHealthCheckV1: (params: RequestParams = {}) =>
      this.request<HealthResponseDto, any>({
        path: `/v1/auth/health`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthControllerSignUpV1
     * @summary Register a new user
     * @request POST:/v1/auth/signup
     */
    authControllerSignUpV1: (data: SignUpDto, params: RequestParams = {}) =>
      this.request<SignUpResponseDto, void>({
        path: `/v1/auth/signup`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthControllerResendSignUpOtpV1
     * @summary Resend sign-up OTP to email or phone
     * @request POST:/v1/auth/otp/send
     */
    authControllerResendSignUpOtpV1: (data: SendOtpDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/v1/auth/otp/send`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthControllerVerifyOtpV1
     * @summary Verify sign-up OTP code
     * @request POST:/v1/auth/otp/verify
     */
    authControllerVerifyOtpV1: (data: VerifyOtpDto, params: RequestParams = {}) =>
      this.request<AuthResponseDto, void>({
        path: `/v1/auth/otp/verify`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthControllerForgotPasswordV1
     * @summary Send OTP to email or phone for password reset
     * @request POST:/v1/auth/forgot-password
     */
    authControllerForgotPasswordV1: (data: ForgotPasswordDto, params: RequestParams = {}) =>
      this.request<ForgotPasswordResponseDto, void>({
        path: `/v1/auth/forgot-password`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthControllerResetPasswordV1
     * @summary Reset password using OTP
     * @request POST:/v1/auth/reset-password
     */
    authControllerResetPasswordV1: (data: ResetPasswordDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/v1/auth/reset-password`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthControllerSetPasswordV1
     * @summary Set password for account that does not have one yet
     * @request POST:/v1/auth/set-password
     * @secure
     */
    authControllerSetPasswordV1: (data: SetPasswordDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/v1/auth/set-password`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthControllerLoginV1
     * @summary Login with email/phone and password
     * @request POST:/v1/auth/login
     */
    authControllerLoginV1: (data: SignInDto, params: RequestParams = {}) =>
      this.request<AuthResponseDto | UnverifiedAuthResponseDto, void>({
        path: `/v1/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthControllerRefreshV1
     * @summary Refresh access token using refresh token
     * @request POST:/v1/auth/refresh
     */
    authControllerRefreshV1: (data: RefreshTokenDto, params: RequestParams = {}) =>
      this.request<TokenResponseDto, void>({
        path: `/v1/auth/refresh`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthControllerLogoutV1
     * @summary Logout user and revoke refresh token
     * @request POST:/v1/auth/logout
     * @secure
     */
    authControllerLogoutV1: (data: RefreshTokenDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/v1/auth/logout`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthControllerGetMeV1
     * @summary Get current user info from DB (cached 24h)
     * @request GET:/v1/auth/me
     * @secure
     */
    authControllerGetMeV1: (params: RequestParams = {}) =>
      this.request<UserResponseDto, void>({
        path: `/v1/auth/me`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthControllerUpdateProfileV1
     * @summary Update user profile (name, phone, avatar)
     * @request PATCH:/v1/auth/me
     * @secure
     */
    authControllerUpdateProfileV1: (data: UpdateProfileMultipartDto, params: RequestParams = {}) =>
      this.request<UpdateProfileResponseDto, void>({
        path: `/v1/auth/me`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthControllerUpdatePreferencesV1
     * @summary Update user preferences (language)
     * @request PATCH:/v1/auth/me/preferences
     * @secure
     */
    authControllerUpdatePreferencesV1: (data: UpdatePreferencesDto, params: RequestParams = {}) =>
      this.request<PreferencesResponseDto, void>({
        path: `/v1/auth/me/preferences`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthControllerDeleteAccountV1
     * @summary Soft-delete account (requires password — OAuth-only users must call set-password first)
     * @request DELETE:/v1/auth/account
     * @secure
     */
    authControllerDeleteAccountV1: (data: DeleteAccountPasswordDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/v1/auth/account`,
        method: 'DELETE',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags OAuth
     * @name OAuthControllerGoogleV1
     * @summary Login or register via Google
     * @request POST:/v1/auth/oauth/google
     */
    oAuthControllerGoogleV1: (data: OAuthVerifyDto, params: RequestParams = {}) =>
      this.request<AuthResponseDto, void>({
        path: `/v1/auth/oauth/google`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags OAuth
     * @name OAuthControllerFacebookV1
     * @summary Login or register via Facebook
     * @request POST:/v1/auth/oauth/facebook
     */
    oAuthControllerFacebookV1: (data: OAuthVerifyDto, params: RequestParams = {}) =>
      this.request<AuthResponseDto, void>({
        path: `/v1/auth/oauth/facebook`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Auth
     * @name CmsAuthControllerSignInV1
     * @summary CMS admin login
     * @request POST:/v1/cms/auth/login
     */
    cmsAuthControllerSignInV1: (data: CmsSignInDto, params: RequestParams = {}) =>
      this.request<CmsAuthResponseDto, void>({
        path: `/v1/cms/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Auth
     * @name CmsAuthControllerRefreshV1
     * @summary Refresh CMS access token
     * @request POST:/v1/cms/auth/refresh
     */
    cmsAuthControllerRefreshV1: (data: CmsRefreshTokenDto, params: RequestParams = {}) =>
      this.request<CmsAuthResponseDto, void>({
        path: `/v1/cms/auth/refresh`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Auth
     * @name CmsAuthControllerLogoutV1
     * @summary CMS admin logout and revoke refresh token
     * @request POST:/v1/cms/auth/logout
     */
    cmsAuthControllerLogoutV1: (data: CmsRefreshTokenDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/cms/auth/logout`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Roles
     * @name CmsRolesControllerCreateRoleV1
     * @summary Create a new role with permissions (super_admin only)
     * @request POST:/v1/cms/roles
     * @secure
     */
    cmsRolesControllerCreateRoleV1: (data: CreateRoleDto, params: RequestParams = {}) =>
      this.request<RoleResponseDto, void>({
        path: `/v1/cms/roles`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Roles
     * @name CmsRolesControllerUpdateRoleV1
     * @summary Update role description or permissions (super_admin only)
     * @request PATCH:/v1/cms/roles/{id}
     * @secure
     */
    cmsRolesControllerUpdateRoleV1: (id: string, data: UpdateRoleDto, params: RequestParams = {}) =>
      this.request<RoleResponseDto, void>({
        path: `/v1/cms/roles/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Users
     * @name CmsUsersControllerListUsersV1
     * @summary List users with search, filter and pagination (super_admin only)
     * @request GET:/v1/cms/users
     * @secure
     */
    cmsUsersControllerListUsersV1: (
      query?: {
        /** Search by name, email, or phone */
        search?: string;
        /** Filter by active status */
        is_active?: boolean;
        /** Filter users created from this date (ISO 8601) */
        created_from?: string;
        /** Filter users created until this date (ISO 8601) */
        created_to?: string;
        /**
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * @min 1
         * @max 100
         * @default 20
         */
        limit?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<AppUserListResponseDto, void>({
        path: `/v1/cms/users`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Users
     * @name CmsUsersControllerDisableUserV1
     * @summary Disable a user account (super_admin only)
     * @request PATCH:/v1/cms/users/{id}/disable
     * @secure
     */
    cmsUsersControllerDisableUserV1: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/v1/cms/users/${id}/disable`,
        method: 'PATCH',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Users
     * @name CmsUsersControllerDeleteUserV1
     * @summary Soft-delete a user account (super_admin only)
     * @request DELETE:/v1/cms/users/{id}
     * @secure
     */
    cmsUsersControllerDeleteUserV1: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/v1/cms/users/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Users
     * @name CmsUsersControllerAssignRoleV1
     * @summary Assign (replace) roles for a user (super_admin only)
     * @request POST:/v1/cms/users/{id}/assign-role
     * @secure
     */
    cmsUsersControllerAssignRoleV1: (id: string, data: AssignRoleDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/v1/cms/users/${id}/assign-role`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
}
