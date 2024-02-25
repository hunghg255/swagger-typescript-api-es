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
