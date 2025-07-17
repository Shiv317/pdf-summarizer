'use client'

import { useUser } from "@clerk/nextjs";
import { useEffect, useState, useCallback } from "react";
import { getPriceId } from "@/lib/user";
import { pricingPlans } from "@/utils/constants";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Crown} from "lucide-react";


export default function PlanBadge() {
  const { user, isLoaded } = useUser();
  const [planName, setPlanName] = useState<string>('Buy a plan');
  const [priceId, setPriceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPlan = useCallback(async () => {
    if (!isLoaded || !user?.id) {
      setLoading(false);
      return;
    }

    const email = user?.emailAddresses?.[0]?.emailAddress;
    
    if (email) {
      try {
        setLoading(true);
        console.log('Fetching plan for email:', email);
        
        const fetchedPriceId = await getPriceId(email);
        console.log('Fetched priceId:', fetchedPriceId);
        
        setPriceId(fetchedPriceId);
        
        if (fetchedPriceId) {
          const plan = pricingPlans.find((plan) => plan.priceId === fetchedPriceId);
          console.log('Found plan:', plan);
          
          if (plan) {
            setPlanName(plan.name);
          } else {
            console.warn('No plan found for priceId:', fetchedPriceId);
            setPlanName('Unknown Plan');
          }
        } else {
          console.log('No active subscription found');
          setPlanName('Buy a plan');
        }
      } catch (error) {
        console.error('Error fetching plan:', error);
        setPlanName('Buy a plan');
      }
    }
    
    setLoading(false);
  }, [user, isLoaded]);

  useEffect(() => {
    fetchPlan();
  }, [fetchPlan]);

  // Listen for custom events that might indicate a plan was purchased
  useEffect(() => {
    const handlePlanUpdate = () => {
      fetchPlan();
    };

    window.addEventListener('planUpdated', handlePlanUpdate);
    return () => window.removeEventListener('planUpdated', handlePlanUpdate);
  }, [fetchPlan]);

  // Don't render anything until user is loaded
  if (!isLoaded || loading) {
    return (
      <div className="text-sm bg-gray-100 px-2 py-1 rounded-md text-gray-700 animate-pulse">
        Loading...
      </div>
    );
  }

  // Don't render if no user
  if (!user?.id) return null;

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "ml-2 bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300 hidden lg:flex flex-row items-center cursor-pointer transition-all duration-200",
        !priceId && "from-red-100 to-red-200 border-red-300",
        loading && "animate-pulse"
      )}
      onClick={fetchPlan}
      title="Click to refresh plan status"
    >
      <Crown className={cn("w-3 h-3 mr-1 text-amber-600", !priceId && "text-red-600")} />
      {planName}
    </Badge>
  );
}