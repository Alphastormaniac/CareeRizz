import { TrendingUp, GraduationCap, Trophy, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { User } from "@shared/schema";

interface StatsOverviewProps {
  user: User;
}

export default function StatsOverview({ user }: StatsOverviewProps) {
  const stats = [
    {
      title: "Career Score",
      value: `${user.careerScore}/100`,
      icon: TrendingUp,
      color: "linkedin-blue",
      bgColor: "bg-blue-50"
    },
    {
      title: "Courses Completed",
      value: user.coursesCompleted?.toString() || "0",
      icon: GraduationCap,
      color: "success-green",
      bgColor: "bg-green-50"
    },
    {
      title: "Skills Badges",
      value: user.badges?.toString() || "0",
      icon: Trophy,
      color: "achievement-gold",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Mentor Sessions",
      value: user.mentorSessions?.toString() || "0",
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white border border-gray-100">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                <stat.icon className={`${stat.color} h-6 w-6`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-dark">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
