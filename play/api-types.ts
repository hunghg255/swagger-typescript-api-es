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
