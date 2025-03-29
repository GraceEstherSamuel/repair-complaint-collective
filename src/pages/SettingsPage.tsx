
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  User, 
  Upload, 
  Users, 
  Calendar, 
  Moon, 
  Sun, 
  AlertTriangle, 
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const SettingsPage = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.name || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(user?.avatar || null);
  const [gender, setGender] = useState<string>("male");
  const [age, setAge] = useState<number>(30);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  
  // Total number of complaints (mock data)
  const totalComplaints = 8;
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleUsernameUpdate = () => {
    setIsSaving(true);
    setTimeout(() => {
      toast.success("Username updated successfully!");
      setIsSaving(false);
    }, 1000);
  };
  
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value < 120) {
      setAge(value);
    }
  };
  
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    toast.success(`${darkMode ? "Light" : "Dark"} mode activated!`);
    // In a real implementation, this would toggle the theme
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">Manage your personal information and preferences</p>
      </div>
      
      <Accordion type="single" collapsible className="space-y-4">
        {/* Username Section */}
        <AccordionItem value="username" className="border bg-card rounded-lg overflow-hidden shadow-sm">
          <AccordionTrigger className="px-4 py-3 hover:bg-muted/30 [&[data-state=open]>svg]:rotate-180">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-4 h-4 text-app-blue" />
              </div>
              <span>Change Username</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="flex gap-2">
                  <Input 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Enter your username"
                  />
                  <Button 
                    onClick={handleUsernameUpdate} 
                    disabled={!username || username === user?.name || isSaving}
                  >
                    {isSaving ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Saving
                      </>
                    ) : (
                      "Update"
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  This is the name that will be displayed to other users
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Profile Photo Section */}
        <AccordionItem value="photo" className="border bg-card rounded-lg overflow-hidden shadow-sm">
          <AccordionTrigger className="px-4 py-3 hover:bg-muted/30 [&[data-state=open]>svg]:rotate-180">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Upload className="w-4 h-4 text-app-green" />
              </div>
              <span>Change Profile Photo</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-muted">
                    <AvatarImage src={previewUrl || undefined} />
                    <AvatarFallback className="text-xl bg-gradient-to-br from-app-blue to-app-green text-white">
                      {user?.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {previewUrl && (
                    <button 
                      onClick={() => setPreviewUrl(null)} 
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                
                <div className="flex-1 space-y-3">
                  <Label htmlFor="profile-photo" className="block">
                    Upload a new photo
                  </Label>
                  <Input 
                    id="profile-photo" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-muted-foreground">
                    Recommended: Square image, at least 300x300 pixels
                  </p>
                </div>
              </div>
              
              {previewUrl && selectedFile && (
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setPreviewUrl(null)}>
                    Cancel
                  </Button>
                  <Button onClick={() => toast.success("Profile photo updated successfully!")}>
                    Save Photo
                  </Button>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Gender Section */}
        <AccordionItem value="gender" className="border bg-card rounded-lg overflow-hidden shadow-sm">
          <AccordionTrigger className="px-4 py-3 hover:bg-muted/30 [&[data-state=open]>svg]:rotate-180">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-500" />
              </div>
              <span>Change Gender</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => toast.success("Gender updated successfully!")}>
                  Save
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Age Section */}
        <AccordionItem value="age" className="border bg-card rounded-lg overflow-hidden shadow-sm">
          <AccordionTrigger className="px-4 py-3 hover:bg-muted/30 [&[data-state=open]>svg]:rotate-180">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-app-orange" />
              </div>
              <span>Change Age</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <div className="flex gap-2">
                  <Input 
                    id="age" 
                    type="number" 
                    value={age} 
                    onChange={handleAgeChange} 
                    min="1"
                    max="120"
                  />
                  <Button onClick={() => toast.success("Age updated successfully!")}>
                    Save
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your age is only visible to you and administrators
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Appearance Mode Section */}
        <AccordionItem value="appearance" className="border bg-card rounded-lg overflow-hidden shadow-sm">
          <AccordionTrigger className="px-4 py-3 hover:bg-muted/30 [&[data-state=open]>svg]:rotate-180">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                {darkMode ? (
                  <Moon className="w-4 h-4 text-blue-600" />
                ) : (
                  <Sun className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <span>Switch Appearance Mode</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark mode
                </p>
              </div>
              <Switch 
                checked={darkMode} 
                onCheckedChange={handleDarkModeToggle} 
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Complaints Summary Section */}
        <AccordionItem value="complaints" className="border bg-card rounded-lg overflow-hidden shadow-sm">
          <AccordionTrigger className="px-4 py-3 hover:bg-muted/30 [&[data-state=open]>svg]:rotate-180">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </div>
              <span>Complaints Summary</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">Total Complaints</h3>
                    <p className="text-sm text-muted-foreground">All issues you've reported</p>
                  </div>
                  <div className="text-2xl font-bold">{totalComplaints}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg bg-white">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                        <span className="text-yellow-600 text-sm font-medium">5</span>
                      </div>
                      <span className="text-sm">Pending</span>
                    </div>
                    <span className="text-xs text-gray-400">62.5%</span>
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg bg-white">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm">Resolved</span>
                    </div>
                    <span className="text-xs text-gray-400">37.5%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button variant="outline" asChild>
                  <Link to="/community-issues" className="flex items-center gap-2">
                    <span>View All Complaints</span>
                  </Link>
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

// Importing Link
import { Link } from 'react-router-dom';

export default SettingsPage;
