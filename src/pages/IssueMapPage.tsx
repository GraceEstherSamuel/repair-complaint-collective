
import { useState, useEffect } from "react";
import { 
  MapPin, 
  Locate, 
  Send, 
  AlertTriangle,
  Filter,
  Layers,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const IssueMapPage = () => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null);
  const [issueType, setIssueType] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // Mock function to simulate getting user location
  const getCurrentLocation = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Mock coordinates for demo
      setCoordinates({
        lat: 28.6139,
        lng: 77.2090
      });
      setIsLoading(false);
    }, 1000);
  };

  // Mock function to simulate address search
  const searchLocation = () => {
    if (!address) return;
    
    setIsLoading(true);
    setTimeout(() => {
      // Mock coordinates for demo
      setCoordinates({
        lat: 28.6139,
        lng: 77.2090
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Issue Map</h1>
          <p className="text-muted-foreground">Track and report issues in your area</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Layers
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => setIsLoading(true)}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-gray-100 rounded-xl overflow-hidden relative" style={{ height: "500px" }}>
          {/* This would be a real map implementation */}
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm">
              <MapPin className="mx-auto h-10 w-10 text-app-blue mb-4" />
              <h3 className="text-lg font-medium mb-2">Map Display</h3>
              <p className="text-sm text-gray-500">
                This would be integrated with a mapping service like Google Maps, Mapbox, or Leaflet
              </p>
              {coordinates && (
                <div className="mt-4 p-2 bg-app-blue/10 rounded-lg text-sm">
                  <p>Latitude: {coordinates.lat}</p>
                  <p>Longitude: {coordinates.lng}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button size="icon" className="bg-white shadow-md hover:bg-gray-100" aria-label="Zoom in">
              <span className="text-lg">+</span>
            </Button>
            <Button size="icon" className="bg-white shadow-md hover:bg-gray-100" aria-label="Zoom out">
              <span className="text-lg">-</span>
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-medium text-lg mb-3">Find Location</h3>
            <div className="space-y-3">
              <div className="relative">
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter address or landmark"
                  className="w-full pr-10"
                />
                <Button 
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full"
                  onClick={searchLocation}
                >
                  <Send className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2"
                  onClick={getCurrentLocation}
                  disabled={isLoading}
                >
                  <Locate className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Use my current location
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-medium text-lg mb-3">Report Issue</h3>
            <div className="space-y-3">
              <Select value={issueType} onValueChange={setIssueType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Issue Types</SelectItem>
                  <SelectItem value="water">Water Supply</SelectItem>
                  <SelectItem value="electricity">Electricity</SelectItem>
                  <SelectItem value="road">Road Damage</SelectItem>
                  <SelectItem value="garbage">Garbage Collection</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                disabled={!coordinates}
                className="w-full bg-gradient-to-r from-app-blue to-app-green hover:shadow-md transition-all duration-200"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report Issue at This Location
              </Button>
            </div>
          </div>
          
          <div className="bg-app-blue/5 p-4 rounded-xl border border-app-blue/10">
            <h3 className="font-medium text-sm mb-2 text-app-blue">Recent Reports</h3>
            <div className="space-y-2">
              <div className="bg-white p-2 rounded-lg flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-app-orange mt-0.5" />
                <div>
                  <p className="font-medium">Water logging</p>
                  <p className="text-xs text-gray-500">500m away • 2 hours ago</p>
                </div>
              </div>
              <div className="bg-white p-2 rounded-lg flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-app-green mt-0.5" />
                <div>
                  <p className="font-medium">Broken street light</p>
                  <p className="text-xs text-gray-500">1.2km away • 5 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueMapPage;
