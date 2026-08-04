import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
	"/",
	"/about",
	"/impact",
	"/goals",
	"/events",
	"/get-involved",
	"/womens-soccer/membership",
	"/api/womens-soccer/webhook",
	"/sign-in(.*)",
	"/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
	if (!isPublicRoute(req)) {
		await auth.protect();
	}
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
