import { useState, useEffect } from "react";
import { X, ArrowRight, ArrowLeft, Upload, Target, Users, Briefcase, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { motion, AnimatePresence } from "framer-motion";

interface OnboardingFlowProps {
  isOpen: boolean;
  onComplete: () => void;
}

const steps = [
  {
    id: 1,
    title: "Welcome to CareeRizz!",
    description: "Let's set up your profile to provide personalized career insights",
    icon: Target,
    component: "welcome"
  },
  {
    id: 2,
    title: "Tell us about yourself",
    description: "Help us understand your career goals and current situation",
    icon: Users,
    component: "profile"
  },
  {
    id: 3,
    title: "Upload your resume",
    description: "Get instant AI-powered analysis and ATS scoring",
    icon: Upload,
    component: "resume"
  },
  {
    id: 4,
    title: "Explore features",
    description: "Discover how CareeRizz can accelerate your career growth",
    icon: Briefcase,
    component: "features"
  },
  {
    id: 5,
    title: "You're all set!",
    description: "Start your journey with personalized recommendations",
    icon: CheckCircle,
    component: "complete"
  }
];

export default function OnboardingFlow({ isOpen, onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    currentRole: "",
    experience: "",
    careerGoal: "",
    skills: [] as string[]
  });
  const { user } = useAuth();

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    const step = steps.find(s => s.id === currentStep);
    
    switch (step?.component) {
      case "welcome":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
              <Target className="h-12 w-12 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Welcome to CareeRizz, {user?.fullName?.split(' ')[0]}!
              </h2>
              <p className="text-muted-foreground">
                We're excited to help you accelerate your career with AI-powered insights and personalized recommendations.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-primary/10 rounded-lg">
                <Upload className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Resume Analysis</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Learning Paths</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Expert Mentorship</p>
              </div>
            </div>
          </motion.div>
        );

      case "profile":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentRole">Current Role</Label>
                <Input
                  id="currentRole"
                  placeholder="e.g., Software Engineer, Product Manager"
                  value={profileData.currentRole}
                  onChange={(e) => setProfileData({...profileData, currentRole: e.target.value})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  placeholder="e.g., 3-5 years"
                  value={profileData.experience}
                  onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="careerGoal">Career Goal</Label>
                <Input
                  id="careerGoal"
                  placeholder="e.g., Senior Developer, Team Lead"
                  value={profileData.careerGoal}
                  onChange={(e) => setProfileData({...profileData, careerGoal: e.target.value})}
                  className="mt-1"
                />
              </div>
            </div>
          </motion.div>
        );

      case "resume":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
              <p className="text-muted-foreground mb-4">
                Get instant AI analysis and ATS compatibility scoring
              </p>
              <Button variant="outline" className="mx-auto">
                Choose File
              </Button>
            </div>
            
            <div className="bg-primary/10 p-4 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">What you'll get:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  ATS compatibility score
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  Skill gap analysis
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  Improvement suggestions
                </li>
              </ul>
            </div>
          </motion.div>
        );

      case "features":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Target className="h-5 w-5 text-primary mr-2" />
                    Learning Paths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Personalized skill development roadmaps based on your career goals
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Users className="h-5 w-5 text-primary mr-2" />
                    Expert Mentorship
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Connect with industry professionals for 1-on-1 guidance
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Briefcase className="h-5 w-5 text-primary mr-2" />
                    Portfolio Builder
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Showcase your projects and earn skill badges
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    Interview Prep
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Practice with AI-powered mock interviews and feedback
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        );

      case "complete":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                You're All Set!
              </h2>
              <p className="text-muted-foreground">
                Your CareeRizz journey begins now. Start exploring personalized recommendations on your dashboard.
              </p>
            </div>
            <div className="flex justify-center space-x-2">
              <Badge variant="secondary">Resume Analysis Ready</Badge>
              <Badge variant="secondary">Profile Complete</Badge>
              <Badge variant="secondary">Features Unlocked</Badge>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-background rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      step.id === currentStep
                        ? "bg-primary"
                        : step.id < currentStep
                        ? "bg-primary/60"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {steps.length}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onComplete}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="mb-8">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              className="flex items-center bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              {currentStep === steps.length ? "Get Started" : "Next"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}