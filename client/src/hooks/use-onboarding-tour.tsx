import { useState, useEffect } from "react";

interface TourStep {
  id: string;
  targetId: string;
  title: string;
  description: string;
  position: "top" | "bottom" | "left" | "right";
}

const tourSteps: TourStep[] = [
  {
    id: "stats",
    targetId: "stats-overview",
    title: "Your Career Dashboard",
    description: "Track your career score, skills progress, and achievement milestones here.",
    position: "bottom"
  },
  {
    id: "resume",
    targetId: "resume-analysis",
    title: "Resume Analysis",
    description: "Upload your resume to get AI-powered insights and ATS compatibility scoring.",
    position: "top"
  },
  {
    id: "learning",
    targetId: "learning-pathway",
    title: "Personalized Learning",
    description: "Discover skill gaps and get recommended courses tailored to your career goals.",
    position: "top"
  },
  {
    id: "mentorship",
    targetId: "mentorship-section",
    title: "Expert Mentorship",
    description: "Connect with industry professionals for 1-on-1 guidance and career advice.",
    position: "left"
  },
  {
    id: "portfolio",
    targetId: "portfolio-builder",
    title: "Portfolio Builder",
    description: "Showcase your projects and earn skill badges to demonstrate your expertise.",
    position: "top"
  }
];

export function useOnboardingTour() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const startTour = () => {
    setIsActive(true);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      endTour();
    }
  };

  const endTour = () => {
    setIsActive(false);
    setCurrentStep(0);
  };

  const getCurrentStep = () => {
    return tourSteps[currentStep];
  };

  return {
    isActive,
    currentStep: currentStep + 1,
    totalSteps: tourSteps.length,
    currentStepData: getCurrentStep(),
    startTour,
    nextStep,
    endTour
  };
}