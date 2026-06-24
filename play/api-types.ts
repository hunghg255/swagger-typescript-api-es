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
