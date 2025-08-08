"use client"

import { useState } from "react";
import { useSetupAd } from "@/features/ads/api/use-setup-ad";
import { useRouter } from "next/navigation";
import { CreateAdSchema } from "@/server/routes/ad/ad.schemas";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2, Camera, ChevronRight, CheckCircle2 } from "lucide-react";

export default function QuickAdCreatePage() {
  const router = useRouter();
  const { mutate: createAd, isPending } = useSetupAd();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic info
    type: "CAR", // API enum value
    brand: "",
    model: "",
    manufacturedYear: "",
    modelYear: "",
    price: "",
    condition: "",
    description: "",
    
    // Vehicle details based on type
    transmission: "",
    fuelType: "",
    mileage: "",
    engineCapacity: "",
    trimEdition: "",
    
    // Type-specific fields
    bikeType: "",
    bodyType: "",
    serviceType: "",
    partType: "",
    maintenanceType: "",
    vehicleType: "",
    
    // Contact info
    name: "",
    phoneNumber: "",
    whatsappNumber: "",
    city: "",
    location: "",
    termsAndConditions: false,
    
    // Publication status
    published: true,
    isDraft: false
  });

  // Generate available years (current year down to 1970)
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1969 },
    (_, i) => String(currentYear - i)
  );
  
  // Vehicle makes list - same as your ad-form.tsx
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
  
  // Simple form field change handler
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  // Handle form submission
  const handleSubmit = () => {
    // Auto-generate title from vehicle details
    const titleParts = [
      formData.condition,
      formData.brand,
      formData.model,
      formData.manufacturedYear || formData.modelYear,
      formData.trimEdition
    ].filter(Boolean);
    
    const title = titleParts.length > 0 ? titleParts.join(" ") : "Vehicle Ad";
    
    // Format numeric fields
    const price = formData.price ? parseFloat(formData.price) : undefined;
    const mileage = formData.mileage ? parseFloat(formData.mileage) : undefined;
    const engineCapacity = formData.engineCapacity ? parseFloat(formData.engineCapacity) : undefined;
    
    // Prepare ad data according to your updated schema
    const adData: CreateAdSchema = {
      title,
      description: formData.description || "No description provided",
      type: formData.type as any,
      price,

      // Common vehicle fields
      condition: formData.condition || undefined,
      brand: formData.brand || undefined,
      model: formData.model || undefined,
      trimEdition: formData.trimEdition || undefined,

      // Year fields (use appropriate field based on type)
      manufacturedYear: (formData.type === "CAR" || formData.type === "MOTORCYCLE" || formData.type === "THREE_WHEEL" || formData.type === "BUS" || formData.type === "LORRY" || formData.type === "HEAVY_DUTY" || formData.type === "TRACTOR") ? formData.manufacturedYear || undefined : undefined,
      modelYear: (formData.type === "VAN") ? formData.modelYear || undefined : undefined,

      // Performance fields
      mileage,
      engineCapacity,

      // Type-specific enum fields - cast to proper types
      fuelType: formData.fuelType ? formData.fuelType as "PETROL" | "DIESEL" | "HYBRID" | "ELECTRIC" | "GAS" : undefined,
      transmission: formData.transmission ? formData.transmission as "MANUAL" | "AUTOMATIC" | "CVT" : undefined,
      bodyType: formData.bodyType ? formData.bodyType as "SALOON" | "HATCHBACK" | "STATION_WAGON" : undefined,
      bikeType: formData.bikeType ? formData.bikeType as "SCOOTER" | "E_BIKE" | "MOTORBIKES" | "QUADRICYCLES" : undefined,
      vehicleType: formData.vehicleType ? formData.vehicleType as "BED_TRAILER" | "BOWSER" | "BULLDOZER" | "CRANE" | "DUMP_TRUCK" | "EXCAVATOR" | "LOADER" | "OTHER" : undefined,

      // Service & parts fields
      serviceType: formData.serviceType || undefined,
      partType: formData.partType || undefined,
      maintenanceType: formData.maintenanceType || undefined,

      // Contact info
      name: formData.name || undefined,
      phoneNumber: formData.phoneNumber || undefined,
      whatsappNumber: formData.whatsappNumber || undefined,

      // Location info
      city: formData.city || undefined,
      location: formData.location || undefined,

      // Settings
      termsAndConditions: formData.termsAndConditions || undefined,
      published: formData.published,
      isDraft: formData.isDraft,
      boosted: false,
      featured: false
    };
    
    createAd(
      { values: adData },
      {
        onSuccess: (data) => {
          router.push(`/dashboard/ads/${data.id}`);
        }
      }
    );
  };
  
  // Check if required fields are filled based on step and vehicle type
  const canProceed = () => {
    switch(currentStep) {
      case 1:
        // Basic vehicle info required - depends on vehicle type
        if (["AUTO_SERVICE", "RENTAL", "MAINTENANCE"].includes(formData.type)) {
          return formData.type;
        }
        
        if (formData.type === "BICYCLE") {
          return formData.type && formData.brand;
        }
        
        if (formData.type === "AUTO_PARTS") {
          return formData.type && formData.brand && formData.model;
        }
        
        // For all vehicle types that need year
        const basicRequired = formData.type && formData.brand && formData.model;
        const yearRequired = (formData.type === "VAN") ? formData.modelYear : formData.manufacturedYear;
        
        return basicRequired && yearRequired;
        
      case 2:
        // Vehicle details required
        let detailsRequired = formData.price && formData.condition && formData.description;
        
        // Type-specific required fields
        if (formData.type === "CAR") {
          detailsRequired = detailsRequired && formData.fuelType && formData.transmission;
        } else if (formData.type === "MOTORCYCLE") {
          detailsRequired = detailsRequired && formData.bikeType && formData.engineCapacity;
        } else if (formData.type === "AUTO_SERVICE" || formData.type === "RENTAL") {
          detailsRequired = detailsRequired && formData.serviceType;
        } else if (formData.type === "AUTO_PARTS") {
          detailsRequired = detailsRequired && formData.partType;
        } else if (formData.type === "MAINTENANCE") {
          detailsRequired = detailsRequired && formData.maintenanceType;
        } else if (formData.type === "HEAVY_DUTY") {
          detailsRequired = detailsRequired && formData.vehicleType;
        } else if (["THREE_WHEEL", "BUS", "LORRY", "TRACTOR"].includes(formData.type)) {
          detailsRequired = detailsRequired && formData.fuelType;
        }
        
        return detailsRequired;
        
      case 3:
        // Contact info required
        return formData.name && formData.phoneNumber && formData.city && formData.location && formData.termsAndConditions;
        
      default:
        return false;
    }
  };

  // Render dynamic vehicle fields based on type
  const renderVehicleFields = () => {
    switch (formData.type) {
      case "CAR":
        return (
          <>
            {/* Condition */}
            <div>
              <label className="block text-sm font-medium mb-1">Condition<span className="text-red-500">*</span></label>
              <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">Brand New</SelectItem>
                  <SelectItem value="Reconditioned">Reconditioned</SelectItem>
                  <SelectItem value="Used">Used</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium mb-1">Brand<span className="text-red-500">*</span></label>
              <Select value={formData.brand} onValueChange={(value) => handleInputChange("brand", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent className="max-h-[280px]">
                  {vehicleMakes.map(make => (
                    <SelectItem key={make} value={make}>{make}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium mb-1">Model<span className="text-red-500">*</span></label>
              <Input 
                placeholder="e.g., Camry" 
                value={formData.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
              />
            </div>

            {/* Trim/Edition */}
            <div>
              <label className="block text-sm font-medium mb-1">Trim / Edition</label>
              <Input 
                placeholder="e.g., Sport" 
                value={formData.trimEdition}
                onChange={(e) => handleInputChange("trimEdition", e.target.value)}
              />
            </div>

            {/* Year of Manufacture */}
            <div>
              <label className="block text-sm font-medium mb-1">Year of Manufacture<span className="text-red-500">*</span></label>
              <Select value={formData.manufacturedYear} onValueChange={(value) => handleInputChange("manufacturedYear", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="max-h-[280px]">
                  {years.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "VAN":
        return (
          <>
            {/* Condition */}
            <div>
              <label className="block text-sm font-medium mb-1">Condition<span className="text-red-500">*</span></label>
              <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">Brand New</SelectItem>
                  <SelectItem value="Reconditioned">Reconditioned</SelectItem>
                  <SelectItem value="Used">Used</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium mb-1">Brand<span className="text-red-500">*</span></label>
              <Select value={formData.brand} onValueChange={(value) => handleInputChange("brand", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent className="max-h-[280px]">
                  {vehicleMakes.map(make => (
                    <SelectItem key={make} value={make}>{make}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium mb-1">Model<span className="text-red-500">*</span></label>
              <Input 
                placeholder="e.g., Hiace" 
                value={formData.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
              />
            </div>

            {/* Trim/Edition */}
            <div>
              <label className="block text-sm font-medium mb-1">Trim / Edition</label>
              <Input 
                placeholder="e.g., GL" 
                value={formData.trimEdition}
                onChange={(e) => handleInputChange("trimEdition", e.target.value)}
              />
            </div>

            {/* Model Year */}
            <div>
              <label className="block text-sm font-medium mb-1">Model Year<span className="text-red-500">*</span></label>
              <Select value={formData.modelYear} onValueChange={(value) => handleInputChange("modelYear", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="max-h-[280px]">
                  {years.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "MOTORCYCLE":
        return (
          <>
            {/* Condition */}
            <div>
              <label className="block text-sm font-medium mb-1">Condition<span className="text-red-500">*</span></label>
              <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">Brand New</SelectItem>
                  <SelectItem value="Used">Used</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bike Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Bike Type<span className="text-red-500">*</span></label>
              <Select value={formData.bikeType} onValueChange={(value) => handleInputChange("bikeType", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select bike type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SCOOTER">Scooter</SelectItem>
                  <SelectItem value="E_BIKE">E-Bike</SelectItem>
                  <SelectItem value="MOTORBIKES">Motorbikes</SelectItem>
                  <SelectItem value="QUADRICYCLES">Quadricycles</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium mb-1">Brand<span className="text-red-500">*</span></label>
              <Input 
                placeholder="e.g., Honda" 
                value={formData.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
              />
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium mb-1">Model<span className="text-red-500">*</span></label>
              <Input 
                placeholder="e.g., CBR 250R" 
                value={formData.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
              />
            </div>

            {/* Year of Manufacture */}
            <div>
              <label className="block text-sm font-medium mb-1">Year of Manufacture<span className="text-red-500">*</span></label>
              <Select value={formData.manufacturedYear} onValueChange={(value) => handleInputChange("manufacturedYear", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="max-h-[280px]">
                  {years.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "BICYCLE":
        return (
          <>
            {/* Brand */}
            <div>
              <label className="block text-sm font-medium mb-1">Brand<span className="text-red-500">*</span></label>
              <Input 
                placeholder="e.g., Giant" 
                value={formData.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
              />
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm font-medium mb-1">Condition<span className="text-red-500">*</span></label>
              <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">Brand New</SelectItem>
                  <SelectItem value="Used">Used</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "THREE_WHEEL":
        return (
          <>
            {/* Condition */}
            <div>
              <label className="block text-sm font-medium mb-1">Condition<span className="text-red-500">*</span></label>
              <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">Brand New</SelectItem>
                  <SelectItem value="Reconditioned">Reconditioned</SelectItem>
                  <SelectItem value="Used">Used</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium mb-1">Brand<span className="text-red-500">*</span></label>
              <Select value={formData.brand} onValueChange={(value) => handleInputChange("brand", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent className="max-h-[280px]">
                  {vehicleMakes.map(make => (
                    <SelectItem key={make} value={make}>{make}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium mb-1">Model<span className="text-red-500">*</span></label>
              <Input 
                placeholder="e.g., Bajaj RE" 
                value={formData.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
              />
            </div>

            {/* Year of Manufacture */}
            <div>
              <label className="block text-sm font-medium mb-1">Year of Manufacture<span className="text-red-500">*</span></label>
              <Select value={formData.manufacturedYear} onValueChange={(value) => handleInputChange("manufacturedYear", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="max-h-[280px]">
                  {years.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "BUS":
      case "LORRY":
      case "TRACTOR":
        return (
          <>
            {/* Condition */}
            <div>
              <label className="block text-sm font-medium mb-1">Condition<span className="text-red-500">*</span></label>
              <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">Brand New</SelectItem>
                  <SelectItem value="Reconditioned">Reconditioned</SelectItem>
                  <SelectItem value="Used">Used</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium mb-1">Brand<span className="text-red-500">*</span></label>
              <Select value={formData.brand} onValueChange={(value) => handleInputChange("brand", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent className="max-h-[280px]">
                  {vehicleMakes.map(make => (
                    <SelectItem key={make} value={make}>{make}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium mb-1">Model<span className="text-red-500">*</span></label>
              <Input 
                placeholder={formData.type === "BUS" ? "e.g., Rosa" : formData.type === "LORRY" ? "e.g., Canter" : "e.g., MF240"}
                value={formData.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
              />
            </div>

            {/* Year of Manufacture */}
            <div>
              <label className="block text-sm font-medium mb-1">Year of Manufacture<span className="text-red-500">*</span></label>
              <Select value={formData.manufacturedYear} onValueChange={(value) => handleInputChange("manufacturedYear", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="max-h-[280px]">
                  {years.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "HEAVY_DUTY":
        return (
          <>
            {/* Condition */}
            <div>
              <label className="block text-sm font-medium mb-1">Condition<span className="text-red-500">*</span></label>
              <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">Brand New</SelectItem>
                  <SelectItem value="Reconditioned">Reconditioned</SelectItem>
                  <SelectItem value="Used">Used</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Vehicle Type<span className="text-red-500">*</span></label>
              <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange("vehicleType", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BED_TRAILER">Bed Trailer</SelectItem>
                  <SelectItem value="BOWSER">Bowser</SelectItem>
                  <SelectItem value="BULLDOZER">Bulldozer</SelectItem>
                  <SelectItem value="CRANE">Crane</SelectItem>
                  <SelectItem value="DUMP_TRUCK">Dump Truck</SelectItem>
                  <SelectItem value="EXCAVATOR">Excavator</SelectItem>
                  <SelectItem value="LOADER">Loader</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium mb-1">Brand<span className="text-red-500">*</span></label>
              <Select value={formData.brand} onValueChange={(value) => handleInputChange("brand", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent className="max-h-[280px]">
                  {vehicleMakes.map(make => (
                    <SelectItem key={make} value={make}>{make}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium mb-1">Model<span className="text-red-500">*</span></label>
              <Input 
                placeholder="e.g., PC200" 
                value={formData.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
              />
            </div>

            {/* Year of Manufacture */}
            <div>
              <label className="block text-sm font-medium mb-1">Year of Manufacture<span className="text-red-500">*</span></label>
              <Select value={formData.manufacturedYear} onValueChange={(value) => handleInputChange("manufacturedYear", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="max-h-[280px]">
                  {years.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "AUTO_SERVICE":
      case "RENTAL":
        return (
          <>
            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Service Type<span className="text-red-500">*</span></label>
              <Input 
                placeholder={formData.type === "AUTO_SERVICE" ? "e.g., Car Wash, Repair" : "e.g., Car Rental, Van Rental"}
                value={formData.serviceType}
                onChange={(e) => handleInputChange("serviceType", e.target.value)}
              />
            </div>
          </>
        );

      case "AUTO_PARTS":
        return (
          <>
            {/* Condition */}
            <div>
              <label className="block text-sm font-medium mb-1">Condition<span className="text-red-500">*</span></label>
              <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">Brand New</SelectItem>
                  <SelectItem value="Used">Used</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Part Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Part or Accessory Type<span className="text-red-500">*</span></label>
              <Input 
                placeholder="e.g., Engine Parts, Tires" 
                value={formData.partType}
                onChange={(e) => handleInputChange("partType", e.target.value)}
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium mb-1">Brand<span className="text-red-500">*</span></label>
              <Input 
                placeholder="e.g., Bosch" 
                value={formData.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
              />
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium mb-1">Model<span className="text-red-500">*</span></label>
              <Input 
                placeholder="e.g., Compatible model" 
                value={formData.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
              />
            </div>
          </>
        );

      case "MAINTENANCE":
        return (
          <>
            {/* Maintenance Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Maintenance and Repair Type<span className="text-red-500">*</span></label>
              <Input 
                placeholder="e.g., Engine Repair, Body Work" 
                value={formData.maintenanceType}
                onChange={(e) => handleInputChange("maintenanceType", e.target.value)}
              />
            </div>
          </>
        );

      case "BOAT":
        return (
          <>
            {/* Condition */}
            <div>
              <label className="block text-sm font-medium mb-1">Condition<span className="text-red-500">*</span></label>
              <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">Brand New</SelectItem>
                  <SelectItem value="Used">Used</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  // Render step 2 dynamic fields based on vehicle type
  const renderStep2Fields = () => {
    switch (formData.type) {
      case "CAR":
        return (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Transmission<span className="text-red-500">*</span></label>
                <Select value={formData.transmission} onValueChange={(value) => handleInputChange("transmission", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AUTOMATIC">Automatic</SelectItem>
                    <SelectItem value="MANUAL">Manual</SelectItem>
                    <SelectItem value="CVT">CVT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fuel Type<span className="text-red-500">*</span></label>
                <Select value={formData.fuelType} onValueChange={(value) => handleInputChange("fuelType", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PETROL">Petrol</SelectItem>
                    <SelectItem value="DIESEL">Diesel</SelectItem>
                    <SelectItem value="HYBRID">Hybrid</SelectItem>
                    <SelectItem value="ELECTRIC">Electric</SelectItem>
                    <SelectItem value="GAS">Gas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Mileage (km)</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 45000" 
                  value={formData.mileage}
                  onChange={(e) => handleInputChange("mileage", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Engine (cc)</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 1500" 
                  value={formData.engineCapacity}
                  onChange={(e) => handleInputChange("engineCapacity", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Body Type</label>
              <Select value={formData.bodyType} onValueChange={(value) => handleInputChange("bodyType", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select body type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SALOON">Saloon</SelectItem>
                  <SelectItem value="HATCHBACK">Hatchback</SelectItem>
                  <SelectItem value="STATION_WAGON">Station Wagon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "VAN":
        return (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Mileage (km)</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 50000" 
                  value={formData.mileage}
                  onChange={(e) => handleInputChange("mileage", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Engine (cc)</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 2000" 
                  value={formData.engineCapacity}
                  onChange={(e) => handleInputChange("engineCapacity", e.target.value)}
                />
              </div>
            </div>
          </>
        );

      case "MOTORCYCLE":
        return (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Mileage (km)</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 15000" 
                  value={formData.mileage}
                  onChange={(e) => handleInputChange("mileage", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Engine (cc)<span className="text-red-500">*</span></label>
                <Input 
                  type="number" 
                  placeholder="e.g., 150" 
                  value={formData.engineCapacity}
                  onChange={(e) => handleInputChange("engineCapacity", e.target.value)}
                />
              </div>
            </div>
          </>
        );

      case "THREE_WHEEL":
        return (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Mileage (km)</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 25000" 
                  value={formData.mileage}
                  onChange={(e) => handleInputChange("mileage", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Engine (cc)</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 200" 
                  value={formData.engineCapacity}
                  onChange={(e) => handleInputChange("engineCapacity", e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Fuel Type<span className="text-red-500">*</span></label>
              <Select value={formData.fuelType} onValueChange={(value) => handleInputChange("fuelType", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PETROL">Petrol</SelectItem>
                  <SelectItem value="DIESEL">Diesel</SelectItem>
                  <SelectItem value="GAS">Gas (CNG/LPG)</SelectItem>
                  <SelectItem value="ELECTRIC">Electric</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "BUS":
        return (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Mileage (km)</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 150000" 
                  value={formData.mileage}
                  onChange={(e) => handleInputChange("mileage", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Engine (cc)</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 4000" 
                  value={formData.engineCapacity}
                  onChange={(e) => handleInputChange("engineCapacity", e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Fuel Type<span className="text-red-500">*</span></label>
                <Select value={formData.fuelType} onValueChange={(value) => handleInputChange("fuelType", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DIESEL">Diesel</SelectItem>
                    <SelectItem value="PETROL">Petrol</SelectItem>
                    <SelectItem value="GAS">Gas (CNG/LPG)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Transmission</label>
                <Select value={formData.transmission} onValueChange={(value) => handleInputChange("transmission", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MANUAL">Manual</SelectItem>
                    <SelectItem value="AUTOMATIC">Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );

      case "LORRY":
        return (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Mileage (km)</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 200000" 
                  value={formData.mileage}
                  onChange={(e) => handleInputChange("mileage", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Engine (cc)</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 3000" 
                  value={formData.engineCapacity}
                  onChange={(e) => handleInputChange("engineCapacity", e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Fuel Type<span className="text-red-500">*</span></label>
                <Select value={formData.fuelType} onValueChange={(value) => handleInputChange("fuelType", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DIESEL">Diesel</SelectItem>
                    <SelectItem value="PETROL">Petrol</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Transmission</label>
                <Select value={formData.transmission} onValueChange={(value) => handleInputChange("transmission", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MANUAL">Manual</SelectItem>
                    <SelectItem value="AUTOMATIC">Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );

      case "HEAVY_DUTY":
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Operating Hours</label>
              <Input 
                type="number" 
                placeholder="e.g., 5000" 
                value={formData.mileage}
                onChange={(e) => handleInputChange("mileage", e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Total operating hours for the machinery
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Engine (cc)</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 6000" 
                  value={formData.engineCapacity}
                  onChange={(e) => handleInputChange("engineCapacity", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fuel Type</label>
                <Select value={formData.fuelType} onValueChange={(value) => handleInputChange("fuelType", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DIESEL">Diesel</SelectItem>
                    <SelectItem value="ELECTRIC">Electric</SelectItem>
                    <SelectItem value="HYBRID">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );

      case "TRACTOR":
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Operating Hours</label>
              <Input 
                type="number" 
                placeholder="e.g., 2000" 
                value={formData.mileage}
                onChange={(e) => handleInputChange("mileage", e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Total operating hours for the tractor
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Engine (cc)</label>
                <Input 
                  type="number" 
                  placeholder="e.g., 2500" 
                  value={formData.engineCapacity}
                  onChange={(e) => handleInputChange("engineCapacity", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fuel Type<span className="text-red-500">*</span></label>
                <Select value={formData.fuelType} onValueChange={(value) => handleInputChange("fuelType", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DIESEL">Diesel</SelectItem>
                    <SelectItem value="PETROL">Petrol</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Transmission</label>
              <Select value={formData.transmission} onValueChange={(value) => handleInputChange("transmission", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MANUAL">Manual</SelectItem>
                  <SelectItem value="AUTOMATIC">Automatic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      default:
        return null;
    }
  };
  
  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-md mx-auto">
        <Card className="p-5 shadow-sm bg-white">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-center mb-1">Post Your Vehicle</h1>
            <p className="text-center text-slate-500">Quick and easy</p>
          </div>
          
          {/* Progress steps */}
          <div className="flex mb-6 relative">
            <div className="w-1/3 text-center">
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-600'}`}>1</div>
              <div className="text-xs mt-1">Vehicle</div>
            </div>
            <div className="w-1/3 text-center">
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-600'}`}>2</div>
              <div className="text-xs mt-1">Details</div>
            </div>
            <div className="w-1/3 text-center">
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-600'}`}>3</div>
              <div className="text-xs mt-1">Contact</div>
            </div>
            <div className="absolute top-4 left-[16.6%] w-[66.6%] h-[2px] bg-slate-200 -z-10"></div>
          </div>
          
          {/* Step 1: Basic Vehicle Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Vehicle Type<span className="text-red-500">*</span></label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CAR">Car</SelectItem>
                    <SelectItem value="VAN">Van</SelectItem>
                    <SelectItem value="MOTORCYCLE">Motor Bike</SelectItem>
                    <SelectItem value="BICYCLE">Bicycle</SelectItem>
                    <SelectItem value="THREE_WHEEL">Three Wheelers</SelectItem>
                    <SelectItem value="BUS">Bus</SelectItem>
                    <SelectItem value="LORRY">Lorries & Trucks</SelectItem>
                    <SelectItem value="HEAVY_DUTY">Heavy Duty</SelectItem>
                    <SelectItem value="TRACTOR">Tractor</SelectItem>
                    <SelectItem value="AUTO_SERVICE">Auto Service</SelectItem>
                    <SelectItem value="RENTAL">Rental</SelectItem>
                    <SelectItem value="AUTO_PARTS">Auto Parts and Accessories</SelectItem>
                    <SelectItem value="MAINTENANCE">Maintenance and Repair</SelectItem>
                    <SelectItem value="BOAT">Boats & Water Transports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Dynamic vehicle fields based on type */}
              {renderVehicleFields()}
              
              <div className="pt-2">
                <div className="flex items-center bg-blue-50 p-2 rounded-md text-xs text-blue-700">
                  <CheckCircle2 className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>Title will be auto-generated from these details</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-teal-700 hover:bg-teal-800"
                onClick={() => setCurrentStep(2)}
                disabled={!canProceed()}
              >
                Continue <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )}
          
          {/* Step 2: Vehicle Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price (Rs)<span className="text-red-500">*</span></label>
                <Input 
                  type="number" 
                  placeholder="e.g., 2500000" 
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Condition<span className="text-red-500">*</span></label>
                <Select 
                  value={formData.condition} 
                  onValueChange={(value) => handleInputChange("condition", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">Brand New</SelectItem>
                    <SelectItem value="Reconditioned">Reconditioned</SelectItem>
                    <SelectItem value="Used">Used</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Dynamic fields based on vehicle type */}
              {renderStep2Fields()}
              
              <div>
                <label className="block text-sm font-medium mb-1">Description<span className="text-red-500">*</span></label>
                <Textarea 
                  placeholder="Tell potential buyers about your vehicle..." 
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="w-1/2"
                  onClick={() => setCurrentStep(1)}
                >
                  Back
                </Button>
                <Button 
                  className="w-1/2 bg-teal-700 hover:bg-teal-800"
                  onClick={() => setCurrentStep(3)}
                  disabled={!canProceed()}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 3: Contact Details */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your Name<span className="text-red-500">*</span></label>
                <Input 
                  placeholder="Enter your name" 
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number<span className="text-red-500">*</span></label>
                <Input 
                  placeholder="e.g., +94777123456" 
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">WhatsApp Number (optional)</label>
                <Input 
                  placeholder="e.g., +94777123456" 
                  value={formData.whatsappNumber}
                  onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">City<span className="text-red-500">*</span></label>
                <Input 
                  placeholder="e.g., Colombo" 
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Location/Area<span className="text-red-500">*</span></label>
                <Input 
                  placeholder="e.g., Nugegoda" 
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2 mt-2">
                <Switch 
                  id="terms" 
                  checked={formData.termsAndConditions}
                  onCheckedChange={(checked) => handleInputChange("termsAndConditions", checked)}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the Terms & Conditions<span className="text-red-500">*</span>
                </Label>
              </div>
              
              <div className="pt-2">
                <div className="bg-slate-50 p-3 rounded-lg mb-4 text-center">
                  <div className="flex justify-center mb-2">
                    <Camera className="h-6 w-6 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-500">
                    You can add photos after submitting the basic details
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="w-1/2"
                  onClick={() => setCurrentStep(2)}
                >
                  Back
                </Button>
                <Button 
                  className="w-1/2 bg-teal-700 hover:bg-teal-800"
                  onClick={handleSubmit}
                  disabled={isPending || !canProceed()}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Posting...
                    </>
                  ) : "Post Ad"}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}