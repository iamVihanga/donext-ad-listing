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

// Define filter state interface
interface FilterState {
  make: string | null;
  model: string | null;
  vehicleType: string | null;
  priceRange: string | null;
  // Advanced filters
  yearFrom: string | null;
  yearTo: string | null;
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
    priceRange: null,
    yearFrom: null,
    yearTo: null,
    fuelType: null,
    transmission: null
  });

  // Add new state for active filters (applied filters)
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    make: null,
    model: null,
    vehicleType: null,
    priceRange: null,
    yearFrom: null,
    yearTo: null,
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

  // Parse price range values
  const parsePriceRange = (range: string | null) => {
    if (!range) return { min: null, max: null };

    switch (range) {
      case "0-2m":
        return { min: 0, max: 2000000 };
      case "2m-5m":
        return { min: 2000000, max: 5000000 };
      case "5m-10m":
        return { min: 5000000, max: 10000000 };
      case "10m+":
        return { min: 10000000, max: null };
      default:
        return { min: null, max: null };
    }
  };

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

      // Price range filter
      if (activeFilters.priceRange) {
        const { min, max } = parsePriceRange(activeFilters.priceRange);
        if (min !== null && ad.price && ad.price < min) return false;
        if (max !== null && ad.price && ad.price > max) return false;
      }

      // Advanced filters
      if (
        activeFilters.yearFrom &&
        ad.manufacturedYear &&
        parseInt(ad.manufacturedYear) < parseInt(activeFilters.yearFrom)
      ) {
        return false;
      }

      if (
        activeFilters.yearTo &&
        ad.manufacturedYear &&
        parseInt(ad.manufacturedYear) > parseInt(activeFilters.yearTo)
      ) {
        return false;
      }

      if (
        activeFilters.fuelType &&
        ad.fuelType?.toLowerCase() !== activeFilters.fuelType.toLowerCase()
      ) {
        return false;
      }

      if (
        activeFilters.transmission &&
        ad.transmission?.toLowerCase() !==
          activeFilters.transmission.toLowerCase()
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
      priceRange: null,
      yearFrom: null,
      yearTo: null,
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
              {`Sri Lanka's largest automobile marketplace with thousands of verified listings`}
            </p>
          </div>

          {/* Search Form - Update the search button onClick handler */}
          <div className="max-w-6xl mx-auto">
            <Card className="p-5 md:p-7 shadow-xl bg-white rounded-xl border-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-5">
                <Select
                  value={filters.make || "any"}
                  defaultValue=""
                  onValueChange={(value) =>
                    handleFilterChange("make", value || null)
                  }
                >
                  <SelectTrigger className="min-h-14 w-full rounded-md py-3 bg-white border-slate-200 hover:border-teal-500 focus:border-teal-500">
                    <SelectValue placeholder="Any Make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Make</SelectItem>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="nissan">Nissan</SelectItem>
                    <SelectItem value="bmw">BMW</SelectItem>
                    <SelectItem value="mercedes">Mercedes</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Model (e.g., Prius)"
                  className="min-h-14 w-full rounded-md bg-white border-slate-200 focus-visible:ring-teal-500"
                  value={filters.model || ""}
                  onChange={(e) =>
                    handleFilterChange("model", e.target.value || null)
                  }
                />

                <Select
                  value={filters.vehicleType || ""}
                  defaultValue=""
                  onValueChange={(value) =>
                    handleFilterChange("vehicleType", value || null)
                  }
                >
                  <SelectTrigger className="min-h-14 w-full rounded-md bg-white border-slate-200 hover:border-teal-500 focus:border-teal-500">
                    <SelectValue placeholder="Any Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Type</SelectItem>
                    <SelectItem value="CAR">Car</SelectItem>
                    <SelectItem value="SUV_JEEP">SUV / Jeep</SelectItem>
                    <SelectItem value="VAN">Van</SelectItem>
                    <SelectItem value="LORRY">Lorry</SelectItem>
                    <SelectItem value="MOTORCYCLE">Motorcycle</SelectItem>
                    <SelectItem value="THREE_WHEEL">Three Wheel</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.priceRange || ""}
                  defaultValue=""
                  onValueChange={(value) =>
                    handleFilterChange("priceRange", value || null)
                  }
                >
                  <SelectTrigger className="min-h-14 w-full rounded-md bg-white border-slate-200 hover:border-teal-500 focus:border-teal-500">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Price</SelectItem>
                    <SelectItem value="0-2m">Under Rs. 2M</SelectItem>
                    <SelectItem value="2m-5m">Rs. 2M - 5M</SelectItem>
                    <SelectItem value="5m-10m">Rs. 5M - 10M</SelectItem>
                    <SelectItem value="10m+">Above Rs. 10M</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  className="h-14 bg-teal-700 hover:bg-teal-600 text-white font-medium rounded-lg"
                  onClick={applyFilters}
                  disabled={isLoading}
                >
                  <Search className="w-4 h-4 mr-2" />
                  <span>Search</span>
                </Button>
              </div>

              {/* Clear filters button - only show when filters are active */}
              {hasActiveFilters && (
                <div className="flex justify-end mb-4">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="text-teal-700 border-teal-700 hover:bg-teal-50"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear Filters
                  </Button>
                </div>
              )}

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
                <div className="pt-4 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <Select
                      value={filters.yearFrom || ""}
                      onValueChange={(value) =>
                        handleFilterChange("yearFrom", value || null)
                      }
                    >
                      <SelectTrigger className="min-h-12 w-full rounded-md bg-white border-slate-200 hover:border-teal-500 focus:border-teal-500">
                        <SelectValue placeholder="Year From" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Year</SelectItem>
                        <SelectItem value="2020">2020</SelectItem>
                        <SelectItem value="2019">2019</SelectItem>
                        <SelectItem value="2018">2018</SelectItem>
                        <SelectItem value="2017">2017</SelectItem>
                        <SelectItem value="2016">2016</SelectItem>
                        <SelectItem value="2015">2015</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={filters.yearTo || ""}
                      onValueChange={(value) =>
                        handleFilterChange("yearTo", value || null)
                      }
                    >
                      <SelectTrigger className="min-h-12 w-full rounded-md bg-white border-slate-200 hover:border-teal-500 focus:border-teal-500">
                        <SelectValue placeholder="Year To" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Year</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={filters.fuelType || ""}
                      onValueChange={(value) =>
                        handleFilterChange("fuelType", value || null)
                      }
                    >
                      <SelectTrigger className="min-h-12 w-full rounded-md bg-white border-slate-200 hover:border-teal-500 focus:border-teal-500">
                        <SelectValue placeholder="Fuel Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Fuel Type</SelectItem>
                        <SelectItem value="petrol">Petrol</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={filters.transmission || ""}
                      onValueChange={(value) =>
                        handleFilterChange("transmission", value || null)
                      }
                    >
                      <SelectTrigger className="min-h-12 w-full rounded-md bg-white border-slate-200 hover:border-teal-500 focus:border-teal-500">
                        <SelectValue placeholder="Transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Transmission</SelectItem>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredAds.map((vehicle) => (
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
                                {vehicle.location || ""}
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
    </div>
  );
}
