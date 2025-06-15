import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@shared/schema";

interface NavigationHeaderProps {
  user: User;
}

export default function NavigationHeader({ user }: NavigationHeaderProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold linkedin-blue">CareerAI India</h1>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <a href="#" className="linkedin-blue border-b-2 border-blue-500 px-3 py-2 text-sm font-medium">
                  Dashboard
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium">
                  Skills
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium">
                  Courses
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium">
                  Mentors
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium">
                  Portfolio
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </Button>
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={user.profilePicture || ""} alt={`${user.firstName} ${user.lastName}`} />
                <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-dark">
                {user.firstName} {user.lastName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
