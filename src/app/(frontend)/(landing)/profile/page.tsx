"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, ChevronRight, CheckCircle, Car, MapPin, Calendar, DollarSign, Eye } from "lucide-react";

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
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
  });
  
  // Simulate fetching user profile
  useEffect(() => {
    const fetchUserProfile = () => {
      setIsLoading(true);
      
      // Try to get user data from localStorage
      const userData = localStorage.getItem('userData');
      
      setTimeout(() => {
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setFormData({
            name: parsedUser.name || "",
          });
        } else {
          // Mock data
          const mockUser: UserProfile = {
            id: "user-123",
            name: "John Doe",
            email: "john.doe@example.com",
          };
          setUser(mockUser);
          setFormData({
            name: mockUser.name || "",
          });
          localStorage.setItem('userData', JSON.stringify(mockUser));
        }
        
        // Mock user ads
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
          },
          {
            id: "ad3",
            title: "Suzuki Swift 2017",
            price: 3200000,
            location: "Galle",
            createdAt: "2023-06-01",
            views: 256
          }
        ]);
        
        setIsLoading(false);
      }, 600);
    };
    
    fetchUserProfile();
  }, []);
  
  // Handle field change
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  // Handle save
  const handleSave = (field: string) => {
    setIsSaving(true);
    setTimeout(() => {
      if (user) {
        const updatedUser = {
          ...user,
          [field]: formData[field as keyof typeof formData]
        };
        setUser(updatedUser);
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        setIsEditing(null);
        
        // Show success indicator briefly
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }
      setIsSaving(false);
    }, 500);
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
  
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      {/* Success indicator */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-50 text-green-700 px-4 py-2 rounded-md flex items-center shadow-md border border-green-100 z-50">
          <CheckCircle className="h-5 w-5 mr-2" />
          Changes saved
        </div>
      )}
      
      {/* Header section */}
      <div className="flex items-center mb-8">
        <Avatar className="h-20 w-20 mr-6">
          <AvatarImage src={user.avatar || ""} alt={user.name} />
          <AvatarFallback className="bg-teal-700 text-white text-xl">
            {firstLetter}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-medium">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
      
      {/* Account Settings */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="px-4 py-3 bg-gray-50 border-b">
          <h2 className="font-medium text-gray-700">Account Information</h2>
        </div>
        
        {/* Name */}
        <div className="border-b">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="w-1/3 text-gray-500">Name</div>
            {isEditing === 'name' ? (
              <div className="flex-1 flex space-x-2">
                <Input
                  className="flex-1"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  autoFocus
                />
                <Button 
                  className="bg-teal-700 hover:bg-teal-800" 
                  size="sm"
                  disabled={isSaving}
                  onClick={() => handleSave('name')}
                >
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
                </Button>
              </div>
            ) : (
              <div className="flex-1 flex justify-between items-center" onClick={() => setIsEditing('name')}>
                <div className="text-gray-900">{user.name}</div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Email (non-editable) */}
        <div>
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="w-1/3 text-gray-500">Email</div>
            <div className="flex-1 text-gray-900">{user.email}</div>
          </div>
        </div>
      </div>
      
      {/* My Ads Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b flex justify-between items-center">
          <h2 className="font-medium text-gray-700">My Ads</h2>
          <Button 
            size="sm" 
            className="bg-teal-700 hover:bg-teal-800 text-sm"
            onClick={() => window.location.href = "/sell/new"}
          >
            Post New Ad
          </Button>
        </div>
        
        {userAds.length === 0 ? (
          <div className="p-8 text-center">
            <Car className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 mb-4">You haven't posted any ads yet.</p>
            <Button 
              className="bg-teal-700 hover:bg-teal-800"
              onClick={() => window.location.href = "/sell/new"}
            >
              Post Your First Ad
            </Button>
          </div>
        ) : (
          <div>
            {userAds.map((ad, index) => (
              <div 
                key={ad.id} 
                className={`p-4 flex items-center hover:bg-gray-50 cursor-pointer ${
                  index !== userAds.length - 1 ? 'border-b' : ''
                }`}
                onClick={() => window.location.href = `/ad/${ad.id}`}
              >
                <div className="w-20 h-20 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden mr-4">
                  {ad.image ? (
                    <img 
                      src={ad.image} 
                      alt={ad.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Car className="text-gray-400 h-8 w-8" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{ad.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <DollarSign className="h-3 w-3 mr-1" />
                      <span>Rs {formatPrice(ad.price)}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{ad.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{ad.createdAt}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      <span>{ad.views} views</span>
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-8 flex justify-center">
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
    </div>
  );
}