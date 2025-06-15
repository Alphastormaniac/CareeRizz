import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/dashboard";
import Landing from "@/pages/landing";
import NotFound from "@/pages/not-found";

function Router() {
  // Check if user is authenticated by looking for a token or session
  // For demo purposes, we'll check localStorage or redirect based on URL
  const isAuthenticated = localStorage.getItem('user') || window.location.pathname === '/dashboard';
  
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/" component={Landing} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;