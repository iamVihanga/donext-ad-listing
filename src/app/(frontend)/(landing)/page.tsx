"use client";

import { useMemo, useState } from "react";
import { Search, ChevronDown, Filter, Loader2, RefreshCw } from "lucide-react";
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
import { format } from "date-fns";

// Import the existing hook
import { useGetAds } from "@/features/ads/api/use-get-ads";
import { useGetOrganizations } from "@/features/organizations/api/use-get-orgs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState as useDialogState } from "react";

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

// List of vehicle makes for dropdown
const vehicleMakes = [
  "Acura", "Alfa-Romeo", "Aprilia", "Ashok-Leyland", "Aston", "Atco", "ATHER", 
  "Audi", "Austin", "Baic", "Bajaj", "Bentley", "BMW", "Borgward", "BYD", 
  "Cadillac", "CAT", "Changan", "Chery", "Chevrolet", "Chrysler", "Citroen",
  "Daewoo", "Daihatsu", "Datsun", "DFSK", "Ducati", "Fiat", "Ford", "Hero",
  "Honda", "Hyundai", "Isuzu", "Jaguar", "Jeep", "Kawasaki", "Kia", "KTM",
  "Land-Rover", "Lexus", "Mahindra", "Mazda", "Mercedes-Benz", "Micro", "Mini",
  "Mitsubishi", "Nissan", "Perodua", "Peugeot", "Porsche", "Proton", "Renault",
  "Skoda", "Subaru", "Suzuki", "Tata", "Tesla", "Toyota", "TVS", "Volkswagen",
  "Volvo", "Yamaha"
];

// Sri Lankan cities for dropdown
const sriLankanCities = [
  "Colombo", "Kandy", "Galle", "Jaffna", "Negombo", "Batticaloa", "Trincomalee",
  "Anuradhapura", "Ratnapura", "Kotte", "Moratuwa", "Nuwara Eliya", "Gampaha",
  "Matara", "Kurunegala", "Badulla", "Hambantota", "Kalmunai", "Vavuniya"
];

// Define filter state interface with updated fields
interface FilterState {
  make: string | null;
  model: string | null;
  vehicleType: string | null;
  city: string | null;
  condition: string | null;
  
  // Advanced filters
  minYear: string | null;
  maxYear: string | null;
  minPrice: string | null;
  maxPrice: string | null;
  fuelType: string | null;
  transmission: string | null;
}

export default function VehicleMarketplace() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Initialize filter state (pending filters)
  const [filters, setFilters] = useState<FilterState>({
    make: null,
    model: null,
    vehicleType: null,
    city: null,
    condition: null,
    minYear: null,
    maxYear: null,
    minPrice: null,
    maxPrice: null,
    fuelType: null,
    transmission: null
  });

  // Add new state for active filters (applied filters)
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    make: null,
    model: null,
    vehicleType: null,
    city: null,
    condition: null,
    minYear: null,
    maxYear: null,
    minPrice: null,
    maxPrice: null,
    fuelType: null,
    transmission: null
  });

  // Track if filters are active
  const hasActiveFilters = Object.values(activeFilters).some(
    (value) => value !== null
  );

  // Use the existing hook to fetch real vehicle data
  const { data, isLoading, error } = useGetAds({
    page: 1,
    limit: 8 // Show 8 items initially for better grid layout
  });

  // Apply filters to the data - modify to use activeFilters instead of filters
  const filteredAds = useMemo(() => {
    if (!data?.ads || data.ads.length === 0) return [];

    return data.ads.filter((ad) => {
      // Make filter
      if (
        activeFilters.make &&
        ad.brand?.toLowerCase() !== activeFilters.make.toLowerCase()
      ) {
        return false;
      }

      // Model filter (case insensitive partial match)
      if (
        activeFilters.model &&
        !ad.model?.toLowerCase().includes(activeFilters.model.toLowerCase())
      ) {
        return false;
      }

      // Vehicle type filter
      if (
        activeFilters.vehicleType &&
        ad.type !== activeFilters.vehicleType.toUpperCase()
      ) {
        return false;
      }
      
      // City filter
      if (
        activeFilters.city && 
        ad.city?.toLowerCase() !== activeFilters.city.toLowerCase()
      ) {
        return false;
      }
      
      // Condition filter
      if (
        activeFilters.condition && 
        ad.condition?.toLowerCase() !== activeFilters.condition.toLowerCase()
      ) {
        return false;
      }

      // Min price filter
      if (
        activeFilters.minPrice &&
        ad.price &&
        ad.price < parseInt(activeFilters.minPrice)
      ) {
        return false;
      }
      
      // Max price filter
      if (
        activeFilters.maxPrice &&
        ad.price &&
        ad.price > parseInt(activeFilters.maxPrice)
      ) {
        return false;
      }

      // Min year filter
      if (
        activeFilters.minYear &&
        ad.manufacturedYear &&
        parseInt(ad.manufacturedYear) < parseInt(activeFilters.minYear)
      ) {
        return false;
      }

      // Max year filter
      if (
        activeFilters.maxYear &&
        ad.manufacturedYear &&
        parseInt(ad.manufacturedYear) > parseInt(activeFilters.maxYear)
      ) {
        return false;
      }

      // Fuel type filter
      if (
        activeFilters.fuelType &&
        ad.fuelType?.toLowerCase() !== activeFilters.fuelType.toLowerCase()
      ) {
        return false;
      }

      // Transmission filter
      if (
        activeFilters.transmission &&
        ad.transmission?.toLowerCase() !== activeFilters.transmission.toLowerCase()
      ) {
        return false;
      }

      return true;
    });
  }, [data?.ads, activeFilters]);

  // Handle filter changes - only updates pending filters
  const handleFilterChange = (
    filterName: keyof FilterState,
    value: string | null
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value === "any" ? null : value
    }));
  };

  // Apply all current filters
  const applyFilters = () => {
    setActiveFilters(filters);
  };

  // Clear all filters
  const clearFilters = () => {
    const emptyFilters = {
      make: null,
      model: null,
      vehicleType: null,
      city: null,
      condition: null,
      minYear: null,
      maxYear: null,
      minPrice: null,
      maxPrice: null,
      fuelType: null,
      transmission: null
    };

    setFilters(emptyFilters);
    setActiveFilters(emptyFilters);
  };

  // Format price for display
  const formatPrice = (price: number | null) => {
    if (price === null) return "Price on request";
    return `Rs. ${price.toLocaleString()}`;
  };

  // Generate year options
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 30 }, (_, i) => currentYear - i);
  }, []);

  function FeaturedDealers() {
    const [showAllDealers, setShowAllDealers] = useDialogState(false);
    const { data, isLoading, error } = useGetOrganizations({
      limit: 3,
      // Add filter parameters for featured organizations if your API supports it
    });

    // For all organizations in the modal
    const { data: allOrgsData, isLoading: allOrgsLoading } = useGetOrganizations({
      limit: 50, // Fetch more organizations for the modal view
    });

    // Define organization type
    type Organization = {
      id: string;
      name?: string;
      logo?: string | null;
      verified?: boolean;
      _count?: {
        ads: number;
      };
    };

    // Organization card component to reuse in both views
    const OrganizationCard = ({ org }: { org: Organization }) => (
      <div
        className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-teal-50 transition-all duration-200 cursor-pointer"
        onClick={() => window.location.href = `/organizations/${org.id}`}
      >
        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center overflow-hidden">
          {org.logo ? (
            <img 
              src={org.logo} 
              alt={org.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-teal-700 font-semibold">
              {org.name?.charAt(0) || 'D'}
            </span>
          )}
        </div>
        <div>
          <div className="font-medium text-slate-800">
            {org.name || "Unnamed Dealer"}
          </div>
          <div className="text-sm text-slate-500">
            {(org as any).verified ? "Verified Dealer" : "Dealer"} • {(org as any)._count?.ads || 0} listing{(org as any)._count?.ads !== 1 ? "s" : ""}
          </div>
        </div>
      </div>
    );

    // Loading state
    if (isLoading) {
      return (
        <Card className="p-5 bg-white rounded-xl border border-slate-100">
          <h3 className="font-semibold mb-4 text-slate-800">Featured Dealers</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg animate-pulse">
                <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      );
    }

    // Error or empty state
    if (error || !data?.organizations || data.organizations.length === 0) {
      return (
        <Card className="p-5 bg-white rounded-xl border border-slate-100">
          <h3 className="font-semibold mb-4 text-slate-800">Featured Dealers</h3>
          <div className="p-3 text-center text-slate-500">
            No dealers available at the moment
          </div>
        </Card>
      );
    }

    // Success state with real data
    return (
      <>
        <Card className="p-5 bg-white rounded-xl border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-slate-800">Featured Dealers</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-teal-700 hover:text-teal-800 hover:bg-teal-50 text-sm"
              onClick={() => setShowAllDealers(true)}
            >
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {data.organizations.map((org) => (
              <OrganizationCard key={org.id} org={org} />
            ))}
          </div>
        </Card>

        {/* Modal dialog for all dealers */}
        <Dialog open={showAllDealers} onOpenChange={setShowAllDealers}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-slate-800">All Dealers</DialogTitle>
            </DialogHeader>
            
            {allOrgsLoading ? (
              <div className="p-8 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-teal-700" />
              </div>
            ) : (
              <div className="grid gap-3 py-4">
                {allOrgsData?.organizations?.length ? (
                  allOrgsData.organizations.map((org) => (
                    <OrganizationCard key={org.id} org={org} />
                  ))
                ) : (
                  <div className="text-center text-slate-500 p-4">
                    No more dealers to display
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <div>
      {/* Hero Section with Search */}
      <section className="relative py-12 md:py-20 bg-gradient-to-r from-teal-900 via-teal-800 to-teal-700 overflow-hidden">
        {/* Abstract shapes for visual interest */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -right-40 -top-40 w-80 h-80 bg-teal-400 rounded-full"></div>
          <div className="absolute -left-20 bottom-10 w-60 h-60 bg-teal-300 rounded-full"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-5 font-heading">
              Find Your Perfect Vehicle
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-teal-100 max-w-2xl mx-auto">
              {`Sri Lanka's largest automobile marketplace`}
            </p>
          </div>

          {/* Search Form - Simplified and minimal */}
          <div className="max-w-6xl mx-auto">
            <Card className="p-5 shadow-lg bg-white rounded-xl border-0">
              {/* Main filters - clean and minimal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {/* Make filter */}
                <Select
                  value={filters.make || "any"}
                  onValueChange={(value) => handleFilterChange("make", value)}
                >
                  <SelectTrigger className="w-full bg-white border-slate-200">
                    <SelectValue placeholder="Any Make" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[280px]">
                    <SelectItem value="any">Any Make</SelectItem>
                    {vehicleMakes.map((make) => (
                      <SelectItem key={make} value={make.toLowerCase()}>
                        {make}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Model filter */}
                <Input
                  placeholder="Model (e.g., Prius)"
                  className="bg-white border-slate-200"
                  value={filters.model || ""}
                  onChange={(e) => handleFilterChange("model", e.target.value || null)}
                />

                {/* Vehicle Type filter */}
                <Select
                  value={filters.vehicleType || "any"}
                  onValueChange={(value) => handleFilterChange("vehicleType", value)}
                >
                  <SelectTrigger className="w-full bg-white border-slate-200">
                    <SelectValue placeholder="Any Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Type</SelectItem>
                    {Object.entries(vehicleTypeLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* City filter */}
                <Select
                  value={filters.city || "any"}
                  onValueChange={(value) => handleFilterChange("city", value)}
                >
                  <SelectTrigger className="w-full bg-white border-slate-200">
                    <SelectValue placeholder="Any City" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[280px]">
                    <SelectItem value="any">Any City</SelectItem>
                    {sriLankanCities.map((city) => (
                      <SelectItem key={city} value={city.toLowerCase()}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Search button */}
                <Button
                  className="w-full bg-teal-700 hover:bg-teal-600 text-white"
                  onClick={applyFilters}
                  disabled={isLoading}
                >
                  <Search className="w-4 h-4 mr-2" />
                  <span>Search</span>
                </Button>
              </div>

              {/* Advanced filters toggle and clear */}
              <div className="flex justify-between mt-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="text-teal-700 text-sm"
                  size="sm"
                >
                  {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform ${
                      showAdvancedFilters ? "rotate-180" : ""
                    }`}
                  />
                </Button>

                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="text-sm"
                    size="sm"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>

              {/* Simple Advanced Filters - Reorganized for better mobile experience */}
              {showAdvancedFilters && (
                <div className="mt-4 pt-4 border-t">
                  {/* First row - condition, min year, max year */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <Select
                      value={filters.condition || "any"}
                      onValueChange={(value) => handleFilterChange("condition", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Condition</SelectItem>
                        <SelectItem value="Brand New">Brand New</SelectItem>
                        <SelectItem value="Unregistered (Recondition)">Unregistered</SelectItem>
                        <SelectItem value="Registered (Used)">Registered</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={filters.minYear || "any"}
                      onValueChange={(value) => handleFilterChange("minYear", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Min Year" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[280px]">
                        <SelectItem value="any">Min Year</SelectItem>
                        {years.map(year => (
                          <SelectItem key={`min-${year}`} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={filters.maxYear || "any"}
                      onValueChange={(value) => handleFilterChange("maxYear", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Max Year" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[280px]">
                        <SelectItem value="any">Max Year</SelectItem>
                        {[...years].reverse().map(year => (
                          <SelectItem key={`max-${year}`} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Second row - price range, fuel type, transmission */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    <Select
                      value={filters.minPrice || "any"}
                      onValueChange={(value) => handleFilterChange("minPrice", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Min Price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Min Price</SelectItem>
                        <SelectItem value="500000">500,000</SelectItem>
                        <SelectItem value="1000000">1,000,000</SelectItem>
                        <SelectItem value="2000000">2,000,000</SelectItem>
                        <SelectItem value="5000000">5,000,000</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={filters.maxPrice || "any"}
                      onValueChange={(value) => handleFilterChange("maxPrice", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Max Price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Max Price</SelectItem>
                        <SelectItem value="2000000">2,000,000</SelectItem>
                        <SelectItem value="5000000">5,000,000</SelectItem>
                        <SelectItem value="10000000">10,000,000</SelectItem>
                        <SelectItem value="20000000">20,000,000</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={filters.fuelType || "any"}
                      onValueChange={(value) => handleFilterChange("fuelType", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Fuel Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Fuel</SelectItem>
                        <SelectItem value="Petrol">Petrol</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="Electric">Electric</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={filters.transmission || "any"}
                      onValueChange={(value) => handleFilterChange("transmission", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Transmission</SelectItem>
                        <SelectItem value="Automatic">Automatic</SelectItem>
                        <SelectItem value="Manual">Manual</SelectItem>
                        <SelectItem value="CVT">CVT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Apply button - Full width on mobile, right-aligned on desktop */}
                  <div className="flex justify-end mt-4">
                    <Button
                      onClick={applyFilters} 
                      className="w-full sm:w-auto bg-teal-700 hover:bg-teal-600 text-white"
                    >
                      Apply Filters
                    </Button>
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

              {/* No results */}
              {filteredAds.length === 0 && !isLoading && data?.ads && (
                <div className="p-12 text-center border rounded-xl bg-white shadow-sm">
                  {hasActiveFilters ? (
                    <>
                      <p className="text-slate-600 mb-2">
                        No vehicles match your filter criteria
                      </p>
                      <Button
                        className="mt-4 bg-teal-700 hover:bg-teal-600"
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-slate-600 mb-2">No vehicles found</p>
                      <Button className="mt-4 bg-teal-700 hover:bg-teal-600">
                        Create Your First Listing
                      </Button>
                    </>
                  )}
                </div>
              )}

              {/* Vehicle Grid - Using Real Data */}
              {filteredAds.length > 0 && !isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredAds.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group"
                      onClick={() => (window.location.href = `/${vehicle.id}`)}
                    >
                      <div className="p-3">
                        {/* Vehicle Title - Centered */}
                        <h3 className="font-semibold text-sm text-slate-800 text-center mb-2 transition-colors group-hover:text-teal-700 line-clamp-1">
                          {[vehicle.brand, vehicle.model, vehicle.manufacturedYear, vehicle.vehicleType]
                            .filter(Boolean)
                            .join(' ') || vehicle.title}
                        </h3>

                        <div className="flex">
                          {/* Vehicle Image */}
                          <div className="w-32 h-20 flex-shrink-0">
                            <img
                              src="/placeholder-image.jpg"
                              alt={vehicle.title}
                              className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* Vehicle Details */}
                          <div className="flex-1 pl-3 flex flex-col justify-between">
                            <div>
                              <div className="text-xs text-slate-600 mb-1 line-clamp-1">
                                {vehicle.location || ""}
                              </div>

                              <div className="text-sm font-semibold text-teal-700 mb-1">
                                {formatPrice(vehicle.price)}
                              </div>

                              <div className="text-xs text-slate-500">
                                {vehicleTypeLabels[vehicle.type] || vehicle.type}
                              </div>
                            </div>

                            <div className="text-xs text-slate-400 mt-1">
                              {format(new Date(vehicle.createdAt), "MMM d, yyyy")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Load More */}
              {!hasActiveFilters && filteredAds.length > 0 && (
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
              )}
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
              <FeaturedDealers />

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
    </div>
  );
}