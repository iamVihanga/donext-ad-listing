/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Car,
  ImageIcon,
  DollarSign,
  Phone,
  MapPin,
  Settings,
  ArrowRight,
  ArrowLeft,
  X,
  PlusCircle,
  XCircle,
  Loader2,
  Check,
  TagIcon
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

import { MediaGallery } from "@/modules/media/components/media-gallery";
import type { MediaFile } from "@/modules/media/types";
import { CreateAdSchema } from "@/server/routes/ad/ad.schemas";

export type AdFormProps = {
  initialData?: any;
  onSubmit: (data: CreateAdSchema) => void;
  isSubmitting: boolean;
  title: string;
  description: string;
  submitButtonText: string;
};

export function AdForm({
  initialData,
  onSubmit,
  isSubmitting,
  title,
  description,
  submitButtonText
}: AdFormProps) {
  const router = useRouter();

  // Set "vehicle" as the default active tab
  const [activeTab, setActiveTab] = useState("vehicle");

  // Define tab order for navigation
  const tabOrder = [
    "vehicle",
    "images",
    "pricing",
    "contact",
    "location",
    "basic"
  ];

  // State for controlling the media gallery dialog
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Replace the uploadedImages state with media files
  const [selectedMedia, setSelectedMedia] = useState<MediaFile[]>([]);

  // Image editor state
  const [editingImage, setEditingImage] = useState<{
    index: number;
    image: any;
  } | null>(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "CAR",
    published: false,
    isDraft: true,
    boosted: false,
    featured: false,
    seoTitle: "",
    seoDescription: "",
    categoryId: "",
    tags: [] as string[],
    price: "",
    discountPrice: "",
    condition: "",
    brand: "",
    model: "",
    mileage: "",
    vehicleType: "",
    manufacturedYear: "",
    transmission: "",
    fuelType: "",
    engineCapacity: "",
    options: [] as string[],
    isLeased: false,
    name: "",
    phoneNumber: "",
    whatsappNumber: "",
    termsAndConditions: false,
    location: "",
    address: "",
    province: "",
    district: "",
    city: "",
    specialNote: "",
    metadata: {}
  });

  // Update form data if initialData changes (for edit form)
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        type: initialData.type || "CAR",
        published: initialData.published || false,
        isDraft: initialData.isDraft ?? true,
        boosted: initialData.boosted || false,
        featured: initialData.featured || false,
        seoTitle: initialData.seoTitle || "",
        seoDescription: initialData.seoDescription || "",
        categoryId: initialData.categoryId || "",
        tags: initialData.tags || [],
        price: initialData.price ? String(initialData.price) : "",
        discountPrice: initialData.discountPrice
          ? String(initialData.discountPrice)
          : "",
        condition: initialData.condition || "",
        brand: initialData.brand || "",
        model: initialData.model || "",
        mileage: initialData.mileage || "",
        vehicleType: initialData.vehicleType || "",
        manufacturedYear: initialData.manufacturedYear || "",
        transmission: initialData.transmission || "",
        fuelType: initialData.fuelType || "",
        engineCapacity: initialData.engineCapacity
          ? String(initialData.engineCapacity)
          : "",
        options: initialData.options || [],
        isLeased: initialData.isLeased || false,
        name: initialData.name || "",
        phoneNumber: initialData.phoneNumber || "",
        whatsappNumber: initialData.whatsappNumber || "",
        termsAndConditions: initialData.termsAndConditions || false,
        location: initialData.location || "",
        address: initialData.address || "",
        province: initialData.province || "",
        district: initialData.district || "",
        city: initialData.city || "",
        specialNote: initialData.specialNote || "",
        metadata: initialData.metadata || {}
      });

      // Load images from initialData if available
      if (initialData.media && Array.isArray(initialData.media)) {
        // Convert to MediaFile format
        setSelectedMedia(
          initialData.media.map((media: any) => ({
            id: media.id,
            url: media.url,
            type: "IMAGE", // Default to image type
            filename: media.title || "image",
            size: 0, // Size may not be available from initialData
            createdAt: new Date(),
            title: media.title || "",
            alt: media.alt || ""
          }))
        );
      }
    }
  }, [initialData]);

  const [newTag, setNewTag] = useState("");
  const [newOption, setNewOption] = useState("");

  // Handle tab navigation
  const goToNextTab = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      const nextTab = tabOrder[currentIndex + 1];
      setActiveTab(nextTab);
    }
  };

  const goToPrevTab = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex > 0) {
      const prevTab = tabOrder[currentIndex - 1];
      setActiveTab(prevTab);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove)
    }));
  };

  const addOption = () => {
    if (newOption.trim() && !formData.options.includes(newOption.trim())) {
      setFormData((prev) => ({
        ...prev,
        options: [...prev.options, newOption.trim()]
      }));
      setNewOption("");
    }
  };

  const removeOption = (optionToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((option) => option !== optionToRemove)
    }));
  };

  // Handle media selection from gallery
  const handleMediaSelect = (media: MediaFile[]) => {
    // Check if we exceed the maximum allowed (6 images)
    if (media.length > 6) {
      // Take only the first 6
      setSelectedMedia(media.slice(0, 6));
    } else {
      setSelectedMedia(media);
    }
  };

  // Handle removing a media item
  const removeMedia = (idToRemove: string) => {
    setSelectedMedia((prev) => prev.filter((media) => media.id !== idToRemove));
  };

  // Handle reordering media
  const reorderMedia = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;

    const updatedMedia = [...selectedMedia];
    const [movedMedia] = updatedMedia.splice(fromIndex, 1);
    updatedMedia.splice(toIndex, 0, movedMedia);

    setSelectedMedia(updatedMedia);
  };

  // Drag and drop functionality for reordering
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex === null) return;
    if (draggedIndex === dropIndex) return;

    reorderMedia(draggedIndex, dropIndex);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Image editor functions
  const openImageEditor = (index: number) => {
    const image = selectedMedia[index];
    setEditingImage({ index, image });
    // setImageTitle(image.title || "");
    // setImageAlt(image.alt || "");
  };

  const saveImageEdits = () => {
    if (!editingImage) return;

    setSelectedMedia((prev) =>
      prev.map((img, idx) =>
        idx === editingImage.index
          ? { ...img, title: imageTitle, alt: imageAlt }
          : img
      )
    );

    setEditingImage(null);
    setImageTitle("");
    setImageAlt("");
  };

  const cancelImageEdit = () => {
    setEditingImage(null);
    setImageTitle("");
    setImageAlt("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Always generate title from vehicle details (don't rely on formData.title which may be empty)
    const titleParts = [
      formData.brand,
      formData.model, 
      formData.manufacturedYear,
      formData.vehicleType
    ].filter(Boolean);
    
    const autoTitle = titleParts.length > 0 
      ? titleParts.join(" ")
      : "Vehicle Ad"; // Fallback title if no details provided

    // Map formData to CreateAdSchema
    const adData: CreateAdSchema = {
      title: autoTitle,
      description: formData.description || undefined,
      type: formData.type as any, // Ensure type matches AdType enum
      published: formData.published,
      isDraft: formData.isDraft,
      boosted: formData.boosted,
      featured: formData.featured,
      seoTitle: formData.seoTitle || undefined,
      seoDescription: formData.seoDescription || undefined,
      categoryId: formData.categoryId || undefined,
      tags: formData.tags.length > 0 ? formData.tags : undefined,
      price: formData.price ? parseFloat(formData.price) : undefined,
      discountPrice: formData.discountPrice
        ? parseFloat(formData.discountPrice)
        : undefined,
      condition: formData.condition || undefined,
      brand: formData.brand || undefined,
      model: formData.model || undefined,
      mileage: formData.mileage ? parseInt(formData.mileage) : undefined,
      vehicleType: formData.vehicleType || undefined,
      manufacturedYear: formData.manufacturedYear || undefined,
      transmission: formData.transmission || undefined,
      fuelType: formData.fuelType || undefined,
      engineCapacity: formData.engineCapacity
        ? parseInt(formData.engineCapacity)
        : undefined,
      options: formData.options.length > 0 ? formData.options : undefined,
      isLeased: formData.isLeased,
      name: formData.name || undefined,
      phoneNumber: formData.phoneNumber || undefined,
      whatsappNumber: formData.whatsappNumber || undefined,
      termsAndConditions: formData.termsAndConditions || null,
      location: formData.location || undefined,
      address: formData.address || undefined,
      province: formData.province || undefined,
      district: formData.district || undefined,
      city: formData.city || undefined,
      specialNote: formData.specialNote || undefined,
      metadata: formData.metadata,

      // Fixed media handling - only include valid media IDs, not the full media objects
      mediaIds:
        selectedMedia.length > 0
          ? selectedMedia.map((media) => media.id)
          : undefined
    };

    onSubmit(adData);
  };

  const vehicleMakes = [
    "Acura", "Alfa-Romeo", "Aprilia", "Ashok-Leyland", "Aston", "Atco", "ATHER", 
    "Audi", "Austin", "Baic", "Bajaj", "Bentley", "BMW", "Borgward", "BYD", 
    "Cadillac", "Cal", "CAT", "Ceygra", "Changan", "Chery", "Chevrolet", 
    "Chrysler", "Citroen", "Corvette", "Daewoo", "Daido", "Daihatsu", "Datsun", 
    "Demak", "Dfac", "DFSK", "Ducati", "Dyno", "Eicher", "FAW", "Ferrari", "Fiat", 
    "Force", "Ford", "Foton", "Hero", "Hero-Honda", "Higer", "Hillman", "HINO", 
    "Hitachi", "Holden", "Honda", "Hummer", "Hyundai", "IHI", "Isuzu", "Iveco", 
    "JAC", "Jaguar", "JCB", "Jeep", "JiaLing", "JMC", "John-Deere", "Jonway", 
    "KAPLA", "Kawasaki", "Kia", "Kinetic", "KMC", "Kobelco", "Komatsu", "KTM", 
    "Kubota", "Lamborghini", "Land-Rover", "Lexus", "Loncin", "Longjia", "Lotus", 
    "Lti", "Mahindra", "Maserati", "Massey-Ferguson", "Mazda", "Mercedes-Benz", 
    "Metrocab", "MG", "Mg-Rover", "Micro", "Mini", "Minnelli", "Mitsubishi", 
    "Morgan", "Morris", "New-Holland", "Nissan", "NWOW", "Opel", "Other", 
    "Perodua", "Peugeot", "Piaggio", "Porsche", "Powertrac", "Proton", 
    "Range-Rover", "Ranomoto", "Renault", "Reva", "REVOLT", "Rolls-Royce", "Saab", 
    "Sakai", "Seat", "Senaro", "Singer", "Skoda", "Smart", "Sonalika", "Subaru", 
    "Suzuki", "Swaraj", "Syuk", "TAFE", "TAILG", "Tata", "Tesla", "Toyota", 
    "Triumph", "TVS", "Vauxhall", "Vespa", "Volkswagen", "Volvo", "Wave", "Willys", 
    "Yadea", "Yamaha", "Yanmar", "Yuejin", "Zongshen", "Zotye"
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="vehicle" className="flex items-center gap-2">
              <Car className="w-4 h-4" />
              Vehicle
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Images
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Pricing
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </TabsTrigger>
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Vehicle Details */}
          <TabsContent value="vehicle">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Details</CardTitle>
                <CardDescription>Specific information about the vehicle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Title */}
                  {/* <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Title<span className="text-red-500">*</span>
                    </div>
                    <div className="flex-1">
                      <Input
                        id="title"
                        placeholder="e.g., 2020 Toyota Camry - Excellent Condition"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        required
                        className="border border-gray-300 bg-white h-10 rounded-md shadow-none"
                      />
                    </div>
                  </div> */}

                  {/* Type */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Vehicle Type<span className="text-red-500">*</span>
                    </div>
                    <div className="flex-1">
                      <Select
                        value={formData.vehicleType}
                        onValueChange={(value) => {
                          // Update vehicleType with the display name
                          handleInputChange("vehicleType", value);
                          
                          // Map to the API enum value for type
                          const typeMap: Record<string, string> = {
                            "Car": "CAR",
                            "Van": "VAN",
                            "SUV / Jeep": "SUV_JEEP",
                            "Motorcycle": "MOTORCYCLE",
                            "Bus": "BUS",
                            "Truck": "LORRY",
                            "Three Wheeler": "THREE_WHEEL",
                            "Heavy Vehicle": "HEAVY_DUTY",
                            "Other": "OTHER"
                          };
                          
                          // Set the correct enum value for type
                          handleInputChange("type", typeMap[value] || "OTHER");
                        }}
                      >
                        <SelectTrigger className="border border-gray-300 bg-white h-10 rounded-md shadow-none">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Car">Car</SelectItem>
                          <SelectItem value="Van">Van</SelectItem>
                          <SelectItem value="SUV / Jeep">SUV / Jeep</SelectItem>
                          <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                          <SelectItem value="Bus">Bus</SelectItem>
                          <SelectItem value="Truck">Truck</SelectItem>
                          <SelectItem value="Three Wheeler">Three Wheeler</SelectItem>
                          <SelectItem value="Heavy Vehicle">Heavy Vehicle</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Brand/Make */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Vehicle Make<span className="text-red-500">*</span>
                    </div>
                    <div className="flex-1">
                      <Select
                        value={formData.brand}
                        onValueChange={(value) => handleInputChange("brand", value)}
                      >
                        <SelectTrigger className="border border-gray-300 bg-white h-10 rounded-md shadow-none">
                          <SelectValue placeholder="Select Make" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px] overflow-y-auto">
                          {vehicleMakes.map((make) => (
                            <SelectItem key={make} value={make}>
                              {make}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Model */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Model<span className="text-red-500">*</span>
                    </div>
                    <div className="flex-1">
                      <Input
                        id="model"
                        placeholder="e.g., Camry"
                        value={formData.model}
                        onChange={(e) => handleInputChange("model", e.target.value)}
                        className="border border-gray-300 bg-white h-10 rounded-md shadow-none"
                      />
                    </div>
                  </div>

                  {/* Manufactured Year */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Manufactured Year<span className="text-red-500">*</span>
                    </div>
                    <div className="flex-1">
                      <Select
                        value={formData.manufacturedYear}
                        onValueChange={(value) => handleInputChange("manufacturedYear", value)}
                      >
                        <SelectTrigger className="border border-gray-300 bg-white h-10 rounded-md shadow-none">
                          <SelectValue placeholder="Manufactured Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* Generate years dynamically */}
                          {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Condition */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Vehicle Condition<span className="text-red-500">*</span>
                    </div>
                    <div className="flex-1">
                      <Select
                        value={formData.condition}
                        onValueChange={(value) => handleInputChange("condition", value)}
                      >
                        <SelectTrigger className="border border-gray-300 bg-white h-10 rounded-md shadow-none">
                          <SelectValue placeholder="Select Condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Brand New">Brand New</SelectItem>
                          <SelectItem value="Unregistered (Recondition)">Unregistered (Recondition)</SelectItem>
                          <SelectItem value="Registered (Used)">Registered (Used)</SelectItem>
                          <SelectItem value="Antique">Antique</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  

                  {/* Price */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Price (Rs.)
                    </div>
                    <div className="flex-1">
                      <Input
                        id="price"
                        type="number"
                        placeholder="25000"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        className="border border-gray-300 bg-white h-10 rounded-md shadow-none"
                      />
                    </div>
                  </div>

                  {/* Transmission */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Transmission<span className="text-red-500">*</span>
                    </div>
                    <div className="flex-1">
                      <Select
                        value={formData.transmission}
                        onValueChange={(value) => handleInputChange("transmission", value)}
                      >
                        <SelectTrigger className="border border-gray-300 bg-white h-10 rounded-md shadow-none">
                          <SelectValue placeholder="Select Transmission" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MANUAL">Manual</SelectItem>
                          <SelectItem value="AUTOMATIC">Automatic</SelectItem>
                          <SelectItem value="CVT">CVT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Apply the same pattern to remaining fields */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Fuel Type<span className="text-red-500">*</span>
                    </div>
                    <div className="flex-1">
                      <Select
                        value={formData.fuelType}
                        onValueChange={(value) => handleInputChange("fuelType", value)}
                      >
                        <SelectTrigger className="border border-gray-300 bg-white h-10 rounded-md shadow-none">
                          <SelectValue placeholder="Select Fuel Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PETROL">Petrol</SelectItem>
                          <SelectItem value="DIESEL">Diesel</SelectItem>
                          <SelectItem value="HYBRID">Hybrid</SelectItem>
                          <SelectItem value="ELECTRIC">Electric</SelectItem>
                          <SelectItem value="ELECTRIC">Gas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Mileage */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Mileage (km)
                    </div>
                    <div className="flex-1">
                      <Input
                        id="mileage"
                        type="number"
                        placeholder="50000"
                        value={formData.mileage}
                        onChange={(e) => handleInputChange("mileage", e.target.value)}
                        className="border border-gray-300 bg-white h-10 rounded-md shadow-none"
                      />
                    </div>
                  </div>

                  {/* Engine Capacity */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Engine Capacity (cc)
                    </div>
                    <div className="flex-1">
                      <Input
                        id="engineCapacity"
                        type="number"
                        placeholder="2000"
                        value={formData.engineCapacity}
                        onChange={(e) => handleInputChange("engineCapacity", e.target.value)}
                        className="border border-gray-300 bg-white h-10 rounded-md shadow-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-48 text-right pr-4 pt-2 text-gray-600">
                      Description<span className="text-red-500">*</span>
                    </div>
                    <div className="flex-1">
                      <Textarea
                        id="description"
                        placeholder="Provide detailed information about your vehicle..."
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={5}
                        className="border border-gray-300 bg-white rounded-md shadow-none resize-y"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Include important details about the vehicle's history, special features, and reason for selling.
                      </p>
                    </div>
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex justify-end mt-6 pt-4">
                    <Button
                      type="button"
                      onClick={goToNextTab}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    >
                      Next <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Images Section */}
          <TabsContent value="images">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Images</CardTitle>
                <CardDescription>
                  Upload up to 6 images of your vehicle (First image will be the
                  main image)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Media Gallery Button */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    </div>

                    <div className="space-y-1 text-center">
                      <p className="text-sm font-medium">
                        {selectedMedia.length === 0
                          ? "No images selected yet"
                          : selectedMedia.length >= 6
                          ? "Maximum number of images selected (6/6)"
                          : `${
                              selectedMedia.length
                            } image(s) selected, you can add ${
                              6 - selectedMedia.length
                            } more`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Select up to 6 images from your media gallery
                      </p>
                    </div>

                    <MediaGallery
                      onMediaSelect={handleMediaSelect}
                      multiSelect={true}
                      open={isGalleryOpen}
                      onOpenChange={setIsGalleryOpen}
                      title="Select Vehicle Images"
                    >
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsGalleryOpen(true)}
                        className="flex items-center gap-2"
                        disabled={selectedMedia.length >= 6}
                      >
                        <PlusCircle className="w-4 h-4" />
                        {selectedMedia.length === 0
                          ? "Select Images"
                          : "Select More Images"}
                      </Button>
                    </MediaGallery>
                  </div>
                </div>

                {/* Selected Media Preview */}
                {selectedMedia.length > 0 && (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>
                          Selected Images ({selectedMedia.length}/6)
                        </Label>
                        <span className="text-sm text-muted-foreground">
                          Drag images to reorder • First image is main
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedMedia.map((media, index) => (
                          <div
                            key={media.id}
                            className={`
                              relative group aspect-video border rounded-md overflow-hidden cursor-move
                              ${
                                index === 0
                                  ? "border-[#024950] border-2"
                                  : "border-gray-200"
                              }
                              ${
                                draggedIndex === index
                                  ? "opacity-50"
                                  : "opacity-100"
                              }
                            `}
                            // draggable
                            // onDragStart={() => handleDragStart(index)}
                            // onDragOver={(e) => handleDragOver(e, index)}
                            onDrop={(e) => handleDrop(e, index)}
                            onDragEnd={handleDragEnd}
                          >
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center space-y-2 z-10">
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="w-3/4"
                                onClick={() => removeMedia(media.id)}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Remove
                              </Button>

                              {index !== 0 && (
                                <Button
                                  type="button"
                                  variant="secondary"
                                  size="sm"
                                  className="w-3/4"
                                  onClick={() => openImageEditor(index)}
                                >
                                  Edit Details
                                </Button>
                              )}
                            </div>

                            {/* Badge for main image */}
                            {index === 0 && (
                              <div className="absolute top-2 left-2 bg-[#024950] text-white text-xs px-2 py-1 rounded z-20">
                                Main Image
                              </div>
                            )}

                            {/* Image order badge */}
                            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full z-20">
                              {index + 1}
                            </div>

                            {/* SEO info badge - if title or alt text is set */}
                            {/* {(media.title || media.alt) && (
                              <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-sm z-20">
                                SEO
                              </div>
                            )} */}

                            <Image
                              src={media.url}
                              alt={`Vehicle image ${index + 1}`}
                              width={300}
                              height={200}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium">Tip:</span> High-quality
                        images from multiple angles will increase interest in
                        your vehicle
                      </p>
                    </div>
                  </>
                )}

                <div className="flex justify-between mt-4">
                  <Button
                    type="button"
                    onClick={goToPrevTab}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </Button>
                  <Button
                    type="button"
                    onClick={goToNextTab}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing */}
          <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle>Pricing Information</CardTitle>
                <CardDescription>Set your asking price and any discounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Price */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Price<span className="text-red-500">*</span>
                    </div>
                    <div className="flex-1">
                      <Input
                        id="price"
                        type="number"
                        placeholder="25000"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        required
                        className="border border-gray-300 bg-white h-10 rounded-md shadow-none"
                      />
                    </div>
                  </div>

                  {/* Original Price */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Original Price
                    </div>
                    <div className="flex-1">
                      <Input
                        id="discountPrice"
                        type="number"
                        placeholder="28000"
                        value={formData.discountPrice}
                        onChange={(e) => handleInputChange("discountPrice", e.target.value)}
                        className="border border-gray-300 bg-white h-10 rounded-md shadow-none"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        If there's a discount, enter the original price here
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button
                      type="button"
                      onClick={goToPrevTab}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Previous
                    </Button>
                    <Button
                      type="button"
                      onClick={goToNextTab}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    >
                      Next <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Information */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>How buyers can reach you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Contact Name */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Contact Name<span className="text-red-500">*</span>
                    </div>
                    <div className="flex-1">
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="border border-gray-300 bg-white h-10 rounded-md shadow-none"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Phone Number<span className="text-red-500">*</span>
                    </div>
                    <div className="flex-1">
                      <Input
                        id="phoneNumber"
                        placeholder="+1234567890"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        className="border border-gray-300 bg-white h-10 rounded-md shadow-none"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Number */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      WhatsApp Number
                    </div>
                    <div className="flex-1">
                      <Input
                        id="whatsappNumber"
                        placeholder="+1234567890"
                        value={formData.whatsappNumber}
                        onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                        className="border border-gray-300 bg-white h-10 rounded-md shadow-none"
                      />
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Terms
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="termsAndConditions"
                          checked={formData.termsAndConditions}
                          onCheckedChange={(checked) =>
                            handleInputChange("termsAndConditions", checked)
                          }
                        />
                        <Label htmlFor="termsAndConditions">
                          I agree to the terms and conditions
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button
                      type="button"
                      onClick={goToPrevTab}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Previous
                    </Button>
                    <Button
                      type="button"
                      onClick={goToNextTab}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    >
                      Next <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Location */}
          <TabsContent value="location">
            <Card>
              <CardHeader>
                <CardTitle>Location Details</CardTitle>
                <CardDescription>Where the vehicle is located</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* City - Now required */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      City<span className="text-red-500">*</span>
                    </div>
                    <div className="flex-1">
                      <Input
                        id="city"
                        placeholder="e.g., Colombo"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                        className="border border-gray-300 bg-white h-10 rounded-md shadow-none"
                      />
                    </div>
                  </div>

                  {/* Location/Area - Now required */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Location/Area<span className="text-red-500">*</span>
                    </div>
                    <div className="flex-1">
                      <Input
                        id="location"
                        placeholder="e.g., Nugegoda"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        required
                        className="border border-gray-300 bg-white h-10 rounded-md shadow-none"
                      />
                    </div>
                  </div>

                  {/* Province/State */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Province
                    </div>
                    <div className="flex-1">
                      <Input
                        id="province"
                        placeholder="e.g., Western Province"
                        value={formData.province}
                        onChange={(e) => handleInputChange("province", e.target.value)}
                        className="border border-gray-300 bg-white h-10 rounded-md shadow-none"
                      />
                    </div>
                  </div>

                  {/* District */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      District
                    </div>
                    <div className="flex-1">
                      <Input
                        id="district"
                        placeholder="e.g., Colombo District"
                        value={formData.district}
                        onChange={(e) => handleInputChange("district", e.target.value)}
                        className="border border-gray-300 bg-white h-10 rounded-md shadow-none"
                      />
                    </div>
                  </div>

                  {/* Full Address */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600 pt-2">
                      Full Address
                    </div>
                    <div className="flex-1">
                      <Textarea
                        id="address"
                        placeholder="Complete address where the vehicle can be viewed in Sri Lanka..."
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        rows={3}
                        className="border border-gray-300 bg-white rounded-md shadow-none resize-y"
                      />
                    </div>
                  </div>

                  {/* Special Notes */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600 pt-2">
                      Special Notes
                    </div>
                    <div className="flex-1">
                      <Textarea
                        id="specialNote"
                        placeholder="Any additional information or special instructions about the location..."
                        value={formData.specialNote}
                        onChange={(e) => handleInputChange("specialNote", e.target.value)}
                        rows={3}
                        className="border border-gray-300 bg-white rounded-md shadow-none resize-y"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button
                      type="button"
                      onClick={goToPrevTab}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Previous
                    </Button>
                    <Button
                      type="button"
                      onClick={goToNextTab}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    >
                      Next <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Additional settings about your ad</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Tags */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Tags
                    </div>
                    <div className="flex-1">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a tag"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                          className="border border-gray-300 bg-white h-10 rounded-md shadow-none"
                        />
                        <Button type="button" onClick={addTag} variant="outline">
                          <TagIcon className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {tag}
                            <X
                              className="w-3 h-3 cursor-pointer"
                              onClick={() => removeTag(tag)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Separator />
                  </div>

                  {/* Publish Status */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Publish Status
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="published"
                          checked={formData.published}
                          onCheckedChange={(checked) => handleInputChange("published", checked)}
                        />
                        <Label htmlFor="published">Publish immediately</Label>
                      </div>
                    </div>
                  </div>

                  {/* Boost ad */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Boost Ad
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="boosted"
                          checked={formData.boosted}
                          onCheckedChange={(checked) => handleInputChange("boosted", checked)}
                        />
                        <Label htmlFor="boosted">Boost ad</Label>
                      </div>
                    </div>
                  </div>

                  {/* Featured ad */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Featured Ad
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          checked={formData.featured}
                          onCheckedChange={(checked) => handleInputChange("featured", checked)}
                        />
                        <Label htmlFor="featured">Featured ad</Label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Separator />
                  </div>

                  {/* SEO Title */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      SEO Title
                    </div>
                    <div className="flex-1">
                      <div className="space-y-2">
                        <Input
                          id="seoTitle"
                          placeholder="SEO optimized title"
                          value={formData.seoTitle}
                          onChange={(e) => handleInputChange("seoTitle", e.target.value)}
                          className="border border-gray-300 bg-white h-10 rounded-md shadow-none"
                        />
                        <div className="flex justify-end">
                          <Button
                            type="button"
                            onClick={() => {
                              const autoTitle = [
                                formData.brand,
                                formData.model,
                                formData.manufacturedYear,
                                formData.vehicleType
                              ].filter(Boolean).join(' ');
                              
                              handleInputChange("seoTitle", autoTitle);
                            }}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            Auto-Generate Title
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500">
                          Auto-generated title format: Make + Model + Year + Vehicle Type
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* SEO Description */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600 pt-2">
                      SEO Description
                    </div>
                    <div className="flex-1">
                      <Textarea
                        id="seoDescription"
                        placeholder="SEO meta description"
                        value={formData.seoDescription}
                        onChange={(e) => handleInputChange("seoDescription", e.target.value)}
                        rows={3}
                        className="border border-gray-300 bg-white rounded-md shadow-none resize-y"
                      />
                    </div>
                  </div>

                  {/* Draft status */}
                  <div className="flex items-center">
                    <div className="w-48 text-right pr-4 text-gray-600">
                      Save as Draft
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="isDraft"
                          checked={formData.isDraft}
                          onCheckedChange={(checked) => handleInputChange("isDraft", checked)}
                        />
                        <Label htmlFor="isDraft">Save as draft (not visible to public)</Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-start mt-6">
                    <Button
                      type="button"
                      onClick={goToPrevTab}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Previous
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Image Editor Dialog */}
        <Dialog
          open={!!editingImage}
          onOpenChange={(open) => !open && cancelImageEdit()}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Image</DialogTitle>
              <DialogDescription>
                Add SEO metadata and crop your image if needed.
              </DialogDescription>
            </DialogHeader>

            {editingImage && (
              <div className="space-y-4">
                {/* Image preview */}
                <div className="relative aspect-video rounded-md overflow-hidden border border-gray-200">
                  <Image
                    src={editingImage.image.url}
                    alt="Image preview"
                    className="object-contain w-full h-full"
                    width={600}
                    height={300}
                  />
                </div>

                {/* Image metadata fields */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="imageTitle">Image Title (for SEO)</Label>
                    <Input
                      id="imageTitle"
                      value={imageTitle}
                      onChange={(e) => setImageTitle(e.target.value)}
                      placeholder="Descriptive title of the image"
                    />
                    <p className="text-xs text-muted-foreground">
                      A descriptive title helps with search engine visibility
                    </p>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="imageAlt">
                      Alt Text (for accessibility)
                    </Label>
                    <Input
                      id="imageAlt"
                      value={imageAlt}
                      onChange={(e) => setImageAlt(e.target.value)}
                      placeholder="Description for screen readers"
                    />
                    <p className="text-xs text-muted-foreground">
                      Alt text helps people using screen readers understand the
                      image
                    </p>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="sm:justify-between">
              <Button type="button" variant="outline" onClick={cancelImageEdit}>
                Cancel
              </Button>
              <Button
                type="button"
                variant="default"
                onClick={saveImageEdits}
                className="flex items-center gap-1"
              >
                <Check className="w-4 h-4" /> Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Form submission buttons */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={() => router.push("/dashboard/ads")}
          >
            Cancel
          </Button>
          <div className="space-x-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />{" "}
                  {submitButtonText}...
                </>
              ) : (
                submitButtonText
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
