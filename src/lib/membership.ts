export type MembershipTier = {
	id: string;
	name: string;
	price: number; // USD, billed annually
	priceId: string; // Stripe recurring Price ID
	perks: string[];
	hasTshirt: boolean;
};

export const membershipTiers: MembershipTier[] = [
	{
		id: "white-club",
		name: "White Club",
		price: 250,
		priceId: process.env.STRIPE_PRICE_ID_WHITE_CLUB || "",
		perks: ["Free T-Shirt", "Exclusive Scarf"],
		hasTshirt: true,
	},
	{
		id: "blue-club",
		name: "Blue Club",
		price: 500,
		priceId: process.env.STRIPE_PRICE_ID_BLUE_CLUB || "",
		perks: ["T-Shirt", "Exclusive Scarf", "Locker Room Tour (1 Guest)"],
		hasTshirt: true,
	},
	{
		id: "champion-club",
		name: "Champion Club",
		price: 1000,
		priceId: process.env.STRIPE_PRICE_ID_CHAMPION_CLUB || "",
		perks: [
			"T-Shirt",
			"Exclusive Scarf",
			"Locker Room Tour (1 Guest)",
			"Photo with the National Championship Trophies",
		],
		hasTshirt: true,
	},
	{
		id: "national-champion-club",
		name: "National Champion Club",
		price: 1500,
		priceId: process.env.STRIPE_PRICE_ID_NATIONAL_CHAMPION_CLUB || "",
		perks: [
			"T-Shirt",
			"Exclusive Scarf",
			"Locker Room Tour (1 Guest)",
			"Photo with the National Championship Trophies",
			"Walk out with the team for the National Anthem",
			"Join Katelyn Longino for a pregame scout for two home games",
			"Hand written welcome letter",
		],
		hasTshirt: true,
	},
];

export const tshirtSizes = ["YS", "YM", "YL", "S", "M", "L", "XL", "2XL", "3XL"] as const;
export type TshirtSize = (typeof tshirtSizes)[number];

export function getTierById(id: string): MembershipTier | undefined {
	return membershipTiers.find((t) => t.id === id);
}

export function getTierByPriceId(priceId: string): MembershipTier | undefined {
	return membershipTiers.find((t) => t.priceId === priceId);
}

/** Returns true if `to` tier is a higher-priced tier than `from`. */
export function isUpgrade(fromTierId: string, toTierId: string): boolean {
	const from = getTierById(fromTierId);
	const to = getTierById(toTierId);
	if (!from || !to) return false;
	return to.price > from.price;
}
