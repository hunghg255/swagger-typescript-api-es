/* eslint-disable */
/*
 * ----------------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API-ES            ##
 * ## SOURCE: https://github.com/hunghg255/swagger-typescript-api-es   ##
 * ----------------------------------------------------------------------
 */

export interface Meta {
  /** @example 0 */
  skip: number;
  /** @example 20 */
  limit: number;
  /** @example 100 */
  total: number;
}

export interface RelationshipToOwnerDto {
  /**
   * Unique identifier
   * @example "cmesbe1f700001zk6h8vohw75"
   */
  id: string;
  /**
   * Name of the relationship
   * @example "Owner"
   */
  name: string;
  /**
   * User who created the relationship
   * @example "user_123"
   */
  created_by: string;
  /**
   * Date when the relationship was created
   * @format date-time
   * @example "2023-01-01T00:00:00Z"
   */
  created_at: string;
  /**
   * User who last updated the relationship
   * @example "user_456"
   */
  updated_by: string;
  /**
   * Date when the relationship was last updated
   * @format date-time
   * @example "2023-01-02T00:00:00Z"
   */
  updated_at: string;
  /**
   * User who deleted the relationship
   * @example "user_789"
   */
  deleted_by?: string;
  /**
   * Date when the relationship was deleted
   * @format date-time
   * @example "2023-01-03T00:00:00Z"
   */
  deleted_at?: string;
}

export interface PaginatedRelationshipToOwnerResponseDto {
  /** Pagination metadata including skip, limit, and total count */
  meta: Meta;
  data: RelationshipToOwnerDto[];
}

export interface VarietyDto {
  /**
   * Unique identifier
   * @example "cmesbe1f700001zk6h8vohw75"
   */
  id: string;
  /**
   * Name of the variety
   * @example "Arabica"
   */
  name: string;
  /**
   * User who created the variety
   * @example "user_123"
   */
  created_by: string;
  /**
   * Date when the variety was created
   * @format date-time
   * @example "2023-01-01T00:00:00Z"
   */
  created_at: string;
  /**
   * User who last updated the variety
   * @example "user_456"
   */
  updated_by: string;
  /**
   * Date when the variety was last updated
   * @format date-time
   * @example "2023-01-02T00:00:00Z"
   */
  updated_at: string;
  /**
   * User who deleted the variety
   * @example "user_789"
   */
  deleted_by?: string;
  /**
   * Date when the variety was deleted
   * @format date-time
   * @example "2023-01-03T00:00:00Z"
   */
  deleted_at?: string;
}

export interface PaginatedVarietyResponseDto {
  /** Pagination metadata including skip, limit, and total count */
  meta: Meta;
  data: VarietyDto[];
}

export type Object = object;

export interface CertificateTypePaginationMetaDto {
  /**
   * Total number of records
   * @example 3
   */
  total: number;
  /**
   * Number of records skipped
   * @example 0
   */
  skip: number;
  /**
   * Maximum number of records returned
   * @example 10
   */
  limit: number;
}

export interface CertificateTypeResponseDto {
  /**
   * Certificate type ID
   * @example "cmfc9xpz70000bok6bcmh07nx"
   */
  id: string;
  /**
   * Certificate type name
   * @example "EUDR"
   */
  name: string;
  /**
   * Created by user ID
   * @example "cm9xyz123456789"
   */
  created_by: string;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  created_at: string;
  /**
   * Updated by user ID
   * @example "cm9xyz123456789"
   */
  updated_by: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  updated_at: string;
  /**
   * Deleted by user ID
   * @example "cm9xyz123456789"
   */
  deleted_by: string | null;
  /**
   * Deletion timestamp
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  deleted_at: string | null;
}

export interface PaginatedCertificateTypeResponseDto {
  /** Pagination metadata */
  meta: CertificateTypePaginationMetaDto;
  /** Array of certificate type data */
  data: CertificateTypeResponseDto[];
}

export interface CultivationActivityPaginationMetaDto {
  /**
   * Total number of records
   * @example 4
   */
  total: number;
  /**
   * Number of records skipped
   * @example 0
   */
  skip: number;
  /**
   * Maximum number of records returned
   * @example 10
   */
  limit: number;
}

export interface CultivationActivityResponseDto {
  /**
   * Cultivation activity ID
   * @example "cmfcbmrn60000yik69yb0ao71"
   */
  id: string;
  /**
   * Cultivation activity name
   * @example "Seeding"
   */
  name: string;
  /**
   * Created by user ID
   * @example "system"
   */
  created_by: string;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2025-09-09T12:00:00.000Z"
   */
  created_at: string;
  /**
   * Updated by user ID
   * @example "system"
   */
  updated_by: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2025-09-09T12:00:00.000Z"
   */
  updated_at: string;
  /**
   * Deleted by user ID
   * @example null
   */
  deleted_by: string | null;
  /**
   * Deletion timestamp
   * @format date-time
   * @example null
   */
  deleted_at: string | null;
}

export interface PaginatedCultivationActivityResponseDto {
  /** Pagination metadata */
  meta: CultivationActivityPaginationMetaDto;
  /** Array of cultivation activity data */
  data: CultivationActivityResponseDto[];
}

export interface CountryMetaDto {
  /**
   * Total number of countries
   * @example 1
   */
  total: number;
  /**
   * Number of records skipped
   * @example 0
   */
  skip: number;
  /**
   * Number of records returned
   * @example 10
   */
  limit: number;
}

export interface CountryResponseDto {
  /**
   * Country ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Country name
   * @example "Vietnam"
   */
  name: string;
  /**
   * Country code
   * @example "VN"
   */
  country_code: string;
  /**
   * Created at
   * @format date-time
   * @example "2023-01-01T00:00:00Z"
   */
  created_at: string;
  /**
   * Updated at
   * @format date-time
   * @example "2023-01-01T00:00:00Z"
   */
  updated_at: string;
  /**
   * Created by
   * @example "system"
   */
  created_by: string;
  /**
   * Updated by
   * @example "system"
   */
  updated_by: string;
}

export interface PaginatedCountryResponseDto {
  meta: CountryMetaDto;
  data: CountryResponseDto[];
}

export interface ProvinceMetaDto {
  /**
   * Total number of provinces
   * @example 63
   */
  total: number;
  /**
   * Number of records skipped
   * @example 0
   */
  skip: number;
  /**
   * Number of records returned
   * @example 10
   */
  limit: number;
}

export interface ProvinceResponseDto {
  /**
   * Province ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Province name
   * @example "Ho Chi Minh"
   */
  name: string;
  /**
   * Province code
   * @example "SG"
   */
  province_code: string;
  /**
   * Country ID this province belongs to
   * @example "vietnam_country_id"
   */
  country_id: string;
  /**
   * Created at
   * @format date-time
   * @example "2023-01-01T00:00:00Z"
   */
  created_at: string;
  /**
   * Updated at
   * @format date-time
   * @example "2023-01-01T00:00:00Z"
   */
  updated_at: string;
  /**
   * Created by
   * @example "system"
   */
  created_by: string;
  /**
   * Updated by
   * @example "system"
   */
  updated_by: string;
  /**
   * Country information
   * @example {"id":"vietnam_country_id","name":"Vietnam","country_code":"VN"}
   */
  country?: object;
}

export interface PaginatedProvinceResponseDto {
  meta: ProvinceMetaDto;
  data: ProvinceResponseDto[];
}

export interface EthnicityDto {
  /**
   * Unique identifier
   * @example "cmesbe1f700001zk6h8vohw75"
   */
  id: string;
  /**
   * Name of the ethnicity
   * @example "Hispanic"
   */
  name: string;
}

export interface PaginatedEthnicityResponseDto {
  /** Pagination metadata including skip, limit, and total count */
  meta: Meta;
  data: EthnicityDto[];
}

export interface MigrateFarmRequestDto {
  /**
   * Số lượng farm tối đa cần migrate
   * @example 10
   */
  limit?: number;
  /**
   * Email của factory account (nếu không truyền sẽ dùng factory.demo@gmail.com)
   * @example "factory.custom@gmail.com"
   */
  factory_email?: string;
  /**
   * Display ID of the factory organization (required for unique migration). Example: factory-demo-factory
   * @example "factory-demo-factory"
   */
  factory_display_id?: string;
}

export interface MigrationResultItemDto {
  /** @example true */
  success: boolean;
  /** @example "factory@gmail.com" */
  factory: string;
  error?: string;
  farmer_code?: string;
}

export interface MigrateFarmResponseDto {
  /** @example "Migration completed successfully" */
  message: string;
  /** @example 730 */
  totalFarmsInData: number;
  /** @example 10 */
  farmsProcessed: number;
  /** @example 9 */
  successfulMigrations: number;
  /** @example 1 */
  failedMigrations: number;
  results: MigrationResultItemDto[];
}

export interface MigrationResultWithNameItemDto {
  /** @example true */
  success: boolean;
  /** @example "factory-demo@gmail.com" */
  factory: string;
  error?: string;
  farmer_code?: string;
  farmer_name?: string;
}

export interface MigrateUniqueFarmResponseDto {
  /** @example "Unique farm migration completed successfully" */
  message: string;
  /** @example 730 */
  totalRowsInCsv: number;
  /** @example 508 */
  uniqueFarmers: number;
  /** @example 508 */
  farmsProcessed: number;
  /** @example 500 */
  successfulMigrations: number;
  /** @example 8 */
  failedMigrations: number;
  results: MigrationResultWithNameItemDto[];
}

export interface DeleteFarmRequestDto {
  /**
   * Display ID of the factory organization. Example: factory-demo-factory
   * @example "factory-demo-factory"
   */
  organization_display_id: string;
  /**
   * Maximum number of farms to delete (most recent first)
   * @example 10
   */
  limit?: number;
}

export interface DeletedFarmItemDto {
  farm_id: string;
  fid: string;
  deleted_by: string;
}

export interface DeleteFarmsFromCsvResponseDto {
  /** @example "Farm deletion completed successfully" */
  message: string;
  /** @example 10 */
  totalFarmsFound: number;
  /** @example 10 */
  farmsDeleted: number;
  deletedFarms: DeletedFarmItemDto[];
}

export interface GenerateFarmsFromCsvRequestDto {
  /**
   * Maximum number of farms to process from CSV
   * @example 10
   */
  limit?: number;
  /**
   * CSV file containing farmer data
   * @format binary
   */
  file: File;
}

export interface GenerateFarmsFromCsvResponseDto {
  /** @example "Farm generation from CSV completed successfully" */
  message: string;
  /** @example 730 */
  totalRowsInCsv: number;
  /** @example 508 */
  uniqueFarmers: number;
  /** @example 508 */
  farmsProcessed: number;
  /** @example 500 */
  successfulMigrations: number;
  /** @example 8 */
  failedMigrations: number;
  results: MigrationResultWithNameItemDto[];
}

export interface CreateNearbyFarmDto {
  /**
   * ID of the nearby farm to attach
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  nearby_farm_id: string;
}

export interface NearbyFarmInfoDto {
  /** @example "cm3q8j9k0000114txhqz0abcd" */
  id: string;
  /** @example "FARM001" */
  fid: string;
  /** @example "123 Main St" */
  address: string;
  /** Type of farm */
  farm_type: 'STANDALONE' | 'CENTRAL' | 'NEARBY';
}

export interface NearbyFarmDto {
  /** @example "cm3q8j9k0000114txhqz0abcd" */
  id: string;
  /**
   * ID of the central farm
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  central_farm_id: string;
  /**
   * ID of the nearby farm
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  nearby_farm_id: string;
  /** Nearby farm details */
  nearby_farm: NearbyFarmInfoDto;
  /** User who created the relationship */
  created_by: string;
  /** @format date-time */
  created_at: string;
  /** User who last updated the relationship */
  updated_by: string;
  /** @format date-time */
  updated_at: string;
}

export interface AddNearbyFarmResponseDto {
  data: NearbyFarmDto;
}

export interface NearbyFarmPaginatedResponseDto {
  /** Pagination metadata including skip, limit, and total count */
  meta: Meta;
  data: NearbyFarmDto[];
}

export interface BoundaryPointDto {
  /**
   * Longitude coordinate
   * @example 108.3566
   */
  longitude: number;
  /**
   * Latitude coordinate
   * @example 12.7033
   */
  latitude: number;
}

export interface ForestryAnalysisRequestDto {
  /**
   * Array of boundary points defining the analysis area. Provide 1 point to auto-generate a 1-hectare rectangle, or 3+ points for a custom polygon.
   * @example [{"longitude":108.3566,"latitude":12.7033},{"longitude":108.3584,"latitude":12.7033},{"longitude":108.3584,"latitude":12.7051},{"longitude":108.3566,"latitude":12.7051}]
   */
  boundary: BoundaryPointDto[];
  /**
   * Optional area in square meters. Used when a single boundary point is provided to generate a rectangle of this size around the point. Defaults to 10,000 m² (1 hectare) if not specified.
   * @example 50000
   */
  areaSquareMeters?: number;
}

export interface S3ImageInfoDto {
  /**
   * S3 URL of the forestry transparent image
   * @example "s3://sit-traceability-tif-bucket/overlay/21.149-105.374_21.149-105.384_21.154-105.384_21.154-105.374.png"
   */
  forestryTransparentUrl: string;
  /**
   * S3 URL of the polygon overlay image
   * @example "s3://sit-traceability-tif-bucket/overlay-with-polygon/21.149-105.374_21.149-105.384_21.154-105.384_21.154-105.374.png"
   */
  polygonOverlayUrl: string;
  /**
   * Image key for forestry transparent image
   * @example "21.149-105.374_21.149-105.384_21.154-105.384_21.154-105.374"
   */
  forestryTransparentKey: string;
  /**
   * Image key for polygon overlay image
   * @example "21.149-105.374_21.149-105.384_21.154-105.384_21.154-105.374"
   */
  polygonOverlayKey: string;
  /** Whether forestry image was retrieved from cache */
  forestryFromCache: boolean;
  /** Whether polygon image was retrieved from cache */
  polygonFromCache: boolean;
}

export interface ImageBoundaryDto {
  /**
   * Minimum longitude of the image boundary
   * @example 108.35
   */
  minLongitude: number;
  /**
   * Minimum latitude of the image boundary
   * @example 12.7
   */
  minLatitude: number;
  /**
   * Maximum longitude of the image boundary
   * @example 108.365
   */
  maxLongitude: number;
  /**
   * Maximum latitude of the image boundary
   * @example 12.71
   */
  maxLatitude: number;
  /**
   * Center longitude of the image
   * @example 108.3575
   */
  centerLongitude: number;
  /**
   * Center latitude of the image
   * @example 12.705
   */
  centerLatitude: number;
  /**
   * Width of the coverage area in kilometers
   * @example 10.5
   */
  widthKm: number;
  /**
   * Height of the coverage area in kilometers
   * @example 10.5
   */
  heightKm: number;
  /**
   * Corner coordinates of the image boundary
   * @example [{"longitude":108.35,"latitude":12.7},{"longitude":108.365,"latitude":12.7},{"longitude":108.365,"latitude":12.71},{"longitude":108.35,"latitude":12.71}]
   */
  corners: string[];
}

export interface ForestryAnalysisResponseDto {
  /** Total pixels analyzed */
  totalPixels: number;
  /** Number of forest pixels found */
  forestPixels: number;
  /** Number of pixels within boundary */
  boundaryPixels: number;
  /** Number of forest pixels within boundary (overlap) */
  overlapPixels: number;
  /** Percentage of boundary area covered by forest */
  overlapPercentage: number;
  /** TIF file dimensions */
  tifDimensions: object;
  /** Processed region information */
  processedRegion: object;
  /** S3 image information and keys */
  s3Images: S3ImageInfoDto;
  /** Image boundary information */
  imageBoundary: ImageBoundaryDto;
}

export interface PointAreaRequestDto {
  /**
   * Longitude of the center point
   * @example 108.3575
   */
  longitude: number;
  /**
   * Latitude of the center point
   * @example 12.7042
   */
  latitude: number;
  /**
   * Area in square meters
   * @min 1
   * @example 10000
   */
  areaSquareMeters: number;
}

export interface PointAreaImageResponseDto {
  /** S3 URL of the forestry transparent image */
  forestryTransparentUrl: string;
  /** Image key for the forestry transparent image */
  forestryTransparentKey: string;
  /** Whether image was retrieved from cache */
  fromCache: boolean;
  /** Generated rectangle boundary coordinates */
  generatedBoundary: string[];
  /** Image boundary information */
  imageBoundary: ImageBoundaryDto;
  /**
   * Area of the generated rectangle in square meters
   * @example 10000
   */
  actualAreaSquareMeters: number;
}

export interface FileUploadDto {
  /**
   * File to upload (PDF, DOC, DOCX, XLS, XLSX, JPEG, PNG only). Maximum file size: 20MB
   * @format binary
   * @example "farm-certificate.pdf"
   */
  file: File;
  /**
   * Optional name for the file. Custom display name for the uploaded file
   * @minLength 1
   * @maxLength 255
   * @example "Organic Farm Certificate 2024"
   */
  name?: string;
  /**
   * Optional description for the file. Helps identify the purpose or content of the uploaded document
   * @minLength 1
   * @maxLength 500
   * @example "Farm certificate document for organic certification"
   */
  description?: string;
}

export interface FileUploadResponseDto {
  /**
   * Unique identifier for the uploaded file (UUID format)
   * @format uuid
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * Custom name for the file (if provided)
   * @maxLength 255
   * @example "Organic Farm Certificate 2024"
   */
  name?: string;
  /**
   * Original filename as uploaded by the user
   * @example "farm-certificate.pdf"
   */
  filename: string;
  /**
   * File size in bytes
   * @min 1
   * @max 20971520
   * @example 1024000
   */
  size: number;
  /**
   * MIME type of the uploaded file
   * @example "application/pdf"
   */
  mimetype:
    | 'application/pdf'
    | 'application/msword'
    | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    | 'application/vnd.ms-excel'
    | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    | 'image/jpeg'
    | 'image/png';
  /**
   * S3 URL of the uploaded file for direct access
   * @format uri
   * @example "https://sit-traceability-user-files-bucket.s3.amazonaws.com/app-user/user123/documents/clh5x8k2a0000abcd1234efgh_farm-certificate.pdf"
   */
  url: string;
  /**
   * User-provided description of the file content or purpose
   * @maxLength 500
   * @example "Farm certificate document for organic certification"
   */
  description?: string;
  /**
   * User ID of the person who uploaded the file
   * @example "user123"
   */
  uploaded_by: string;
  /**
   * Timestamp when the file was uploaded (ISO 8601 format)
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  uploaded_at: string;
}

export interface PaginatedUserFileResponseDto {
  /** Pagination metadata including skip, limit, and total count */
  meta: Meta;
  data: FileUploadResponseDto[];
}

export interface FileDeleteResponseDto {
  /**
   * Success message confirming file deletion
   * @example "File deleted successfully"
   */
  message: string;
  /**
   * UUID of the deleted file for reference
   * @format uuid
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  fileId: string;
}

export interface FileDownloadResponseDto {
  /** Pre-signed download URL */
  url: string;
  /**
   * URL expiry in seconds
   * @example 900
   */
  expires_in: number;
  /**
   * File ID
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * Original filename
   * @example "document.pdf"
   */
  filename: string;
  /**
   * MIME type
   * @example "application/pdf"
   */
  mimetype: string;
  /**
   * File size in bytes
   * @example 1024
   */
  size: number;
}

export interface CreateFileAssociationDto {
  /**
   * ID of the uploaded file to associate
   * @format uuid
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  file_id: string;
  /**
   * User ID to associate the file with (optional)
   * @example "user123"
   */
  user_id?: string;
  /**
   * Harvest Log ID to associate the file with (optional)
   * @example "harvest_log_123"
   */
  harvest_log_id?: string;
  /**
   * Cultivation Log ID to associate the file with (optional)
   * @example "cultivation_log_123"
   */
  cultivation_log_id?: string;
  /**
   * Owner ID to associate the file with (optional)
   * @example "owner_123"
   */
  owner_id?: string;
  /**
   * Sale lot ID to associate the file with (optional)
   * @example "sale_lot_123"
   */
  sale_lot_id?: string;
  /**
   * Shipment ID to associate the file with (optional)
   * @example "shipment_123"
   */
  shipment_id?: string;
  /**
   * Bin ID to associate the file with (optional)
   * @example "bin_123"
   */
  bin_id?: string;
  /**
   * Pallet ID to associate the file with (optional)
   * @example "pallet_123"
   */
  pallet_id?: string;
  /**
   * Export Lot ID to associate the file with (optional)
   * @example "export_lot_123"
   */
  export_lot_id?: string;
}

export interface FileAssociationResponseDto {
  /**
   * Unique identifier for the file association
   * @format uuid
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * ID of the associated file
   * @format uuid
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  file_id: string;
  /**
   * User ID if file is associated with a user
   * @example "user123"
   */
  user_id?: string;
  /**
   * Harvest Log ID if file is associated with a harvest log
   * @example "harvest_log_123"
   */
  harvest_log_id?: string;
  /**
   * Cultivation Log ID if file is associated with a cultivation log
   * @example "cultivation_log_123"
   */
  cultivation_log_id?: string;
  /**
   * Owner ID if file is associated with an owner
   * @example "owner_123"
   */
  owner_id?: string;
  /**
   * Sale lot ID if file is associated with a sale lot
   * @example "sale_lot_123"
   */
  sale_lot_id?: string;
  /**
   * Shipment ID if file is associated with a shipment
   * @example "shipment_123"
   */
  shipment_id?: string;
  /**
   * Bin ID if file is associated with a bin
   * @example "bin_123"
   */
  bin_id?: string;
  /**
   * Pallet ID if file is associated with a pallet
   * @example "pallet_123"
   */
  pallet_id?: string;
  /**
   * Export Lot ID if file is associated with an export lot
   * @example "export_lot_123"
   */
  export_lot_id?: string;
  /**
   * User who created the association
   * @example "user123"
   */
  created_by: string;
  /**
   * Association creation timestamp
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  created_at: string;
  /**
   * User who last updated the association
   * @example "user123"
   */
  updated_by: string;
  /**
   * Association last update timestamp
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  updated_at: string;
}

export interface DeleteFileAssociationResponseDto {
  /**
   * Success message
   * @example "File association removed successfully"
   */
  message: string;
  /**
   * ID of the removed association
   * @format uuid
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  association_id: string;
}

export interface FileWithAssociationResponseDto {
  /**
   * Unique identifier for the uploaded file
   * @format uuid
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * Custom name for the file (if provided)
   * @maxLength 255
   * @example "Organic Farm Certificate 2024"
   */
  name?: string;
  /**
   * Original filename
   * @example "farm-certificate.pdf"
   */
  filename: string;
  /**
   * File size in bytes
   * @example 1024000
   */
  size: number;
  /**
   * MIME type of the file
   * @example "application/pdf"
   */
  mimetype: string;
  /**
   * S3 URL of the uploaded file
   * @format uri
   * @example "https://sit-traceability-user-files-bucket.s3.amazonaws.com/app-user/user123/documents/clh5x8k2a0000abcd1234efgh_farm-certificate.pdf"
   */
  url: string;
  /**
   * File description
   * @example "Farm certificate document"
   */
  description?: string;
  /**
   * User who uploaded the file
   * @example "user123"
   */
  uploaded_by: string;
  /**
   * Upload timestamp
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  uploaded_at: string;
  /** File associations with entities */
  associations: FileAssociationResponseDto[];
  /**
   * File creation timestamp
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  created_at: string;
  /**
   * File update timestamp
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  updated_at: string;
}

export interface PaginatedShipmentFilesResponseDto {
  /** Pagination metadata including skip, limit, and total count */
  meta: Meta;
  data: FileWithAssociationResponseDto[];
}

export interface PaginatedBinFilesResponseDto {
  /** Pagination metadata including skip, limit, and total count */
  meta: Meta;
  data: FileWithAssociationResponseDto[];
}

export interface PaginatedSaleLotFilesResponseDto {
  /** Pagination metadata including skip, limit, and total count */
  meta: Meta;
  data: FileWithAssociationResponseDto[];
}

export interface PaginatedPalletFilesResponseDto {
  /** Pagination metadata including skip, limit, and total count */
  meta: Meta;
  data: FileWithAssociationResponseDto[];
}

export interface PaginatedExportLotFilesResponseDto {
  /** Pagination metadata including skip, limit, and total count */
  meta: Meta;
  data: FileWithAssociationResponseDto[];
}

export interface FarmCoordinateV2 {
  /**
   * Latitude of the farm location
   * @example 21.0285
   */
  latitude: number;
  /**
   * Longitude of the farm location
   * @example 105.8542
   */
  longitude: number;
}

export interface CreateFarmPointsV2Dto {
  /**
   * Coordinates of the farm location
   * @example [{"latitude":21.0285,"longitude":105.8542},{"latitude":10.7769,"longitude":106.7009},{"latitude":12.3456,"longitude":98.7654}]
   */
  coordinates: FarmCoordinateV2[];
}

export interface CreateFarmOwnerV2Dto {
  /**
   * First name of the owner (required)
   * @example "John"
   */
  first_name: string;
  /**
   * Last name of the owner (required)
   * @example "Doe"
   */
  last_name: string;
  /**
   * Gender of the owner
   * @example "male"
   */
  gender?: string;
  /**
   * Ethnicity of the owner
   * @example "Asian"
   */
  ethnicity?: string;
  /**
   * Year of birth
   * @min 1900
   * @max 2024
   * @example 1980
   */
  year_of_birth?: number;
  /**
   * National ID number
   * @example "123456789"
   */
  national_id_number?: string;
  /**
   * Phone number
   * @example "+84901234567"
   */
  phone_number?: string;
  /**
   * Email address
   * @example "john.doe@email.com"
   */
  email?: string;
  /**
   * IMS code
   * @example "IMS123456"
   */
  ims_code?: string;
  /**
   * Address
   * @example "456 Main Street, District 1"
   */
  address?: string;
  /**
   * Ward or town
   * @example "Ward 5"
   */
  ward_town?: string;
  /**
   * District or city
   * @example "Ho Chi Minh City"
   */
  district_city?: string;
  /**
   * Contact person name
   * @example "Jane Doe"
   */
  contact_person?: string;
  /**
   * Contact person phone number
   * @example "+84907654321"
   */
  contact_person_phone_number?: string;
  /**
   * Relationship to owner
   * @example "spouse"
   */
  relationship_to_owner?: string;
}

export interface CreateFarmAreaV2Dto {
  /**
   * Name of the farm area
   * @maxLength 255
   * @example "North Field"
   */
  name: string;
  /**
   * Area size (numeric value)
   * @min 0
   * @example 2.5
   */
  area: number;
  /**
   * Unit of measurement for the area
   * @maxLength 50
   * @example "hectares"
   */
  unit: string;
}

export interface CreateFarmPlantV2Dto {
  /**
   * Year of planting
   * @min 1900
   * @max 2100
   * @example 2024
   */
  year: number;
  /**
   * Type of tree planted
   * @example "Coffee Arabica"
   */
  tree_type: string;
  /**
   * Number of trees planted
   * @min 1
   * @example 150
   */
  number_of_tree: number;
}

export interface CreateFarmProductV2Dto {
  /**
   * Production year
   * @min 1900
   * @max 2100
   * @example 2024
   */
  year: number;
  /**
   * Product variety
   * @example "Arabica"
   */
  variety: string;
  /**
   * Total production volume (in kg)
   * @min 0
   * @example 1500.5
   */
  volume: number;
  /**
   * Contracted volume for sale (in kg)
   * @min 0
   * @example 1200
   */
  contracted_volume: number;
}

export interface CreateFarmerFarmDto {
  /**
   * Address of the farm
   * @example "123 Nguyen Trai, Hanoi, Vietnam"
   */
  address: string;
  /**
   * Country ID for the farm location
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  country_id?: string;
  /**
   * Province ID for the farm location
   * @example "cm3q8j9k0000115txhqz0abce"
   */
  province_id?: string;
  /**
   * Enable central farm - true for CENTRAL, false for STANDALONE
   * @example false
   */
  is_central_farm?: boolean;
  /**
   * Array of certificate type IDs to assign to the farm
   * @example ["cm123","cm456"]
   */
  certificate_ids?: string[];
  /** Farm coordinates (points defining farm boundaries) */
  points?: CreateFarmPointsV2Dto[];
  /** Farm owner information (required) */
  owner: CreateFarmOwnerV2Dto;
  /** Array of farm areas */
  areas?: CreateFarmAreaV2Dto[];
  /** Array of farm plants */
  plants?: CreateFarmPlantV2Dto[];
  /** Array of farm products */
  products?: CreateFarmProductV2Dto[];
}

export interface CreateFarmerFarmResponseDto {
  /**
   * Unique identifier for the farm
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Farm FID (8-character unique identifier)
   * @example "F1A2B3C4"
   */
  fid: string;
  /**
   * Number of farm points created
   * @example 4
   */
  points_created: number;
  /**
   * Owner created successfully
   * @example true
   */
  owner_created: boolean;
  /**
   * Number of farm areas created
   * @example 2
   */
  areas_created: number;
  /**
   * Number of farm plants created
   * @example 3
   */
  plants_created: number;
  /**
   * Number of farm products created
   * @example 2
   */
  products_created: number;
  /**
   * Creation summary message
   * @example "Farm and all related entities created successfully"
   */
  message: string;
  /**
   * Farmer ID that owns this farm
   * @example "user_123"
   */
  farmer_id: string;
}

export interface CreateNearbyFarmProductDto {
  /**
   * Production year
   * @min 1900
   * @max 2100
   * @example 2024
   */
  year: number;
  /**
   * Product variety
   * @example "Arabica"
   */
  variety: string;
  /**
   * Total production volume (in kg)
   * @min 0
   * @example 1500.5
   */
  volume: number;
}

export interface CreateNearbyFarmRequestDto {
  /**
   * Address of the nearby farm
   * @example "123 Main St, District 1"
   */
  address: string;
  /**
   * Country ID of the nearby farm location
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  country_id: string;
  /**
   * Province ID of the nearby farm location
   * @example "cm3q8j9k0000115txhqz0abce"
   */
  province_id: string;
  /** Farm boundary points (GPS coordinates) */
  points?: CreateFarmPointsV2Dto[];
  /** Owner information for the nearby farm */
  owner?: CreateFarmOwnerV2Dto;
  /** Farm areas for the nearby farm */
  areas?: CreateFarmAreaV2Dto[];
  /** Farm plants for the nearby farm */
  plants?: CreateFarmPlantV2Dto[];
  /** Farm products for the nearby farm */
  products?: CreateNearbyFarmProductDto[];
  /**
   * Certificate type IDs to assign to the nearby farm
   * @example ["cm123","cm456"]
   */
  certificate_ids?: string[];
}

export interface CreateNearbyFarmResponseDto {
  /**
   * ID of the created nearby farm
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  nearby_farm_id: string;
  /**
   * Type of the farm (always NEARBY for this endpoint)
   * @example "NEARBY"
   */
  farm_type: string;
  /**
   * Unique 8-character FID for the nearby farm
   * @example "A1B2C3D4"
   */
  fid: string;
  /**
   * ID of the nearby farm relationship record
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  relationship_id: string;
  /**
   * Date and time when the nearby farm was created
   * @format date-time
   * @example "2025-01-15T10:30:00.000Z"
   */
  created_at: string;
  /**
   * Number of farm points created
   * @example 3
   */
  points_created?: number;
  /**
   * Whether farm owner was created
   * @example true
   */
  owner_created?: boolean;
  /**
   * Number of farm areas created
   * @example 2
   */
  areas_created?: number;
  /**
   * Number of farm plants created
   * @example 1
   */
  plants_created?: number;
  /**
   * Number of farm products created
   * @example 1
   */
  products_created?: number;
  /**
   * Success message
   * @example "Nearby farm and all related entities created successfully"
   */
  message: string;
}

export interface CertificateTypeInfo {
  /**
   * Certificate type ID
   * @example "ct123456789"
   */
  id: string;
  /**
   * Certificate type name
   * @example "EUDR"
   */
  name: string;
}

export interface PartialTypeClass {
  /**
   * Farm certificate ID
   * @example "fc123456789"
   */
  id?: string;
  /**
   * Farm ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farm_id?: string;
  /** Certificate type information */
  certificate_type?: CertificateTypeInfo;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2025-09-09T12:00:00.000Z"
   */
  created_at?: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2025-09-09T12:00:00.000Z"
   */
  updated_at?: string;
}

export interface FarmListItemDto {
  /** @example "cm3q8j9k0000114txhqz0abcd" */
  farm_id: string;
  /** @example "DLK-2025-001" */
  fid: string;
  /** @example "Trần Hùng Anh" */
  owner_name: string;
  /** @example 1.01 */
  total_area: number;
  /** @example 1.01 */
  contractual_volume: number;
  /** @example "Đắk Nông" */
  address: string;
  /** @example "Đắk Nông" */
  province_name: string;
  /** @example ["Cà phê Robusta"] */
  products: string[];
  certificates: PartialTypeClass[];
  /** Farm type */
  farm_type?: string;
  /**
   * When this farm is a nearby farm, the id of its linked central farm
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  central_farm_id?: string;
}

export interface PaginatedFarmListDto {
  /** Pagination metadata including skip, limit, and total count */
  meta: Meta;
  data: FarmListItemDto[];
}

export interface NearbyFarmStatisticsResponseDto {
  /**
   * Total number of nearby farms linked to this central farm
   * @example 5
   */
  total_farms: number;
  /**
   * Total area of all nearby farms in square meters
   * @example 125000.5
   */
  total_area: number;
  /**
   * Total contractual volume of all nearby farms in kilograms
   * @example 45000.75
   */
  total_contractual_volume: number;
  /**
   * Number of nearby farms with EUDR certificate
   * @example 4
   */
  eudr_compliant_farms: number;
}

export interface FarmerOrganizationListDto {
  /**
   * Organization ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  organization_id: string;
  /**
   * Organization name
   * @example "Green Coffee Processing Co."
   */
  organization_name: string;
  /**
   * Organization phone number
   * @example "+1234567890"
   */
  phone?: string;
  /**
   * Organization type
   * @example "FACTORY"
   */
  organization_type: string;
  /**
   * Date when organization was created
   * @format date-time
   * @example "2024-01-15T10:30:00Z"
   */
  created_at: string;
  /**
   * Date when organization was last updated
   * @format date-time
   * @example "2024-01-15T10:30:00Z"
   */
  updated_at: string;
}

export interface PaginatedFarmerFactoryResponseDto {
  /** Pagination metadata including skip, limit, and total count */
  meta: Meta;
  data: FarmerOrganizationListDto[];
}

export interface ShareFarmToFactoryDto {
  /**
   * Factory ID to share the farm with
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  factory_id: string;
  /**
   * Permission level for the shared farm
   * @default "READ_ONLY"
   * @example "READ_ONLY"
   */
  permission?: 'FULL_ACCESS' | 'READ_ONLY';
}

export interface ShareFarmToFactoryResponseDto {
  /**
   * Farm organization relationship ID
   * @example "cm3q8j9k0000114txhqz0efgh"
   */
  id: string;
  /**
   * Farm ID that was shared
   * @example "cm3q8j9k0000114txhqz0farm"
   */
  farm_id: string;
  /**
   * Factory organization ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  factory_id: string;
  /**
   * Factory name
   * @example "Green Coffee Processing Co."
   */
  factory_name: string;
  /**
   * Permission level for the shared farm
   * @example "READ_ONLY"
   */
  permission: 'FULL_ACCESS' | 'READ_ONLY';
  /**
   * Date when farm was shared
   * @format date-time
   * @example "2024-01-15T10:30:00Z"
   */
  shared_at: string;
}

export interface FarmerSharedFactoryDto {
  /**
   * Factory organization ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Factory full name
   * @example "Green Coffee Processing Co."
   */
  name: string;
  /**
   * Permission level for the shared farm
   * @example "READ_ONLY"
   */
  permission: 'FULL_ACCESS' | 'READ_ONLY';
  /**
   * Date when farm was shared
   * @format date-time
   * @example "2024-01-15T10:30:00Z"
   */
  shared_at: string;
}

export interface PaginatedFarmerSharedFactoriesResponseDto {
  /** Pagination metadata including skip, limit, and total count */
  meta: Meta;
  data: FarmerSharedFactoryDto[];
}

export interface CopyFarmDataResponseDto {
  /**
   * Newly created farm ID
   * @example "cm3q8j9k0000114txhqz0efgh"
   */
  farm_id: string;
  /**
   * Farm identifier (FID)
   * @example "ABC12345"
   */
  fid: string;
  /**
   * Source farm ID that data was copied from
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  source_farm_id: string;
  /**
   * Data types that were copied
   * @example ["owner"]
   */
  copied_data_types: string[];
  /**
   * Unique identifier for the copied owner
   * @example "cl8v1k2z00000u8l2g7qv1k2z"
   */
  owner_id: string;
  /**
   * First name of the owner
   * @example "John"
   */
  first_name: string;
  /**
   * Last name of the owner
   * @example "Doe"
   */
  last_name: string;
  /**
   * Gender of the owner
   * @example "male"
   */
  gender: string;
  /**
   * Ethnicity of the owner
   * @example "Asian"
   */
  ethnicity: string;
  /**
   * Year of birth
   * @example 1980
   */
  year_of_birth: number;
  /**
   * National ID number
   * @example "123456789"
   */
  national_id_number: string;
  /**
   * Phone number
   * @example "+819012345678"
   */
  phone_number: string;
  /**
   * Email address
   * @example "john@example.com"
   */
  email: string;
  /**
   * IMS code
   * @example "IMS123"
   */
  ims_code: string;
  /**
   * Address of the owner
   * @example "123 Main St, Tokyo"
   */
  address: string;
  /**
   * Ward/Town
   * @example "Ward 1"
   */
  ward_town: string;
  /**
   * District/City
   * @example "District 1"
   */
  district_city: string;
  /**
   * Contact person name
   * @example "Jane Doe"
   */
  contact_person: string;
  /**
   * Contact person phone number
   * @example "+819087654321"
   */
  contact_person_phone_number: string;
  /**
   * Relationship to owner
   * @example "Spouse"
   */
  relationship_to_owner: string;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  created_at: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  updated_at: string;
}

export interface FarmStatisticsResponseDto {
  /**
   * Total number of farms created by the user
   * @example 25
   */
  total_farms: number;
  /**
   * Total area of all farms created by the user
   * @example 150.5
   */
  total_area: number;
  /**
   * Total contractual volume from all farm products
   * @example 1250.75
   */
  total_contractual_volume: number;
  /**
   * Number of farms that are EUDR compliant (have EUDR certificate)
   * @example 12
   */
  eudr_compliant_farms: number;
}

export interface FarmCountryDto {
  /** @example "cm3q8j9k0000114txhqz0abcd" */
  id: string;
  /** @example "Vietnam" */
  name: string;
  /** @example "VN" */
  country_code: string;
}

export interface FarmProvinceDto {
  /** @example "cm3q8j9k0000115txhqz0abce" */
  id: string;
  /** @example "Ho Chi Minh City" */
  name: string;
  /** @example "HCM" */
  province_code: string;
  /** @example "cm3q8j9k0000114txhqz0abcd" */
  country_id: string;
}

export interface FarmCertificateWithTypeDto {
  /**
   * Farm certificate ID
   * @example "fc123456789"
   */
  id: string;
  /**
   * Farm ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farm_id: string;
  /** Certificate type information */
  certificate_type: CertificateTypeInfo;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2025-09-09T12:00:00.000Z"
   */
  created_at: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2025-09-09T12:00:00.000Z"
   */
  updated_at: string;
}

export interface DetailFarmAreaDto {
  /**
   * Unique identifier for the farm area record
   * @format uuid
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * Farm ID where the area is located
   * @example "farm_123456789"
   */
  farm_id: string;
  /**
   * Name of the farm area
   * @example "North Field"
   */
  name: string;
  /**
   * Area size (numeric value)
   * @example 2.5
   */
  area: number;
  /**
   * Unit of measurement for the area
   * @example "hectares"
   */
  unit: string;
  /**
   * User who created the record
   * @example "user123"
   */
  created_by: string;
  /**
   * Record creation timestamp
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  created_at: string;
  /**
   * User who last updated the record
   * @example "user123"
   */
  updated_by: string;
  /**
   * Record last update timestamp
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  updated_at: string;
}

export interface DetailFarmPlantDto {
  /**
   * Unique identifier for the farm plant record
   * @format uuid
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * Farm ID where the plant is located
   * @example "farm_123456789"
   */
  farm_id: string;
  /**
   * Year of planting
   * @example 2024
   */
  year: number;
  /**
   * Type of tree planted
   * @example "Coffee Arabica"
   */
  tree_type: string;
  /**
   * Number of trees planted
   * @example 150
   */
  number_of_tree: number;
  /**
   * User who created the record
   * @example "user123"
   */
  created_by: string;
  /**
   * Record creation timestamp
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  created_at: string;
  /**
   * User who last updated the record
   * @example "user123"
   */
  updated_by: string;
  /**
   * Record last update timestamp
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  updated_at: string;
}

export interface UpsertFarmOwnerResponse {
  /**
   * Unique identifier for the owner
   * @example "cl8v1k2z00000u8l2g7qv1k2z"
   */
  id: string;
  /**
   * Farm ID this owner belongs to
   * @example "FARM_123456"
   */
  farm_id: string;
  /**
   * First name of the owner
   * @example "John"
   */
  first_name?: string;
  /**
   * Last name of the owner
   * @example "Doe"
   */
  last_name?: string;
  /**
   * Gender of the owner
   * @example "male"
   */
  gender?: string;
  /**
   * Ethnicity of the owner
   * @example "Asian"
   */
  ethnicity?: string;
  /**
   * Year of birth
   * @example 1980
   */
  year_of_birth?: number;
  /**
   * National ID number
   * @example "123456789"
   */
  national_id_number?: string;
  /**
   * Phone number
   * @example "+819012345678"
   */
  phone_number?: string;
  /**
   * Email address
   * @example "john@example.com"
   */
  email?: string;
  /**
   * IMS code
   * @example "IMS123"
   */
  ims_code?: string;
  /**
   * Address of the owner
   * @example "123 Main St, Tokyo"
   */
  address?: string;
  /**
   * Ward or town
   * @example "Ward A"
   */
  ward_town?: string;
  /**
   * District or city
   * @example "District B"
   */
  district_city?: string;
  /**
   * User who created the owner record
   * @example "admin"
   */
  created_by: string;
  /**
   * Date and time when the owner was created
   * @format date-time
   * @example "2025-08-27T12:00:00.000Z"
   */
  created_at: string;
  /**
   * User who last updated the owner record
   * @example "admin"
   */
  updated_by: string;
  /**
   * Date and time when the owner was last updated
   * @format date-time
   * @example "2025-08-27T12:00:00.000Z"
   */
  updated_at: string;
  /**
   * User who deleted the owner record, if applicable
   * @example null
   */
  deleted_by?: string;
  /**
   * Date and time when the owner was deleted, if applicable
   * @format date-time
   * @example null
   */
  deleted_at?: string;
  /**
   * Contact person for the owner
   * @example "Jane Doe"
   */
  contact_person?: string;
  /**
   * Contact person phone number
   * @example "+819012345679"
   */
  contact_person_phone_number?: string;
  /**
   * Relationship to owner
   * @example "Spouse"
   */
  relationship_to_owner?: string;
}

export interface FarmProductDetailDto {
  /**
   * Farm product ID
   * @example "cuid_farm_product_123"
   */
  id: string;
  /**
   * Farm ID where the product is produced
   * @example "farm_123456789"
   */
  farm_id: string;
  /**
   * Production year
   * @example 2024
   */
  year: number;
  /**
   * Product variety
   * @example "Arabica"
   */
  variety: string;
  /**
   * Total production volume (in kg)
   * @example 1500.5
   */
  volume: number;
  /**
   * Contracted volume for sale (in kg)
   * @example 1200
   */
  contracted_volume: number;
  /**
   * User ID who created this record
   * @example "user_123456789"
   */
  created_by: string;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  created_at: string;
  /**
   * User ID who last updated this record
   * @example "user_123456789"
   */
  updated_by: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2024-01-16T14:20:00.000Z"
   */
  updated_at: string;
  /**
   * User ID who deleted this record
   * @example "user_123456789"
   */
  deleted_by?: string;
  /**
   * Deletion timestamp
   * @format date-time
   * @example "2024-01-20T09:15:00.000Z"
   */
  deleted_at?: string;
}

export interface FarmDetailResponse {
  /**
   * Unique identifier for the farm
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Farm FID (8-character unique identifier)
   * @example "F1A2B3C4"
   */
  fid?: string;
  /**
   * Date and time when the farm was created
   * @format date-time
   * @example "2025-08-27T12:00:00.000Z"
   */
  created_at: string;
  /**
   * Date and time when the farm was last updated
   * @format date-time
   * @example "2025-08-27T12:00:00.000Z"
   */
  updated_at: string;
  /**
   * User who created the farm record
   * @example "admin"
   */
  created_by: string;
  /**
   * User who last updated the farm record
   * @example "admin"
   */
  updated_by: string;
  /**
   * User who deleted the farm record, if applicable
   * @example null
   */
  deleted_by?: string;
  /**
   * Date and time when the farm was deleted, if applicable
   * @format date-time
   * @example null
   */
  deleted_at?: string;
  /**
   * Address of the farm
   * @example "123 Main St, Tokyo"
   */
  address: string;
  /**
   * Country ID of the farm location
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  country_id?: string;
  /**
   * Province ID of the farm location
   * @example "cm3q8j9k0000115txhqz0abce"
   */
  province_id?: string;
  /**
   * Type of the farm
   * @example "CENTRAL"
   */
  farm_type?: 'CENTRAL' | 'STANDALONE' | 'NEARBY';
  /**
   * Whether this is a central farm (true = CENTRAL, false = STANDALONE/NEARBY)
   * @example false
   */
  is_central_farm: boolean;
  /** Country information */
  country?: FarmCountryDto;
  /** Province information */
  province?: FarmProvinceDto;
  /** Farm certificates with type information */
  certificates?: FarmCertificateWithTypeDto[];
  /** Farm area records */
  farm_areas?: DetailFarmAreaDto[];
  /** Farm plant records */
  farm_plants?: DetailFarmPlantDto[];
  /** Farm owner information */
  owner?: UpsertFarmOwnerResponse;
  /** Farm product records */
  farm_products?: FarmProductDetailDto[];
}

export interface UpdateFarmDto {
  /**
   * Address of the farm
   * @example "123 Nguyen Trai, Hanoi, Vietnam"
   */
  address?: string;
  /**
   * Country ID for the farm location
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  country_id?: string;
  /**
   * Province ID for the farm location
   * @example "cm3q8j9k0000115txhqz0abce"
   */
  province_id?: string;
  /**
   * Enable central farm - true for CENTRAL, false for STANDALONE
   * @example false
   */
  is_central_farm?: boolean;
  /**
   * Array of certificate type IDs to assign to the farm (optional)
   * @example ["cm123","cm456"]
   */
  certificate_ids?: string[];
}

export interface UpdateNearbyFarmDto {
  /**
   * Address of the nearby farm
   * @example "123 Nguyen Trai, Hanoi, Vietnam"
   */
  address?: string;
  /**
   * Country ID for the nearby farm location
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  country_id?: string;
  /**
   * Province ID for the nearby farm location
   * @example "cm3q8j9k0000115txhqz0abce"
   */
  province_id?: string;
  /**
   * Array of certificate type IDs to assign to the nearby farm (optional)
   * @example ["cm123","cm456"]
   */
  certificate_ids?: string[];
}

export interface FarmPointDto {
  id: string;
  farm_id: string;
  latitude: number;
  longitude: number;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
}

export interface FarmPointResponse {
  data: FarmPointDto[];
}

export interface FarmCoordinate {
  /**
   * Latitude of the farm location
   * @example 21.0285
   */
  latitude: number;
  /**
   * Longitude of the farm location
   * @example 105.8542
   */
  longitude: number;
}

export interface CreateFarmPointsDto {
  /**
   * Coordinates of the farm location
   * @example [{"latitude":21.0285,"longitude":105.8542},{"latitude":10.7769,"longitude":106.7009},{"latitude":12.3456,"longitude":98.7654}]
   */
  coordinates: FarmCoordinate[];
}

export interface UpsertFarmOwner {
  /**
   * Farm ID this owner belongs to
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farm_id: string;
  /**
   * First name of the owner
   * @example "John"
   */
  first_name?: string;
  /**
   * Last name of the owner
   * @example "Doe"
   */
  last_name?: string;
  /**
   * Gender of the owner
   * @example "male"
   */
  gender?: string;
  /**
   * Ethnicity of the owner
   * @example "Asian"
   */
  ethnicity?: string;
  /**
   * Year of birth
   * @example 1980
   */
  year_of_birth?: number;
  /**
   * National ID number
   * @example "123456789"
   */
  national_id_number?: string;
  /**
   * Phone number
   * @example "+819012345678"
   */
  phone_number?: string;
  /**
   * Email address
   * @example "john@example.com"
   */
  email?: string;
  /**
   * IMS code
   * @example "IMS123"
   */
  ims_code?: string;
  /**
   * Address of the owner
   * @example "123 Main St, Tokyo"
   */
  address?: string;
  /**
   * Ward or town
   * @example "Ward A"
   */
  ward_town?: string;
  /**
   * District or city
   * @example "District B"
   */
  district_city?: string;
  /**
   * Contact person for the owner
   * @example "Jane Doe"
   */
  contact_person?: string;
  /**
   * Contact person phone number
   * @example "+819012345679"
   */
  contact_person_phone_number?: string;
  /**
   * Relationship to owner
   * @example "Spouse"
   */
  relationship_to_owner?: string;
}

export interface BulkFarmAreaItemDto {
  /**
   * Farm area ID for update/delete operations. Omit for create operations.
   * @example "cuid_farm_area_123"
   */
  id?: string;
  /**
   * Operation type: create, update, or delete
   * @example "create"
   */
  operation: 'create' | 'update' | 'delete';
  /**
   * Name of the farm area (required for create, optional for update)
   * @maxLength 255
   * @example "North Field"
   */
  name?: string;
  /**
   * Area size (required for create, optional for update)
   * @min 0.01
   * @example 2.5
   */
  area?: number;
  /**
   * Unit of measurement (required for create, optional for update)
   * @maxLength 50
   * @example "hectares"
   */
  unit?: string;
}

export interface BulkUpdateFarmAreaDto {
  /**
   * Farm ID where the areas belong
   * @example "farm_123456789"
   */
  farm_id: string;
  /** Array of farm area operations to perform */
  areas: BulkFarmAreaItemDto[];
}

export interface BulkFarmPlantItemDto {
  /**
   * Farm plant ID for update/delete operations. Omit for create operations.
   * @example "cuid_farm_plant_123"
   */
  id?: string;
  /**
   * Operation type: create, update, or delete
   * @example "create"
   */
  operation: 'create' | 'update' | 'delete';
  /**
   * Planting year (required for create, optional for update)
   * @min 1900
   * @max 2100
   * @example 2024
   */
  year?: number;
  /**
   * Tree type (required for create, optional for update)
   * @example "Coffee Arabica"
   */
  tree_type?: string;
  /**
   * Number of trees (required for create, optional for update)
   * @min 1
   * @example 500
   */
  number_of_trees?: number;
}

export interface BulkUpdateFarmPlantDto {
  /**
   * Farm ID where the plants belong
   * @example "farm_123456789"
   */
  farm_id: string;
  /** Array of farm plant operations to perform */
  plants: BulkFarmPlantItemDto[];
}

export interface BulkFarmProductItemDto {
  /**
   * Farm product ID for update/delete operations. Omit for create operations.
   * @example "cuid_farm_product_123"
   */
  id?: string;
  /**
   * Operation type: create, update, or delete
   * @example "create"
   */
  operation: 'create' | 'update' | 'delete';
  /**
   * Production year (required for create, optional for update)
   * @min 1900
   * @max 2100
   * @example 2024
   */
  year?: number;
  /**
   * Product variety (required for create, optional for update)
   * @example "Arabica"
   */
  variety?: string;
  /**
   * Total production volume in kg (required for create, optional for update)
   * @min 0
   * @example 1500.5
   */
  volume?: number;
  /**
   * Contracted volume for sale in kg (required for create, optional for update)
   * @min 0
   * @example 1200
   */
  contracted_volume?: number;
}

export interface BulkUpdateFarmProductDto {
  /**
   * Farm ID where the products belong
   * @example "farm_123456789"
   */
  farm_id: string;
  /** Array of farm product operations to perform */
  products: BulkFarmProductItemDto[];
}

export interface FarmerUpdateFarmSharePermissionDto {
  /**
   * Factory organization ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  factory_id: string;
  /**
   * New permission level for the shared farm
   * @example "FULL_ACCESS"
   */
  permission: 'FULL_ACCESS' | 'READ_ONLY';
}

export interface FarmerUpdateFarmSharePermissionResponseDto {
  /**
   * Factory organization ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Factory organization name
   * @example "Green Coffee Processing Co."
   */
  name: string;
  /**
   * Updated permission level
   * @example "FULL_ACCESS"
   */
  permission: 'FULL_ACCESS' | 'READ_ONLY';
  /**
   * Date when farm was originally shared
   * @format date-time
   * @example "2024-01-15T10:30:00Z"
   */
  shared_at: string;
}

export interface FarmerRemoveFarmShareAccessDto {
  /**
   * Factory organization ID to remove access from
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  factory_id: string;
}

export interface CultivationLogDetailResponse {
  /**
   * Unique identifier of the cultivation log
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * Farm ID where the cultivation activity took place
   * @example "FARM_1234567890"
   */
  farm_id?: string;
  /**
   * Type of cultivation activity performed
   * @example "fertilizing"
   */
  activity?: string;
  /**
   * Batch number (Số đợt)
   * @example 1
   */
  batch_number?: number;
  /**
   * Quantity of material used (Số lượng)
   * @example 50.5
   */
  quantity?: number;
  /**
   * Unit of measurement for the quantity (đơn vị)
   * @example "kg"
   */
  unit?: string;
  /**
   * Material used in the cultivation activity
   * @example "Phân NPK"
   */
  material?: string;
  /**
   * Cost of the activity (Chi phí)
   * @example 150000
   */
  cost?: number;
  /**
   * Additional notes about the cultivation activity (Ghi chú)
   * @example "Applied organic fertilizer to improve soil nutrients"
   */
  notes?: string;
  /**
   * Person responsible for the cultivation activity (Người thực hiện)
   * @example "John Doe"
   */
  person_in_charge?: string;
  /**
   * Type of fertilizer when activity is "Bón phân"
   * @example "npk"
   */
  fertilizer_type?: 'npk' | 'manure' | 'bio' | 'other';
  /**
   * Other fertilizer types when fertilizer_type is "Phân khác"
   * @example ["urea","phosphate"]
   */
  other_fertilizer_types?: ('urea' | 'phosphate' | 'potash' | 'sa' | 'other')[];
  /**
   * Types of pests when activity is "Phun thuốc BVTV"
   * @example ["aphids","rust"]
   */
  pest_types?: ('aphids' | 'pink_fungus' | 'rust' | 'brown_planthopper')[];
  /**
   * Name of the material or product used (deprecated)
   * @example "Organic Compost"
   */
  name?: string;
  /**
   * Date when the cultivation activity was performed
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  date?: string;
  /**
   * User who created the cultivation log
   * @example "user123"
   */
  created_by?: string;
  /**
   * Timestamp when the cultivation log was created
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  created_at?: string;
  /**
   * User who last updated the cultivation log
   * @example "user123"
   */
  updated_by?: string;
  /**
   * Timestamp when the cultivation log was last updated
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  updated_at?: string;
}

export interface PaginatedCultivationLogResponseDto {
  /** Array of cultivation logs */
  data: CultivationLogDetailResponse[];
  /** Pagination metadata */
  meta: Meta;
}

export interface FarmerCreateCultivationLogDto {
  /**
   * Type of cultivation activity performed
   * @example "fertilizing"
   */
  activity?: 'seedings' | 'fertilizing' | 'pest_control_spraying';
  /**
   * Batch number (Số đợt)
   * @example 1
   */
  batch_number?: number;
  /**
   * Quantity of material used (Số lượng)
   * @example 50.5
   */
  quantity?: number;
  /**
   * Unit of measurement for the quantity (đơn vị)
   * @example "kg"
   */
  unit?: string;
  /**
   * Material used in the cultivation activity
   * @example "Phân NPK"
   */
  material?: string;
  /**
   * Cost of the activity (Chi phí)
   * @example 150000
   */
  cost?: number;
  /**
   * Additional notes about the cultivation activity (Ghi chú)
   * @example "Applied organic fertilizer to improve soil nutrients"
   */
  notes?: string;
  /**
   * Person responsible for the cultivation activity (Người thực hiện)
   * @example "John Doe"
   */
  person_in_charge?: string;
  /**
   * Type of fertilizer when activity is "Bón phân"
   * @example "npk"
   */
  fertilizer_type?: 'npk' | 'manure' | 'bio' | 'other';
  /**
   * Other fertilizer types when fertilizer_type is "Phân khác"
   * @example ["urea","phosphate"]
   */
  other_fertilizer_types?: ('urea' | 'phosphate' | 'potash' | 'sa' | 'other')[];
  /**
   * Types of pests when activity is "Phun thuốc BVTV"
   * @example ["aphids","rust"]
   */
  pest_types?: ('aphids' | 'pink_fungus' | 'rust' | 'brown_planthopper')[];
  /**
   * Name of the material or product used (deprecated - use material)
   * @example "Organic Compost"
   */
  name?: string;
  /**
   * Date when the cultivation activity was performed (ISO 8601 format)
   * @example "2024-03-15T10:00:00Z"
   */
  date?: string;
  /**
   * Farm ID where the cultivation activity took place (required for farmer)
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farm_id: string;
}

export interface FarmerUpdateCultivationLogDto {
  /**
   * Type of cultivation activity performed
   * @example "fertilizing"
   */
  activity?: 'seedings' | 'fertilizing' | 'pest_control_spraying';
  /**
   * Batch number (Số đợt)
   * @example 1
   */
  batch_number?: number;
  /**
   * Quantity of material used (Số lượng)
   * @example 50.5
   */
  quantity?: number;
  /**
   * Unit of measurement for the quantity (đơn vị)
   * @example "kg"
   */
  unit?: string;
  /**
   * Material used in the cultivation activity
   * @example "Phân NPK"
   */
  material?: string;
  /**
   * Cost of the activity (Chi phí)
   * @example 150000
   */
  cost?: number;
  /**
   * Additional notes about the cultivation activity (Ghi chú)
   * @example "Applied organic fertilizer to improve soil nutrients"
   */
  notes?: string;
  /**
   * Person responsible for the cultivation activity (Người thực hiện)
   * @example "John Doe"
   */
  person_in_charge?: string;
  /**
   * Type of fertilizer when activity is "Bón phân"
   * @example "npk"
   */
  fertilizer_type?: 'npk' | 'manure' | 'bio' | 'other';
  /**
   * Other fertilizer types when fertilizer_type is "Phân khác"
   * @example ["urea","phosphate"]
   */
  other_fertilizer_types?: ('urea' | 'phosphate' | 'potash' | 'sa' | 'other')[];
  /**
   * Types of pests when activity is "Phun thuốc BVTV"
   * @example ["aphids","rust"]
   */
  pest_types?: ('aphids' | 'pink_fungus' | 'rust' | 'brown_planthopper')[];
  /**
   * Name of the material or product used (deprecated - use material)
   * @example "Organic Compost"
   */
  name?: string;
  /**
   * Date when the cultivation activity was performed (ISO 8601 format)
   * @example "2024-03-15T10:00:00Z"
   */
  date?: string;
}

export interface HarvestLogDetailResponse {
  /**
   * Unique identifier of the harvest log
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * Farm ID where the harvest activity took place
   * @example "FARM_1234567890"
   */
  farm_id?: string;
  /**
   * Method used for harvesting
   * @example "Hand picking"
   */
  harvest_method?: string;
  /**
   * Additional notes about the harvest activity
   * @example "Harvested ripe fruits from the northern section"
   */
  notes?: string;
  /**
   * Variety of the harvested product
   * @example "Arabica Premium"
   */
  variety?: string;
  /**
   * Quantity of harvested product
   * @example 150.5
   */
  quantity?: number;
  /**
   * Unit of measurement for the quantity
   * @example "kg"
   */
  unit?: string;
  /**
   * Person responsible for the harvest activity
   * @example "John Doe"
   */
  person_in_charge?: string;
  /**
   * Date when the harvest activity was performed
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  date?: string;
}

export interface PaginatedHarvestLogResponseDto {
  /** Array of harvest logs */
  data: HarvestLogDetailResponse[];
  /** Pagination metadata */
  meta: Meta;
}

export interface CreateHarvestLogWithFilesDto {
  /**
   * Method used for harvesting
   * @example "Hand picking"
   */
  harvest_method?: string;
  /**
   * Additional notes about the harvest activity
   * @example "Harvested ripe fruits from the northern section"
   */
  notes?: string;
  /**
   * Variety of the harvested product
   * @example "Arabica Premium"
   */
  variety?: string;
  /**
   * Quantity of harvested product
   * @example 150.5
   */
  quantity?: number;
  /**
   * Unit of measurement for the quantity
   * @example "kg"
   */
  unit?: string;
  /**
   * Person responsible for the harvest activity
   * @example "John Doe"
   */
  person_in_charge?: string;
  /**
   * Date when the harvest activity was performed (ISO 8601 format)
   * @example "2024-03-15T10:00:00Z"
   */
  date?: string;
  /**
   * Optional file attachments (PDF, DOC, DOCX, XLS, XLSX, JPEG, PNG). Maximum 5 files, each up to 20MB
   * @maxItems 5
   */
  files?: File[];
}

export interface CreateHarvestLogResponseDto {
  /**
   * Unique identifier of the created harvest log
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * Farm ID where the harvest activity took place
   * @example "FARM_1234567890"
   */
  farm_id?: string;
  /**
   * Method used for harvesting
   * @example "Hand picking"
   */
  harvest_method?: string;
  /**
   * Additional notes about the harvest activity
   * @example "Harvested ripe fruits from the northern section"
   */
  notes?: string;
  /**
   * Variety of the harvested product
   * @example "Arabica Premium"
   */
  variety?: string;
  /**
   * Quantity of harvested product
   * @example 150.5
   */
  quantity?: number;
  /**
   * Unit of measurement for the quantity
   * @example "kg"
   */
  unit?: string;
  /**
   * Person responsible for the harvest activity
   * @example "John Doe"
   */
  person_in_charge?: string;
  /**
   * Date when the harvest activity was performed
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  date?: string;
  /**
   * User who created the harvest log
   * @example "user123"
   */
  created_by: string;
  /**
   * Timestamp when the harvest log was created
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  created_at: string;
  /**
   * User who last updated the harvest log
   * @example "user123"
   */
  updated_by: string;
  /**
   * Timestamp when the harvest log was last updated
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  updated_at: string;
}

export interface UpdateHarvestLogWithFilesDto {
  /**
   * Method used for harvesting
   * @example "Hand picking"
   */
  harvest_method?: string;
  /**
   * Additional notes about the harvest activity
   * @example "Harvested ripe fruits from the northern section"
   */
  notes?: string;
  /**
   * Variety of the harvested product
   * @example "Arabica Premium"
   */
  variety?: string;
  /**
   * Quantity of harvested product
   * @example 150.5
   */
  quantity?: number;
  /**
   * Unit of measurement for the quantity
   * @example "kg"
   */
  unit?: string;
  /**
   * Person responsible for the harvest activity
   * @example "John Doe"
   */
  person_in_charge?: string;
  /**
   * Date when the harvest activity was performed (ISO 8601 format)
   * @example "2024-03-15T10:00:00Z"
   */
  date?: string;
  /**
   * Optional file attachments (PDF, DOC, DOCX, XLS, XLSX, JPEG, PNG). Maximum 5 files, each up to 20MB
   * @maxItems 5
   */
  files?: File[];
}

export interface UpdateHarvestLogResponseDto {
  /**
   * Unique identifier of the updated harvest log
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * Farm ID where the harvest activity took place
   * @example "FARM_1234567890"
   */
  farm_id?: string;
  /**
   * Method used for harvesting
   * @example "Hand picking"
   */
  harvest_method?: string;
  /**
   * Additional notes about the harvest activity
   * @example "Harvested ripe fruits from the northern section"
   */
  notes?: string;
  /**
   * Variety of the harvested product
   * @example "Arabica Premium"
   */
  variety?: string;
  /**
   * Quantity of harvested product
   * @example 150.5
   */
  quantity?: number;
  /**
   * Unit of measurement for the quantity
   * @example "kg"
   */
  unit?: string;
  /**
   * Person responsible for the harvest activity
   * @example "John Doe"
   */
  person_in_charge?: string;
  /**
   * Date when the harvest activity was performed
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  date?: string;
  /**
   * User who created the harvest log
   * @example "user123"
   */
  created_by: string;
  /**
   * Timestamp when the harvest log was created
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  created_at: string;
  /**
   * User who last updated the harvest log
   * @example "user123"
   */
  updated_by: string;
  /**
   * Timestamp when the harvest log was last updated
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  updated_at: string;
}

export interface HarvestLogFileResponse {
  /**
   * Unique identifier of the file
   * @example "f1a2b3c4d5e6f7g8h9i0j1k2"
   */
  id: string;
  /**
   * Display name of the file
   * @example "harvest_report.pdf"
   */
  name: string;
  /**
   * Original filename when uploaded
   * @example "harvest_report_2024_03_15.pdf"
   */
  filename: string;
  /**
   * File size in bytes
   * @example 2048576
   */
  size: number;
  /**
   * MIME type of the file
   * @example "application/pdf"
   */
  mimetype: string;
  /**
   * Presigned URL for downloading the file
   * @example "https://s3.amazonaws.com/bucket/file?key=..."
   */
  url: string;
  /**
   * Description of the file content
   * @example "Harvest report for March 2024"
   */
  description?: string;
  /**
   * User who uploaded the file
   * @example "john.doe@example.com"
   */
  uploaded_by: string;
  /**
   * Timestamp when the file was uploaded
   * @format date-time
   * @example "2024-03-15T10:30:00.000Z"
   */
  uploaded_at: string;
  /**
   * Unique identifier of the file association
   * @example "a1b2c3d4e5f6g7h8i9j0k1l2"
   */
  association_id: string;
}

export interface PaginatedHarvestLogFilesResponseDto {
  /** Array of harvest log files */
  data: HarvestLogFileResponse[];
  /** Pagination metadata */
  meta: Meta;
}

export interface CreateFarmerPackageListDto {
  /**
   * Farm ID that the package list belongs to (must be associated with the factory)
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farm_id: string;
  /**
   * List of nearby farm IDs to include in this package (optional). Only CENTRAL farms are allowed to specify nearby farm IDs. Nearby farms and standalone farms MUST NOT provide this field.
   * @example ["nearby_farm_id_1","nearby_farm_id_2"]
   */
  nearby_farm_ids?: string[];
  /**
   * Coffee variety name
   * @example "Arabica"
   */
  variety: string;
  /**
   * Processing date
   * @format date
   * @example "2024-09-23"
   */
  date: string;
  /**
   * Processing step
   * @example "WET"
   */
  processing_step: 'NATURAL' | 'HONEY' | 'WET';
  /**
   * Type of bag used for packaging
   * @example "Jute Bag"
   */
  bag_type: string;
  /**
   * Total weight of all bags in kg
   * @min 0.01
   * @example 1000.5
   */
  total_weight: number;
  /**
   * Net weight per individual bag in kg
   * @min 0.01
   * @example 50
   */
  net_weight_per_bag: number;
}

export interface PackageItemResponseDto {
  /**
   * Unique identifier for the package item
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * Farm ID that the package item belongs to
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farm_id?: string;
  /**
   * Package list ID this item belongs to
   * @example "clh5x8k2a0000abcd1234efgi"
   */
  package_list_id?: string;
  /**
   * Package item ID
   * @example "PK-12345678"
   */
  package_item_id?: string;
  /**
   * Sequential package number within the list
   * @example 1
   */
  package_number?: number;
  /**
   * Weight of this individual package in kg
   * @example 50
   */
  weight?: number;
  /**
   * Actual weight of this individual package in kg
   * @example 50.5
   */
  actual_weight?: number;
  /**
   * Current status of the package
   * @example "WAITING_FOR_SCAN"
   */
  status: 'DRAFT' | 'READY' | 'WAITING_FOR_SCAN' | 'SHIPPED' | 'DAMAGED';
  /**
   * Sale lot ID this package is assigned to
   * @example "cm3q8j9k0000114txhqz0efgh"
   */
  sale_lot_id?: string;
  /**
   * Coffee variety
   * @example "Arabica"
   */
  variety?: string;
  /**
   * Processing step
   * @example "WET"
   */
  processing_step?: 'NATURAL' | 'HONEY' | 'WET';
  /**
   * Type of bag used
   * @example "Jute bag"
   */
  bag_type?: string;
  /**
   * User ID who created this package item
   * @example "user123"
   */
  created_by: string;
  /**
   * Package item creation timestamp
   * @format date-time
   * @example "2024-09-23T10:00:00.000Z"
   */
  created_at: string;
  /**
   * User ID who last updated this package item
   * @example "user123"
   */
  updated_by: string;
  /**
   * Package item last update timestamp
   * @format date-time
   * @example "2024-09-23T11:00:00.000Z"
   */
  updated_at: string;
  /**
   * Timestamp when the package item was deleted (if applicable)
   * @format date-time
   * @example "2024-03-20T09:00:00Z"
   */
  deleted_at?: string;
  /**
   * User ID who deleted this package item (if applicable)
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  deleted_by?: string;
  /** List of farms associated with this package item */
  farms?: {
    /** Farm ID */
    id?: string;
    /** Farm external ID */
    fid?: string | null;
    /** Farm type (CENTRAL or STANDALONE) */
    farm_type?: string;
  }[];
}

export interface FarmerPackageItemResponse {
  /**
   * Unique identifier for the package item
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * Farm ID that the package item belongs to
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farm_id: string;
  /**
   * Package list ID that contains this item
   * @example "clh5x8k2a0000abcd1234ijkl"
   */
  package_list_id: string;
  /**
   * Sequential package number within the list
   * @example 1
   */
  package_number: number;
  /**
   * Weight of this individual package in kg
   * @example 50
   */
  weight: number;
  /**
   * Current status of the package item
   * @example "WAITING_FOR_SCAN"
   */
  status: 'READY' | 'WAITING_FOR_SCAN' | 'SHIPPED' | 'DAMAGED';
  /**
   * User ID who created the package item
   * @example "clh5x8k2a0000abcd1234mnop"
   */
  created_by: string;
  /**
   * Timestamp when the package item was created
   * @format date-time
   * @example "2024-09-23T08:30:00.000Z"
   */
  created_at: string;
  /**
   * User ID who last updated the package item
   * @example "clh5x8k2a0000abcd1234mnop"
   */
  updated_by: string;
  /**
   * Timestamp when the package item was last updated
   * @format date-time
   * @example "2024-09-23T09:15:00.000Z"
   */
  updated_at: string;
  /**
   * Timestamp when the package item was deleted (soft delete)
   * @format date-time
   * @example null
   */
  deleted_at?: string;
  /**
   * User ID who deleted the package item
   * @example null
   */
  deleted_by?: string;
}

export interface FarmerPackageListResponse {
  /**
   * Unique identifier for the package list
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * Farm ID that the package list belongs to
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farm_id: string;
  /**
   * Coffee variety name
   * @example "Arabica"
   */
  variety: string;
  /**
   * Processing date
   * @format date-time
   * @example "2024-09-23T00:00:00.000Z"
   */
  date: string;
  /**
   * Processing step
   * @example "WET"
   */
  processing_step: 'NATURAL' | 'HONEY' | 'WET';
  /**
   * Type of bag used for packaging
   * @example "Jute Bag"
   */
  bag_type: string;
  /**
   * Total weight of all bags in kg
   * @example 1000.5
   */
  total_weight: number;
  /**
   * Net weight per individual bag in kg
   * @example 50
   */
  net_weight_per_bag: number;
  /**
   * Total number of bags in the package list
   * @example 20
   */
  total_bags: number;
  /**
   * User ID who created the package list
   * @example "clh5x8k2a0000abcd1234mnop"
   */
  created_by: string;
  /**
   * Timestamp when the package list was created
   * @format date-time
   * @example "2024-09-23T08:30:00.000Z"
   */
  created_at: string;
  /**
   * User ID who last updated the package list
   * @example "clh5x8k2a0000abcd1234mnop"
   */
  updated_by: string;
  /**
   * Timestamp when the package list was last updated
   * @format date-time
   * @example "2024-09-23T09:15:00.000Z"
   */
  updated_at: string;
  /**
   * Timestamp when the package list was deleted (soft delete)
   * @format date-time
   * @example null
   */
  deleted_at?: string;
  /**
   * User ID who deleted the package list
   * @example null
   */
  deleted_by?: string;
  /** Array of package items in this list */
  packages: FarmerPackageItemResponse[];
}

export interface PaginatedFarmerPackageListResponseDto {
  /** Array of package list entries */
  data: FarmerPackageListResponse[];
  /** Pagination metadata */
  meta: Meta;
}

export interface PaginatedPackageItemWithListResponseDto {
  /** Array of package item records with package list information */
  data: PackageItemResponseDto[];
  /** Pagination metadata including skip, limit, and total count */
  meta: Meta;
}

export interface UpdateFarmerPackageItemStatusDto {
  /**
   * New status for the package item
   * @example "READY"
   */
  status: 'READY' | 'WAITING_FOR_SCAN' | 'SHIPPED' | 'DAMAGED';
}

export interface UpdatePackageItemDto {
  /**
   * Coffee variety name
   * @example "Arabica"
   */
  variety: string;
  /**
   * Processing step
   * @example "WET"
   */
  processing_step: 'NATURAL' | 'HONEY' | 'WET';
  /**
   * Type of bag used for packaging
   * @example "Jute Bag"
   */
  bag_type: string;
  /**
   * Net weight per individual bag in kg
   * @min 0.01
   * @example 50
   */
  net_weight_per_bag: number;
  /**
   * Filter by package status (supports multiple values)
   * @example "WAITING_FOR_SCAN"
   */
  status: 'READY' | 'WAITING_FOR_SCAN' | 'SHIPPED' | 'DAMAGED';
}

export interface CreateSaleLotDto {
  /**
   * Date of the sale lot
   * @example "2024-01-15T10:30:00.000Z"
   */
  date: string;
  /**
   * Coffee variety for the sale lot
   * @example "Arabica Typica"
   */
  variety: string;
  /**
   * ID of the collector organization
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  collector_org_id: string;
  /**
   * Array of package item IDs to include in this sale lot
   * @example ["cm3q8j9k0000114txhqz0abcd","cm3q8j9k0000214txhqz0efgh"]
   */
  package_item_ids?: string[];
  /**
   * Additional notes about the sale lot
   * @example "High quality beans with excellent processing"
   */
  note?: string;
}

export interface CreateSaleLotResponseDto {
  /**
   * Unique identifier for the created sale lot
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Unique sale lot identifier
   * @example "SL-2024-001"
   */
  slid: string;
}

export interface SaleLotListItemDto {
  /**
   * Lot Id (ccid)
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Lot ID (Sale lot identifier)
   * @example "SL-2026-001"
   */
  slid: string;
  /**
   * Packaging date (DD-MM-YYYY format)
   * @format date-time
   * @example "04-02-2026"
   */
  packaging_date: string;
  /**
   * Total quantity in kg
   * @example "50"
   */
  quantity: number;
  /**
   * Coffee variety
   * @example "Arabica"
   */
  variety: string;
  /**
   * Collector organization name
   * @example "Example Organization"
   */
  collector_name: string;
  /**
   * Current status of the sale lot
   * @example "Waiting to Collect"
   */
  status:
    | 'WAITING_TO_COLLECT'
    | 'COLLECTED'
    | 'IN_TRANSIT'
    | 'ARRIVED_AT_FACTORY'
    | 'INTAKE'
    | 'CANCELLED';
  /**
   * Pickup date (DD-MM-YYYY format) or dash if not scheduled
   * @example "-"
   */
  pickup_date?: string;
}

export interface PaginatedSaleLotResponseDto {
  /** Array of sale lot items */
  data: SaleLotListItemDto[];
  /** Pagination metadata including skip, limit, and total count */
  meta: Meta;
}

export interface IntakeByUserDto {
  /**
   * Unique identifier for the user
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * User email address
   * @example "user@example.com"
   */
  email: string;
  /**
   * User full name
   * @example "John Doe"
   */
  full_name: string;
}

export interface CollectorDto {
  /**
   * Unique identifier for the collector organization
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Name of the collector organization
   * @example "Collector Organization Name"
   */
  name: string;
  /**
   * Phone number of the collector organization
   * @example "+1234567890"
   */
  phone: string;
}

export interface PackageItemDto {
  /**
   * Weight of the package
   * @example 60.5
   */
  weight: number;
}

export interface ShipmentDto {
  /**
   * Unique identifier for the shipment
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Shipment identifier
   * @example "SHIP-001"
   */
  shipment_id: string;
  /**
   * Organization ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  organization_id: string;
  /**
   * Ship date
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  ship_date: string;
  /**
   * Delivery date
   * @format date-time
   * @example "2024-01-16T15:00:00.000Z"
   */
  delivery_date: string;
  /**
   * Destination
   * @example "Processing Facility"
   */
  destination: string;
  /**
   * Truck ID
   * @example "TRUCK-001"
   */
  truck_id: string;
  /**
   * Shipment status
   * @example "IN_TRANSIT"
   */
  status: string;
  /**
   * Total weight
   * @example 1000.5
   */
  total_weight: number;
  /**
   * Total bags
   * @example 20
   */
  total_bags: number;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  created_at: string;
}

export interface FarmAreaDto {
  /**
   * Farm area size
   * @example 1000.5
   */
  area: number;
}

export interface FarmProductDto {
  /**
   * Product year
   * @example 2024
   */
  year: number;
  /**
   * Coffee variety
   * @example "Arabica Typica"
   */
  variety: string;
  /**
   * Product volume
   * @example 5000
   */
  volume: number;
  /**
   * Contracted volume
   * @example 4500
   */
  contracted_volume: number;
}

export interface CertificateTypeDto {
  /**
   * Unique identifier for the certificate type
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Name of the certificate type
   * @example "Organic Certification"
   */
  name: string;
}

export interface FarmCertificateDto {
  /**
   * Unique identifier for the farm certificate
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  created_at: string;
  /** Certificate type details */
  certificate_type: CertificateTypeDto;
}

export interface FarmDto {
  /**
   * Unique identifier for the farm
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Farm identifier
   * @example "FARM-001"
   */
  fid: string;
  /**
   * Farm address
   * @example "123 Main St, Coffee Town"
   */
  address: string;
  /** Farm areas */
  farm_areas: FarmAreaDto[];
  /** Farm geographic points */
  farm_points: FarmPointDto[];
  /** Farm products for current year */
  farm_products: FarmProductDto[];
  /** Farm certificates */
  farm_certificates: FarmCertificateDto[];
}

export interface ContributingFarmDto {
  /**
   * Unique identifier for the farm
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Farm identifier
   * @example "FARM-001"
   */
  fid: string;
  /**
   * Farm type
   * @example "CENTRAL"
   */
  farm_type: string;
}

export interface SaleLotDetailResponse {
  /**
   * Unique identifier for the sale lot
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Unique sale lot identifier
   * @example "SL-2024-001"
   */
  slid: string;
  /**
   * Date of the sale lot
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  date: string;
  /**
   * Pickup date of the sale lot
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  pickup_date: string;
  /**
   * Intake date of the sale lot
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  intake_date: string;
  /** User who intake the sale lot */
  intake_by?: IntakeByUserDto;
  /**
   * Coffee variety for the sale lot
   * @example "Arabica Typica"
   */
  variety: string;
  /**
   * ID of the collector organization
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  collector_org_id: string;
  /** Collector organization details */
  collector_org: CollectorDto;
  /** Package items associated with this sale lot */
  package_items: PackageItemDto[];
  /**
   * Additional notes about the sale lot
   * @example "High quality beans with excellent processing"
   */
  note?: string;
  /**
   * Status of the sale lot. Possible values: WAITING_TO_COLLECT, COLLECTED, IN_TRANSIT, CANCELLED
   * @example "WAITING_TO_COLLECT"
   */
  status: string;
  /**
   * User who created the sale lot
   * @example "user123"
   */
  created_by: string;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  created_at: string;
  /**
   * User who last updated the sale lot
   * @example "user123"
   */
  updated_by: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  updated_at: string;
  /**
   * User who deleted the sale lot, if applicable
   * @example null
   */
  deleted_by?: string;
  /**
   * Deletion timestamp, if applicable
   * @format date-time
   * @example null
   */
  deleted_at?: string;
  /**
   * Shipment details, if applicable
   * @example null
   */
  shipment?: ShipmentDto;
  /**
   * Farm ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farm_id: string;
  /** Farm details */
  farm: FarmDto;
  /** All farms contributing to this sale lot through package items (main + nearby farms) */
  contributing_farms: ContributingFarmDto[];
}

export interface SaleLotContributingFarmProvinceDto {
  /**
   * Province ID
   * @example "cm3q8j9k0000114txhqz0province"
   */
  id: string;
  /**
   * Province name
   * @example "East Java"
   */
  name: string;
  /**
   * Province code
   * @example "JT"
   */
  province_code: string;
}

export interface SaleLotContributingFarmPointDto {
  /**
   * Farm point ID
   * @example "cm3q8j9k0000114txhqz0point"
   */
  id: string;
  /**
   * Latitude coordinate
   * @example -7.2575
   */
  latitude: number;
  /**
   * Longitude coordinate
   * @example 112.7521
   */
  longitude: number;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  created_at: string;
}

export interface SaleLotContributingFarmCertificateDto {
  /**
   * Certificate type ID
   * @example "cert_type_1"
   */
  id: string;
  /**
   * Certificate type name
   * @example "Organic Certification"
   */
  name: string;
}

export interface SaleLotContributingFarmDetailResponseDto {
  /**
   * Farm ID
   * @example "cm3q8j9k0000114txhqz0farm"
   */
  id: string;
  /**
   * Farm identifier
   * @example "F-2024-001"
   */
  fid: string;
  /**
   * Farm address
   * @example "Thanh Son, Nam Dinh"
   */
  address?: string;
  /** Province information */
  province?: SaleLotContributingFarmProvinceDto;
  /**
   * Representative latitude coordinate
   * @example 12.4856
   */
  latitude?: number;
  /**
   * Representative longitude coordinate
   * @example 108.0512
   */
  longitude?: number;
  /** All farm boundary points (coordinates) */
  farm_points: SaleLotContributingFarmPointDto[];
  /**
   * Total farm area in square meters (m²)
   * @example 43000
   */
  total_area: number;
  /**
   * Total production volume of current year
   * @example 1500.5
   */
  total_current_year_production: number;
  /** Farm certificates */
  farm_certificates: SaleLotContributingFarmCertificateDto[];
}

export interface FarmerDocumentListItemDto {
  /**
   * Unique identifier for the document
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * Document name
   * @example "QC Report"
   */
  document_name: string;
  /**
   * Original filename
   * @example "qc-report.pdf"
   */
  filename: string;
  /**
   * Entity type
   * @example "LOT"
   */
  entity_type: 'BIN' | 'FARM' | 'LOT' | 'SHIPMENT' | 'PALLET' | 'EXPORT_LOT';
  /**
   * Associated sale lot ID
   * @example "SL-2025-001"
   */
  associated_id: string;
  /**
   * Source ID of the associated sale lot
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  source_id: string;
  /**
   * Upload date
   * @format date-time
   * @example "2025-04-27T10:00:00.000Z"
   */
  upload_date: string;
}

export interface PaginatedFarmerDocumentResponseDto {
  /** Array of farmer documents */
  data: FarmerDocumentListItemDto[];
  /** Pagination metadata */
  meta: Meta;
}

export interface SaleLotDocumentListItemDto {
  /**
   * Unique identifier for the document
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * Document name
   * @example "QC Report"
   */
  name: string;
  /**
   * Original filename
   * @example "qc-report.pdf"
   */
  filename: string;
  /**
   * File size in bytes
   * @example 1024000
   */
  size: number;
  /**
   * MIME type
   * @example "application/pdf"
   */
  mimetype: string;
  /**
   * User who uploaded the document
   * @example "user123"
   */
  uploaded_by: string;
  /**
   * Upload date
   * @format date-time
   * @example "2025-04-27T10:00:00.000Z"
   */
  uploaded_at: string;
}

export interface PaginatedSaleLotDocumentResponseDto {
  /** Array of sale lot documents */
  data: SaleLotDocumentListItemDto[];
  /** Pagination metadata */
  meta: Meta;
}

export interface FarmerFileUploadDto {
  /**
   * File to upload (PDF, DOC, DOCX, XLS, XLSX, JPEG, PNG only). Maximum file size: 20MB
   * @format binary
   * @example "farm-certificate.pdf"
   */
  file: File;
  /**
   * Optional name for the file. Custom display name for the uploaded file
   * @minLength 1
   * @maxLength 255
   * @example "Organic Farm Certificate 2024"
   */
  name?: string;
  /**
   * Optional description for the file. Helps identify the purpose or content of the uploaded document
   * @minLength 1
   * @maxLength 500
   * @example "Farm certificate document for organic certification"
   */
  description?: string;
  /**
   * Unique identifier for the uploaded file (UUID format)
   * @format uuid
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  sale_lot_id: string;
}

export interface UploadFarmerDocumentResponseDto {
  /**
   * Unique identifier for the uploaded file (UUID format)
   * @format uuid
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * Custom name for the file (if provided)
   * @example "Organic Farm Certificate 2024"
   */
  name?: string;
  /**
   * Original filename as uploaded by the user
   * @example "farm-certificate.pdf"
   */
  filename: string;
  /**
   * File size in bytes
   * @example 1024000
   */
  size: number;
  /**
   * MIME type of the uploaded file
   * @example "application/pdf"
   */
  mimetype: string;
  /**
   * S3 URL of the uploaded file for direct access
   * @example "https://sit-traceability-user-files-bucket.s3.amazonaws.com/..."
   */
  url: string;
  /**
   * User-provided description of the file content or purpose
   * @example "Farm certificate document for organic certification"
   */
  description?: string;
  /**
   * User ID of the person who uploaded the file
   * @example "user123"
   */
  uploaded_by: string;
  /**
   * Timestamp when the file was uploaded (ISO 8601 format)
   * @example "2024-03-15T10:00:00.000Z"
   */
  uploaded_at: string;
}

export interface AssociateFarmerDocumentDto {
  /**
   * ID of the associated file
   * @format uuid
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  file_id: string;
  /**
   * ID of the associated sale lot
   * @format uuid
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  sale_lot_id: string;
}

export interface AssociateFarmerDocumentResponseDto {
  /**
   * Unique identifier for the association (UUID format)
   * @format uuid
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * ID of the associated file
   * @format uuid
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  file_id: string;
  /**
   * ID of the associated sale lot
   * @format uuid
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  sale_lot_id: string;
  /**
   * User ID who created the association
   * @example "user123"
   */
  created_by: string;
  /**
   * Timestamp when the association was created (ISO 8601 format)
   * @example "2024-03-15T10:00:00.000Z"
   */
  created_at: string;
  /**
   * User ID who last updated the association
   * @example "user123"
   */
  updated_by: string;
  /**
   * Timestamp when the association was last updated (ISO 8601 format)
   * @example "2024-03-15T10:00:00.000Z"
   */
  updated_at: string;
}

export interface DeleteFarmerDocumentResponseDto {
  /**
   * Success message confirming document deletion
   * @example "File deleted successfully"
   */
  message: string;
  /**
   * UUID of the deleted document for reference
   * @format uuid
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  document_id: string;
}

export interface CreateFactoryUserDto {
  /**
   * Factory user username
   * @example "john_doe"
   */
  username: string;
  /**
   * Factory user password
   * @minLength 8
   * @example "password123"
   */
  password: string;
  /**
   * Factory user role
   * @example "FACTORY_ADMIN"
   */
  role: 'FACTORY_SUSTAINABILITY_TEAM' | 'FACTORY_COFFEE_MILL_OPERATION' | 'FACTORY_ADMIN';
}

export interface FactoryUserResponseDto {
  /** Factory user ID */
  id: string;
  /** Factory user username */
  username: string;
  /** Factory user role */
  role: 'FACTORY_SUSTAINABILITY_TEAM' | 'FACTORY_COFFEE_MILL_OPERATION' | 'FACTORY_ADMIN';
  /** Factory ID that this user belongs to */
  factory_id: string;
  /** Whether the factory user is active */
  is_active: boolean;
  /**
   * Factory user creation timestamp
   * @format date-time
   */
  created_at: string;
  /**
   * Factory user last update timestamp
   * @format date-time
   */
  updated_at: string;
}

export interface FactoryUserPaginatedResponseDto {
  data: FactoryUserResponseDto[];
  meta: Meta;
}

export interface UpdateFactoryUserDto {
  /**
   * Factory user username
   * @example "john_doe"
   */
  username?: string;
  /**
   * Factory user password
   * @minLength 8
   * @example "password123"
   */
  password?: string;
  /**
   * Factory user role
   * @example "FACTORY_ADMIN"
   */
  role?: 'FACTORY_SUSTAINABILITY_TEAM' | 'FACTORY_COFFEE_MILL_OPERATION' | 'FACTORY_ADMIN';
  /**
   * Whether the factory user is active
   * @example true
   */
  is_active?: boolean;
}

export interface CreateFactoryFarmDto {
  /**
   * Address of the farm
   * @example "123 Nguyen Trai, Hanoi, Vietnam"
   */
  address: string;
  /**
   * Country ID for the farm location
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  country_id?: string;
  /**
   * Province ID for the farm location
   * @example "cm3q8j9k0000115txhqz0abce"
   */
  province_id?: string;
  /**
   * Enable central farm - true for CENTRAL, false for STANDALONE
   * @example false
   */
  is_central_farm?: boolean;
  /**
   * Array of certificate type IDs to assign to the farm
   * @example ["cm123","cm456"]
   */
  certificate_ids?: string[];
  /** Farm coordinates (points defining farm boundaries) */
  points?: CreateFarmPointsV2Dto[];
  /** Farm owner information (required) */
  owner: CreateFarmOwnerV2Dto;
  /** Array of farm areas */
  areas?: CreateFarmAreaV2Dto[];
  /** Array of farm plants */
  plants?: CreateFarmPlantV2Dto[];
  /** Array of farm products */
  products?: CreateFarmProductV2Dto[];
}

export interface CreateFactoryFarmResponseDto {
  /**
   * Unique identifier for the farm
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Farm FID (8-character unique identifier)
   * @example "F1A2B3C4"
   */
  fid: string;
  /**
   * Number of farm points created
   * @example 4
   */
  points_created: number;
  /**
   * Owner created successfully
   * @example true
   */
  owner_created: boolean;
  /**
   * Number of farm areas created
   * @example 2
   */
  areas_created: number;
  /**
   * Number of farm plants created
   * @example 3
   */
  plants_created: number;
  /**
   * Number of farm products created
   * @example 2
   */
  products_created: number;
  /**
   * Creation summary message
   * @example "Farm and all related entities created successfully"
   */
  message: string;
  /**
   * Factory ID that this farm is assigned to
   * @example "F1A2B3C4"
   */
  factory_id: string;
}

export interface NearbyFarmCsvResultItemDto {
  /** @example true */
  success: boolean;
  farmer_code?: string;
  farmer_name?: string;
  error?: string;
}

export interface GenerateNearbyFarmsFromCsvResponseDto {
  /** @example "Nearby farm generation from CSV completed successfully" */
  message: string;
  /** @example 50 */
  totalRowsInCsv: number;
  /** @example 50 */
  farmsProcessed: number;
  /** @example 48 */
  successfulMigrations: number;
  /** @example 2 */
  failedMigrations: number;
  results: NearbyFarmCsvResultItemDto[];
}

export interface ShareFarmToFarmerDto {
  /**
   * Farmer ID to share the farm with
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farmer_id: string;
  /**
   * Permission level for the shared farm
   * @default "READ_ONLY"
   * @example "READ_ONLY"
   */
  permission?: 'FULL_ACCESS' | 'READ_ONLY';
}

export interface ShareFarmToFarmerResponseDto {
  /**
   * Farm organization relationship ID
   * @example "cm3q8j9k0000114txhqz0efgh"
   */
  id: string;
  /**
   * Farm ID that was shared
   * @example "cm3q8j9k0000114txhqz0farm"
   */
  farm_id: string;
  /**
   * Farmer organization ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farmer_id: string;
  /**
   * Farmer name
   * @example "John Doe Farm Co."
   */
  farmer_name: string;
  /**
   * Permission level for the shared farm
   * @example "READ_ONLY"
   */
  permission: 'FULL_ACCESS' | 'READ_ONLY';
  /**
   * Date when farm was shared
   * @format date-time
   * @example "2024-01-15T10:30:00Z"
   */
  shared_at: string;
}

export interface FarmSharedFarmerDto {
  /**
   * Farmer organization ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Farmer full name
   * @example "John Doe Farm Co."
   */
  name: string;
  /**
   * Permission level for the shared farm
   * @example "READ_ONLY"
   */
  permission: 'FULL_ACCESS' | 'READ_ONLY';
  /**
   * Date when farm was shared
   * @format date-time
   * @example "2024-01-15T10:30:00Z"
   */
  shared_at: string;
}

export interface PaginatedFarmSharedFarmersResponseDto {
  /** Pagination metadata including skip, limit, and total count */
  meta: Meta;
  data: FarmSharedFarmerDto[];
}

export interface UpdateFarmSharePermissionDto {
  /**
   * Farmer organization ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farmer_id: string;
  /**
   * New permission level for the shared farm
   * @example "FULL_ACCESS"
   */
  permission: 'FULL_ACCESS' | 'READ_ONLY';
}

export interface UpdateFarmSharePermissionResponseDto {
  /**
   * Farmer organization ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Farmer organization name
   * @example "John Doe Farm Co."
   */
  name: string;
  /**
   * Updated permission level
   * @example "FULL_ACCESS"
   */
  permission: 'FULL_ACCESS' | 'READ_ONLY';
  /**
   * Date when farm was originally shared
   * @format date-time
   * @example "2024-01-15T10:30:00Z"
   */
  shared_at: string;
}

export interface RemoveFarmShareAccessDto {
  /**
   * Farmer organization ID to remove access from
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farmer_id: string;
}

export interface RemoveFarmShareAccessResponseDto {
  /**
   * Indicates successful removal of farm access
   * @example true
   */
  success: boolean;
  /**
   * Success message
   * @example "Farm access successfully removed from farmer"
   */
  message: string;
}

export interface FactoryCreateCultivationLogDto {
  /**
   * Type of cultivation activity performed
   * @example "fertilizing"
   */
  activity?: 'seedings' | 'fertilizing' | 'pest_control_spraying';
  /**
   * Batch number (Số đợt)
   * @example 1
   */
  batch_number?: number;
  /**
   * Quantity of material used (Số lượng)
   * @example 50.5
   */
  quantity?: number;
  /**
   * Unit of measurement for the quantity (đơn vị)
   * @example "kg"
   */
  unit?: string;
  /**
   * Material used in the cultivation activity
   * @example "Phân NPK"
   */
  material?: string;
  /**
   * Cost of the activity (Chi phí)
   * @example 150000
   */
  cost?: number;
  /**
   * Additional notes about the cultivation activity (Ghi chú)
   * @example "Applied organic fertilizer to improve soil nutrients"
   */
  notes?: string;
  /**
   * Person responsible for the cultivation activity (Người thực hiện)
   * @example "John Doe"
   */
  person_in_charge?: string;
  /**
   * Type of fertilizer when activity is "Bón phân"
   * @example "npk"
   */
  fertilizer_type?: 'npk' | 'manure' | 'bio' | 'other';
  /**
   * Other fertilizer types when fertilizer_type is "Phân khác"
   * @example ["urea","phosphate"]
   */
  other_fertilizer_types?: ('urea' | 'phosphate' | 'potash' | 'sa' | 'other')[];
  /**
   * Types of pests when activity is "Phun thuốc BVTV"
   * @example ["aphids","rust"]
   */
  pest_types?: ('aphids' | 'pink_fungus' | 'rust' | 'brown_planthopper')[];
  /**
   * Name of the material or product used (deprecated - use material)
   * @example "Organic Compost"
   */
  name?: string;
  /**
   * Date when the cultivation activity was performed (ISO 8601 format)
   * @example "2024-03-15T10:00:00Z"
   */
  date?: string;
  /**
   * Farm ID where the cultivation activity took place (required for factory)
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farm_id: string;
}

export interface FactoryUpdateCultivationLogDto {
  /**
   * Type of cultivation activity performed
   * @example "fertilizing"
   */
  activity?: 'seedings' | 'fertilizing' | 'pest_control_spraying';
  /**
   * Batch number (Số đợt)
   * @example 1
   */
  batch_number?: number;
  /**
   * Quantity of material used (Số lượng)
   * @example 50.5
   */
  quantity?: number;
  /**
   * Unit of measurement for the quantity (đơn vị)
   * @example "kg"
   */
  unit?: string;
  /**
   * Material used in the cultivation activity
   * @example "Phân NPK"
   */
  material?: string;
  /**
   * Cost of the activity (Chi phí)
   * @example 150000
   */
  cost?: number;
  /**
   * Additional notes about the cultivation activity (Ghi chú)
   * @example "Applied organic fertilizer to improve soil nutrients"
   */
  notes?: string;
  /**
   * Person responsible for the cultivation activity (Người thực hiện)
   * @example "John Doe"
   */
  person_in_charge?: string;
  /**
   * Type of fertilizer when activity is "Bón phân"
   * @example "npk"
   */
  fertilizer_type?: 'npk' | 'manure' | 'bio' | 'other';
  /**
   * Other fertilizer types when fertilizer_type is "Phân khác"
   * @example ["urea","phosphate"]
   */
  other_fertilizer_types?: ('urea' | 'phosphate' | 'potash' | 'sa' | 'other')[];
  /**
   * Types of pests when activity is "Phun thuốc BVTV"
   * @example ["aphids","rust"]
   */
  pest_types?: ('aphids' | 'pink_fungus' | 'rust' | 'brown_planthopper')[];
  /**
   * Name of the material or product used (deprecated - use material)
   * @example "Organic Compost"
   */
  name?: string;
  /**
   * Date when the cultivation activity was performed (ISO 8601 format)
   * @example "2024-03-15T10:00:00Z"
   */
  date?: string;
}

export interface FactoryHarvestLogResponse {
  /**
   * Unique identifier of the harvest log
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * Farm ID where the harvest activity took place
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farm_id: string;
  /**
   * Method used for harvesting
   * @example "Hand picking"
   */
  harvest_method: string;
  /**
   * Additional notes about the harvest activity
   * @example "Harvested ripe fruits from the northern section"
   */
  notes: string;
  /**
   * Variety of the harvested product
   * @example "Arabica Premium"
   */
  variety: string;
  /**
   * Quantity of harvested product
   * @example 150.5
   */
  quantity: number;
  /**
   * Unit of measurement for the quantity
   * @example "kg"
   */
  unit: string;
  /**
   * Person responsible for the harvest activity
   * @example "John Doe"
   */
  person_in_charge: string;
  /**
   * Date when the harvest activity was performed
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  date: string;
  /**
   * User who created the harvest log
   * @example "user123"
   */
  created_by: string;
  /**
   * Timestamp when the harvest log was created
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  created_at: string;
  /**
   * User who last updated the harvest log
   * @example "user123"
   */
  updated_by: string;
  /**
   * Timestamp when the harvest log was last updated
   * @format date-time
   * @example "2024-03-15T10:00:00.000Z"
   */
  updated_at: string;
  /**
   * Timestamp when the harvest log was deleted (if applicable)
   * @format date-time
   * @example "2024-03-20T09:00:00Z"
   */
  deleted_at?: string;
  /**
   * User ID who deleted this harvest log (if applicable)
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  deleted_by?: string;
}

export interface CreateFactoryPackageListDto {
  /**
   * Farm ID that the package list belongs to (must be associated with the factory)
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farm_id: string;
  /**
   * List of nearby farm IDs to include in this package (optional). Only CENTRAL farms are allowed to specify nearby farm IDs. Nearby farms and standalone farms MUST NOT provide this field.
   * @example ["nearby_farm_id_1","nearby_farm_id_2"]
   */
  nearby_farm_ids?: string[];
  /**
   * Coffee variety name
   * @example "Arabica"
   */
  variety: string;
  /**
   * Processing date
   * @format date
   * @example "2024-09-23"
   */
  date: string;
  /**
   * Processing step
   * @example "WET"
   */
  processing_step: 'NATURAL' | 'HONEY' | 'WET';
  /**
   * Type of bag used for packaging
   * @example "Jute Bag"
   */
  bag_type: string;
  /**
   * Total weight of all bags in kg
   * @min 0.01
   * @example 1000.5
   */
  total_weight: number;
  /**
   * Net weight per individual bag in kg
   * @min 0.01
   * @example 50
   */
  net_weight_per_bag: number;
}

export interface FactoryPackageItemResponse {
  /**
   * Unique identifier for the package item
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * Farm ID that the package item belongs to
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farm_id?: string;
  /**
   * Package list ID this item belongs to
   * @example "clh5x8k2a0000abcd1234efgi"
   */
  package_list_id?: string;
  /**
   * Sequential package number within the list
   * @example 1
   */
  package_number?: number;
  /**
   * Weight of this individual package in kg
   * @example 50
   */
  weight?: number;
  /**
   * Actual weight of this individual package in kg
   * @example 50.5
   */
  actual_weight?: number;
  /**
   * Current status of the package
   * @example "WAITING_FOR_SCAN"
   */
  status: 'DRAFT' | 'READY' | 'WAITING_FOR_SCAN' | 'SHIPPED' | 'DAMAGED';
  /**
   * Sale lot ID this package is assigned to
   * @example "cm3q8j9k0000114txhqz0efgh"
   */
  sale_lot_id?: string;
  /**
   * Coffee variety
   * @example "Arabica"
   */
  variety?: string;
  /**
   * Processing step
   * @example "WET"
   */
  processing_step?: 'NATURAL' | 'HONEY' | 'WET';
  /**
   * Type of bag used
   * @example "Jute bag"
   */
  bag_type?: string;
  /**
   * User ID who created this package item
   * @example "user123"
   */
  created_by: string;
  /**
   * Package item creation timestamp
   * @format date-time
   * @example "2024-09-23T10:00:00.000Z"
   */
  created_at: string;
  /**
   * User ID who last updated this package item
   * @example "user123"
   */
  updated_by: string;
  /**
   * Package item last update timestamp
   * @format date-time
   * @example "2024-09-23T11:00:00.000Z"
   */
  updated_at: string;
  /**
   * Timestamp when the package item was deleted (if applicable)
   * @format date-time
   * @example "2024-03-20T09:00:00Z"
   */
  deleted_at?: string;
  /**
   * User ID who deleted this package item (if applicable)
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  deleted_by?: string;
}

export interface FactoryPackageListResponse {
  /**
   * Unique identifier for the package list
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * Farm ID that the package list belongs to
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farm_id: string;
  /**
   * Coffee variety name
   * @example "Arabica"
   */
  variety: string;
  /**
   * Processing date
   * @format date-time
   * @example "2024-09-23T00:00:00.000Z"
   */
  date: string;
  /**
   * Processing step
   * @example "WET"
   */
  processing_step: 'NATURAL' | 'HONEY' | 'WET';
  /**
   * Type of bag used
   * @example "Jute bag"
   */
  bag_type: string;
  /**
   * Total weight in kg
   * @example 1000
   */
  total_weight: number;
  /**
   * Net weight per bag in kg
   * @example 50
   */
  net_weight_per_bag: number;
  /**
   * Total number of bags
   * @example 20
   */
  total_bags: number;
  /**
   * User ID who created this package list
   * @example "user123"
   */
  created_by: string;
  /**
   * Package list creation timestamp
   * @format date-time
   * @example "2024-09-23T10:00:00.000Z"
   */
  created_at: string;
  /**
   * User ID who last updated this package list
   * @example "user123"
   */
  updated_by: string;
  /**
   * Package list last update timestamp
   * @format date-time
   * @example "2024-09-23T11:00:00.000Z"
   */
  updated_at: string;
  /**
   * Timestamp when the package list was deleted (if applicable)
   * @format date-time
   * @example "2024-03-20T09:00:00Z"
   */
  deleted_at?: string;
  /**
   * User ID who deleted this package list (if applicable)
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  deleted_by?: string;
  /** Individual package items in this list */
  packages: FactoryPackageItemResponse[];
}

export interface PaginatedFactoryPackageListResponseDto {
  /** Array of package list entries */
  data: FactoryPackageListResponse[];
  /** Pagination metadata */
  meta: Meta;
}

export interface UpdateFactoryPackageItemStatusDto {
  /**
   * New status for the package item
   * @example "READY"
   */
  status: 'READY' | 'WAITING_FOR_SCAN' | 'SHIPPED' | 'DAMAGED';
}

export interface UpdateFactoryPackageItemDto {
  /**
   * Coffee variety name
   * @example "Arabica"
   */
  variety: string;
  /**
   * Processing step
   * @example "WET"
   */
  processing_step: 'NATURAL' | 'HONEY' | 'WET';
  /**
   * Type of bag used for packaging
   * @example "Jute Bag"
   */
  bag_type: string;
  /**
   * Net weight per individual bag in kg
   * @min 0.01
   * @example 50
   */
  net_weight_per_bag: number;
  /**
   * Filter by package status (supports multiple values)
   * @example "WAITING_FOR_SCAN"
   */
  status: 'READY' | 'WAITING_FOR_SCAN' | 'SHIPPED' | 'DAMAGED';
}

export interface FactoryCollectorOrgDto {
  /**
   * Collector organization ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Collector organization name
   * @example "ABC Collectors Co."
   */
  name: string;
  /**
   * Collector organization phone
   * @example "0393475843"
   */
  phone?: string;
}

export interface FactoryFarmerDto {
  /**
   * Farmer ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Farmer email
   * @example "john.doe@example.com"
   */
  email: string;
  /**
   * Farmer full name
   * @example "John Doe"
   */
  full_name: string;
  /**
   * User role
   * @example "FARMER"
   */
  role: string;
}

export interface FactoryPackageItemDto {
  /**
   * Unique identifier for the package item
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Farm ID associated with the package
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farm_id: string;
  /**
   * Package list ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  package_list_id: string;
  /**
   * Package number in the list
   * @example 1
   */
  package_number: number;
  /**
   * Weight of the package in kg
   * @example 50.5
   */
  weight: number;
  /**
   * Status of the package
   * @example "READY"
   */
  status: string;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  created_at: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  updated_at: string;
}

export interface FactoryIntakeByUserDto {
  /**
   * User ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * User email
   * @example "user@example.com"
   */
  email: string;
  /**
   * User full name
   * @example "John Doe"
   */
  full_name?: string;
}

export interface FactoryFileAssociationDto {
  /**
   * File association ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * File ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  file_id: string;
  /** File details */
  user_file: object;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  created_at: string;
}

export interface ProvinceInfoDto {
  /**
   * Province ID
   * @example "cm3q8j9k0000115txhqz0abce"
   */
  id: string;
  /**
   * Province name
   * @example "Dak Lak"
   */
  name: string;
  /**
   * Province code
   * @example "DL"
   */
  province_code: string;
}

export interface FactoryFarmDto {
  /**
   * Farm ID associated with the sale lot
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Farm address
   * @example "123 Coffee Lane, Dak Lak, Vietnam"
   */
  address: string;
  /**
   * Farm ID code
   * @example "F-2024-001"
   */
  fid: string;
  /** Province information */
  province: ProvinceInfoDto;
}

export interface FactoryShipmentInfoDto {
  /**
   * Shipment internal ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Shipment identifier
   * @example "SHP-2024-001"
   */
  shipment_id: string;
  /**
   * Organization ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  organization_id: string;
  /**
   * Ship date
   * @format date-time
   * @example "2024-01-20T08:00:00.000Z"
   */
  ship_date?: string;
  /**
   * Delivery date
   * @format date-time
   * @example "2024-01-25T14:30:00.000Z"
   */
  delivery_date?: string;
  /**
   * Destination
   * @example "Ho Chi Minh City Warehouse"
   */
  destination?: string;
  /**
   * Truck ID
   * @example "TRK-001"
   */
  truck_id?: string;
  /**
   * Shipment status
   * @example "IN_TRANSIT"
   */
  status: string;
  /**
   * Total weight in kg
   * @example 1500.5
   */
  total_weight?: number;
  /**
   * Total number of bags
   * @example 150
   */
  total_bags?: number;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-01-20T10:30:00.000Z"
   */
  created_at: string;
}

export interface FactoryContributingFarmDto {
  /**
   * Farm ID associated with package item contributions
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Farm ID code
   * @example "F-2024-001"
   */
  fid: string;
  /**
   * Farm type
   * @example "CENTRAL"
   */
  farm_type: string;
}

export interface FactorySaleLotDetailResponse {
  /**
   * Unique identifier for the sale lot
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Unique sale lot identifier
   * @example "SL-2024-001"
   */
  slid: string;
  /**
   * Date of the sale lot
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  date: string;
  /**
   * Coffee variety for the sale lot
   * @example "Arabica Typica"
   */
  variety: string;
  /**
   * ID of the collector organization
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  collector_org_id: string;
  /**
   * Factory organization ID assigned when shipment arrives at factory
   * @example "cm3q8j9k0000114txhqz0efgh"
   */
  factory_org_id?: string;
  /** Collector organization details */
  collector_org: FactoryCollectorOrgDto;
  /** Farmer who created the sale lot */
  farmer: FactoryFarmerDto;
  /** Package items associated with this sale lot */
  package_items: FactoryPackageItemDto[];
  /**
   * Additional notes about the sale lot
   * @example "High quality beans with excellent processing"
   */
  note?: string;
  /**
   * Scheduled pick up date
   * @format date-time
   * @example "2024-01-20T08:00:00.000Z"
   */
  pickup_date?: string;
  /**
   * Date when sale lot was moved to INTAKE status
   * @format date-time
   * @example "2024-01-25T14:30:00.000Z"
   */
  intake_date?: string;
  /** User who moved the sale lot to INTAKE status */
  intake_by?: FactoryIntakeByUserDto;
  /**
   * Current status of the sale lot
   * @example "WAITING_TO_COLLECT"
   */
  status:
    | 'WAITING_TO_COLLECT'
    | 'COLLECTED'
    | 'IN_TRANSIT'
    | 'ARRIVED_AT_FACTORY'
    | 'INTAKE'
    | 'CANCELLED';
  /**
   * Total weight of all packages in kg
   * @example 150.5
   */
  total_weight: number;
  /**
   * User who created the sale lot
   * @example "user123"
   */
  created_by: string;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  created_at: string;
  /**
   * User who last updated the sale lot
   * @example "user123"
   */
  updated_by: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  updated_at: string;
  /**
   * User who deleted the sale lot, if applicable
   * @example null
   */
  deleted_by?: string;
  /**
   * Deletion timestamp, if applicable
   * @format date-time
   * @example null
   */
  deleted_at?: string;
  /** Attached files */
  file_associations: FactoryFileAssociationDto[];
  /** Farm information for the sale lot */
  farm?: FactoryFarmDto;
  /** Shipment information if sale lot is assigned to a shipment */
  shipment?: FactoryShipmentInfoDto;
  /** All farms contributing to this sale lot through package items (main + nearby farms) */
  contributing_farms: FactoryContributingFarmDto[];
}

export interface FarmProductionDto {
  /**
   * Production year
   * @example 2024
   */
  year: number;
  /**
   * Coffee variety
   * @example "Arabica"
   */
  variety: string;
  /**
   * Production volume
   * @example 1500.5
   */
  volume: number;
  /**
   * Contracted volume
   * @example 1200
   */
  contracted_volume: number;
}

export interface FarmInfoDto {
  /**
   * Unique identifier of the farm
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Farm ID code
   * @example "F-2024-001"
   */
  fid: string | null;
  /**
   * Organization ID associated with the farm
   * @example "org123"
   */
  org_id: string | null;
  /**
   * Physical address of the farm
   * @example "123 Farm Road, Rural District"
   */
  address: string;
  /**
   * Country ID where the farm is located
   * @example "country123"
   */
  country_id: string | null;
  /**
   * Province ID where the farm is located
   * @example "province123"
   */
  province_id: string | null;
  /** Country information */
  country: object | null;
  /** Province information */
  province: object | null;
  /** Farm owner information */
  owner: object | null;
  /** Farm areas */
  farm_areas: FarmAreaDto[];
  /** Farm boundary points */
  farm_points: FarmPointDto[];
  /** Farm certificates */
  farm_certificates: FarmCertificateDto[];
  /** Current year production data */
  current_year_production: FarmProductionDto[];
  /**
   * Total production volume for current year
   * @example 1500.5
   */
  total_current_year_production: number;
  /**
   * Total area of all farm areas
   * @example 5.2
   */
  total_area: number;
  /**
   * Timestamp when the farm was created
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  created_at: string;
  /**
   * Timestamp when the farm was last updated
   * @format date-time
   * @example "2024-01-16T14:45:00.000Z"
   */
  updated_at: string;
  /**
   * ID of the user who created this farm
   * @example "cm3q8j9k0000114txhqz0xyz"
   */
  created_by: string;
  /**
   * ID of the user who last updated this farm
   * @example "cm3q8j9k0000114txhqz0xyz"
   */
  updated_by: string;
}

export interface SaleLotFarmInfoResponseDto {
  /**
   * Sale lot ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  sale_lot_id: string;
  /**
   * Sale lot identifier code
   * @example "SL-2024-001"
   */
  slid: string;
  /** Farm information associated with the sale lot */
  farm: FarmInfoDto;
  /**
   * Total number of package items in this sale lot from the farm
   * @example 25
   */
  total_packages: number;
  /**
   * Total weight of packages from the farm in this sale lot
   * @example 1250.5
   */
  total_weight: number;
}

export interface FactoryCreateSaleLotDto {
  /**
   * Date of the sale lot
   * @example "2024-01-15T10:30:00.000Z"
   */
  date: string;
  /**
   * Coffee variety for the sale lot
   * @example "Arabica Typica"
   */
  variety: string;
  /**
   * ID of the collector organization
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  collector_org_id: string;
  /**
   * Array of package item IDs to include in this sale lot
   * @example ["cm3q8j9k0000114txhqz0abcd","cm3q8j9k0000214txhqz0efgh"]
   */
  package_item_ids?: string[];
  /**
   * Additional notes about the sale lot
   * @example "High quality beans with excellent processing"
   */
  note?: string;
}

export interface CreateBinFromIntakeDto {
  /**
   * Optional notes for the bin
   * @example "Processing intake lot from Shipment SH-2024-003"
   */
  notes?: string;
  /**
   * Optional palette identifier for the bin
   * @example "PALETTE-001"
   */
  palette?: string;
  /**
   * Whether to include all available INTAKE sale lots for this factory (default: false)
   * @example true
   */
  include_all_intake?: boolean;
  /**
   * Specific INTAKE sale lot IDs to include in bin (ignored if include_all_intake is true)
   * @example ["cm3q8j9k0000114txhqz0abcd","cm3q8j9k0000114txhqz0efgh"]
   */
  intake_sale_lot_ids?: string[];
  /**
   * Filter INTAKE lots by variety when using include_all_intake
   * @example "Arabica"
   */
  variety_filter?: string;
}

export interface CreateBinFromIntakeResponseDto {
  /**
   * Created bin ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Bin identifier
   * @example "BIN-2024-001"
   */
  bin_id: string;
  /**
   * Initial bin status
   * @example "PENDING"
   */
  status: string;
  /**
   * Number of INTAKE sale lots added to the bin
   * @example 5
   */
  sale_lots_processed: number;
  /**
   * Total weight of all sale lots in the bin
   * @example 2450.5
   */
  total_weight: number;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-01-21T10:00:00.000Z"
   */
  created_at: string;
}

export interface CreateFactoryBinDto {
  /**
   * Optional notes for the bin
   * @example "Processing batch for organic coffee"
   */
  notes?: string;
  /**
   * Palette identifier for the bin
   * @example "PALETTE-001"
   */
  palette?: string;
  /**
   * Array of sale lot IDs to include in this bin
   * @example ["cm3q8j9k0000114txhqz0abcd","cm3q8j9k0000114txhqz0efgh"]
   */
  sale_lot_ids: string[];
}

export interface FactoryBinDetailResponse {
  /**
   * Bin ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Bin identifier
   * @example "BIN-2024-001"
   */
  bin_id: string;
  /**
   * Factory ID
   * @example "cm3q8j9k0000114txhqz0factory"
   */
  organization_id: string;
  /**
   * Bin creation date
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  bin_date: string;
  /**
   * Bin notes
   * @example "Processing batch for organic coffee"
   */
  notes: string;
  /**
   * Bin status
   * @example "PENDING"
   */
  status: 'PENDING' | 'IN_PROCESS' | 'COMPLETED';
  /**
   * Total weight of all sale lots in kg
   * @example 150.5
   */
  total_weight: number;
  /**
   * Palette identifier for the bin
   * @example "PALETTE-001"
   */
  palette: string;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  created_at: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  updated_at: string;
  /**
   * User who created the bin
   * @example "factory_user_123"
   */
  created_by: string;
  /**
   * Number of sale lots in this bin
   * @example 7
   */
  number_of_lots: number;
  /**
   * Variety from the sale lots in this bin (first variety found)
   * @example "Arabica"
   */
  variety?: string;
}

export interface BinLastProcessingDto {
  /**
   * Processing step name
   * @example "SORTING"
   */
  processing_name: 'SORTING' | 'DRYING' | 'CLEANING' | 'COLOR_SORTING' | 'PACKAGING';
  /**
   * Processing status
   * @example "INPROGRESS"
   */
  status: 'TODO' | 'INPROGRESS' | 'COMPLETED';
  /**
   * Start date of processing
   * @format date-time
   * @example "2024-01-15T10:00:00.000Z"
   */
  start_date?: string;
  /**
   * End date of processing
   * @format date-time
   * @example "2024-01-15T16:00:00.000Z"
   */
  end_date?: string;
}

export interface FactoryBinListItemResponse {
  /**
   * Bin ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Bin identifier
   * @example "BIN-2024-001"
   */
  bin_id: string;
  /**
   * Bin creation timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  created_at: string;
  /**
   * Number of sale lots in this bin
   * @example 7
   */
  number_of_lots: number;
  /**
   * Bin status
   * @example "PENDING"
   */
  status: 'PENDING' | 'IN_PROCESS' | 'COMPLETED';
  /**
   * Completion date - end date of PACKAGING processing step when completed
   * @format date-time
   * @example "2024-01-20T15:00:00.000Z"
   */
  completed_at?: string;
  /** Most recent processing step for this bin */
  last_processing?: BinLastProcessingDto;
}

export interface PaginatedFactoryBinResponseDto {
  /** Pagination metadata including skip, limit, and total count */
  meta: Meta;
  /** Array of factory bins */
  data: FactoryBinListItemResponse[];
}

export interface BinFarmSummaryItemDto {
  /**
   * Farm ID
   * @example "cm3q8j9k0000114txhqz0farm"
   */
  id: string;
  /**
   * Farm identifier for display in tabs/dropdown
   * @example "F-2024-001"
   */
  fid: string;
}

export interface BinFarmsSummaryResponseDto {
  /**
   * Total number of farms in this bin
   * @example 12
   */
  total: number;
  /** List of farms (id and fid only) */
  farms: BinFarmSummaryItemDto[];
}

export interface BinFarmCertificateDto {
  id: string;
  name: string;
}

export interface BinFarmDetailDto {
  /**
   * Farm ID
   * @example "cm3q8j9k0000114txhqz0farm"
   */
  id: string;
  /**
   * Farm identifier
   * @example "F-2024-001"
   */
  fid: string;
  /**
   * Farm address
   * @example "Thanh Son, Nam Dinh"
   */
  address?: string;
  province?: FarmProvinceDto;
  /**
   * Representative latitude coordinate
   * @example 12.4856
   */
  latitude?: number;
  /**
   * Representative longitude coordinate
   * @example 108.0512
   */
  longitude?: number;
  /** All farm boundary points (coordinates) */
  farm_points: FarmPointDto[];
  /**
   * Total farm area in hectares
   * @example 4.3
   */
  total_area: number;
  /**
   * Total production volume
   * @example 1500.5
   */
  total_current_year_production: number;
  farm_certificates: BinFarmCertificateDto[];
}

export interface UpdateFactoryBinStatusDto {
  /**
   * New status for the bin
   * @example "IN_PROCESS"
   */
  status: 'PENDING' | 'IN_PROCESS' | 'COMPLETED';
  /**
   * Optional notes for the status change
   * @example "Started processing batch"
   */
  notes?: string;
  /**
   * Optional palette identifier for the bin
   * @example "PALETTE-001"
   */
  palette?: string;
}

export interface BinSaleLotItemDto {
  /**
   * Sale lot ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Sale lot identifier
   * @example "SL-2024-001"
   */
  slid: string;
  /**
   * Coffee variety
   * @example "Arabica"
   */
  variety: string;
  /**
   * Real weight of the sale lot in kg
   * @example 50.5
   */
  real_weight?: number;
  /**
   * Intake date
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  date?: string;
}

export interface BinSaleLotsResponseDto {
  /** Pagination metadata */
  meta: Meta;
  /** Sale lots in the bin */
  sale_lots: BinSaleLotItemDto[];
}

export interface FactoryShipmentListItemDto {
  /**
   * Shipment ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Shipment identifier
   * @example "SH-2024-001"
   */
  shipment_id: string;
  /**
   * Factory ID
   * @example "factory123"
   */
  factory_id: string;
  /**
   * Ship date
   * @format date-time
   * @example "2024-01-20T15:00:00.000Z"
   */
  ship_date?: string;
  /**
   * Delivery date
   * @format date-time
   * @example "2024-01-21T09:00:00.000Z"
   */
  delivery_date?: string;
  /**
   * Shipment status
   * @example "IN_TRANSIT"
   */
  status: string;
  /**
   * Total weight of the shipment
   * @example 1450
   */
  total_weight?: number;
  /**
   * Total number of bags in the shipment
   * @example 150
   */
  total_bags?: number;
  /**
   * Number of sale lots in shipment
   * @example 3
   */
  sale_lot_count: number;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-01-20T10:30:00.000Z"
   */
  created_at: string;
}

export interface PaginatedFactoryShipmentResponseDto {
  /** Array of shipment items */
  data: FactoryShipmentListItemDto[];
  /** Pagination metadata */
  meta: object;
}

export interface CollectorInfoDto {
  /**
   * Collector ID
   * @example "col123456789"
   */
  id: string;
  /**
   * Collector full name
   * @example "Nguyen Van A"
   */
  full_name: string;
  /**
   * Collector phone number
   * @example "+84 912345678"
   */
  phone?: string;
  /**
   * Collector email address
   * @example "nguyenvana@example.com"
   */
  email?: string;
}

export interface FactoryShipmentDetailResponseDto {
  /**
   * Internal database ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Unique shipment ID
   * @example "SHP202510100001"
   */
  shipment_id: string;
  /**
   * Factory ID
   * @example "fct123456789"
   */
  factory_id: string;
  /**
   * Factory name
   * @example "Buon Ma Thuot Coffee Factory"
   */
  factory_name: string;
  /**
   * Shipment date
   * @format date-time
   * @example "2025-10-05T08:00:00.000Z"
   */
  ship_date: string;
  /**
   * Shipment destination
   * @example "Ho Chi Minh City Warehouse"
   */
  destination: string;
  /**
   * Shipment status
   * @example "IN_TRANSIT"
   */
  status: string;
  /**
   * Total shipment weight (in kilograms)
   * @example 1500.5
   */
  total_weight: number;
  /**
   * Total number of bags in the shipment
   * @example 150
   */
  total_bags?: number;
  /**
   * List of unique coffee varieties in this shipment
   * @example ["Arabica Typica","Robusta"]
   */
  varieties: string[];
  /**
   * Real weight of the shipment lot (in kilograms)
   * @example 1450
   */
  real_weight: number;
  /** Collector details */
  collector: CollectorInfoDto;
  /**
   * Total number of unique farms in this shipment
   * @example 3
   */
  total_farms: number;
}

export interface ReceiveShipmentDto {
  /**
   * Optional notes about shipment receipt
   * @example "Shipment received in good condition"
   */
  notes?: string;
}

export interface ReceiveShipmentResponseDto {
  /**
   * Shipment ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Updated shipment status
   * @example "DONE"
   */
  status: string;
  /**
   * Delivery date and time
   * @format date-time
   * @example "2024-01-21T09:00:00.000Z"
   */
  delivery_date: string;
  /**
   * Number of sale lots updated to INTAKE status
   * @example 5
   */
  sale_lots_updated: number;
  /**
   * Update timestamp
   * @format date-time
   * @example "2024-01-21T09:00:00.000Z"
   */
  updated_at: string;
}

export interface FactoryCollectorListDto {
  /**
   * Unique identifier of the collector
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Collector name
   * @example "John Smith"
   */
  name: string;
  /**
   * Collector address
   * @example "123 Main St, Anytown, USA"
   */
  address: string;
  /**
   * Collector city
   * @example "Anytown"
   */
  city: string;
  /**
   * Timestamp when the record was created
   * @format date-time
   * @example "2024-01-15T08:30:00Z"
   */
  created_at: string;
  /**
   * Timestamp when the record was last updated
   * @format date-time
   * @example "2024-01-15T10:45:00Z"
   */
  updated_at: string;
}

export interface PaginatedFactoryCollectorResponseDto {
  /**
   * Success status of the response
   * @example true
   */
  success: boolean;
  /**
   * Response message
   * @example "Collectors retrieved successfully"
   */
  message: string;
  /** Array of collector data */
  data: FactoryCollectorListDto[];
  /** Pagination metadata */
  meta: Meta;
}

export interface FactoryCollectorDetailDto {
  /**
   * Unique identifier of the collector
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Collector name
   * @example "John Smith"
   */
  name: string;
  /**
   * Collector address
   * @example "123 Main St, Anytown, USA"
   */
  address: string;
  /**
   * Collector city
   * @example "Anytown"
   */
  city: string;
  /**
   * Timestamp when the record was created
   * @format date-time
   * @example "2024-01-15T08:30:00Z"
   */
  created_at: string;
  /**
   * Timestamp when the record was last updated
   * @format date-time
   * @example "2024-01-15T10:45:00Z"
   */
  updated_at: string;
  /**
   * Identifier of the user who created this record
   * @example "admin123"
   */
  created_by: string;
  /**
   * Identifier of the user who last updated this record
   * @example "collector123"
   */
  updated_by: string;
}

export interface FactoryCollectorDetailResponseDto {
  /**
   * Success status of the response
   * @example true
   */
  success: boolean;
  /**
   * Response message
   * @example "Collector details retrieved successfully"
   */
  message: string;
  /** Collector detail data */
  data: FactoryCollectorDetailDto;
}

export interface FactoryCoffeeMillSaleLotListItemDto {
  /**
   * Unique identifier for the sale lot
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Unique sale lot identifier (Lot ID)
   * @example "SL-2024-001"
   */
  slid: string;
  /**
   * Farm external identifier (FID) if available, otherwise null
   * @example "F-2024-001"
   */
  farm_id?: string;
  /**
   * Date of the sale lot
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  date: string;
  /**
   * Total weight of all packages in kg (calculated from package items)
   * @example 500
   */
  total_weight: number;
  /**
   * Coffee variety for the sale lot
   * @example "Arabica"
   */
  variety: string;
  /**
   * Region / address of the farm associated with this sale lot, if available
   * @example "123 Coffee Lane, Dak Lak, Vietnam"
   */
  region?: string;
}

export interface FactoryCoffeeMillSaleLotMeta {
  /**
   * Number of records skipped
   * @example 0
   */
  skip: number;
  /**
   * Number of records per page
   * @example 10
   */
  limit: number;
  /**
   * Total number of records
   * @example 100
   */
  total: number;
  /**
   * Current page number
   * @example 1
   */
  page: number;
  /**
   * Total number of pages
   * @example 5
   */
  total_pages: number;
}

export interface PaginatedFactoryCoffeeMillSaleLotResponseDto {
  /** Array of simplified sale lot items for coffee mill view */
  data: FactoryCoffeeMillSaleLotListItemDto[];
  /** Pagination metadata */
  meta: FactoryCoffeeMillSaleLotMeta;
}

export interface BulkUpdateSaleLotStatusDto {
  /**
   * Array of sale lot IDs to update
   * @example ["cm3q8j9k0000114txhqz0abcd","cm3q8j9k0000214txhqz0efgh"]
   */
  sale_lot_ids: string[];
}

export interface BulkUpdateSaleLotStatusResponseDto {
  /**
   * Number of sale lots successfully updated
   * @example 5
   */
  updated_count: number;
  /**
   * Array of sale lot IDs (SLID) that were successfully updated
   * @example ["SL-2024-001","SL-2024-002"]
   */
  updated_sale_lots: string[];
  /**
   * Array of sale lot IDs that failed to update (if any)
   * @example ["cm3q8j9k0000314txhqz0ijkl"]
   */
  failed_ids?: string[];
  /**
   * Array of error messages for failed updates (if any)
   * @example ["Sale lot not found","Invalid status transition"]
   */
  errors?: string[];
}

export interface CreateBinProcessingDto {
  /**
   * ID of the bin to create processing for
   * @example "clh1234567890abcdef123456"
   */
  bin_id: string;
  /**
   * Type of processing operation
   * @example "SORTING"
   */
  processing_name: 'SORTING' | 'DRYING' | 'CLEANING' | 'COLOR_SORTING' | 'PACKAGING';
  /**
   * Start date of processing (ISO 8601 format)
   * @example "2024-01-15T10:00:00Z"
   */
  start_date?: string;
  /**
   * End date of processing (ISO 8601 format)
   * @example "2024-01-15T16:00:00Z"
   */
  end_date?: string;
  /**
   * Additional notes about the processing
   * @example "Quality sorting completed with 95% grade A beans"
   */
  notes?: string;
}

export interface BinProcessingResponse {
  /**
   * Unique identifier for the bin processing
   * @example "clh1234567890abcdef123456"
   */
  id: string;
  /**
   * ID of the associated bin
   * @example "clh1234567890abcdef123456"
   */
  bin_id: string;
  /**
   * Type of processing operation
   * @example "SORTING"
   */
  processing_name: 'SORTING' | 'DRYING' | 'CLEANING' | 'COLOR_SORTING' | 'PACKAGING';
  /**
   * Current processing status
   * @example "TODO"
   */
  status: 'TODO' | 'INPROGRESS' | 'COMPLETED';
  /**
   * Start date of processing
   * @format date-time
   * @example "2024-01-15T10:00:00Z"
   */
  start_date?: string;
  /**
   * End date of processing
   * @format date-time
   * @example "2024-01-15T16:00:00Z"
   */
  end_date?: string;
  /**
   * Additional notes about the processing
   * @example "Quality sorting completed with 95% grade A beans"
   */
  notes?: string;
  /**
   * User ID who created this processing record
   * @example "clh1234567890abcdef123456"
   */
  created_by: string;
  /**
   * Date when processing record was created
   * @format date-time
   * @example "2024-01-15T08:00:00Z"
   */
  created_at: string;
  /**
   * User ID who last updated this processing record
   * @example "clh1234567890abcdef123456"
   */
  updated_by: string;
  /**
   * Date when processing record was last updated
   * @format date-time
   * @example "2024-01-15T12:00:00Z"
   */
  updated_at: string;
}

export interface BinProcessingMeta {
  skip: number;
  limit: number;
  total: number;
}

export interface PaginatedBinProcessingResponseDto {
  /** Array of bin processing records */
  data: BinProcessingResponse[];
  /** Pagination metadata */
  meta: BinProcessingMeta;
}

export interface BinInfo {
  id: string;
  bin_id: string;
  organization_id: string;
  status: string;
  total_weight?: number;
  /** @format date-time */
  bin_date: string;
}

export interface BinProcessingDetailResponse {
  /**
   * Unique identifier for the bin processing
   * @example "clh1234567890abcdef123456"
   */
  id: string;
  /**
   * ID of the associated bin
   * @example "clh1234567890abcdef123456"
   */
  bin_id: string;
  /**
   * Type of processing operation
   * @example "SORTING"
   */
  processing_name: 'SORTING' | 'DRYING' | 'CLEANING' | 'COLOR_SORTING' | 'PACKAGING';
  /**
   * Current processing status
   * @example "TODO"
   */
  status: 'TODO' | 'INPROGRESS' | 'COMPLETED';
  /**
   * Start date of processing
   * @format date-time
   * @example "2024-01-15T10:00:00Z"
   */
  start_date?: string;
  /**
   * End date of processing
   * @format date-time
   * @example "2024-01-15T16:00:00Z"
   */
  end_date?: string;
  /**
   * Additional notes about the processing
   * @example "Quality sorting completed with 95% grade A beans"
   */
  notes?: string;
  /**
   * User ID who created this processing record
   * @example "clh1234567890abcdef123456"
   */
  created_by: string;
  /**
   * Date when processing record was created
   * @format date-time
   * @example "2024-01-15T08:00:00Z"
   */
  created_at: string;
  /**
   * User ID who last updated this processing record
   * @example "clh1234567890abcdef123456"
   */
  updated_by: string;
  /**
   * Date when processing record was last updated
   * @format date-time
   * @example "2024-01-15T12:00:00Z"
   */
  updated_at: string;
  /** Associated bin information */
  bin: BinInfo;
}

export interface UpdateBinProcessingDto {
  /**
   * Processing status
   * @example "INPROGRESS"
   */
  status?: 'TODO' | 'INPROGRESS' | 'COMPLETED';
  /**
   * Start date of processing (ISO 8601 format)
   * @example "2024-01-15T10:00:00Z"
   */
  start_date?: string;
  /**
   * End date of processing (ISO 8601 format)
   * @example "2024-01-15T16:00:00Z"
   */
  end_date?: string;
  /**
   * Additional notes about the processing
   * @example "Quality sorting completed with 95% grade A beans"
   */
  notes?: string;
}

export interface NextProcessingStepResponse {
  /**
   * Next available processing step
   * @example "DRYING"
   */
  nextStep?: 'SORTING' | 'DRYING' | 'CLEANING' | 'COLOR_SORTING' | 'PACKAGING';
  /**
   * Information about the next step availability
   * @example "You can add the next processing step: DRYING"
   */
  message: string;
}

export interface RefreshBinStatusResponse {
  /**
   * Bin ID that was refreshed
   * @example "clh1234567890abcdef123456"
   */
  binId: string;
  /**
   * New status of the bin
   * @example "IN_PROCESS"
   */
  newStatus: 'PENDING' | 'IN_PROCESS' | 'COMPLETED';
  /**
   * Message about the status change
   * @example "Bin status updated successfully from PENDING to IN_PROCESS"
   */
  message: string;
}

export interface ProcessingStepOverview {
  /**
   * Processing step name
   * @example "SORTING"
   */
  stepName: 'SORTING' | 'DRYING' | 'CLEANING' | 'COLOR_SORTING' | 'PACKAGING';
  /**
   * Status of the processing step
   * @example "COMPLETED"
   */
  status: 'TODO' | 'INPROGRESS' | 'COMPLETED' | 'NOT_CREATED';
  /**
   * Whether this step exists (has been created)
   * @example true
   */
  exists: boolean;
  /**
   * Start date of the processing step
   * @format date-time
   * @example "2024-01-15T10:00:00Z"
   */
  startDate?: string;
  /**
   * End date of the processing step
   * @format date-time
   * @example "2024-01-15T16:00:00Z"
   */
  endDate?: string;
  /**
   * When this step was created
   * @format date-time
   * @example "2024-01-15T08:00:00Z"
   */
  createdAt?: string;
}

export interface ProcessingStatistics {
  /**
   * Total number of processing steps in the sequence
   * @example 5
   */
  totalSteps: number;
  /**
   * Number of steps that have been created
   * @example 3
   */
  createdSteps: number;
  /**
   * Number of completed steps
   * @example 2
   */
  completedSteps: number;
  /**
   * Number of steps currently in progress
   * @example 1
   */
  inProgressSteps: number;
  /**
   * Number of steps in TODO status
   * @example 0
   */
  todoSteps: number;
}

export interface BinStatusOverviewResponse {
  /**
   * Bin ID
   * @example "clh1234567890abcdef123456"
   */
  binId: string;
  /**
   * Current bin status
   * @example "IN_PROCESS"
   */
  binStatus: 'PENDING' | 'IN_PROCESS' | 'COMPLETED';
  /** Overview of all processing steps */
  processingSteps: ProcessingStepOverview[];
  /**
   * Explanation of why the bin has this status
   * @example "Bin is IN_PROCESS because 2 out of 5 steps are completed"
   */
  statusExplanation: string;
  /** Statistics about processing steps */
  statistics: ProcessingStatistics;
}

export interface CreateFactoryBinPackagesDto {
  /**
   * Identifier of the bin the packages belong to
   * @example "cln8qkvp60000124wef8abcd0"
   */
  bin_id: string;
  /**
   * Date the packages are created/recorded
   * @example "2024-05-01"
   */
  package_date?: string;
  /**
   * Bag type used for the packages
   * @example "JUTE_BAG"
   */
  bag_type: string;
  /**
   * Total weight that should be packaged during this request
   * @example 250
   */
  total_weight: number;
  /**
   * Net weight that each bag should contain
   * @example 25
   */
  net_weight_per_bag: number;
  /**
   * Unit of measurement for the package quantity
   * @default "kg"
   * @example "kg"
   */
  unit?: string;
  /**
   * Coffee variety associated with the package
   * @example "Arabica"
   */
  variety?: string;
}

export interface FactoryBinPackageResponseDto {
  /**
   * Identifier of the bin package record
   * @example "cln8rlx0r0000124wef8abcd1"
   */
  id: string;
  /**
   * Human-friendly package identifier
   * @example "PK_1F4D8B73C2"
   */
  package_id: string;
  /**
   * Identifier of the bin this package belongs to
   * @example "cln8qkvp60000124wef8abcd0"
   */
  bin_id: string;
  /**
   * Date the package was created/recorded
   * @format date-time
   * @example "2024-05-01T00:00:00.000Z"
   */
  package_date: string;
  /**
   * Bag type used for this package
   * @example "JUTE_BAG"
   */
  bag_type: string;
  /**
   * Net weight that each individual bag is expected to contain
   * @example 25
   */
  net_weight_per_bag: number;
  /**
   * Unit of the quantity measurement
   * @example "kg"
   */
  unit: string;
  /**
   * Coffee variety associated with the package
   * @example "Arabica"
   */
  variety?: string;
  /**
   * Current status of the package
   * @example "WAITING_FOR_SCAN"
   */
  status: 'WAITING_FOR_SCAN' | 'READY' | 'PALLETIZED';
  /**
   * Identifier of the user who created the package
   * @example "user123"
   */
  created_by: string;
  /**
   * Timestamp when the package was created
   * @format date-time
   * @example "2024-05-01T08:00:00.000Z"
   */
  created_at: string;
  /**
   * Identifier of the user who last updated the package
   * @example "user123"
   */
  updated_by: string;
  /**
   * Timestamp when the package was last updated
   * @format date-time
   * @example "2024-05-01T08:00:00.000Z"
   */
  updated_at: string;
  /**
   * Soft delete timestamp (if applicable)
   * @format date-time
   * @example "2024-05-10T08:00:00.000Z"
   */
  deleted_at?: string;
  /**
   * Identifier of the user who deleted the package (if applicable)
   * @example "user456"
   */
  deleted_by?: string;
}

export interface FactoryBinPackageBatchResponseDto {
  /** List of bin packages created or updated by the request */
  packages: FactoryBinPackageResponseDto[];
  /**
   * Total weight currently packaged for the bin
   * @example 250
   */
  total_packaged_weight: number;
  /**
   * Remaining weight that has not yet been packaged
   * @example 150
   */
  remaining_unpacked_weight: number;
  /**
   * Total weight assigned to the bin
   * @example 400
   */
  bin_total_weight: number;
}

export interface PaginatedFactoryBinPackageResponseDto {
  /** Paginated list of bin packages */
  data: FactoryBinPackageResponseDto[];
  /** Pagination metadata */
  meta: Meta;
  /**
   * Total weight currently packaged for the bin
   * @example 250
   */
  total_packaged_weight: number;
  /**
   * Remaining weight that has not yet been packaged
   * @example 150
   */
  remaining_unpacked_weight: number;
  /**
   * Total weight assigned to the bin
   * @example 400
   */
  bin_total_weight: number;
}

export interface UpdateFactoryBinPackageStatusDto {
  /**
   * New status for the package
   * @example "READY"
   */
  status: 'WAITING_FOR_SCAN' | 'READY' | 'PALLETIZED';
}

export interface FactoryBinPackageStatusUpdateResponseDto {
  /** Updated bin package */
  package: FactoryBinPackageResponseDto;
  /**
   * Total weight currently packaged for the bin
   * @example 250
   */
  total_packaged_weight: number;
  /**
   * Remaining weight that has not yet been packaged
   * @example 150
   */
  remaining_unpacked_weight: number;
  /**
   * Total weight assigned to the bin
   * @example 400
   */
  bin_total_weight: number;
}

export interface CreateQuickBinDto {
  /**
   * Sale lot IDs to convert into quick bin packages
   * @example ["cln8qkvp60000124wef8abcd0","cln8qkvp60000124wef8abcd1"]
   */
  sale_lot_ids: string[];
}

export interface BulkUpdateFactoryBinPackageStatusDto {
  /**
   * Identifiers of the packages to update
   * @example ["cln8rlx0r0000124wef8abcd1","cln8rlx0r0000124wef8abcd2"]
   */
  package_ids: string[];
  /**
   * Status to be applied to the provided packages
   * @example "READY"
   */
  status: 'WAITING_FOR_SCAN' | 'READY' | 'PALLETIZED';
}

export interface CreateFactoryPalletDto {
  /**
   * Date when the pallet is created/stored in warehouse
   * @example "2025-04-28T00:00:00.000Z"
   */
  storage_date: string;
  /**
   * Total weight of the pallet
   * @example 1200
   */
  total_weight: number;
  /**
   * Bag type used for packages in the pallet
   * @example "Jute Bag"
   */
  bag_type: string;
  /**
   * Net weight per individual bag
   * @example 50
   */
  net_weight: number;
  /**
   * Array of package IDs to include in this pallet
   * @example ["PKG-2025-001","PKG-2025-002"]
   */
  package_ids: string[];
  /**
   * Location of the pallet in warehouse
   * @example "Aisle 3, Shelf 2"
   */
  pallet_location?: string;
  /**
   * Quality grade of the coffee in the pallet
   * @example "Grade A"
   */
  quality_grade?: string;
  /**
   * Additional notes about the pallet
   * @example "Ready for export"
   */
  notes?: string;
}

export interface FactoryPalletResponseDto {
  /**
   * Internal identifier of the pallet
   * @example "cln8qkvp60000124wef8abcd0"
   */
  id: string;
  /**
   * Human-friendly pallet identifier
   * @example "PL-2025-ABC123"
   */
  pallet_id: string;
  /**
   * Associated bin ID
   * @example "BIN-2025-ABC001"
   */
  bin_id: string;
  /**
   * Bag type used in the pallet
   * @example "Jute Bag"
   */
  bag_type: string;
  /**
   * Total weight/volume of the pallet in kg
   * @example 2000
   */
  total_weight: number;
  /**
   * Net weight per bag in kg
   * @example 50
   */
  net_weight: number;
  /**
   * Total number of bags/packages in the pallet
   * @example 40
   */
  total_packages: number;
  /**
   * Processing date
   * @format date-time
   * @example "2025-10-27"
   */
  processing_date?: string;
  /**
   * Quality grade
   * @example "Grade A"
   */
  quality_grade?: string;
  /**
   * Pallet location in warehouse
   * @example "Aisle 3, Shelf 2"
   */
  pallet_location?: string;
  /**
   * Storage date
   * @format date-time
   * @example "2025-10-27"
   */
  storage_date?: string;
  /**
   * Additional notes
   * @example "Ready for export"
   */
  notes?: string;
  /**
   * Current status of the pallet
   * @example "IN_STORE"
   */
  status: 'IN_STORE' | 'READY_TO_EXPORT' | 'EXPORTED';
  /**
   * Coffee variety
   * @example "Arabica"
   */
  variety?: string;
  /**
   * User who created the pallet
   * @example "user123"
   */
  created_by: string;
  /**
   * Timestamp when pallet was created
   * @format date-time
   * @example "2025-10-28T00:00:00.000Z"
   */
  created_at: string;
  /**
   * User who last updated the pallet
   * @example "user123"
   */
  updated_by: string;
  /**
   * Timestamp when pallet was last updated
   * @format date-time
   * @example "2025-10-28T00:00:00.000Z"
   */
  updated_at: string;
}

export interface PaginatedFactoryPalletResponseDto {
  /** List of pallets */
  data: FactoryPalletResponseDto[];
  /** Pagination metadata */
  meta: Meta;
}

export interface FactoryPalletPackageDto {
  /**
   * Package ID
   * @example "PKG-2025-001"
   */
  package_id: string;
  /**
   * Date when package was created
   * @format date-time
   * @example "2025-10-27"
   */
  package_date: string;
  /**
   * Net weight of the package
   * @example 50
   */
  quantity: number;
  /**
   * Bag type
   * @example "Jute Bag"
   */
  bag_type: string;
  /**
   * Package status
   * @example "Ready"
   */
  status: string;
}

export interface PalletFarmPointDto {
  /**
   * Latitude coordinate
   * @example 12.4903
   */
  latitude: number;
  /**
   * Longitude coordinate
   * @example 107.8319
   */
  longitude: number;
}

export interface PalletFarmCertificateDto {
  /**
   * Certificate ID
   * @example "cert123"
   */
  id: string;
  /**
   * Certificate name
   * @example "Organic Certification"
   */
  name: string;
}

export interface PalletFarmDto {
  /**
   * Farm ID
   * @example "XAEEXX15"
   */
  farm_id: string;
  /**
   * Farm address/region
   * @example "Nam Xuân, Krông Nô District, Dak Nong, Vietnam"
   */
  address: string;
  /** Farm boundary points (coordinates) */
  coordinates: PalletFarmPointDto[];
  /**
   * Total area in hectares
   * @example 1.98
   */
  total_area?: number;
  /**
   * Production volume in kg
   * @example 2000
   */
  production?: number;
  /**
   * Compliance status
   * @example true
   */
  compliant?: boolean;
  /** List of certificates */
  certificates: PalletFarmCertificateDto[];
}

export interface FactoryPalletDetailResponseDto {
  /**
   * Internal identifier of the pallet
   * @example "cln8qkvp60000124wef8abcd0"
   */
  id: string;
  /**
   * Human-friendly pallet identifier
   * @example "PL-2025-ABC123"
   */
  pallet_id: string;
  /**
   * Associated bin ID
   * @example "BIN-2025-ABC001"
   */
  bin_id: string;
  /**
   * Bag type used in the pallet
   * @example "Jute Bag"
   */
  bag_type: string;
  /**
   * Total weight/volume of the pallet in kg
   * @example 2000
   */
  total_weight: number;
  /**
   * Net weight per bag in kg
   * @example 50
   */
  net_weight: number;
  /**
   * Total number of bags/packages in the pallet
   * @example 40
   */
  total_packages: number;
  /**
   * Processing date
   * @format date-time
   * @example "2025-10-27"
   */
  processing_date?: string;
  /**
   * Quality grade
   * @example "Grade A"
   */
  quality_grade?: string;
  /**
   * Pallet location in warehouse
   * @example "Aisle 3, Shelf 2"
   */
  pallet_location?: string;
  /**
   * Storage date
   * @format date-time
   * @example "2025-10-27"
   */
  storage_date?: string;
  /**
   * Additional notes
   * @example "Ready for export"
   */
  notes?: string;
  /**
   * Current status of the pallet
   * @example "IN_STORE"
   */
  status: 'IN_STORE' | 'READY_TO_EXPORT' | 'EXPORTED';
  /**
   * Coffee variety
   * @example "Arabica"
   */
  variety?: string;
  /**
   * User who created the pallet
   * @example "user123"
   */
  created_by: string;
  /**
   * Timestamp when pallet was created
   * @format date-time
   * @example "2025-10-28T00:00:00.000Z"
   */
  created_at: string;
  /**
   * User who last updated the pallet
   * @example "user123"
   */
  updated_by: string;
  /**
   * Timestamp when pallet was last updated
   * @format date-time
   * @example "2025-10-28T00:00:00.000Z"
   */
  updated_at: string;
  /** List of packages in this pallet */
  packages: FactoryPalletPackageDto[];
  /** List of farms associated with this pallet */
  farms: PalletFarmDto[];
}

export interface UploadFactoryDocumentDto {
  /**
   * File to upload (PDF, DOC, DOCX, XLS, XLSX, JPEG, PNG only). Maximum file size: 20MB
   * @format binary
   * @example "qc-report.pdf"
   */
  file: File;
  /**
   * Document name for display purposes
   * @maxLength 255
   * @example "QC Report"
   */
  document_name: string;
  /**
   * Entity type this document is associated with
   * @example "BIN"
   */
  entity_type: 'BIN' | 'FARM' | 'LOT' | 'SHIPMENT' | 'PALLET' | 'EXPORT_LOT';
  /**
   * ID of the associated entity (BIN ID, FARM ID, LOT ID, SHIPMENT ID, or PALLET ID)
   * @example "BIN-2025-ABC001"
   */
  associated_id: string;
  /**
   * Optional description for the document
   * @maxLength 500
   * @example "In-Process QC Report for BIN-2025-ABC001"
   */
  description?: string;
}

export interface FactoryDocumentResponseDto {
  /**
   * Unique identifier for the uploaded document
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * File association ID
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  association_id: string;
  /**
   * Document name
   * @example "QC Report"
   */
  document_name: string;
  /**
   * Original filename as uploaded
   * @example "In-Process QC Report - BIN-2025-07-005.doc"
   */
  filename: string;
  /**
   * Entity type
   * @example "BIN"
   */
  entity_type: 'BIN' | 'FARM' | 'LOT' | 'SHIPMENT' | 'PALLET' | 'EXPORT_LOT';
  /**
   * Associated entity ID
   * @example "BIN-2025-ABC001"
   */
  associated_id: string;
  /**
   * File size in bytes
   * @example 1024000
   */
  size: number;
  /**
   * MIME type of the document
   * @example "application/pdf"
   */
  mimetype: string;
  /**
   * S3 URL for direct access
   * @example "https://sit-traceability-user-files-bucket.s3.amazonaws.com/factory/documents/clh5x8k2a0000abcd1234efgh_qc-report.pdf"
   */
  url: string;
  /**
   * Document description
   * @example "In-Process QC Report for BIN-2025-ABC001"
   */
  description?: string;
  /**
   * Upload date
   * @format date-time
   * @example "2025-04-27T10:00:00.000Z"
   */
  upload_date: string;
}

export interface FactoryDocumentListItemDto {
  /**
   * Unique identifier for the document
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * Document name
   * @example "QC Report"
   */
  document_name: string;
  /**
   * Original filename
   * @example "In-Process QC Report - BIN-2025-07-005.doc"
   */
  filename: string;
  /**
   * Entity type
   * @example "BIN"
   */
  entity_type: 'BIN' | 'FARM' | 'LOT' | 'SHIPMENT' | 'PALLET' | 'EXPORT_LOT';
  /**
   * Associated entity ID
   * @example "BIN-2025-ABC001"
   */
  associated_id: string;
  /**
   * Source ID of the associated entity
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  source_id: string;
  /**
   * Upload date
   * @format date-time
   * @example "2025-04-27T10:00:00.000Z"
   */
  upload_date: string;
}

export interface PaginatedFactoryDocumentResponseDto {
  /** Array of factory documents */
  data: FactoryDocumentListItemDto[];
  /** Pagination metadata */
  meta: Meta;
}

export interface DeleteFactoryDocumentResponseDto {
  /**
   * Success message
   * @example "Document deleted successfully"
   */
  message: string;
  /**
   * ID of the deleted document
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  document_id: string;
}

export interface CreateFactoryExportLotDto {
  /**
   * Contract number
   * @example "CONTRACT-2025-001"
   */
  contract_number: string;
  /**
   * Container number
   * @example "CONT-2025-12345"
   */
  container_number: string;
  /**
   * Seal number
   * @example "SEAL-2025-98765"
   */
  seal_number: string;
  /**
   * Shipping origin location
   * @example "Vietnam"
   */
  ship_from: string;
  /**
   * Shipping destination location
   * @example "United States"
   */
  ship_to: string;
  /**
   * Exporter Organization ID
   * @example "org123"
   */
  exporter_org_id: string;
  /**
   * Importer Organization ID
   * @example "org456"
   */
  importer_org_id: string;
  /**
   * Array of pallet IDs to include in this export lot
   * @example ["clh5x8k2a0000abcd1234efgh"]
   */
  pallet_ids: string[];
  /**
   * Additional notes about the export lot
   * @example "Priority shipment"
   */
  note?: string;
}

export interface ExportLotListItemDto {
  /**
   * Unique identifier for the export lot
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * Export lot ID
   * @example "LOT-2025-ABC12345"
   */
  export_id: string;
  /**
   * Coffee variety
   * @example "Arabica"
   */
  variety: string;
  /**
   * Number of pallets in the export lot
   * @example 20
   */
  total_pallets: number;
  /**
   * Total weight of the export lot in kg
   * @example 25000
   */
  total_weight: number;
  /**
   * Export lot status
   * @example "READY_TO_EXPORT"
   */
  status: string;
  /**
   * Created timestamp
   * @format date-time
   * @example "2025-11-07T10:00:00.000Z"
   */
  created_at: string;
}

export interface PaginatedExportLotResponseDto {
  /** List of export lots */
  data: ExportLotListItemDto[];
  /** Pagination metadata */
  meta: Meta;
}

export interface OrganizationListItemDto {
  /** Organization ID */
  id: string;
  /** Organization Name */
  name: string;
  /** Organization Display ID */
  display_id: string;
  /** Address */
  address?: string;
  /** Phone */
  phone?: string;
}

export interface PaginatedOrganizationResponseDto {
  data: OrganizationListItemDto[];
  meta: Meta;
}

export interface ExportLotOrganizationDto {
  /**
   * Organization ID
   * @example "org123"
   */
  id: string;
  /**
   * Organization name
   * @example "Global Coffee Exporters"
   */
  name: string;
  /**
   * Organization address
   * @example "123 Coffee St, Bean City, Country"
   */
  address?: string;
}

export interface ExportLotInspectionDto {
  /**
   * Inspector name
   * @example "John Doe"
   */
  inspector_name?: string;
  /**
   * Inspection date
   * @format date-time
   * @example "2025-11-07T10:00:00.000Z"
   */
  inspection_date?: string;
  /**
   * Sterilization status
   * @example true
   */
  sterlisation?: boolean;
  /**
   * Additional notes about the inspection
   * @example "All pallets passed inspection."
   */
  inspection_note?: string;
}

export interface FactoryExportLotResponseDto {
  /**
   * Unique identifier for the export lot
   * @example "clh5x8k2a0000abcd1234efgh"
   */
  id: string;
  /**
   * Export lot ID (auto-generated)
   * @example "LOT-2025-ABC12345"
   */
  export_id: string;
  /**
   * Contract number
   * @example "CONTRACT-2025-001"
   */
  contract_number: string;
  /**
   * Total weight (auto-calculated from pallets)
   * @example 25000
   */
  total_weight: number;
  /**
   * Total number of pallets (auto-calculated)
   * @example 20
   */
  total_pallets: number;
  /**
   * Coffee variety (auto-calculated from pallets)
   * @example "Arabica"
   */
  variety: string;
  /**
   * Container number
   * @example "CONT-2025-12345"
   */
  container_number: string;
  /**
   * Seal number
   * @example "SEAL-2025-98765"
   */
  seal_number: string;
  /**
   * Shipping origin location
   * @example "Vietnam"
   */
  ship_from: string;
  /**
   * Shipping destination location
   * @example "United States"
   */
  ship_to: string;
  /** Exporter Organization */
  exporter_org?: ExportLotOrganizationDto;
  /** Importer Organization */
  importer_org?: ExportLotOrganizationDto;
  /**
   * Export lot status
   * @example "PENDING"
   */
  status: string;
  /**
   * Additional notes
   * @example "Priority shipment"
   */
  note?: string;
  /** Inspection information */
  inspection: ExportLotInspectionDto;
  /**
   * Created timestamp
   * @format date-time
   * @example "2025-11-07T10:00:00.000Z"
   */
  created_at: string;
  /**
   * Created by user ID
   * @example "user123"
   */
  created_by: string;
  /**
   * Updated timestamp
   * @format date-time
   * @example "2025-11-07T11:00:00.000Z"
   */
  updated_at: string;
  /**
   * Updated by user ID
   * @example "user123"
   */
  updated_by: string;
}

export interface UpdateExportLotInspectionDto {
  /**
   * Inspector name
   * @example "John Doe"
   */
  inspector_name: string;
  /**
   * Inspection date
   * @example "2025-11-07T10:00:00.000Z"
   */
  inspection_date: string;
  /**
   * Sterilization status
   * @example true
   */
  sterlisation: boolean;
  /**
   * Additional notes about the inspection
   * @example "All pallets passed inspection."
   */
  description?: string;
}

export interface ExportLotPalletDto {
  /**
   * Pallet ID
   * @example "PL-2025-ABC123"
   */
  pallet_id: string;
  /**
   * Bag type
   * @example "Jute Bag"
   */
  bag_type: string;
  /**
   * Total weight
   * @example 1200
   */
  total_weight: number;
  /**
   * Net weight
   * @example 1150
   */
  net_weight: number;
  /**
   * Total packages in pallet
   * @example 24
   */
  total_packages: number;
  /**
   * Coffee variety
   * @example "Arabica"
   */
  variety: string;
  /**
   * Quality grade
   * @example "Grade A"
   */
  quality_grade: string;
  /**
   * Pallet status
   * @example "READY"
   */
  status: string;
}

export interface ExportLotFarmSummaryItemDto {
  /**
   * Farm ID
   * @example "cm3q8j9k0000114txhqz0farm"
   */
  id: string;
  /**
   * Farm identifier for display in tabs/dropdown
   * @example "F-2024-001"
   */
  fid: string;
}

export interface ExportLotFarmsSummaryResponseDto {
  /**
   * Total number of farms in this export lot
   * @example 12
   */
  total: number;
  /** List of farms (id and fid only) */
  farms: ExportLotFarmSummaryItemDto[];
}

export interface ExportLotFarmProvinceDto {
  name: string;
  id: string;
  province_code?: string;
}

export interface ExportLotFarmDetailPointDto {
  id: string;
  latitude: number;
  longitude: number;
  /** @format date-time */
  created_at: string;
}

export interface ExportLotFarmDetailCertificateDto {
  id: string;
  name: string;
}

export interface ExportLotFarmDetailDto {
  /**
   * Farm ID
   * @example "cm3q8j9k0000114txhqz0farm"
   */
  id: string;
  /**
   * Farm identifier
   * @example "F-2024-001"
   */
  fid: string;
  /**
   * Farm address
   * @example "Thanh Son, Nam Dinh"
   */
  address?: string;
  province?: ExportLotFarmProvinceDto;
  /** All farm boundary points (coordinates) */
  farm_points: ExportLotFarmDetailPointDto[];
  /**
   * Total farm area in hectares
   * @example 4.3
   */
  total_area: number;
  /**
   * Total production volume
   * @example 1500.5
   */
  total_current_year_production: number;
  farm_certificates: ExportLotFarmDetailCertificateDto[];
}

export interface FactoryInfoResponseDto {
  /** Factory ID */
  factory_id: string;
  /** Factory name */
  factory_name: string;
  /** Factory address */
  factory_address: string;
  /** Factory city */
  factory_city: string;
  /** Factory tax code */
  factory_tax_code: string;
}

export interface UpdateFactoryInfoDto {
  /** Factory name */
  factory_name?: string;
  /** Factory address */
  factory_address?: string;
  /** Factory city */
  factory_city?: string;
  /** Factory tax code */
  factory_tax_code?: string;
}

export interface OrganizationSearchResult {
  /**
   * Organization ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  organization_id: string;
  /**
   * Organization name
   * @example "Green Coffee Processing Co."
   */
  organization_name: string;
  /**
   * Organization phone number
   * @example "+1234567890"
   */
  phone?: string;
  /**
   * Organization type
   * @example "FACTORY"
   */
  organization_type: string;
  /**
   * Date when organization was created
   * @format date-time
   * @example "2024-01-15T10:30:00Z"
   */
  created_at: string;
  /**
   * Date when organization was last updated
   * @format date-time
   * @example "2024-01-15T10:30:00Z"
   */
  updated_at: string;
}

export interface OrganizationSearchResponse {
  /** List of organizations */
  data: OrganizationSearchResult[];
  meta: Meta;
}

export interface SigninDto {
  /**
   * User email address (for app_user) or username (for app_factory_user)
   * @example "user@example.com or factory_user123"
   */
  identifier: string;
  /**
   * User password
   * @example "password123"
   */
  password: string;
}

export interface SigninResponseDto {
  /** JWT access token */
  access_token: string;
  /**
   * Unix timestamp (in seconds) when the access token expires
   * @example 1702316400
   */
  expires_at: number;
  /**
   * Refresh token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  refresh_token: string;
  /**
   * Unix timestamp (in seconds) when the refresh token expires
   * @example 1702920400
   */
  refresh_token_expires_at: number;
}

export interface SignupDto {
  /**
   * Username
   * @example "user123"
   */
  username: string;
  /**
   * User password
   * @minLength 8
   * @example "password123"
   */
  password: string;
  /**
   * Full name of the user
   * @example "Nguyen Van A"
   */
  full_name: string;
  /** User phone number */
  phone_number: string;
  /** User email address */
  email?: string;
  /**
   * User address
   * @example "123 Main Street"
   */
  address?: string;
  /**
   * Accept terms and conditions (must be true)
   * @example true
   */
  terms_and_conditions: true;
}

export interface UserResponseDto {
  /** User ID */
  id: string;
  /** User email address */
  email: string;
  /** User phone number */
  phone?: string;
  /** User full name */
  full_name: string;
  /** User address */
  address?: string;
  /** Whether user is verified */
  is_verified: boolean;
  /** Terms and conditions acceptance */
  terms_and_conditions: boolean;
  /**
   * User creation timestamp
   * @format date-time
   */
  created_at: string;
  /**
   * User last update timestamp
   * @format date-time
   */
  updated_at: string;
  /** Factory ID (only for FACTORY role) */
  factory_id?: string;
  /** Factory name (only for FACTORY role) */
  factory_name?: string;
}

export interface SignupResponseDto {
  user: UserResponseDto;
  /** JWT access token */
  access_token: string;
  /**
   * Unix timestamp (in seconds) when the access token expires
   * @example 1702316400
   */
  expires_at: number;
  /**
   * Refresh token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  refresh_token: string;
  /**
   * Unix timestamp (in seconds) when the refresh token expires
   * @example 1702920400
   */
  refresh_token_expires_at: number;
}

export interface SignupOrgDto {
  /** Organization type */
  type: 'FARMER' | 'COLLECTOR' | 'FACTORY' | 'EXPORTER' | 'IMPORTER';
  /**
   * Organization name
   * @example "My Organization"
   */
  name: string;
  /**
   * Organization address
   * @example "123 Main Street"
   */
  address: string;
  /**
   * Ward/Town
   * @example "Phuong 1"
   */
  ward: string;
  /**
   * District/City
   * @example "Di Linh, Lam Dong"
   */
  city: string;
  /**
   * Organization tax code
   * @example "123456789"
   */
  tax_code: string;
  /**
   * First name of contact person
   * @example "John"
   */
  first_name: string;
  /**
   * Last name of contact person
   * @example "Doe"
   */
  last_name: string;
  /** Phone number of contact person */
  phone: string;
  /** Email of contact person */
  email: string;
}

export interface OrganizationDto {
  /** Organization name */
  name: string;
  /** Organization type */
  type: string;
}

export interface UserProfileDto {
  /** User ID */
  id: string;
  /** User email address */
  email: string;
  /** User full name */
  full_name?: string;
  /** User phone number */
  phone?: string;
  /** User address */
  address?: string;
  /** User city */
  city?: string;
  /** Whether user is verified */
  is_verified: boolean;
  /** Terms and conditions acceptance */
  terms_and_conditions: boolean;
  /**
   * User creation timestamp
   * @format date-time
   */
  created_at: string;
  /**
   * User last update timestamp
   * @format date-time
   */
  updated_at: string;
  /** User roles */
  roles: string[];
  /** User organization */
  organization: OrganizationDto;
}

export interface UpdateProfileDto {
  /**
   * User full name
   * @minLength 2
   * @maxLength 100
   * @example "John Doe"
   */
  full_name: string;
  /**
   * User phone number
   * @maxLength 20
   * @example "+1234567890"
   */
  phone: string;
  /**
   * User address
   * @maxLength 255
   * @example "123 Main Street"
   */
  address?: string;
  /**
   * User city
   * @maxLength 100
   * @example "Ho Chi Minh City"
   */
  city: string;
}

export interface RefreshTokenDto {
  /**
   * The refresh token to use for generating a new access token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  refresh_token: string;
}

export interface RefreshTokenResponseDto {
  /**
   * New JWT access token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  access_token: string;
  /**
   * Unix timestamp (in seconds) when the access token expires
   * @example 1702316400
   */
  expires_at: number;
  /**
   * New refresh token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  refresh_token: string;
  /**
   * Unix timestamp (in seconds) when the refresh token expires
   * @example 1702920400
   */
  refresh_token_expires_at: number;
}

export interface LogoutDto {
  /**
   * The refresh token to revoke
   * @example "a1b2c3d4e5f6..."
   */
  refresh_token: string;
}

export interface ChangePasswordDto {
  /**
   * Current password
   * @example "OldPassword123!"
   */
  old_password: string;
  /**
   * New password
   * @minLength 8
   * @maxLength 128
   * @example "NewPassword123!"
   */
  new_password: string;
  /**
   * Confirm new password (must match new_password)
   * @minLength 8
   * @maxLength 128
   * @example "NewPassword123!"
   */
  confirm_password: string;
}

export interface CollectorProvinceDto {
  /**
   * Unique identifier for the province/state
   * @example "cm3q8j9k0000114txhqz0province"
   */
  id: string;
  /**
   * Full name of the province/state
   * @example "East Java"
   */
  name: string;
  /**
   * Province/state code or abbreviation used for administrative purposes
   * @example "JT"
   */
  code: string;
}

export interface CollectorSaleLotListItemDto {
  /**
   * Sale lot ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Sale lot identifier (SLID)
   * @example "SL-2024-001"
   */
  slid: string;
  /**
   * Packaging date (sale lot creation date)
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  packaging_date: string;
  /**
   * Total quantity calculated from all package items in kg
   * @example 1250.5
   */
  total_quantity: number;
  /**
   * Real weight of the sale lot measured by collector in kg
   * @example 1247.8
   */
  real_weight?: number;
  /**
   * Number of bags (count of package items)
   * @example 25
   */
  number_of_bags: number;
  /**
   * Coffee variety for the sale lot
   * @example "Arabica Typica"
   */
  variety: string;
  /**
   * Farm identifier (FID)
   * @example "F-2024-001"
   */
  fid?: string;
  /**
   * Farm ID associated with the sale lot
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farm_id?: string;
  /**
   * Current status of the sale lot
   * @example "WAITING_TO_COLLECT"
   */
  status:
    | 'WAITING_TO_COLLECT'
    | 'COLLECTED'
    | 'IN_TRANSIT'
    | 'ARRIVED_AT_FACTORY'
    | 'INTAKE'
    | 'CANCELLED';
  /**
   * Scheduled pickup date
   * @format date-time
   * @example "2024-01-20T08:00:00.000Z"
   */
  pickup_date?: string;
  /** Province information from the farm */
  province?: CollectorProvinceDto;
}

export interface PaginatedCollectorSaleLotResponseDto {
  /** Pagination metadata including skip, limit, and total count */
  meta: Meta;
  /** Array of sale lot items assigned to the collector */
  data: CollectorSaleLotListItemDto[];
}

export interface CollectorPackageItemDto {
  /**
   * Unique identifier for the package item
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Farm ID associated with the package
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farm_id: string;
  /**
   * Package list ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  package_list_id: string;
  /**
   * Package number in the list
   * @example 1
   */
  package_number: number;
  /**
   * Weight of the package in kg
   * @example 50.5
   */
  weight: number;
  /**
   * Actual weight measured by collector in kg
   * @example 49.8
   */
  actual_weight?: number;
  /**
   * Status of the package
   * @example "READY"
   */
  status: string;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  created_at: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  updated_at: string;
}

export interface CollectorContributingFarmDto {
  /**
   * Farm ID associated with package item contributions
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Farm identifier
   * @example "F-2024-001"
   */
  fid: string;
  /**
   * Farm type
   * @example "CENTRAL"
   */
  farm_type: string;
}

export interface CollectorSaleLotDetailResponse {
  /**
   * Sale lot ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Sale lot identifier (SLID)
   * @example "SL-2024-001"
   */
  slid: string;
  /**
   * Packaging date (sale lot creation date)
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  packaging_date: string;
  /**
   * Total quantity calculated from all package items in kg
   * @example 1250.5
   */
  total_quantity: number;
  /**
   * Real weight of the sale lot measured by collector in kg
   * @example 1247.8
   */
  real_weight?: number;
  /**
   * Number of bags (count of package items)
   * @example 25
   */
  number_of_bags: number;
  /**
   * Coffee variety for the sale lot
   * @example "Arabica Typica"
   */
  variety: string;
  /**
   * Farm identifier (FID)
   * @example "F-2024-001"
   */
  fid?: string;
  /**
   * Farm ID associated with the sale lot
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  farm_id?: string;
  /**
   * Current status of the sale lot
   * @example "WAITING_TO_COLLECT"
   */
  status:
    | 'WAITING_TO_COLLECT'
    | 'COLLECTED'
    | 'IN_TRANSIT'
    | 'ARRIVED_AT_FACTORY'
    | 'INTAKE'
    | 'CANCELLED';
  /**
   * Scheduled pickup date
   * @format date-time
   * @example "2024-01-20T08:00:00.000Z"
   */
  pickup_date?: string;
  /** Province information from the farm */
  province?: CollectorProvinceDto;
  /** Package items associated with this sale lot */
  package_items: CollectorPackageItemDto[];
  /**
   * Notes about the sale lot
   * @example "Collected from farm at 2PM. Good quality beans."
   */
  note?: string;
  /**
   * Email of user who deleted the record
   * @example "collector@example.com"
   */
  deleted_by?: string;
  /**
   * Deletion timestamp
   * @format date-time
   * @example "2024-01-20T10:30:00.000Z"
   */
  deleted_at?: string;
  /** All farms contributing to this sale lot through package items (main + nearby farms) */
  contributing_farms: CollectorContributingFarmDto[];
}

export interface UpdateRealWeightDto {
  /**
   * Real weight of the sale lot measured by collector in kg
   * @example 1247.8
   */
  real_weight: number;
}

export interface UpdateRealWeightResponseDto {
  /**
   * Sale lot ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Updated real weight in kg
   * @example 1247.8
   */
  real_weight: number;
  /**
   * Update timestamp
   * @format date-time
   * @example "2024-01-20T10:30:00.000Z"
   */
  updated_at: string;
}

export interface CollectSaleLotDto {
  /**
   * Real weight of the sale lot measured during collection in kg
   * @example 1247.8
   */
  real_weight: number;
  /**
   * Optional notes about the collection
   * @example "Collected from farm at 2PM. Good quality beans."
   */
  note?: string;
}

export interface CollectSaleLotResponseDto {
  /**
   * Sale lot ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Updated status
   * @example "COLLECTED"
   */
  status: string;
  /**
   * Real weight measured during collection in kg
   * @example 1247.8
   */
  real_weight: number;
  /**
   * Pickup date and time
   * @format date-time
   * @example "2024-01-20T14:30:00.000Z"
   */
  pickup_date: string;
  /**
   * Update timestamp
   * @format date-time
   * @example "2024-01-20T14:30:00.000Z"
   */
  updated_at: string;
}

export interface CollectorStatisticsDto {
  /**
   * Total number of sale lots waiting to be collected
   * @example 25
   */
  total_lots_to_collect: number;
  /**
   * Total weight of all lots waiting to be collected (in kg)
   * @example 1250.75
   */
  total_weight_to_collect: number;
  /**
   * Total number of sale lots that have been collected
   * @example 18
   */
  total_lots_collected: number;
  /**
   * Total weight of all lots that have been collected (in kg)
   * @example 890.25
   */
  total_weight_collected: number;
  /**
   * Total number of unique farms assigned to this collector
   * @example 12
   */
  total_farms: number;
}

export interface CollectorStatisticsResponseDto {
  /**
   * Indicates if the request was successful
   * @example true
   */
  success: boolean;
  /**
   * Response message
   * @example "Statistics retrieved successfully"
   */
  message: string;
  /** Collector statistics data */
  data: CollectorStatisticsDto;
}

export interface CollectorCountryDto {
  /**
   * Unique identifier for the country
   * @example "cm3q8j9k0000114txhqz0country"
   */
  id: string;
  /**
   * Full name of the country
   * @example "Indonesia"
   */
  name: string;
  /**
   * ISO 3166-1 alpha-2 country code for international identification
   * @example "ID"
   */
  code: string;
}

export interface CollectorFarmOwnerDto {
  /**
   * Unique identifier for the farm owner
   * @example "cm3q8j9k0000114txhqz0owner"
   */
  id: string;
  /**
   * Complete name of the farm owner (first name + last name)
   * @example "John Doe"
   */
  full_name: string;
  /**
   * Email address of the farm owner for communication and contact purposes
   * @example "john.doe@example.com"
   */
  email: string;
  /**
   * Phone number of the farm owner including country code for direct contact
   * @example "+62812345678"
   */
  phone?: string;
}

export interface CollectorFarmAreaDto {
  /**
   * Unique identifier of the farm area
   * @example "cm3q8j9k0000114txhqz0area"
   */
  id: string;
  /**
   * Name of the farm area
   * @example "North Field"
   */
  name: string;
  /**
   * Area size
   * @example 2.5
   */
  area: number;
  /**
   * Area unit (hectares, acres, etc.)
   * @example "hectares"
   */
  unit: string;
  /**
   * Timestamp when the area was created
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  created_at: string;
}

export interface CollectorFarmPointDto {
  /**
   * Unique identifier of the farm point
   * @example "cm3q8j9k0000114txhqz0point"
   */
  id: string;
  /**
   * Latitude coordinate
   * @example -7.2575
   */
  latitude: number;
  /**
   * Longitude coordinate
   * @example 112.7521
   */
  longitude: number;
  /**
   * Timestamp when the point was created
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  created_at: string;
}

export interface CollectorCertificateTypeDto {
  /**
   * Unique identifier for the certificate type
   * @example "cm3q8j9k0000114txhqz0certtype"
   */
  id: string;
  /**
   * Name of the certificate type (e.g., Organic Certification, Fair Trade)
   * @example "Organic Certification"
   */
  name: string;
}

export interface CollectorFarmCertificateDto {
  /**
   * Unique identifier of the farm certificate association
   * @example "cm3q8j9k0000114txhqz0cert"
   */
  id: string;
  /** Certificate type information including type details and certification name */
  certificate_type: CollectorCertificateTypeDto;
  /**
   * Timestamp when the certificate was added to the farm
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  created_at: string;
}

export interface CollectorFarmProductionDto {
  /**
   * Production year
   * @example 2024
   */
  year: number;
  /**
   * Coffee variety
   * @example "Arabica"
   */
  variety: string;
  /**
   * Production volume
   * @example 1500.5
   */
  volume: number;
  /**
   * Contracted volume
   * @example 1200
   */
  contracted_volume: number;
}

export interface CollectorFarmInfoDto {
  /**
   * Unique identifier of the farm
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Farm ID code
   * @example "F-2024-001"
   */
  fid: string | null;
  /**
   * Organization ID associated with the farm
   * @example "org123"
   */
  org_id: string | null;
  /**
   * Physical address of the farm
   * @example "123 Farm Road, Rural District"
   */
  address: string;
  /**
   * Country ID where the farm is located
   * @example "country123"
   */
  country_id: string | null;
  /**
   * Province ID where the farm is located
   * @example "province123"
   */
  province_id: string | null;
  /** Country information where the farm is located. Contains country details including unique identifier, full country name, and ISO country code for international identification */
  country?: CollectorCountryDto;
  /** Province/state information where the farm is located within the country. Contains administrative division details including unique identifier, province name, and local province code */
  province?: CollectorProvinceDto;
  /** Farm owner information including personal details and contact information. Contains the registered owner of the farm with their identification, full name, email address, and phone number for communication purposes */
  owner?: CollectorFarmOwnerDto;
  /** Farm areas */
  farm_areas: CollectorFarmAreaDto[];
  /** Farm boundary points */
  farm_points: CollectorFarmPointDto[];
  /** Farm certificates */
  farm_certificates: CollectorFarmCertificateDto[];
  /** Current year production data */
  current_year_production: CollectorFarmProductionDto[];
  /**
   * Total production volume for current year
   * @example 1500.5
   */
  total_current_year_production: number;
  /**
   * Total area of all farm areas
   * @example 5.2
   */
  total_area: number;
  /**
   * Timestamp when the farm was created
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  created_at: string;
  /**
   * Timestamp when the farm was last updated
   * @format date-time
   * @example "2024-01-16T14:45:00.000Z"
   */
  updated_at: string;
  /**
   * ID of the user who created this farm
   * @example "cm3q8j9k0000114txhqz0xyz"
   */
  created_by: string;
  /**
   * ID of the user who last updated this farm
   * @example "cm3q8j9k0000114txhqz0xyz"
   */
  updated_by: string;
}

export interface CollectorSaleLotFarmInfoResponseDto {
  /**
   * Sale lot ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  sale_lot_id: string;
  /**
   * Sale lot identifier code
   * @example "SL-2024-001"
   */
  slid: string;
  /** Farm information associated with the sale lot */
  farm: CollectorFarmInfoDto;
  /**
   * Total number of package items in this sale lot from the farm
   * @example 25
   */
  total_packages: number;
  /**
   * Total weight of packages from the farm in this sale lot
   * @example 1250.5
   */
  total_weight: number;
}

export interface PackageItemWeightUpdateDto {
  /**
   * Package item ID
   * @example "cm3q8j9k0000114txhqz0pkg1"
   */
  package_item_id: string;
  /**
   * Actual weight measured by collector
   * @example 65.5
   */
  actual_weight: number;
}

export interface BulkUpdatePackageWeightDto {
  /** Array of package item weight updates */
  package_items: PackageItemWeightUpdateDto[];
}

export interface PackageItemWeightResponseDto {
  /**
   * Package item ID
   * @example "cm3q8j9k0000114txhqz0pkg1"
   */
  id: string;
  /**
   * Package number within the package list
   * @example 1
   */
  package_number: number;
  /**
   * Original weight from package list
   * @example 60
   */
  weight: number;
  /**
   * Actual weight measured by collector
   * @example 65.5
   */
  actual_weight: number | null;
  /**
   * Weight difference (actual - original)
   * @example 5.5
   */
  weight_difference: number | null;
  /**
   * Package item status
   * @example "READY"
   */
  status: string;
  /**
   * Timestamp when the package was last updated
   * @format date-time
   * @example "2024-10-14T10:30:00.000Z"
   */
  updated_at: string;
}

export interface BulkUpdatePackageWeightResponseDto {
  /**
   * Sale lot ID
   * @example "cm3q8j9k0000114txhqz0sale"
   */
  sale_lot_id: string;
  /**
   * Sale lot identifier
   * @example "SL-2024-001"
   */
  slid: string;
  /** Updated package items */
  updated_packages: PackageItemWeightResponseDto[];
  /**
   * Total number of packages updated
   * @example 3
   */
  total_updated: number;
  /**
   * Total original weight
   * @example 180
   */
  total_original_weight: number;
  /**
   * Total actual weight
   * @example 186.5
   */
  total_actual_weight: number;
  /**
   * Total weight difference
   * @example 6.5
   */
  total_weight_difference: number;
}

export interface SimpleFarmDto {
  /**
   * Farm ID
   * @example "cm3q8j9k0000114txhqz0farm"
   */
  id: string;
  /**
   * Farm identifier
   * @example "F-2024-001"
   */
  fid: string;
  /**
   * Farm address
   * @example "123 Coffee Farm Road, Province, Country"
   */
  address: string;
  /** Province information */
  province?: FarmProvinceDto;
}

export interface ShipmentDetailSaleLotDto {
  /**
   * Sale lot ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Sale lot identifier
   * @example "SL-2024-001"
   */
  slid: string;
  /**
   * Sale lot date
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  date: string;
  /**
   * Coffee variety
   * @example "Arabica"
   */
  variety: string;
  /**
   * Real weight of the sale lot in kg
   * @example 50.5
   */
  real_weight: number;
  /**
   * Sale lot status
   * @example "IN_TRANSIT"
   */
  status: string;
  /**
   * Farm ID
   * @example "cm3q8j9k0000114txhqz0farm"
   */
  farm_id?: string;
  /** Basic farm information */
  farm?: SimpleFarmDto;
}

export interface ShipmentDetailDto {
  /**
   * Unique identifier for the shipment
   * @example "cm3q8j9k0000114txhqz0shipment"
   */
  id: string;
  /**
   * Human-readable shipment identifier
   * @example "SH-2024-001"
   */
  shipment_id: string;
  /**
   * Factory ID where the shipment will be delivered
   * @example "cm3q8j9k0000114txhqz0factory"
   */
  factory_id: string;
  /**
   * Factory name
   * @example "Premium Coffee Processing Ltd."
   */
  factory_name: string;
  /**
   * Scheduled ship date
   * @format date-time
   * @example "2024-01-25T10:00:00.000Z"
   */
  ship_date?: string;
  /**
   * Destination details for delivery
   * @example "Factory Processing Center - Building A"
   */
  destination?: string;
  /**
   * Truck identifier for shipment transportation
   * @example "TRK-001-ABC"
   */
  truck_id?: string;
  /**
   * Additional notes for the shipment
   * @example "Handle with care - premium quality beans"
   */
  notes?: string;
  /**
   * Status of the shipment
   * @example "PREPARING"
   */
  status: string;
  /**
   * Total weight of all sale lots in kg
   * @example 301
   */
  total_weight: number;
  /**
   * Total number of bags in the shipment
   * @example 150
   */
  total_bags?: number;
  /** Sale lots included in the shipment with farm information */
  sale_lots: ShipmentDetailSaleLotDto[];
  /**
   * ID of the collector who created the shipment
   * @example "collector123"
   */
  created_by: string;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  created_at: string;
  /**
   * ID of the user who last updated the shipment
   * @example "collector123"
   */
  updated_by: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  updated_at: string;
}

export interface PaginatedShipmentResponseDto {
  /** Pagination metadata including skip, limit, and total count */
  meta: Meta;
  /** Array of sale lot items */
  data: ShipmentDetailDto[];
}

export interface CreateShipmentDto {
  /**
   * Array of sale lot IDs to include in the shipment
   * @example ["cm3q8j9k0000114txhqz0abcd","cm3q8j9k0000114txhqz0efgh"]
   */
  sale_lot_ids: string[];
  /**
   * Factory ID where the shipment will be delivered
   * @example "cm3q8j9k0000114txhqz0factory"
   */
  factory_id: string;
  /**
   * Scheduled ship date
   * @example "2024-01-25T10:00:00.000Z"
   */
  ship_date?: string;
  /**
   * Destination details for delivery
   * @example "Factory Processing Center - Building A"
   */
  destination?: string;
  /**
   * Truck identifier for shipment transportation
   * @example "TRK-001-ABC"
   */
  truck_id?: string;
  /**
   * Total number of bags in the shipment
   * @example 150
   */
  total_bags?: number;
  /**
   * Additional notes for the shipment
   * @example "Handle with care - premium quality beans"
   */
  notes?: string;
}

export interface ShipmentSaleLotDto {
  /**
   * Sale lot ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Sale lot identifier
   * @example "SL-2024-001"
   */
  slid: string;
  /**
   * Coffee variety
   * @example "Arabica"
   */
  variety: string;
  /**
   * Real weight of the sale lot in kg
   * @example 150.5
   */
  real_weight: number;
  /**
   * Status of the sale lot
   * @example "COLLECTED"
   */
  status: string;
}

export interface CreateShipmentResponseDto {
  /**
   * Unique identifier for the shipment
   * @example "cm3q8j9k0000114txhqz0shipment"
   */
  id: string;
  /**
   * Human-readable shipment identifier
   * @example "SH-2024-001"
   */
  shipment_id: string;
  /**
   * Factory ID where the shipment will be delivered
   * @example "cm3q8j9k0000114txhqz0factory"
   */
  factory_id: string;
  /**
   * Factory name
   * @example "Premium Coffee Processing Ltd."
   */
  factory_name: string;
  /**
   * Scheduled ship date
   * @format date-time
   * @example "2024-01-25T10:00:00.000Z"
   */
  ship_date?: string;
  /**
   * Destination details for delivery
   * @example "Factory Processing Center - Building A"
   */
  destination?: string;
  /**
   * Truck identifier for shipment transportation
   * @example "TRK-001-ABC"
   */
  truck_id?: string;
  /**
   * Additional notes for the shipment
   * @example "Handle with care - premium quality beans"
   */
  notes?: string;
  /**
   * Status of the shipment
   * @example "PREPARING"
   */
  status: string;
  /**
   * Total weight of all sale lots in kg
   * @example 301
   */
  total_weight: number;
  /**
   * Total number of bags in the shipment
   * @example 150
   */
  total_bags?: number;
  /** Sale lots included in the shipment */
  sale_lots: ShipmentSaleLotDto[];
  /**
   * ID of the collector who created the shipment
   * @example "collector123"
   */
  created_by: string;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  created_at: string;
  /**
   * ID of the user who last updated the shipment
   * @example "collector123"
   */
  updated_by: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  updated_at: string;
}

export interface ShipShipmentDto {
  /**
   * Optional truck identifier for shipment transportation
   * @example "TRK-001-ABC"
   */
  truck_id?: string;
  /**
   * Optional total number of bags in the shipment
   * @example 150
   */
  total_bags?: number;
  /**
   * Optional notes about shipment dispatch
   * @example "Departed warehouse at 3PM, ETA tomorrow morning"
   */
  notes?: string;
}

export interface ShipShipmentResponseDto {
  /**
   * Shipment ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Updated status
   * @example "IN_TRANSIT"
   */
  status: string;
  /**
   * Ship date and time
   * @format date-time
   * @example "2024-01-20T15:00:00.000Z"
   */
  ship_date: string;
  /**
   * Update timestamp
   * @format date-time
   * @example "2024-01-20T15:00:00.000Z"
   */
  updated_at: string;
}

export interface UpdateTruckIdDto {
  /**
   * Truck identifier for shipment transportation
   * @example "TRK-001-ABC"
   */
  truck_id: string;
}

export interface UpdateTruckIdResponseDto {
  /**
   * Shipment ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Updated truck identifier
   * @example "TRK-001-ABC"
   */
  truck_id: string;
  /**
   * Update timestamp
   * @format date-time
   * @example "2024-01-20T15:00:00.000Z"
   */
  updated_at: string;
}

export interface CollectorShipmentStatisticsDto {
  /**
   * Total number of shipments ready for dispatch
   * @example 5
   */
  total_shipments_ready: number;
  /**
   * Total weight of all shipments ready for dispatch (in kg)
   * @example 450.25
   */
  total_weight_shipments_ready: number;
  /**
   * Total number of shipments in transit to factory
   * @example 3
   */
  total_shipments_in_transit: number;
  /**
   * Total weight of all shipments in transit to factory (in kg)
   * @example 320.75
   */
  total_weight_shipments_in_transit: number;
  /**
   * Total number of shipments that have been delivered to factory
   * @example 8
   */
  total_shipments_delivered: number;
  /**
   * Total weight of all shipments that have been delivered to factory (in kg)
   * @example 720.5
   */
  total_weight_shipments_delivered: number;
}

export interface CollectorShipmentStatisticsResponseDto {
  /**
   * Indicates if the request was successful
   * @example true
   */
  success: boolean;
  /**
   * Response message
   * @example "Shipment statistics retrieved successfully"
   */
  message: string;
  /** Collector shipment statistics data */
  data: CollectorShipmentStatisticsDto;
}

export interface ShipmentFarmDto {
  /**
   * Farm ID
   * @example "cm3q8j9k0000114txhqz0farm"
   */
  id: string;
  /**
   * Farm identifier
   * @example "F-2024-001"
   */
  fid: string;
  /**
   * Farm address
   * @example "123 Coffee Farm Road, Province, Country"
   */
  address: string;
  /** Province information */
  province?: FarmProvinceDto;
  /** Farm areas with sizes and units */
  farm_areas: FarmAreaDto[];
  /** Farm boundary points (coordinates) */
  farm_points: FarmPointDto[];
  /** Farm certificates */
  farm_certificates: FarmCertificateDto[];
  /** Current year production data */
  current_year_production: FarmProductionDto[];
  /**
   * Total area of all farm areas
   * @example 4.3
   */
  total_area: number;
  /**
   * Total current year production volume
   * @example 1500.5
   */
  total_current_year_production: number;
  /**
   * Total weight from this farm in this shipment (kg)
   * @example 1250.5
   */
  total_weight: number;
  /**
   * Total number of bags from this farm in this shipment
   * @example 25
   */
  total_bags: number;
  /**
   * Number of sale lots from this farm in this shipment
   * @example 2
   */
  sale_lot_count: number;
  /**
   * List of sale lot IDs from this farm in this shipment
   * @example ["SL-2024-001","SL-2024-002"]
   */
  sale_lot_ids: string[];
}

export interface ShipmentFarmsResponseDto {
  /**
   * Shipment ID
   * @example "cm3q8j9k0000114txhqz0shipment"
   */
  shipment_id: string;
  /**
   * Human-readable shipment identifier
   * @example "SH-2024-001"
   */
  shipment_code: string;
  /**
   * Total number of unique farms in this shipment
   * @example 3
   */
  total_farms: number;
  /** List of farms in the shipment */
  farms: ShipmentFarmDto[];
}

export interface CollectorFactoryListDto {
  /**
   * Factory ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  factory_id: string;
  /**
   * Factory name
   * @example "Green Coffee Processing Co."
   */
  factory_name: string;
  /**
   * Factory phone number
   * @example "+1234567890"
   */
  phone?: string;
  /**
   * Date when factory was created
   * @format date-time
   * @example "2024-01-15T10:30:00Z"
   */
  created_at: string;
  /**
   * Date when factory was last updated
   * @format date-time
   * @example "2024-01-15T10:30:00Z"
   */
  updated_at: string;
}

export interface PaginatedCollectorFactoryResponseDto {
  /**
   * Request success status
   * @example true
   */
  success: boolean;
  /**
   * Response message
   * @example "Factories retrieved successfully"
   */
  message: string;
  /** List of all factories in the system */
  data: CollectorFactoryListDto[];
  /** Pagination metadata */
  meta: Meta;
}

export interface CollectorFactoryDetailDto {
  /**
   * Factory ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  factory_id: string;
  /**
   * Factory name
   * @example "Green Coffee Processing Co."
   */
  factory_name: string;
  /**
   * Factory phone number
   * @example "+1234567890"
   */
  phone?: string;
  /**
   * Date when factory was created
   * @format date-time
   * @example "2024-01-15T10:30:00Z"
   */
  created_at: string;
  /**
   * Date when factory was last updated
   * @format date-time
   * @example "2024-01-15T10:30:00Z"
   */
  updated_at: string;
  /**
   * User who created the factory
   * @example "user123"
   */
  created_by?: string;
  /**
   * User who last updated the factory
   * @example "user456"
   */
  updated_by?: string;
}

export interface CollectorFactoryDetailResponseDto {
  /**
   * Request success status
   * @example true
   */
  success: boolean;
  /**
   * Response message
   * @example "Factory details retrieved successfully"
   */
  message: string;
  /** Factory details */
  data: CollectorFactoryDetailDto;
}

export interface CreateCollectorUserDto {
  /**
   * Collector user username
   * @example "collector_john"
   */
  username: string;
  /**
   * Collector user password
   * @minLength 8
   * @example "password123"
   */
  password: string;
  /**
   * Collector user role
   * @example "COLLECTOR_STAFF"
   */
  role: 'COLLECTOR_ADMIN' | 'COLLECTOR_STAFF';
}

export interface CollectorUserResponseDto {
  /** Collector user ID */
  id: string;
  /** Collector user username */
  username: string;
  /** Collector user role */
  role: 'COLLECTOR_ADMIN' | 'COLLECTOR_STAFF';
  /** Collector organization ID that this user belongs to */
  collector_id: string;
  /** Whether the collector user is active */
  is_active: boolean;
  /**
   * Collector user creation timestamp
   * @format date-time
   */
  created_at: string;
  /**
   * Collector user last update timestamp
   * @format date-time
   */
  updated_at: string;
}

export interface CollectorUserPaginatedResponseDto {
  data: CollectorUserResponseDto[];
  meta: Meta;
}

export interface UpdateCollectorUserDto {
  /**
   * Collector user username
   * @example "collector_john"
   */
  username?: string;
  /**
   * Collector user password
   * @minLength 8
   * @example "password123"
   */
  password?: string;
  /**
   * Collector user role
   * @example "COLLECTOR_STAFF"
   */
  role?: 'COLLECTOR_ADMIN' | 'COLLECTOR_STAFF';
  /**
   * Whether the collector user is active
   * @example true
   */
  is_active?: boolean;
}

export interface FarmStatsDto {
  /**
   * Total number of farms
   * @example 40
   */
  total_farms: number;
  /**
   * Change in total farms compared to previous day
   * @example 2
   */
  total_farms_change: number;
  /**
   * Number of EUDR compliant farms
   * @example 27
   */
  eudr_compliant_farms: number;
  /**
   * Change in EUDR compliant farms compared to previous day
   * @example 11
   */
  eudr_compliant_change: number;
  /**
   * Total area in hectares
   * @example 63
   */
  total_area: number;
  /**
   * Change in total area compared to previous day
   * @example 15
   */
  total_area_change: number;
  /**
   * Contractual volume in tons
   * @example 175
   */
  contractual_volume: number;
  /**
   * Change in contractual volume compared to previous day
   * @example 25
   */
  contractual_volume_change: number;
}

export interface LotTrackingStatsDto {
  /**
   * Number of collectors
   * @example 18
   */
  number_of_collectors: number;
  /**
   * Change in number of collectors compared to previous day
   * @example 1
   */
  collectors_change: number;
  /**
   * Weight needing to be collected in tons
   * @example 3.7
   */
  need_to_collect_weight: number;
  /**
   * Change in weight needing collection compared to previous day
   * @example 0.5
   */
  need_to_collect_change: number;
  /**
   * Weight in transit to factory in tons
   * @example 2.8
   */
  in_transit_weight: number;
  /**
   * Change in in-transit weight compared to previous day
   * @example 0.3
   */
  in_transit_change: number;
  /**
   * Total weight of all sale lots in tons
   * @example 50.2
   */
  total_sale_lot_weight: number;
}

export interface ProductionStatsDto {
  /**
   * Total weight received in tons
   * @example 680
   */
  received_weight: number;
  /**
   * Change in received weight compared to previous day
   * @example 10
   */
  received_change: number;
  /**
   * Total weight processed in tons
   * @example 620
   */
  processed_weight: number;
  /**
   * Change in processed weight compared to previous day
   * @example 10
   */
  processed_change: number;
  /**
   * Total weight shipped in tons
   * @example 580
   */
  shipped_weight: number;
  /**
   * Change in shipped weight compared to previous day
   * @example 10
   */
  shipped_change: number;
}

export interface InventoryStatsDto {
  /**
   * Intake lot weight in tons
   * @example 300
   */
  intake_lot_weight: number;
  /**
   * Change in intake lot weight compared to previous day
   * @example 5
   */
  intake_lot_change: number;
  /**
   * Intake lot percentage of total inventory
   * @example 30
   */
  intake_lot_percentage: number;
  /**
   * Processing weight in tons
   * @example 450
   */
  processing_weight: number;
  /**
   * Change in processing weight compared to previous day
   * @example 15
   */
  processing_change: number;
  /**
   * Processing percentage of total inventory
   * @example 45
   */
  processing_percentage: number;
  /**
   * Finished goods weight in tons
   * @example 250
   */
  finished_goods_weight: number;
  /**
   * Change in finished goods weight compared to previous day
   * @example -10
   */
  finished_goods_change: number;
  /**
   * Finished goods percentage of total inventory
   * @example 25
   */
  finished_goods_percentage: number;
  /**
   * Total inventory weight in tons
   * @example 1000
   */
  total_inventory_weight: number;
  /**
   * Change in total inventory weight compared to previous day
   * @example 10
   */
  total_inventory_change: number;
}

export interface DashboardStatsResponseDto {
  /** Farm information statistics */
  farm_stats: FarmStatsDto;
  /** Lot tracking and transportation statistics */
  lot_tracking: LotTrackingStatsDto;
  /** Production status statistics */
  production_stats: ProductionStatsDto;
  /** Inventory breakdown statistics */
  inventory_stats: InventoryStatsDto;
  /**
   * Date these statistics represent
   * @example "2025-11-05"
   */
  stats_date: string;
  /**
   * Last time statistics were calculated
   * @example "2025-11-05T10:30:00Z"
   */
  last_updated: string;
}

export interface MonthlyProductionDataDto {
  /**
   * Month (1-12)
   * @example 1
   */
  month: number;
  /**
   * Month name
   * @example "Jan"
   */
  month_name: string;
  /**
   * Total weight received in tons
   * @example 50
   */
  received_weight: number;
  /**
   * Total weight processed in tons
   * @example 45
   */
  processed_weight: number;
  /**
   * Total weight shipped in tons
   * @example 40
   */
  shipped_weight: number;
}

export interface MonthlyProductionResponseDto {
  /**
   * Year of the data
   * @example 2025
   */
  year: number;
  /** Monthly production data */
  data: MonthlyProductionDataDto[];
}

export interface AdminLoginDto {
  /**
   * Admin username
   * @example "admin"
   */
  username: string;
  /**
   * Admin password
   * @example "password123"
   */
  password: string;
}

export interface AdminUserDto {
  /**
   * Admin user ID
   * @example "cku12345"
   */
  id: string;
  /**
   * Admin username
   * @example "admin"
   */
  username: string;
  /**
   * Admin full name
   * @example "John Doe"
   */
  full_name?: string;
  /**
   * Admin role
   * @example "ADMIN"
   */
  role: string;
  /**
   * Admin active status
   * @example true
   */
  is_active: boolean;
}

export interface AdminLoginResponseDto {
  /**
   * JWT access token
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  access_token: string;
  /**
   * Token expiry time in seconds
   * @example 360000
   */
  expires_in: number;
  /** Admin user information */
  admin: AdminUserDto;
}

export interface AdminProfileResponseDto {
  /** Admin user profile */
  admin: AdminUserDto;
}

export interface OrganizationRolesResponseDto {
  id: string;
  name: string;
  organization_type: string;
  is_active: boolean;
}

export interface UpdateFarmTypeDto {
  /**
   * Type of farm (STANDALONE, CENTRAL, or NEARBY)
   * @example "CENTRAL"
   */
  farm_type: 'STANDALONE' | 'CENTRAL' | 'NEARBY';
}

export interface UpdateFarmTypeResponseDto {
  /**
   * Farm ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Farm FID
   * @example "F1A2B3C4"
   */
  fid: string;
  /**
   * Type of farm
   * @example "CENTRAL"
   */
  farm_type: 'STANDALONE' | 'CENTRAL' | 'NEARBY';
  /**
   * Farm address
   * @example "123 Main St"
   */
  address: string;
  /** User who last updated */
  updated_by: string;
  /**
   * Last update timestamp
   * @format date-time
   */
  updated_at: string;
}

export interface UserListItemDto {
  /**
   * Username
   * @example "john_doe"
   */
  username: string;
  /**
   * Full name of the user
   * @example "John Doe"
   */
  full_name: string;
  /**
   * Phone number
   * @example "+1234567890"
   */
  phone: string;
  /**
   * Organization type
   * @example "FARMER"
   */
  org_type: string;
  /**
   * Organization name
   * @example "Green Valley Farm"
   */
  org_name: string;
  /**
   * List of roles assigned to the user in the organization
   * @example ["FARM_ADMIN"]
   */
  org_roles: any[][];
}

export interface UsersPaginatedResponseDto {
  /** List of users */
  data: UserListItemDto[];
  /** Pagination metadata */
  meta: Meta;
}

export interface CreateUserDto {
  /**
   * Username for the new user
   * @example "newuser123"
   */
  username: string;
  /**
   * Password for the new user
   * @example "SecurePassword123!"
   */
  password: string;
  /**
   * Full name of the user
   * @example "John Doe"
   */
  full_name: string;
  /**
   * Phone number of the user
   * @example "+1234567890"
   */
  phone: string;
  /**
   * Organization ID to assign the user to
   * @example "org_123456"
   */
  organization_id: string;
  /**
   * Role ID to assign to the user
   * @example "role_123456"
   */
  role_id: string;
}

export interface UserDto {
  /**
   * User ID
   * @example "user_123456"
   */
  id: string;
  /**
   * Email address of the user
   * @example "user@example.com"
   */
  email: string;
  /**
   * Full name of the user
   * @example "John Doe"
   */
  full_name: string;
  /**
   * User role
   * @example "FARMER"
   */
  role: string;
  /**
   * Phone number of the user
   * @example "+1234567890"
   */
  phone: string;
  /**
   * Verification status
   * @example false
   */
  is_verified: boolean;
  /**
   * Organization ID
   * @example "org_123456"
   */
  organization_id: string;
  /**
   * Organization name
   * @example "Example Farm"
   */
  organization_name: string;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2023-01-01T00:00:00.000Z"
   */
  created_at: string;
}

export interface AdminUserResponseDto {
  /** Created user */
  user: UserDto;
}

export interface CreateOrganizationDto {
  /**
   * Unique display ID for the organization
   * @example "ORG001"
   */
  display_id?: string;
  /**
   * Name of the organization
   * @example "Example Organization"
   */
  name: string;
  /**
   * Address of the organization
   * @example "123 Main St"
   */
  address?: string;
  /**
   * City of the organization
   * @example "New York"
   */
  city?: string;
  /**
   * Tax code of the organization
   * @example "123456789"
   */
  tax_code?: string;
  /**
   * Phone number of the organization
   * @example "+1234567890"
   */
  phone?: string;
  /**
   * Type of the organization
   * @example "FACTORY"
   */
  type: 'FARMER' | 'COLLECTOR' | 'FACTORY' | 'EXPORTER' | 'IMPORTER';
  /**
   * Active status of the organization
   * @default true
   * @example true
   */
  is_active?: boolean;
}

export interface AdminOrganizationResponseDto {
  /**
   * Organization ID
   * @example "cku12345"
   */
  id: string;
  /**
   * Unique display ID for the organization
   * @example "ORG001"
   */
  display_id: string;
  /**
   * Name of the organization
   * @example "Example Organization"
   */
  name: string;
  /**
   * Address of the organization
   * @example "123 Main St"
   */
  address?: string;
  /**
   * City of the organization
   * @example "New York"
   */
  city?: string;
  /**
   * Tax code of the organization
   * @example "123456789"
   */
  tax_code?: string;
  /**
   * Phone number of the organization
   * @example "1234567890"
   */
  phone?: string;
  /**
   * Type of the organization
   * @example "FACTORY"
   */
  type: 'FARMER' | 'COLLECTOR' | 'FACTORY' | 'EXPORTER' | 'IMPORTER';
  /**
   * Active status of the organization
   * @example true
   */
  is_active: boolean;
}

export interface OrganizationResponseDto {
  /** Created organization */
  organization: AdminOrganizationResponseDto;
}

export interface AdminOrganizationListItemDto {
  /**
   * Organization ID
   * @example "cm3q8j9k0000114txhqz0abcd"
   */
  id: string;
  /**
   * Organization name
   * @example "Green Valley Farm"
   */
  org_name: string;
  /**
   * Organization type
   * @example "FARMER"
   */
  org_type: string;
  /**
   * Tax code
   * @example "123456789"
   */
  tax_code: string;
  /**
   * City of the organization
   * @example "New York"
   */
  city: string;
  /**
   * Active status of the organization
   * @example true
   */
  is_active: boolean;
}

export interface AdminOrganizationsPaginatedResponseDto {
  /** List of organizations */
  data: AdminOrganizationListItemDto[];
  /** Pagination metadata */
  meta: Meta;
}

export interface AdminOrganizationUserListItemDto {
  /**
   * User ID
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  id: string;
  /**
   * Username
   * @example "john_doe"
   */
  username: string;
  /**
   * Full name of the user
   * @example "John Doe"
   */
  full_name: string;
  /**
   * Phone number
   * @example "+1234567890"
   */
  phone: string;
  /**
   * Role type of the user within the organization
   * @example "FACTORY_ADMIN"
   */
  role: string;
  /**
   * Whether the user is active
   * @example true
   */
  is_active: boolean;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2023-01-01T00:00:00.000Z"
   */
  created_at: string;
  /**
   * Last update timestamp
   * @format date-time
   * @example "2023-01-02T00:00:00.000Z"
   */
  updated_at: string;
}

export interface AdminOrganizationUsersPaginatedResponseDto {
  /** List of users belonging to the organization */
  data: AdminOrganizationUserListItemDto[];
  /** Pagination metadata */
  meta: Meta;
}

export interface AdminOrganizationUserResponseDto {
  /** Organization user details */
  user: AdminOrganizationUserListItemDto;
}

export interface UpdateOrganizationDto {
  /**
   * Name of the organization
   * @example "Updated Organization Name"
   */
  name?: string;
  /**
   * Type of the organization
   * @example "FACTORY"
   */
  type?: 'FARMER' | 'COLLECTOR' | 'FACTORY' | 'EXPORTER' | 'IMPORTER';
  /**
   * Address of the organization
   * @example "456 Updated St"
   */
  address?: string;
  /**
   * City of the organization
   * @example "Updated City"
   */
  city?: string;
  /**
   * Tax code of the organization
   * @example "987654321"
   */
  tax_code?: string;
  /**
   * Active status of the organization
   * @example true
   */
  is_active?: boolean;
}

export interface MigratePackageItemFarmStatsDto {
  /**
   * Total number of package items
   * @example 1000
   */
  total_package_items: number;
  /**
   * Number of package items with farm_id
   * @example 950
   */
  package_items_with_farm_id: number;
  /**
   * Number of package items that already have package_item_farm records
   * @example 800
   */
  existing_package_item_farm_records: number;
  /**
   * Number of new package_item_farm records created
   * @example 150
   */
  new_records_created: number;
  /**
   * Number of package items without farm_id (skipped)
   * @example 50
   */
  skipped_items_without_farm: number;
  /**
   * List of package_item_ids that were processed
   * @example ["pkg_id_1","pkg_id_2","pkg_id_3"]
   */
  processed_package_item_ids: string[];
  /**
   * When the migration was processed
   * @format date-time
   * @example "2026-02-27T12:00:00.000Z"
   */
  processed_at: string;
}

export interface MigratePackageItemFarmResponseDto {
  /**
   * Whether the migration was successful
   * @example true
   */
  success: boolean;
  /**
   * Message describing the result
   * @example "Successfully migrated 150 package_item_farm records"
   */
  message: string;
  /** Detailed migration statistics */
  stats: MigratePackageItemFarmStatsDto;
  /**
   * Duration of the migration in milliseconds
   * @example 2500
   */
  duration_ms: number;
}

export interface OrganizationDetailResponseDto {
  /**
   * Organization ID
   * @example "uuid-string-here"
   */
  id: string;
  /**
   * Organization display ID
   * @example "example-farm"
   */
  display_id: string;
  /**
   * Organization name
   * @example "Example Farm"
   */
  name: string;
  /**
   * Whether the organization is active
   * @example true
   */
  is_active: boolean;
  /**
   * Organization address
   * @example "123 Farm Road"
   */
  address: string | null;
  /**
   * Organization city
   * @example "Farm City"
   */
  city: string | null;
  /**
   * Organization tax code
   * @example "1234567890"
   */
  tax_code: string | null;
  /**
   * Organization phone number
   * @example "+1234567890"
   */
  phone: string | null;
  /**
   * Organization type
   * @example "FARMER"
   */
  type: 'FARMER' | 'COLLECTOR' | 'FACTORY' | 'EXPORTER' | 'IMPORTER';
}

export interface OrganizationRoleDto {
  /**
   * Role ID
   * @example "uuid-string-here"
   */
  id: string;
  /**
   * Role name
   * @example "FARM_MANAGER"
   */
  name: string;
  /**
   * Organization type this role belongs to
   * @example "FARMER"
   */
  organization_type: 'FARMER' | 'COLLECTOR' | 'FACTORY' | 'EXPORTER' | 'IMPORTER';
  /**
   * Role description
   * @example "Farm manager role"
   */
  description: string | null;
}

export interface CreateOrganizationUserDto {
  /** Username */
  username: string;
  /** Password */
  password: string;
  /** Role ID */
  role_id: string;
}

export interface CreateOrganizationUserResponseDto {
  /**
   * User ID
   * @example "uuid-string-here"
   */
  user_id: string;
  /**
   * User email address
   * @example "user@example.com"
   */
  email: string;
  /** Organization details */
  organization: {
    /**
     * Organization name
     * @example "Example Farm"
     */
    name?: string;
    /**
     * Organization display ID
     * @example "example-farm"
     */
    display_id?: string;
    /**
     * Organization type
     * @example "FARM"
     */
    type?: string;
  };
  /** Role details */
  role: {
    /**
     * Role ID
     * @example "role-uuid-here"
     */
    id?: string;
    /**
     * Role name
     * @example "FARM_MANAGER"
     */
    name?: string;
  };
}

export interface CreateImporterUserDto {
  /**
   * Importer user username
   * @example "importer_john"
   */
  username: string;
  /**
   * Importer user password
   * @minLength 8
   * @example "password123"
   */
  password: string;
  /**
   * Importer user role
   * @example "IMPORTER_USER"
   */
  role: 'IMPORTER_ADMIN' | 'IMPORTER_USER';
}

export interface ImporterUserResponseDto {
  /** Importer user ID */
  id: string;
  /** Importer user username */
  username: string;
  /** Importer user role */
  role: 'IMPORTER_ADMIN' | 'IMPORTER_USER';
  /** Importer organization ID that this user belongs to */
  importer_id: string;
  /** Whether the importer user is active */
  is_active: boolean;
  /**
   * Importer user creation timestamp
   * @format date-time
   */
  created_at: string;
  /**
   * Importer user last update timestamp
   * @format date-time
   */
  updated_at: string;
}

export interface ImporterUserPaginatedResponseDto {
  data: ImporterUserResponseDto[];
  meta: Meta;
}

export interface UpdateImporterUserDto {
  /**
   * Importer user username
   * @example "importer_john"
   */
  username?: string;
  /**
   * Importer user password
   * @minLength 8
   * @example "password123"
   */
  password?: string;
  /**
   * Importer user role
   * @example "IMPORTER_USER"
   */
  role?: 'IMPORTER_ADMIN' | 'IMPORTER_USER';
  /**
   * Whether the importer user is active
   * @example true
   */
  is_active?: boolean;
}

export interface CreateExporterUserDto {
  /**
   * Exporter user username
   * @example "exporter_john"
   */
  username: string;
  /**
   * Exporter user password
   * @minLength 8
   * @example "password123"
   */
  password: string;
  /**
   * Exporter user role
   * @example "EXPORTER_USER"
   */
  role: 'EXPORTER_ADMIN' | 'EXPORTER_USER';
}

export interface ExporterUserResponseDto {
  /** Exporter user ID */
  id: string;
  /** Exporter user username */
  username: string;
  /** Exporter user role */
  role: 'EXPORTER_ADMIN' | 'EXPORTER_USER';
  /** Exporter organization ID that this user belongs to */
  exporter_id: string;
  /** Whether the exporter user is active */
  is_active: boolean;
  /**
   * Exporter user creation timestamp
   * @format date-time
   */
  created_at: string;
  /**
   * Exporter user last update timestamp
   * @format date-time
   */
  updated_at: string;
}

export interface ExporterUserPaginatedResponseDto {
  data: ExporterUserResponseDto[];
  meta: Meta;
}

export interface UpdateExporterUserDto {
  /**
   * Exporter user username
   * @example "exporter_john"
   */
  username?: string;
  /**
   * Exporter user password
   * @minLength 8
   * @example "password123"
   */
  password?: string;
  /**
   * Exporter user role
   * @example "EXPORTER_USER"
   */
  role?: 'EXPORTER_ADMIN' | 'EXPORTER_USER';
  /**
   * Whether the exporter user is active
   * @example true
   */
  is_active?: boolean;
}

export interface MigrateGeneratedIdsResponseDto {
  /**
   * Total number of generated IDs created
   * @example 150
   */
  totalCreated: number;
  /**
   * Number of bin IDs migrated
   * @example 30
   */
  binsCreated: number;
  /**
   * Number of pallet IDs migrated
   * @example 25
   */
  palletsCreated: number;
  /**
   * Number of bin package IDs migrated
   * @example 40
   */
  binPackagesCreated: number;
  /**
   * Number of package item IDs migrated
   * @example 35
   */
  packageItemsCreated: number;
  /**
   * Number of export lot IDs migrated
   * @example 20
   */
  exportLotsCreated: number;
  /**
   * Number of IDs skipped (already exist)
   * @example 5
   */
  skipped: number;
}

export interface GeneratedIdDto {
  /**
   * Unique identifier
   * @example "cuid123abc"
   */
  id: string;
  /**
   * The generated code
   * @example "BIN-2026-ABC12345"
   */
  code: string;
  /**
   * Type of the generated ID
   * @example "BIN"
   */
  type: 'EXPORT_LOT' | 'BIN' | 'PALLET' | 'BIN_PACKAGE' | 'PACKAGE_ITEM';
  /**
   * Created by user ID
   * @example "user123"
   */
  created_by: string;
  /**
   * Creation timestamp
   * @format date-time
   * @example "2026-01-14T12:00:00.000Z"
   */
  created_at: string;
}

export interface GeneratedIdPaginatedResponseDto {
  /** Array of generated IDs */
  data: GeneratedIdDto[];
  /** Pagination metadata */
  meta: Meta;
}

export interface GeneratedIdStatsDto {
  /**
   * Total number of generated IDs
   * @example 500
   */
  total: number;
  /**
   * Number of BIN generated IDs
   * @example 100
   */
  bins: number;
  /**
   * Number of PALLET generated IDs
   * @example 80
   */
  pallets: number;
  /**
   * Number of BIN_PACKAGE generated IDs
   * @example 120
   */
  binPackages: number;
  /**
   * Number of PACKAGE_ITEM generated IDs
   * @example 150
   */
  packageItems: number;
  /**
   * Number of EXPORT_LOT generated IDs
   * @example 50
   */
  exportLots: number;
}

export interface GeneratedIdFarmPointDto {
  /**
   * Unique identifier of the farm point
   * @example "cm3q8j9k0000114txhqz0point"
   */
  id: string;
  /**
   * Latitude coordinate
   * @example -7.2575
   */
  latitude: number;
  /**
   * Longitude coordinate
   * @example 112.7521
   */
  longitude: number;
  /**
   * Timestamp when the point was created
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  created_at: string;
}

export interface GeneratedIdCertificateTypeDto {
  /**
   * Unique identifier for the certificate type
   * @example "cm3q8j9k0000114txhqz0certtype"
   */
  id: string;
  /**
   * Name of the certificate type
   * @example "Organic Certification"
   */
  name: string;
}

export interface GeneratedIdFarmCertificateDto {
  /**
   * Unique identifier of the farm certificate association
   * @example "cm3q8j9k0000114txhqz0cert"
   */
  id: string;
  /** Certificate type information */
  certificate_type: GeneratedIdCertificateTypeDto;
  /**
   * Timestamp when the certificate was added to the farm
   * @format date-time
   * @example "2024-01-15T10:30:00.000Z"
   */
  created_at: string;
}

export interface GeneratedIdFarmDataDto {
  /**
   * Unique identifier of the farm
   * @example "cm3q8j9k0000114txhqz0farm"
   */
  id: string;
  /**
   * Farm identifier (fid)
   * @example "FARM-001"
   */
  fid?: string;
  /**
   * Farm address
   * @example "123 Farm Road, Rural District"
   */
  address: string;
  /** Farm boundary points */
  farm_points: GeneratedIdFarmPointDto[];
  /** Farm certificates */
  farm_certificates: GeneratedIdFarmCertificateDto[];
}

export interface GeneratedIdFarmInfoResponseDto {
  /** The generated ID record */
  generated_id: GeneratedIdDto;
  /** List of farms associated with the generated ID */
  farms: GeneratedIdFarmDataDto[];
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

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = 'http://localhost:3000';
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
 * @title Traceability API
 * @version 1.0.0
 * @baseUrl http://localhost:3000
 * @contact
 *
 * API documentation for traceability-backend
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  backend = {
    /**
     * No description
     *
     * @tags public
     * @name HealthControllerCheck
     * @request GET:/backend/health
     */
    healthControllerCheck: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/backend/health`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description Retrieve paginated relationship to owner data based on query filters.
     *
     * @tags Static data
     * @name StaticDataControllerGetRelationshipToOwner
     * @summary Get relationship to owner
     * @request GET:/backend/static-data/relationship-to-owner
     */
    staticDataControllerGetRelationshipToOwner: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /** Search by relation name */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedRelationshipToOwnerResponseDto, any>({
        path: `/backend/static-data/relationship-to-owner`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated variety data based on query filters.
     *
     * @tags Static data
     * @name StaticDataControllerGetVariety
     * @summary Get variety
     * @request GET:/backend/static-data/variety
     */
    staticDataControllerGetVariety: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /** Search by variety name */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedVarietyResponseDto, any>({
        path: `/backend/static-data/variety`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated certificate type data based on query filters.
     *
     * @tags Static data
     * @name StaticDataControllerGetCertificateType
     * @summary Get certificate type
     * @request GET:/backend/static-data/certificate-type
     */
    staticDataControllerGetCertificateType: (
      query?: {
        /**
         * Search term for certificate type name
         * @example "EUDR"
         */
        search?: string;
        /** Number of records to skip */
        skip?: Object;
        /** Maximum number of records to return */
        limit?: Object;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedCertificateTypeResponseDto, any>({
        path: `/backend/static-data/certificate-type`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all available cultivation activities with optional pagination and search.
     *
     * @tags Static data
     * @name StaticDataControllerGetCultivationActivity
     * @summary Get cultivation activities
     * @request GET:/backend/static-data/cultivation-activity
     */
    staticDataControllerGetCultivationActivity: (
      query?: {
        /**
         * Search term for cultivation activity name
         * @example "Seeding"
         */
        search?: string;
        /** Number of records to skip */
        skip?: Object;
        /** Maximum number of records to return */
        limit?: Object;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedCultivationActivityResponseDto, any>({
        path: `/backend/static-data/cultivation-activity`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated country data based on query filters.
     *
     * @tags Static data
     * @name StaticDataControllerGetCountry
     * @summary Get countries
     * @request GET:/backend/static-data/country
     */
    staticDataControllerGetCountry: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Search by country code
         * @example "VN"
         */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedCountryResponseDto, any>({
        path: `/backend/static-data/country`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated province data based on query filters.
     *
     * @tags Static data
     * @name StaticDataControllerGetProvince
     * @summary Get provinces
     * @request GET:/backend/static-data/province
     */
    staticDataControllerGetProvince: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Search term for province name
         * @example "Ho Chi Minh"
         */
        search?: string;
        /**
         * Country ID to filter provinces by country
         * @example "vietnam_country_id"
         */
        country_id?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedProvinceResponseDto, any>({
        path: `/backend/static-data/province`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated ethnicity data based on query filters.
     *
     * @tags Static data
     * @name StaticDataControllerGetEthnicity
     * @summary Get ethnicities
     * @request GET:/backend/static-data/ethnicity
     */
    staticDataControllerGetEthnicity: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /** Search by ethnicity name */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedEthnicityResponseDto, any>({
        path: `/backend/static-data/ethnicity`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Bulk create farms from pre-loaded farmer data. This endpoint simulates a factory creating multiple farms at once. Only users with FACTORY role can use this endpoint.
     *
     * @tags Farm Migration
     * @name MigrateFarmControllerMigrateFarmDataV1
     * @summary Migrate farm data from CSV/JSON file
     * @request POST:/backend/v1/farm/migrate
     */
    migrateFarmControllerMigrateFarmDataV1: (
      data: MigrateFarmRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<MigrateFarmResponseDto, void>({
        path: `/backend/v1/farm/migrate`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Bulk create farms from CSV farmer data. Each unique farmer (by citizen_id) will have only 1 farm created using their first land plot. Supports custom factory display_id. Only users with FACTORY role can use this endpoint.
     *
     * @tags Farm Migration
     * @name MigrateFarmControllerMigrateUniqueFarmDataV1
     * @summary Migrate unique farms from CSV file
     * @request POST:/backend/v1/farm/migrate/unique
     */
    migrateFarmControllerMigrateUniqueFarmDataV1: (
      data: MigrateFarmRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<MigrateUniqueFarmResponseDto, void>({
        path: `/backend/v1/farm/migrate/unique`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Soft delete farms created from CSV for a specific organization. Requires admin authentication. This will soft delete all related entities including farm plants, products, cultivation logs, certificates, areas, points, owners, and farm-organization relationships.
     *
     * @tags Farm Migration
     * @name MigrateFarmControllerDeleteFarmsFromCsvV1
     * @summary Delete farms created by generateFarmsFromCsv. REQUIRES ADMIN AUTHENTICATION
     * @request DELETE:/backend/v1/farm/migrate/delete-from-csv
     * @secure
     */
    migrateFarmControllerDeleteFarmsFromCsvV1: (
      data: DeleteFarmRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<DeleteFarmsFromCsvResponseDto, void>({
        path: `/backend/v1/farm/migrate/delete-from-csv`,
        method: 'DELETE',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Upload a CSV file and generate farms for a specific organization. Requires factory user authentication. Each unique farmer (by citizen_id) will have only 1 farm created using their first land plot.
     *
     * @tags Farm Migration
     * @name MigrateFarmControllerGenerateFarmsFromCsvV1
     * @summary Generate farms from uploaded CSV file. REQUIRES FACTORY USER AUTHENTICATION
     * @request POST:/backend/v1/farm/import/from-csv
     * @secure
     */
    migrateFarmControllerGenerateFarmsFromCsvV1: (
      data: GenerateFarmsFromCsvRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<GenerateFarmsFromCsvResponseDto, void>({
        path: `/backend/v1/farm/import/from-csv`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description Attaches a nearby farm to a central farm. The central farm must have farm_type=CENTRAL. Nearby farms should be STANDALONE or NEARBY type.
     *
     * @tags Farm - Nearby Farm Management
     * @name NearbyFarmControllerAddNearbyFarm
     * @summary Add a nearby farm to a central farm
     * @request POST:/backend/v1/farm/{id}/nearby-farms
     * @secure
     */
    nearbyFarmControllerAddNearbyFarm: (
      id: string,
      data: CreateNearbyFarmDto,
      params: RequestParams = {}
    ) =>
      this.request<AddNearbyFarmResponseDto, void>({
        path: `/backend/v1/farm/${id}/nearby-farms`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns a paginated list of nearby farms attached to the specified central farm.
     *
     * @tags Farm - Nearby Farm Management
     * @name NearbyFarmControllerGetNearbyFarms
     * @summary Get all nearby farms for a central farm
     * @request GET:/backend/v1/farm/{id}/nearby-farms
     * @secure
     */
    nearbyFarmControllerGetNearbyFarms: (
      id: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /** Filter by central farm ID */
        central_farm_id?: string;
        /** Filter by nearby farm ID */
        nearby_farm_id?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<NearbyFarmPaginatedResponseDto, void>({
        path: `/backend/v1/farm/${id}/nearby-farms`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns the central farm that this nearby farm is attached to.
     *
     * @tags Farm - Nearby Farm Management
     * @name NearbyFarmControllerGetCentralFarm
     * @summary Get the central farm for a nearby farm
     * @request GET:/backend/v1/farm/{id}/central-farm
     * @secure
     */
    nearbyFarmControllerGetCentralFarm: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/backend/v1/farm/${id}/central-farm`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description Detaches a nearby farm from its central farm. This is a soft delete.
     *
     * @tags Farm - Nearby Farm Management
     * @name NearbyFarmControllerRemoveNearbyFarm
     * @summary Remove a nearby farm from a central farm
     * @request DELETE:/backend/v1/farm/{id}/nearby-farms/{nearbyFarmId}
     * @secure
     */
    nearbyFarmControllerRemoveNearbyFarm: (
      id: string,
      nearbyFarmId: string,
      params: RequestParams = {}
    ) =>
      this.request<void, void>({
        path: `/backend/v1/farm/${id}/nearby-farms/${nearbyFarmId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Analyzes forest coverage within specified boundary coordinates and returns analysis data with image keys
     *
     * @tags Forestry Analysis
     * @name ForestryAnalyzeControllerAnalyzeForestry
     * @summary Analyze forestry data for a given boundary
     * @request POST:/backend/forestry/analyze
     */
    forestryAnalyzeControllerAnalyzeForestry: (
      data: ForestryAnalysisRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<ForestryAnalysisResponseDto, void>({
        path: `/backend/forestry/analyze`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Takes a center point (latitude/longitude) and area in square meters to create a rectangle boundary, then generates a forestry transparent image showing forest coverage within that area.
     *
     * @tags Forestry Analysis
     * @name ForestryAnalyzeControllerAnalyzeForestryPointArea
     * @summary Generate forestry transparent image from center point and area
     * @request POST:/backend/forestry/analyze-point-area
     * @secure
     */
    forestryAnalyzeControllerAnalyzeForestryPointArea: (
      data: PointAreaRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<PointAreaImageResponseDto, void>({
        path: `/backend/forestry/analyze-point-area`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieves the forestry transparent image (forest areas in green, non-forest transparent) using the image key. Returns the image directly.
     *
     * @tags Forestry Analysis
     * @name ForestryAnalyzeControllerGetForestryTransparentImage
     * @summary Get forestry transparent image by key
     * @request GET:/backend/forestry/image/forestry
     */
    forestryAnalyzeControllerGetForestryTransparentImage: (
      query: {
        /**
         * Image key in lat-lng format (e.g., 21.149-105.374_21.149-105.384_21.154-105.384_21.154-105.374)
         * @example "21.149-105.374_21.149-105.384_21.154-105.384_21.154-105.374"
         */
        imageKey: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<File, void>({
        path: `/backend/forestry/image/forestry`,
        method: 'GET',
        query: query,
        format: 'blob',
        ...params,
      }),

    /**
     * @description Retrieves the polygon overlay image (forestry data with boundary polygon overlay) using the image key. Returns the image directly.
     *
     * @tags Forestry Analysis
     * @name ForestryAnalyzeControllerGetPolygonOverlayImage
     * @summary Get polygon overlay image by key
     * @request GET:/backend/forestry/image/polygon
     * @secure
     */
    forestryAnalyzeControllerGetPolygonOverlayImage: (
      query: {
        /**
         * Image key in lat-lng format (e.g., 21.149-105.374_21.149-105.384_21.154-105.384_21.154-105.374)
         * @example "21.149-105.374_21.149-105.384_21.154-105.384_21.154-105.374"
         */
        imageKey: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<File, void>({
        path: `/backend/forestry/image/polygon`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'blob',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Forestry Analysis
     * @name HealthControllerHealth
     * @request GET:/backend/forestry/health
     */
    healthControllerHealth: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/backend/forestry/health`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description Upload a document file (PDF, DOC, DOCX, XLS, XLSX, JPEG, PNG) to user's private storage
     *
     * @tags File Upload
     * @name UploadControllerUploadFile
     * @summary Upload a file
     * @request POST:/backend/upload
     * @secure
     */
    uploadControllerUploadFile: (data: FileUploadDto, params: RequestParams = {}) =>
      this.request<FileUploadResponseDto, void>({
        path: `/backend/upload`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all files uploaded by the authenticated user
     *
     * @tags File Upload
     * @name UploadControllerGetUserFiles
     * @summary Get user files
     * @request GET:/backend/upload
     * @secure
     */
    uploadControllerGetUserFiles: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /** Search by filename or description */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedUserFileResponseDto, void>({
        path: `/backend/upload`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a specific file by its ID (user can only access their own files)
     *
     * @tags File Upload
     * @name UploadControllerGetFileById
     * @summary Get file by ID
     * @request GET:/backend/upload/{id}
     * @secure
     */
    uploadControllerGetFileById: (id: string, params: RequestParams = {}) =>
      this.request<FileUploadResponseDto, void>({
        path: `/backend/upload/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Delete a file by its ID (user can only delete their own files)
     *
     * @tags File Upload
     * @name UploadControllerDeleteFile
     * @summary Delete file
     * @request DELETE:/backend/upload/{id}
     * @secure
     */
    uploadControllerDeleteFile: (id: string, params: RequestParams = {}) =>
      this.request<FileDeleteResponseDto, void>({
        path: `/backend/upload/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Generate a temporary pre-signed URL to download a file (owner only)
     *
     * @tags File Upload
     * @name UploadControllerGetDownloadUrl
     * @summary Get file download URL
     * @request GET:/backend/upload/{id}/download
     * @secure
     */
    uploadControllerGetDownloadUrl: (
      id: string,
      query?: {
        /**
         * Content disposition for browser handling
         * @default "attachment"
         */
        disposition?: 'inline' | 'attachment';
      },
      params: RequestParams = {}
    ) =>
      this.request<FileDownloadResponseDto, void>({
        path: `/backend/upload/${id}/download`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Link an uploaded file with a specific entity (e.g., farm, user, etc.)
     *
     * @tags File Upload
     * @name UploadControllerAssociateFile
     * @summary Associate file with entity
     * @request POST:/backend/upload/associate
     * @secure
     */
    uploadControllerAssociateFile: (data: CreateFileAssociationDto, params: RequestParams = {}) =>
      this.request<FileAssociationResponseDto, void>({
        path: `/backend/upload/associate`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Remove the association between a file and an entity
     *
     * @tags File Upload
     * @name UploadControllerRemoveFileAssociation
     * @summary Remove file association
     * @request DELETE:/backend/upload/association/{associationId}
     * @secure
     */
    uploadControllerRemoveFileAssociation: (associationId: string, params: RequestParams = {}) =>
      this.request<DeleteFileAssociationResponseDto, void>({
        path: `/backend/upload/association/${associationId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all files associated with a specific shipment
     *
     * @tags File Upload
     * @name UploadControllerGetShipmentFiles
     * @summary Get shipment files
     * @request GET:/backend/upload/shipment/{shipmentId}/files
     * @secure
     */
    uploadControllerGetShipmentFiles: (
      shipmentId: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /** Search by filename or description */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedShipmentFilesResponseDto, void>({
        path: `/backend/upload/shipment/${shipmentId}/files`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all files associated with a specific bin
     *
     * @tags File Upload
     * @name UploadControllerGetBinFiles
     * @summary Get bin files
     * @request GET:/backend/upload/bin/{binId}/files
     * @secure
     */
    uploadControllerGetBinFiles: (
      binId: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /** Search by filename or description */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedBinFilesResponseDto, void>({
        path: `/backend/upload/bin/${binId}/files`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all files associated with a specific sale lot
     *
     * @tags File Upload
     * @name UploadControllerGetSaleLotFiles
     * @summary Get sale lot files
     * @request GET:/backend/upload/sale-lot/{saleLotId}/files
     * @secure
     */
    uploadControllerGetSaleLotFiles: (
      saleLotId: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /** Search by filename or description */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedSaleLotFilesResponseDto, void>({
        path: `/backend/upload/sale-lot/${saleLotId}/files`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all files associated with a specific pallet
     *
     * @tags File Upload
     * @name UploadControllerGetPalletFiles
     * @summary Get pallet files
     * @request GET:/backend/upload/pallet/{palletId}/files
     * @secure
     */
    uploadControllerGetPalletFiles: (
      palletId: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /** Search by filename or description */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedPalletFilesResponseDto, void>({
        path: `/backend/upload/pallet/${palletId}/files`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all files associated with a specific export lot
     *
     * @tags File Upload
     * @name UploadControllerGetExportLotFilesV1
     * @summary Get export lot files
     * @request GET:/backend/v1/upload/export-lot/{exportLotId}/files
     * @secure
     */
    uploadControllerGetExportLotFilesV1: (
      exportLotId: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /** Search by filename or description */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedExportLotFilesResponseDto, void>({
        path: `/backend/v1/upload/export-lot/${exportLotId}/files`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all associations for a specific file
     *
     * @tags File Upload
     * @name UploadControllerGetFileAssociations
     * @summary Get file associations
     * @request GET:/backend/upload/file/{fileId}/associations
     * @secure
     */
    uploadControllerGetFileAssociations: (fileId: string, params: RequestParams = {}) =>
      this.request<FileAssociationResponseDto[], void>({
        path: `/backend/upload/file/${fileId}/associations`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a farm with all related entities (points, owner, areas, plants, products) for the authenticated farmer. Only users with FARMER role can create farms.
     *
     * @tags Farmer
     * @name FarmerControllerCreateFarmerFarmV1
     * @summary Create a comprehensive farm for farmer (Farmer role users only)
     * @request POST:/backend/v1/farmer/farm
     * @secure
     */
    farmerControllerCreateFarmerFarmV1: (data: CreateFarmerFarmDto, params: RequestParams = {}) =>
      this.request<CreateFarmerFarmResponseDto, void>({
        path: `/backend/v1/farmer/farm`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve farms owned by the authenticated farmer. Only farmers can access their own farm data.
     *
     * @tags Farmer
     * @name FarmerControllerGetFarmerFarmsV1
     * @summary Get farmer farms with pagination and filtering
     * @request GET:/backend/v1/farmer/farm
     * @secure
     */
    farmerControllerGetFarmerFarmsV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /** Search by farm ID */
        search?: string;
        /** Filter by province ID */
        province_id?: string;
        /** Filter by owner gender */
        gender?: string;
        /** Filter by owner ethnicity */
        ethnicity?: string;
        /** Filter by certificate IDs (farms must have at least one of these certificates) */
        certificate_ids?: string[];
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedFarmListDto, void>({
        path: `/backend/v1/farmer/farm`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Creates a new farm with farm_type=NEARBY and automatically attaches it to the central farm. The central farm must have farm_type=CENTRAL and belong to the farmer. The nearby farm will belong to the same farmer organization.
     *
     * @tags Farmer
     * @name FarmerControllerCreateNearbyFarmV1
     * @summary Create a new nearby farm for a central farm
     * @request POST:/backend/v1/farmer/farm/{id}/nearby-farms/create
     * @secure
     */
    farmerControllerCreateNearbyFarmV1: (
      id: string,
      data: CreateNearbyFarmRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<CreateNearbyFarmResponseDto, void>({
        path: `/backend/v1/farmer/farm/${id}/nearby-farms/create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed paginated list of nearby farms attached to a central farm owned by the farmer. Returns detailed farm information including owner, area, products, and certificates.
     *
     * @tags Farmer
     * @name FarmerControllerGetFarmerNearbyFarmsV1
     * @summary Get nearby farms list for a central farm
     * @request GET:/backend/v1/farmer/farm/{id}/nearby-farms
     * @secure
     */
    farmerControllerGetFarmerNearbyFarmsV1: (
      id: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /** Search by farm ID */
        search?: string;
        /** Filter by province ID */
        province_id?: string;
        /** Filter by owner gender */
        gender?: string;
        /** Filter by owner ethnicity */
        ethnicity?: string;
        /** Filter by certificate IDs (farms must have at least one of these certificates) */
        certificate_ids?: string[];
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedFarmListDto, void>({
        path: `/backend/v1/farmer/farm/${id}/nearby-farms`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Permanently deletes a nearby farm by soft deleting both the nearby_farm relationship and the farm record itself. The nearby farm will no longer be accessible.
     *
     * @tags Farmer
     * @name FarmerControllerRemoveFarmerNearbyFarmV1
     * @summary Remove a nearby farm from a central farm (Farmer)
     * @request DELETE:/backend/v1/farmer/farm/{id}/nearby-farms/{nearbyFarmId}
     * @secure
     */
    farmerControllerRemoveFarmerNearbyFarmV1: (
      id: string,
      nearbyFarmId: string,
      params: RequestParams = {}
    ) =>
      this.request<
        {
          /** @example "Nearby farm removed successfully" */
          message?: string;
        },
        void
      >({
        path: `/backend/v1/farmer/farm/${id}/nearby-farms/${nearbyFarmId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve comprehensive statistics for nearby farms attached to a specific central farm owned by the farmer including total nearby farms, area, contractual volume, and EUDR compliance.
     *
     * @tags Farmer
     * @name FarmerControllerGetFarmerNearbyFarmStatisticsV1
     * @summary Get farmer nearby farm statistics for a central farm
     * @request GET:/backend/v1/farmer/farm/{id}/nearby-farms/statistics
     * @secure
     */
    farmerControllerGetFarmerNearbyFarmStatisticsV1: (id: string, params: RequestParams = {}) =>
      this.request<NearbyFarmStatisticsResponseDto, void>({
        path: `/backend/v1/farmer/farm/${id}/nearby-farms/statistics`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Search for organizations by name (case-insensitive) with pagination. Accessible to farmer users.
     *
     * @tags Farmer
     * @name FarmerControllerFindOrganizationsV1
     * @summary Search organizations by name
     * @request GET:/backend/v1/farmer/farm/organizations
     * @secure
     */
    farmerControllerFindOrganizationsV1: (
      query: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Organization type to filter by
         * @example "FACTORY"
         */
        organization_type: 'FARMER' | 'COLLECTOR' | 'FACTORY' | 'EXPORTER' | 'IMPORTER';
        /**
         * Search term for organization name
         * @example "Green Coffee"
         */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedFarmerFactoryResponseDto, void>({
        path: `/backend/v1/farmer/farm/organizations`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Share a farm with a factory (Factory role users only)
     *
     * @tags Farmer
     * @name FarmerControllerShareFarmToFactoryV1
     * @summary Share a farm with a factory
     * @request POST:/backend/v1/farmer/farm/{id}/share
     * @secure
     */
    farmerControllerShareFarmToFactoryV1: (
      id: string,
      data: ShareFarmToFactoryDto,
      params: RequestParams = {}
    ) =>
      this.request<ShareFarmToFactoryResponseDto, void>({
        path: `/backend/v1/farmer/farm/${id}/share`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated list of factories that a farm has been shared with, including their names and permission levels.
     *
     * @tags Farmer
     * @name FarmerControllerFindFarmSharedFactoriesV1
     * @summary Get factories shared to a farm
     * @request GET:/backend/v1/farmer/farm/{id}/shared-factories
     * @secure
     */
    farmerControllerFindFarmSharedFactoriesV1: (
      id: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedFarmerSharedFactoriesResponseDto, void>({
        path: `/backend/v1/farmer/farm/${id}/shared-factories`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a copy of an existing farm with its owner data. Only farms owned by the farmer can be copied.
     *
     * @tags Farmer
     * @name FarmerControllerCopyFarmV1
     * @summary Copy a farm
     * @request POST:/backend/v1/farmer/farm/{id}/copy
     * @secure
     */
    farmerControllerCopyFarmV1: (id: string, params: RequestParams = {}) =>
      this.request<CopyFarmDataResponseDto, void>({
        path: `/backend/v1/farmer/farm/${id}/copy`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve comprehensive statistics for farms owned by the authenticated farmer including total farms, area, contractual volume, and EUDR compliance.
     *
     * @tags Farmer
     * @name FarmerControllerGetFarmerFarmStatisticsV1
     * @summary Get farmer farm statistics
     * @request GET:/backend/v1/farmer/farm/statistics
     * @secure
     */
    farmerControllerGetFarmerFarmStatisticsV1: (params: RequestParams = {}) =>
      this.request<FarmStatisticsResponseDto, void>({
        path: `/backend/v1/farmer/farm/statistics`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed information about a specific farm owned by the authenticated farmer.
     *
     * @tags Farmer
     * @name FarmerControllerGetFarmerFarmV1
     * @summary Get farmer farm details
     * @request GET:/backend/v1/farmer/farm/{id}
     * @secure
     */
    farmerControllerGetFarmerFarmV1: (id: string, params: RequestParams = {}) =>
      this.request<FarmDetailResponse, void>({
        path: `/backend/v1/farmer/farm/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update basic farm information for farms owned by the authenticated farmer.
     *
     * @tags Farmer
     * @name FarmerControllerUpdateFarmerFarmV1
     * @summary Update farmer farm details
     * @request PATCH:/backend/v1/farmer/farm/{id}
     * @secure
     */
    farmerControllerUpdateFarmerFarmV1: (
      id: string,
      data: UpdateFarmDto,
      params: RequestParams = {}
    ) =>
      this.request<FarmDetailResponse, void>({
        path: `/backend/v1/farmer/farm/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update basic information for NEARBY farms owned by the authenticated farmer. This endpoint does not allow changing farm_type.
     *
     * @tags Farmer
     * @name FarmerControllerUpdateFarmerNearbyFarmV1
     * @summary Update farmer nearby farm details
     * @request PATCH:/backend/v1/farmer/farm/{id}/nearby
     * @secure
     */
    farmerControllerUpdateFarmerNearbyFarmV1: (
      id: string,
      data: UpdateNearbyFarmDto,
      params: RequestParams = {}
    ) =>
      this.request<FarmDetailResponse, void>({
        path: `/backend/v1/farmer/farm/${id}/nearby`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve GPS coordinates/boundary points for a specific farm owned by the authenticated farmer.
     *
     * @tags Farmer
     * @name FarmerControllerGetFarmerFarmPointsV1
     * @summary Get farmer farm points
     * @request GET:/backend/v1/farmer/farm/{id}/points
     * @secure
     */
    farmerControllerGetFarmerFarmPointsV1: (id: string, params: RequestParams = {}) =>
      this.request<FarmPointResponse, void>({
        path: `/backend/v1/farmer/farm/${id}/points`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Replace all farm boundary points with new coordinates for farms owned by the authenticated farmer.
     *
     * @tags Farmer
     * @name FarmerControllerUpdateFarmerFarmPointsV1
     * @summary Update farmer farm points
     * @request PUT:/backend/v1/farmer/farm/{id}/points
     * @secure
     */
    farmerControllerUpdateFarmerFarmPointsV1: (
      id: string,
      data: CreateFarmPointsDto,
      params: RequestParams = {}
    ) =>
      this.request<FarmPointResponse, void>({
        path: `/backend/v1/farmer/farm/${id}/points`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve owner information for a specific farm owned by the authenticated farmer.
     *
     * @tags Farmer
     * @name FarmerControllerGetFarmerFarmOwnerV1
     * @summary Get farmer farm owner
     * @request GET:/backend/v1/farmer/farm/{id}/owner
     * @secure
     */
    farmerControllerGetFarmerFarmOwnerV1: (id: string, params: RequestParams = {}) =>
      this.request<UpsertFarmOwnerResponse, void>({
        path: `/backend/v1/farmer/farm/${id}/owner`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update or create owner information for a specific farm owned by the authenticated farmer.
     *
     * @tags Farmer
     * @name FarmerControllerUpdateFarmerFarmOwnerV1
     * @summary Update farmer farm owner
     * @request PUT:/backend/v1/farmer/farm/{id}/owner
     * @secure
     */
    farmerControllerUpdateFarmerFarmOwnerV1: (
      id: string,
      data: UpsertFarmOwner,
      params: RequestParams = {}
    ) =>
      this.request<UpsertFarmOwnerResponse, void>({
        path: `/backend/v1/farmer/farm/${id}/owner`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all areas for a specific farm owned by the authenticated farmer.
     *
     * @tags Farmer
     * @name FarmerControllerGetFarmerFarmAreasV1
     * @summary Get farmer farm areas
     * @request GET:/backend/v1/farmer/farm/{id}/areas
     * @secure
     */
    farmerControllerGetFarmerFarmAreasV1: (id: string, params: RequestParams = {}) =>
      this.request<DetailFarmAreaDto[], void>({
        path: `/backend/v1/farmer/farm/${id}/areas`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Manage farm areas with bulk operations for farms owned by the authenticated farmer. Supports create, update, and delete operations in a single request. **Single Item Examples:** • **Create one area:** Send array with one create operation • **Update one area:** Send array with one update operation • **Delete one area:** Send array with one delete operation **Multiple Items:** Send array with multiple operations of any type.
     *
     * @tags Farmer
     * @name FarmerControllerBulkUpdateFarmerFarmAreasV1
     * @summary Bulk manage farm areas
     * @request PUT:/backend/v1/farmer/farm/{id}/areas/bulk
     * @secure
     */
    farmerControllerBulkUpdateFarmerFarmAreasV1: (
      id: string,
      data: BulkUpdateFarmAreaDto,
      params: RequestParams = {}
    ) =>
      this.request<DetailFarmAreaDto[], void>({
        path: `/backend/v1/farmer/farm/${id}/areas/bulk`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all plants for a specific farm owned by the authenticated farmer.
     *
     * @tags Farmer
     * @name FarmerControllerGetFarmerFarmPlantsV1
     * @summary Get farmer farm plants
     * @request GET:/backend/v1/farmer/farm/{id}/plants
     * @secure
     */
    farmerControllerGetFarmerFarmPlantsV1: (id: string, params: RequestParams = {}) =>
      this.request<DetailFarmPlantDto[], void>({
        path: `/backend/v1/farmer/farm/${id}/plants`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Manage farm plants with bulk operations for farms owned by the authenticated farmer. Supports create, update, and delete operations in a single request. **Single Item Examples:** • **Create one plant:** Send array with one create operation • **Update one plant:** Send array with one update operation • **Delete one plant:** Send array with one delete operation **Multiple Items:** Send array with multiple operations of any type.
     *
     * @tags Farmer
     * @name FarmerControllerBulkUpdateFarmerFarmPlantsV1
     * @summary Bulk manage farm plants
     * @request PUT:/backend/v1/farmer/farm/{id}/plants/bulk
     * @secure
     */
    farmerControllerBulkUpdateFarmerFarmPlantsV1: (
      id: string,
      data: BulkUpdateFarmPlantDto,
      params: RequestParams = {}
    ) =>
      this.request<DetailFarmPlantDto[], void>({
        path: `/backend/v1/farmer/farm/${id}/plants/bulk`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all products for a specific farm owned by the authenticated farmer.
     *
     * @tags Farmer
     * @name FarmerControllerGetFarmerFarmProductsV1
     * @summary Get farmer farm products
     * @request GET:/backend/v1/farmer/farm/{id}/products
     * @secure
     */
    farmerControllerGetFarmerFarmProductsV1: (id: string, params: RequestParams = {}) =>
      this.request<FarmProductDetailDto[], void>({
        path: `/backend/v1/farmer/farm/${id}/products`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Manage farm products with bulk operations for farms owned by the authenticated farmer. Supports create, update, and delete operations in a single request. **Single Item Examples:** • **Create one product:** Send array with one create operation • **Update one product:** Send array with one update operation • **Delete one product:** Send array with one delete operation **Multiple Items:** Send array with multiple operations of any type.
     *
     * @tags Farmer
     * @name FarmerControllerBulkUpdateFarmerFarmProductsV1
     * @summary Bulk manage farm products
     * @request PUT:/backend/v1/farmer/farm/{id}/products/bulk
     * @secure
     */
    farmerControllerBulkUpdateFarmerFarmProductsV1: (
      id: string,
      data: BulkUpdateFarmProductDto,
      params: RequestParams = {}
    ) =>
      this.request<FarmProductDetailDto[], void>({
        path: `/backend/v1/farmer/farm/${id}/products/bulk`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update the permission level for a factory that has access to a farm.
     *
     * @tags Farmer
     * @name FarmerControllerUpdateFarmSharePermissionV1
     * @summary Update permission for a shared factory
     * @request PATCH:/backend/v1/farmer/farm/{id}/shared-factories/permission
     * @secure
     */
    farmerControllerUpdateFarmSharePermissionV1: (
      id: string,
      data: FarmerUpdateFarmSharePermissionDto,
      params: RequestParams = {}
    ) =>
      this.request<FarmerUpdateFarmSharePermissionResponseDto, void>({
        path: `/backend/v1/farmer/farm/${id}/shared-factories/permission`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Remove (soft delete) farm access from a specific factory.
     *
     * @tags Farmer
     * @name FarmerControllerRemoveFarmShareAccessV1
     * @summary Remove farm access from a factory
     * @request DELETE:/backend/v1/farmer/farm/{id}/shared-factories/access
     * @secure
     */
    farmerControllerRemoveFarmShareAccessV1: (
      id: string,
      data: FarmerRemoveFarmShareAccessDto,
      params: RequestParams = {}
    ) =>
      this.request<
        {
          /** @example true */
          success?: boolean;
          /** @example "Farm access successfully removed from factory" */
          message?: string;
        },
        void
      >({
        path: `/backend/v1/farmer/farm/${id}/shared-factories/access`,
        method: 'DELETE',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated cultivation logs for a specific farm owned by the authenticated farmer.
     *
     * @tags Farmer
     * @name FarmerCultivationLogControllerFindByFarmIdV1
     * @summary Get cultivation logs by farm ID
     * @request GET:/backend/v1/farmer/{farmId}/cultivation-log
     * @secure
     */
    farmerCultivationLogControllerFindByFarmIdV1: (
      farmId: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Farm ID to filter cultivation logs
         * @example "FARM_1234567890"
         */
        farm_id?: string;
        /**
         * Activity type to filter cultivation logs
         * @example "Fertilization"
         */
        activity?: string;
        /**
         * Material type to filter cultivation logs
         * @example "Fertilizer"
         */
        material?: string;
        /**
         * Person in charge to filter cultivation logs
         * @example "John Doe"
         */
        person_in_charge?: string;
        /**
         * Filter by fertilizer type
         * @example "npk"
         */
        fertilizer_type?: 'npk' | 'manure' | 'bio' | 'other';
        /**
         * Minimum batch number to filter cultivation logs
         * @example 1
         */
        min_batch_number?: number;
        /**
         * Maximum batch number to filter cultivation logs
         * @example 10
         */
        max_batch_number?: number;
        /**
         * Minimum cost to filter cultivation logs
         * @example 100000
         */
        min_cost?: number;
        /**
         * Maximum cost to filter cultivation logs
         * @example 1000000
         */
        max_cost?: number;
        /**
         * Start date for filtering cultivation logs (ISO 8601 format)
         * @example "2024-01-01T00:00:00Z"
         */
        start_date?: string;
        /**
         * End date for filtering cultivation logs (ISO 8601 format)
         * @example "2024-12-31T23:59:59Z"
         */
        end_date?: string;
        /**
         * Field to sort by
         * @default "date"
         * @example "date"
         */
        sort_by?:
          | 'date'
          | 'created_at'
          | 'updated_at'
          | 'activity'
          | 'farm_id'
          | 'batch_number'
          | 'cost'
          | 'quantity';
        /**
         * Sort order for cultivation logs
         * @default "desc"
         * @example "desc"
         */
        sort_order?: 'asc' | 'desc';
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedCultivationLogResponseDto, void>({
        path: `/backend/v1/farmer/${farmId}/cultivation-log`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new cultivation log for a farm owned by the authenticated farmer. Farmers can only create logs for their own farms.
     *
     * @tags Farmer
     * @name FarmerCultivationLogControllerCreateV1
     * @summary Create new cultivation log
     * @request POST:/backend/v1/farmer/{farmId}/cultivation-log
     * @secure
     */
    farmerCultivationLogControllerCreateV1: (
      farmId: string,
      data: FarmerCreateCultivationLogDto,
      params: RequestParams = {}
    ) =>
      this.request<CultivationLogDetailResponse, void>({
        path: `/backend/v1/farmer/${farmId}/cultivation-log`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update an existing cultivation log. Farmers can only update logs from their own farms.
     *
     * @tags Farmer
     * @name FarmerCultivationLogControllerUpdateV1
     * @summary Update cultivation log
     * @request PUT:/backend/v1/farmer/{farmId}/cultivation-log/{id}
     * @secure
     */
    farmerCultivationLogControllerUpdateV1: (
      farmId: string,
      id: string,
      data: FarmerUpdateCultivationLogDto,
      params: RequestParams = {}
    ) =>
      this.request<CultivationLogDetailResponse, void>({
        path: `/backend/v1/farmer/${farmId}/cultivation-log/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Soft delete a cultivation log. Farmers can only delete logs from their own farms.
     *
     * @tags Farmer
     * @name FarmerCultivationLogControllerRemoveV1
     * @summary Delete cultivation log
     * @request DELETE:/backend/v1/farmer/{farmId}/cultivation-log/{id}
     * @secure
     */
    farmerCultivationLogControllerRemoveV1: (
      farmId: string,
      id: string,
      params: RequestParams = {}
    ) =>
      this.request<CultivationLogDetailResponse, void>({
        path: `/backend/v1/farmer/${farmId}/cultivation-log/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated harvest logs for a specific farm owned by the authenticated farmer.
     *
     * @tags Farmer
     * @name FarmerHarvestLogControllerFindByFarmIdV1
     * @summary Get harvest logs by farm ID
     * @request GET:/backend/v1/farmer/{farmId}/harvest-log
     * @secure
     */
    farmerHarvestLogControllerFindByFarmIdV1: (
      farmId: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Harvest method to filter by
         * @example "Hand picking"
         */
        harvest_method?: string;
        /**
         * Variety to filter by
         * @example "Arabica Premium"
         */
        variety?: string;
        /**
         * Field to sort by
         * @default "created_at"
         * @example "date"
         */
        sort_by?:
          | 'date'
          | 'created_at'
          | 'updated_at'
          | 'harvest_method'
          | 'variety'
          | 'quantity'
          | 'farm_id';
        /**
         * Sort order for harvest logs
         * @default "desc"
         * @example "desc"
         */
        sort_order?: 'asc' | 'desc';
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedHarvestLogResponseDto, void>({
        path: `/backend/v1/farmer/${farmId}/harvest-log`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new harvest log for a farm owned by the authenticated farmer. Farmers can only create logs for their own farms. Supports up to 5 file attachments.
     *
     * @tags Farmer
     * @name FarmerHarvestLogControllerCreateV1
     * @summary Create new harvest log
     * @request POST:/backend/v1/farmer/{farmId}/harvest-log
     * @secure
     */
    farmerHarvestLogControllerCreateV1: (
      farmId: string,
      data: CreateHarvestLogWithFilesDto,
      params: RequestParams = {}
    ) =>
      this.request<CreateHarvestLogResponseDto, void>({
        path: `/backend/v1/farmer/${farmId}/harvest-log`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update an existing harvest log. Farmers can only update logs from their own farms. Supports up to 5 file attachments.
     *
     * @tags Farmer
     * @name FarmerHarvestLogControllerUpdateV1
     * @summary Update harvest log
     * @request PATCH:/backend/v1/farmer/{farmId}/harvest-log/{id}
     * @secure
     */
    farmerHarvestLogControllerUpdateV1: (
      farmId: string,
      id: string,
      data: UpdateHarvestLogWithFilesDto,
      params: RequestParams = {}
    ) =>
      this.request<UpdateHarvestLogResponseDto, void>({
        path: `/backend/v1/farmer/${farmId}/harvest-log/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description Soft delete a harvest log. Farmers can only delete logs from their own farms.
     *
     * @tags Farmer
     * @name FarmerHarvestLogControllerRemoveV1
     * @summary Delete harvest log
     * @request DELETE:/backend/v1/farmer/{farmId}/harvest-log/{id}
     * @secure
     */
    farmerHarvestLogControllerRemoveV1: (farmId: string, id: string, params: RequestParams = {}) =>
      this.request<UpdateHarvestLogResponseDto, void>({
        path: `/backend/v1/farmer/${farmId}/harvest-log/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated files associated with a specific harvest log for a farm owned by the authenticated farmer.
     *
     * @tags Farmer
     * @name FarmerHarvestLogControllerGetHarvestLogFilesV1
     * @summary Get harvest log files
     * @request GET:/backend/v1/farmer/{farmId}/harvest-log/{harvestLogId}/files
     * @secure
     */
    farmerHarvestLogControllerGetHarvestLogFilesV1: (
      farmId: string,
      harvestLogId: string,
      query: {
        skip: number;
        limit: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedHarvestLogFilesResponseDto, void>({
        path: `/backend/v1/farmer/${farmId}/harvest-log/${harvestLogId}/files`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Generate a presigned download URL for a specific file associated with a harvest log for a farm owned by the authenticated farmer.
     *
     * @tags Farmer
     * @name FarmerHarvestLogControllerDownloadHarvestLogFileV1
     * @summary Download harvest log file
     * @request GET:/backend/v1/farmer/{farmId}/harvest-log/{harvestLogId}/files/{fileId}/download
     * @secure
     */
    farmerHarvestLogControllerDownloadHarvestLogFileV1: (
      farmId: string,
      harvestLogId: string,
      fileId: string,
      query: {
        disposition: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<FileDownloadResponseDto, void>({
        path: `/backend/v1/farmer/${farmId}/harvest-log/${harvestLogId}/files/${fileId}/download`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Soft delete a file association from a harvest log for a farm owned by the authenticated farmer.
     *
     * @tags Farmer
     * @name FarmerHarvestLogControllerRemoveHarvestLogFileAssociationV1
     * @summary Remove harvest log file association
     * @request DELETE:/backend/v1/farmer/{farmId}/harvest-log/{harvestLogId}/files/{associationId}
     * @secure
     */
    farmerHarvestLogControllerRemoveHarvestLogFileAssociationV1: (
      farmId: string,
      harvestLogId: string,
      associationId: string,
      params: RequestParams = {}
    ) =>
      this.request<DeleteFileAssociationResponseDto, void>({
        path: `/backend/v1/farmer/${farmId}/harvest-log/${harvestLogId}/files/${associationId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new package list for a farm owned by the farmer. Auto-generates individual package items based on total weight and net weight per bag. Only farmers can create package lists for their own farms.
     *
     * @tags Farmer
     * @name FarmerPackageListControllerCreateV1
     * @summary Create a new package list for farmer
     * @request POST:/backend/v1/farmer/package-list
     * @secure
     */
    farmerPackageListControllerCreateV1: (
      data: CreateFarmerPackageListDto,
      params: RequestParams = {}
    ) =>
      this.request<PackageItemResponseDto[], void>({
        path: `/backend/v1/farmer/package-list`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a paginated list of package lists from farms owned by the farmer. Only farmers can access their own package lists.
     *
     * @tags Farmer
     * @name FarmerPackageListControllerFindAllV1
     * @summary Get all package lists for farmer
     * @request GET:/backend/v1/farmer/package-list
     * @secure
     */
    farmerPackageListControllerFindAllV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Farm ID to filter package lists
         * @example "cm3q8j9k0000114txhqz0abcd"
         */
        farm_id?: string;
        /**
         * Filter by coffee variety (case-insensitive partial match)
         * @example "Arabica"
         */
        variety?: string;
        /**
         * Filter by processing step
         * @example "WET"
         */
        processing_step?: 'NATURAL' | 'HONEY' | 'WET';
        /**
         * Filter by processing date (YYYY-MM-DD format)
         * @example "2024-09-23"
         */
        date?: string;
        /**
         * Search in variety, processing step, or bag type
         * @example "arabica"
         */
        search?: string;
        /**
         * Field to sort by
         * @default "created_at"
         * @example "created_at"
         */
        sort_by?: 'created_at' | 'updated_at' | 'date' | 'variety' | 'total_weight' | 'total_bags';
        /**
         * Sort order for package lists
         * @default "desc"
         * @example "desc"
         */
        sort_order?: 'asc' | 'desc';
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedFarmerPackageListResponseDto, void>({
        path: `/backend/v1/farmer/package-list`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve package list statistics including total lists, packages by status, distribution by processing step and variety, and weight statistics for the farmer.
     *
     * @tags Farmer
     * @name FarmerPackageListControllerGetStatisticsV1
     * @summary Get package list statistics for farmer
     * @request GET:/backend/v1/farmer/package-list/statistics
     * @secure
     */
    farmerPackageListControllerGetStatisticsV1: (params: RequestParams = {}) =>
      this.request<
        {
          /** Total number of package lists */
          total_package_lists?: number;
          /** Total number of individual packages */
          total_packages?: number;
          packages_by_status?: {
            /** Package status */
            status?: string;
            /** Number of packages with this status */
            count?: number;
          }[];
          lists_by_processing_step?: {
            /** Processing step */
            processing_step?: string;
            /** Number of lists for this processing step */
            count?: number;
          }[];
          lists_by_variety?: {
            /** Variety name */
            variety?: string;
            /** Number of lists for this variety */
            count?: number;
          }[];
          /** Total weight of all package lists */
          total_weight?: number;
          /** Average weight per package list */
          average_weight_per_list?: number;
        },
        void
      >({
        path: `/backend/v1/farmer/package-list/statistics`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a specific package list by its ID. Only farmers can access their own package lists.
     *
     * @tags Farmer
     * @name FarmerPackageListControllerFindOneV1
     * @summary Get package list by ID
     * @request GET:/backend/v1/farmer/package-list/{id}
     * @secure
     */
    farmerPackageListControllerFindOneV1: (id: string, params: RequestParams = {}) =>
      this.request<FarmerPackageListResponse, void>({
        path: `/backend/v1/farmer/package-list/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated package lists for a specific farm owned by the farmer. Only farmers can access package lists from their own farms.
     *
     * @tags Farmer
     * @name FarmerPackageListControllerFindByFarmIdV1
     * @summary Get package lists by farm ID
     * @request GET:/backend/v1/farmer/package-list/farm/{farmId}
     * @secure
     */
    farmerPackageListControllerFindByFarmIdV1: (
      farmId: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Farm ID to filter package lists
         * @example "cm3q8j9k0000114txhqz0abcd"
         */
        farm_id?: string;
        /**
         * Filter by coffee variety (case-insensitive partial match)
         * @example "Arabica"
         */
        variety?: string;
        /**
         * Filter by processing step
         * @example "WET"
         */
        processing_step?: 'NATURAL' | 'HONEY' | 'WET';
        /**
         * Filter by processing date (YYYY-MM-DD format)
         * @example "2024-09-23"
         */
        date?: string;
        /**
         * Search in variety, processing step, or bag type
         * @example "arabica"
         */
        search?: string;
        /**
         * Field to sort by
         * @default "created_at"
         * @example "created_at"
         */
        sort_by?: 'created_at' | 'updated_at' | 'date' | 'variety' | 'total_weight' | 'total_bags';
        /**
         * Sort order for package lists
         * @default "desc"
         * @example "desc"
         */
        sort_order?: 'asc' | 'desc';
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedFarmerPackageListResponseDto, void>({
        path: `/backend/v1/farmer/package-list/farm/${farmId}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a specific package item by its ID. Only farmers can access their own package items.
     *
     * @tags Farmer
     * @name FarmerPackageItemControllerFindOneV1
     * @summary Get package item by ID
     * @request GET:/backend/v1/farmer/farm/package-item/{id}
     * @secure
     */
    farmerPackageItemControllerFindOneV1: (id: string, params: RequestParams = {}) =>
      this.request<FarmerPackageItemResponse, void>({
        path: `/backend/v1/farmer/farm/package-item/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a paginated list of package items from farms owned by the farmer. Only farmers can access their own package items.
     *
     * @tags Farmer
     * @name FarmerPackageItemControllerFindAllV1
     * @summary Get all package items for farmer
     * @request GET:/backend/v1/farmer/farm/{farmId}/package-item
     * @secure
     */
    farmerPackageItemControllerFindAllV1: (
      farmId: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Filter by package item ID
         * @example "clh5x8k2a0000abcd1234efgi"
         */
        id?: string;
        /**
         * Filter by package status (supports multiple values)
         * @example ["WAITING_FOR_SCAN","READY"]
         */
        status?: ('READY' | 'WAITING_FOR_SCAN' | 'SHIPPED' | 'DAMAGED')[];
        /**
         * Filter by coffee variety (case-insensitive partial match)
         * @example "Arabica"
         */
        variety?: string;
        /**
         * Field to sort by
         * @default "package_number"
         * @example "package_number"
         */
        sort_by?: 'package_number' | 'created_at' | 'updated_at' | 'weight' | 'status';
        /**
         * Sort order for package items
         * @default "asc"
         * @example "asc"
         */
        sort_order?: 'asc' | 'desc';
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedPackageItemWithListResponseDto, void>({
        path: `/backend/v1/farmer/farm/${farmId}/package-item`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update the status of a specific package item owned by the farmer. Only farmers can update their own package items.
     *
     * @tags Farmer
     * @name FarmerPackageItemControllerUpdateStatusV1
     * @summary Update package item status
     * @request PATCH:/backend/v1/farmer/farm/{farmId}/package-item/{id}/status
     * @secure
     */
    farmerPackageItemControllerUpdateStatusV1: (
      farmId: string,
      id: string,
      data: UpdateFarmerPackageItemStatusDto,
      params: RequestParams = {}
    ) =>
      this.request<PackageItemResponseDto, void>({
        path: `/backend/v1/farmer/farm/${farmId}/package-item/${id}/status`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update the draft of a specific package item. The package item must belong to a farm associated with the factory.
     *
     * @tags Farmer
     * @name FarmerPackageItemControllerUpdateDraftV1
     * @summary Update package item draft
     * @request PATCH:/backend/v1/farmer/farm/{farmId}/package-item/{id}/draft
     * @secure
     */
    farmerPackageItemControllerUpdateDraftV1: (
      farmId: string,
      id: string,
      data: UpdatePackageItemDto,
      params: RequestParams = {}
    ) =>
      this.request<PackageItemResponseDto, void>({
        path: `/backend/v1/farmer/farm/${farmId}/package-item/${id}/draft`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a specific package item by its package item ID. Only farmers can access their own package items.
     *
     * @tags Farmer
     * @name FarmerPackageItemControllerFindOneByPackageItemIdV1
     * @summary Get package item by package item ID
     * @request GET:/backend/v1/farmer/farm/package-item/by-package-item-id/{packageItemId}
     * @secure
     */
    farmerPackageItemControllerFindOneByPackageItemIdV1: (
      packageItemId: string,
      params: RequestParams = {}
    ) =>
      this.request<PackageItemResponseDto, void>({
        path: `/backend/v1/farmer/farm/package-item/by-package-item-id/${packageItemId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new sale lot for a farm owned by the authenticated farmer. Only farmers can create sale lots for their own farms.
     *
     * @tags Farmer
     * @name FarmerSaleLotControllerCreateSaleLotV1
     * @summary Create a sale lot for a farm
     * @request POST:/backend/v1/farmer/farm/{id}/sale-lots
     * @secure
     */
    farmerSaleLotControllerCreateSaleLotV1: (
      id: string,
      data: CreateSaleLotDto,
      params: RequestParams = {}
    ) =>
      this.request<CreateSaleLotResponseDto, void>({
        path: `/backend/v1/farmer/farm/${id}/sale-lots`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated sale lots for a specific farm owned by the authenticated farmer. Only farmers can access sale lots for their own farms.
     *
     * @tags Farmer
     * @name FarmerSaleLotControllerFindSaleLotsByFarmIdV1
     * @summary Get sale lots for a farm
     * @request GET:/backend/v1/farmer/farm/{id}/sale-lots
     * @secure
     */
    farmerSaleLotControllerFindSaleLotsByFarmIdV1: (
      id: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Filter by specific farm ID
         * @example "cm3q8j9k0000114txhqz0abcd"
         */
        farm_id?: string;
        /**
         * Filter by collector organization ID
         * @example "cm3q8j9k0000114txhqz0abcd"
         */
        collector_org_id?: string;
        /**
         * Filter by variety (partial match)
         * @example "Arabica"
         */
        variety?: string;
        /**
         * Filter by sale lot status
         * @example "WAITING_TO_COLLECT"
         */
        status?:
          | 'WAITING_TO_COLLECT'
          | 'COLLECTED'
          | 'IN_TRANSIT'
          | 'ARRIVED_AT_FACTORY'
          | 'INTAKE'
          | 'CANCELLED';
        /**
         * Filter by date from (YYYY-MM-DD)
         * @example "2024-01-01"
         */
        date_from?: string;
        /**
         * Filter by date to (YYYY-MM-DD)
         * @example "2024-12-31"
         */
        date_to?: string;
        /**
         * Filter by pick up date from (YYYY-MM-DD)
         * @example "2024-01-20"
         */
        pickup_date_from?: string;
        /**
         * Filter by pick up date to (YYYY-MM-DD)
         * @example "2024-01-25"
         */
        pickup_date_to?: string;
        /**
         * Search in variety, farmer name, or sale lot ID
         * @example "arabica farmer"
         */
        search?: string;
        /**
         * Filter by binned status: true = only binned lots, false = only not binned lots, undefined = all
         * @example true
         */
        is_binned?: boolean;
        /**
         * Field to sort by
         * @example "created_at"
         */
        sort_by?: string;
        /**
         * Sort order
         * @example "desc"
         */
        sort_order?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedSaleLotResponseDto, void>({
        path: `/backend/v1/farmer/farm/${id}/sale-lots`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a specific sale lot by ID for a farm owned by the authenticated farmer. Only farmers can access sale lots for their own farms.
     *
     * @tags Farmer
     * @name FarmerSaleLotControllerFindOneV1
     * @summary Get a specific sale lot for a farm
     * @request GET:/backend/v1/farmer/farm/{id}/sale-lots/{saleLotId}
     * @secure
     */
    farmerSaleLotControllerFindOneV1: (id: string, saleLotId: string, params: RequestParams = {}) =>
      this.request<SaleLotDetailResponse, void>({
        path: `/backend/v1/farmer/farm/${id}/sale-lots/${saleLotId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed information for a contributing farm in a sale lot accessible by the authenticated farmer
     *
     * @tags Farmer
     * @name FarmerSaleLotControllerGetContributingFarmDetailV1
     * @summary Get contributing farm detail by farm ID for a sale lot
     * @request GET:/backend/v1/farmer/farm/sale-lots/{saleLotId}/farms/{farmId}
     * @secure
     */
    farmerSaleLotControllerGetContributingFarmDetailV1: (
      saleLotId: string,
      farmId: string,
      params: RequestParams = {}
    ) =>
      this.request<SaleLotContributingFarmDetailResponseDto, void>({
        path: `/backend/v1/farmer/farm/sale-lots/${saleLotId}/farms/${farmId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all documents associated with farm sale lots. Supports search by document name.
     *
     * @tags Farmer
     * @name FarmerDocumentControllerGetDocumentsV1
     * @summary Get farm documents with pagination and filtering
     * @request GET:/backend/v1/farmer/farm/{id}/documents
     * @secure
     */
    farmerDocumentControllerGetDocumentsV1: (
      id: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Search by document name
         * @example "QC Report"
         */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedFarmerDocumentResponseDto, void>({
        path: `/backend/v1/farmer/farm/${id}/documents`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Generate a temporary pre-signed URL to download a file (owner only)
     *
     * @tags Farmer
     * @name FarmerDocumentControllerGetDownloadUrlV1
     * @summary Get file download URL
     * @request GET:/backend/v1/farmer/farm/{id}/documents/{fileId}/download
     * @secure
     */
    farmerDocumentControllerGetDownloadUrlV1: (
      id: string,
      fileId: string,
      query?: {
        /**
         * Content disposition for browser handling
         * @default "attachment"
         */
        disposition?: 'inline' | 'attachment';
      },
      params: RequestParams = {}
    ) =>
      this.request<FileDownloadResponseDto, void>({
        path: `/backend/v1/farmer/farm/${id}/documents/${fileId}/download`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all documents associated with a specific sale lot of a farm. Supports search by document name.
     *
     * @tags Farmer
     * @name FarmerDocumentControllerGetSaleLotDocumentsV1
     * @summary Get sale lot documents with pagination and filtering
     * @request GET:/backend/v1/farmer/farm/{id}/sale-lots/{saleLotId}/documents
     * @secure
     */
    farmerDocumentControllerGetSaleLotDocumentsV1: (
      id: string,
      saleLotId: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Search by document name
         * @example "QC Report"
         */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedSaleLotDocumentResponseDto, void>({
        path: `/backend/v1/farmer/farm/${id}/sale-lots/${saleLotId}/documents`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Upload a document file (PDF, DOC, DOCX, XLS, XLSX, JPEG, PNG) to user's private storage with farm authorization
     *
     * @tags Farmer
     * @name FarmerDocumentControllerUploadFileForFarmV1
     * @summary Upload a file for a farm
     * @request POST:/backend/v1/farmer/farm/{id}/documents/upload
     * @secure
     */
    farmerDocumentControllerUploadFileForFarmV1: (
      id: string,
      data: FarmerFileUploadDto,
      params: RequestParams = {}
    ) =>
      this.request<UploadFarmerDocumentResponseDto, void>({
        path: `/backend/v1/farmer/farm/${id}/documents/upload`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description Link an uploaded file with a specific sale lot for a farm
     *
     * @tags Farmer
     * @name FarmerDocumentControllerAssociateFileWithEntityV1
     * @summary Associate a file with a sale lot
     * @request POST:/backend/v1/farmer/farm/{id}/documents/associate
     * @secure
     */
    farmerDocumentControllerAssociateFileWithEntityV1: (
      id: string,
      data: AssociateFarmerDocumentDto,
      params: RequestParams = {}
    ) =>
      this.request<AssociateFarmerDocumentResponseDto, void>({
        path: `/backend/v1/farmer/farm/${id}/documents/associate`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Delete a file uploaded by the user (soft delete)
     *
     * @tags Farmer
     * @name FarmerDocumentControllerDeleteFileV1
     * @summary Delete a file
     * @request DELETE:/backend/v1/farmer/farm/{id}/documents/{fileId}
     * @secure
     */
    farmerDocumentControllerDeleteFileV1: (
      id: string,
      fileId: string,
      params: RequestParams = {}
    ) =>
      this.request<DeleteFarmerDocumentResponseDto, void>({
        path: `/backend/v1/farmer/farm/${id}/documents/${fileId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Factory
     * @name FactoryUserControllerCreateFactoryUserV1
     * @summary Create a factory sub-user (Factory owners and admin users)
     * @request POST:/backend/v1/factory/users
     * @secure
     */
    factoryUserControllerCreateFactoryUserV1: (
      data: CreateFactoryUserDto,
      params: RequestParams = {}
    ) =>
      this.request<FactoryUserResponseDto, void>({
        path: `/backend/v1/factory/users`,
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
     * @tags Factory
     * @name FactoryUserControllerGetFactoryUsersV1
     * @summary Get factory sub-users with pagination (Factory owners and admin users)
     * @request GET:/backend/v1/factory/users
     * @secure
     */
    factoryUserControllerGetFactoryUsersV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Filter by username (case insensitive partial match)
         * @example "john"
         */
        username?: string;
        /**
         * Filter by factory user role
         * @example "FACTORY_ADMIN"
         */
        role?: 'FACTORY_SUSTAINABILITY_TEAM' | 'FACTORY_COFFEE_MILL_OPERATION' | 'FACTORY_ADMIN';
        /**
         * Filter by active status
         * @example true
         */
        is_active?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<FactoryUserPaginatedResponseDto, void>({
        path: `/backend/v1/factory/users`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Factory
     * @name FactoryUserControllerUpdateFactoryUserV1
     * @summary Update a factory sub-user (Factory owners and admin users)
     * @request PUT:/backend/v1/factory/users/{id}
     * @secure
     */
    factoryUserControllerUpdateFactoryUserV1: (
      id: string,
      data: UpdateFactoryUserDto,
      params: RequestParams = {}
    ) =>
      this.request<FactoryUserResponseDto, void>({
        path: `/backend/v1/factory/users/${id}`,
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
     * @tags Factory
     * @name FactoryUserControllerDeleteFactoryUserV1
     * @summary Delete a factory sub-user (Factory owners and admin users)
     * @request DELETE:/backend/v1/factory/users/{id}
     * @secure
     */
    factoryUserControllerDeleteFactoryUserV1: (id: string, params: RequestParams = {}) =>
      this.request<FactoryUserResponseDto, void>({
        path: `/backend/v1/factory/users/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a farm with all related entities (points, owner, areas, plants, products) and automatically assign it to the factory. Only factory owners, factory sustainability team members, and factory admins can create farms.
     *
     * @tags Factory
     * @name FactoryFarmControllerCreateFactoryFarmV1
     * @summary Create a comprehensive farm for factory (Factory owners, sustainability team, and admin users)
     * @request POST:/backend/v1/factory/farm
     * @secure
     */
    factoryFarmControllerCreateFactoryFarmV1: (
      data: CreateFactoryFarmDto,
      params: RequestParams = {}
    ) =>
      this.request<CreateFactoryFarmResponseDto, void>({
        path: `/backend/v1/factory/farm`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve farms associated with the factory. Only factory owners, sustainability team members, and factory admins can access this data.
     *
     * @tags Factory
     * @name FactoryFarmControllerGetFactoryFarmsV1
     * @summary Get factory farms with pagination and filtering
     * @request GET:/backend/v1/factory/farm
     * @secure
     */
    factoryFarmControllerGetFactoryFarmsV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /** Search by farm ID */
        search?: string;
        /** Filter by province ID */
        province_id?: string;
        /** Filter by owner gender */
        gender?: string;
        /** Filter by owner ethnicity */
        ethnicity?: string;
        /** Filter by certificate IDs (farms must have at least one of these certificates) */
        certificate_ids?: string[];
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedFarmListDto, void>({
        path: `/backend/v1/factory/farm`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Creates a new farm with farm_type=NEARBY and automatically attaches it to the central farm. The central farm must have farm_type=CENTRAL and belong to the factory. The nearby farm will belong to the same factory organization.
     *
     * @tags Factory
     * @name FactoryFarmControllerCreateNearbyFarmV1
     * @summary Create a new nearby farm for a central farm
     * @request POST:/backend/v1/factory/farm/{id}/nearby-farms/create
     * @secure
     */
    factoryFarmControllerCreateNearbyFarmV1: (
      id: string,
      data: CreateNearbyFarmRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<CreateNearbyFarmResponseDto, void>({
        path: `/backend/v1/factory/farm/${id}/nearby-farms/create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Upload a CSV file to create nearby farms for the central farm. CSV structure is the same as farm import but without fertilizer usage, pesticide usage, and notes columns. All data is read from the CSV; nothing is inferred from the central farm. Requires factory access to the central farm.
     *
     * @tags Factory
     * @name FactoryFarmControllerImportNearbyFarmsFromCsvV1
     * @summary Import nearby farms from CSV
     * @request POST:/backend/v1/factory/farm/{id}/nearby-farms/import-from-csv
     * @secure
     */
    factoryFarmControllerImportNearbyFarmsFromCsvV1: (
      id: string,
      data: {
        /** @format binary */
        file?: File;
        /** @example 10 */
        limit?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GenerateNearbyFarmsFromCsvResponseDto, void>({
        path: `/backend/v1/factory/farm/${id}/nearby-farms/import-from-csv`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed paginated list of nearby farms attached to a central farm accessible by the factory. Returns detailed farm information including owner, area, products, and certificates.
     *
     * @tags Factory
     * @name FactoryFarmControllerGetFactoryNearbyFarmsV1
     * @summary Get nearby farms list for a central farm
     * @request GET:/backend/v1/factory/farm/{id}/nearby-farms
     * @secure
     */
    factoryFarmControllerGetFactoryNearbyFarmsV1: (
      id: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /** Search by farm ID */
        search?: string;
        /** Filter by province ID */
        province_id?: string;
        /** Filter by owner gender */
        gender?: string;
        /** Filter by owner ethnicity */
        ethnicity?: string;
        /** Filter by certificate IDs (farms must have at least one of these certificates) */
        certificate_ids?: string[];
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedFarmListDto, void>({
        path: `/backend/v1/factory/farm/${id}/nearby-farms`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Permanently deletes a nearby farm by soft deleting both the nearby_farm relationship and the farm record itself. The nearby farm will no longer be accessible.
     *
     * @tags Factory
     * @name FactoryFarmControllerRemoveFactoryNearbyFarmV1
     * @summary Remove a nearby farm from a central farm
     * @request DELETE:/backend/v1/factory/farm/{id}/nearby-farms/{nearbyFarmId}
     * @secure
     */
    factoryFarmControllerRemoveFactoryNearbyFarmV1: (
      id: string,
      nearbyFarmId: string,
      params: RequestParams = {}
    ) =>
      this.request<
        {
          /** @example "Nearby farm removed successfully" */
          message?: string;
        },
        void
      >({
        path: `/backend/v1/factory/farm/${id}/nearby-farms/${nearbyFarmId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve comprehensive statistics for nearby farms attached to a specific central farm including total nearby farms, area, contractual volume, and EUDR compliance.
     *
     * @tags Factory
     * @name FactoryFarmControllerGetFactoryNearbyFarmStatisticsV1
     * @summary Get factory nearby farm statistics for a central farm
     * @request GET:/backend/v1/factory/farm/{id}/nearby-farms/statistics
     * @secure
     */
    factoryFarmControllerGetFactoryNearbyFarmStatisticsV1: (
      id: string,
      params: RequestParams = {}
    ) =>
      this.request<NearbyFarmStatisticsResponseDto, void>({
        path: `/backend/v1/factory/farm/${id}/nearby-farms/statistics`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve comprehensive statistics for farms associated with the factory including total farms, area, contractual volume, and EUDR compliance.
     *
     * @tags Factory
     * @name FactoryFarmControllerGetFactoryFarmStatisticsV1
     * @summary Get factory farm statistics
     * @request GET:/backend/v1/factory/farm/statistics
     * @secure
     */
    factoryFarmControllerGetFactoryFarmStatisticsV1: (params: RequestParams = {}) =>
      this.request<FarmStatisticsResponseDto, void>({
        path: `/backend/v1/factory/farm/statistics`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed information about a specific farm assigned to the factory.
     *
     * @tags Factory
     * @name FactoryFarmControllerGetFactoryFarmV1
     * @summary Get factory farm details
     * @request GET:/backend/v1/factory/farm/{id}
     * @secure
     */
    factoryFarmControllerGetFactoryFarmV1: (id: string, params: RequestParams = {}) =>
      this.request<FarmDetailResponse, void>({
        path: `/backend/v1/factory/farm/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Soft deletes a farm and its related entities if it has no nearby farms or package items. The farm must be linked to the factory.
     *
     * @tags Factory
     * @name FactoryFarmControllerDeleteFactoryFarmV1
     * @summary Delete a factory farm
     * @request DELETE:/backend/v1/factory/farm/{id}
     * @secure
     */
    factoryFarmControllerDeleteFactoryFarmV1: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @example "Farm deleted successfully" */
          message?: string;
        },
        void
      >({
        path: `/backend/v1/factory/farm/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update basic farm information including ownership transfer.
     *
     * @tags Factory
     * @name FactoryFarmControllerUpdateFactoryFarmV1
     * @summary Update factory farm details
     * @request PATCH:/backend/v1/factory/farm/{id}
     * @secure
     */
    factoryFarmControllerUpdateFactoryFarmV1: (
      id: string,
      data: UpdateFarmDto,
      params: RequestParams = {}
    ) =>
      this.request<FarmDetailResponse, void>({
        path: `/backend/v1/factory/farm/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update basic information for NEARBY farms linked to the factory. This endpoint does not allow changing farm_type.
     *
     * @tags Factory
     * @name FactoryFarmControllerUpdateFactoryNearbyFarmV1
     * @summary Update factory nearby farm details
     * @request PATCH:/backend/v1/factory/farm/{id}/nearby
     * @secure
     */
    factoryFarmControllerUpdateFactoryNearbyFarmV1: (
      id: string,
      data: UpdateNearbyFarmDto,
      params: RequestParams = {}
    ) =>
      this.request<FarmDetailResponse, void>({
        path: `/backend/v1/factory/farm/${id}/nearby`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve GPS coordinates/boundary points for a specific farm.
     *
     * @tags Factory
     * @name FactoryFarmControllerGetFactoryFarmPointsV1
     * @summary Get factory farm points
     * @request GET:/backend/v1/factory/farm/{id}/points
     * @secure
     */
    factoryFarmControllerGetFactoryFarmPointsV1: (id: string, params: RequestParams = {}) =>
      this.request<FarmPointResponse, void>({
        path: `/backend/v1/factory/farm/${id}/points`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Replace all farm boundary points with new coordinates.
     *
     * @tags Factory
     * @name FactoryFarmControllerUpdateFactoryFarmPointsV1
     * @summary Update factory farm points
     * @request PUT:/backend/v1/factory/farm/{id}/points
     * @secure
     */
    factoryFarmControllerUpdateFactoryFarmPointsV1: (
      id: string,
      data: CreateFarmPointsDto,
      params: RequestParams = {}
    ) =>
      this.request<FarmPointResponse, void>({
        path: `/backend/v1/factory/farm/${id}/points`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve owner information for a specific farm.
     *
     * @tags Factory
     * @name FactoryFarmControllerGetFactoryFarmOwnerV1
     * @summary Get factory farm owner
     * @request GET:/backend/v1/factory/farm/{id}/owner
     * @secure
     */
    factoryFarmControllerGetFactoryFarmOwnerV1: (id: string, params: RequestParams = {}) =>
      this.request<UpsertFarmOwnerResponse, void>({
        path: `/backend/v1/factory/farm/${id}/owner`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update or create owner information for a specific farm.
     *
     * @tags Factory
     * @name FactoryFarmControllerUpdateFactoryFarmOwnerV1
     * @summary Update factory farm owner
     * @request PUT:/backend/v1/factory/farm/{id}/owner
     * @secure
     */
    factoryFarmControllerUpdateFactoryFarmOwnerV1: (
      id: string,
      data: UpsertFarmOwner,
      params: RequestParams = {}
    ) =>
      this.request<UpsertFarmOwnerResponse, void>({
        path: `/backend/v1/factory/farm/${id}/owner`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new farm and copy owner information and basic farm data from the source farm. The source farm must belong to the same factory. The new farm will have the same address, country, province, and owner as the source farm. The new farm will be automatically linked to the factory. Future versions may support copying additional data types (areas, plants, products).
     *
     * @tags Factory
     * @name FactoryFarmControllerCopyFarmDataV1
     * @summary Create a new farm by copying data from an existing farm
     * @request POST:/backend/v1/factory/farm/{id}/copy
     * @secure
     */
    factoryFarmControllerCopyFarmDataV1: (id: string, params: RequestParams = {}) =>
      this.request<CopyFarmDataResponseDto, void>({
        path: `/backend/v1/factory/farm/${id}/copy`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all areas for a specific farm.
     *
     * @tags Factory
     * @name FactoryFarmControllerGetFactoryFarmAreasV1
     * @summary Get factory farm areas
     * @request GET:/backend/v1/factory/farm/{id}/areas
     * @secure
     */
    factoryFarmControllerGetFactoryFarmAreasV1: (id: string, params: RequestParams = {}) =>
      this.request<DetailFarmAreaDto[], void>({
        path: `/backend/v1/factory/farm/${id}/areas`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Manage farm areas with bulk operations. Supports create, update, and delete operations in a single request. **Single Item Examples:** • **Create one area:** Send array with one create operation • **Update one area:** Send array with one update operation • **Delete one area:** Send array with one delete operation **Multiple Items:** Send array with multiple operations of any type.
     *
     * @tags Factory
     * @name FactoryFarmControllerBulkUpdateFactoryFarmAreasV1
     * @summary Bulk manage farm areas
     * @request PUT:/backend/v1/factory/farm/{id}/areas/bulk
     * @secure
     */
    factoryFarmControllerBulkUpdateFactoryFarmAreasV1: (
      id: string,
      data: BulkUpdateFarmAreaDto,
      params: RequestParams = {}
    ) =>
      this.request<DetailFarmAreaDto[], void>({
        path: `/backend/v1/factory/farm/${id}/areas/bulk`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all plants for a specific farm.
     *
     * @tags Factory
     * @name FactoryFarmControllerGetFactoryFarmPlantsV1
     * @summary Get factory farm plants
     * @request GET:/backend/v1/factory/farm/{id}/plants
     * @secure
     */
    factoryFarmControllerGetFactoryFarmPlantsV1: (id: string, params: RequestParams = {}) =>
      this.request<DetailFarmPlantDto[], void>({
        path: `/backend/v1/factory/farm/${id}/plants`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Manage farm plants with bulk operations. Supports create, update, and delete operations in a single request. **Single Item Examples:** • **Create one plant:** Send array with one create operation • **Update one plant:** Send array with one update operation • **Delete one plant:** Send array with one delete operation **Multiple Items:** Send array with multiple operations of any type.
     *
     * @tags Factory
     * @name FactoryFarmControllerBulkUpdateFactoryFarmPlantsV1
     * @summary Bulk manage farm plants
     * @request PUT:/backend/v1/factory/farm/{id}/plants/bulk
     * @secure
     */
    factoryFarmControllerBulkUpdateFactoryFarmPlantsV1: (
      id: string,
      data: BulkUpdateFarmPlantDto,
      params: RequestParams = {}
    ) =>
      this.request<DetailFarmPlantDto[], void>({
        path: `/backend/v1/factory/farm/${id}/plants/bulk`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all products for a specific farm.
     *
     * @tags Factory
     * @name FactoryFarmControllerGetFactoryFarmProductsV1
     * @summary Get factory farm products
     * @request GET:/backend/v1/factory/farm/{id}/products
     * @secure
     */
    factoryFarmControllerGetFactoryFarmProductsV1: (id: string, params: RequestParams = {}) =>
      this.request<FarmProductDetailDto[], void>({
        path: `/backend/v1/factory/farm/${id}/products`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Manage farm products with bulk operations. Supports create, update, and delete operations in a single request. **Single Item Examples:** • **Create one product:** Send array with one create operation • **Update one product:** Send array with one update operation • **Delete one product:** Send array with one delete operation **Multiple Items:** Send array with multiple operations of any type.
     *
     * @tags Factory
     * @name FactoryFarmControllerBulkUpdateFactoryFarmProductsV1
     * @summary Bulk manage farm products
     * @request PUT:/backend/v1/factory/farm/{id}/products/bulk
     * @secure
     */
    factoryFarmControllerBulkUpdateFactoryFarmProductsV1: (
      id: string,
      data: BulkUpdateFarmProductDto,
      params: RequestParams = {}
    ) =>
      this.request<FarmProductDetailDto[], void>({
        path: `/backend/v1/factory/farm/${id}/products/bulk`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Share a factory-owned or accessible farm with a farmer organization
     *
     * @tags Factory
     * @name FactoryFarmControllerShareFarmToFarmer
     * @summary Share a farm with a farmer
     * @request POST:/backend/factory/farm/{id}/share
     * @secure
     */
    factoryFarmControllerShareFarmToFarmer: (
      id: string,
      data: ShareFarmToFarmerDto,
      params: RequestParams = {}
    ) =>
      this.request<ShareFarmToFarmerResponseDto, void>({
        path: `/backend/factory/farm/${id}/share`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new sale lot for a specific farm. Only factory owners, sustainability team members, and factory admins can create sale lots.
     *
     * @tags Factory
     * @name FactoryFarmControllerCreateFarmSaleLotV1
     * @summary Create a sale lot for a farm
     * @request POST:/backend/v1/factory/farm/{id}/sale-lot
     * @secure
     */
    factoryFarmControllerCreateFarmSaleLotV1: (
      id: string,
      data: CreateSaleLotDto,
      params: RequestParams = {}
    ) =>
      this.request<CreateSaleLotResponseDto, void>({
        path: `/backend/v1/factory/farm/${id}/sale-lot`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a specific sale lot by ID for a farm accessible to the factory. Only factory owners, sustainability team members, and factory admins can access sale lots.
     *
     * @tags Factory
     * @name FactoryFarmControllerFindFarmSaleLotV1
     * @summary Get a specific sale lot for a farm
     * @request GET:/backend/v1/factory/farm/{id}/sale-lots/{lotId}
     * @secure
     */
    factoryFarmControllerFindFarmSaleLotV1: (
      id: string,
      lotId: string,
      params: RequestParams = {}
    ) =>
      this.request<SaleLotDetailResponse, void>({
        path: `/backend/v1/factory/farm/${id}/sale-lots/${lotId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated list of farmers that a farm has been shared with, including their names and permission levels.
     *
     * @tags Factory
     * @name FactoryFarmControllerFindFarmSharedFarmersV1
     * @summary Get farmers shared to a farm
     * @request GET:/backend/v1/factory/farm/{id}/shared-farmers
     * @secure
     */
    factoryFarmControllerFindFarmSharedFarmersV1: (
      id: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedFarmSharedFarmersResponseDto, void>({
        path: `/backend/v1/factory/farm/${id}/shared-farmers`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update the permission level for a farmer that has access to a farm.
     *
     * @tags Factory
     * @name FactoryFarmControllerUpdateFarmSharePermissionV1
     * @summary Update permission for a shared farmer
     * @request PATCH:/backend/v1/factory/farm/{id}/shared-farmers/permission
     * @secure
     */
    factoryFarmControllerUpdateFarmSharePermissionV1: (
      id: string,
      data: UpdateFarmSharePermissionDto,
      params: RequestParams = {}
    ) =>
      this.request<UpdateFarmSharePermissionResponseDto, void>({
        path: `/backend/v1/factory/farm/${id}/shared-farmers/permission`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Remove (soft delete) farm access from a specific farmer.
     *
     * @tags Factory
     * @name FactoryFarmControllerRemoveFarmShareAccessV1
     * @summary Remove farm access from a farmer
     * @request DELETE:/backend/v1/factory/farm/{id}/shared-farmers/access
     * @secure
     */
    factoryFarmControllerRemoveFarmShareAccessV1: (
      id: string,
      data: RemoveFarmShareAccessDto,
      params: RequestParams = {}
    ) =>
      this.request<RemoveFarmShareAccessResponseDto, void>({
        path: `/backend/v1/factory/farm/${id}/shared-farmers/access`,
        method: 'DELETE',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated cultivation logs for a specific farm associated with the factory. Factory admins can view deleted logs by setting include_deleted=true.
     *
     * @tags Factory
     * @name FactoryCultivationLogControllerFindByFarmIdV1
     * @summary Get cultivation logs by farm ID
     * @request GET:/backend/v1/factory/farm/{farmId}/cultivation-log
     * @secure
     */
    factoryCultivationLogControllerFindByFarmIdV1: (
      farmId: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Farm ID to filter cultivation logs
         * @example "FARM_1234567890"
         */
        farm_id?: string;
        /**
         * Activity type to filter cultivation logs
         * @example "Fertilization"
         */
        activity?: string;
        /**
         * Material type to filter cultivation logs
         * @example "Fertilizer"
         */
        material?: string;
        /**
         * Person in charge to filter cultivation logs
         * @example "John Doe"
         */
        person_in_charge?: string;
        /**
         * Filter by fertilizer type
         * @example "npk"
         */
        fertilizer_type?: 'npk' | 'manure' | 'bio' | 'other';
        /**
         * Minimum batch number to filter cultivation logs
         * @example 1
         */
        min_batch_number?: number;
        /**
         * Maximum batch number to filter cultivation logs
         * @example 10
         */
        max_batch_number?: number;
        /**
         * Minimum cost to filter cultivation logs
         * @example 100000
         */
        min_cost?: number;
        /**
         * Maximum cost to filter cultivation logs
         * @example 1000000
         */
        max_cost?: number;
        /**
         * Start date for filtering cultivation logs (ISO 8601 format)
         * @example "2024-01-01T00:00:00Z"
         */
        start_date?: string;
        /**
         * End date for filtering cultivation logs (ISO 8601 format)
         * @example "2024-12-31T23:59:59Z"
         */
        end_date?: string;
        /**
         * Include deleted cultivation logs (FACTORY_ADMIN only)
         * @default false
         * @example false
         */
        include_deleted?: boolean;
        /**
         * Field to sort by
         * @default "date"
         * @example "date"
         */
        sort_by?:
          | 'date'
          | 'created_at'
          | 'updated_at'
          | 'activity'
          | 'farm_id'
          | 'batch_number'
          | 'cost'
          | 'quantity';
        /**
         * Sort order for cultivation logs
         * @default "desc"
         * @example "desc"
         */
        sort_order?: 'asc' | 'desc';
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedCultivationLogResponseDto, void>({
        path: `/backend/v1/factory/farm/${farmId}/cultivation-log`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new cultivation log for a farm associated with the factory. Only factory users can create logs.
     *
     * @tags Factory
     * @name FactoryCultivationLogControllerCreateV1
     * @summary Create new cultivation log
     * @request POST:/backend/v1/factory/farm/{farmId}/cultivation-log
     * @secure
     */
    factoryCultivationLogControllerCreateV1: (
      farmId: string,
      data: FactoryCreateCultivationLogDto,
      params: RequestParams = {}
    ) =>
      this.request<CultivationLogDetailResponse, void>({
        path: `/backend/v1/factory/farm/${farmId}/cultivation-log`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update an existing cultivation log. Only factory users can update logs from their associated farms.
     *
     * @tags Factory
     * @name FactoryCultivationLogControllerUpdateV1
     * @summary Update cultivation log
     * @request PUT:/backend/v1/factory/farm/{farmId}/cultivation-log/{id}
     * @secure
     */
    factoryCultivationLogControllerUpdateV1: (
      farmId: string,
      id: string,
      data: FactoryUpdateCultivationLogDto,
      params: RequestParams = {}
    ) =>
      this.request<CultivationLogDetailResponse, void>({
        path: `/backend/v1/factory/farm/${farmId}/cultivation-log/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Soft delete a cultivation log. Only factory admins can delete logs.
     *
     * @tags Factory
     * @name FactoryCultivationLogControllerRemoveV1
     * @summary Delete cultivation log
     * @request DELETE:/backend/v1/factory/farm/{farmId}/cultivation-log/{id}
     * @secure
     */
    factoryCultivationLogControllerRemoveV1: (
      farmId: string,
      id: string,
      params: RequestParams = {}
    ) =>
      this.request<CultivationLogDetailResponse, void>({
        path: `/backend/v1/factory/farm/${farmId}/cultivation-log/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated harvest logs for a specific farm associated with the factory. Factory admins can view deleted logs by setting include_deleted=true.
     *
     * @tags Factory
     * @name FactoryHarvestLogControllerFindByFarmIdV1
     * @summary Get harvest logs by farm ID
     * @request GET:/backend/v1/factory/farm/{farmId}/harvest-log
     * @secure
     */
    factoryHarvestLogControllerFindByFarmIdV1: (
      farmId: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Farm ID to filter harvest logs
         * @example "cm3q8j9k0000114txhqz0abcd"
         */
        farm_id?: string;
        /**
         * Harvest method to filter by
         * @example "Hand picking"
         */
        harvest_method?: string;
        /**
         * Variety to filter by
         * @example "Arabica Premium"
         */
        variety?: string;
        /**
         * Person in charge to filter by
         * @example "John Doe"
         */
        person_in_charge?: string;
        /**
         * Start date for filtering harvest logs (ISO 8601 format)
         * @example "2024-03-01T00:00:00Z"
         */
        start_date?: string;
        /**
         * End date for filtering harvest logs (ISO 8601 format)
         * @example "2024-03-31T23:59:59Z"
         */
        end_date?: string;
        /**
         * Include deleted harvest logs (FACTORY_ADMIN only)
         * @default false
         * @example false
         */
        include_deleted?: boolean;
        /**
         * Field to sort by
         * @default "created_at"
         * @example "date"
         */
        sort_by?:
          | 'date'
          | 'created_at'
          | 'updated_at'
          | 'harvest_method'
          | 'variety'
          | 'quantity'
          | 'farm_id';
        /**
         * Sort order for harvest logs
         * @default "desc"
         * @example "desc"
         */
        sort_order?: 'asc' | 'desc';
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedHarvestLogResponseDto, void>({
        path: `/backend/v1/factory/farm/${farmId}/harvest-log`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new harvest log for a farm associated with the factory. Only factory users can create logs. Supports up to 5 file attachments.
     *
     * @tags Factory
     * @name FactoryHarvestLogControllerCreateV1
     * @summary Create new harvest log
     * @request POST:/backend/v1/factory/farm/{farmId}/harvest-log
     * @secure
     */
    factoryHarvestLogControllerCreateV1: (
      farmId: string,
      data: CreateHarvestLogWithFilesDto,
      params: RequestParams = {}
    ) =>
      this.request<CreateHarvestLogResponseDto, void>({
        path: `/backend/v1/factory/farm/${farmId}/harvest-log`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update an existing harvest log. Only factory users can update logs from their associated farms. Supports up to 5 file attachments.
     *
     * @tags Factory
     * @name FactoryHarvestLogControllerUpdateV1
     * @summary Update harvest log
     * @request PATCH:/backend/v1/factory/farm/{farmId}/harvest-log/{id}
     * @secure
     */
    factoryHarvestLogControllerUpdateV1: (
      farmId: string,
      id: string,
      data: UpdateHarvestLogWithFilesDto,
      params: RequestParams = {}
    ) =>
      this.request<UpdateHarvestLogResponseDto, void>({
        path: `/backend/v1/factory/farm/${farmId}/harvest-log/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description Soft delete a harvest log. Only factory admins can delete logs.
     *
     * @tags Factory
     * @name FactoryHarvestLogControllerRemoveV1
     * @summary Delete harvest log
     * @request DELETE:/backend/v1/factory/farm/{farmId}/harvest-log/{id}
     * @secure
     */
    factoryHarvestLogControllerRemoveV1: (farmId: string, id: string, params: RequestParams = {}) =>
      this.request<FactoryHarvestLogResponse, void>({
        path: `/backend/v1/factory/farm/${farmId}/harvest-log/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated files associated with a specific harvest log for a farm associated with the factory.
     *
     * @tags Factory
     * @name FactoryHarvestLogControllerGetHarvestLogFilesV1
     * @summary Get harvest log files
     * @request GET:/backend/v1/factory/farm/{farmId}/harvest-log/{harvestLogId}/files
     * @secure
     */
    factoryHarvestLogControllerGetHarvestLogFilesV1: (
      farmId: string,
      harvestLogId: string,
      query: {
        skip: number;
        limit: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedHarvestLogFilesResponseDto, void>({
        path: `/backend/v1/factory/farm/${farmId}/harvest-log/${harvestLogId}/files`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Generate a presigned download URL for a specific file associated with a harvest log for a farm associated with the factory.
     *
     * @tags Factory
     * @name FactoryHarvestLogControllerDownloadHarvestLogFileV1
     * @summary Download harvest log file
     * @request GET:/backend/v1/factory/farm/{farmId}/harvest-log/{harvestLogId}/files/{fileId}/download
     * @secure
     */
    factoryHarvestLogControllerDownloadHarvestLogFileV1: (
      farmId: string,
      harvestLogId: string,
      fileId: string,
      query: {
        disposition: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<FileDownloadResponseDto, void>({
        path: `/backend/v1/factory/farm/${farmId}/harvest-log/${harvestLogId}/files/${fileId}/download`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Soft delete a file association from a harvest log for a farm associated with the factory.
     *
     * @tags Factory
     * @name FactoryHarvestLogControllerRemoveHarvestLogFileAssociationV1
     * @summary Remove harvest log file association
     * @request DELETE:/backend/v1/factory/farm/{farmId}/harvest-log/{harvestLogId}/files/{associationId}
     * @secure
     */
    factoryHarvestLogControllerRemoveHarvestLogFileAssociationV1: (
      farmId: string,
      harvestLogId: string,
      associationId: string,
      params: RequestParams = {}
    ) =>
      this.request<DeleteFileAssociationResponseDto, void>({
        path: `/backend/v1/factory/farm/${farmId}/harvest-log/${harvestLogId}/files/${associationId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new package list for a farm associated with the factory. The farm must be associated with the factory to create package lists. Auto-generates individual package items based on total weight and net weight per bag.
     *
     * @tags Factory
     * @name FactoryPackageListControllerCreateV1
     * @summary Create a new package list for factory
     * @request POST:/backend/v1/factory/package-list
     * @secure
     */
    factoryPackageListControllerCreateV1: (
      data: CreateFactoryPackageListDto,
      params: RequestParams = {}
    ) =>
      this.request<PackageItemResponseDto[], void>({
        path: `/backend/v1/factory/package-list`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a paginated list of package lists from farms associated with the factory. Factory admins can view deleted package lists by setting include_deleted=true.
     *
     * @tags Factory
     * @name FactoryPackageListControllerFindAllV1
     * @summary Get all package lists for factory
     * @request GET:/backend/v1/factory/package-list
     * @secure
     */
    factoryPackageListControllerFindAllV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Farm ID to filter package lists
         * @example "cm3q8j9k0000114txhqz0abcd"
         */
        farm_id?: string;
        /**
         * Filter by coffee variety (case-insensitive partial match)
         * @example "Arabica"
         */
        variety?: string;
        /**
         * Filter by processing step
         * @example "WET"
         */
        processing_step?: 'NATURAL' | 'HONEY' | 'WET';
        /**
         * Filter by processing date (YYYY-MM-DD format)
         * @example "2024-09-23"
         */
        date?: string;
        /**
         * Search in variety, processing step, or bag type
         * @example "arabica"
         */
        search?: string;
        /**
         * Include deleted package lists (FACTORY_ADMIN only)
         * @default false
         * @example false
         */
        include_deleted?: boolean;
        /**
         * Field to sort by
         * @default "created_at"
         * @example "created_at"
         */
        sort_by?: 'created_at' | 'updated_at' | 'date' | 'variety' | 'total_weight' | 'total_bags';
        /**
         * Sort order for package lists
         * @default "desc"
         * @example "desc"
         */
        sort_order?: 'asc' | 'desc';
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedFactoryPackageListResponseDto, void>({
        path: `/backend/v1/factory/package-list`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve package list statistics including total lists, packages by status, distribution by processing step and variety, and weight statistics for the factory.
     *
     * @tags Factory
     * @name FactoryPackageListControllerGetStatisticsV1
     * @summary Get package list statistics for factory
     * @request GET:/backend/v1/factory/package-list/statistics
     * @secure
     */
    factoryPackageListControllerGetStatisticsV1: (params: RequestParams = {}) =>
      this.request<
        {
          /** Total number of package lists */
          total_package_lists?: number;
          /** Total number of individual packages */
          total_packages?: number;
          packages_by_status?: {
            /** Package status */
            status?: string;
            /** Number of packages with this status */
            count?: number;
          }[];
          lists_by_processing_step?: {
            /** Processing step */
            processing_step?: string;
            /** Number of lists for this processing step */
            count?: number;
          }[];
          lists_by_variety?: {
            /** Variety name */
            variety?: string;
            /** Number of lists for this variety */
            count?: number;
          }[];
          /** Total weight of all package lists */
          total_weight?: number;
          /** Average weight per package list */
          average_weight_per_list?: number;
        },
        void
      >({
        path: `/backend/v1/factory/package-list/statistics`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a specific package list by its ID. Factory admins can view deleted package lists by setting include_deleted=true in query parameters.
     *
     * @tags Factory
     * @name FactoryPackageListControllerFindOneV1
     * @summary Get package list by ID
     * @request GET:/backend/v1/factory/package-list/{id}
     * @secure
     */
    factoryPackageListControllerFindOneV1: (
      id: string,
      query?: {
        /** Include deleted package list (FACTORY_ADMIN only) */
        include_deleted?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<FactoryPackageListResponse, void>({
        path: `/backend/v1/factory/package-list/${id}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated package lists for a specific farm associated with the factory. Factory admins can view deleted package lists by setting include_deleted=true.
     *
     * @tags Factory
     * @name FactoryPackageListControllerFindByFarmIdV1
     * @summary Get package lists by farm ID
     * @request GET:/backend/v1/factory/package-list/farm/{farmId}
     * @secure
     */
    factoryPackageListControllerFindByFarmIdV1: (
      farmId: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Farm ID to filter package lists
         * @example "cm3q8j9k0000114txhqz0abcd"
         */
        farm_id?: string;
        /**
         * Filter by coffee variety (case-insensitive partial match)
         * @example "Arabica"
         */
        variety?: string;
        /**
         * Filter by processing step
         * @example "WET"
         */
        processing_step?: 'NATURAL' | 'HONEY' | 'WET';
        /**
         * Filter by processing date (YYYY-MM-DD format)
         * @example "2024-09-23"
         */
        date?: string;
        /**
         * Search in variety, processing step, or bag type
         * @example "arabica"
         */
        search?: string;
        /**
         * Include deleted package lists (FACTORY_ADMIN only)
         * @default false
         * @example false
         */
        include_deleted?: boolean;
        /**
         * Field to sort by
         * @default "created_at"
         * @example "created_at"
         */
        sort_by?: 'created_at' | 'updated_at' | 'date' | 'variety' | 'total_weight' | 'total_bags';
        /**
         * Sort order for package lists
         * @default "desc"
         * @example "desc"
         */
        sort_order?: 'asc' | 'desc';
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedFactoryPackageListResponseDto, void>({
        path: `/backend/v1/factory/package-list/farm/${farmId}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a specific package item by its ID
     *
     * @tags Factory
     * @name FactoryPackageItemControllerFindOneV1
     * @summary Get package item by ID
     * @request GET:/backend/v1/factory/farm/package-item/{id}
     * @secure
     */
    factoryPackageItemControllerFindOneV1: (id: string, params: RequestParams = {}) =>
      this.request<FactoryPackageItemResponse, void>({
        path: `/backend/v1/factory/farm/package-item/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a paginated list of package items from farms associated with the factory. Factory admins can view deleted package items by setting include_deleted=true.
     *
     * @tags Factory
     * @name FactoryPackageItemControllerFindAllV1
     * @summary Get all package items for factory
     * @request GET:/backend/v1/factory/farm/{farmId}/package-item
     * @secure
     */
    factoryPackageItemControllerFindAllV1: (
      farmId: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Filter by package item ID
         * @example "clh5x8k2a0000abcd1234efgi"
         */
        id?: string;
        /**
         * Filter by package status (supports multiple values)
         * @example ["WAITING_FOR_SCAN","READY"]
         */
        status?: ('READY' | 'WAITING_FOR_SCAN' | 'SHIPPED' | 'DAMAGED')[];
        /**
         * Filter by coffee variety (case-insensitive partial match)
         * @example "Arabica"
         */
        variety?: string;
        /**
         * Include deleted package items (FACTORY_ADMIN only)
         * @default false
         * @example false
         */
        include_deleted?: boolean;
        /**
         * Field to sort by
         * @default "package_number"
         * @example "package_number"
         */
        sort_by?: 'package_number' | 'created_at' | 'updated_at' | 'weight' | 'status';
        /**
         * Sort order for package items
         * @default "asc"
         * @example "asc"
         */
        sort_order?: 'asc' | 'desc';
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedPackageItemWithListResponseDto, void>({
        path: `/backend/v1/factory/farm/${farmId}/package-item`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update the status of a specific package item. The package item must belong to a farm associated with the factory.
     *
     * @tags Factory
     * @name FactoryPackageItemControllerUpdateStatusV1
     * @summary Update package item status
     * @request PATCH:/backend/v1/factory/farm/{farmId}/package-item/{id}/status
     * @secure
     */
    factoryPackageItemControllerUpdateStatusV1: (
      farmId: string,
      id: string,
      data: UpdateFactoryPackageItemStatusDto,
      params: RequestParams = {}
    ) =>
      this.request<FactoryPackageItemResponse, void>({
        path: `/backend/v1/factory/farm/${farmId}/package-item/${id}/status`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update the draft of a specific package item. The package item must belong to a farm associated with the factory.
     *
     * @tags Factory
     * @name FactoryPackageItemControllerUpdateDraftV1
     * @summary Update package item draft
     * @request PATCH:/backend/v1/factory/farm/{farmId}/package-item/{id}/draft
     * @secure
     */
    factoryPackageItemControllerUpdateDraftV1: (
      farmId: string,
      id: string,
      data: UpdateFactoryPackageItemDto,
      params: RequestParams = {}
    ) =>
      this.request<FactoryPackageItemResponse, void>({
        path: `/backend/v1/factory/farm/${farmId}/package-item/${id}/draft`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a specific package item by its package item ID
     *
     * @tags Factory
     * @name FactoryPackageItemControllerFindOneByPackageItemIdV1
     * @summary Get package item by package item ID
     * @request GET:/backend/v1/factory/farm/package-item/by-package-item-id/{packageItemId}
     * @secure
     */
    factoryPackageItemControllerFindOneByPackageItemIdV1: (
      packageItemId: string,
      params: RequestParams = {}
    ) =>
      this.request<PackageItemResponseDto, void>({
        path: `/backend/v1/factory/farm/package-item/by-package-item-id/${packageItemId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve sale lots for a specific farm associated with the factory
     *
     * @tags Factory
     * @name FactorySaleLotControllerFindByFarmIdV1
     * @summary Get sale lots by farm ID
     * @request GET:/backend/v1/factory/sale-lots/by-farm/{farmId}
     * @secure
     */
    factorySaleLotControllerFindByFarmIdV1: (
      farmId: string,
      query?: {
        /**
         * Filter by specific farm ID
         * @example "cm3q8j9k0000114txhqz0abcd"
         */
        farm_id?: string;
        /**
         * Filter by collector organization ID
         * @example "cm3q8j9k0000114txhqz0abcd"
         */
        collector_org_id?: string;
        /**
         * Filter by variety (partial match)
         * @example "Arabica"
         */
        variety?: string;
        /**
         * Filter by sale lot status
         * @example "WAITING_TO_COLLECT"
         */
        status?:
          | 'WAITING_TO_COLLECT'
          | 'COLLECTED'
          | 'IN_TRANSIT'
          | 'ARRIVED_AT_FACTORY'
          | 'INTAKE'
          | 'CANCELLED';
        /**
         * Filter by date from (YYYY-MM-DD)
         * @example "2024-01-01"
         */
        date_from?: string;
        /**
         * Filter by date to (YYYY-MM-DD)
         * @example "2024-12-31"
         */
        date_to?: string;
        /**
         * Filter by pick up date from (YYYY-MM-DD)
         * @example "2024-01-20"
         */
        pickup_date_from?: string;
        /**
         * Filter by pick up date to (YYYY-MM-DD)
         * @example "2024-01-25"
         */
        pickup_date_to?: string;
        /**
         * Search in variety, farmer name, or sale lot ID
         * @example "arabica farmer"
         */
        search?: string;
        /**
         * Include deleted sale lots (admin only)
         * @example false
         */
        include_deleted?: boolean;
        /**
         * Filter by binned status: true = only binned lots, false = only not binned lots, undefined = all
         * @example true
         */
        is_binned?: boolean;
        /**
         * Page number for pagination (1-based, alternative to skip)
         * @example 1
         */
        page?: number;
        /**
         * Number of records to skip for pagination (alternative to page)
         * @example 0
         */
        skip?: number;
        /**
         * Number of records to return (max 100)
         * @example 10
         */
        limit?: number;
        /**
         * Field to sort by
         * @example "created_at"
         */
        sort_by?: string;
        /**
         * Sort order
         * @example "desc"
         */
        sort_order?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedSaleLotResponseDto, void>({
        path: `/backend/v1/factory/sale-lots/by-farm/${farmId}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed information about a specific sale lot
     *
     * @tags Factory
     * @name FactorySaleLotControllerFindOneV1
     * @summary Get sale lot by ID
     * @request GET:/backend/v1/factory/sale-lots/{id}
     * @secure
     */
    factorySaleLotControllerFindOneV1: (id: string, params: RequestParams = {}) =>
      this.request<FactorySaleLotDetailResponse, void>({
        path: `/backend/v1/factory/sale-lots/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed farm information associated with a specific sale lot including farm areas, certificates, production data, and boundary points
     *
     * @tags Factory
     * @name FactorySaleLotControllerGetSaleLotFarmInfoV1
     * @summary Get comprehensive farm information for a sale lot
     * @request GET:/backend/v1/factory/sale-lots/{id}/farm-info
     * @secure
     */
    factorySaleLotControllerGetSaleLotFarmInfoV1: (id: string, params: RequestParams = {}) =>
      this.request<SaleLotFarmInfoResponseDto, void>({
        path: `/backend/v1/factory/sale-lots/${id}/farm-info`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed information for a contributing farm in a sale lot accessible by the authenticated factory user
     *
     * @tags Factory
     * @name FactorySaleLotControllerGetContributingFarmDetailV1
     * @summary Get contributing farm detail by farm ID for a sale lot
     * @request GET:/backend/v1/factory/sale-lots/{id}/farms/{farmId}
     * @secure
     */
    factorySaleLotControllerGetContributingFarmDetailV1: (
      id: string,
      farmId: string,
      params: RequestParams = {}
    ) =>
      this.request<SaleLotContributingFarmDetailResponseDto, void>({
        path: `/backend/v1/factory/sale-lots/${id}/farms/${farmId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Factory
     * @name FactorySaleLotControllerCreateV1
     * @summary Create a new sale lot with multiple package items
     * @request POST:/backend/v1/factory/sale-lots
     * @secure
     */
    factorySaleLotControllerCreateV1: (data: FactoryCreateSaleLotDto, params: RequestParams = {}) =>
      this.request<CreateSaleLotResponseDto, void>({
        path: `/backend/v1/factory/sale-lots`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new processing bin specifically from sale lots in INTAKE status. Can include all available INTAKE lots or specific ones.
     *
     * @tags Factory
     * @name FactoryBinControllerCreateBinFromIntakeV1
     * @summary Create bin from INTAKE sale lots
     * @request POST:/backend/v1/factory/coffee-mill/bins/from-intake
     * @secure
     */
    factoryBinControllerCreateBinFromIntakeV1: (
      data: CreateBinFromIntakeDto,
      params: RequestParams = {}
    ) =>
      this.request<CreateBinFromIntakeResponseDto, void>({
        path: `/backend/v1/factory/coffee-mill/bins/from-intake`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new bin to combine multiple sale lots for processing. Only accessible by Factory Admin and Coffee Mill Operation roles.
     *
     * @tags Factory
     * @name FactoryBinControllerCreateBinV1
     * @summary Create a new processing bin
     * @request POST:/backend/v1/factory/coffee-mill/bins
     * @secure
     */
    factoryBinControllerCreateBinV1: (data: CreateFactoryBinDto, params: RequestParams = {}) =>
      this.request<FactoryBinDetailResponse, void>({
        path: `/backend/v1/factory/coffee-mill/bins`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all bins for the factory with optional filtering and pagination
     *
     * @tags Factory
     * @name FactoryBinControllerGetBinsV1
     * @summary Get all factory bins
     * @request GET:/backend/v1/factory/coffee-mill/bins
     * @secure
     */
    factoryBinControllerGetBinsV1: (
      query?: {
        /**
         * Page number for pagination
         * @example 1
         */
        page?: number;
        /**
         * Number of items per page
         * @example 10
         */
        limit?: number;
        /**
         * Filter by bin status
         * @example "PENDING"
         */
        status?: 'PENDING' | 'IN_PROCESS' | 'COMPLETED';
        /**
         * Search by bin ID
         * @example "BIN-2024"
         */
        search?: string;
        /**
         * Filter by palette identifier
         * @example "PALETTE-001"
         */
        palette?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedFactoryBinResponseDto, any>({
        path: `/backend/v1/factory/coffee-mill/bins`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed information about a specific bin including list of farms
     *
     * @tags Factory
     * @name FactoryBinControllerGetBinByIdV1
     * @summary Get bin by ID
     * @request GET:/backend/v1/factory/coffee-mill/bins/{id}
     * @secure
     */
    factoryBinControllerGetBinByIdV1: (id: string, params: RequestParams = {}) =>
      this.request<FactoryBinDetailResponse, void>({
        path: `/backend/v1/factory/coffee-mill/bins/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve lightweight list of farms (id and fid only) for tabs/dropdown navigation. Use GET /bins/:id/farms/:farmId for full farm details.
     *
     * @tags Factory
     * @name FactoryBinControllerGetBinFarmsSummaryV1
     * @summary Get farms summary for a bin
     * @request GET:/backend/v1/factory/coffee-mill/bins/{id}/farms
     * @secure
     */
    factoryBinControllerGetBinFarmsSummaryV1: (id: string, params: RequestParams = {}) =>
      this.request<BinFarmsSummaryResponseDto, void>({
        path: `/backend/v1/factory/coffee-mill/bins/${id}/farms`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed farm information including coordinates, area, production, and compliance status. Called when user selects a farm tab.
     *
     * @tags Factory
     * @name FactoryBinControllerGetBinFarmDetailV1
     * @summary Get farm details for a bin
     * @request GET:/backend/v1/factory/coffee-mill/bins/{id}/farms/{farmId}
     * @secure
     */
    factoryBinControllerGetBinFarmDetailV1: (
      id: string,
      farmId: string,
      params: RequestParams = {}
    ) =>
      this.request<BinFarmDetailDto, void>({
        path: `/backend/v1/factory/coffee-mill/bins/${id}/farms/${farmId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update the processing status of a bin (PENDING, IN_PROCESS, COMPLETED). Only accessible by Factory Admin and Coffee Mill Operation roles.
     *
     * @tags Factory
     * @name FactoryBinControllerUpdateBinStatusV1
     * @summary Update bin status
     * @request PUT:/backend/v1/factory/coffee-mill/bins/{id}/status
     * @secure
     */
    factoryBinControllerUpdateBinStatusV1: (
      id: string,
      data: UpdateFactoryBinStatusDto,
      params: RequestParams = {}
    ) =>
      this.request<FactoryBinDetailResponse, void>({
        path: `/backend/v1/factory/coffee-mill/bins/${id}/status`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve sale lots in a bin with optional filtering and pagination
     *
     * @tags Factory
     * @name FactoryBinControllerGetBinSaleLotsV1
     * @summary Get sale lots in a bin
     * @request GET:/backend/v1/factory/coffee-mill/bins/{id}/sale-lots
     * @secure
     */
    factoryBinControllerGetBinSaleLotsV1: (
      id: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<BinSaleLotsResponseDto, any>({
        path: `/backend/v1/factory/coffee-mill/bins/${id}/sale-lots`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Remove a specific sale lot from a bin. Only accessible by Factory Admin and Coffee Mill Operation roles.
     *
     * @tags Factory
     * @name FactoryBinControllerRemoveSaleLotFromBinV1
     * @summary Remove sale lot from bin
     * @request DELETE:/backend/v1/factory/coffee-mill/bins/{id}/sale-lots/{saleLotId}
     * @secure
     */
    factoryBinControllerRemoveSaleLotFromBinV1: (
      id: string,
      saleLotId: string,
      params: RequestParams = {}
    ) =>
      this.request<FactoryBinDetailResponse, void>({
        path: `/backend/v1/factory/coffee-mill/bins/${id}/sale-lots/${saleLotId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated list of shipments for the factory with filtering capabilities
     *
     * @tags Factory
     * @name FactoryShipmentControllerFindAllV1
     * @summary Get all shipments for factory
     * @request GET:/backend/v1/factory/coffee-mill/shipments
     * @secure
     */
    factoryShipmentControllerFindAllV1: (
      query?: {
        /**
         * Page number for pagination
         * @example 1
         */
        page?: number;
        /**
         * Number of items per page
         * @example 10
         */
        limit?: number;
        /**
         * Filter by shipment status
         * @example "IN_TRANSIT"
         */
        status?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedFactoryShipmentResponseDto, void>({
        path: `/backend/v1/factory/coffee-mill/shipments`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed information about a specific shipment
     *
     * @tags Factory
     * @name FactoryShipmentControllerFindOneV1
     * @summary Get shipment by ID
     * @request GET:/backend/v1/factory/coffee-mill/shipments/{id}
     * @secure
     */
    factoryShipmentControllerFindOneV1: (id: string, params: RequestParams = {}) =>
      this.request<FactoryShipmentDetailResponseDto, void>({
        path: `/backend/v1/factory/coffee-mill/shipments/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Mark a shipment as received and update all associated sale lots to INTAKE status
     *
     * @tags Factory
     * @name FactoryShipmentControllerReceiveShipmentV1
     * @summary Receive shipment at factory
     * @request PUT:/backend/v1/factory/coffee-mill/shipments/{id}/receive
     * @secure
     */
    factoryShipmentControllerReceiveShipmentV1: (
      id: string,
      data: ReceiveShipmentDto,
      params: RequestParams = {}
    ) =>
      this.request<ReceiveShipmentResponseDto, void>({
        path: `/backend/v1/factory/coffee-mill/shipments/${id}/receive`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated list of all collectors in the system with filtering and search capabilities
     *
     * @tags Factory
     * @name FactoryCollectorControllerFindAllCollectorsV1
     * @summary Get all collectors in the system
     * @request GET:/backend/v1/factory/collectors
     * @secure
     */
    factoryCollectorControllerFindAllCollectorsV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Search by collector full name or email
         * @example "John Smith"
         */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedFactoryCollectorResponseDto, void>({
        path: `/backend/v1/factory/collectors`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed information about a specific collector in the system
     *
     * @tags Factory
     * @name FactoryCollectorControllerFindCollectorByIdV1
     * @summary Get collector details by ID
     * @request GET:/backend/v1/factory/collectors/{id}
     * @secure
     */
    factoryCollectorControllerFindCollectorByIdV1: (id: string, params: RequestParams = {}) =>
      this.request<FactoryCollectorDetailResponseDto, void>({
        path: `/backend/v1/factory/collectors/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated list of sale lots that belong to the user's factory (factory_id matches). Only shows sale lots assigned to this specific factory.
     *
     * @tags Factory
     * @name FactoryCoffeeMillControllerFindAllFactorySaleLotsV1
     * @summary Get all sale lots for coffee mill factory
     * @request GET:/backend/v1/factory/coffee-mill/sale-lots
     * @secure
     */
    factoryCoffeeMillControllerFindAllFactorySaleLotsV1: (
      query?: {
        /**
         * Filter by specific farm ID
         * @example "cm3q8j9k0000114txhqz0abcd"
         */
        farm_id?: string;
        /**
         * Filter by collector organization ID
         * @example "cm3q8j9k0000114txhqz0abcd"
         */
        collector_org_id?: string;
        /**
         * Filter by variety (partial match)
         * @example "Arabica"
         */
        variety?: string;
        /**
         * Filter by sale lot status
         * @example "WAITING_TO_COLLECT"
         */
        status?:
          | 'WAITING_TO_COLLECT'
          | 'COLLECTED'
          | 'IN_TRANSIT'
          | 'ARRIVED_AT_FACTORY'
          | 'INTAKE'
          | 'CANCELLED';
        /**
         * Filter by date from (YYYY-MM-DD)
         * @example "2024-01-01"
         */
        date_from?: string;
        /**
         * Filter by date to (YYYY-MM-DD)
         * @example "2024-12-31"
         */
        date_to?: string;
        /**
         * Filter by pick up date from (YYYY-MM-DD)
         * @example "2024-01-20"
         */
        pickup_date_from?: string;
        /**
         * Filter by pick up date to (YYYY-MM-DD)
         * @example "2024-01-25"
         */
        pickup_date_to?: string;
        /**
         * Search in variety, farmer name, or sale lot ID
         * @example "arabica farmer"
         */
        search?: string;
        /**
         * Include deleted sale lots (admin only)
         * @example false
         */
        include_deleted?: boolean;
        /**
         * Filter by binned status: true = only binned lots, false = only not binned lots, undefined = all
         * @example true
         */
        is_binned?: boolean;
        /**
         * Page number for pagination (1-based, alternative to skip)
         * @example 1
         */
        page?: number;
        /**
         * Number of records to skip for pagination (alternative to page)
         * @example 0
         */
        skip?: number;
        /**
         * Number of records to return (max 100)
         * @example 10
         */
        limit?: number;
        /**
         * Field to sort by
         * @example "created_at"
         */
        sort_by?: string;
        /**
         * Sort order
         * @example "desc"
         */
        sort_order?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedFactoryCoffeeMillSaleLotResponseDto, void>({
        path: `/backend/v1/factory/coffee-mill/sale-lots`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update multiple sale lots from ARRIVED_AT_FACTORY status to INTAKE status. Restricted to coffee mill operations and factory admin users.
     *
     * @tags Factory
     * @name FactoryCoffeeMillControllerBulkUpdateToIntakeV1
     * @summary Bulk update sale lot status to INTAKE
     * @request PUT:/backend/v1/factory/coffee-mill/sale-lots/bulk-intake
     * @secure
     */
    factoryCoffeeMillControllerBulkUpdateToIntakeV1: (
      data: BulkUpdateSaleLotStatusDto,
      params: RequestParams = {}
    ) =>
      this.request<BulkUpdateSaleLotStatusResponseDto, void>({
        path: `/backend/v1/factory/coffee-mill/sale-lots/bulk-intake`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new processing record for a bin. Each bin can have multiple processing steps like sorting, drying, cleaning, etc.
     *
     * @tags Factory
     * @name FactoryBinProcessingControllerCreateBinProcessingV1
     * @summary Create a new bin processing record
     * @request POST:/backend/v1/factory/coffee-mill/bin-processing
     * @secure
     */
    factoryBinProcessingControllerCreateBinProcessingV1: (
      data: CreateBinProcessingDto,
      params: RequestParams = {}
    ) =>
      this.request<BinProcessingResponse, void>({
        path: `/backend/v1/factory/coffee-mill/bin-processing`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all bin processing records for the factory with optional filtering by bin, processing type, or status.
     *
     * @tags Factory
     * @name FactoryBinProcessingControllerFindAllBinProcessingV1
     * @summary Get all bin processing records with pagination
     * @request GET:/backend/v1/factory/coffee-mill/bin-processing
     * @secure
     */
    factoryBinProcessingControllerFindAllBinProcessingV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Filter by bin ID
         * @example "clh1234567890abcdef123456"
         */
        bin_id?: string;
        /**
         * Filter by processing type
         * @example "SORTING"
         */
        processing_name?: 'SORTING' | 'DRYING' | 'CLEANING' | 'COLOR_SORTING' | 'PACKAGING';
        /**
         * Filter by processing status
         * @example "TODO"
         */
        status?: 'TODO' | 'INPROGRESS' | 'COMPLETED';
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedBinProcessingResponseDto, void>({
        path: `/backend/v1/factory/coffee-mill/bin-processing`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed information about a specific bin processing record including associated bin data.
     *
     * @tags Factory
     * @name FactoryBinProcessingControllerFindOneBinProcessingV1
     * @summary Get a specific bin processing record by ID
     * @request GET:/backend/v1/factory/coffee-mill/bin-processing/{id}
     * @secure
     */
    factoryBinProcessingControllerFindOneBinProcessingV1: (
      id: string,
      params: RequestParams = {}
    ) =>
      this.request<BinProcessingDetailResponse, void>({
        path: `/backend/v1/factory/coffee-mill/bin-processing/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update the status, dates, or notes of an existing bin processing record. Only specific fields can be updated.
     *
     * @tags Factory
     * @name FactoryBinProcessingControllerUpdateBinProcessingV1
     * @summary Update a bin processing record
     * @request PUT:/backend/v1/factory/coffee-mill/bin-processing/{id}
     * @secure
     */
    factoryBinProcessingControllerUpdateBinProcessingV1: (
      id: string,
      data: UpdateBinProcessingDto,
      params: RequestParams = {}
    ) =>
      this.request<BinProcessingResponse, void>({
        path: `/backend/v1/factory/coffee-mill/bin-processing/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Soft delete a bin processing record. The record will be marked as deleted but not removed from the database.
     *
     * @tags Factory
     * @name FactoryBinProcessingControllerRemoveBinProcessingV1
     * @summary Delete a bin processing record
     * @request DELETE:/backend/v1/factory/coffee-mill/bin-processing/{id}
     * @secure
     */
    factoryBinProcessingControllerRemoveBinProcessingV1: (id: string, params: RequestParams = {}) =>
      this.request<BinProcessingResponse, void>({
        path: `/backend/v1/factory/coffee-mill/bin-processing/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Determines what processing step can be added next based on the sequential workflow. Returns null if no step can be added.
     *
     * @tags Factory
     * @name FactoryBinProcessingControllerGetNextAvailableProcessingStepV1
     * @summary Get the next available processing step for a bin
     * @request GET:/backend/v1/factory/coffee-mill/bin-processing/next-step/{binId}
     * @secure
     */
    factoryBinProcessingControllerGetNextAvailableProcessingStepV1: (
      binId: string,
      params: RequestParams = {}
    ) =>
      this.request<NextProcessingStepResponse, void>({
        path: `/backend/v1/factory/coffee-mill/bin-processing/next-step/${binId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Recalculate and update the bin status based on current processing steps. Useful for manual correction or debugging.
     *
     * @tags Factory
     * @name FactoryBinProcessingControllerRefreshBinStatusV1
     * @summary Manually refresh bin status based on processing steps
     * @request PUT:/backend/v1/factory/coffee-mill/bin-processing/refresh-bin-status/{binId}
     * @secure
     */
    factoryBinProcessingControllerRefreshBinStatusV1: (binId: string, params: RequestParams = {}) =>
      this.request<RefreshBinStatusResponse, void>({
        path: `/backend/v1/factory/coffee-mill/bin-processing/refresh-bin-status/${binId}`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get detailed information about bin status including all processing steps, their statuses, and the calculated bin status.
     *
     * @tags Factory
     * @name FactoryBinProcessingControllerGetBinStatusOverviewV1
     * @summary Get comprehensive bin status overview
     * @request GET:/backend/v1/factory/coffee-mill/bin-processing/bin-status-overview/{binId}
     * @secure
     */
    factoryBinProcessingControllerGetBinStatusOverviewV1: (
      binId: string,
      params: RequestParams = {}
    ) =>
      this.request<BinStatusOverviewResponse, void>({
        path: `/backend/v1/factory/coffee-mill/bin-processing/bin-status-overview/${binId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Generate bin packages based on total weight and desired package weight. Only available when the bin packaging step is INPROGRESS.
     *
     * @tags Factory
     * @name FactoryBinPackageControllerCreatePackagesV1
     * @summary Create bin packages for a bin
     * @request POST:/backend/v1/factory/bin-package
     * @secure
     */
    factoryBinPackageControllerCreatePackagesV1: (
      data: CreateFactoryBinPackagesDto,
      params: RequestParams = {}
    ) =>
      this.request<FactoryBinPackageBatchResponseDto, void>({
        path: `/backend/v1/factory/bin-package`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a paginated list of all packages for the factory, with optional filters: bin ID, search by package ID (partial match), status, and variety.
     *
     * @tags Factory
     * @name FactoryBinPackageControllerGetAllPackagesV1
     * @summary Get all bin packages
     * @request GET:/backend/v1/factory/bin-package
     * @secure
     */
    factoryBinPackageControllerGetAllPackagesV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Optional filter by bin ID
         * @example "cln8qkvp60000124wef8abcd0"
         */
        bin_id?: string;
        /**
         * Optional search by package ID (partial match, case-insensitive)
         * @example "PK_AGN38YEKK3"
         */
        search?: string;
        /**
         * Optional filter by package status
         * @example "WAITING_FOR_SCAN"
         */
        status?: 'WAITING_FOR_SCAN' | 'READY' | 'PALLETIZED';
        /**
         * Optional filter by coffee variety
         * @example "Arabica"
         */
        variety?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedFactoryBinPackageResponseDto, void>({
        path: `/backend/v1/factory/bin-package`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a paginated list of packages generated for a specific bin, along with packaged and remaining weight metrics.
     *
     * @tags Factory
     * @name FactoryBinPackageControllerListPackagesV1
     * @summary List bin packages by bin ID
     * @request GET:/backend/v1/factory/bin-package/bin/{binId}
     * @secure
     */
    factoryBinPackageControllerListPackagesV1: (
      binId: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Optional filter by package status
         * @example "WAITING_FOR_SCAN"
         */
        status?: 'WAITING_FOR_SCAN' | 'READY' | 'PALLETIZED';
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedFactoryBinPackageResponseDto, void>({
        path: `/backend/v1/factory/bin-package/bin/${binId}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed information for a specific bin package.
     *
     * @tags Factory
     * @name FactoryBinPackageControllerGetPackageV1
     * @summary Get bin package detail
     * @request GET:/backend/v1/factory/bin-package/{id}
     * @secure
     */
    factoryBinPackageControllerGetPackageV1: (id: string, params: RequestParams = {}) =>
      this.request<FactoryBinPackageResponseDto, void>({
        path: `/backend/v1/factory/bin-package/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update the status of a single bin package. Valid statuses are WAITING_FOR_SCAN and READY.
     *
     * @tags Factory
     * @name FactoryBinPackageControllerUpdateStatusV1
     * @summary Update bin package status
     * @request PATCH:/backend/v1/factory/bin-package/{id}/status
     * @secure
     */
    factoryBinPackageControllerUpdateStatusV1: (
      id: string,
      data: UpdateFactoryBinPackageStatusDto,
      params: RequestParams = {}
    ) =>
      this.request<FactoryBinPackageStatusUpdateResponseDto, void>({
        path: `/backend/v1/factory/bin-package/${id}/status`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Shadow/shortcut flow: Creates a QUICK status bin and converts package_items to bin_packages without processing steps. Skips normal bin workflow.
     *
     * @tags Factory
     * @name FactoryBinPackageControllerQuickCreateV1
     * @summary Create quick bin packages from sale lots
     * @request POST:/backend/v1/factory/bin-package/quick-create
     * @secure
     */
    factoryBinPackageControllerQuickCreateV1: (
      data: CreateQuickBinDto,
      params: RequestParams = {}
    ) =>
      this.request<FactoryBinPackageBatchResponseDto, void>({
        path: `/backend/v1/factory/bin-package/quick-create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update the status of multiple bin packages that belong to the same bin.
     *
     * @tags Factory
     * @name FactoryBinPackageControllerBulkUpdateStatusV1
     * @summary Bulk update bin package statuses
     * @request PATCH:/backend/v1/factory/bin-package/status/bulk
     * @secure
     */
    factoryBinPackageControllerBulkUpdateStatusV1: (
      data: BulkUpdateFactoryBinPackageStatusDto,
      params: RequestParams = {}
    ) =>
      this.request<FactoryBinPackageBatchResponseDto, void>({
        path: `/backend/v1/factory/bin-package/status/bulk`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a pallet by selecting ready packages and providing warehouse storage information. All selected packages must belong to the same bin and be in READY status.
     *
     * @tags Factory
     * @name FactoryPalletControllerCreatePalletV1
     * @summary Create a new pallet from ready packages
     * @request POST:/backend/v1/factory/pallet
     * @secure
     */
    factoryPalletControllerCreatePalletV1: (
      data: CreateFactoryPalletDto,
      params: RequestParams = {}
    ) =>
      this.request<FactoryPalletResponseDto, void>({
        path: `/backend/v1/factory/pallet`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a paginated list of pallets created by the factory. Supports search by pallet ID and filtering by bin ID, bag type, variety, and status.
     *
     * @tags Factory
     * @name FactoryPalletControllerListPalletsV1
     * @summary List pallets with pagination and filters
     * @request GET:/backend/v1/factory/pallet
     * @secure
     */
    factoryPalletControllerListPalletsV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Search by pallet ID
         * @example "PL-2025-ABC123"
         */
        search?: string;
        /**
         * Filter by bin ID
         * @example "BIN-2025-ABC001"
         */
        bin_id?: string;
        /**
         * Filter by bag type
         * @example "Jute Bag"
         */
        bag_type?: string;
        /**
         * Filter by coffee variety
         * @example "Arabica"
         */
        variety?: string;
        /**
         * Filter by pallet status
         * @example "IN_STORE"
         */
        status?: 'IN_STORE' | 'READY_TO_EXPORT' | 'EXPORTED';
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedFactoryPalletResponseDto, void>({
        path: `/backend/v1/factory/pallet`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed information about a specific pallet, including all associated packages.
     *
     * @tags Factory
     * @name FactoryPalletControllerGetPalletByIdV1
     * @summary Get pallet details by ID
     * @request GET:/backend/v1/factory/pallet/{palletId}
     * @secure
     */
    factoryPalletControllerGetPalletByIdV1: (palletId: string, params: RequestParams = {}) =>
      this.request<FactoryPalletDetailResponseDto, void>({
        path: `/backend/v1/factory/pallet/${palletId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Upload a document and associate it with a factory entity (BIN, FARM, LOT, SHIPMENT, or PALLET). Only factory owners, sustainability team members, and factory admins can upload documents.
     *
     * @tags Factory
     * @name FactoryDocumentControllerUploadDocumentV1
     * @summary Upload a new factory document
     * @request POST:/backend/v1/factory/document
     * @secure
     */
    factoryDocumentControllerUploadDocumentV1: (
      data: UploadFactoryDocumentDto,
      params: RequestParams = {}
    ) =>
      this.request<FactoryDocumentResponseDto, void>({
        path: `/backend/v1/factory/document`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all documents associated with factory entities. Supports search, filtering by entity type and associated ID.
     *
     * @tags Factory
     * @name FactoryDocumentControllerGetDocumentsV1
     * @summary Get factory documents with pagination and filtering
     * @request GET:/backend/v1/factory/document
     * @secure
     */
    factoryDocumentControllerGetDocumentsV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Search by document name
         * @example "QC Report"
         */
        search?: string;
        /**
         * Filter documents by farm ID
         * @example "clh5x8k2a0000abcd1234efgh"
         */
        farm_id?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedFactoryDocumentResponseDto, void>({
        path: `/backend/v1/factory/document`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Soft delete a document from the system. This also removes it from S3 storage.
     *
     * @tags Factory
     * @name FactoryDocumentControllerDeleteDocumentV1
     * @summary Delete a factory document
     * @request DELETE:/backend/v1/factory/document/{id}
     * @secure
     */
    factoryDocumentControllerDeleteDocumentV1: (id: string, params: RequestParams = {}) =>
      this.request<DeleteFactoryDocumentResponseDto, void>({
        path: `/backend/v1/factory/document/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create an export lot by selecting pallets and providing shipment details. All selected pallets must be in IN_STORE status and belong to the same factory. When created, pallet status will be updated to READY_TO_EXPORT. The export_id, total_weight and total_pallets are auto-calculated.
     *
     * @tags Factory
     * @name FactoryExportLotControllerCreateExportLotV1
     * @summary Create a new export lot from pallets
     * @request POST:/backend/v1/factory/export-lot
     * @secure
     */
    factoryExportLotControllerCreateExportLotV1: (
      data: CreateFactoryExportLotDto,
      params: RequestParams = {}
    ) =>
      this.request<ExportLotListItemDto, void>({
        path: `/backend/v1/factory/export-lot`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a paginated list of export lots for the current factory. Supports filtering by export lot ID, variety, and status.
     *
     * @tags Factory
     * @name FactoryExportLotControllerListExportLotsV1
     * @summary Get list of export lots with optional filtering
     * @request GET:/backend/v1/factory/export-lot
     * @secure
     */
    factoryExportLotControllerListExportLotsV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Filter by export lot ID (partial match, case-insensitive)
         * @example "LOT-2025-ABC12345"
         */
        lot_id?: string;
        /**
         * Filter by coffee variety
         * @example "Arabica"
         */
        variety?: string;
        /**
         * Filter by one or more export lot statuses
         * @example ["READY_TO_EXPORT","SHIPPING"]
         */
        status?: ('READY_TO_EXPORT' | 'SHIPPING' | 'COMPLETED')[];
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedExportLotResponseDto, void>({
        path: `/backend/v1/factory/export-lot`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a paginated list of importer organizations.
     *
     * @tags Factory
     * @name FactoryExportLotControllerFindImporterOrganizationsV1
     * @summary Find importer organizations
     * @request GET:/backend/v1/factory/export-lot/importers
     * @secure
     */
    factoryExportLotControllerFindImporterOrganizationsV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Filter by organization name (partial match, case-insensitive)
         * @example "Global Coffee"
         */
        name?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedOrganizationResponseDto, void>({
        path: `/backend/v1/factory/export-lot/importers`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a paginated list of exporter organizations.
     *
     * @tags Factory
     * @name FactoryExportLotControllerFindExporterOrganizationsV1
     * @summary Find exporter organizations
     * @request GET:/backend/v1/factory/export-lot/exporters
     * @secure
     */
    factoryExportLotControllerFindExporterOrganizationsV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Filter by organization name (partial match, case-insensitive)
         * @example "Global Coffee"
         */
        name?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedOrganizationResponseDto, void>({
        path: `/backend/v1/factory/export-lot/exporters`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed information about an export lot including pallets and inspection information.
     *
     * @tags Factory
     * @name FactoryExportLotControllerGetExportLotDetailsV1
     * @summary Get export lot details by id
     * @request GET:/backend/v1/factory/export-lot/{id}
     * @secure
     */
    factoryExportLotControllerGetExportLotDetailsV1: (id: string, params: RequestParams = {}) =>
      this.request<FactoryExportLotResponseDto, void>({
        path: `/backend/v1/factory/export-lot/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update the inspection details (inspector name, inspection date, and sterilization status) of an export lot. All fields are required.
     *
     * @tags Factory
     * @name FactoryExportLotControllerUpdateExportLotInspectionV1
     * @summary Update export lot inspection information
     * @request PUT:/backend/v1/factory/export-lot/{id}/inspection
     * @secure
     */
    factoryExportLotControllerUpdateExportLotInspectionV1: (
      id: string,
      data: UpdateExportLotInspectionDto,
      params: RequestParams = {}
    ) =>
      this.request<FactoryExportLotResponseDto, void>({
        path: `/backend/v1/factory/export-lot/${id}/inspection`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all pallets associated with a specific export lot.
     *
     * @tags Factory
     * @name FactoryExportLotControllerGetExportLotPalletsV1
     * @summary Get all pallets for an export lot
     * @request GET:/backend/v1/factory/export-lot/{id}/pallets
     * @secure
     */
    factoryExportLotControllerGetExportLotPalletsV1: (id: string, params: RequestParams = {}) =>
      this.request<ExportLotPalletDto[], void>({
        path: `/backend/v1/factory/export-lot/${id}/pallets`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve lightweight list of farms (id and fid only) for tabs/dropdown navigation. Use GET /export-lot/:id/farms/:farmId for full farm details.
     *
     * @tags Factory
     * @name FactoryExportLotControllerGetExportLotFarmsSummaryV1
     * @summary Get farms summary for an export lot
     * @request GET:/backend/v1/factory/export-lot/{id}/farms
     * @secure
     */
    factoryExportLotControllerGetExportLotFarmsSummaryV1: (
      id: string,
      params: RequestParams = {}
    ) =>
      this.request<ExportLotFarmsSummaryResponseDto, void>({
        path: `/backend/v1/factory/export-lot/${id}/farms`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed farm information including coordinates, area, production, and compliance status. Called when user selects a farm tab.
     *
     * @tags Factory
     * @name FactoryExportLotControllerGetExportLotFarmDetailV1
     * @summary Get farm details for an export lot
     * @request GET:/backend/v1/factory/export-lot/{id}/farms/{farmId}
     * @secure
     */
    factoryExportLotControllerGetExportLotFarmDetailV1: (
      id: string,
      farmId: string,
      params: RequestParams = {}
    ) =>
      this.request<ExportLotFarmDetailDto, void>({
        path: `/backend/v1/factory/export-lot/${id}/farms/${farmId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Factory
     * @name FactoryControllerGetFactoryInfo
     * @summary Get factory information
     * @request GET:/backend/factory/info
     * @secure
     */
    factoryControllerGetFactoryInfo: (params: RequestParams = {}) =>
      this.request<FactoryInfoResponseDto, void>({
        path: `/backend/factory/info`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Factory
     * @name FactoryControllerUpdateFactoryInfo
     * @summary Update factory information
     * @request PATCH:/backend/factory/info
     * @secure
     */
    factoryControllerUpdateFactoryInfo: (data: UpdateFactoryInfoDto, params: RequestParams = {}) =>
      this.request<FactoryInfoResponseDto, void>({
        path: `/backend/factory/info`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Search for organizations by name with optional pagination
     *
     * @tags Factory
     * @name FactoryControllerSearchOrganizationsByName
     * @summary Search organizations by name
     * @request GET:/backend/factory/organizations
     * @secure
     */
    factoryControllerSearchOrganizationsByName: (
      query: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Organization type to filter by
         * @example "FARMER"
         */
        organization_type: 'FARMER' | 'COLLECTOR' | 'FACTORY' | 'EXPORTER' | 'IMPORTER';
        /**
         * Search term to find organizations by name
         * @example "Green Valley Farm"
         */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<OrganizationSearchResponse, void>({
        path: `/backend/factory/organizations`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerSigninV1
     * @summary Sign in a user
     * @request POST:/backend/v1/auth/signin
     */
    authControllerSigninV1: (data: SigninDto, params: RequestParams = {}) =>
      this.request<SigninResponseDto, void>({
        path: `/backend/v1/auth/signin`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerSignupV1
     * @summary Sign up a new farmer user and organization. (SIGNUP FARMER)
     * @request POST:/backend/v1/auth/signup
     */
    authControllerSignupV1: (data: SignupDto, params: RequestParams = {}) =>
      this.request<SignupResponseDto, void>({
        path: `/backend/v1/auth/signup`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerSignUpOrganizationV1
     * @summary Sign up organization (organization-only form)
     * @request POST:/backend/v1/auth/signup-organization
     */
    authControllerSignUpOrganizationV1: (data: SignupOrgDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/backend/v1/auth/signup-organization`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerGetUserProfileV1
     * @summary Get user profile
     * @request GET:/backend/v1/auth/profile
     * @secure
     */
    authControllerGetUserProfileV1: (params: RequestParams = {}) =>
      this.request<UserProfileDto, void>({
        path: `/backend/v1/auth/profile`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerUpdateProfileV1
     * @summary Update user profile
     * @request PUT:/backend/v1/auth/profile
     * @secure
     */
    authControllerUpdateProfileV1: (data: UpdateProfileDto, params: RequestParams = {}) =>
      this.request<UserProfileDto, void>({
        path: `/backend/v1/auth/profile`,
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
     * @tags Auth
     * @name AuthControllerRefreshTokenV1
     * @summary Refresh access token using a refresh token
     * @request POST:/backend/v1/auth/refresh
     */
    authControllerRefreshTokenV1: (data: RefreshTokenDto, params: RequestParams = {}) =>
      this.request<RefreshTokenResponseDto, void>({
        path: `/backend/v1/auth/refresh`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogoutV1
     * @summary Logout and revoke refresh token
     * @request POST:/backend/v1/auth/logout
     * @secure
     */
    authControllerLogoutV1: (data: LogoutDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/backend/v1/auth/logout`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerChangePasswordV1
     * @summary Change user password
     * @request PUT:/backend/v1/auth/change-password
     * @secure
     */
    authControllerChangePasswordV1: (data: ChangePasswordDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/backend/v1/auth/change-password`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Retrieve paginated list of sale lots assigned to the authenticated collector with filtering and search capabilities
     *
     * @tags Collector
     * @name CollectorSaleLotControllerFindAllSaleLotsV1
     * @summary Get all sale lots assigned to collector
     * @request GET:/backend/v1/collector/sale-lots
     * @secure
     */
    collectorSaleLotControllerFindAllSaleLotsV1: (
      query?: {
        /**
         * Filter by specific farm ID
         * @example "cm3q8j9k0000114txhqz0abcd"
         */
        farm_id?: string;
        /**
         * Filter by sale lot status
         * @example "WAITING_TO_COLLECT"
         */
        status?:
          | 'WAITING_TO_COLLECT'
          | 'COLLECTED'
          | 'IN_TRANSIT'
          | 'ARRIVED_AT_FACTORY'
          | 'INTAKE'
          | 'CANCELLED';
        /**
         * Filter by coffee variety
         * @example "Arabica"
         */
        variety?: string;
        /**
         * Filter sale lots from this date (YYYY-MM-DD)
         * @example "2024-01-15"
         */
        from_date?: string;
        /**
         * Filter sale lots until this date (YYYY-MM-DD)
         * @example "2024-01-20"
         */
        to_date?: string;
        /**
         * Search in variety, farmer name, farm address, or sale lot ID
         * @example "arabica farmer"
         */
        search?: string;
        /**
         * Include deleted sale lots (admin only)
         * @example false
         */
        include_deleted?: boolean;
        /**
         * Page number for pagination (starts from 1)
         * @example 1
         */
        page?: number;
        /**
         * Number of records to skip for pagination
         * @example 0
         */
        skip?: number;
        /**
         * Number of records to return (max 100)
         * @example 10
         */
        limit?: number;
        /**
         * Field to sort by
         * @example "created_at"
         */
        sort_by?: string;
        /**
         * Sort order
         * @example "desc"
         */
        sort_order?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedCollectorSaleLotResponseDto, void>({
        path: `/backend/v1/collector/sale-lots`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed information about a specific sale lot assigned to the collector, including package items
     *
     * @tags Collector
     * @name CollectorSaleLotControllerFindOneSaleLotV1
     * @summary Get sale lot details by ID
     * @request GET:/backend/v1/collector/sale-lots/{id}
     * @secure
     */
    collectorSaleLotControllerFindOneSaleLotV1: (id: string, params: RequestParams = {}) =>
      this.request<CollectorSaleLotDetailResponse, void>({
        path: `/backend/v1/collector/sale-lots/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update the real weight of a sale lot as measured by the collector
     *
     * @tags Collector
     * @name CollectorSaleLotControllerUpdateRealWeightV1
     * @summary Update real weight of sale lot
     * @request PATCH:/backend/v1/collector/sale-lots/{id}/real-weight
     * @secure
     */
    collectorSaleLotControllerUpdateRealWeightV1: (
      id: string,
      data: UpdateRealWeightDto,
      params: RequestParams = {}
    ) =>
      this.request<UpdateRealWeightResponseDto, void>({
        path: `/backend/v1/collector/sale-lots/${id}/real-weight`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Mark a sale lot as collected, recording the actual weight and pickup time
     *
     * @tags Collector
     * @name CollectorSaleLotControllerCollectSaleLotV1
     * @summary Collect sale lot from farmer
     * @request PATCH:/backend/v1/collector/sale-lots/{id}/collect
     * @secure
     */
    collectorSaleLotControllerCollectSaleLotV1: (
      id: string,
      data: CollectSaleLotDto,
      params: RequestParams = {}
    ) =>
      this.request<CollectSaleLotResponseDto, void>({
        path: `/backend/v1/collector/sale-lots/${id}/collect`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve comprehensive statistics for the collector including total lots to collect, collected lots, and total farms
     *
     * @tags Collector
     * @name CollectorSaleLotControllerGetStatisticsV1
     * @summary Get collector statistics
     * @request GET:/backend/v1/collector/statistics
     * @secure
     */
    collectorSaleLotControllerGetStatisticsV1: (params: RequestParams = {}) =>
      this.request<CollectorStatisticsResponseDto, void>({
        path: `/backend/v1/collector/statistics`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed farm information associated with a specific sale lot assigned to the collector including farm areas, certificates, production data, and boundary points
     *
     * @tags Collector
     * @name CollectorSaleLotControllerGetSaleLotFarmInfoV1
     * @summary Get comprehensive farm information for a sale lot
     * @request GET:/backend/v1/collector/sale-lots/{id}/farm-info
     * @secure
     */
    collectorSaleLotControllerGetSaleLotFarmInfoV1: (id: string, params: RequestParams = {}) =>
      this.request<CollectorSaleLotFarmInfoResponseDto, void>({
        path: `/backend/v1/collector/sale-lots/${id}/farm-info`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed information for a contributing farm in a sale lot assigned to the authenticated collector
     *
     * @tags Collector
     * @name CollectorSaleLotControllerGetContributingFarmDetailV1
     * @summary Get contributing farm detail by farm ID for a sale lot
     * @request GET:/backend/v1/collector/sale-lots/{id}/farms/{farmId}
     * @secure
     */
    collectorSaleLotControllerGetContributingFarmDetailV1: (
      id: string,
      farmId: string,
      params: RequestParams = {}
    ) =>
      this.request<SaleLotContributingFarmDetailResponseDto, void>({
        path: `/backend/v1/collector/sale-lots/${id}/farms/${farmId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Allow collectors to update the actual measured weight for multiple package items in a sale lot assigned to them
     *
     * @tags Collector
     * @name CollectorSaleLotControllerBulkUpdatePackageWeightV1
     * @summary Bulk update actual weight for package items in a sale lot
     * @request PATCH:/backend/v1/collector/sale-lots/{id}/package-weights
     * @secure
     */
    collectorSaleLotControllerBulkUpdatePackageWeightV1: (
      id: string,
      data: BulkUpdatePackageWeightDto,
      params: RequestParams = {}
    ) =>
      this.request<BulkUpdatePackageWeightResponseDto, void>({
        path: `/backend/v1/collector/sale-lots/${id}/package-weights`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated list of shipments from farms associated with the factory
     *
     * @tags Collector
     * @name CollectorShipmentControllerFindAllShipmentsV1
     * @summary Get all shipments created by collector
     * @request GET:/backend/v1/collector/shipments
     * @secure
     */
    collectorShipmentControllerFindAllShipmentsV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /** Filter by shipment status */
        status?: 'PREPARING' | 'READY' | 'IN_TRANSIT' | 'DONE' | 'CANCELLED';
        /** Filter by factory ID */
        factory_id?: string;
        /**
         * Start date for shipment filter (ISO string)
         * @example "2025-01-01"
         */
        start_date?: string;
        /**
         * End date for shipment filter (ISO string)
         * @example "2025-12-31"
         */
        end_date?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedShipmentResponseDto, void>({
        path: `/backend/v1/collector/shipments`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new shipment containing one or multiple sale lots for delivery to a factory
     *
     * @tags Collector
     * @name CollectorShipmentControllerCreateShipmentV1
     * @summary Create a new shipment
     * @request POST:/backend/v1/collector/shipments
     * @secure
     */
    collectorShipmentControllerCreateShipmentV1: (
      data: CreateShipmentDto,
      params: RequestParams = {}
    ) =>
      this.request<CreateShipmentResponseDto, void>({
        path: `/backend/v1/collector/shipments`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed information about a specific shipment
     *
     * @tags Collector
     * @name CollectorShipmentControllerFindShipmentByIdV1
     * @summary Get shipment by ID
     * @request GET:/backend/v1/collector/shipments/{id}
     * @secure
     */
    collectorShipmentControllerFindShipmentByIdV1: (id: string, params: RequestParams = {}) =>
      this.request<ShipmentDetailDto, void>({
        path: `/backend/v1/collector/shipments/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Mark a shipment as in transit, indicating it has been dispatched to the factory
     *
     * @tags Collector
     * @name CollectorShipmentControllerShipShipmentV1
     * @summary Ship the shipment to factory
     * @request PUT:/backend/v1/collector/shipments/{id}/ship
     * @secure
     */
    collectorShipmentControllerShipShipmentV1: (
      id: string,
      data: ShipShipmentDto,
      params: RequestParams = {}
    ) =>
      this.request<ShipShipmentResponseDto, void>({
        path: `/backend/v1/collector/shipments/${id}/ship`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update the truck identifier for a shipment. Only shipments with READY status can be updated.
     *
     * @tags Collector
     * @name CollectorShipmentControllerUpdateTruckIdV1
     * @summary Update truck ID for shipment
     * @request PUT:/backend/v1/collector/shipments/{id}/truck
     * @secure
     */
    collectorShipmentControllerUpdateTruckIdV1: (
      id: string,
      data: UpdateTruckIdDto,
      params: RequestParams = {}
    ) =>
      this.request<UpdateTruckIdResponseDto, void>({
        path: `/backend/v1/collector/shipments/${id}/truck`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve comprehensive statistics for shipments created by the collector including ready, in transit, and delivered shipments with their total weights
     *
     * @tags Collector
     * @name CollectorShipmentControllerGetShipmentStatisticsV1
     * @summary Get collector shipment statistics
     * @request GET:/backend/v1/collector/shipments/statistics
     * @secure
     */
    collectorShipmentControllerGetShipmentStatisticsV1: (params: RequestParams = {}) =>
      this.request<CollectorShipmentStatisticsResponseDto, void>({
        path: `/backend/v1/collector/shipments/statistics`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve aggregated information about all farms that have sale lots in the specified shipment, including total weight and bags per farm
     *
     * @tags Collector
     * @name CollectorShipmentControllerGetFarmsInShipmentV1
     * @summary Get list of farms in a shipment
     * @request GET:/backend/v1/collector/shipments/{id}/farms
     * @secure
     */
    collectorShipmentControllerGetFarmsInShipmentV1: (id: string, params: RequestParams = {}) =>
      this.request<ShipmentFarmsResponseDto, void>({
        path: `/backend/v1/collector/shipments/${id}/farms`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated list of all factories in the system with filtering and search capabilities
     *
     * @tags Collector
     * @name CollectorFactoryControllerFindAllFactoriesV1
     * @summary Get all factories in the system
     * @request GET:/backend/v1/collector/factories
     * @secure
     */
    collectorFactoryControllerFindAllFactoriesV1: (
      query?: {
        /**
         * Number of items per page
         * @min 1
         * @max 100
         * @example 10
         */
        limit?: number;
        /**
         * Number of items to skip
         * @min 0
         * @example 0
         */
        skip?: number;
        /**
         * Search term for factory name or email
         * @example "Green Coffee"
         */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedCollectorFactoryResponseDto, void>({
        path: `/backend/v1/collector/factories`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed information about a specific factory in the system
     *
     * @tags Collector
     * @name CollectorFactoryControllerFindFactoryByIdV1
     * @summary Get factory details by ID
     * @request GET:/backend/v1/collector/factories/{id}
     * @secure
     */
    collectorFactoryControllerFindFactoryByIdV1: (id: string, params: RequestParams = {}) =>
      this.request<CollectorFactoryDetailResponseDto, void>({
        path: `/backend/v1/collector/factories/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collector
     * @name CollectorUserControllerCreateCollectorUserV1
     * @summary Create a collector sub-user (admin users only)
     * @request POST:/backend/v1/collector/users
     * @secure
     */
    collectorUserControllerCreateCollectorUserV1: (
      data: CreateCollectorUserDto,
      params: RequestParams = {}
    ) =>
      this.request<CollectorUserResponseDto, void>({
        path: `/backend/v1/collector/users`,
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
     * @tags Collector
     * @name CollectorUserControllerGetCollectorUsersV1
     * @summary Get collector sub-users with pagination (admin users only)
     * @request GET:/backend/v1/collector/users
     * @secure
     */
    collectorUserControllerGetCollectorUsersV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Filter by username (case insensitive partial match)
         * @example "john"
         */
        username?: string;
        /**
         * Filter by collector user role
         * @example "COLLECTOR_STAFF"
         */
        role?: 'COLLECTOR_ADMIN' | 'COLLECTOR_STAFF';
        /**
         * Filter by active status
         * @example true
         */
        is_active?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<CollectorUserPaginatedResponseDto, void>({
        path: `/backend/v1/collector/users`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Collector
     * @name CollectorUserControllerUpdateCollectorUserV1
     * @summary Update a collector sub-user (admin users only)
     * @request PUT:/backend/v1/collector/users/{id}
     * @secure
     */
    collectorUserControllerUpdateCollectorUserV1: (
      id: string,
      data: UpdateCollectorUserDto,
      params: RequestParams = {}
    ) =>
      this.request<CollectorUserResponseDto, void>({
        path: `/backend/v1/collector/users/${id}`,
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
     * @tags Collector
     * @name CollectorUserControllerDeleteCollectorUserV1
     * @summary Delete a collector sub-user (admin users only)
     * @request DELETE:/backend/v1/collector/users/{id}
     * @secure
     */
    collectorUserControllerDeleteCollectorUserV1: (id: string, params: RequestParams = {}) =>
      this.request<CollectorUserResponseDto, void>({
        path: `/backend/v1/collector/users/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve comprehensive dashboard statistics including farm info, lot tracking, production status, and inventory breakdown. Statistics are automatically updated and rolled over daily.
     *
     * @tags Factory Dashboard
     * @name DashboardControllerGetDashboardStats
     * @summary Get factory dashboard statistics
     * @request GET:/backend/factory/dashboard/stats
     * @secure
     */
    dashboardControllerGetDashboardStats: (params: RequestParams = {}) =>
      this.request<DashboardStatsResponseDto, void>({
        path: `/backend/factory/dashboard/stats`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Force an immediate update of the dashboard statistics (rollover, recalc and upsert) for the authenticated user's factory.
     *
     * @tags Factory Dashboard
     * @name DashboardControllerTriggerUpdateDashboardStats
     * @summary Trigger update of factory dashboard statistics
     * @request POST:/backend/factory/dashboard/stats/update
     * @secure
     */
    dashboardControllerTriggerUpdateDashboardStats: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/backend/factory/dashboard/stats/update`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * @description Retrieve monthly production data (received, processed, shipped) for the specified year. Defaults to current year if not specified.
     *
     * @tags Factory Dashboard
     * @name DashboardControllerGetMonthlyProduction
     * @summary Get monthly production overview
     * @request GET:/backend/factory/dashboard/production/monthly
     * @secure
     */
    dashboardControllerGetMonthlyProduction: (
      query?: {
        /**
         * Year for monthly production data
         * @example 2025
         */
        year?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<MonthlyProductionResponseDto, void>({
        path: `/backend/factory/dashboard/production/monthly`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Login endpoint for admin users
     *
     * @tags Admin
     * @name AdminControllerLoginV1
     * @summary Admin login
     * @request POST:/backend/v1/admin/login
     */
    adminControllerLoginV1: (data: AdminLoginDto, params: RequestParams = {}) =>
      this.request<AdminLoginResponseDto, void>({
        path: `/backend/v1/admin/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve the current authenticated admin user profile
     *
     * @tags Admin
     * @name AdminControllerGetProfileV1
     * @summary Get admin profile
     * @request GET:/backend/v1/admin/me
     * @secure
     */
    adminControllerGetProfileV1: (params: RequestParams = {}) =>
      this.request<AdminProfileResponseDto, void>({
        path: `/backend/v1/admin/me`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a list of roles
     *
     * @tags Admin
     * @name AdminControllerGetRolesV1
     * @summary Get roles
     * @request GET:/backend/v1/admin/roles
     * @secure
     */
    adminControllerGetRolesV1: (params: RequestParams = {}) =>
      this.request<OrganizationRolesResponseDto[], void>({
        path: `/backend/v1/admin/roles`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update farm type to STANDALONE, CENTRAL, or NEARBY (requires SUPER_ADMIN role)
     *
     * @tags Admin
     * @name AdminControllerUpdateFarmTypeV1
     * @summary Update farm type
     * @request PATCH:/backend/v1/admin/farms/{id}/type
     * @secure
     */
    adminControllerUpdateFarmTypeV1: (
      id: string,
      data: UpdateFarmTypeDto,
      params: RequestParams = {}
    ) =>
      this.request<UpdateFarmTypeResponseDto, void>({
        path: `/backend/v1/admin/farms/${id}/type`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated list of users with optional filters for username, full name, and organization type (requires SUPER_ADMIN role)
     *
     * @tags Admin
     * @name AdminUsersControllerGetUsersV1
     * @summary Get all users
     * @request GET:/backend/v1/admin/users
     * @secure
     */
    adminUsersControllerGetUsersV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Filter by username (partial match)
         * @example "john"
         */
        username?: string;
        /**
         * Filter by full name (partial match)
         * @example "John Doe"
         */
        full_name?: string;
        /**
         * Filter by organization type
         * @example "FARMER"
         */
        org_type?: 'FARMER' | 'COLLECTOR' | 'FACTORY' | 'EXPORTER' | 'IMPORTER';
      },
      params: RequestParams = {}
    ) =>
      this.request<UsersPaginatedResponseDto, void>({
        path: `/backend/v1/admin/users`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new user and assign them to an organization with a specific role (requires SUPER_ADMIN role)
     *
     * @tags Admin
     * @name AdminUsersControllerCreateUserV1
     * @summary Create user
     * @request POST:/backend/v1/admin/users
     * @secure
     */
    adminUsersControllerCreateUserV1: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<AdminUserResponseDto, void>({
        path: `/backend/v1/admin/users`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Generate draft package items (requires SUPER_ADMIN role)
     *
     * @tags Admin
     * @name AdminPackageItemsControllerGenerateDraftPackageItemsV1
     * @summary Generate draft package items
     * @request POST:/backend/v1/admin/package-items/draft
     * @secure
     */
    adminPackageItemsControllerGenerateDraftPackageItemsV1: (
      data: {
        number?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          message?: string;
          data?: object;
        },
        void
      >({
        path: `/backend/v1/admin/package-items/draft`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new organization (requires SUPER_ADMIN role)
     *
     * @tags Admin
     * @name AdminOrganizationsControllerCreateOrganizationV1
     * @summary Create organization
     * @request POST:/backend/v1/admin/organizations
     * @secure
     */
    adminOrganizationsControllerCreateOrganizationV1: (
      data: CreateOrganizationDto,
      params: RequestParams = {}
    ) =>
      this.request<OrganizationResponseDto, void>({
        path: `/backend/v1/admin/organizations`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve paginated list of organizations with optional name search (requires SUPER_ADMIN role)
     *
     * @tags Admin
     * @name AdminOrganizationsControllerGetOrganizationsV1
     * @summary Get organizations
     * @request GET:/backend/v1/admin/organizations
     * @secure
     */
    adminOrganizationsControllerGetOrganizationsV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Search term to filter organizations by name
         * @example "Green Valley"
         */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<AdminOrganizationsPaginatedResponseDto, void>({
        path: `/backend/v1/admin/organizations`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve details of a single organization by ID (requires SUPER_ADMIN role)
     *
     * @tags Admin
     * @name AdminOrganizationsControllerGetOrganizationByIdV1
     * @summary Get organization details
     * @request GET:/backend/v1/admin/organizations/{organization_id}
     * @secure
     */
    adminOrganizationsControllerGetOrganizationByIdV1: (
      organizationId: string,
      params: RequestParams = {}
    ) =>
      this.request<OrganizationResponseDto, void>({
        path: `/backend/v1/admin/organizations/${organizationId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update organization name, type, address, city, tax code, and active status (requires SUPER_ADMIN role)
     *
     * @tags Admin
     * @name AdminOrganizationsControllerUpdateOrganizationV1
     * @summary Update organization details
     * @request PATCH:/backend/v1/admin/organizations/{organization_id}
     * @secure
     */
    adminOrganizationsControllerUpdateOrganizationV1: (
      organizationId: string,
      data: UpdateOrganizationDto,
      params: RequestParams = {}
    ) =>
      this.request<OrganizationResponseDto, void>({
        path: `/backend/v1/admin/organizations/${organizationId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a paginated list of users belonging to a specific organization with optional full name search (requires SUPER_ADMIN role)
     *
     * @tags Admin
     * @name AdminOrganizationsControllerGetOrganizationUsersV1
     * @summary Get users of an organization
     * @request GET:/backend/v1/admin/organizations/{organization_id}/users
     * @secure
     */
    adminOrganizationsControllerGetOrganizationUsersV1: (
      organizationId: string,
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Search term to filter users by full name
         * @example "John Doe"
         */
        full_name?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<AdminOrganizationUsersPaginatedResponseDto, void>({
        path: `/backend/v1/admin/organizations/${organizationId}/users`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Deactivate a specific user that belongs to the given organization (requires SUPER_ADMIN role)
     *
     * @tags Admin
     * @name AdminOrganizationsControllerToggleOrganizationUserActiveV1
     * @summary Toggle user active status in an organization
     * @request PATCH:/backend/v1/admin/organizations/{organization_id}/users/{user_id}/toggle-active
     * @secure
     */
    adminOrganizationsControllerToggleOrganizationUserActiveV1: (
      organizationId: string,
      userId: string,
      params: RequestParams = {}
    ) =>
      this.request<AdminOrganizationUserResponseDto, void>({
        path: `/backend/v1/admin/organizations/${organizationId}/users/${userId}/toggle-active`,
        method: 'PATCH',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Backfill package_item_farm records for package items that were created before the package_item_farm table was introduced. This migration is idempotent and can be run multiple times safely.
     *
     * @tags Admin
     * @name AdminMigrationControllerMigratePackageItemFarmV1
     * @summary Migrate package_item_farm data
     * @request POST:/backend/v1/admin/migrations/package-item-farm
     * @secure
     */
    adminMigrationControllerMigratePackageItemFarmV1: (params: RequestParams = {}) =>
      this.request<MigratePackageItemFarmResponseDto, void>({
        path: `/backend/v1/admin/migrations/package-item-farm`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organizations
     * @name OrganizationsControllerGetOrganization
     * @request GET:/backend/public/organizations
     */
    organizationsControllerGetOrganization: (params: RequestParams = {}) =>
      this.request<OrganizationDetailResponseDto, any>({
        path: `/backend/public/organizations`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organizations
     * @name OrganizationsControllerGetOrganizationRoles
     * @request GET:/backend/public/organizations/roles
     */
    organizationsControllerGetOrganizationRoles: (params: RequestParams = {}) =>
      this.request<OrganizationRoleDto[], any>({
        path: `/backend/public/organizations/roles`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organizations
     * @name OrganizationsControllerCreateUserForOrganization
     * @request POST:/backend/organizations/users
     * @secure
     */
    organizationsControllerCreateUserForOrganization: (
      data: CreateOrganizationUserDto,
      params: RequestParams = {}
    ) =>
      this.request<CreateOrganizationUserResponseDto, any>({
        path: `/backend/organizations/users`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a paginated list of export lots for the current importer. Supports filtering by export lot ID, variety, and status.
     *
     * @tags Importer
     * @name ImporterExportLotControllerListExportLotsV1
     * @summary Get list of export lots with optional filtering
     * @request GET:/backend/v1/importer/export-lots
     * @secure
     */
    importerExportLotControllerListExportLotsV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Filter by export lot ID (partial match, case-insensitive)
         * @example "LOT-2025-ABC12345"
         */
        lot_id?: string;
        /**
         * Filter by coffee variety
         * @example "Arabica"
         */
        variety?: string;
        /**
         * Filter by one or more export lot statuses
         * @example ["READY_TO_EXPORT","SHIPPING"]
         */
        status?: ('READY_TO_EXPORT' | 'SHIPPING' | 'COMPLETED')[];
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedExportLotResponseDto, void>({
        path: `/backend/v1/importer/export-lots`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed information about an export lot including pallets and inspection information.
     *
     * @tags Importer
     * @name ImporterExportLotControllerGetExportLotDetailsV1
     * @summary Get export lot details by id
     * @request GET:/backend/v1/importer/export-lots/{id}
     * @secure
     */
    importerExportLotControllerGetExportLotDetailsV1: (id: string, params: RequestParams = {}) =>
      this.request<FactoryExportLotResponseDto, void>({
        path: `/backend/v1/importer/export-lots/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all pallets associated with a specific export lot.
     *
     * @tags Importer
     * @name ImporterExportLotControllerGetExportLotPalletsV1
     * @summary Get all pallets for an export lot
     * @request GET:/backend/v1/importer/export-lots/{id}/pallets
     * @secure
     */
    importerExportLotControllerGetExportLotPalletsV1: (id: string, params: RequestParams = {}) =>
      this.request<ExportLotPalletDto[], void>({
        path: `/backend/v1/importer/export-lots/${id}/pallets`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve lightweight list of farms (id and fid only) for tabs/dropdown navigation. Use GET /export-lot/:id/farms/:farmId for full farm details.
     *
     * @tags Importer
     * @name ImporterExportLotControllerGetExportLotFarmsSummaryV1
     * @summary Get farms summary for an export lot
     * @request GET:/backend/v1/importer/export-lots/{id}/farms
     * @secure
     */
    importerExportLotControllerGetExportLotFarmsSummaryV1: (
      id: string,
      params: RequestParams = {}
    ) =>
      this.request<ExportLotFarmsSummaryResponseDto, void>({
        path: `/backend/v1/importer/export-lots/${id}/farms`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed farm information including coordinates, area, production, and compliance status. Called when user selects a farm tab.
     *
     * @tags Importer
     * @name ImporterExportLotControllerGetExportLotFarmDetailV1
     * @summary Get farm details for an export lot
     * @request GET:/backend/v1/importer/export-lots/{id}/farms/{farmId}
     * @secure
     */
    importerExportLotControllerGetExportLotFarmDetailV1: (
      id: string,
      farmId: string,
      params: RequestParams = {}
    ) =>
      this.request<ExportLotFarmDetailDto, void>({
        path: `/backend/v1/importer/export-lots/${id}/farms/${farmId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Mark an export lot as completed. Updates the export lot status and records the activity for audit.
     *
     * @tags Importer
     * @name ImporterExportLotControllerMarkExportLotAsCompletedV1
     * @summary Mark export lot as completed
     * @request POST:/backend/v1/importer/export-lots/{id}/completed
     * @secure
     */
    importerExportLotControllerMarkExportLotAsCompletedV1: (
      id: string,
      params: RequestParams = {}
    ) =>
      this.request<any, void>({
        path: `/backend/v1/importer/export-lots/${id}/completed`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Importer
     * @name ImporterUserControllerCreateImporterUserV1
     * @summary Create an importer sub-user (admin users only)
     * @request POST:/backend/v1/importer/users
     * @secure
     */
    importerUserControllerCreateImporterUserV1: (
      data: CreateImporterUserDto,
      params: RequestParams = {}
    ) =>
      this.request<ImporterUserResponseDto, void>({
        path: `/backend/v1/importer/users`,
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
     * @tags Importer
     * @name ImporterUserControllerGetImporterUsersV1
     * @summary Get importer sub-users with pagination (admin users only)
     * @request GET:/backend/v1/importer/users
     * @secure
     */
    importerUserControllerGetImporterUsersV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Filter by username (case insensitive partial match)
         * @example "john"
         */
        username?: string;
        /**
         * Filter by importer user role
         * @example "IMPORTER_USER"
         */
        role?: 'IMPORTER_ADMIN' | 'IMPORTER_USER';
        /**
         * Filter by active status
         * @example true
         */
        is_active?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<ImporterUserPaginatedResponseDto, void>({
        path: `/backend/v1/importer/users`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Importer
     * @name ImporterUserControllerUpdateImporterUserV1
     * @summary Update an importer sub-user (admin users only)
     * @request PUT:/backend/v1/importer/users/{id}
     * @secure
     */
    importerUserControllerUpdateImporterUserV1: (
      id: string,
      data: UpdateImporterUserDto,
      params: RequestParams = {}
    ) =>
      this.request<ImporterUserResponseDto, void>({
        path: `/backend/v1/importer/users/${id}`,
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
     * @tags Importer
     * @name ImporterUserControllerDeleteImporterUserV1
     * @summary Delete an importer sub-user (admin users only)
     * @request DELETE:/backend/v1/importer/users/{id}
     * @secure
     */
    importerUserControllerDeleteImporterUserV1: (id: string, params: RequestParams = {}) =>
      this.request<ImporterUserResponseDto, void>({
        path: `/backend/v1/importer/users/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve a paginated list of export lots for the current exporter. Supports filtering by export lot ID, variety, and status.
     *
     * @tags Exporter
     * @name ExporterExportLotControllerListExportLotsV1
     * @summary Get list of export lots with optional filtering
     * @request GET:/backend/v1/exporter/export-lots
     * @secure
     */
    exporterExportLotControllerListExportLotsV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Filter by export lot ID (partial match, case-insensitive)
         * @example "LOT-2025-ABC12345"
         */
        lot_id?: string;
        /**
         * Filter by coffee variety
         * @example "Arabica"
         */
        variety?: string;
        /**
         * Filter by one or more export lot statuses
         * @example ["READY_TO_EXPORT","SHIPPING"]
         */
        status?: ('READY_TO_EXPORT' | 'SHIPPING' | 'COMPLETED')[];
      },
      params: RequestParams = {}
    ) =>
      this.request<PaginatedExportLotResponseDto, void>({
        path: `/backend/v1/exporter/export-lots`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed information about an export lot including pallets and inspection information.
     *
     * @tags Exporter
     * @name ExporterExportLotControllerGetExportLotDetailsV1
     * @summary Get export lot details by id
     * @request GET:/backend/v1/exporter/export-lots/{id}
     * @secure
     */
    exporterExportLotControllerGetExportLotDetailsV1: (id: string, params: RequestParams = {}) =>
      this.request<FactoryExportLotResponseDto, void>({
        path: `/backend/v1/exporter/export-lots/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve all pallets associated with a specific export lot.
     *
     * @tags Exporter
     * @name ExporterExportLotControllerGetExportLotPalletsV1
     * @summary Get all pallets for an export lot
     * @request GET:/backend/v1/exporter/export-lots/{id}/pallets
     * @secure
     */
    exporterExportLotControllerGetExportLotPalletsV1: (id: string, params: RequestParams = {}) =>
      this.request<ExportLotPalletDto[], void>({
        path: `/backend/v1/exporter/export-lots/${id}/pallets`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve lightweight list of farms (id and fid only) for tabs/dropdown navigation. Use GET /export-lot/:id/farms/:farmId for full farm details.
     *
     * @tags Exporter
     * @name ExporterExportLotControllerGetExportLotFarmsSummaryV1
     * @summary Get farms summary for an export lot
     * @request GET:/backend/v1/exporter/export-lots/{id}/farms
     * @secure
     */
    exporterExportLotControllerGetExportLotFarmsSummaryV1: (
      id: string,
      params: RequestParams = {}
    ) =>
      this.request<ExportLotFarmsSummaryResponseDto, void>({
        path: `/backend/v1/exporter/export-lots/${id}/farms`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve detailed farm information including coordinates, area, production, and compliance status. Called when user selects a farm tab.
     *
     * @tags Exporter
     * @name ExporterExportLotControllerGetExportLotFarmDetailV1
     * @summary Get farm details for an export lot
     * @request GET:/backend/v1/exporter/export-lots/{id}/farms/{farmId}
     * @secure
     */
    exporterExportLotControllerGetExportLotFarmDetailV1: (
      id: string,
      farmId: string,
      params: RequestParams = {}
    ) =>
      this.request<ExportLotFarmDetailDto, void>({
        path: `/backend/v1/exporter/export-lots/${id}/farms/${farmId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Mark an export lot as shipping. Updates the export lot status and records the activity for audit.
     *
     * @tags Exporter
     * @name ExporterExportLotControllerMarkExportLotAsCompletedV1
     * @summary Mark export lot as shipping
     * @request POST:/backend/v1/exporter/export-lots/{id}/completed
     * @secure
     */
    exporterExportLotControllerMarkExportLotAsCompletedV1: (
      id: string,
      params: RequestParams = {}
    ) =>
      this.request<any, void>({
        path: `/backend/v1/exporter/export-lots/${id}/completed`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exporter
     * @name ExporterUserControllerCreateExporterUserV1
     * @summary Create an exporter sub-user (admin users only)
     * @request POST:/backend/v1/exporter/users
     * @secure
     */
    exporterUserControllerCreateExporterUserV1: (
      data: CreateExporterUserDto,
      params: RequestParams = {}
    ) =>
      this.request<ExporterUserResponseDto, void>({
        path: `/backend/v1/exporter/users`,
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
     * @tags Exporter
     * @name ExporterUserControllerGetExporterUsersV1
     * @summary Get exporter sub-users with pagination (admin users only)
     * @request GET:/backend/v1/exporter/users
     * @secure
     */
    exporterUserControllerGetExporterUsersV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /**
         * Filter by username (case insensitive partial match)
         * @example "john"
         */
        username?: string;
        /**
         * Filter by exporter user role
         * @example "EXPORTER_USER"
         */
        role?: 'EXPORTER_ADMIN' | 'EXPORTER_USER';
        /**
         * Filter by active status
         * @example true
         */
        is_active?: boolean;
      },
      params: RequestParams = {}
    ) =>
      this.request<ExporterUserPaginatedResponseDto, void>({
        path: `/backend/v1/exporter/users`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Exporter
     * @name ExporterUserControllerUpdateExporterUserV1
     * @summary Update an exporter sub-user (admin users only)
     * @request PUT:/backend/v1/exporter/users/{id}
     * @secure
     */
    exporterUserControllerUpdateExporterUserV1: (
      id: string,
      data: UpdateExporterUserDto,
      params: RequestParams = {}
    ) =>
      this.request<ExporterUserResponseDto, void>({
        path: `/backend/v1/exporter/users/${id}`,
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
     * @tags Exporter
     * @name ExporterUserControllerDeleteExporterUserV1
     * @summary Delete an exporter sub-user (admin users only)
     * @request DELETE:/backend/v1/exporter/users/{id}
     * @secure
     */
    exporterUserControllerDeleteExporterUserV1: (id: string, params: RequestParams = {}) =>
      this.request<ExporterUserResponseDto, void>({
        path: `/backend/v1/exporter/users/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Creates generated_id records from existing bin, pallet, bin_package, package_item, and export_lot data. This is an idempotent operation - existing codes will be skipped.
     *
     * @tags Tracking
     * @name TrackingControllerMigrateGeneratedIdsV1
     * @summary Migrate existing IDs to generated_id table
     * @request POST:/backend/v1/tracking/migrate-generated-ids
     */
    trackingControllerMigrateGeneratedIdsV1: (params: RequestParams = {}) =>
      this.request<MigrateGeneratedIdsResponseDto, void>({
        path: `/backend/v1/tracking/migrate-generated-ids`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieve generated IDs with optional filtering by type and search by code.
     *
     * @tags Tracking
     * @name TrackingControllerGetGeneratedIdsV1
     * @summary Get all generated IDs with pagination
     * @request GET:/backend/v1/tracking/generated-ids
     */
    trackingControllerGetGeneratedIdsV1: (
      query?: {
        /**
         * Number of items to skip
         * @example 0
         */
        skip?: number;
        /**
         * Number of items to return
         * @example 20
         */
        limit?: number;
        /** Filter by generated ID type */
        type?: 'EXPORT_LOT' | 'BIN' | 'PALLET' | 'BIN_PACKAGE' | 'PACKAGE_ITEM';
        /** Search by code */
        search?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GeneratedIdPaginatedResponseDto, void>({
        path: `/backend/v1/tracking/generated-ids`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get counts of generated IDs grouped by type.
     *
     * @tags Tracking
     * @name TrackingControllerGetGeneratedIdStatsV1
     * @summary Get generated ID statistics
     * @request GET:/backend/v1/tracking/generated-ids/stats
     */
    trackingControllerGetGeneratedIdStatsV1: (params: RequestParams = {}) =>
      this.request<GeneratedIdStatsDto, void>({
        path: `/backend/v1/tracking/generated-ids/stats`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Find a generated ID record by code and return related farm data including address, farm points, and certificates.
     *
     * @tags Tracking
     * @name TrackingControllerGetGeneratedIdFarmInfoV1
     * @summary Get farm info for a generated ID
     * @request GET:/backend/v1/tracking/generated-ids/{code}/farm-info
     */
    trackingControllerGetGeneratedIdFarmInfoV1: (code: string, params: RequestParams = {}) =>
      this.request<GeneratedIdFarmInfoResponseDto, void>({
        path: `/backend/v1/tracking/generated-ids/${code}/farm-info`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
}
