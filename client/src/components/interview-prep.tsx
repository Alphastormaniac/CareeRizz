import { Bot, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";

interface InterviewPerformance {
  technicalScore: number;
  communicationScore: number;
  problemSolvingScore: number;
}

export default function InterviewPrep() {
  const { data: performance, isLoading } = useQuery<InterviewPerformance>({
    queryKey: ["/api/interview/performance"]
  });

  if (isLoading) {
    return (
      <Card className="bg-white border border-gray-100">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const practiceAreas = ["Data Structures", "System Design", "Behavioral", "Coding"];

  const performanceMetrics = [
    {
      label: "Technical Questions",
      score: performance?.technicalScore || 80,
      color: "bg-success-green"
    },
    {
      label: "Communication",
      score: performance?.communicationScore || 75,
      color: "bg-achievement-gold"
    },
    {
      label: "Problem Solving", 
      score: performance?.problemSolvingScore || 85,
      color: "bg-success-green"
    }
  ];

  return (
    <Card className="bg-white border border-gray-100">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-dark">Interview Preparation</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* AI Mock Interview */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-dark">AI Mock Interview</h4>
            <Badge className="bg-purple-100 text-purple-600">New</Badge>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Practice with AI-powered interviews tailored to your target role
          </p>
          <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
            <Bot className="mr-2 h-4 w-4" />
            Start AI Interview
          </Button>
        </div>

        {/* Recent Performance */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-dark mb-3 flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Recent Performance
          </h4>
          <div className="space-y-3">
            {performanceMetrics.map((metric) => (
              <div key={metric.label} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{metric.label}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${metric.color} h-2 rounded-full`}
                      style={{ width: `${metric.score}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm font-medium ${
                    metric.score >= 80 ? 'success-green' : 'achievement-gold'
                  }`}>
                    {metric.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Areas */}
        <div className="space-y-2">
          <h4 className="font-semibold text-dark">Practice Areas</h4>
          <div className="flex flex-wrap gap-2">
            {practiceAreas.map((area) => (
              <Button
                key={area}
                variant="outline"
                size="sm"
                className="text-gray-700 hover:bg-linkedin-blue hover:text-white hover:border-blue-500 transition-colors"
              >
                {area}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
