import { Crown, Shield, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { initializeRazorpay, createRazorpayOrder } from "@/lib/razorpay";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@shared/schema";

export default function PaymentSection() {
  const { toast } = useToast();
  
  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"]
  });

  const handleUpgrade = async () => {
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
        amount: 1999,
        currency: "INR",
        notes: {
          plan: "premium",
          userId: "1"
        }
      });

      const options = {
        key: process.env.VITE_RAZORPAY_KEY_ID || "rzp_test_1234567890",
        amount: order.amount,
        currency: order.currency,
        name: "CareerAI India",
        description: "Premium Plan Subscription",
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
                description: "Welcome to Premium! Your subscription has been activated.",
              });
              // Refresh user data
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

  const currentPlan = user?.subscriptionPlan || "basic";

  return (
    <Card className="bg-white border border-gray-100">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-dark">Upgrade Your Plan</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Current Plan */}
        <div className={`border rounded-lg p-4 ${
          currentPlan === "basic" ? "border-green-500 bg-green-50" : "border-gray-200"
        }`}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-dark">Current: {currentPlan === "basic" ? "Basic" : "Premium"} Plan</h4>
            <Badge className="bg-success-green text-white">Active</Badge>
          </div>
          <p className="text-gray-600 text-sm mb-3">
            {currentPlan === "basic" ? "5 mentor sessions, 10 courses" : "Unlimited access to all features"}
          </p>
          <p className="success-green font-semibold">
            ₹{currentPlan === "basic" ? "999" : "1,999"}/month
          </p>
        </div>

        {/* Premium Plan */}
        {currentPlan === "basic" && (
          <div className="border border-yellow-500 rounded-lg p-4 bg-yellow-50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-dark flex items-center">
                <Crown className="h-4 w-4 mr-1 text-yellow-600" />
                Premium Plan
              </h4>
              <Badge className="bg-achievement-gold text-white">Recommended</Badge>
            </div>
            <ul className="text-gray-600 text-sm space-y-1 mb-3">
              <li className="flex items-center">
                <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                Unlimited mentor sessions
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                All courses & certifications
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                Priority support
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                Advanced AI insights
              </li>
            </ul>
            <div className="flex items-center justify-between">
              <p className="achievement-gold font-semibold">₹1,999/month</p>
              <Button 
                className="bg-achievement-gold hover:bg-yellow-500 text-white"
                onClick={handleUpgrade}
              >
                Upgrade Now
              </Button>
            </div>
          </div>
        )}

        {/* Payment Security */}
        <div className="flex items-center justify-center space-x-4 py-3 border-t">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 success-green" />
            <span className="text-xs text-gray-500">Secured by Razorpay</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
