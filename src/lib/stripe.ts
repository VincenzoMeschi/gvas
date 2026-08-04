import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

/**
 * Lazily constructs the Stripe client so that build-time page data collection
 * (which imports route modules without real env vars present) doesn't throw.
 * Accessing `stripe` at request-time still requires STRIPE_SECRET_KEY to be set.
 */
function getStripe(): Stripe {
	if (!stripeInstance) {
		stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
			apiVersion: "2025-02-24.acacia",
		});
	}
	return stripeInstance;
}

export const stripe: Stripe = new Proxy({} as Stripe, {
	get(_target, prop, receiver) {
		return Reflect.get(getStripe(), prop, receiver);
	},
});
