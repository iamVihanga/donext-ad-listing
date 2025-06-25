"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, ChevronRight, CheckCircle, Car, LogOut, Edit, Trash2, Shield, UserIcon, LockIcon, CreditCardIcon } from "lucide-react";

// Default user profile type
interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Ad type
interface UserAd {
  id: string;
  title: string;
  price: number;
  location: string;
  createdAt: string;
  image?: string;
  views: number;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [userAds, setUserAds] = useState<UserAd[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sidebarActive, setSidebarActive] = useState("personal");
  
  // Form data for profile edit
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  // Simulate fetching user profile (same as before)
  useEffect(() => {
    const fetchUserProfile = () => {
      setIsLoading(true);
      
      const userData = localStorage.getItem('userData');
      
      setTimeout(() => {
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setFormData({
            name: parsedUser.name || "",
            email: parsedUser.email || "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
          });
        } else {
          const mockUser: UserProfile = {
            id: "user-123",
            name: "John Doe",
            email: "john.doe@example.com",
          };
          setUser(mockUser);
          setFormData({
            name: mockUser.name || "",
            email: mockUser.email || "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
          });
          localStorage.setItem('userData', JSON.stringify(mockUser));
        }
        
        setUserAds([
          {
            id: "ad1",
            title: "Toyota Corolla 2018",
            price: 4500000,
            location: "Colombo",
            createdAt: "2023-06-15",
            views: 324,
            image: "https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?q=80&w=200&auto=format&fit=crop"
          },
          {
            id: "ad2",
            title: "Honda Civic 2019 Unregistered",
            price: 5600000,
            location: "Kandy",
            createdAt: "2023-05-20",
            views: 189,
            image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=200&auto=format&fit=crop"
          }
        ]);
        
        setIsLoading(false);
      }, 600);
    };
    
    fetchUserProfile();
  }, []);
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle profile update
  const handleUpdateProfile = () => {
    setIsSaving(true);
    
    setTimeout(() => {
      if (user) {
        const updatedUser = {
          ...user,
          name: formData.name
        };
        
        setUser(updatedUser);
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }
      
      setActiveSection(null);
      setIsSaving(false);
    }, 800);
  };
  
  // Handle password change
  const handleChangePassword = () => {
    setIsSaving(true);
    
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      
      setActiveSection(null);
      setIsSaving(false);
    }, 800);
  };
  
  // Format price to display with commas
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-teal-700" />
      </div>
    );
  }
  
  if (!user) return null;
  
  // First letter for avatar
  const firstLetter = user.name?.charAt(0).toUpperCase() || "U";
  
  function handleDeleteAd(id: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Success indicator */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-50 text-green-700 px-4 py-2 rounded-md flex items-center shadow-md border border-green-100 z-50">
          <CheckCircle className="h-5 w-5 mr-2" />
          Changes saved successfully!
        </div>
      )}
      
      {/* Header - Similar to Apple's */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-slate-800">Profile</h1>
        <Button 
          variant="outline" 
          className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
          onClick={() => {
            localStorage.removeItem('userData');
            window.location.href = "/login";
          }}
        >
          Sign Out
        </Button>
      </div>
      
      {/* Profile Summary with Avatar - Just like Apple */}
      <div className="flex flex-col md:flex-row items-center md:items-start mb-10">
        <Avatar className="h-24 w-24 md:mr-6 mb-4 md:mb-0">
          <AvatarImage src={user.avatar || ""} alt={user.name} />
          <AvatarFallback className="bg-slate-100 text-slate-600 text-xl font-medium">
            {firstLetter}
          </AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h2 className="text-xl font-medium text-slate-800">{user.name}</h2>
          <p className="text-slate-500">{user.email}</p>
        </div>
      </div>
      
      {/* Two-column layout like Apple */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left sidebar navigation */}
        <div className="md:w-1/4">
          <div className="space-y-1">
            <button
              className={`w-full text-left py-2 px-3 rounded ${
                sidebarActive === "personal" 
                  ? "bg-blue-50 text-blue-600 font-medium" 
                  : "text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() => setSidebarActive("personal")}
            >
              Personal Information
            </button>
            
            <button
              className={`w-full text-left py-2 px-3 rounded ${
                sidebarActive === "security" 
                  ? "bg-blue-50 text-blue-600 font-medium" 
                  : "text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() => setSidebarActive("security")}
            >
              Sign-In and Security
            </button>
            
            <button
              className={`w-full text-left py-2 px-3 rounded ${
                sidebarActive === "ads" 
                  ? "bg-blue-50 text-blue-600 font-medium" 
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
              <h2 className="text-2xl font-medium mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name & Email card */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <div className="p-5 border-b border-slate-200">
                    <h3 className="font-medium">Name & Email</h3>
                  </div>
                  
                  {activeSection === "name" ? (
                    <div className="p-5 space-y-4">
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
                    <div className="p-5 flex justify-between items-center" onClick={() => setActiveSection("name")}>
                      <div>
                        <div className="text-sm text-slate-500">Name</div>
                        <div className="font-medium mt-1">{user.name}</div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                      </Button>
                    </div>
                  )}
                  
                  <div className="px-5 py-4 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-slate-500">Email</div>
                        <div className="font-medium mt-1">{user.email}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Security Settings */}
          {sidebarActive === "security" && (
            <div>
              <h2 className="text-2xl font-medium mb-6">Sign-In and Security</h2>
              <p className="text-slate-600 mb-6">
                Manage settings related to signing in to your account, account security and how to recover your data
                when you are having trouble signing in.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password card */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <div className="p-5 border-b border-slate-200">
                    <h3 className="font-medium">Password</h3>
                  </div>
                  
                  {activeSection === "password" ? (
                    <div className="p-5 space-y-4">
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
                  ) : (
                    <div className="p-5 flex justify-between items-center" onClick={() => setActiveSection("password")}>
                      <div>
                        <div className="text-sm text-slate-500">Last updated</div>
                        <div className="font-medium mt-1">Not available</div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <ChevronRight className="h-5 w-5 text-slate-400" />
                      </Button>
                    </div>
                  )}
                </div>
                
                
              </div>
            </div>
          )}
          
          {/* My Ads */}
          {sidebarActive === "ads" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-medium">My Ads</h2>
                <Button 
                  className="bg-teal-700 hover:bg-teal-800"
                  onClick={() => window.location.href = "/sell/new"}
                >
                  Post New Ad
                </Button>
              </div>
              
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-200">
                {userAds.length === 0 ? (
                  <div className="p-8 text-center">
                    <Car className="h-12 w-12 mx-auto text-slate-300 mb-3" />
                    <p className="text-slate-500 mb-4">You haven't posted any ads yet</p>
                    <Button 
                      className="bg-teal-700 hover:bg-teal-800"
                      onClick={() => window.location.href = "/sell/new"}
                    >
                      Post Your First Ad
                    </Button>
                  </div>
                ) : (
                  userAds.map((ad) => (
                    <div key={ad.id} className="p-4 flex items-center">
                      <div className="h-16 w-16 flex-shrink-0 mr-4 bg-slate-100 rounded overflow-hidden">
                        {ad.image ? (
                          <img 
                            src={ad.image} 
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
                          className="font-medium text-slate-800 hover:text-teal-700 cursor-pointer"
                          onClick={() => window.location.href = `/ad/${ad.id}`}
                        >
                          {ad.title}
                        </div>
                        <div className="text-sm text-teal-700">Rs {formatPrice(ad.price)}</div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
                          <span>{ad.location}</span>
                          <span>•</span>
                          <span>{ad.createdAt}</span>
                          <span>•</span>
                          <span>{ad.views} views</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-slate-500 hover:text-teal-700"
                          onClick={() => window.location.href = `/ad/${ad.id}/edit`}
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