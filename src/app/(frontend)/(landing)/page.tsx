"use client"

import { useState, useEffect } from "react"
import { Search, ChevronDown, Filter, Menu, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { format } from "date-fns"

// Import the existing hook
import { useGetAds } from "@/features/ads/api/use-get-ads"

// Vehicle type labels
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

export default function VehicleMarketplace() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  
  // Use the existing hook to fetch real vehicle data
  const { data, isLoading, error } = useGetAds({
    page: 1,
    limit: 6, // Show 6 items initially
  });

  // Format price for display
  const formatPrice = (price: number | null) => {
    if (price === null) return "Price on request";
    return `Rs. ${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#024950] text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 md:py-4">
            <div className="flex items-center space-x-2">
              <div className="text-xl md:text-2xl font-bold text-white">Rathagala.lk</div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="hover:text-gray-200 transition-colors">
                Home
              </a>
              <a href="#" className="hover:text-gray-200 transition-colors">
                Sell
              </a>
              <a href="#" className="hover:text-gray-200 transition-colors">
                About
              </a>
              <a href="#" className="hover:text-gray-200 transition-colors">
                Contact
              </a>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" className="text-[#024950] border-white hover:bg-white hover:text-[#024950]">
                Login
              </Button>
              <Button className="bg-white text-[#024950] hover:bg-gray-100">Post Free Ad</Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85%] sm:w-[350px] bg-[#024950] text-white border-[#024950]">
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-xl font-bold text-white">Rathagala.lk</div>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <nav className="flex flex-col space-y-5">
                    <a href="#" className="text-lg hover:text-gray-200 transition-colors">
                      Home
                    </a>
                    <a href="#" className="text-lg hover:text-gray-200 transition-colors">
                      Sell
                    </a>
                    <a href="#" className="text-lg hover:text-gray-200 transition-colors">
                      About
                    </a>
                    <a href="#" className="text-lg hover:text-gray-200 transition-colors">
                      Contact
                    </a>
                    <div className="pt-5 space-y-3">
                      <Button
                        variant="outline"
                        className="w-full text-white border-white hover:bg-white hover:text-[#024950]"
                      >
                        Login
                      </Button>
                      <Button className="w-full bg-white text-[#024950] hover:bg-gray-100">Post Free Ad</Button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <section className="relative py-8 md:py-16 bg-gradient-to-r from-[#024950] to-[#036b75]">
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 md:mb-4">
              Find Your Perfect Vehicle
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              Sri Lanka's largest automobile marketplace
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-6xl mx-auto">
            <Card className="p-4 md:p-8 shadow-2xl bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 md:gap-4 mb-4 md:mb-6">
                <Select>
                  <SelectTrigger className="h-10 md:h-12">
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

                <Input placeholder="Model (e.g., Prius)" className="h-10 md:h-12" />

                <Select>
                  <SelectTrigger className="h-10 md:h-12">
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
                  <SelectTrigger className="h-10 md:h-12">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2m">Under Rs. 2M</SelectItem>
                    <SelectItem value="2m-5m">Rs. 2M - 5M</SelectItem>
                    <SelectItem value="5m-10m">Rs. 5M - 10M</SelectItem>
                    <SelectItem value="10m+">Above Rs. 10M</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="h-10 md:h-12">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="colombo">Colombo</SelectItem>
                    <SelectItem value="kandy">Kandy</SelectItem>
                    <SelectItem value="galle">Galle</SelectItem>
                    <SelectItem value="negombo">Negombo</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="h-10 md:h-12 bg-[#024950] hover:bg-[#036b75] text-white font-semibold">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span>Search</span>
                </Button>
              </div>

              {/* Advanced Filters Toggle */}
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="text-[#024950] hover:text-[#036b75] text-sm md:text-base"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filters
                  <ChevronDown
                    className={`w-4 h-4 ml-2 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`}
                  />
                </Button>
              </div>

              {/* Advanced Filters */}
              {showAdvancedFilters && (
                <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    <Select>
                      <SelectTrigger>
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
                      <SelectTrigger>
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
                      <SelectTrigger>
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
                      <SelectTrigger>
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
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Vehicle Listings */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Latest Vehicles</h2>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 text-sm">
                    {data?.pagination ? `Showing 1-${data.ads.length} of ${data.pagination.total} results` : 'Loading results...'}
                  </span>
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="year">Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Loading state */}
              {isLoading && (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-[#024950] mr-2" />
                  <p className="text-gray-500">Loading vehicles...</p>
                </div>
              )}

              {/* Error state */}
              {error && (
                <div className="p-8 text-center">
                  <p className="text-red-500">Failed to load vehicle listings</p>
                  <p className="mt-2 text-sm text-gray-500">Please try again later</p>
                </div>
              )}

              {/* No results */}
              {data?.ads?.length === 0 && !isLoading && (
                <div className="p-8 text-center border rounded-lg">
                  <p className="text-gray-500">No vehicles found</p>
                  <Button className="mt-4">Create Your First Listing</Button>
                </div>
              )}

              {/* Vehicle Grid - Using Real Data */}
              {data?.ads && data.ads.length > 0 && !isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.ads.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="bg-white rounded-lg border border-gray-300 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
                      onClick={() => window.location.href = `/${vehicle.id}`}
                    >
                      <div className="p-3">
                        {/* Vehicle Title - Centered */}
                        <h3 className="font-semibold text-base text-gray-800 text-center mb-3">{vehicle.title}</h3>

                        <div className="flex">
                          {/* Vehicle Image - Using placeholder since image functionality is not implemented yet */}
                          <div className="w-36 h-24 flex-shrink-0">
                            <img
                              src="/placeholder.svg"
                              alt={vehicle.title}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>

                          {/* Vehicle Details */}
                          <div className="flex-1 pl-3 flex flex-col justify-between">
                            <div>
                              <div className="text-sm text-gray-600 mb-1">{vehicle.location || "Location not specified"}</div>

                              <div className="text-sm font-semibold text-[#024950] mb-1">
                                {formatPrice(vehicle.price)}
                              </div>

                              <div className="text-sm text-gray-500 mb-1">
                                {vehicleTypeLabels[vehicle.type] || vehicle.type}
                              </div>
                            </div>

                            <div className="text-xs text-gray-400">
                              {format(new Date(vehicle.createdAt), "yyyy-MM-dd")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Load More */}
              <div className="text-center mt-6">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 border-[#024950] text-[#024950] hover:bg-[#024950] hover:text-white"
                  disabled={!data || data.pagination?.page === data.pagination?.totalPages}
                >
                  Load More Vehicles
                </Button>
              </div>
            </div>

            {/* Right Sidebar - Ad Space */}
            <div className="w-full lg:w-72 space-y-4">
              {/* Google Ad Space 1 */}
              <Card className="p-3 bg-gray-50 border-dashed border-2 border-gray-300">
                <div className="text-center text-gray-500">
                  <div className="text-sm mb-2">Advertisement</div>
                  <div className="bg-gray-200 h-64 flex items-center justify-center rounded">
                    <span className="text-gray-400">
                      Google Ad Space
                      <br />
                      300x250
                    </span>
                  </div>
                </div>
              </Card>

              {/* Featured Dealers */}
              <Card className="p-3">
                <h3 className="font-semibold mb-4 text-gray-800">Featured Dealers</h3>
                <div className="space-y-3">
                  {["Premium Motors", "City Auto", "Elite Cars"].map((dealer, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-[#024950] bg-opacity-10 rounded-full flex items-center justify-center">
                        <span className="text-[#024950] font-semibold">{dealer[0]}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{dealer}</div>
                        <div className="text-sm text-gray-500">Verified Dealer</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Google Ad Space 2 */}
              <Card className="p-3 bg-gray-50 border-dashed border-2 border-gray-300">
                <div className="text-center text-gray-500">
                  <div className="text-sm mb-2">Advertisement</div>
                  <div className="bg-gray-200 h-48 flex items-center justify-center rounded">
                    <span className="text-gray-400">
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
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Card className="p-4 bg-gray-50 border-dashed border-2 border-gray-300">
            <div className="text-center text-gray-500">
              <div className="text-sm mb-2">Advertisement</div>
              <div className="bg-gray-200 h-24 flex items-center justify-center rounded">
                <span className="text-gray-400">Google Ad Banner Space - 728x90</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#024950] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">Rathagala.lk</div>
              <p className="text-gray-200">
                Sri Lanka's most trusted vehicle marketplace connecting buyers and sellers nationwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-200">
                <li>
                  <a href="#" className="hover:text-white">
                    Browse Cars
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Sell Your Car
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Car Loans
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Insurance
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-200">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-200">
                <li>
                  <a href="#" className="hover:text-white">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Rathagala.lk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}