"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, ChevronRight, CheckCircle } from "lucide-react";

// Default user profile type
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  city?: string;
  address?: string;
  avatar?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    city: "",
    address: ""
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
            phoneNumber: parsedUser.phoneNumber || "",
            city: parsedUser.city || "",
            address: parsedUser.address || ""
          });
        } else {
          // Mock data
          const mockUser: UserProfile = {
            id: "user-123",
            name: "John Doe",
            email: "john.doe@example.com",
            phoneNumber: "+94777123456",
            city: "Colombo",
            address: "123 Main Street, Colombo 7"
          };
          setUser(mockUser);
          setFormData({
            name: mockUser.name || "",
            phoneNumber: mockUser.phoneNumber || "",
            city: mockUser.city || "",
            address: mockUser.address || ""
          });
          localStorage.setItem('userData', JSON.stringify(mockUser));
        }
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
    <div className="max-w-2xl mx-auto py-12 px-4">
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
      
      {/* Settings list */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b">
          <h2 className="font-medium text-gray-700">Personal Information</h2>
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
        <div className="border-b">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="w-1/3 text-gray-500">Email</div>
            <div className="flex-1 text-gray-900">{user.email}</div>
          </div>
        </div>
        
        {/* Phone */}
        <div className="border-b">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="w-1/3 text-gray-500">Phone</div>
            {isEditing === 'phoneNumber' ? (
              <div className="flex-1 flex space-x-2">
                <Input
                  className="flex-1"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  autoFocus
                />
                <Button 
                  className="bg-teal-700 hover:bg-teal-800" 
                  size="sm"
                  disabled={isSaving}
                  onClick={() => handleSave('phoneNumber')}
                >
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
                </Button>
              </div>
            ) : (
              <div className="flex-1 flex justify-between items-center" onClick={() => setIsEditing('phoneNumber')}>
                <div className="text-gray-900">{user.phoneNumber || 'Not provided'}</div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* City */}
        <div className="border-b">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="w-1/3 text-gray-500">City</div>
            {isEditing === 'city' ? (
              <div className="flex-1 flex space-x-2">
                <Input
                  className="flex-1"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  autoFocus
                />
                <Button 
                  className="bg-teal-700 hover:bg-teal-800" 
                  size="sm"
                  disabled={isSaving}
                  onClick={() => handleSave('city')}
                >
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
                </Button>
              </div>
            ) : (
              <div className="flex-1 flex justify-between items-center" onClick={() => setIsEditing('city')}>
                <div className="text-gray-900">{user.city || 'Not provided'}</div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Address */}
        <div>
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="w-1/3 text-gray-500">Address</div>
            {isEditing === 'address' ? (
              <div className="flex-1 flex space-x-2">
                <Input
                  className="flex-1"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  autoFocus
                />
                <Button 
                  className="bg-teal-700 hover:bg-teal-800" 
                  size="sm"
                  disabled={isSaving}
                  onClick={() => handleSave('address')}
                >
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
                </Button>
              </div>
            ) : (
              <div className="flex-1 flex justify-between items-center" onClick={() => setIsEditing('address')}>
                <div className="text-gray-900">{user.address || 'Not provided'}</div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <Button variant="outline" className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">
          Sign Out
        </Button>
      </div>
    </div>
  );
}