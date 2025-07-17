import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Readable } from "stream";
import {
  handleCheckoutSessionCompleted,
  handleSubscriptionDeleted,
} from "../../../lib/payments";

// Init Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Helper to read raw body as Buffer from Web Request
async function getRawBody(req: NextRequest): Promise<Buffer> {
  const reader = req.body?.getReader();
  const chunks = [];

  while (true) {
    const { done, value } = await reader!.read();
    if (done) break;
    if (value) chunks.push(value);
  }

  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature") ?? "";
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  let event;

  try {
    const rawBody = await getRawBody(req);

    // Construct and verify Stripe event
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);

    // Handle Stripe event
    switch (event.type) {
      case "checkout.session.completed": {
        const sessionId = event.data.object.id;
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items"],
        });
        await handleCheckoutSessionCompleted({ session, stripe });
        break;
      }

      case "customer.subscription.deleted": {
        const subscriptionId = event.data.object.id;
        await handleSubscriptionDeleted({ subscriptionId, stripe });
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (err: any) {
    console.error("Stripe Webhook Error:", err.message);
    return NextResponse.json(
      { error: "Webhook error", details: err.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ received: true });
}
