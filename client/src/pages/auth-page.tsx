import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import AuthModal from "@/components/auth-modal";

export default function AuthPage() {
  const { user } = useAuth();
  const [location, navigate] = useLocation();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (user) {
    return null; // Avoid flashing the auth page
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <AuthModal
        isOpen={true}
        onClose={() => navigate("/")}
        mode="signin"
        onModeChange={() => {}}
      />
    </div>
  );
}