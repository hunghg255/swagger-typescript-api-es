/* eslint-disable */
/*
 * ----------------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API-ES            ##
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
  /** @example "male" */
  gender: string | null;
  /** @example "1990-01-15T00:00:00.000Z" */
  dob: string | null;
  /** @example "vi" */
  language: string | null;
  /** @example "123 Nguyen Hue, Ho Chi Minh City" */
  address: string | null;
  /** @example false */
  verified: boolean;
  /**
   * Whether the account has a local password set
   * @example true
   */
  is_password_setup: boolean;
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
   * Whether this is the first time the user logged in (OAuth only)
   * @example false
   */
  is_new_user?: boolean;
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

export interface ChangePasswordDto {
  /**
   * Current password
   * @example "OldPass123!"
   */
  current_password: string;
  /**
   * New password
   * @minLength 8
   * @example "NewSecurePass123!"
   */
  new_password: string;
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

export interface LogoutDto {
  /** JWT refresh token */
  refresh_token: string;
  /** Stable device ID — used to remove FCM token on logout */
  device_id?: string;
}

export interface UpdateProfileMultipartDto {
  /** @example "John Doe" */
  name?: string;
  /** @example "+84901234567" */
  phone?: string;
  /** @example "male" */
  gender?: 'male' | 'female' | 'other';
  /**
   * Date of birth (ISO 8601)
   * @example "1990-01-15"
   */
  dob?: string;
  /** @example "123 Nguyen Hue, Ho Chi Minh City" */
  address?: string;
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
  gender: 'male' | 'female' | 'other' | null;
  /** @example "1990-01-15T00:00:00.000Z" */
  dob: string | null;
  /** @example "vi" */
  language: string | null;
  /** @example "123 Nguyen Hue, Ho Chi Minh City" */
  address: string | null;
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

export interface OAuthVerifyDto {
  /**
   * Authorization code from OAuth provider
   * @example "4/0AcvDMrA..."
   */
  code: string;
  /**
   * Redirect URI used in the OAuth dialog (required for Facebook)
   * @example "exp://localhost:8081"
   */
  redirect_uri?: string;
}

export interface AppleOAuthDto {
  /**
   * Identity token (id_token JWT) returned by expo-apple-authentication
   * @example "eyJraWQiOiJXNldjT0tCIiwiYWxnIjoiUlMyNTYifQ..."
   */
  identity_token: string;
  /**
   * Authorization code Apple trả về cùng identity_token. Backend exchange ra refresh_token để revoke khi xoá tài khoản (Apple Guideline 5.1.1(v)). Optional cho backward-compat — mobile cũ chưa gửi.
   * @example "c1234567890abcdef.0.abcd.efgh"
   */
  authorization_code?: string;
  /**
   * User's full name — only sent by Apple on first authorization
   * @example "Tuan Bui"
   */
  name?: string;
  /**
   * Email address — only sent by Apple on first authorization
   * @example "user@privaterelay.appleid.com"
   */
  email?: string;
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
  /**
   * Active role claims embedded in JWT
   * @example [{"code":"SUPER_ADMIN","domain":"system","scope_type":"global"}]
   */
  roles: string[];
  /** @example ["account.create","event.view"] */
  permissions: string[];
  /**
   * When true, admin must change password before using the system
   * @example false
   */
  must_change_password: boolean;
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

export interface ChangeAdminPasswordDto {
  /** @example "Tmp_abc123def456..." */
  current_password: string;
  /** @example "NewSecure@2024" */
  new_password: string;
}

export interface CreateAdminDto {
  /** @example "admin@heritage.vn" */
  email: string;
  /** @example "Nguyễn Văn A" */
  name?: string;
  /** @example "HERITAGE_OWNER" */
  role_code:
    | 'SUPER_ADMIN'
    | 'HERITAGE_OWNER'
    | 'CLUSTER_MANAGER'
    | 'EVENT_OWNER'
    | 'EVENT_STAFF'
    | 'EXHIBITION_OWNER'
    | 'EXHIBITION_STAFF';
  /**
   * For an owner role: provide EITHER (org_code + org_name) to create a new org, OR organization_id to attach to an existing unowned org. Slug ^[a-z0-9-]{3,64}$
   * @example "quan-the-co-do-hue"
   */
  org_code?: string;
  /** @example "Quần thể cố đô Huế" */
  org_name?: string;
  /**
   * For an owner role: attach to this EXISTING unowned organization instead of passing org_code/org_name. Mutually exclusive with org_code/org_name.
   * @format uuid
   */
  organization_id?: string;
}

export interface AssignmentResourceResponseDto {
  id: string;
  resource_type: string;
  resource_id: string;
  verified: boolean;
  /** @example null */
  verified_at: string | null;
}

export interface AssignmentResponseDto {
  id: string;
  role_id: string;
  role_code: string;
  role_name: string;
  scope_type: string;
  resource?: AssignmentResourceResponseDto | null;
  status: string;
  assigned_at: string;
  /** @example null */
  assigned_by?: string | null;
}

export interface AdminResponseDto {
  id: string;
  email: string;
  /** @example null */
  name: string | null;
  /** @example null */
  avatar: string | null;
  is_active: boolean;
  must_change_password: boolean;
  /** @example null */
  org_code: string | null;
  /** @example null */
  org_name: string | null;
  role_assignments: AssignmentResponseDto[];
  created_at: string;
}

export interface CreateStaffDto {
  /** @example "staff@heritage.vn" */
  email: string;
  /** @example "Nguyễn Văn B" */
  name?: string;
  /**
   * SUPER_ADMIN only: organization the staff is created under. Rejected for non-global actors.
   * @format uuid
   */
  organization_id?: string;
}

export interface AdminListResponseDto {
  items: AdminResponseDto[];
  /** @example 100 */
  total: number;
  /** @example 1 */
  page: number;
  /** @example 20 */
  limit: number;
}

export interface PatchAdminDto {
  /** @example "Nguyễn Văn A" */
  name?: string;
  /** @example "https://cdn.heritage.vn/avatar.jpg" */
  avatar?: string;
  /**
   * Only updatable for HERITAGE_OWNER targets
   * @example "quan-the-co-do-hue"
   */
  org_code?: string;
  /** @example "Quần thể cố đô Huế" */
  org_name?: string;
}

export interface AssignmentResourceDto {
  /** @example "heritage_cluster" */
  resource_type: 'heritage_cluster' | 'heritage_site' | 'event';
  /** @format uuid */
  resource_id: string;
}

export interface AssignmentItemDto {
  /** @format uuid */
  role_id: string;
  /** @example "assigned" */
  scope_type: 'global' | 'owned' | 'assigned';
  resource?: AssignmentResourceDto;
  /** @format date-time */
  start_at?: string;
  /** @format date-time */
  end_at?: string;
}

export interface PutRoleAssignmentsDto {
  assignments: AssignmentItemDto[];
}

export interface MeAssignmentDto {
  id: string;
  role_code: string;
  role_name: string;
  scope_type: string;
  /** @example null */
  resource_type: string | null;
  /** @example null */
  resource_id: string | null;
  status: string;
}

export interface MeResponseDto {
  id: string;
  email: string;
  /** @example null */
  name: string | null;
  /** @example null */
  avatar: string | null;
  /** @example null */
  org_code: string | null;
  /** @example null */
  org_name: string | null;
  must_change_password: boolean;
  roles: string[];
  permissions: string[];
  assignments: MeAssignmentDto[];
}

export interface PatchMeDto {
  name?: string;
  avatar?: string;
}

export interface PermissionDto {
  id: string;
  code: string;
  name: string;
  /** @example null */
  description: string | null;
  module: string;
  action: string;
  group: string;
}

export interface RoleResponseDto {
  id: string;
  code: string;
  name: string;
  /** @example null */
  description: string | null;
  is_system: boolean;
  created_by?: string | null;
  domain: object;
  permissions: PermissionDto[];
  created_at: string;
  updated_at?: string;
}

export interface CreateRoleDto {
  code: string;
  name: string;
  description?: string;
  domain_id: string;
  permission_ids?: string[];
}

export interface PatchRoleDto {
  name?: string;
  description?: string;
  permission_ids?: string[];
}

export interface PermissionResponseDto {
  id: string;
  code: string;
  name: string;
  /** @example null */
  description: string | null;
  group: string;
  module: string;
  action: string;
  is_system: boolean;
  domain: object;
  created_at: string;
}

export interface CreatePermissionDto {
  /** @example "audit.export" */
  code: string;
  name: string;
  description?: string;
  group: string;
  module: string;
  action: string;
  domain_id: string;
}

export interface PatchPermissionDto {
  name?: string;
  description?: string;
  group?: string;
}

export interface AppUserResponseDto {
  id: string;
  /** @example null */
  name: string | null;
  /** @example null */
  email: string | null;
  /** @example null */
  phone: string | null;
  is_active: boolean;
  verified: boolean;
  created_at: string;
}

export interface AppUserListResponseDto {
  items: AppUserResponseDto[];
  /** @example 500 */
  total: number;
  /** @example 1 */
  page: number;
  /** @example 20 */
  limit: number;
}

export type DomainResponseDto = object;

export interface CreateOrganizationDto {
  /**
   * Unique organization slug. ^[a-z0-9-]{3,64}$
   * @example "quan-the-co-do-hue"
   */
  code: string;
  /** @example "Quần thể cố đô Huế" */
  name: string;
  /**
   * Optional admin_domain id this org is scoped to (e.g. "domain-system").
   * @example "domain-system"
   */
  domain_id?: string;
}

export interface OrganizationResponseDto {
  id: string;
  code: string;
  name: string;
  /** @example null */
  owner_admin_id: string | null;
  /** @example null */
  domain_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PatchOrganizationDto {
  /** @example "Quần thể cố đô Huế (đổi tên)" */
  name?: string;
  /**
   * Unique organization slug. ^[a-z0-9-]{3,64}$
   * @example "quan-the-co-do-hue"
   */
  code?: string;
  /**
   * admin_domain id this org is scoped to (e.g. "domain-system").
   * @example "domain-system"
   */
  domain_id?: string;
}

export interface OrganizationListResponseDto {
  items: OrganizationResponseDto[];
  /** @example 100 */
  total: number;
  /** @example 1 */
  page: number;
  /** @example 20 */
  limit: number;
}

export type OrganizationListItemDto = object;

export interface SyncResponseDto {
  /** @example 5 */
  synced_admin_count: number;
  /** @example 120 */
  synced_user_count: number;
}

export interface AuditLogResponseDto {
  id: string;
  actor_id: string;
  action: string;
  /** @example null */
  target_id: string | null;
  /** @example null */
  target_type: string | null;
  result: string;
  /** @example null */
  metadata: object | null;
  created_at: string;
}

export interface AuditLogListResponseDto {
  items: AuditLogResponseDto[];
  /** @example 1000 */
  total: number;
  /** @example 1 */
  page: number;
  /** @example 50 */
  limit: number;
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
  injectHeaders?: (data: any) => any;
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
  private injectHeaders?: (data: any) => any;

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
    let headers = {
      ...(requestParams.headers || {}),
      ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
    };

    if (this.injectHeaders) {
      headers = await this.injectHeaders(headers);
    }

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
      {
        ...requestParams,
        headers,
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
     * @name AuthControllerChangePasswordV1
     * @summary Change password (account must already have one)
     * @request POST:/v1/auth/change-password
     * @secure
     */
    authControllerChangePasswordV1: (data: ChangePasswordDto, params: RequestParams = {}) =>
      this.request<AuthResponseDto, void>({
        path: `/v1/auth/change-password`,
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
    authControllerLogoutV1: (data: LogoutDto, params: RequestParams = {}) =>
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
     * @summary Soft-delete account (Apple Guideline 5.1.1(v) — không yêu cầu password)
     * @request DELETE:/v1/auth/account
     * @secure
     */
    authControllerDeleteAccountV1: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/v1/auth/account`,
        method: 'DELETE',
        secure: true,
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
     * @tags OAuth
     * @name OAuthControllerAppleV1
     * @summary Login or register via Apple (native iOS)
     * @request POST:/v1/auth/oauth/apple
     */
    oAuthControllerAppleV1: (data: AppleOAuthDto, params: RequestParams = {}) =>
      this.request<AuthResponseDto, void>({
        path: `/v1/auth/oauth/apple`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Legacy Redirects
     * @name CmsLegacyRedirectControllerRedirectAdminListV1
     * @summary Legacy redirect
     * @request GET:/v1/cms/users/admins
     * @deprecated
     */
    cmsLegacyRedirectControllerRedirectAdminListV1: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/v1/cms/users/admins`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Legacy Redirects
     * @name CmsLegacyRedirectControllerRedirectAdminDetailV1
     * @summary Legacy redirect
     * @request GET:/v1/cms/users/admins/{id}
     * @deprecated
     */
    cmsLegacyRedirectControllerRedirectAdminDetailV1: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/v1/cms/users/admins/${id}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Legacy Redirects
     * @name CmsLegacyRedirectControllerRedirectUserDetailV1
     * @summary Legacy redirect
     * @request GET:/v1/cms/users/{id}
     * @deprecated
     */
    cmsLegacyRedirectControllerRedirectUserDetailV1: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/v1/cms/users/${id}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Legacy Redirects
     * @name CmsLegacyRedirectControllerRedirectAssignRoleV1
     * @summary Legacy redirect
     * @request POST:/v1/cms/users/{id}/assign-role
     * @deprecated
     */
    cmsLegacyRedirectControllerRedirectAssignRoleV1: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/v1/cms/users/${id}/assign-role`,
        method: 'POST',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Legacy Redirects
     * @name CmsLegacyRedirectControllerRedirectSyncAllV1
     * @summary Legacy redirect
     * @request POST:/v1/cms/permissions/sync-all
     * @deprecated
     */
    cmsLegacyRedirectControllerRedirectSyncAllV1: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/v1/cms/permissions/sync-all`,
        method: 'POST',
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
      this.request<CmsAuthResponseDto, any>({
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
     * @summary CMS admin logout
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
     * @tags CMS Auth
     * @name CmsAuthControllerChangePasswordV1
     * @summary Change CMS admin password
     * @request POST:/v1/cms/auth/change-password
     * @secure
     */
    cmsAuthControllerChangePasswordV1: (data: ChangeAdminPasswordDto, params: RequestParams = {}) =>
      this.request<CmsAuthResponseDto, any>({
        path: `/v1/cms/auth/change-password`,
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
     * @tags CMS Admins
     * @name CmsAdminsControllerCreateAdminV1
     * @summary Create a new admin account (HERITAGE_OWNER requires org_code/org_name)
     * @request POST:/v1/cms/admins
     * @secure
     */
    cmsAdminsControllerCreateAdminV1: (data: CreateAdminDto, params: RequestParams = {}) =>
      this.request<AdminResponseDto, void>({
        path: `/v1/cms/admins`,
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
     * @tags CMS Admins
     * @name CmsAdminsControllerListAdminsV1
     * @summary List admins with filter/pagination. HERITAGE_OWNER only sees their own staff.
     * @request GET:/v1/cms/admins
     * @secure
     */
    cmsAdminsControllerListAdminsV1: (params: RequestParams = {}) =>
      this.request<AdminListResponseDto, any>({
        path: `/v1/cms/admins`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Admins
     * @name CmsAdminsControllerCreateStaffV1
     * @summary HERITAGE_OWNER: create a staff account (CLUSTER_MANAGER etc.)
     * @request POST:/v1/cms/admins/staff
     * @secure
     */
    cmsAdminsControllerCreateStaffV1: (data: CreateStaffDto, params: RequestParams = {}) =>
      this.request<AdminResponseDto, void>({
        path: `/v1/cms/admins/staff`,
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
     * @tags CMS Admins
     * @name CmsAdminsControllerGetAdminV1
     * @summary Get admin detail by ID
     * @request GET:/v1/cms/admins/{id}
     * @secure
     */
    cmsAdminsControllerGetAdminV1: (id: string, params: RequestParams = {}) =>
      this.request<AdminResponseDto, void>({
        path: `/v1/cms/admins/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Admins
     * @name CmsAdminsControllerPatchAdminV1
     * @summary Update admin profile (name, org fields for SUPER_ADMIN)
     * @request PATCH:/v1/cms/admins/{id}
     * @secure
     */
    cmsAdminsControllerPatchAdminV1: (
      id: string,
      data: PatchAdminDto,
      params: RequestParams = {}
    ) =>
      this.request<AdminResponseDto, void>({
        path: `/v1/cms/admins/${id}`,
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
     * @tags CMS Admins
     * @name CmsAdminsControllerDeleteAdminV1
     * @summary Soft-delete an admin account
     * @request DELETE:/v1/cms/admins/{id}
     * @secure
     */
    cmsAdminsControllerDeleteAdminV1: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/v1/cms/admins/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Admins
     * @name CmsAdminsControllerDisableAdminV1
     * @summary Disable an admin account
     * @request PATCH:/v1/cms/admins/{id}/disable
     * @secure
     */
    cmsAdminsControllerDisableAdminV1: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/v1/cms/admins/${id}/disable`,
        method: 'PATCH',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Admins
     * @name CmsAdminsControllerEnableAdminV1
     * @summary Enable an admin account
     * @request PATCH:/v1/cms/admins/{id}/enable
     * @secure
     */
    cmsAdminsControllerEnableAdminV1: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/v1/cms/admins/${id}/enable`,
        method: 'PATCH',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Admins
     * @name CmsAdminsControllerResetPasswordV1
     * @summary Reset admin password and send temp password via email
     * @request POST:/v1/cms/admins/{id}/reset-password
     * @secure
     */
    cmsAdminsControllerResetPasswordV1: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/v1/cms/admins/${id}/reset-password`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Admin Role Assignments
     * @name RoleAssignmentsControllerListV1
     * @summary List role assignments for an admin
     * @request GET:/v1/cms/admins/{adminId}/role-assignments
     * @secure
     */
    roleAssignmentsControllerListV1: (adminId: string, params: RequestParams = {}) =>
      this.request<AssignmentResponseDto[], any>({
        path: `/v1/cms/admins/${adminId}/role-assignments`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Admin Role Assignments
     * @name RoleAssignmentsControllerReplaceAllV1
     * @summary Replace all role assignments for an admin (full sync)
     * @request PUT:/v1/cms/admins/{adminId}/role-assignments
     * @secure
     */
    roleAssignmentsControllerReplaceAllV1: (
      adminId: string,
      data: PutRoleAssignmentsDto,
      params: RequestParams = {}
    ) =>
      this.request<AssignmentResponseDto[], void>({
        path: `/v1/cms/admins/${adminId}/role-assignments`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Admin Role Assignments
     * @name RoleAssignmentsControllerAddOneV1
     * @summary Add a single role assignment to an admin (HERITAGE_OWNER: staff roles only)
     * @request POST:/v1/cms/admins/{adminId}/role-assignments
     * @secure
     */
    roleAssignmentsControllerAddOneV1: (
      adminId: string,
      data: AssignmentItemDto,
      params: RequestParams = {}
    ) =>
      this.request<AssignmentResponseDto[], void>({
        path: `/v1/cms/admins/${adminId}/role-assignments`,
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
     * @tags CMS Admin Role Assignments
     * @name RoleAssignmentsControllerRemoveOneV1
     * @summary Remove a single role assignment
     * @request DELETE:/v1/cms/admins/{adminId}/role-assignments/{assignmentId}
     * @secure
     */
    roleAssignmentsControllerRemoveOneV1: (
      adminId: string,
      assignmentId: string,
      params: RequestParams = {}
    ) =>
      this.request<void, void>({
        path: `/v1/cms/admins/${adminId}/role-assignments/${assignmentId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Me
     * @name CmsMeControllerGetMeV1
     * @summary Get current admin profile with roles, permissions, assignments
     * @request GET:/v1/cms/me
     * @secure
     */
    cmsMeControllerGetMeV1: (params: RequestParams = {}) =>
      this.request<MeResponseDto, any>({
        path: `/v1/cms/me`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Me
     * @name CmsMeControllerPatchMeV1
     * @summary Update current admin name/avatar
     * @request PATCH:/v1/cms/me
     * @secure
     */
    cmsMeControllerPatchMeV1: (data: PatchMeDto, params: RequestParams = {}) =>
      this.request<MeResponseDto, any>({
        path: `/v1/cms/me`,
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
     * @tags CMS Roles
     * @name CmsRolesControllerListRolesV1
     * @summary List all roles
     * @request GET:/v1/cms/roles
     * @secure
     */
    cmsRolesControllerListRolesV1: (
      query: {
        domain: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<RoleResponseDto[], any>({
        path: `/v1/cms/roles`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Roles
     * @name CmsRolesControllerCreateRoleV1
     * @summary Create custom role
     * @request POST:/v1/cms/roles
     * @secure
     */
    cmsRolesControllerCreateRoleV1: (data: CreateRoleDto, params: RequestParams = {}) =>
      this.request<RoleResponseDto, any>({
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
     * @name CmsRolesControllerGetRoleV1
     * @summary Get role by ID
     * @request GET:/v1/cms/roles/{id}
     * @secure
     */
    cmsRolesControllerGetRoleV1: (id: string, params: RequestParams = {}) =>
      this.request<RoleResponseDto, any>({
        path: `/v1/cms/roles/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Roles
     * @name CmsRolesControllerUpdateRoleV1
     * @summary Update role
     * @request PATCH:/v1/cms/roles/{id}
     * @secure
     */
    cmsRolesControllerUpdateRoleV1: (id: string, data: PatchRoleDto, params: RequestParams = {}) =>
      this.request<RoleResponseDto, any>({
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
     * @tags CMS Roles
     * @name CmsRolesControllerDeleteRoleV1
     * @summary Delete custom role
     * @request DELETE:/v1/cms/roles/{id}
     * @secure
     */
    cmsRolesControllerDeleteRoleV1: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/cms/roles/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Roles
     * @name CmsRolesControllerGetRolePermissionsV1
     * @summary Get permissions for role
     * @request GET:/v1/cms/roles/{id}/permissions
     * @secure
     */
    cmsRolesControllerGetRolePermissionsV1: (id: string, params: RequestParams = {}) =>
      this.request<PermissionDto[], any>({
        path: `/v1/cms/roles/${id}/permissions`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Permissions
     * @name CmsPermissionsControllerListPermissionsV1
     * @summary List permissions
     * @request GET:/v1/cms/permissions
     * @secure
     */
    cmsPermissionsControllerListPermissionsV1: (params: RequestParams = {}) =>
      this.request<PermissionResponseDto[], any>({
        path: `/v1/cms/permissions`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Permissions
     * @name CmsPermissionsControllerCreatePermissionV1
     * @summary Create custom permission
     * @request POST:/v1/cms/permissions
     * @secure
     */
    cmsPermissionsControllerCreatePermissionV1: (
      data: CreatePermissionDto,
      params: RequestParams = {}
    ) =>
      this.request<PermissionResponseDto, any>({
        path: `/v1/cms/permissions`,
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
     * @tags CMS Permissions
     * @name CmsPermissionsControllerGetPermissionV1
     * @summary Get permission by ID
     * @request GET:/v1/cms/permissions/{id}
     * @secure
     */
    cmsPermissionsControllerGetPermissionV1: (id: string, params: RequestParams = {}) =>
      this.request<PermissionResponseDto, any>({
        path: `/v1/cms/permissions/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Permissions
     * @name CmsPermissionsControllerUpdatePermissionV1
     * @summary Update permission
     * @request PATCH:/v1/cms/permissions/{id}
     * @secure
     */
    cmsPermissionsControllerUpdatePermissionV1: (
      id: string,
      data: PatchPermissionDto,
      params: RequestParams = {}
    ) =>
      this.request<PermissionResponseDto, any>({
        path: `/v1/cms/permissions/${id}`,
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
     * @tags CMS Permissions
     * @name CmsPermissionsControllerDeletePermissionV1
     * @summary Delete custom permission
     * @request DELETE:/v1/cms/permissions/{id}
     * @secure
     */
    cmsPermissionsControllerDeletePermissionV1: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/cms/permissions/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS App Users
     * @name CmsAppUsersControllerListUsersV1
     * @summary List app users
     * @request GET:/v1/cms/app-users
     * @secure
     */
    cmsAppUsersControllerListUsersV1: (
      query?: {
        search?: string;
        is_active?: boolean;
        verified?: boolean;
        /** @default 1 */
        page?: number;
        /** @default 20 */
        page_size?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<AppUserListResponseDto, any>({
        path: `/v1/cms/app-users`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS App Users
     * @name CmsAppUsersControllerGetUserV1
     * @summary Get app user by ID
     * @request GET:/v1/cms/app-users/{id}
     * @secure
     */
    cmsAppUsersControllerGetUserV1: (id: string, params: RequestParams = {}) =>
      this.request<AppUserResponseDto, any>({
        path: `/v1/cms/app-users/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS App Users
     * @name CmsAppUsersControllerDeleteUserV1
     * @summary Soft-delete app user
     * @request DELETE:/v1/cms/app-users/{id}
     * @secure
     */
    cmsAppUsersControllerDeleteUserV1: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/cms/app-users/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS App Users
     * @name CmsAppUsersControllerDisableUserV1
     * @summary Disable app user
     * @request PATCH:/v1/cms/app-users/{id}/disable
     * @secure
     */
    cmsAppUsersControllerDisableUserV1: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/cms/app-users/${id}/disable`,
        method: 'PATCH',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS App Users
     * @name CmsAppUsersControllerEnableUserV1
     * @summary Enable app user
     * @request PATCH:/v1/cms/app-users/{id}/enable
     * @secure
     */
    cmsAppUsersControllerEnableUserV1: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/v1/cms/app-users/${id}/enable`,
        method: 'PATCH',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Domains
     * @name CmsDomainsControllerListDomainsV1
     * @summary List admin domains
     * @request GET:/v1/cms/domains
     * @secure
     */
    cmsDomainsControllerListDomainsV1: (params: RequestParams = {}) =>
      this.request<DomainResponseDto[], any>({
        path: `/v1/cms/domains`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Organizations
     * @name CmsOrganizationsControllerCreateV1
     * @summary Create a standalone organization (SUPER_ADMIN). Owner attached later.
     * @request POST:/v1/cms/organizations
     * @secure
     */
    cmsOrganizationsControllerCreateV1: (data: CreateOrganizationDto, params: RequestParams = {}) =>
      this.request<OrganizationResponseDto, void>({
        path: `/v1/cms/organizations`,
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
     * @tags CMS Organizations
     * @name CmsOrganizationsControllerListV1
     * @summary List organizations with filter/pagination. has_owner=false ⇒ orgs without an owner.
     * @request GET:/v1/cms/organizations
     * @secure
     */
    cmsOrganizationsControllerListV1: (
      query?: {
        /** Search by code or name (case-insensitive). */
        search?: string;
        /** Filter by owner assignment. false ⇒ only organizations WITHOUT an owner; true ⇒ only organizations WITH an owner. Omit ⇒ all. */
        has_owner?: boolean;
        /** Filter by active flag. */
        is_active?: boolean;
        /** @default 1 */
        page?: number;
        /** @default 20 */
        page_size?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<OrganizationListResponseDto, any>({
        path: `/v1/cms/organizations`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS Organizations
     * @name CmsOrganizationsControllerPatchV1
     * @summary Update an organization (name, code, domain_id).
     * @request PATCH:/v1/cms/organizations/{id}
     * @secure
     */
    cmsOrganizationsControllerPatchV1: (
      id: string,
      data: PatchOrganizationDto,
      params: RequestParams = {}
    ) =>
      this.request<OrganizationResponseDto, void>({
        path: `/v1/cms/organizations/${id}`,
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
     * @tags CMS Organizations
     * @name CmsOrganizationsControllerListSelectorV1
     * @summary List active organizations (SUPER_ADMIN only, unpaginated). Filter by has_owner.
     * @request GET:/v1/cms/organizations/selector
     * @secure
     */
    cmsOrganizationsControllerListSelectorV1: (
      query?: {
        /** Filter by owner assignment. false ⇒ only organizations WITHOUT an owner; true ⇒ only organizations WITH an owner. Omit ⇒ all active. */
        has_owner?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<OrganizationListItemDto[], void>({
        path: `/v1/cms/organizations/selector`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS System
     * @name CmsSystemControllerSyncAllV1
     * @summary Re-sync all admin and user projections
     * @request POST:/v1/cms/system/sync
     * @secure
     */
    cmsSystemControllerSyncAllV1: (params: RequestParams = {}) =>
      this.request<SyncResponseDto, any>({
        path: `/v1/cms/system/sync`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CMS System
     * @name CmsSystemControllerListAuditLogsV1
     * @summary List audit logs
     * @request GET:/v1/cms/system/audit-logs
     * @secure
     */
    cmsSystemControllerListAuditLogsV1: (
      query?: {
        action?: string;
        actor_id?: string;
        target_id?: string;
        from?: string;
        to?: string;
        /** @default 1 */
        page?: number;
        /** @default 20 */
        page_size?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<AuditLogListResponseDto, any>({
        path: `/v1/cms/system/audit-logs`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
}
