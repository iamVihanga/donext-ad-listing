"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Car, DollarSign, MapPin, Phone, Settings, Tag, X, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { CreateAdSchema } from "@/server/routes/ad/ad.schemas";
import { Upload, XCircle, PlusCircle, ImageIcon, Edit, Crop, Check } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export type AdFormProps = {
  initialData?: any;
  onSubmit: (data: CreateAdSchema) => void;
  isSubmitting: boolean;
  title: string;
  description: string;
  submitButtonText: string;
}

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
  const tabOrder = ["vehicle", "images", "pricing", "contact", "location", "basic"];

  const [uploadedImages, setUploadedImages] = useState<Array<{
    id: string, 
    url: string, 
    file?: File,
    name?: string, 
    size?: number,
    title?: string,
    alt?: string
  }>>([]);
  
  const [isUploading, setIsUploading] = useState(false);
  
  // Image editor state
  const [editingImage, setEditingImage] = useState<{index: number, image: any} | null>(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "CAR",
    published: false,
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
    metadata: {},
  });

  // Update form data if initialData changes (for edit form)
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        type: initialData.type || "CAR",
        published: initialData.published || false,
        boosted: initialData.boosted || false,
        featured: initialData.featured || false,
        seoTitle: initialData.seoTitle || "",
        seoDescription: initialData.seoDescription || "",
        categoryId: initialData.categoryId || "",
        tags: initialData.tags || [],
        price: initialData.price ? String(initialData.price) : "",
        discountPrice: initialData.discountPrice ? String(initialData.discountPrice) : "",
        condition: initialData.condition || "",
        brand: initialData.brand || "",
        model: initialData.model || "",
        mileage: initialData.mileage ? String(initialData.mileage) : "",
        vehicleType: initialData.vehicleType || "",
        manufacturedYear: initialData.manufacturedYear || "",
        transmission: initialData.transmission || "",
        fuelType: initialData.fuelType || "",
        engineCapacity: initialData.engineCapacity ? String(initialData.engineCapacity) : "",
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
        metadata: initialData.metadata || {},
      });
      
      // Load images from initialData if available
      if (initialData.media && Array.isArray(initialData.media)) {
        setUploadedImages(initialData.media);
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
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((tag) => tag !== tagToRemove) }));
  };

  const addOption = () => {
    if (newOption.trim() && !formData.options.includes(newOption.trim())) {
      setFormData((prev) => ({ ...prev, options: [...prev.options, newOption.trim()] }));
      setNewOption("");
    }
  };

  const removeOption = (optionToRemove: string) => {
    setFormData((prev) => ({ ...prev, options: prev.options.filter((option) => option !== optionToRemove) }));
  };

  // Image handling functions
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const filesArray = Array.from(e.target.files);
    const remainingSlots = 6 - uploadedImages.length;
    
    if (filesArray.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more image${remainingSlots !== 1 ? 's' : ''}.`);
      return;
    }
    
    setIsUploading(true);
    
    // Process images one by one (without restriction on size)
    const newImages = filesArray.map(file => {
      // Create a temporary URL for preview
      const previewUrl = URL.createObjectURL(file);
      
      return {
        id: `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        url: previewUrl,
        file: file,
        name: file.name,
        size: file.size,
        title: "", // Adding title field for SEO
        alt: ""    // Adding alt field for SEO
      };
    });
    
    // Mock delay for upload
    setTimeout(() => {
      setUploadedImages(prev => [...prev, ...newImages]);
      setIsUploading(false);
      
      // Reset the input value so the same file can be selected again
      e.target.value = '';
    }, 1000);
    
    // Note: In a real implementation, you'd send these files to your backend
    // where they would be processed and compressed
  };

  const removeImage = (idToRemove: string) => {
    setUploadedImages(prev => prev.filter(image => image.id !== idToRemove));
  };

  const reorderImages = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    
    const updatedImages = [...uploadedImages];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    
    setUploadedImages(updatedImages);
  };

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null) return;
    if (draggedIndex === dropIndex) return;
    
    reorderImages(draggedIndex, dropIndex);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Image editor functions
  const openImageEditor = (index: number) => {
    const image = uploadedImages[index];
    setEditingImage({ index, image });
    setImageTitle(image.title || "");
    setImageAlt(image.alt || "");
  };

  const saveImageEdits = () => {
    if (!editingImage) return;
    
    setUploadedImages(prev => prev.map((img, idx) => 
      idx === editingImage.index 
        ? { ...img, title: imageTitle, alt: imageAlt }
        : img
    ));
    
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

    // Map formData to CreateAdSchema
    const adData: CreateAdSchema = {
      title: formData.title || undefined,
      description: formData.description || undefined,
      type: formData.type as any, // Ensure type matches AdType enum
      published: formData.published,
      boosted: formData.boosted,
      featured: formData.featured,
      seoTitle: formData.seoTitle || undefined,
      seoDescription: formData.seoDescription || undefined,
      categoryId: formData.categoryId || undefined,
      tags: formData.tags.length > 0 ? formData.tags : undefined,
      price: formData.price ? parseFloat(formData.price) : undefined,
      discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : undefined,
      condition: formData.condition || undefined,
      brand: formData.brand || undefined,
      model: formData.model || undefined,
      mileage: formData.mileage ? parseInt(formData.mileage) : undefined,
      vehicleType: formData.vehicleType || undefined,
      manufacturedYear: formData.manufacturedYear || undefined,
      transmission: formData.transmission || undefined,
      fuelType: formData.fuelType || undefined,
      engineCapacity: formData.engineCapacity ? parseInt(formData.engineCapacity) : undefined,
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
      
      // Include media with SEO data
      media: uploadedImages.length > 0 
        ? uploadedImages.map(img => ({
            id: img.id,
            url: img.url,
            title: img.title || undefined,
            alt: img.alt || undefined
          })) 
        : undefined,
    };

    onSubmit(adData);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., 2020 Toyota Camry - Excellent Condition"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Ad Type</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CAR">Car</SelectItem>
                        <SelectItem value="MOTORCYCLE">Motorcycle</SelectItem>
                        <SelectItem value="TRUCK">Truck</SelectItem>
                        <SelectItem value="VAN">Van</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your vehicle in detail..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      placeholder="e.g., Toyota"
                      value={formData.brand}
                      onChange={(e) => handleInputChange("brand", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      placeholder="e.g., Camry"
                      value={formData.model}
                      onChange={(e) => handleInputChange("model", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manufacturedYear">Year</Label>
                    <Input
                      id="manufacturedYear"
                      type="number"
                      placeholder="2020"
                      value={formData.manufacturedYear}
                      onChange={(e) => handleInputChange("manufacturedYear", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition</Label>
                    <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NEW">New</SelectItem>
                        <SelectItem value="EXCELLENT">Excellent</SelectItem>
                        <SelectItem value="GOOD">Good</SelectItem>
                        <SelectItem value="FAIR">Fair</SelectItem>
                        <SelectItem value="POOR">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transmission">Transmission</Label>
                    <Select
                      value={formData.transmission}
                      onValueChange={(value) => handleInputChange("transmission", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MANUAL">Manual</SelectItem>
                        <SelectItem value="AUTOMATIC">Automatic</SelectItem>
                        <SelectItem value="CVT">CVT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Fuel Type</Label>
                    <Select value={formData.fuelType} onValueChange={(value) => handleInputChange("fuelType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PETROL">Petrol</SelectItem>
                        <SelectItem value="DIESEL">Diesel</SelectItem>
                        <SelectItem value="HYBRID">Hybrid</SelectItem>
                        <SelectItem value="ELECTRIC">Electric</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Mileage (km)</Label>
                    <Input
                      id="mileage"
                      type="number"
                      placeholder="50000"
                      value={formData.mileage}
                      onChange={(e) => handleInputChange("mileage", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="engineCapacity">Engine Capacity (cc)</Label>
                    <Input
                      id="engineCapacity"
                      type="number"
                      placeholder="2000"
                      value={formData.engineCapacity}
                      onChange={(e) => handleInputChange("engineCapacity", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isLeased"
                    checked={formData.isLeased}
                    onCheckedChange={(checked) => handleInputChange("isLeased", checked)}
                  />
                  <Label htmlFor="isLeased">This vehicle is leased</Label>
                </div>

                <div className="space-y-4">
                  <Label>Vehicle Options & Features</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add an option/feature"
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addOption())}
                    />
                    <Button type="button" onClick={addOption} variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.options.map((option) => (
                      <Badge key={option} variant="outline" className="flex items-center gap-1">
                        {option}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeOption(option)} />
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button 
                    type="button" 
                    onClick={goToNextTab} 
                    className="flex items-center gap-2"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Images Section */}
          <TabsContent value="images">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Images</CardTitle>
                <CardDescription>Upload up to 6 images of your vehicle (First image will be the main image)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Compact upload area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    id="vehicleImages"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    disabled={uploadedImages.length >= 6 || isUploading}
                  />
                  
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Upload className="w-5 h-5 text-muted-foreground" />
                    </div>
                    
                    <div className="text-left space-y-1">
                      <p className="text-sm font-medium">
                        {uploadedImages.length === 0 ? (
                          "Upload up to 6 images"
                        ) : uploadedImages.length >= 6 ? (
                          "Maximum number of images reached (6/6)"
                        ) : (
                          `Upload more images (${uploadedImages.length}/6)`
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Supported formats: JPEG, PNG, WebP
                      </p>
                    </div>
                    
                    {uploadedImages.length < 6 && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => document.getElementById('vehicleImages')?.click()}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-1 animate-spin" /> 
                            Uploading...
                          </>
                        ) : (
                          <>
                            <PlusCircle className="w-4 h-4 mr-1" /> 
                            Select Images
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* Image preview grid with drag and drop */}
                {uploadedImages.length > 0 && (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>
                          Uploaded Images ({uploadedImages.length}/6)
                        </Label>
                        <span className="text-sm text-muted-foreground">
                          Drag images to reorder • First image is main
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {uploadedImages.map((image, index) => (
                          <div 
                            key={image.id} 
                            className={`
                              relative group aspect-video border rounded-md overflow-hidden cursor-move
                              ${index === 0 ? 'border-[#024950] border-2' : 'border-gray-200'}
                              ${draggedIndex === index ? 'opacity-50' : 'opacity-100'}
                            `}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDrop={(e) => handleDrop(e, index)}
                            onDragEnd={handleDragEnd}
                          >
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center space-y-2 z-10">
                              <Button 
                                type="button"
                                variant="destructive" 
                                size="sm"
                                className="w-3/4" 
                                onClick={() => removeImage(image.id)}
                              >
                                <XCircle className="w-4 h-4 mr-1" /> 
                                Remove
                              </Button>
                              
                              <Button 
                                type="button"
                                variant="secondary" 
                                size="sm"
                                className="w-3/4" 
                                onClick={() => openImageEditor(index)}
                              >
                                <Edit className="w-4 h-4 mr-1" /> 
                                Edit Image
                              </Button>
                              
                              {index !== 0 && (
                                <Button 
                                  type="button"
                                  variant="outline" 
                                  size="sm"
                                  className="w-3/4" 
                                  onClick={() => reorderImages(index, 0)}
                                >
                                  Set as Main
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
                            {(image.title || image.alt) && (
                              <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-sm z-20">
                                SEO
                              </div>
                            )}
                            
                            <img 
                              src={image.url} 
                              alt={image.alt || `Vehicle image ${index + 1}`} 
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium">Tip:</span> High-quality images from multiple angles will increase interest in your vehicle.
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
                    className="flex items-center gap-2"
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
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="25000"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discountPrice">Original Price</Label>
                    <Input
                      id="discountPrice"
                      type="number"
                      placeholder="28000"
                      value={formData.discountPrice}
                      onChange={(e) => handleInputChange("discountPrice", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      If there's a discount, enter the original price here
                    </p>
                  </div>
                </div>
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
                    className="flex items-center gap-2"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </Button>
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
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Contact Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      placeholder="+1234567890"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                  <Input
                    id="whatsappNumber"
                    placeholder="+1234567890"
                    value={formData.whatsappNumber}
                    onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="termsAndConditions"
                      checked={formData.termsAndConditions}
                      onCheckedChange={(checked) => handleInputChange("termsAndConditions", checked)}
                    />
                    <Label htmlFor="termsAndConditions">I agree to the terms and conditions</Label>
                  </div>
                </div>
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
                    className="flex items-center gap-2"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </Button>
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
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="province">Province/State</Label>
                    <Input
                      id="province"
                      placeholder="e.g., California"
                      value={formData.province}
                      onChange={(e) => handleInputChange("province", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      placeholder="e.g., Los Angeles County"
                      value={formData.district}
                      onChange={(e) => handleInputChange("district", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="e.g., Los Angeles"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location/Area</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Downtown"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Complete address where the vehicle can be viewed..."
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialNote">Special Notes</Label>
                  <Textarea
                    id="specialNote"
                    placeholder="Any additional information or special instructions..."
                    value={formData.specialNote}
                    onChange={(e) => handleInputChange("specialNote", e.target.value)}
                    rows={3}
                  />
                </div>
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
                    className="flex items-center gap-2"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </Button>
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
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      <Tag className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) => handleInputChange("published", checked)}
                    />
                    <Label htmlFor="published">Publish immediately</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="boosted"
                      checked={formData.boosted}
                      onCheckedChange={(checked) => handleInputChange("boosted", checked)}
                    />
                    <Label htmlFor="boosted">Boost ad</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleInputChange("featured", checked)}
                    />
                    <Label htmlFor="featured">Featured ad</Label>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">SEO Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="seoTitle">SEO Title</Label>
                      <Input
                        id="seoTitle"
                        placeholder="SEO optimized title"
                        value={formData.seoTitle}
                        onChange={(e) => handleInputChange("seoTitle", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="seoDescription">SEO Description</Label>
                      <Input
                        id="seoDescription"
                        placeholder="SEO meta description"
                        value={formData.seoDescription}
                        onChange={(e) => handleInputChange("seoDescription", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-start mt-4">
                  <Button 
                    type="button" 
                    onClick={goToPrevTab} 
                    variant="outline" 
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Image Editor Dialog */}
        <Dialog open={!!editingImage} onOpenChange={(open) => !open && cancelImageEdit()}>
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
                  <img 
                    src={editingImage.image.url} 
                    alt="Image preview" 
                    className="object-contain w-full h-full"
                  />
                </div>
                
                {/* Image metadata fields */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="imageTitle">Image Title (for SEO)</Label>
                    <Input
                      id="imageTitle"
                      placeholder="Descriptive title for this image"
                      value={imageTitle}
                      onChange={(e) => setImageTitle(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      A concise, descriptive title helps with SEO.
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="imageAlt">Alt Text (for accessibility)</Label>
                    <Input
                      id="imageAlt"
                      placeholder="Describe what's in the image"
                      value={imageAlt}
                      onChange={(e) => setImageAlt(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Describe the image for screen readers and SEO.
                    </p>
                  </div>
                  
                  {/* Image crop functionality would be here in a real implementation */}
                  <div className="bg-muted p-3 rounded-md">
                    <p className="text-sm flex items-center gap-2">
                      <Crop className="w-4 h-4" />
                      Image cropping functionality would be implemented here.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter className="sm:justify-between">
              <Button 
                type="button"
                variant="outline"
                onClick={cancelImageEdit}
              >
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
            onClick={() => router.push('/dashboard/ads')}
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
                  <Loader2 className="w-4 h-4 animate-spin" /> {submitButtonText}...
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