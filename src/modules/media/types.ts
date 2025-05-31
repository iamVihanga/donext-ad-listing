import { MediaTypeType } from "@/types/schema-types";

export type MediaType = MediaTypeType;

export interface MediaFile {
  id: string;
  url: string;
  type: MediaType;
  filename: string;
  size: number;
  createdAt: Date;
}

export interface UploadParams {
  file: File;
  type?: MediaType;
  path?: string;
}

export enum MediaUploadPaths {
  ORGANIZATIONS = "organizations",
  PROFILE_IMAGES = "profile_images",
  ADS = "ads"
}
