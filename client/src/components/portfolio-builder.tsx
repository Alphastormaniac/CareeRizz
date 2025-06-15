import { Plus, ExternalLink, Github, Medal, Shield, Star, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { Project, SkillBadge } from "@shared/schema";

export default function PortfolioBuilder() {
  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"]
  });

  const { data: badges, isLoading: badgesLoading } = useQuery<SkillBadge[]>({
    queryKey: ["/api/badges"]
  });

  if (projectsLoading || badgesLoading) {
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

  const getBadgeIcon = (badgeType: string) => {
    switch (badgeType) {
      case 'technical':
        return Medal;
      case 'tool':
        return Shield;
      default:
        return Star;
    }
  };

  const getBadgeColor = (badgeType: string) => {
    switch (badgeType) {
      case 'technical':
        return 'bg-yellow-100 text-yellow-600';
      case 'tool':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-purple-100 text-purple-600';
    }
  };

  return (
    <Card className="bg-white border border-gray-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-dark">Portfolio Builder</CardTitle>
          <Button className="bg-linkedin-blue hover:bg-blue-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Projects */}
          {projects?.map((project) => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-dark">{project.title}</h4>
                <Badge className="bg-success-green text-white">
                  {project.status === 'live' ? 'Live' : 'Draft'}
                </Badge>
              </div>
              {project.imageUrl && (
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-24 object-cover rounded mb-3"
                />
              )}
              <p className="text-gray-600 text-sm mb-3">{project.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {project.technologies?.slice(0, 2).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  {project.liveUrl && (
                    <Button variant="ghost" size="sm" className="linkedin-blue">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      <Github className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Virtual Sandbox */}
          <div className="border-2 border-dashed border-blue-500 rounded-lg p-4 bg-blue-50">
            <div className="text-center">
              <Code className="h-12 w-12 linkedin-blue mx-auto mb-3" />
              <h4 className="font-semibold text-dark mb-2">Virtual Project Sandbox</h4>
              <p className="text-gray-600 text-sm mb-4">Practice new skills in a live coding environment</p>
              <Button className="bg-linkedin-blue hover:bg-blue-700 text-white">
                Start Coding
              </Button>
            </div>
          </div>
        </div>

        {/* Skill Badges */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-medium text-dark mb-4">Earned Badges</h4>
          <div className="flex flex-wrap gap-3">
            {badges?.map((badge) => {
              const IconComponent = getBadgeIcon(badge.badgeType);
              const colorClass = getBadgeColor(badge.badgeType);
              
              return (
                <div key={badge.id} className={`flex items-center px-3 py-2 rounded-lg ${colorClass}`}>
                  <IconComponent className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">{badge.badgeName}</span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
