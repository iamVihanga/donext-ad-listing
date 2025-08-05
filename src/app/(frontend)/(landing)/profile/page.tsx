"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, ChevronRight, CheckCircle, Car, Edit, Trash2, Shield, CreditCard, Users, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { betterFetch } from "@better-fetch/fetch";
import { toast } from "sonner";
import { useGetUserAds } from "@/features/ads/api/use-get-user-ads";
import { format } from "date-fns";

// User type from auth
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Session {
  user: User;
}

// Ad type
interface UserAd {
  id: string;
  title: string;
  price: number | null;
  location: string | null;
  createdAt: string;
  media?: Array<{
    media: {
      url: string;
    }
  }>;
  views?: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sidebarActive, setSidebarActive] = useState("personal");
  
  // Fetch user ads with the new hook
  const userAdsQuery = useGetUserAds();
  
  // Form data for profile edit
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  // Fetch actual user data from session
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      
      try {
        // Get user session from API
        const { data: session, error } = await betterFetch<Session>("/api/auth/get-session");
        
        if (error || !session) {
          // If error or no session, redirect to signin
          // Note: Middleware should handle this, but this is a fallback
          router.push("/signin?callbackUrl=/profile");
          return;
        }
        
        // Set user from session
        setUser(session.user);
        
        // Initialize form data with user info
        setFormData({
          name: session.user.name || "",
          email: session.user.email || "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [router]);
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle profile update
  const handleUpdateProfile = async () => {
    setIsSaving(true);
    
    try {
      // Update user profile via API
      const { data, error } = await betterFetch("/api/user/profile", {
        method: "PATCH",
        body: { name: formData.name }
      });
      
      if (error) {
        throw new Error(error.message || "Failed to update profile");
      }
      
      // Update local state
      if (user) {
        setUser({
          ...user,
          name: formData.name
        });
      }
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      toast.success("Profile updated successfully");
      
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setActiveSection(null);
      setIsSaving(false);
    }
  };
  
  // Handle password change
  const handleChangePassword = async () => {
    setIsSaving(true);
    
    try {
      // Update password via API
      const { data, error } = await betterFetch("/api/user/change-password", {
        method: "POST",
        body: {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        }
      });
      
      if (error) {
        throw new Error(error.message || "Failed to change password");
      }
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      toast.success("Password changed successfully");
      
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password");
    } finally {
      setActiveSection(null);
      setIsSaving(false);
    }
  };
  
  // Handle sign out with loading state
  const handleSignOut = async () => {
    setIsSaving(true);
    try {
      // Call sign out API
      const { error } = await betterFetch("/api/auth/signout", { method: "POST" });
      
      if (error) {
        throw new Error(error.message || "Failed to sign out");
      }
      
      toast.success("Signed out successfully");
      setTimeout(() => {
        router.push("/signin");
      }, 500);
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
      setIsSaving(false);
    }
  };
  
  // Format price to display with commas
  const formatPrice = (price: number | null) => {
    if (price === null) return "Price on request";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Handle delete ad
  const handleDeleteAd = async (id: string) => {
    try {
      // Delete ad via API
      const { error } = await betterFetch(`/api/ad/${id}`, { 
        method: "DELETE" 
      });
      
      if (error) {
        throw new Error(error.message || "Failed to delete ad");
      }
      
      // Refetch user ads after deletion
      userAdsQuery.refetch();
      
      toast.success("Ad deleted successfully");
    } catch (error) {
      console.error("Error deleting ad:", error);
      toast.error("Failed to delete ad");
    }
  };
  
  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "MMM d, yyyy");
    } catch (e) {
      return dateStr;
    }
  };
  
  // Get ad image
  const getAdImage = (ad: UserAd) => {
    if (ad.media && ad.media.length > 0 && ad.media[0].media) {
      return ad.media[0].media.url;
    }
    return "";
  };
  
  // Loading state for the entire page
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }
  
  if (!user) return null;
  
  // First letter for avatar
  const firstLetter = user.name?.charAt(0).toUpperCase() || "U";
  
  const userAds = userAdsQuery.data || [];
  const isAdsLoading = userAdsQuery.isLoading;
  
  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      {/* Success indicator */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-50 text-green-700 px-4 py-2 rounded-md flex items-center shadow-md border border-green-100 z-50">
          <CheckCircle className="h-5 w-5 mr-2" />
          Changes saved successfully!
        </div>
      )}
      
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold text-slate-800">Profile</h1>
        <Button 
          className="bg-white text-red-600 hover:bg-red-50 border border-black/10 shadow-sm"
          onClick={handleSignOut}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing out...
            </>
          ) : "Sign Out"}
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 mt-6">
        {/* Left sidebar navigation - Apple style */}
        <div className="md:w-1/4">
          {/* User info at the top of sidebar */}
          <div className="mb-6">
            <Avatar className="h-16 w-16 mx-auto mb-2">
              <AvatarImage src={user.avatar || ""} alt={user.name} />
              <AvatarFallback className="bg-slate-200 text-slate-600">
                {firstLetter}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="font-medium">{user.name}</h2>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>
          </div>

          {/* Navigation options */}
          <div className="space-y-0.5">
            <button
              className={`w-full text-left py-2 px-3 rounded ${
                sidebarActive === "personal" 
                  ? "text-blue-600 font-medium" 
                  : "text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() => setSidebarActive("personal")}
            >
              Personal Information
            </button>
            
            <button
              className={`w-full text-left py-2 px-3 rounded ${
                sidebarActive === "security" 
                  ? "text-blue-600 font-medium" 
                  : "text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() => setSidebarActive("security")}
            >
              Sign-In and Security
            </button>

            <button
              className={`w-full text-left py-2 px-3 rounded ${
                sidebarActive === "ads" 
                  ? "text-blue-600 font-medium" 
                  : "text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() => setSidebarActive("ads")}
            >
              My Ads
            </button>
          </div>
        </div>
        
        {/* Right content area */}
        <div className="md:w-3/4">
          {/* Personal Information */}
          {sidebarActive === "personal" && (
            <div>
              <h2 className="text-2xl font-medium mb-5">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <div className="p-4 border-b border-slate-200">
                    <h3 className="font-medium">Name & Email</h3>
                  </div>
                  
                  {activeSection === "name" ? (
                    <div className="p-4 space-y-3">
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="Your name"
                      />
                      <div className="flex space-x-3">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setActiveSection(null)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={handleUpdateProfile}
                        >
                          {isSaving ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : "Save"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 flex justify-between items-center cursor-pointer" onClick={() => setActiveSection("name")}>
                      <div>
                        <div className="text-sm text-slate-500">Name</div>
                        <div className="font-medium mt-1">{user.name}</div>
                      </div>
                      <Button size="sm" variant="ghost" className="text-blue-600">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  )}
                  
                  <div className="px-4 py-3 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-slate-500">Email</div>
                        <div className="font-medium mt-1">{user.email}</div>
                      </div>
                      <Button size="sm" variant="ghost" className="text-blue-600">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Security Settings */}
          {sidebarActive === "security" && (
            <div>
              <h2 className="text-2xl font-medium mb-3">Sign-In and Security</h2>
              <p className="text-slate-600 mb-5">
                Manage settings related to signing in to your account, account security and how to recover your data
                when you are having trouble signing in.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Password card */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Password</h3>
                      <p className="text-sm text-slate-500 mt-1">Last updated: Not available</p>
                    </div>
                    <Button size="icon" variant="ghost" className="text-blue-600" onClick={() => setActiveSection("password")}>
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Password change form */}
              {activeSection === "password" && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-xl p-6 max-w-md w-full">
                    <h3 className="text-xl font-medium mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-slate-600 mb-1">Current Password</label>
                        <Input
                          name="currentPassword"
                          type="password"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-slate-600 mb-1">New Password</label>
                        <Input
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-slate-600 mb-1">Confirm New Password</label>
                        <Input
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>
                      
                      <div className="flex space-x-3 pt-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setActiveSection(null)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={handleChangePassword}
                          disabled={!formData.currentPassword || !formData.newPassword || formData.newPassword !== formData.confirmPassword}
                        >
                          {isSaving ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Changing...
                            </>
                          ) : "Change Password"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* My Ads - Updated to use the real data from API */}
          {sidebarActive === "ads" && (
            <div>
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-medium">My Ads</h2>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => router.push("/sell/new")}
                >
                  Post New Ad
                </Button>
              </div>
              
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-200">
                {isAdsLoading ? (
                  <div className="p-8 flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  </div>
                ) : (Array.isArray(userAds) && userAds.length === 0) || (!Array.isArray(userAds) && userAds.ads && userAds.ads.length === 0) ? (
                  <div className="p-8 text-center">
                    <Car className="h-12 w-12 mx-auto text-slate-300 mb-3" />
                    <p className="text-slate-500 mb-4">You haven't posted any ads yet</p>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => router.push("/sell/new")}
                    >
                      Post Your First Ad
                    </Button>
                  </div>
                ) : (
                  (Array.isArray(userAds) ? userAds : userAds.ads).map((ad: UserAd) => (
                    <div key={ad.id} className="p-4 flex items-center">
                      <div className="h-16 w-16 flex-shrink-0 mr-4 bg-slate-100 rounded overflow-hidden">
                        {getAdImage(ad) ? (
                          <img 
                            src={getAdImage(ad)} 
                            alt={ad.title} 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Car className="h-8 w-8 text-slate-400" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div 
                          className="font-medium text-slate-800 hover:text-blue-600 cursor-pointer"
                          onClick={() => router.push(`/ad/${ad.id}`)}
                        >
                          {ad.title}
                        </div>
                        <div className="text-sm text-blue-600">Rs {formatPrice(ad.price)}</div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
                          <span>{ad.location || "No location"}</span>
                          <span>•</span>
                          <span>{formatDate(ad.createdAt)}</span>
                          <span>•</span>
                          <span>{ad.views || 0} views</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-slate-500 hover:text-blue-600"
                          onClick={() => router.push(`/ad/${ad.id}/edit`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-slate-500 hover:text-red-600"
                          onClick={() => handleDeleteAd(ad.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}