import { useState } from "react";
import { Crown, Shield, CheckCircle, Star, Sparkles, Zap, Target, Brain, Rocket, Lock, Infinity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useQuery } from "@tanstack/react-query";
import { initializeRazorpay, createRazorpayOrder } from "@/lib/razorpay";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@shared/schema";

export default function EnhancedPaymentSection() {
  const { toast } = useToast();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"]
  });

  const handleUpgrade = async (planType: string, amount: number) => {
    try {
      const isRazorpayLoaded = await initializeRazorpay();
      if (!isRazorpayLoaded) {
        toast({
          title: "Payment Error",
          description: "Failed to load payment gateway. Please try again.",
          variant: "destructive"
        });
        return;
      }

      const order = await createRazorpayOrder({
        amount,
        currency: "INR",
        notes: {
          plan: planType,
          userId: "1",
          billing: billingCycle
        }
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_1234567890",
        amount: order.amount,
        currency: order.currency,
        name: "CareerAI India",
        description: `${planType} Plan Subscription`,
        order_id: order.id,
        handler: async function (response: any) {
          try {
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (verifyResponse.ok) {
              toast({
                title: "Payment Successful!",
                description: `Welcome to ${planType}! Your subscription has been activated.`,
              });
              window.location.reload();
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            toast({
              title: "Payment Verification Failed",
              description: "Please contact support if amount was deducted.",
              variant: "destructive"
            });
          }
        },
        prefill: {
          name: user ? `${user.firstName} ${user.lastName}` : "",
          email: user?.email || "",
        },
        theme: {
          color: "#0A66C2",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive"
      });
    }
  };

  const currentPlan = user?.subscriptionPlan || "free";

  const plans = [
    {
      id: "free",
      name: "Free Starter",
      icon: Target,
      description: "Perfect for exploring your career potential",
      monthlyPrice: 0,
      annualPrice: 0,
      savings: 0,
      gradient: "from-gray-400 to-gray-600",
      bgGradient: "from-gray-50 to-gray-100",
      features: [
        { text: "1 Resume Analysis per month", icon: CheckCircle, included: true },
        { text: "Basic skill gap identification", icon: CheckCircle, included: true },
        { text: "Limited course recommendations", icon: CheckCircle, included: true },
        { text: "Community support", icon: CheckCircle, included: true },
        { text: "Advanced AI insights", icon: Lock, included: false },
        { text: "Unlimited resume analysis", icon: Lock, included: false },
        { text: "1-on-1 mentorship", icon: Lock, included: false },
        { text: "Project sandbox access", icon: Lock, included: false }
      ],
      cta: "Current Plan",
      popular: false
    },
    {
      id: "premium",
      name: "Premium Pro",
      icon: Crown,
      description: "Accelerate your career with AI-powered insights",
      monthlyPrice: 299,
      annualPrice: 2390, // 20% discount
      savings: 1197,
      gradient: "from-blue-500 to-purple-600",
      bgGradient: "from-blue-50 to-purple-50",
      features: [
        { text: "Unlimited resume analysis", icon: CheckCircle, included: true },
        { text: "Advanced AI skill gap analysis", icon: Brain, included: true },
        { text: "Personalized learning roadmaps", icon: Target, included: true },
        { text: "Virtual project sandbox", icon: Sparkles, included: true },
        { text: "Priority email support", icon: Zap, included: true },
        { text: "Course completion certificates", icon: CheckCircle, included: true },
        { text: "Career progress tracking", icon: Star, included: true },
        { text: "Industry salary insights", icon: CheckCircle, included: true },
        { text: "1-on-1 expert mentorship", icon: Lock, included: false },
        { text: "Interview coaching sessions", icon: Lock, included: false }
      ],
      cta: "Upgrade to Premium",
      popular: true
    },
    {
      id: "premium_plus",
      name: "Premium+ Elite",
      icon: Rocket,
      description: "Complete career transformation with expert guidance",
      monthlyPrice: 799,
      annualPrice: 6392, // 33% discount
      savings: 3196,
      gradient: "from-purple-600 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      features: [
        { text: "Everything in Premium Pro", icon: Infinity, included: true },
        { text: "Unlimited 1-on-1 mentorship", icon: Crown, included: true },
        { text: "Weekly expert coaching calls", icon: Zap, included: true },
        { text: "Advanced interview preparation", icon: Target, included: true },
        { text: "Personalized career strategy", icon: Brain, included: true },
        { text: "Industry network introductions", icon: Star, included: true },
        { text: "Resume/LinkedIn optimization", icon: Sparkles, included: true },
        { text: "Salary negotiation coaching", icon: CheckCircle, included: true },
        { text: "Certified project reviews", icon: Crown, included: true },
        { text: "24/7 priority support", icon: Rocket, included: true }
      ],
      cta: "Go Elite",
      popular: false
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 p-8 rounded-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Choose Your Career Acceleration Plan
        </h2>
        <p className="text-gray-600 mb-6">
          Unlock your potential with AI-powered career development tools
        </p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <span className={`font-medium ${billingCycle === 'monthly' ? 'text-blue-600' : 'text-gray-500'}`}>
            Monthly
          </span>
          <Switch 
            checked={billingCycle === 'annual'}
            onCheckedChange={(checked) => setBillingCycle(checked ? 'annual' : 'monthly')}
            className="data-[state=checked]:bg-purple-600"
          />
          <span className={`font-medium ${billingCycle === 'annual' ? 'text-purple-600' : 'text-gray-500'}`}>
            Annual
          </span>
          {billingCycle === 'annual' && (
            <Badge className="bg-green-100 text-green-700 border-green-200">
              Save up to 33%
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrentPlan = currentPlan === plan.id;
          const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
          const savings = billingCycle === 'annual' ? plan.savings : 0;
          
          return (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular ? 'border-purple-500 shadow-lg scale-105' : 'border-gray-200 hover:border-gray-300'
              } ${isCurrentPlan ? 'ring-2 ring-green-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <CardHeader className={`bg-gradient-to-br ${plan.bgGradient} ${plan.popular ? 'pt-10' : 'pt-6'}`}>
                <div className="flex items-center justify-center mb-4">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${plan.gradient}`}>
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <CardTitle className="text-xl font-bold text-center mb-2">
                  {plan.name}
                </CardTitle>
                
                <p className="text-gray-600 text-center text-sm mb-4">
                  {plan.description}
                </p>
                
                <div className="text-center">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold text-dark">₹{price}</span>
                    <span className="text-gray-500 ml-1">
                      /{billingCycle === 'annual' ? 'year' : 'month'}
                    </span>
                  </div>
                  
                  {savings > 0 && (
                    <div className="mt-2">
                      <Badge className="bg-green-100 text-green-700">
                        Save ₹{savings} annually
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <feature.icon className={`h-4 w-4 ${
                        feature.included ? 'text-green-500' : 'text-gray-400'
                      }`} />
                      <span className={`text-sm ${
                        feature.included ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full h-12 font-semibold transition-all duration-200 ${
                    isCurrentPlan 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : plan.id === 'free'
                      ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      : `bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white`
                  }`}
                  onClick={() => {
                    if (!isCurrentPlan && plan.id !== 'free') {
                      handleUpgrade(plan.id, price);
                    }
                  }}
                  disabled={isCurrentPlan || plan.id === 'free'}
                >
                  {isCurrentPlan ? 'Current Plan' : plan.cta}
                </Button>

                {plan.id !== 'free' && (
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Cancel anytime. No hidden fees.
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Security & Trust */}
      <div className="flex items-center justify-center space-x-6 mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-green-500" />
          <span className="text-sm text-gray-600">Secured by Razorpay</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-blue-500" />
          <span className="text-sm text-gray-600">30-day money back</span>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-yellow-500" />
          <span className="text-sm text-gray-600">Trusted by 10,000+ professionals</span>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
        <h3 className="text-xl font-bold mb-3 text-center">Why Choose CareeRizz?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <Brain className="h-8 w-8 mx-auto mb-2" />
            <h4 className="font-semibold">AI-Powered Insights</h4>
            <p className="text-sm text-blue-100">Advanced algorithms analyze your profile against 50,000+ job requirements</p>
          </div>
          <div>
            <Target className="h-8 w-8 mx-auto mb-2" />
            <h4 className="font-semibold">Personalized Roadmaps</h4>
            <p className="text-sm text-blue-100">Custom learning paths based on your career goals and skill gaps</p>
          </div>
          <div>
            <Rocket className="h-8 w-8 mx-auto mb-2" />
            <h4 className="font-semibold">Proven Results</h4>
            <p className="text-sm text-blue-100">Users see 3x faster career growth and 40% higher salary increases</p>
          </div>
        </div>
      </div>
    </div>
  );
}