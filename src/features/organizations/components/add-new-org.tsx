"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon, FileEditIcon, ImageIcon, PlusIcon } from "lucide-react";

import { createOrgSchema, CreateOrgSchema } from "../schemas/create-org.schema";
import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MediaGallery } from "@/modules/media/components/media-gallery";
import { useCreateOrganization } from "../api/use-create-organization";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AddNewOrganization() {
  const [open, setOpen] = useState<boolean>(false);
  const { isPending, mutate } = useCreateOrganization();

  const form = useForm<CreateOrgSchema>({
    resolver: zodResolver(createOrgSchema),
    defaultValues: {
      name: "",
      description: "",
      logo: ""
    }
  });

  async function onSubmit(values: CreateOrgSchema) {
    console.log(values);
    mutate(values, {
      onSuccess() {
        form.reset();
        setOpen(false);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-3 mr-1" />
          Add new Organization
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[400px]" // Wider dialog for horizontal layout
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Create new Organization</DialogTitle>
          <DialogDescription>
            Fill the following details to create new organization.
          </DialogDescription>
        </DialogHeader>

        {/* Dialog Content */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Organization Logo */}
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center">
                  <MediaGallery
                    initialTab="upload"
                    multiSelect={false}
                    title="Select or Upload Organization Logo"
                    onMediaSelect={(media) => {
                      field.onChange(media[0].url);
                    }}
                  >
                    {field.value ? (
                      <Avatar className="group w-20 h-20 rounded-full relative transition-all">
                        <AvatarImage
                          src={field.value}
                          alt=""
                          width={400}
                          height={400}
                          className="object-cover"
                        />
                        <AvatarFallback>
                          <ImageIcon className="h-8 w-8 text-neutral-400" />
                        </AvatarFallback>

                        <div className="absolute hidden group-hover:flex w-full h-full top-0 bg-black/70 text-white transition-all ease-in-out duration-75">
                          <EditIcon className="m-auto h-6 w-6" />
                        </div>
                      </Avatar>
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-muted/20 border border-primary/80 border-dashed flex items-center justify-center">
                        <FileEditIcon className="h-8 w-8 text-neutral-400" />
                      </div>
                    )}
                  </MediaGallery>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter organization name" />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Organization description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-4" />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending} loading={isPending}>
                {isPending ? "Creating..." : "Create Organization"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
