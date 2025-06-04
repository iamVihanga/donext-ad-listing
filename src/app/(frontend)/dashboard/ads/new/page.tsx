"use client"

import { useSetupAd } from "@/features/ads/api/use-setup-ad";
import { AdForm } from "@/features/ads/components/ad-form";
import { CreateAdSchema } from "@/server/routes/ad/ad.schemas";
import { useRouter } from "next/navigation";

export default function CreateAdFormPage() {
  const router = useRouter();
  const { mutate: createAd, isPending } = useSetupAd();

  const handleSubmit = (adData: CreateAdSchema) => {
    createAd(
      { values: adData },
      {
        onSuccess: () => {
          // Redirect back to the ads listing page
          router.push('/dashboard/ads');
        },
        onError: (error) => {
          console.error("Error creating ad:", error);
        }
      }
    );
  };

  return (
    <AdForm
      initialData={{}} // Provide empty object as initial data (no need to load existing ad)
      onSubmit={handleSubmit}
      isSubmitting={isPending}
      title="Create New Ad"
      description="Fill in the details to create your vehicle listing"
      submitButtonText="Create Ad"
    />
  );
}