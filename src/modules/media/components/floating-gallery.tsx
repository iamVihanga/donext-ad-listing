"use client";

import React from "react";

import { MediaGallery } from "@/modules/media/components/media-gallery";
import { Button } from "@/components/ui/button";
import type { MediaFile } from "@/modules/media/types";
import { ImagesIcon } from "lucide-react";

export function FloatingGallery() {
  const handleMediaSelect = (selectedMedia: MediaFile[]) => {
    console.log("Selected media:", selectedMedia);
    // Do something with the selected media
  };

  return (
    <div>
      <MediaGallery
        onMediaSelect={handleMediaSelect}
        multiSelect={true}
        title="Image Gallary"
      >
        <Button
          variant={"default"}
          className="group absolute bottom-4 right-4 z-50 rounded-full p-3 shadow-xl"
        >
          <ImagesIcon className="size-8" />
        </Button>
      </MediaGallery>
    </div>
  );
}
