import { useState } from "react";
import { X, Mail, Phone, Sparkles, Zap, Shield, Github } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
  onModeChange: (mode: 'signin' | 'signup') => void;
}

export default function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const { toast } = useToast();

  const authMutation = useMutation({
    mutationFn: async (authData: any) => {
      const endpoint = mode === 'signin' ? '/api/auth/signin' : '/api/auth/signup';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData),
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Authentication failed');
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: mode === 'signin' ? "Welcome back!" : "Account created successfully!",
        description: mode === 'signin' ? "You've been signed in." : "Welcome to CareeRizz!",
      });
      onClose();
      // Redirect to dashboard
      window.location.href = '/dashboard';
    },
    onError: (error: Error) => {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleSocialAuth = (provider: string) => {
    // For demo purposes, simulate successful social auth
    toast({
      title: "Social Authentication",
      description: `${provider} authentication would be implemented here.`,
    });
    
    // In a real app, this would redirect to the OAuth provider
    // window.location.href = `/api/auth/${provider}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const authData = {
      email: authMethod === 'email' ? email : undefined,
      phone: authMethod === 'phone' ? phone : undefined,
      password,
      firstName: mode === 'signup' ? firstName : undefined,
      lastName: mode === 'signup' ? lastName : undefined,
      authProvider: authMethod,
    };

    // Basic validation
    if (authMethod === 'email' && !email) {
      toast({
        title: "Validation Error",
        description: "Email is required",
        variant: "destructive"
      });
      return;
    }

    if (authMethod === 'phone' && !phone) {
      toast({
        title: "Validation Error", 
        description: "Phone number is required",
        variant: "destructive"
      });
      return;
    }

    if (!password) {
      toast({
        title: "Validation Error",
        description: "Password is required",
        variant: "destructive"
      });
      return;
    }

    if (mode === 'signup' && (!firstName || !lastName)) {
      toast({
        title: "Validation Error",
        description: "First name and last name are required",
        variant: "destructive"
      });
      return;
    }

    authMutation.mutate(authData);
  };

  const benefits = [
    { icon: Sparkles, text: "AI-powered career insights", color: "text-purple-500" },
    { icon: Zap, text: "Instant skill gap analysis", color: "text-yellow-500" },
    { icon: Shield, text: "Personalized learning paths", color: "text-blue-500" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="flex">
          {/* Left Panel - Benefits */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2 font-display">
                Accelerate Your Career
              </h2>
              <p className="text-blue-100 mb-8 font-body">
                Join thousands of professionals advancing their careers with AI-powered insights
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 text-white">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <benefit.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium font-body">{benefit.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                <Badge className="bg-yellow-400 text-yellow-900 mb-2">Free Forever</Badge>
                <p className="text-sm text-blue-100 font-body">
                  Start with our free tier and unlock premium features as you grow
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Auth Form */}
          <div className="w-full lg:w-1/2 p-8">
            <DialogHeader className="mb-6">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-display">
                  {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
                </DialogTitle>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-gray-600 font-body">
                {mode === 'signin' 
                  ? 'Sign in to continue your career journey' 
                  : 'Start your AI-powered career transformation'
                }
              </p>
            </DialogHeader>

            {/* Social Auth Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button 
                variant="outline" 
                onClick={() => handleSocialAuth('google')}
                className="h-12 border-2 hover:border-red-300 hover:bg-red-50 transition-all duration-200 font-medium"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => handleSocialAuth('linkedin')}
                className="h-12 border-2 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 font-medium"
              >
                <svg className="h-5 w-5 mr-2" fill="#0A66C2" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button 
                variant="outline" 
                onClick={() => handleSocialAuth('github')}
                className="h-12 border-2 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setAuthMethod('phone')}
                className="h-12 border-2 hover:border-green-300 hover:bg-green-50 transition-all duration-200 font-medium"
              >
                <Phone className="h-5 w-5 mr-2" />
                Phone
              </Button>
            </div>

            <div className="relative mb-6">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500 font-medium">
                or continue with {authMethod}
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mt-1 h-12 font-body"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="mt-1 h-12 font-body"
                      required
                    />
                  </div>
                </div>
              )}

              {authMethod === 'email' ? (
                <div>
                  <Label htmlFor="email" className="font-medium">Email Address</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 font-body"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <Label htmlFor="phone" className="font-medium">Phone Number</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 h-12 font-body"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="password" className="font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 h-12 font-body"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button 
                type="submit" 
                disabled={authMutation.isPending}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-200"
              >
                {authMutation.isPending 
                  ? (mode === 'signin' ? 'Signing In...' : 'Creating Account...') 
                  : (mode === 'signin' ? 'Sign In' : 'Create Account')
                }
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 font-body">
                {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => onModeChange(mode === 'signin' ? 'signup' : 'signin')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {mode === 'signin' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>

            {mode === 'signup' && (
              <p className="mt-4 text-xs text-gray-500 text-center font-body">
                By creating an account, you agree to our Terms of Service and Privacy Policy
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}