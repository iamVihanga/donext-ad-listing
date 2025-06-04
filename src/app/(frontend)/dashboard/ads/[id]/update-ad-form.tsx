"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetAdById } from "@/features/ads/api/use-get-ad-by-id";
import { useUpdateAd } from "@/features/ads/api/use-update-ad";
import { AdForm } from "@/features/ads/components/ad-form";
import { CreateAdSchema } from "@/server/routes/ad/ad.schemas";
import { Loader2 } from "lucide-react";

export default function UpdateAdFormPage() {
  const router = useRouter();
  const params = useParams();
  const adId = params.id as string;
  
  const { data: ad, isLoading, isError } = useGetAdById({ adId });
  const { mutate: updateAd, isPending } = useUpdateAd();

  const handleSubmit = (adData: CreateAdSchema) => {
    updateAd(
      { id: adId, values: adData },
      {
        onSuccess: () => {
          router.push('/dashboard/ads');
        },
        onError: (error) => {
          console.error("Error updating ad:", error);
        }
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading ad details...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-destructive">Failed to load ad details. Please try again.</p>
      </div>
    );
  }

  return (
    <AdForm
      initialData={ad}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
      title="Update Ad"
      description="Edit the details of your vehicle listing"
      submitButtonText="Update Ad"
    />
  );
}