
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Bell,
  Settings,
  LogOut,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const { user, logout } = useAuth();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-full bg-gradient-to-r from-app-blue to-app-green transform transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <span className="text-xl font-bold gradient-text">Sahaay</span>
        </Link>

        <div className="ml-4 hidden md:flex flex-1 max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search issues..." 
              className="w-full pl-9 bg-gray-50 border-gray-200 focus:border-app-blue" 
            />
          </div>
        </div>
        
        <div className="ml-auto flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-all">
                <Bell className="h-5 w-5" />
              </button>
              
              <div className="border-l h-6 border-gray-200 mx-1"></div>
              
              <div className="flex items-center gap-2 group">
                <Avatar className="border-2 border-primary/10 shadow-md group-hover:shadow-lg transition-all h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-app-blue to-app-green text-white text-xs">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden md:block">{user.name}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="hover:bg-primary/5">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="bg-gradient-to-r from-app-blue to-app-green hover:shadow-md transition-all duration-200">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
