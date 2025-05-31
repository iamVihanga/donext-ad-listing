import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { client } from "@/lib/rpc";

import type { UploadParams, MediaFile } from "@/modules/media/types";
import {
  generatePresignedUrl,
  generateUniqueFileName,
  getMediaType
} from "@/modules/media/utils";
import { s3Client, s3Config } from "@/modules/media/config";

export class MediaService {
  private static instance: MediaService;

  private constructor() {}

  static getInstance(): MediaService {
    if (!MediaService.instance) {
      MediaService.instance = new MediaService();
    }

    return MediaService.instance;
  }

  async uploadFile({ file, path = "" }: UploadParams): Promise<MediaFile> {
    // Step 1: Upload file to S3
    const filename = generateUniqueFileName(file.name);
    const key = path ? `${path}/${filename}` : filename;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await s3Client.send(
      new PutObjectCommand({
        Bucket: s3Config.bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type,
        ACL: "public-read", // This makes the object publicly readable
        CacheControl: "max-age=31536000" // Optional: 1 year cache
      })
    );

    // Step 2: Create media file metadata
    const mediaData: MediaFile = {
      id: key,
      url: `${s3Config.baseUrl}/${key}`,
      type: getMediaType(file.type),
      filename: filename,
      size: file.size,
      createdAt: new Date()
    };

    // Step 3: Save media metadata to database via API
    try {
      await client.api.media.$post({
        json: {
          url: mediaData.url,
          type: mediaData.type,
          filename: mediaData.filename,
          size: mediaData.size
        }
      });

      return {
        ...mediaData
      };
    } catch (error) {
      console.log(error);

      // If database save fails, try to clean up the S3 file to avoid orphaned files
      try {
        await this.deleteS3File(key);
      } catch (cleanupError) {
        console.error(
          "Failed to clean up S3 file after database save error:",
          cleanupError
        );
      }

      throw new Error(
        `Failed to save media metadata to database: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  async deleteFile(id: string): Promise<void> {
    try {
      // Step 1: Get media details to know the S3 key
      const media = await client.api.media[":id"].$get({
        param: { id }
      });

      // Step 2: Delete from S3
      const key = this.extractKeyFromUrl(media.url);
      await this.deleteS3File(key);

      // Step 3: Delete from database
      await client.api.media[":id"].$delete({
        param: { id }
      });
    } catch (error) {
      throw new Error(
        `Failed to delete media: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  private async deleteS3File(key: string): Promise<void> {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: s3Config.bucket,
        Key: key
      })
    );
  }

  private extractKeyFromUrl(url: string): string {
    // Extract the key from the S3 URL
    const baseUrlWithoutProtocol = s3Config.baseUrl.replace(/^https?:\/\//, "");
    return url
      .replace(/^https?:\/\//, "")
      .replace(baseUrlWithoutProtocol + "/", "");
  }

  async getPresignedUrl(filename: string, path = ""): Promise<string> {
    const key = path ? `${path}/${filename}` : filename;
    return await generatePresignedUrl(key);
  }

  async getAllMedia() {
    try {
      const mediaList = await client.api.media.$get();

      return mediaList;
    } catch (error) {
      throw new Error(
        `Failed to fetch media: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  async getMediaById(id: string) {
    try {
      const media = await client.api.media[":id"].$get({
        param: { id }
      });
      return media;
    } catch (error) {
      throw new Error(
        `Failed to fetch media with id ${id}: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}
