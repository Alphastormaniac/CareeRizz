import { useState } from "react";
import { Brain, Target, Rocket, Star, CheckCircle, ArrowRight, Sparkles, Zap, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import AuthModal from "@/components/auth-modal";

export default function Landing() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Resume Analysis",
      description: "Advanced algorithms analyze your resume against 50,000+ job requirements in real-time",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Target,
      title: "Personalized Learning Paths",
      description: "Custom roadmaps based on your career goals and identified skill gaps",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: Rocket,
      title: "Expert Mentorship",
      description: "Connect with industry professionals for 1-on-1 guidance and career acceleration",
      gradient: "from-green-500 to-blue-600"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Professionals Transformed" },
    { number: "3x", label: "Faster Career Growth" },
    { number: "40%", label: "Average Salary Increase" },
    { number: "95%", label: "Job Placement Rate" }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer at Google",
      content: "CareerAI identified exactly what I needed to break into FAANG. Got my Google offer in 6 months!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      name: "Arjun Patel",
      role: "Data Scientist at Microsoft",
      content: "The AI insights were incredibly accurate. Went from ₹8L to ₹25L in just one year.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      name: "Sneha Kumar",
      role: "Product Manager at Flipkart",
      content: "The mentorship program was game-changing. My mentor helped me transition from engineering to product.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      
      {/* Navigation */}
      <nav className="glass-morphism border-b border-cyan-500/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                CareeRizz
              </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => openAuthModal('signin')}
                className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300"
              >
                Sign In
              </Button>
              <Button 
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-semibold cyber-glow transition-all duration-300"
                onClick={() => openAuthModal('signup')}
              >
                <span className="hidden sm:inline">Get Started Free</span>
                <span className="sm:hidden">Start Free</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 mb-4 sm:mb-6 cyber-glow inline-flex">
                <Sparkles className="w-4 h-4 mr-2" />
                Trusted by 10,000+ Professionals
              </Badge>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Accelerate Your
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent block mt-2">
                  Career Growth
                </span>
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl block mt-2 text-gray-300">
                  with AI Intelligence
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Transform your career with AI-powered insights, personalized learning paths, 
                and expert mentorship designed specifically for the Indian job market.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center lg:justify-start">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold cyber-glow transition-all duration-300"
                  onClick={() => openAuthModal('signup')}
                >
                  <span className="flex items-center">
                    Start Free Analysis
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg border-2 border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/50 transition-all duration-300"
                  onClick={() => openAuthModal('signin')}
                >
                  Sign In
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400 mr-2" />
                  Free forever plan
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400 mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400 mr-2" />
                  Instant AI analysis
                </div>
              </div>
            </div>
            
            <div className="relative mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-2xl transform rotate-3 blur-xl"></div>
              <div className="relative glass-morphism rounded-2xl p-4 sm:p-6 lg:p-8 neon-border">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-semibold text-cyan-400">AI Career Analysis</h3>
                    <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs sm:text-sm">
                      Live Demo
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm sm:text-base">ATS Score</span>
                      <span className="font-bold text-cyan-400 text-sm sm:text-base">94%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 h-2 rounded-full shadow-lg shadow-cyan-400/50" style={{ width: '94%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm sm:text-base">Career Score</span>
                      <span className="font-bold text-purple-400 text-sm sm:text-base">87/100</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full shadow-lg shadow-purple-400/50" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  
                  <div className="pt-3 sm:pt-4 border-t border-gray-600">
                    <p className="text-xs sm:text-sm text-gray-300">
                      <strong className="text-cyan-400">Top Recommendation:</strong> Add AWS certification to increase salary potential by ₹3-5L
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-cyan-600/90 via-purple-600/90 to-pink-600/90 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white glass-morphism rounded-xl p-4 sm:p-6 neon-border">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 cyber-text">{stat.number}</div>
                <div className="text-xs sm:text-sm text-gray-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Career Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform provides everything you need to accelerate your career growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Success Stories from Indian Professionals
            </h2>
            <p className="text-xl text-gray-600">
              See how CareerAI has transformed careers across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                  <div className="flex text-yellow-400 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have accelerated their careers with CareerAI India
          </p>
          <Button 
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 h-14 px-12 text-lg font-semibold"
            onClick={() => openAuthModal('signup')}
          >
            Start Your Free Analysis
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-blue-100 text-sm mt-4">
            No credit card required • Free forever plan available
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">CareerAI India</h3>
              <p className="text-gray-400 text-sm">
                Empowering careers with AI-driven insights and personalized learning paths.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Resume Analysis</a></li>
                <li><a href="#" className="hover:text-white">Learning Paths</a></li>
                <li><a href="#" className="hover:text-white">Mentorship</a></li>
                <li><a href="#" className="hover:text-white">Interview Prep</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Career Blog</a></li>
                <li><a href="#" className="hover:text-white">Salary Guide</a></li>
                <li><a href="#" className="hover:text-white">Industry Reports</a></li>
                <li><a href="#" className="hover:text-white">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">&copy; 2024 CareerAI India. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
}