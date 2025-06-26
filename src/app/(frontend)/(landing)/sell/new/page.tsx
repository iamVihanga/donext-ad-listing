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
    vehicleType: "Car", // Display name
    brand: "",
    model: "",
    manufacturedYear: "",
    price: "",
    condition: "",
    description: "",
    
    // Vehicle details
    transmission: "",
    fuelType: "",
    mileage: "",
    engineCapacity: "",
    
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
  
  // Vehicle makes list - copied from ad-form.tsx
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
      formData.brand,
      formData.model,
      formData.manufacturedYear,
      formData.vehicleType
    ].filter(Boolean);
    
    const title = titleParts.length > 0 ? titleParts.join(" ") : "Vehicle Ad";
    
    // Format price as number if provided
    const price = formData.price ? parseFloat(formData.price) : undefined;
    const mileage = formData.mileage ? parseFloat(formData.mileage) : undefined;
    const engineCapacity = formData.engineCapacity ? parseFloat(formData.engineCapacity) : undefined;
    
    // Prepare ad data
    const adData: CreateAdSchema = {
      title,
      description: formData.description || "No description provided",
      type: formData.type as any,
      vehicleType: formData.vehicleType,
      brand: formData.brand || undefined,
      model: formData.model || undefined,
      manufacturedYear: formData.manufacturedYear || undefined,
      price,
      condition: formData.condition || undefined,
      transmission: formData.transmission || undefined,
      fuelType: formData.fuelType || undefined,
      mileage,
      engineCapacity,
      name: formData.name || undefined,
      phoneNumber: formData.phoneNumber || undefined,
      whatsappNumber: formData.whatsappNumber || undefined,
      city: formData.city || undefined,
      location: formData.location || undefined,
      termsAndConditions: formData.termsAndConditions,
      published: formData.published,
      isDraft: formData.isDraft
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
  
  // Check if required fields are filled
  const canProceed = () => {
    switch(currentStep) {
      case 1:
        return formData.vehicleType && formData.brand && formData.model;
      case 2:
        return formData.price && formData.condition && formData.description;
      case 3:
        return formData.name && formData.phoneNumber && formData.city && formData.termsAndConditions;
      default:
        return false;
    }
  };
  
  // Type mapping between display names and API values
  const typeMap: Record<string, string> = {
    "Car": "CAR",
    "Van": "VAN",
    "SUV / Jeep": "SUV_JEEP",
    "Motorcycle": "MOTORCYCLE",
    "Bus": "BUS",
    "Truck": "LORRY",
    "Three Wheeler": "THREE_WHEEL",
    "Heavy Vehicle": "HEAVY_DUTY",
    "Other": "OTHER",
    "Crew Cab": "CREW_CAB",
    "Pickup / Double Cab": "PICKUP_DOUBLE_CAB",
    "Tractor": "TRACTOR",
    "Bicycle": "BICYCLE"
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
                  value={formData.vehicleType} 
                  onValueChange={(value) => {
                    handleInputChange("vehicleType", value);
                    handleInputChange("type", typeMap[value] || "OTHER");
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
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
                    <SelectItem value="Crew Cab">Crew Cab</SelectItem>
                    <SelectItem value="Pickup / Double Cab">Pickup / Double Cab</SelectItem>
                    <SelectItem value="Tractor">Tractor</SelectItem>
                    <SelectItem value="Bicycle">Bicycle</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Brand<span className="text-red-500">*</span></label>
                <Select 
                  value={formData.brand}
                  onValueChange={(value) => handleInputChange("brand", value)}
                >
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
              
              <div>
                <label className="block text-sm font-medium mb-1">Model<span className="text-red-500">*</span></label>
                <Input 
                  placeholder="e.g., Corolla, Sunny, X5" 
                  value={formData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Year<span className="text-red-500">*</span></label>
                <Select 
                  value={formData.manufacturedYear}
                  onValueChange={(value) => handleInputChange("manufacturedYear", value)}
                >
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
                    <SelectItem value="Brand New">Brand New</SelectItem>
                    <SelectItem value="Unregistered (Recondition)">Unregistered (Recondition)</SelectItem>
                    <SelectItem value="Registered (Used)">Registered (Used)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Transmission</label>
                  <Select 
                    value={formData.transmission} 
                    onValueChange={(value) => handleInputChange("transmission", value)}
                  >
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
                  <label className="block text-sm font-medium mb-1">Fuel Type</label>
                  <Select 
                    value={formData.fuelType} 
                    onValueChange={(value) => handleInputChange("fuelType", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
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