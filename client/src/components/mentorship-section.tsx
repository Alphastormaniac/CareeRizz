import { Star, Calendar, Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import type { Mentor } from "@shared/schema";

export default function MentorshipSection() {
  const { data: mentors, isLoading } = useQuery<Mentor[]>({
    queryKey: ["/api/mentors"]
  });

  if (isLoading) {
    return (
      <Card className="bg-white border border-gray-100">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="space-y-4">
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const upcomingSession = {
    title: "System Design Review",
    date: "Tomorrow, 3:00 PM",
    mentorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  };

  return (
    <Card className="bg-white border border-gray-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-dark">Top Mentors</CardTitle>
          <Button variant="ghost" className="linkedin-blue">Browse All</Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {mentors?.map((mentor) => (
          <div key={mentor.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Avatar>
                <AvatarImage src={mentor.profilePicture || ""} alt={mentor.name} />
                <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold text-dark">{mentor.name}</h4>
                <p className="text-gray-600 text-sm">{mentor.title}</p>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-500 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm ml-2">({mentor.rating})</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="linkedin-blue font-medium">₹{mentor.hourlyRate}/hour</span>
                  <Button size="sm" className="bg-linkedin-blue hover:bg-blue-700 text-white">
                    <Calendar className="h-3 w-3 mr-1" />
                    Book Session
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Upcoming Sessions */}
        <div className="bg-blue-50 border border-blue-500 rounded-lg p-4">
          <h4 className="font-semibold text-dark mb-2">Upcoming Session</h4>
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={upcomingSession.mentorImage} alt="Mentor" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-dark">{upcomingSession.title}</p>
              <p className="text-xs text-gray-600">{upcomingSession.date}</p>
            </div>
            <Button size="sm" variant="ghost" className="linkedin-blue">
              <Video className="h-3 w-3 mr-1" />
              Join
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
