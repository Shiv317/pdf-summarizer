// utils/planUpdater.ts

/**
 * Triggers a plan update event that the PlanBadge component listens for
 * Call this function after successful payment processing or plan changes
 */
export const triggerPlanUpdate = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('planUpdated'));
    }
  };
  
  // Example usage in your payment success handler:
  // import { triggerPlanUpdate } from '@/utils/planUpdater';
  // 
  // // After successful payment
  // triggerPlanUpdate();