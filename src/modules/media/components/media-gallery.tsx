"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import {
  Check,
  GridIcon,
  ImageIcon,
  Loader2,
  Search,
  TrashIcon,
  UploadIcon
} from "lucide-react";
import { useListMedia } from "@/modules/media/api/use-list-media";
import { MediaService } from "@/modules/media/service";
import { MediaUploader } from "@/modules/media/components/MediaUploader";
import type { MediaFile } from "@/modules/media/types";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

type Props = {
  // This callback function should be executed when images selected then submit the gallery
  onMediaSelect?: (media: MediaFile[]) => void;
  multiSelect?: boolean;
  initialTab?: "gallery" | "upload";
  // Added children prop for the dialog trigger
  children: ReactNode;
  // Dialog control props
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
};

export function MediaGallery({
  onMediaSelect,
  multiSelect = true,
  initialTab = "gallery",
  children,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  title = "Media Gallery"
}: Props) {
  // Track internal open state if not controlled externally
  const [internalOpen, setInternalOpen] = useState(false);

  // Use either controlled or internal open state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = setControlledOpen || setInternalOpen;

  const {
    data: session,
    error: sessionErr,
    isPending: sessionPending
  } = authClient.useSession();

  const queryClient = useQueryClient();
  const mediaService = MediaService.getInstance();

  // State management
  const [activeTab, setActiveTab] = useState<"gallery" | "upload">(initialTab);
  const [selectedMedia, setSelectedMedia] = useState<MediaFile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mediaToDelete, setMediaToDelete] = useState<MediaFile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setActiveTab(initialTab);
      setSelectedMedia([]);
      setSearchQuery("");
    }
  }, [open, initialTab]);

  // Fetch media using React Query
  const { data: mediaItems, isLoading, error, refetch } = useListMedia();

  // Filter media by search query
  const filteredMedia = mediaItems?.filter((item) =>
    item?.filename?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle media selection
  const toggleMediaSelection = (media: MediaFile) => {
    if (multiSelect) {
      if (selectedMedia.some((item) => item.id === media.id)) {
        setSelectedMedia(selectedMedia.filter((item) => item.id !== media.id));
      } else {
        setSelectedMedia([...selectedMedia, media]);
      }
    } else {
      // Single-select mode
      setSelectedMedia([media]);
    }
  };

  // Handle file upload success
  const handleUploadSuccess = (file: MediaFile) => {
    console.log("File uploaded successfully:", file);

    // Invalidate query to refresh list
    queryClient.invalidateQueries({ queryKey: ["media"] });
    toast.success("Media uploaded successfully!");
    setActiveTab("gallery");
  };

  // Handle file upload error
  const handleUploadError = (error: Error) => {
    console.log(error);
    toast.error("Upload failed", { description: error.message });
  };

  // Handle media submit
  const handleSubmit = () => {
    if (selectedMedia.length > 0) {
      onMediaSelect?.(selectedMedia);
      toast.success(`${selectedMedia.length} media item(s) selected`);
      setOpen(false); // Close the dialog after selection
    } else {
      toast.error("Please select at least one media item");
    }
  };

  // Handle media deletion
  const confirmDeleteMedia = async () => {
    if (!mediaToDelete) return;

    setIsDeleting(true);
    try {
      await mediaService.deleteFile(mediaToDelete.id);
      queryClient.invalidateQueries({ queryKey: ["media"] });
      toast.success("Media deleted successfully");

      // Remove from selected media if it was selected
      setSelectedMedia(
        selectedMedia.filter((item) => item.id !== mediaToDelete.id)
      );
    } catch (error) {
      toast.error("Failed to delete media", {
        description: error instanceof Error ? error.message : "Unknown error"
      });
    } finally {
      setIsDeleting(false);
      setMediaToDelete(null);
    }
  };

  // Handle key events for keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Submit on Ctrl+Enter
      if (e.ctrlKey && e.key === "Enter") {
        handleSubmit();
      }
      // Close on Escape
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMedia, open]);

  const renderGalleryContent = () => {
    // If session is pending, show loading
    if (sessionPending) {
      return (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading session...</span>
        </div>
      );
    }

    // If no session or error, show error
    if (!session || sessionErr) {
      return (
        <div className="p-4 border border-destructive rounded-md text-destructive">
          Please sign in to access the media gallery.
        </div>
      );
    }

    return (
      <div className="overflow-hidden h-[450px] max-h-[450px]">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "gallery" | "upload")}
        >
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-64 border-r h-full p-4 bg-muted/20">
              <h3 className="font-medium mb-4">Media Library</h3>
              <TabsList className="w-full grid grid-cols-2 mb-4">
                <TabsTrigger value="gallery">
                  <GridIcon className="h-4 w-4 mr-2" />
                  Gallery
                </TabsTrigger>
                <TabsTrigger value="upload">
                  <UploadIcon className="h-4 w-4 mr-2" />
                  Upload
                </TabsTrigger>
              </TabsList>

              {activeTab === "gallery" && (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search files..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Statistics</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-primary/10 rounded-md p-2">
                        <p className="text-xs text-muted-foreground">
                          Total Files
                        </p>
                        <p className="font-medium">{mediaItems?.length || 0}</p>
                      </div>
                      <div className="bg-primary/10 rounded-md p-2">
                        <p className="text-xs text-muted-foreground">
                          Selected
                        </p>
                        <p className="font-medium">{selectedMedia.length}</p>
                      </div>
                    </div>
                  </div>

                  {selectedMedia.length > 0 && (
                    <Button className="w-full" onClick={handleSubmit}>
                      Use Selected ({selectedMedia.length})
                    </Button>
                  )}
                </div>
              )}

              {activeTab === "upload" && (
                <div className="prose prose-sm">
                  <h4 className="text-sm font-medium mb-2">
                    Upload Instructions
                  </h4>
                  <ul className="text-xs space-y-1 list-disc pl-4">
                    <li>Allowed types: Images, PDF, Videos</li>
                    <li>Maximum file size: 4MB</li>
                    <li>Files will be stored securely</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="flex-1 h-full">
              <TabsContent value="gallery" className="h-full m-0">
                {isLoading ? (
                  <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <Skeleton key={i} className="aspect-square rounded-md" />
                    ))}
                  </div>
                ) : error ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center p-6">
                      <p className="text-destructive mb-2">
                        Failed to load media
                      </p>
                      <Button variant="outline" onClick={() => refetch()}>
                        Try Again
                      </Button>
                    </div>
                  </div>
                ) : filteredMedia?.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center p-6">
                      <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-medium mb-1">No media found</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {searchQuery
                          ? "No results match your search"
                          : "Upload some media to get started"}
                      </p>
                      <Button
                        onClick={() => setActiveTab("upload")}
                        variant="outline"
                      >
                        <UploadIcon className="h-4 w-4 mr-2" />
                        Upload Media
                      </Button>
                    </div>
                  </div>
                ) : (
                  <ScrollArea className="h-full">
                    <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {filteredMedia?.map((media) => {
                        const isSelected = selectedMedia.some(
                          (item) => item.id === media.id
                        );

                        return (
                          <Card
                            key={media.id}
                            className={`overflow-hidden cursor-pointer group relative ${
                              isSelected ? "ring-2 ring-primary" : ""
                            } p-0 flex flex-col gap-0`}
                            onClick={() =>
                              toggleMediaSelection({
                                ...media,
                                createdAt: new Date(media.createdAt),
                                filename: media.filename as string,
                                size: media.size || 0
                              })
                            }
                          >
                            <div className="aspect-square relative overflow-hidden">
                              {media.type === "IMAGE" ? (
                                <Image
                                  src={media.url}
                                  alt={media.filename as string}
                                  width={300}
                                  height={300}
                                  className="object-cover w-full h-full"
                                />
                              ) : media.type === "VIDEO" ? (
                                <div className="bg-muted w-full h-full flex items-center justify-center">
                                  <div className="text-center">
                                    <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                    <Badge>VIDEO</Badge>
                                  </div>
                                </div>
                              ) : (
                                <div className="bg-muted w-full h-full flex items-center justify-center">
                                  <div className="text-center">
                                    <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                    <Badge>{media.type}</Badge>
                                  </div>
                                </div>
                              )}

                              {/* Selection indicator */}
                              {isSelected && (
                                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                                  <Check className="h-4 w-4" />
                                </div>
                              )}

                              {/* Hover actions */}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-full bg-background"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(media.url, "_blank");
                                  }}
                                >
                                  <ImageIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-full bg-background text-destructive hover:text-destructive"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (media)
                                      setMediaToDelete({
                                        ...media,
                                        createdAt: new Date(media.createdAt),
                                        filename: media.filename as string,
                                        size: media.size || 0
                                      });
                                  }}
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <CardContent className="p-2 text-xs truncate">
                              {media.filename}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </ScrollArea>
                )}
              </TabsContent>

              <TabsContent
                value="upload"
                className="h-full m-0 p-6 flex items-center justify-center"
              >
                <div className="w-full h-full">
                  <MediaUploader
                    onUpload={handleUploadSuccess}
                    onError={handleUploadError}
                    path={`${session.user.id}`}
                    className="h-full"
                  />
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent className="min-w-6xl p-0">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>

          {renderGalleryContent()}

          <DialogFooter className="px-6 py-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!selectedMedia.length}>
              Use Selected ({selectedMedia.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!mediaToDelete}
        onOpenChange={(open) => !open && setMediaToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Media</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this media? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteMedia}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
