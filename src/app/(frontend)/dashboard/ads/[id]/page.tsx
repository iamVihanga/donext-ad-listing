"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { 
  CalendarIcon, Loader2, Save, ArrowLeft, ImagePlus, 
  MapPin, DollarSign, Car, Truck 
} from "lucide-react";

import PageContainer from "@/components/layouts/page-container";
import { AppPageShell } from "@/components/layouts/page-shell";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

import { client } from "@/lib/rpc";
import { useGetAdById } from "@/features/ads/api/use-get-ad-by-id";
import { AdTypes, AdStatuses } from "@/server/routes/ad/ad.schemas";

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

// Updated form schema that aligns with your backend schema and new enum values
const adUpdateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  // Updated to use new vehicle-specific AdType enum values
  type: z.enum([
    "CAR", "VAN", "SUV_JEEP", "MOTORCYCLE", "CREW_CAB", 
    "PICKUP_DOUBLE_CAB", "BUS", "LORRY", "THREE_WHEEL", 
    "OTHER", "TRACTOR", "HEAVY_DUTY", "BICYCLE"
  ]),
  status: z.enum(["ACTIVE", "DRAFT", "PENDING_REVIEW", "EXPIRED", "REJECTED"]),
  // Add price and location fields
  price: z.number().nullable().optional(),
  location: z.string().nullable().optional(),
  // Other fields
  published: z.boolean(),
  isDraft: z.boolean(),
  boosted: z.boolean(),
  featured: z.boolean(),
  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
  expiryDate: z.date().nullable().optional(),
  // Tag management
  tag: z.string().optional(),
});

// Helper function to format enum values for display
const formatEnumValue = (value: string): string => {
  return value
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

type Props = {
  params: { id: string };
};

export default function AdDetailsPage({ params }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [debug, setDebug] = useState(false);
  
  // Fetch ad data using the hook
  const { data: ad, error, isLoading, refetch } = useGetAdById({ adId: params.id });
  
  // Form setup with updated default values
  const form = useForm<z.infer<typeof adUpdateSchema>>({
    resolver: zodResolver(adUpdateSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "CAR", // Default to CAR instead of PRODUCT
      status: "ACTIVE",
      // Add default values for price and location
      price: null,
      location: null,
      // Other fields
      published: false,
      isDraft: true,
      boosted: false,
      featured: false,
      seoTitle: null,
      seoDescription: null,
      expiryDate: null,
      tag: "",
    },
  });

  // Update form when ad data is loaded
  useEffect(() => {
    if (ad) {
      setTags(ad.tags || []);
      
      form.reset({
        title: ad.title || "",
        description: ad.description || "",
        // Use ad.type directly, with fallback to CAR
        type: ad.type || "CAR",
        status: ad.status || "ACTIVE",
        // Set price and location from ad data
        price: ad.price,
        location: ad.location,
        // Other fields
        published: ad.published || false,
        isDraft: ad.isDraft || true,
        boosted: ad.boosted || false,
        featured: ad.featured || false,
        seoTitle: ad.seoTitle || null,
        seoDescription: ad.seoDescription || null,
        expiryDate: ad.expiryDate ? new Date(ad.expiryDate) : null,
      });
    }
  }, [ad, form]);

  // Submit form handler
  const onSubmit = async (values: z.infer<typeof adUpdateSchema>) => {
    try {
      setSubmitting(true);
      
      // Extract expiryDate to format it properly
      const { expiryDate, tag, ...mainAdData } = values;
      
      // Build payload with correct structure matching backend expectations
      const payload = {
        ...mainAdData,
        tags,
        // Ensure price is a number or null, not an empty string
        price: typeof mainAdData.price === 'number' ? mainAdData.price : null,
        expiryDate: expiryDate || null,
      };
      
      console.log("Updating ad with payload:", payload);
      
      const response = await client.api.ad[":id"].$put({
        param: { id: params.id },
        json: payload
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update ad");
      }
      
      await refetch();
      toast.success("Ad updated successfully");
    } catch (err: any) {
      console.error("Failed to update ad:", err);
      toast.error(err.message || "Failed to update ad");
    } finally {
      setSubmitting(false);
    }
  };
  
  // Tag management
  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
      form.setValue("tag", "");
    }
  };
  
  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  // Status badge color mapping
  const getStatusBadgeClass = (status: string) => {
    const colorMap: Record<string, string> = {
      ACTIVE: 'bg-green-100 text-green-800',
      DRAFT: 'bg-gray-100 text-gray-800',
      PENDING_REVIEW: 'bg-blue-100 text-blue-800',
      EXPIRED: 'bg-yellow-100 text-yellow-800',
      REJECTED: 'bg-red-100 text-red-800'
    };
    return colorMap[status] || '';
  };

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p className="text-muted-foreground">Loading vehicle details...</p>
        </div>
      </PageContainer>
    );
  }

  if (error || !ad) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-red-500 mb-4">{error?.message || "Failed to load vehicle details"}</p>
          <Button onClick={() => router.push('/dashboard/ads')}>Go back to listings</Button>
        </div>
      </PageContainer>
    );
  }

  // For debugging - all available vehicle types
  const vehicleTypes = [
    "CAR", "VAN", "SUV_JEEP", "MOTORCYCLE", "CREW_CAB", 
    "PICKUP_DOUBLE_CAB", "BUS", "LORRY", "THREE_WHEEL", 
    "OTHER", "TRACTOR", "HEAVY_DUTY", "BICYCLE"
  ];

  return (
    <PageContainer scrollable>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => router.push('/dashboard/ads')}
                    type="button"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Badge className={getStatusBadgeClass(ad?.status || 'DRAFT')}>
                    {ad?.status}
                  </Badge>
                </div>
                <h1 className="text-2xl font-bold">Edit Vehicle Listing</h1>
                <p className="text-muted-foreground">
                  Update the details of your vehicle listing.
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => setDebug(!debug)}
                >
                  {debug ? "Hide Debug" : "Debug"}
                </Button>
                <Button 
                  type="submit" 
                  disabled={submitting}
                  className="gap-2"
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save Changes
                </Button>
              </div>
            </div>

            <Separator />

            {/* Debug section */}
            {debug && (
              <Card className="col-span-3">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Debug Information</h3>
                  <pre className="bg-muted p-4 rounded overflow-auto max-h-[300px]">
                    {JSON.stringify({
                      formValues: form.getValues(),
                      adData: ad,
                      tags,
                      availableTypes: vehicleTypes
                    }, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}

            {/* Main form content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left column - Basic info */}
              <Card className="col-span-2">
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Vehicle Information</h3>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Vehicle title" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Vehicle Type - Updated for new enum values */}
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select vehicle type">
                                  {field.value ? vehicleTypeLabels[field.value] : "Select vehicle type"}
                                </SelectValue>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
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
                    
                    {/* Price field */}
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                className="pl-8"
                                value={field.value === null ? '' : field.value}
                                onChange={(e) => {
                                  const val = e.target.value === '' ? null : parseFloat(e.target.value);
                                  field.onChange(val);
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Enter the price for this vehicle
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Location field */}
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                className="pl-8"
                                placeholder="e.g. Colombo, Sri Lanka"
                                value={field.value || ''}
                                onChange={field.onChange}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Where is this vehicle located?
                          </FormDescription>
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
                            <Textarea
                              {...field}
                              placeholder="Describe your vehicle in detail"
                              className="min-h-[120px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ACTIVE">Active</SelectItem>
                              <SelectItem value="DRAFT">Draft</SelectItem>
                              <SelectItem value="PENDING_REVIEW">Pending Review</SelectItem>
                              <SelectItem value="EXPIRED">Expired</SelectItem>
                              <SelectItem value="REJECTED">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="published"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Published</FormLabel>
                              <FormDescription>
                                Make this listing visible to the public
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="isDraft"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Draft</FormLabel>
                              <FormDescription>
                                Keep as draft (not public)
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Right column - Media placeholder */}
              <Card className="h-min">
                <CardContent className="p-6">
                  <div className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center h-[200px] bg-muted/50">
                    <Car className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground text-center">
                      Vehicle image upload coming soon
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Marketing Options */}
              <Card className="col-span-2">
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-lg font-semibold">Promotion Options</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="featured"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Featured</FormLabel>
                              <FormDescription>
                                Show in featured section (premium)
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="boosted"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Boosted</FormLabel>
                              <FormDescription>
                                Boost in search rankings (premium)
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SEO Options */}
              <Card className="col-span-2">
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-lg font-semibold">SEO Options</h3>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="seoTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SEO Title</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="SEO optimized title (optional)" 
                              {...field} 
                              value={field.value || ''} 
                            />
                          </FormControl>
                          <FormDescription>
                            Leave blank to use the regular title
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="seoDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SEO Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="SEO optimized description (optional)" 
                              {...field} 
                              value={field.value || ''} 
                            />
                          </FormControl>
                          <FormDescription>
                            Leave blank to use the regular description
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Expiry Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={`w-full pl-3 text-left font-normal ${
                                    !field.value && "text-muted-foreground"
                                  }`}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value || undefined}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            When this listing should expire
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="col-span-2 md:col-span-1">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold">Tags</h3>
                  
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 min-h-[50px]">
                      {tags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="secondary"
                          className="py-1.5 pl-2 pr-1.5 flex items-center gap-1"
                        >
                          {tag}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 rounded-full"
                            onClick={() => removeTag(tag)}
                          >
                            ×
                          </Button>
                        </Badge>
                      ))}
                      {tags.length === 0 && (
                        <p className="text-sm text-muted-foreground">No tags added yet</p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Add a tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                      />
                      <Button 
                        type="button" 
                        variant="secondary" 
                        onClick={addTag}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between px-6 py-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Tags help buyers find your vehicle
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </PageContainer>
  );
}