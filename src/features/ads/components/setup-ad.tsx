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
import { Button } from "@/components/ui/button";
import { useSetupAd } from "../api/use-setup-ad";

import {
  AdTypes,
  createAdSchema,
  type CreateAdSchema
} from "@/server/routes/ad/ad.schemas";

// Vehicle type labels - same as in page.tsx
const vehicleTypeLabels: Record<string, string> = {
  "CAR": "CAR",
  "VAN": "VAN",
  "SUV_JEEP": "SUV / JEEP",
  "MOTORCYCLE": "MOTORCYCLE",
  "CREW_CAB": "CREW CAB",
  "PICKUP_DOUBLE_CAB": "PICKUP / DOUBLE CAB",
  "BUS": "BUS",
  "LORRY": "LORRY",
  "THREE_WHEEL": "THREE WHEEL",
  "OTHER": "OTHER",
  "TRACTOR": "TRACTOR",
  "HEAVY_DUTY": "HEAVY-DUTY",
  "BICYCLE": "BICYCLE"
};

// Vehicle types array
const vehicleTypes = [
  "CAR", "VAN", "SUV_JEEP", "MOTORCYCLE", "CREW_CAB",
  "PICKUP_DOUBLE_CAB", "BUS", "LORRY", "THREE_WHEEL", 
  "OTHER", "TRACTOR", "HEAVY_DUTY", "BICYCLE"
];

export function SetupAdDialog() {
  const { mutate, isPending } = useSetupAd();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const form = useForm<CreateAdSchema>({
    resolver: zodResolver(createAdSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "CAR" // Updated default type
    }
  });

  const handleSubmit = (values: CreateAdSchema) => {
    mutate(
      { values },
      {
        onSuccess(data) {
          form.reset();
          setOpen(false);
          router.push(`/dashboard/ads/${data.id}`);
        }
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={<PlusIcon />}>Setup Advertisement</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Setup new Advertisement</DialogTitle>
          <DialogDescription>
            Create a new advertisement for your property or service.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ad Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Your property name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ad Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Your property description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Type</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={(type) => {
                      field.onChange(type);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a vehicle type">
                          {field.value ? vehicleTypeLabels[field.value] : "Select a vehicle type"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
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

            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button className="w-full" variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button className="w-full" loading={isPending} type="submit">
                Setup Advertisement
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}