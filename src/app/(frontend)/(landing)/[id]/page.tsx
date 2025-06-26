/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useGetAdById } from "@/features/ads/api/use-get-ad-by-id";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Fuel,
  Eye,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  Star,
  Shield,
  Clock,
  Gauge
} from "lucide-react";

export default function AdDetailPage() {
  const { id } = useParams();
  const adId = Array.isArray(id) ? id[0] : id;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  // Using the hook to fetch ad data
  const { data: ad, isLoading, isError } = useGetAdById({ adId: adId || "" });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin w-8 h-8 border-4 border-[#024950] border-t-transparent rounded-full"></div>
        <span className="ml-2">Loading ad details...</span>
      </div>
    );
  }

  if (isError || !ad) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Failed to load ad details</p>
      </div>
    );
  }

  // Extract media and organize it for the image slider
  // const images = ad.media && ad.media.length > 0
  //   ? ad.media.map(item => item.url)
  //   : ["/placeholder.svg?height=400&width=600&text=No+Image"];

  // const nextImage = () => {
  //   setCurrentImageIndex((prev) => (prev + 1) % images.length);
  // };

  // const prevImage = () => {
  //   setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  // };

  const formatPrice = (price: number | null | undefined) => {
    if (!price) return "Price upon request";
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0
    })
      .format(price)
      .replace("LKR", "Rs.");
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // Generate similar vehicles (placeholder)
  const similarVehicles = [
    {
      id: "similar_1",
      title: `${ad.brand || "Similar"} ${ad.model || "Vehicle"} ${
        ad.manufacturedYear || ""
      }`,
      price: ad.price ? ad.price * 0.9 : 0,
      location: ad.city || "Unknown",
      image: "/placeholder.svg?height=150&width=200",
      mileage: ad.mileage ? `${ad.mileage.toLocaleString()} km` : "Unknown"
    },
    {
      id: "similar_2",
      title: `${ad.brand || "Similar"} ${ad.model || "Vehicle"} ${
        typeof ad.manufacturedYear === "number" ? ad.manufacturedYear - 1 : ""
      }`,
      price: ad.price ? ad.price * 0.85 : 0,
      location: "Kandy",
      image: "/placeholder.svg?height=150&width=200",
      mileage: ad.mileage
        ? `${(ad.mileage * 1.2).toFixed(0).toLocaleString()} km`
        : "Unknown"
    },
    {
      id: "similar_3",
      title: `${ad.brand || "Similar"} ${ad.model || "Vehicle"} ${
        typeof ad.manufacturedYear === "number" ? ad.manufacturedYear - 2 : ""
      }`,
      price: ad.price ? ad.price * 0.8 : 0,
      location: "Galle",
      image: "/placeholder.svg?height=150&width=200",
      mileage: ad.mileage
        ? `${(ad.mileage * 1.5).toFixed(0).toLocaleString()} km`
        : "Unknown"
    }
  ];

  // Organize features/options for display
  const features = ad.options || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#024950] text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:space-x-4">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 px-0 sm:px-3"
              onClick={() => window.history.back()}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Search
            </Button>
            <div className="flex-1">
              <h1 className="text-lg sm:text-xl font-semibold">{ad.title}</h1>
            </div>
            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorited ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
              >
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
                {/* <div className="aspect-video bg-gray-200">
                  <Image
                    src={images[currentImageIndex] || "/placeholder.svg"}
                    alt={`Vehicle image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div> */}

                {/* Status Badges */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  {ad.featured && (
                    <Badge className="bg-orange-500 text-white">Featured</Badge>
                  )}
                  {ad.boosted && (
                    <Badge className="bg-blue-500 text-white">Boosted</Badge>
                  )}
                </div>
              </div>

              {/* Thumbnail Reel */}
              {/* {images.length > 1 && (
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
              )} */}
            </Card>

            {/* Vehicle Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#024950]">
                  Vehicle Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {ad.manufacturedYear && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Year</div>
                        <div className="font-semibold">
                          {ad.manufacturedYear}
                        </div>
                      </div>
                    </div>
                  )}

                  {ad.mileage && (
                    <div className="flex items-center space-x-2">
                      <Gauge className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Mileage</div>
                        <div className="font-semibold">
                          {ad.mileage.toLocaleString()} km
                        </div>
                      </div>
                    </div>
                  )}

                  {ad.fuelType && (
                    <div className="flex items-center space-x-2">
                      <Fuel className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Fuel Type</div>
                        <div className="font-semibold">{ad.fuelType}</div>
                      </div>
                    </div>
                  )}

                  {ad.transmission && (
                    <div>
                      <div className="text-sm text-gray-500">Transmission</div>
                      <div className="font-semibold">{ad.transmission}</div>
                    </div>
                  )}

                  {ad.engineCapacity && (
                    <div>
                      <div className="text-sm text-gray-500">Engine</div>
                      <div className="font-semibold">
                        {ad.engineCapacity} cc
                      </div>
                    </div>
                  )}

                  {/* {ad.color && (
                    <div>
                      <div className="text-sm text-gray-500">Color</div>
                      <div className="font-semibold">{ad.color}</div>
                    </div>
                  )} */}

                  {ad.vehicleType && (
                    <div>
                      <div className="text-sm text-gray-500">Body Type</div>
                      <div className="font-semibold">{ad.vehicleType}</div>
                    </div>
                  )}

                  {ad.condition && (
                    <div>
                      <div className="text-sm text-gray-500">Condition</div>
                      <div className="font-semibold">{ad.condition}</div>
                    </div>
                  )}

                  {ad.brand && (
                    <div>
                      <div className="text-sm text-gray-500">Brand</div>
                      <div className="font-semibold">{ad.brand}</div>
                    </div>
                  )}

                  {ad.model && (
                    <div>
                      <div className="text-sm text-gray-500">Model</div>
                      <div className="font-semibold">{ad.model}</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            {features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#024950]">
                    Features & Equipment
                  </CardTitle>
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
            )}

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#024950]">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {ad.description}
                </p>

                <Separator className="my-4" />

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>
                        {Math.floor(Math.random() * 2000) + 100} views
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Posted {formatDate(ad.createdAt)}</span>
                    </div>
                  </div>
                  <div>Ad ID: {ad.id}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Price and Contact */}
          <div className="space-y-6">
            {/* Price and Location */}
            <Card>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-[#024950] mb-2">
                  {ad.discountPrice
                    ? formatPrice(ad.discountPrice)
                    : formatPrice(ad.price)}
                </div>
                {ad.discountPrice &&
                  ad.price &&
                  ad.discountPrice < ad.price && (
                    <div className="text-xl line-through text-gray-400 mb-2">
                      {formatPrice(ad.price)}
                    </div>
                  )}
                {ad.city && (
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {[ad.city, ad.province].filter(Boolean).join(", ")}
                  </div>
                )}

                <div className="space-y-2">
                  {ad.phoneNumber && (
                    <Button className="w-full bg-[#024950] hover:bg-[#036b75] text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Seller
                    </Button>
                  )}
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
                <CardTitle className="text-[#024950]">
                  Seller Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-[#024950] bg-opacity-10 rounded-full flex items-center justify-center">
                    <span className="text-[#024950] font-semibold text-lg">
                      {(ad.name || "Seller").charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{ad.name || "Seller"}</h3>
                      <Shield className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      {(ad as any).sellerType === "DEALER"
                        ? "Dealer"
                        : "Private Seller"}
                    </div>
                    <div className="flex items-center space-x-1 mb-2">
                      {/* <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> */}
                      {/* <span className="text-sm font-medium">4.8</span>
                      <span className="text-sm text-gray-500">(5 ads)</span> */}
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
                  <li>{`• Don't pay in advance`}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Vehicles */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Similar Vehicles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {similarVehicles.map((vehicle) => (
              <Card
                key={vehicle.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-4">
                  <img
                    src={vehicle.image || "/placeholder.svg"}
                    alt={vehicle.title}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h3 className="font-semibold mb-2">{vehicle.title}</h3>
                  <div className="text-lg font-bold text-[#024950] mb-1">
                    {formatPrice(vehicle.price)}
                  </div>
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
  );
}
