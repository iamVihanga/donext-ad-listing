"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSetupAd } from "../api/use-setup-ad";

import {
  createAdSchema,
  type CreateAdSchema
} from "@/server/routes/ad/ad.schemas";

// Vehicle type labels - updated to match schema exactly
const vehicleTypeLabels: Record<string, string> = {
  "CAR": "Car",
  "VAN": "Van", 
  "MOTORCYCLE": "Motor Bike",
  "BICYCLE": "Bicycle",
  "THREE_WHEEL": "Three Wheelers",
  "BUS": "Bus",
  "LORRY": "Lorries & Trucks",
  "HEAVY_DUTY": "Heavy Duty",
  "TRACTOR": "Tractor",
  "AUTO_SERVICE": "Auto Service",
  "RENTAL": "Rental",
  "AUTO_PARTS": "Auto Parts and Accessories",
  "MAINTENANCE": "Maintenance and Repair",
  "BOAT": "Boats & Water Transports"
};

// Vehicle types array - matches exact schema values
const vehicleTypes = [
  "CAR", "VAN", "MOTORCYCLE", "BICYCLE", "THREE_WHEEL", 
  "BUS", "LORRY", "HEAVY_DUTY", "TRACTOR", "AUTO_SERVICE",
  "RENTAL", "AUTO_PARTS", "MAINTENANCE", "BOAT"
];

export function SetupAdDialog() {
  const { mutate, isPending } = useSetupAd();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const form = useForm<CreateAdSchema>({
    resolver: zodResolver(createAdSchema) as any,
    defaultValues: {
      title: "",
      description: "",
      type: "CAR",
      published: false,
      isDraft: true
    }
  });

  const handleSubmit = (values: CreateAdSchema) => {
    // Generate a basic title if none provided based on type
    const autoTitle = values.title || `${vehicleTypeLabels[values.type] || values.type} Advertisement`;
    
    const adValues = {
      ...values,
      title: autoTitle,
      // Ensure required defaults
      published: false,
      isDraft: true
    };

    mutate(
      { values: adValues },
      {
        onSuccess(data) {
          form.reset();
          setOpen(false);
          // Navigate to edit page to complete the ad details
          router.push(`/dashboard/ads/${data.id}/edit`);
        },
        onError(error) {
          console.error("Error creating ad:", error);
        }
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={<PlusIcon />}>Setup Advertisement</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Setup New Advertisement</DialogTitle>
          <DialogDescription>
            Create a new advertisement. You can add detailed information after creation.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Vehicle Type - First field for better UX */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Type *</FormLabel>
                  <Select
                    disabled={isPending}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a vehicle type">
                          {field.value ? vehicleTypeLabels[field.value] : "Select a vehicle type"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full max-h-[200px] overflow-y-auto">
                      {vehicleTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {vehicleTypeLabels[type]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ad Title - Optional */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ad Title (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="e.g., 2020 Toyota Camry"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    Leave empty to auto-generate based on vehicle details
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ad Description - Optional */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brief Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      placeholder="Brief description of your vehicle..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    You can add detailed information later
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-6 flex-col sm:flex-row gap-2">
              <DialogClose asChild>
                <Button 
                  className="w-full" 
                  variant="outline" 
                  type="button"
                  disabled={isPending}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button 
                className="w-full" 
                loading={isPending} 
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Setup Advertisement"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}