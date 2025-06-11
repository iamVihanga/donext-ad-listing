"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  Filter,
  Menu,
  X,
  Loader2,
  Car
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { format } from "date-fns";

// Import the existing hook
import { useGetAds } from "@/features/ads/api/use-get-ads";

// Vehicle type labels
const vehicleTypeLabels: Record<string, string> = {
  CAR: "CAR",
  VAN: "VAN",
  SUV_JEEP: "SUV / JEEP",
  MOTORCYCLE: "MOTORCYCLE",
  CREW_CAB: "CREW CAB",
  PICKUP_DOUBLE_CAB: "PICKUP / DOUBLE CAB",
  BUS: "BUS",
  LORRY: "LORRY",
  THREE_WHEEL: "THREE WHEEL",
  OTHER: "OTHER",
  TRACTOR: "TRACTOR",
  HEAVY_DUTY: "HEAVY-DUTY",
  BICYCLE: "BICYCLE"
};

export default function VehicleMarketplace() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Use the existing hook to fetch real vehicle data
  const { data, isLoading, error } = useGetAds({
    page: 1,
    limit: 8 // Show 8 items initially for better grid layout
  });

  // Format price for display
  const formatPrice = (price: number | null) => {
    if (price === null) return "Price on request";
    return `Rs. ${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-900 to-teal-800 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <Car className="h-6 w-6" />
              <div className="text-xl md:text-2xl font-bold text-white">
                Rathagala.lk
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="hover:text-teal-200 transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="hover:text-teal-200 transition-colors font-medium"
              >
                Sell
              </a>
              <a
                href="#"
                className="hover:text-teal-200 transition-colors font-medium"
              >
                About
              </a>
              <a
                href="#"
                className="hover:text-teal-200 transition-colors font-medium"
              >
                Contact
              </a>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-white hover:bg-teal-700">
                Login
              </Button>
              <Button className="bg-white text-teal-900 hover:bg-teal-50 font-medium">
                Post Free Ad
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[85%] sm:w-[350px] bg-gradient-to-r from-teal-900 to-teal-800 text-white border-teal-900"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-xl font-bold text-white flex items-center gap-2">
                      <Car className="h-5 w-5" />
                      Rathagala.lk
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="hover:bg-teal-800"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <nav className="flex flex-col space-y-5">
                    <a
                      href="#"
                      className="text-lg hover:text-teal-200 transition-colors"
                    >
                      Home
                    </a>
                    <a
                      href="#"
                      className="text-lg hover:text-teal-200 transition-colors"
                    >
                      Sell
                    </a>
                    <a
                      href="#"
                      className="text-lg hover:text-teal-200 transition-colors"
                    >
                      About
                    </a>
                    <a
                      href="#"
                      className="text-lg hover:text-teal-200 transition-colors"
                    >
                      Contact
                    </a>
                    <div className="pt-5 space-y-3">
                      <Button
                        variant="outline"
                        className="w-full text-white border-white hover:bg-white hover:text-teal-900"
                      >
                        Login
                      </Button>
                      <Button className="w-full bg-white text-teal-900 hover:bg-teal-50">
                        Post Free Ad
                      </Button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <section className="relative py-12 md:py-20 bg-gradient-to-r from-teal-900 via-teal-800 to-teal-700 overflow-hidden">
        {/* Abstract shapes for visual interest */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -right-40 -top-40 w-80 h-80 bg-teal-400 rounded-full"></div>
          <div className="absolute -left-20 bottom-10 w-60 h-60 bg-teal-300 rounded-full"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-5">
              Find Your Perfect Vehicle
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-teal-100 max-w-2xl mx-auto">
              {`Sri Lanka's largest automobile marketplace with thousands of verified listings`}
            </p>
          </div>

          {/* Search Form - Refined for better proportions */}
          <div className="max-w-6xl mx-auto">
            <Card className="p-5 md:p-7 shadow-xl bg-white rounded-xl border-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-5">
                <Select>
                  <SelectTrigger className="h-11 rounded-lg bg-white border-slate-200 hover:border-teal-500 focus:border-teal-500">
                    <SelectValue placeholder="Any Make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="nissan">Nissan</SelectItem>
                    <SelectItem value="bmw">BMW</SelectItem>
                    <SelectItem value="mercedes">Mercedes</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Model (e.g., Prius)"
                  className="h-11 rounded-lg bg-white border-slate-200 focus-visible:ring-teal-500"
                />

                <Select>
                  <SelectTrigger className="h-11 rounded-lg bg-white border-slate-200 hover:border-teal-500 focus:border-teal-500">
                    <SelectValue placeholder="Any Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                    <SelectItem value="truck">Truck</SelectItem>
                    <SelectItem value="bike">Motorcycle</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="h-11 rounded-lg bg-white border-slate-200 hover:border-teal-500 focus:border-teal-500">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2m">Under Rs. 2M</SelectItem>
                    <SelectItem value="2m-5m">Rs. 2M - 5M</SelectItem>
                    <SelectItem value="5m-10m">Rs. 5M - 10M</SelectItem>
                    <SelectItem value="10m+">Above Rs. 10M</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="h-11 bg-teal-700 hover:bg-teal-600 text-white font-medium rounded-lg">
                  <Search className="w-4 h-4 mr-2" />
                  <span>Search</span>
                </Button>
              </div>

              {/* Advanced Filters Toggle */}
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="text-teal-700 hover:text-teal-800 hover:bg-teal-50 text-sm"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filters
                  <ChevronDown
                    className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                      showAdvancedFilters ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </div>

              {/* Advanced Filters */}
              {showAdvancedFilters && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <Select>
                      <SelectTrigger className="h-11 rounded-lg bg-white border-slate-200 hover:border-teal-500 focus:border-teal-500">
                        <SelectValue placeholder="Year From" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2020">2020</SelectItem>
                        <SelectItem value="2019">2019</SelectItem>
                        <SelectItem value="2018">2018</SelectItem>
                        <SelectItem value="2017">2017</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select>
                      <SelectTrigger className="h-11 rounded-lg bg-white border-slate-200 hover:border-teal-500 focus:border-teal-500">
                        <SelectValue placeholder="Year To" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select>
                      <SelectTrigger className="h-11 rounded-lg bg-white border-slate-200 hover:border-teal-500 focus:border-teal-500">
                        <SelectValue placeholder="Fuel Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="petrol">Petrol</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select>
                      <SelectTrigger className="h-11 rounded-lg bg-white border-slate-200 hover:border-teal-500 focus:border-teal-500">
                        <SelectValue placeholder="Transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Automatic</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="bg-slate-50 py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Vehicle Listings */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-3 md:mb-0">
                  Latest Vehicles
                </h2>
                <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
                  <span className="text-slate-600 text-sm">
                    {data?.pagination
                      ? `Showing 1-${data.ads.length} of ${data.pagination.total} results`
                      : "Loading results..."}
                  </span>
                  <Select>
                    <SelectTrigger className="w-full md:w-44 h-10 rounded-lg bg-white border-slate-200">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="year">Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Loading state */}
              {isLoading && (
                <div className="flex justify-center items-center py-16 bg-white rounded-xl shadow-sm">
                  <Loader2 className="h-8 w-8 animate-spin text-teal-700 mr-2" />
                  <p className="text-slate-600">Loading vehicles...</p>
                </div>
              )}

              {/* Error state */}
              {error && (
                <div className="p-8 text-center bg-white rounded-xl shadow-sm">
                  <p className="text-red-500 font-medium">
                    Failed to load vehicle listings
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Please try again later
                  </p>
                </div>
              )}

              {/* No results */}
              {data?.ads?.length === 0 && !isLoading && (
                <div className="p-12 text-center border rounded-xl bg-white shadow-sm">
                  <p className="text-slate-600 mb-2">No vehicles found</p>
                  <Button className="mt-4 bg-teal-700 hover:bg-teal-600">
                    Create Your First Listing
                  </Button>
                </div>
              )}

              {/* Vehicle Grid - Using Real Data */}
              {data?.ads && data.ads.length > 0 && !isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.ads.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group"
                      onClick={() => (window.location.href = `/${vehicle.id}`)}
                    >
                      <div className="p-4">
                        {/* Vehicle Title - Centered */}
                        <h3 className="font-semibold text-base text-slate-800 text-center mb-3 transition-colors group-hover:text-teal-700">
                          {vehicle.title}
                        </h3>

                        <div className="flex">
                          {/* Vehicle Image */}
                          <div className="w-40 h-28 flex-shrink-0">
                            <img
                              src="/placeholder.svg"
                              alt={vehicle.title}
                              className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* Vehicle Details */}
                          <div className="flex-1 pl-4 flex flex-col justify-between">
                            <div>
                              <div className="text-sm text-slate-600 mb-2">
                                {vehicle.location || "Location not specified"}
                              </div>

                              <div className="text-sm font-semibold text-teal-700 mb-2">
                                {formatPrice(vehicle.price)}
                              </div>

                              <div className="text-sm text-slate-500 mb-1">
                                {vehicleTypeLabels[vehicle.type] ||
                                  vehicle.type}
                              </div>
                            </div>

                            <div className="text-xs text-slate-400">
                              {format(
                                new Date(vehicle.createdAt),
                                "MMM d, yyyy"
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Load More */}
              <div className="text-center mt-8">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-5 border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white transition-all duration-300"
                  disabled={
                    !data ||
                    data.pagination?.page === data.pagination?.totalPages
                  }
                >
                  Load More Vehicles
                </Button>
              </div>
            </div>

            {/* Right Sidebar - Ad Space */}
            <div className="w-full lg:w-80 space-y-6 mt-6 lg:mt-0">
              {/* Google Ad Space 1 */}
              <Card className="p-4 bg-white border border-slate-100 rounded-xl overflow-hidden">
                <div className="text-center text-slate-500">
                  <div className="text-sm mb-2 font-medium">Advertisement</div>
                  <div className="bg-slate-100 h-64 flex items-center justify-center rounded-lg">
                    <span className="text-slate-400">
                      Google Ad Space
                      <br />
                      300x250
                    </span>
                  </div>
                </div>
              </Card>

              {/* Featured Dealers */}
              <Card className="p-5 bg-white rounded-xl border border-slate-100">
                <h3 className="font-semibold mb-4 text-slate-800">
                  Featured Dealers
                </h3>
                <div className="space-y-3">
                  {["Premium Motors", "City Auto", "Elite Cars"].map(
                    (dealer, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-teal-50 transition-all duration-200 cursor-pointer"
                      >
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                          <span className="text-teal-700 font-semibold">
                            {dealer[0]}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-slate-800">
                            {dealer}
                          </div>
                          <div className="text-sm text-slate-500">
                            Verified Dealer
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </Card>

              {/* Google Ad Space 2 */}
              <Card className="p-4 bg-white border border-slate-100 rounded-xl overflow-hidden">
                <div className="text-center text-slate-500">
                  <div className="text-sm mb-2 font-medium">Advertisement</div>
                  <div className="bg-slate-100 h-48 flex items-center justify-center rounded-lg">
                    <span className="text-slate-400">
                      Google Ad Space
                      <br />
                      300x200
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Ad Space */}
      <div className="bg-white py-6">
        <div className="max-w-6xl mx-auto px-4">
          <Card className="p-4 bg-white border border-slate-100 rounded-xl overflow-hidden">
            <div className="text-center text-slate-500">
              <div className="text-sm mb-2 font-medium">Advertisement</div>
              <div className="bg-slate-100 h-24 flex items-center justify-center rounded-lg">
                <span className="text-slate-400">
                  Google Ad Banner Space - 728x90
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-teal-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Car className="h-6 w-6" />
                <div className="text-2xl font-bold text-white">
                  Rathagala.lk
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {`Sri Lanka's most trusted vehicle marketplace connecting buyers
                and sellers nationwide.`}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3 text-slate-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Browse Cars
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sell Your Car
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Car Loans
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Insurance
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Support</h4>
              <ul className="space-y-3 text-slate-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Connect</h4>
              <ul className="space-y-3 text-slate-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-10 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Rathagala.lk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
