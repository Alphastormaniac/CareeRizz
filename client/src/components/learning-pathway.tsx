import { Star, Clock, CheckCircle, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import type { Course } from "@shared/schema";

export default function LearningPathway() {
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses/recommended"]
  });

  if (isLoading) {
    return (
      <Card className="bg-white border border-gray-100">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progressActivities = [
    {
      title: 'Completed "Docker Basics" module',
      timestamp: "2 days ago",
      type: "completed"
    },
    {
      title: 'Started "Container Orchestration"',
      timestamp: "1 day ago",
      type: "started"
    }
  ];

  return (
    <Card className="bg-white border border-gray-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-dark">Personalized Learning Pathway</CardTitle>
          <Button variant="ghost" className="linkedin-blue">View All</Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses?.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <img 
                src={course.imageUrl || ""} 
                alt={course.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-linkedin-blue text-white">Recommended</Badge>
                  <div className="flex items-center text-achievement-gold text-sm">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    {course.rating}
                  </div>
                </div>
                <h4 className="font-semibold text-dark mb-2">{course.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <span className="linkedin-blue font-medium">₹{course.price}</span>
                </div>
                {course.id === 2 && (
                  <>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div className="bg-success-green h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500">65% complete</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Learning Progress */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-medium text-dark mb-4">This Week's Progress</h4>
          <div className="space-y-3">
            {progressActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'completed' ? 'bg-success-green' : 'bg-linkedin-blue'
                  }`}>
                    {activity.type === 'completed' ? (
                      <CheckCircle className="h-4 w-4 text-white" />
                    ) : (
                      <Play className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <span className="text-sm text-dark">{activity.title}</span>
                </div>
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
