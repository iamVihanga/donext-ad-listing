"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Fuel,
  Settings,
  Eye,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  Star,
  Shield,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Sample vehicle ad data based on the provided structure
const vehicleAd = {
  type: "PRODUCT",
  status: "ACTIVE",
  id: "vh_001",
  orgId: "org_dealer_001",
  createdBy: "user_seller_001",
  title: "Toyota Prius 2019 - Hybrid Excellence",
  description:
    "Well-maintained Toyota Prius 2019 in excellent condition. This hybrid vehicle offers exceptional fuel efficiency and reliability. Perfect for city driving with low emissions. All service records available. Single owner, accident-free vehicle with complete documentation.",
  published: true,
  isDraft: false,
  boosted: true,
  featured: true,
  boostExpiry: "2025-07-01T00:00:00Z",
  featureExpiry: "2025-06-15T00:00:00Z",
  expiryDate: "2025-08-01T00:00:00Z",
  seoTitle: "Toyota Prius 2019 Hybrid for Sale in Colombo",
  seoDescription:
    "Buy Toyota Prius 2019 hybrid car in excellent condition. Low mileage, fuel efficient, perfect for city driving.",
  seoSlug: "toyota-prius-2019-hybrid-colombo",
  categoryId: "cat_cars_hybrid",
  tags: ["Toyota", "Prius", "Hybrid", "2019", "Fuel Efficient", "City Car"],
  price: 8500000,
  location: "Colombo 03",
  metadata: {
    vehicle: {
      make: "Toyota",
      model: "Prius",
      year: 2019,
      mileage: 45000,
      fuelType: "Hybrid",
      transmission: "Automatic",
      engineCapacity: "1.8L",
      color: "Pearl White",
      condition: "Excellent",
      bodyType: "Sedan",
      doors: 4,
      seats: 5,
      drivetrain: "FWD",
    },
    seller: {
      name: "Premium Auto Sales",
      type: "Dealer",
      phone: "+94 77 123 4567",
      email: "sales@premiumauto.lk",
      verified: true,
      rating: 4.8,
      totalAds: 45,
    },
    features: [
      "Air Conditioning",
      "Power Steering",
      "Electric Windows",
      "Central Locking",
      "ABS Brakes",
      "Airbags",
      "Bluetooth",
      "Backup Camera",
      "Navigation System",
      "Keyless Entry",
    ],
    images: [
      "/placeholder.svg?height=400&width=600&text=Front+View",
      "/placeholder.svg?height=400&width=600&text=Side+View",
      "/placeholder.svg?height=400&width=600&text=Interior",
      "/placeholder.svg?height=400&width=600&text=Dashboard",
      "/placeholder.svg?height=400&width=600&text=Engine",
      "/placeholder.svg?height=400&width=600&text=Rear+View",
    ],
  },
  createdAt: "2025-06-01T10:30:00Z",
  updatedAt: "2025-06-03T14:20:00Z",
}

const similarVehicles = [
  {
    id: "vh_002",
    title: "Toyota Prius 2020",
    price: 9200000,
    location: "Kandy",
    image: "/placeholder.svg?height=150&width=200",
    mileage: "32,000 km",
  },
  {
    id: "vh_003",
    title: "Honda Insight 2019",
    price: 7800000,
    location: "Galle",
    image: "/placeholder.svg?height=150&width=200",
    mileage: "38,000 km",
  },
  {
    id: "vh_004",
    title: "Toyota Prius 2018",
    price: 7500000,
    location: "Negombo",
    image: "/placeholder.svg?height=150&width=200",
    mileage: "55,000 km",
  },
]

export default function VehicleDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)

  const images = vehicleAd.metadata.images
  const vehicle = vehicleAd.metadata.vehicle
  const seller = vehicleAd.metadata.seller
  const features = vehicleAd.metadata.features

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("LKR", "Rs.")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#024950] text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Search
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold">{vehicleAd.title}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Slider */}
            <Card className="overflow-hidden">
              <div className="relative">
                <div className="aspect-video bg-gray-200">
                  <img
                    src={images[currentImageIndex] || "/placeholder.svg"}
                    alt={`Vehicle image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Navigation Arrows */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>

                {/* Status Badges */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  {vehicleAd.featured && <Badge className="bg-orange-500 text-white">Featured</Badge>}
                  {vehicleAd.boosted && <Badge className="bg-blue-500 text-white">Boosted</Badge>}
                </div>
              </div>

              {/* Thumbnail Reel */}
              <div className="p-4 bg-gray-50">
                <div className="flex space-x-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded border-2 overflow-hidden ${
                        index === currentImageIndex ? "border-[#024950]" : "border-gray-300"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Vehicle Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#024950]">Vehicle Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Year</div>
                      <div className="font-semibold">{vehicle.year}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Mileage</div>
                      <div className="font-semibold">{vehicle.mileage.toLocaleString()} km</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Fuel className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Fuel Type</div>
                      <div className="font-semibold">{vehicle.fuelType}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Transmission</div>
                    <div className="font-semibold">{vehicle.transmission}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Engine</div>
                    <div className="font-semibold">{vehicle.engineCapacity}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Color</div>
                    <div className="font-semibold">{vehicle.color}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Body Type</div>
                    <div className="font-semibold">{vehicle.bodyType}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Condition</div>
                    <div className="font-semibold">{vehicle.condition}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Drivetrain</div>
                    <div className="font-semibold">{vehicle.drivetrain}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#024950]">Features & Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#024950] rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#024950]">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{vehicleAd.description}</p>

                <Separator className="my-4" />

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>1,234 views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Posted {formatDate(vehicleAd.createdAt)}</span>
                    </div>
                  </div>
                  <div>Ad ID: {vehicleAd.id}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Price and Contact */}
          <div className="space-y-6">
            {/* Price and Location */}
            <Card>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-[#024950] mb-2">{formatPrice(vehicleAd.price)}</div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {vehicleAd.location}
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-[#024950] hover:bg-[#036b75] text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Seller
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#024950] text-[#024950] hover:bg-[#024950] hover:text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Seller Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#024950]">Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-[#024950] bg-opacity-10 rounded-full flex items-center justify-center">
                    <span className="text-[#024950] font-semibold text-lg">{seller.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{seller.name}</h3>
                      {seller.verified && <Shield className="w-4 h-4 text-green-500" />}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">{seller.type}</div>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{seller.rating}</span>
                      <span className="text-sm text-gray-500">({seller.totalAds} ads)</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View All Ads
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#024950]">Safety Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-gray-600">
                  <li>• Meet in a public place</li>
                  <li>• Inspect the vehicle thoroughly</li>
                  <li>• Verify all documents</li>
                  <li>• Take a test drive</li>
                  <li>• Don't pay in advance</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Vehicles */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Similar Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {similarVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <img
                    src={vehicle.image || "/placeholder.svg"}
                    alt={vehicle.title}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h3 className="font-semibold mb-2">{vehicle.title}</h3>
                  <div className="text-lg font-bold text-[#024950] mb-1">{formatPrice(vehicle.price)}</div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {vehicle.location}
                    </div>
                    <div>{vehicle.mileage}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
