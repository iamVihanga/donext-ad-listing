"use client"

import { useState } from "react"
import { 
  Search, 
  ChevronDown, 
  Filter, 
  MapPin, 
  Calendar, 
  Fuel, 
  Settings, 
  Star, 
  Heart, 
  Menu, 
  X 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// const categories = [
//   { name: "Sell Vehicle", color: "bg-orange-500 hover:bg-orange-600", icon: "🚗" },
//   { name: "Buy Cars", color: "bg-blue-500 hover:bg-blue-600", icon: "🚙" },
//   { name: "Buy Bikes", color: "bg-green-500 hover:bg-green-600", icon: "🏍️" },
//   { name: "Buy Vans", color: "bg-purple-500 hover:bg-purple-600", icon: "🚐" },
//   { name: "Buy Trucks", color: "bg-red-500 hover:bg-red-600", icon: "🚛" },
//   { name: "Buy SUVs", color: "bg-indigo-500 hover:bg-indigo-600", icon: "🚗" },
//   { name: "Three Wheels", color: "bg-teal-500 hover:bg-teal-600", icon: "🛺" },
//   { name: "Spare Parts", color: "bg-pink-500 hover:bg-pink-600", icon: "⚙️" },
// ]

const vehicles = [
  {
    id: 1,
    title: "Toyota Prius 2019",
    price: "Rs. 8,500,000",
    location: "Colombo",
    year: 2019,
    mileage: "45,000 km",
    fuel: "Hybrid",
    transmission: "Auto",
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
  },
  {
    id: 2,
    title: "Honda Civic 2020",
    price: "Rs. 9,200,000",
    location: "Kandy",
    year: 2020,
    mileage: "32,000 km",
    fuel: "Petrol",
    transmission: "Auto",
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
  {
    id: 3,
    title: "Suzuki Alto 2018",
    price: "Rs. 3,800,000",
    location: "Galle",
    year: 2018,
    mileage: "68,000 km",
    fuel: "Petrol",
    transmission: "Manual",
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
  {
    id: 4,
    title: "BMW X5 2021",
    price: "Rs. 18,500,000",
    location: "Colombo",
    year: 2021,
    mileage: "15,000 km",
    fuel: "Petrol",
    transmission: "Auto",
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
  },
  {
    id: 5,
    title: "Nissan Leaf 2019",
    price: "Rs. 7,200,000",
    location: "Negombo",
    year: 2019,
    mileage: "28,000 km",
    fuel: "Electric",
    transmission: "Auto",
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
  {
    id: 6,
    title: "Mitsubishi Montero 2017",
    price: "Rs. 12,800,000",
    location: "Matara",
    year: 2017,
    mileage: "85,000 km",
    fuel: "Diesel",
    transmission: "Auto",
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
]

export default function VehicleMarketplace() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 md:py-4">
            <div className="flex items-center space-x-2">
              <div className="text-xl md:text-2xl font-bold text-blue-400">Rathagala.lk</div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="hover:text-blue-400 transition-colors">
                Home
              </a>
              {/* <a href="#" className="hover:text-blue-400 transition-colors">
                Browse
              </a> */}
              <a href="#" className="hover:text-blue-400 transition-colors">
                Sell
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                About
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Contact
              </a>
            </nav>
            
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" className="text-blue-600 border-white hover:bg-white hover:text-slate-900">
                Login
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Post Free Ad</Button>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85%] sm:w-[350px] bg-slate-900 text-white border-slate-800">
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-xl font-bold text-blue-400">Rathagala.lk</div>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <nav className="flex flex-col space-y-5">
                    <a href="#" className="text-lg hover:text-blue-400 transition-colors">Home</a>
                    {/* <a href="#" className="text-lg hover:text-blue-400 transition-colors">Browse</a> */}
                    <a href="#" className="text-lg hover:text-blue-400 transition-colors">Sell</a>
                    <a href="#" className="text-lg hover:text-blue-400 transition-colors">About</a>
                    <a href="#" className="text-lg hover:text-blue-400 transition-colors">Contact</a>
                    <div className="pt-5 space-y-3">
                      <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-slate-900">
                        Login
                      </Button>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Post Free Ad</Button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation - Scrollable on mobile */}
      {/* <div className="bg-white shadow-md overflow-x-auto">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex space-x-3 md:flex-wrap md:gap-3 md:justify-center">
            {categories.map((category, index) => (
              <Button
                key={index}
                className={`${category.color} text-white font-medium px-3 py-2 md:px-6 md:py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md whitespace-nowrap flex-shrink-0`}
              >
                <span className="mr-1 sm:mr-2">{category.icon}</span>
                <span className="hidden xs:inline">{category.name}</span>
                <span className="xs:hidden">{category.name.split(' ')[1] || category.name.split(' ')[0]}</span>
              </Button>
            ))}
          </div>
        </div>
      </div> */}

      {/* Hero Section with Search */}
      <section className="relative py-8 md:py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 md:mb-4">Find Your Perfect Vehicle</h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              Sri Lanka's largest automobile marketplace
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-6xl mx-auto">
            <Card className="p-4 md:p-8 shadow-2xl bg-white/95 backdrop-blur-sm">
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

                <Button className="h-10 md:h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span>Search</span>
                </Button>
              </div>

              {/* Advanced Filters Toggle */}
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="text-blue-600 hover:text-blue-800 text-sm md:text-base"
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
      <div className="container mx-auto px-2 sm:px-3 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Vehicle Grid Layout - 1 column on smallest screens, 2 columns on larger screens */}
          <div className="w-full max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {vehicles.map((vehicle) => (
                <div 
                  key={vehicle.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-3 sm:p-4">
                    {/* Vehicle Title */}
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800 text-center mb-2 sm:mb-3">
                      {vehicle.title}
                    </h3>
                    
                    <div className="flex flex-row">
                      {/* Vehicle Image - Increased Size */}
                      <div className="w-2/5 sm:w-5/12">
                        <div className="relative">
                          <img
                            src={vehicle.image || "/placeholder.svg"}
                            alt={vehicle.title}
                            className="w-full h-24 sm:h-28 md:h-32 lg:h-36 object-cover rounded-md"
                          />
                        </div>
                      </div>

                      {/* Vehicle Details */}
                      <div className="w-3/5 sm:w-7/12 pl-3 sm:pl-4">
                        <div className="text-xs sm:text-sm text-gray-600 mb-1">
                          {vehicle.location}
                        </div>
                        
                        {/* Price - show actual price or "Negotiable" */}
                        <div className="text-xs sm:text-sm font-semibold text-blue-600 mb-1">
                          {vehicle.id % 2 === 0 ? "Negotiable" : vehicle.price}
                        </div>
                        
                        {/* Mileage */}
                        <div className="text-xs text-gray-500 mb-1">
                          {vehicle.mileage}
                        </div>
                        
                        {/* Date */}
                        <div className="text-xs text-gray-400">
                          {vehicle.id % 2 === 0 ? "2025-06-03" : "2025-06-02"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load More */}
            <div className="text-center mt-6 md:mt-8 pb-4">
              <Button size="lg" variant="outline" className="px-4 sm:px-6 md:px-8 h-9 sm:h-10 md:h-11 text-sm sm:text-base">
                Load More Vehicles
              </Button>
            </div>
          </div>

          {/* Right Sidebar - Ad Space - 2-column grid on mobile, row scroll on tablet, column on desktop */}
            <div className="w-full lg:w-[280px]">
              {/* Mobile (2-column grid) */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 sm:hidden">
                {/* Google Ad Space 1 */}
                <Card className="p-3 bg-gray-50 border-dashed border-2 border-gray-300 h-full">
                  <div className="text-center text-gray-500">
                    <div className="text-xs mb-1">Ad</div>
                    <div className="bg-gray-200 h-36 flex items-center justify-center rounded">
                      <span className="text-gray-400 text-xs">300x150</span>
                    </div>
                  </div>
                </Card>

                {/* Featured Dealers - Mobile */}
                <Card className="p-3 h-full">
                  <h3 className="font-semibold mb-2 text-xs text-gray-800">Featured Dealers</h3>
                  <div className="space-y-2">
                    {["Premium Motors", "City Auto"].map((dealer, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-1 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-xs">{dealer[0]}</span>
                        </div>
                        <div className="font-medium text-gray-800 text-xs truncate">{dealer}</div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Google Ad Space 2 */}
                <Card className="p-3 bg-gray-50 border-dashed border-2 border-gray-300 h-full">
                  <div className="text-center text-gray-500">
                    <div className="text-xs mb-1">Ad</div>
                    <div className="bg-gray-200 h-36 flex items-center justify-center rounded">
                      <span className="text-gray-400 text-xs">300x150</span>
                    </div>
                  </div>
                </Card>

                {/* Additional mobile card */}
                <Card className="p-3 bg-gray-50 border-dashed border-2 border-gray-300 h-full">
                  <div className="text-center text-gray-500">
                    <div className="text-xs mb-1">Ad</div>
                    <div className="bg-gray-200 h-36 flex items-center justify-center rounded">
                      <span className="text-gray-400 text-xs">300x150</span>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Tablet (horizontal scroll) */}
              <div className="hidden sm:block lg:hidden overflow-x-auto">
                <div className="flex flex-row gap-4 pb-2 min-w-max">
                  {/* Google Ad Space 1 */}
                  <Card className="p-3 md:p-4 bg-gray-50 border-dashed border-2 border-gray-300 w-72 sm:w-80 flex-shrink-0">
                    <div className="text-center text-gray-500">
                      <div className="text-xs md:text-sm mb-1 md:mb-2">Advertisement</div>
                      <div className="bg-gray-200 h-44 sm:h-52 flex items-center justify-center rounded">
                        <span className="text-gray-400 text-xs md:text-sm">Google Ad Space<br/>300x250</span>
                      </div>
                    </div>
                  </Card>

                  {/* Featured Dealers */}
                  <Card className="p-3 md:p-4 w-72 sm:w-80 flex-shrink-0">
                    <h3 className="font-semibold mb-3 md:mb-4 text-sm text-gray-800">Featured Dealers</h3>
                    <div className="space-y-2">
                      {["Premium Motors", "City Auto", "Elite Cars"].map((dealer, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">{dealer[0]}</span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 text-xs sm:text-sm">{dealer}</div>
                            <div className="text-xs text-gray-500">Verified Dealer</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Google Ad Space 2 */}
                  <Card className="p-3 md:p-4 bg-gray-50 border-dashed border-2 border-gray-300 w-72 sm:w-80 flex-shrink-0">
                    <div className="text-center text-gray-500">
                      <div className="text-xs md:text-sm mb-1 md:mb-2">Advertisement</div>
                      <div className="bg-gray-200 h-36 md:h-48 flex items-center justify-center rounded">
                        <span className="text-gray-400 text-xs md:text-sm">Google Ad Space<br/>300x200</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              
              {/* Desktop (vertical layout) */}
              <div className="hidden lg:flex lg:flex-col gap-4">
                {/* Google Ad Space 1 */}
                <Card className="p-4 bg-gray-50 border-dashed border-2 border-gray-300">
                  <div className="text-center text-gray-500">
                    <div className="text-sm mb-2">Advertisement</div>
                    <div className="bg-gray-200 h-64 flex items-center justify-center rounded">
                      <span className="text-gray-400 text-sm">Google Ad Space<br/>300x250</span>
                    </div>
                  </div>
                </Card>

                {/* Featured Dealers */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-4 text-base text-gray-800">Featured Dealers</h3>
                  <div className="space-y-3">
                    {["Premium Motors", "City Auto", "Elite Cars"].map((dealer, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-base">{dealer[0]}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 text-base">{dealer}</div>
                          <div className="text-sm text-gray-500">Verified Dealer</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Google Ad Space 2 */}
                <Card className="p-4 bg-gray-50 border-dashed border-2 border-gray-300">
                  <div className="text-center text-gray-500">
                    <div className="text-sm mb-2">Advertisement</div>
                    <div className="bg-gray-200 h-48 flex items-center justify-center rounded">
                      <span className="text-gray-400 text-sm">Google Ad Space<br/>300x200</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
        </div>
      </div>

      {/* Banner Ad Space */}
      <div className="container mx-auto px-4 py-4 md:py-6">
        <Card className="p-3 md:p-4 bg-gray-50 border-dashed border-2 border-gray-300">
          <div className="text-center text-gray-500">
            <div className="text-xs md:text-sm mb-1 md:mb-2">Advertisement</div>
            <div className="bg-gray-200 h-16 md:h-24 flex items-center justify-center rounded">
              <span className="text-gray-400 text-xs md:text-sm">Google Ad Banner Space - 728x90</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="text-xl md:text-2xl font-bold text-blue-400 mb-3 md:mb-4">Rathagala.lk</div>
              <p className="text-xs sm:text-sm md:text-base text-gray-300">
                Sri Lanka's most trusted vehicle marketplace connecting buyers and sellers nationwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 md:mb-4 text-sm md:text-base">Quick Links</h4>
              <ul className="space-y-1 md:space-y-2 text-xs sm:text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Browse Cars
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Sell Your Car
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Car Loans
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Insurance
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 md:mb-4 text-sm md:text-base">Support</h4>
              <ul className="space-y-1 md:space-y-2 text-xs sm:text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 md:mb-4 text-sm md:text-base">Connect</h4>
              <ul className="space-y-1 md:space-y-2 text-xs sm:text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 md:mt-8 pt-4 md:pt-6 text-center text-xs md:text-sm text-gray-400">
            <p>&copy; 2025 Rathagala.lk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}