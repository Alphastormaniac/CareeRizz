import { useState } from "react";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Resume } from "@shared/schema";

export default function ResumeAnalysis() {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
      toast({
        title: "Resume uploaded successfully",
        description: "Your resume has been analyzed and processed."
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

  const strongSkills = ["React.js", "JavaScript", "Node.js", "Git"];
  const skillsToImprove = ["AWS", "Docker", "TypeScript", "System Design"];

  if (isLoading) {
    return (
      <Card className="bg-white border border-gray-100">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-gray-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-dark">AI Resume Analysis</CardTitle>
          <Button 
            className="bg-linkedin-blue hover:bg-blue-700 text-white"
            onClick={() => document.getElementById('resume-upload')?.click()}
            disabled={uploadMutation.isPending}
          >
            <Upload className="mr-2 h-4 w-4" />
            {uploadMutation.isPending ? "Uploading..." : "Update Resume"}
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
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            {resume ? (
              <>
                <p className="text-gray-600 mb-2">Current Resume</p>
                <p className="text-sm font-medium linkedin-blue">{resume.fileName}</p>
                <p className="text-xs text-gray-500">
                  Last updated: {new Date(resume.uploadedAt).toLocaleDateString()}
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-600 mb-2">No resume uploaded</p>
                <p className="text-sm text-gray-500">Drag and drop or click to upload</p>
              </>
            )}
          </div>

          {/* Analysis Scores */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">ATS Compatibility</span>
                <span className="font-medium success-green">{resume?.atsScore || 0}%</span>
              </div>
              <Progress value={resume?.atsScore || 0} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Keyword Optimization</span>
                <span className="font-medium achievement-gold">{resume?.keywordScore || 0}%</span>
              </div>
              <Progress value={resume?.keywordScore || 0} className="h-2" />
            </div>
          </div>
        </div>

        {/* Skill Gap Analysis */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-medium text-dark mb-4">Skill Gap Analysis for Software Engineer Roles</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm font-medium success-green mb-2 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Strong Skills
              </h5>
              <div className="flex flex-wrap gap-2">
                {strongSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-green-50 text-green-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-sm font-medium text-red-600 mb-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                Skills to Develop
              </h5>
              <div className="flex flex-wrap gap-2">
                {skillsToImprove.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-red-50 text-red-600">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
