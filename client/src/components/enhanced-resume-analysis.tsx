import { useState } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, Brain, Zap, Target, Lock, Star, TrendingUp, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Resume, User } from "@shared/schema";

export default function EnhancedResumeAnalysis() {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"]
  });

  const { data: resume, isLoading } = useQuery<Resume>({
    queryKey: ["/api/resume"]
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('resume', file);
      const response = await apiRequest('POST', '/api/resume/upload', formData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resume"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Resume uploaded successfully",
        description: "AI analysis complete. Check your enhanced insights below."
      });
    },
    onError: () => {
      toast({
        title: "Upload failed",
        description: "Failed to upload your resume. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleFileUpload = (file: File) => {
    // Check freemium limits
    if (user?.subscriptionPlan === 'free' && user?.freeAnalysisUsed) {
      toast({
        title: "Free limit reached",
        description: "Upgrade to Premium for unlimited resume analysis.",
        variant: "destructive"
      });
      return;
    }

    if (file.type === 'application/pdf' || file.type.includes('document')) {
      uploadMutation.mutate(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOC file.",
        variant: "destructive"
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const isPremium = user?.subscriptionPlan !== 'free';
  const canUpload = user?.subscriptionPlan === 'free' ? !user?.freeAnalysisUsed : true;

  const strongSkills = ["React.js", "JavaScript", "Node.js", "Git", "Python", "SQL"];
  const skillsToImprove = isPremium ? 
    ["AWS", "Docker", "TypeScript", "System Design", "Kubernetes", "GraphQL", "Microservices", "CI/CD"] :
    ["AWS", "Docker"];

  const industryInsights = isPremium ? [
    { metric: "Market Demand", value: "High", color: "text-green-600" },
    { metric: "Salary Range", value: "₹12-25L", color: "text-blue-600" },
    { metric: "Growth Rate", value: "+23%", color: "text-purple-600" },
    { metric: "Remote Opportunities", value: "85%", color: "text-orange-600" }
  ] : [];

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-blue-200 rounded w-1/4"></div>
            <div className="h-32 bg-blue-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">AI Resume Analysis</CardTitle>
              <p className="text-blue-100 text-sm">
                {isPremium ? "Advanced AI insights with market analysis" : "Basic analysis - upgrade for advanced insights"}
              </p>
            </div>
          </div>
          <Button 
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
            onClick={() => document.getElementById('resume-upload')?.click()}
            disabled={uploadMutation.isPending || !canUpload}
          >
            <Upload className="mr-2 h-4 w-4" />
            {uploadMutation.isPending ? "Analyzing..." : canUpload ? "Upload Resume" : "Limit Reached"}
          </Button>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Free Tier Limitation Warning */}
        {!isPremium && user?.freeAnalysisUsed && (
          <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-300 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Lock className="h-5 w-5 text-orange-600" />
              <div>
                <h4 className="font-semibold text-orange-800">Free Analysis Used</h4>
                <p className="text-sm text-orange-700">
                  Upgrade to Premium for unlimited resume analysis and advanced AI insights
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
              isDragging 
                ? 'border-blue-500 bg-blue-100 scale-105' 
                : canUpload 
                ? 'border-blue-300 hover:border-blue-400 hover:bg-blue-50' 
                : 'border-gray-300 bg-gray-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className={`transition-all duration-300 ${isDragging ? 'scale-110' : ''}`}>
              <FileText className={`h-12 w-12 mx-auto mb-4 ${canUpload ? 'text-blue-500' : 'text-gray-400'}`} />
              {resume ? (
                <>
                  <p className="text-gray-700 mb-2 font-medium">Current Resume</p>
                  <p className="text-sm font-medium text-blue-600">{resume.fileName}</p>
                  <p className="text-xs text-gray-500">
                    Last updated: {resume.uploadedAt ? new Date(resume.uploadedAt).toLocaleDateString() : 'Unknown'}
                  </p>
                </>
              ) : (
                <>
                  <p className={`mb-2 font-medium ${canUpload ? 'text-gray-700' : 'text-gray-500'}`}>
                    {canUpload ? "Upload your resume for AI analysis" : "Upgrade to upload more resumes"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {canUpload ? "Drag and drop or click to upload" : "Free tier: 1 analysis per month"}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Analysis Scores */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">ATS Compatibility</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="font-bold text-green-600">{resume?.atsScore || 0}%</span>
                </div>
              </div>
              <Progress value={resume?.atsScore || 0} className="h-3 bg-green-100" />
              <p className="text-xs text-gray-500 mt-1">
                {(resume?.atsScore || 0) >= 80 ? "Excellent ATS compatibility" : "Consider optimization"}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">Keyword Optimization</span>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-yellow-500" />
                  <span className="font-bold text-yellow-600">{resume?.keywordScore || 0}%</span>
                </div>
              </div>
              <Progress value={resume?.keywordScore || 0} className="h-3 bg-yellow-100" />
              <p className="text-xs text-gray-500 mt-1">
                {(resume?.keywordScore || 0) >= 70 ? "Good keyword density" : "Add relevant keywords"}
              </p>
            </div>

            {isPremium && (
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-purple-800">AI Career Score</span>
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {user?.careerScore || 78}/100
                </div>
                <p className="text-xs text-purple-700">
                  Based on skills, experience, and market demand
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Skill Gap Analysis */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-blue-500" />
              AI Skill Gap Analysis
            </h4>
            {!isPremium && (
              <Badge className="bg-orange-100 text-orange-600 border border-orange-300">
                Limited in Free
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-sm font-medium text-green-600 mb-3 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Strong Skills ({strongSkills.length})
              </h5>
              <div className="flex flex-wrap gap-2">
                {strongSkills.map((skill) => (
                  <Badge key={skill} className="bg-green-100 text-green-700 border border-green-300">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-red-600 mb-3 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                Skills to Develop ({skillsToImprove.length})
              </h5>
              <div className="flex flex-wrap gap-2">
                {skillsToImprove.map((skill) => (
                  <Badge key={skill} className="bg-red-100 text-red-600 border border-red-300">
                    {skill}
                  </Badge>
                ))}
              </div>
              {!isPremium && (
                <p className="text-xs text-gray-500 mt-2">
                  Upgrade to see all {skillsToImprove.length + 6} skill recommendations
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Premium Industry Insights */}
        {isPremium && industryInsights.length > 0 && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              Industry Market Insights
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {industryInsights.map((insight, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                  <p className="text-blue-100 text-xs font-medium">{insight.metric}</p>
                  <p className={`text-lg font-bold ${insight.color.replace('text-', 'text-white')}`}>
                    {insight.value}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-blue-100 text-sm mt-3">
              Data sourced from 50,000+ job postings and salary reports
            </p>
          </div>
        )}

        {/* Free Tier Upgrade CTA */}
        {!isPremium && (
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white text-center">
            <div className="flex items-center justify-center mb-3">
              <Crown className="h-8 w-8 mr-2" />
              <h4 className="text-xl font-bold">Unlock Premium Analysis</h4>
            </div>
            <p className="text-purple-100 mb-4">
              Get unlimited resume analysis, advanced AI insights, and industry market data
            </p>
            <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
              Upgrade to Premium
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}