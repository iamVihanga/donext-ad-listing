"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { betterFetch } from "@better-fetch/fetch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin, Phone, Mail, Globe, Calendar, Users, Building2, CheckCircle2, ShieldCheck } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

// Define Organization type
interface Organization {
  id: string;
  name: string;
  description: string;
  logo?: string;
  coverImage?: string;
  location?: string;
  phone?: string;
  email?: string;
  website?: string;
  establishedYear?: number;
  employeeCount?: number;
  memberCount?: number;
  isVerified: boolean;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  createdAt: string;
}

// Define listing type
interface OrganizationAd {
  id: string;
  title: string;
  price: number | null;
  location?: string;
  createdAt: string;
  media?: Array<{
    media: {
      url: string;
    }
  }>;
}

export default function OrganizationDetailPage() {
  const params = useParams();
  const organizationId = params.id as string;
  
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [listings, setListings] = useState<OrganizationAd[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");
  
  useEffect(() => {
    const fetchOrganization = async () => {
      setIsLoading(true);
      
      try {
        // Fetch organization data
        const { data, error } = await betterFetch<Organization>(`/api/organizations/${organizationId}`);
        
        if (error) {
          throw new Error(error.message || "Failed to fetch organization");
        }
        
        if (data) {
          setOrganization(data);
          
          // Also fetch organization listings
          fetchOrganizationListings(organizationId);
        }
      } catch (error) {
        console.error("Error fetching organization:", error);
        toast.error("Failed to load organization details");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (organizationId) {
      fetchOrganization();
    }
  }, [organizationId]);
  
  const fetchOrganizationListings = async (orgId: string) => {
    try {
      const { data, error } = await betterFetch<OrganizationAd[]>(`/api/organizations/${orgId}/listings`);
      
      if (error) {
        throw new Error(error.message || "Failed to fetch organization listings");
      }
      
      if (data) {
        setListings(data);
      }
    } catch (error) {
      console.error("Error fetching organization listings:", error);
    }
  };
  
  // Format price to display with commas
  const formatPrice = (price: number | null) => {
    if (price === null) return "Price on request";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "MMM d, yyyy");
    } catch (e) {
      return dateStr;
    }
  };
  
  // Get first image from listing
  const getListingImage = (listing: OrganizationAd) => {
    if (listing.media && listing.media.length > 0 && listing.media[0].media) {
      return listing.media[0].media.url;
    }
    return "/images/placeholder-image.png";
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }
  
  if (!organization) {
    return (
      <div className="max-w-6xl mx-auto py-20 px-4 text-center">
        <h1 className="text-2xl font-semibold mb-2">Organization Not Found</h1>
        <p className="text-slate-600 mb-6">The organization you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Cover image and basic info */}
      <div className="relative mb-6">
        <div className="h-48 md:h-64 bg-slate-200 rounded-xl overflow-hidden">
          {organization.coverImage ? (
            <img 
              src={organization.coverImage} 
              alt={`${organization.name} cover`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-blue-600" />
          )}
        </div>
        
        <div className="absolute -bottom-12 left-6 bg-white p-1 rounded-xl shadow-md">
          <Avatar className="w-24 h-24">
            <AvatarImage src={organization.logo || ""} alt={organization.name} />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
              {organization.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <div className="mt-14">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-semibold">{organization.name}</h1>
              {organization.isVerified && (
                <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Verified</span>
                </Badge>
              )}
            </div>
            
            {organization.location && (
              <div className="flex items-center text-slate-600 mt-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{organization.location}</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {organization.phone && (
              <Button variant="outline" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Contact</span>
              </Button>
            )}
            
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Follow</span>
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid w-full grid-cols-3 sm:w-auto">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-medium mb-3">About {organization.name}</h3>
                  <p className="text-slate-700 whitespace-pre-line">{organization.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div>
                      <h4 className="text-lg font-medium mb-4">Contact Information</h4>
                      <ul className="space-y-3">
                        {organization.phone && (
                          <li className="flex items-start">
                            <Phone className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0" />
                            <span>{organization.phone}</span>
                          </li>
                        )}
                        {organization.email && (
                          <li className="flex items-start">
                            <Mail className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0" />
                            <span>{organization.email}</span>
                          </li>
                        )}
                        {organization.website && (
                          <li className="flex items-start">
                            <Globe className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0" />
                            <a href={organization.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {organization.website.replace(/^https?:\/\/(www\.)?/, '')}
                            </a>
                          </li>
                        )}
                        {organization.location && (
                          <li className="flex items-start">
                            <MapPin className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0" />
                            <span>{organization.location}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium mb-4">Organization Details</h4>
                      <ul className="space-y-3">
                        {organization.establishedYear && (
                          <li className="flex items-center">
                            <Calendar className="h-5 w-5 mr-3 text-blue-600" />
                            <span>Established in {organization.establishedYear}</span>
                          </li>
                        )}
                        {organization.employeeCount && (
                          <li className="flex items-center">
                            <Users className="h-5 w-5 mr-3 text-blue-600" />
                            <span>{organization.employeeCount} Employees</span>
                          </li>
                        )}
                        {organization.memberCount && (
                          <li className="flex items-center">
                            <Building2 className="h-5 w-5 mr-3 text-blue-600" />
                            <span>{organization.memberCount} Members</span>
                          </li>
                        )}
                        <li className="flex items-center">
                          <Calendar className="h-5 w-5 mr-3 text-blue-600" />
                          <span>Joined {formatDate(organization.createdAt)}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="listings" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-5">Current Listings</h3>
                
                {listings.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <p>This organization doesn't have any active listings yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.map(listing => (
                      <div key={listing.id} className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                          <img 
                            src={getListingImage(listing)}
                            alt={listing.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium text-slate-800 line-clamp-2">{listing.title}</h4>
                          <p className="text-blue-600 font-medium mt-1">Rs {formatPrice(listing.price)}</p>
                          <div className="flex items-center mt-2 text-sm text-slate-500">
                            {listing.location && (
                              <>
                                <MapPin className="h-3.5 w-3.5 mr-1" />
                                <span className="mr-2">{listing.location}</span>
                                <span>•</span>
                              </>
                            )}
                            <span className="ml-2">{formatDate(listing.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-3">Reviews</h3>
                <div className="text-center py-12 text-slate-500">
                  <p>No reviews available yet.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}