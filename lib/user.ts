'use server'

import { getDbConnection } from "@/lib/db";
import { pricingPlans } from "@/utils/constants";
import { getUserUploadCount } from "@/lib/summaries";

export async function getPriceId(email: string) {
  try {
    const sql = await getDbConnection();
    
    // Check for active subscription
    const activeQuery = await sql`
      SELECT price_id FROM users WHERE email = ${email} AND status = 'active'
    `;
    
    if (activeQuery.length > 0) {
      return activeQuery[0].price_id;
    }
    
    return null;
  } catch (error) {
    console.error('Database error in getPriceId:', error);
    return null;
  }
}

export async function getUserPlan(email: string) {
  try {
    const sql = await getDbConnection();
    
    const query = await sql`
      SELECT price_id, status FROM users 
      WHERE email = ${email} 
      AND price_id IS NOT NULL
      ORDER BY updated_at DESC
      LIMIT 1
    `;
    
    return query?.[0] || null;
  } catch (error) {
    console.error('Database error in getUserPlan:', error);
    return null;
  }
}

export async function hasReachedUploadLimit(userId: string) {
  const uploadCount = await getUserUploadCount(userId);
  const priceId = await getPriceId(userId);

  const isPro = pricingPlans.find((plan) => plan.priceId === priceId)?.id === 'pro' ;

  const uploadLimit: number = isPro ? 1000 : 5;

  return { hasReachedLimit: uploadCount >= uploadLimit, uploadLimit };
}