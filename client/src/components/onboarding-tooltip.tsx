import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface OnboardingTooltipProps {
  targetId: string;
  title: string;
  description: string;
  position: "top" | "bottom" | "left" | "right";
  isVisible: boolean;
  onNext: () => void;
  onSkip: () => void;
  step: number;
  totalSteps: number;
}

export default function OnboardingTooltip({
  targetId,
  title,
  description,
  position,
  isVisible,
  onNext,
  onSkip,
  step,
  totalSteps
}: OnboardingTooltipProps) {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (isVisible) {
      const element = document.getElementById(targetId);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
      }
    }
  }, [targetId, isVisible]);

  const getTooltipPosition = () => {
    if (!targetRect) return { top: 0, left: 0 };

    const offset = 16;
    
    switch (position) {
      case "top":
        return {
          top: targetRect.top - offset,
          left: targetRect.left + targetRect.width / 2,
          transform: "translate(-50%, -100%)"
        };
      case "bottom":
        return {
          top: targetRect.bottom + offset,
          left: targetRect.left + targetRect.width / 2,
          transform: "translate(-50%, 0)"
        };
      case "left":
        return {
          top: targetRect.top + targetRect.height / 2,
          left: targetRect.left - offset,
          transform: "translate(-100%, -50%)"
        };
      case "right":
        return {
          top: targetRect.top + targetRect.height / 2,
          left: targetRect.right + offset,
          transform: "translate(0, -50%)"
        };
      default:
        return { top: 0, left: 0 };
    }
  };

  if (!isVisible || !targetRect) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" />
      
      {/* Highlight */}
      <div
        className="fixed border-2 border-primary rounded-lg bg-primary/10 z-50 pointer-events-none"
        style={{
          top: targetRect.top - 4,
          left: targetRect.left - 4,
          width: targetRect.width + 8,
          height: targetRect.height + 8,
        }}
      />
      
      {/* Tooltip */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed z-50 bg-background border shadow-lg rounded-lg p-4 max-w-sm"
          style={getTooltipPosition()}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onSkip}
              className="text-muted-foreground hover:text-foreground -mt-1 -mr-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {step} of {totalSteps}
            </span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={onSkip}>
                Skip Tour
              </Button>
              <Button size="sm" onClick={onNext} className="flex items-center">
                {step === totalSteps ? "Finish" : "Next"}
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>

          {/* Arrow */}
          <div
            className={`absolute w-3 h-3 bg-background border transform rotate-45 ${
              position === "top" ? "bottom-[-7px] left-1/2 -translate-x-1/2 border-b border-r" :
              position === "bottom" ? "top-[-7px] left-1/2 -translate-x-1/2 border-t border-l" :
              position === "left" ? "right-[-7px] top-1/2 -translate-y-1/2 border-t border-r" :
              "left-[-7px] top-1/2 -translate-y-1/2 border-b border-l"
            }`}
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
}