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
