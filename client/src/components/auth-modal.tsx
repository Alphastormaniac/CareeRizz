import { useState } from "react";
import { X, Mail, Phone, Sparkles, Zap, Shield, Github } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
  onModeChange: (mode: 'signin' | 'signup') => void;
}

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = insertUserSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const { loginMutation, registerMutation } = useAuth();
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');

  const form = useForm({
    resolver: zodResolver(mode === 'signin' ? loginSchema : registerSchema),
    defaultValues: {
      email: "",
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSocialAuth = (provider: string) => {
    // Redirect to OAuth endpoints
    if (provider === 'google') {
      window.location.href = '/api/auth/google';
    } else if (provider === 'github') {
      window.location.href = '/api/auth/github';
    } else if (provider === 'linkedin') {
      window.location.href = '/api/auth/linkedin';
    }
  };

  const handleSubmit = (data: any) => {
    if (mode === 'signin') {
      loginMutation.mutate({
        email: data.email,
        password: data.password,
      });
    } else {
      registerMutation.mutate({
        email: data.email,
        username: data.username,
        fullName: data.fullName,
        password: data.password,
        subscriptionPlan: 'free',
        careerScore: 0,
      });
    }
  };

  const benefits = [
    { icon: Sparkles, text: "AI-powered career insights", color: "text-purple-500" },
    { icon: Zap, text: "Instant skill gap analysis", color: "text-yellow-500" },
    { icon: Shield, text: "Personalized learning paths", color: "text-blue-500" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border">
        <div className="flex">
          {/* Left Panel - Benefits */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">
                Accelerate Your Career
              </h2>
              <p className="text-blue-100 mb-8">
                Join thousands of professionals advancing their careers with AI-powered insights
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 text-white">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <benefit.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                <Badge className="bg-yellow-400 text-yellow-900 mb-2">Free Forever</Badge>
                <p className="text-sm text-blue-100">
                  Start with our free tier and unlock premium features as you grow
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Auth Form */}
          <div className="w-full lg:w-1/2 p-8">
            <DialogHeader className="mb-6">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
                </DialogTitle>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-gray-600">
                {mode === 'signin' 
                  ? 'Sign in to continue your career journey' 
                  : 'Start your AI-powered career transformation'
                }
              </p>
            </DialogHeader>

            {/* Social Auth Buttons */}
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={() => handleSocialAuth('google')}
                className="w-full h-12 border-2 hover:border-red-300 hover:bg-red-50 transition-all duration-200"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-6">              
              <Button 
                variant="outline" 
                onClick={() => setAuthMethod(authMethod === 'phone' ? 'email' : 'phone')}
                className="h-12 border-2 hover:border-green-300 hover:bg-green-50 transition-all duration-200"
              >
                {authMethod === 'email' ? (
                  <>
                    <Phone className="h-5 w-5 mr-2" />
                    Use Phone Instead
                  </>
                ) : (
                  <>
                    <Mail className="h-5 w-5 mr-2" />
                    Use Email Instead
                  </>
                )}
              </Button>
            </div>

            <div className="relative mb-6">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
                or continue with {authMethod}
              </span>
            </div>

            {/* Form */}
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              {mode === 'signup' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      {...form.register("fullName")}
                      className="mt-1 h-12"
                      placeholder="Enter your full name"
                    />
                    {form.formState.errors.fullName && (
                      <p className="text-sm text-destructive mt-1">{form.formState.errors.fullName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      {...form.register("username")}
                      className="mt-1 h-12"
                      placeholder="Choose a username"
                    />
                    {form.formState.errors.username && (
                      <p className="text-sm text-destructive mt-1">{form.formState.errors.username.message}</p>
                    )}
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    className="pl-10 h-12"
                    placeholder="Enter your email"
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...form.register("password")}
                  className="mt-1 h-12"
                  placeholder="Enter your password"
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-destructive mt-1">{form.formState.errors.password.message}</p>
                )}
              </div>

              {mode === 'signup' && (
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...form.register("confirmPassword")}
                    className="mt-1 h-12"
                    placeholder="Confirm your password"
                  />
                  {form.formState.errors.confirmPassword && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.confirmPassword.message}</p>
                  )}
                </div>
              )}

              <Button 
                type="submit" 
                disabled={loginMutation.isPending || registerMutation.isPending}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-200"
              >
                {loginMutation.isPending || registerMutation.isPending ? (
                  "Loading..."
                ) : (
                  mode === 'signin' ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => onModeChange(mode === 'signin' ? 'signup' : 'signin')}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  {mode === 'signin' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>

            {mode === 'signup' && (
              <p className="mt-4 text-xs text-muted-foreground text-center">
                By creating an account, you agree to our Terms of Service and Privacy Policy
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}