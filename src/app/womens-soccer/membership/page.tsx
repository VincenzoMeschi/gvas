"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import { Check } from "lucide-react";
import {
	membershipTiers,
	tshirtSizes,
	getTierById,
	isUpgrade,
	type MembershipTier,
} from "@/lib/membership";

type Membership = {
	tier: string;
	status: string;
	tshirtSize?: string;
	cancelAtPeriodEnd: boolean;
	currentPeriodEnd: string;
	scheduledTierId?: string | null;
};

function StatusBanner({ membership }: { membership: Membership }) {
	const currentTier = getTierById(membership.tier);
	const scheduledTier = membership.scheduledTierId ? getTierById(membership.scheduledTierId) : null;
	const renewalDate = new Date(membership.currentPeriodEnd).toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const borderClass = membership.cancelAtPeriodEnd
		? "border-red-500 bg-red-50"
		: scheduledTier
			? "border-amber-500 bg-amber-50"
			: "border-[#2067CE] bg-white";

	return (
		<div className={`rounded-xl shadow-md p-6 mb-12 border-l-4 ${borderClass}`}>
			<p className="text-lg text-blue-900">
				You are currently a member of the{" "}
				<span className="font-semibold">{currentTier?.name || membership.tier}</span>.
			</p>
			{membership.cancelAtPeriodEnd ? (
				<p className="text-red-600 mt-2 font-medium">
					⚠ Your membership is set to cancel on <span className="font-semibold">{renewalDate}</span>.
				</p>
			) : scheduledTier ? (
				<p className="text-amber-700 mt-2 font-medium">
					⚠ Downgrade scheduled: you will move to{" "}
					<span className="font-semibold">{scheduledTier.name}</span> on{" "}
					<span className="font-semibold">{renewalDate}</span>. Until then you keep all{" "}
					{currentTier?.name || membership.tier} perks.
				</p>
			) : (
				<p className="text-gray-600 mt-2">
					Your membership renews on <span className="font-semibold">{renewalDate}</span>.
				</p>
			)}
		</div>
	);
}

function TshirtSizeSelect({
	value,
	onChange,
}: {
	value: string;
	onChange: (v: string) => void;
}) {
	return (
		<div className="mt-4">
			<label className="block text-sm font-medium text-blue-900 mb-1">T-Shirt Size</label>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300">
				<option value="">Select a size</option>
				{tshirtSizes.map((size) => (
					<option key={size} value={size}>
						{size}
					</option>
				))}
			</select>
		</div>
	);
}

function ConfirmDialog({
	title,
	message,
	confirmLabel,
	confirmDisabled,
	onConfirm,
	onCancel,
}: {
	title: string;
	message: string;
	confirmLabel: string;
	confirmDisabled?: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}) {
	return (
		<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
			<div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
				<h3 className="text-xl font-bold text-blue-900 mb-3">{title}</h3>
				<p className="text-gray-600 mb-6 whitespace-pre-line">{message}</p>
				<div className="flex gap-3 justify-end">
					<button
						onClick={onCancel}
						className="px-5 py-2 rounded-lg font-semibold text-gray-600 hover:bg-gray-100 transition-colors duration-200 hover:cursor-pointer">
						Cancel
					</button>
					<button
						onClick={onConfirm}
						disabled={confirmDisabled}
						className="px-5 py-2 rounded-lg font-semibold bg-[#2067CE] text-white hover:bg-blue-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer">
						{confirmLabel}
					</button>
				</div>
			</div>
		</div>
	);
}

function TierCard({
	tier,
	membership,
	loading,
	onBuyNow,
	onUpgrade,
	onDowngrade,
	onManage,
	isInitialLoad,
	prestigeLevel,
}: {
	tier: MembershipTier;
	membership: Membership | null;
	loading: boolean;
	onBuyNow: (tier: MembershipTier, tshirtSize: string) => void;
	onUpgrade: (tier: MembershipTier, tshirtSize: string) => void;
	onDowngrade: (tier: MembershipTier, tshirtSize: string) => void;
	onManage: () => void;
	isInitialLoad: boolean;
	/** 0 = entry tier, increasing with each tier up. Drives escalating visual prestige. */
	prestigeLevel: number;
}) {
	const [tshirtSize, setTshirtSize] = useState("");
	const [attemptedSubmit, setAttemptedSubmit] = useState(false);
	const isCurrentTier = membership?.tier === tier.id && membership.status === "active";
	const hasActiveMembership = membership && membership.status === "active";
	const willUpgrade = hasActiveMembership && !isCurrentTier && isUpgrade(membership!.tier, tier.id);
	const willDowngrade = hasActiveMembership && !isCurrentTier && !willUpgrade;
	const isScheduledDowngradeTarget = membership?.scheduledTierId === tier.id;

	// A size selection is required unless the member already has one on file
	// (e.g. switching tiers without changing size).
	const needsTshirtSize = tier.hasTshirt && !tshirtSize && !membership?.tshirtSize;
	const showTshirtWarning = needsTshirtSize && attemptedSubmit;

	const runIfSizeSelected = (action: () => void) => {
		if (needsTshirtSize) {
			setAttemptedSubmit(true);
			return;
		}
		action();
	};

	// Escalating visual prestige from left (entry tier) to right (top tier): subtle
	// scale-up, richer border accent, and a badge on the top two tiers.
	const prestigeScale = ["scale-100", "scale-100", "scale-[1.03]", "scale-[1.06]"][prestigeLevel] ?? "scale-100";
	const prestigeShadow = [
		"shadow-md hover:shadow-xl",
		"shadow-md hover:shadow-xl",
		"shadow-lg hover:shadow-2xl",
		"shadow-xl hover:shadow-2xl",
	][prestigeLevel] ?? "shadow-md hover:shadow-xl";
	const prestigeAccent = [
		"border-t-4 border-gray-200",
		"border-t-4 border-blue-300",
		"border-t-4 border-[#2067CE]",
		"border-t-4 border-amber-400",
	][prestigeLevel] ?? "border-t-4 border-gray-200";
	const prestigeBadge = ["", "", "★ Fan Favorite", "👑 Top Tier"][prestigeLevel] ?? "";

	return (
		<div className={`flex flex-col self-start transition-transform duration-300 ${prestigeScale}`}>
			{/* Front card: title, price, T-shirt size, and action button */}
			<div
				className={`relative z-10 bg-white rounded-xl ${prestigeShadow} ${prestigeAccent} transition-shadow duration-200 p-8 min-h-[22rem] flex flex-col ${
					isCurrentTier
						? "ring-2 ring-[#2067CE]"
						: isScheduledDowngradeTarget
							? "ring-2 ring-amber-500"
							: ""
				}`}>
				{prestigeBadge && !isScheduledDowngradeTarget && !(isCurrentTier && membership?.scheduledTierId) && (
					<span
						className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md whitespace-nowrap z-10 ${
							prestigeLevel === 3 ? "bg-amber-500" : "bg-[#2067CE]"
						}`}>
						{prestigeBadge}
					</span>
				)}
				{isScheduledDowngradeTarget && (
					<span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md whitespace-nowrap z-10">
						Downgrading here on renewal
					</span>
				)}
				{isCurrentTier && membership?.scheduledTierId && (
					<span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2067CE] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md whitespace-nowrap z-10">
						Active until renewal
					</span>
				)}

				<h3 className="text-2xl font-bold text-blue-900 mb-1">{tier.name}</h3>
				<p className="text-4xl font-extrabold text-[#2067CE] mb-6">
					${tier.price.toLocaleString()}
					<span className="text-base font-medium text-gray-500"> / year</span>
				</p>

				{isInitialLoad ? (
					<>
						{tier.hasTshirt && (
							<div className="animate-pulse">
								<div className="h-4 w-24 bg-gray-200 rounded mb-2" />
								<div className="h-10 w-full bg-gray-200 rounded-lg" />
							</div>
						)}
						<div className="mt-auto pt-6 animate-pulse">
							<div className="h-12 w-full bg-gray-200 rounded-lg" />
						</div>
					</>
				) : (
					<>
						{tier.hasTshirt && !isCurrentTier && (
							<>
								<TshirtSizeSelect value={tshirtSize} onChange={setTshirtSize} />
								{showTshirtWarning && (
									<p className="text-xs text-red-600 mt-1">
										Please select a T-shirt size to continue.
									</p>
								)}
							</>
						)}

						<div className="mt-auto pt-6">
							{isCurrentTier ? (
								<button
									onClick={onManage}
									disabled={loading}
									className="w-full bg-blue-300 text-blue-900 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-400 transition-colors duration-200 disabled:opacity-50 hover:cursor-pointer">
									Manage My Membership
								</button>
							) : isScheduledDowngradeTarget ? (
								<button
									onClick={onManage}
									disabled={loading}
									className="w-full bg-amber-100 text-amber-800 border-2 border-amber-500 px-6 py-3 rounded-lg font-semibold hover:bg-amber-200 transition-colors duration-200 disabled:opacity-50 hover:cursor-pointer">
									Scheduled — Manage
								</button>
							) : willUpgrade ? (
								<button
									onClick={() => runIfSizeSelected(() => onUpgrade(tier, tshirtSize))}
									disabled={loading}
									className="w-full bg-[#2067CE] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer">
									Upgrade
								</button>
							) : willDowngrade ? (
								<button
									onClick={() => runIfSizeSelected(() => onDowngrade(tier, tshirtSize))}
									disabled={loading}
									className="w-full bg-white border-2 border-[#2067CE] text-[#2067CE] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer">
									Downgrade
								</button>
							) : (
								<SignedIn>
									<button
										onClick={() => runIfSizeSelected(() => onBuyNow(tier, tshirtSize))}
										disabled={loading}
										className="w-full bg-[#2067CE] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer">
										Buy Now
									</button>
								</SignedIn>
							)}
							<SignedOut>
								<SignInButton mode="modal">
									<button className="w-full mt-2 bg-[#2067CE] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-800 transition-colors duration-200 hover:cursor-pointer">
										Sign In to Join
									</button>
								</SignInButton>
							</SignedOut>
						</div>
					</>
				)}
			</div>

			{/* Back card: perks panel, tucked behind and peeking out from beneath the front card */}
			<div
				className={`relative z-0 -mt-4 rounded-b-xl shadow-md pt-8 px-8 pb-6 ${
					["bg-gray-50", "bg-blue-50", "bg-blue-100", "bg-amber-50"][prestigeLevel] ?? "bg-blue-50"
				}`}>
				<ul className="space-y-3">
					{tier.perks.map((perk) => (
						<li key={perk} className="flex items-start gap-2 text-gray-700">
							<Check
								className={`h-5 w-5 shrink-0 mt-0.5 ${
									prestigeLevel === 3 ? "text-amber-500" : "text-[#2067CE]"
								}`}
							/>
							<span>{perk}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

function MembershipContent() {
	const searchParams = useSearchParams();
	const [membership, setMembership] = useState<Membership | null>(null);
	const [loading, setLoading] = useState(false);
	const [initialLoad, setInitialLoad] = useState(true);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [pendingUpgrade, setPendingUpgrade] = useState<{
		tier: MembershipTier;
		tshirtSize: string;
		amountDue: number | null;
	} | null>(null);
	const [pendingCancel, setPendingCancel] = useState(false);

	const fetchMembership = useCallback(async () => {
		try {
			const res = await fetch("/api/womens-soccer/membership");
			if (!res.ok) return;
			const data = await res.json();
			setMembership(data);
		} catch {
			// ignore — treat as no membership
		} finally {
			setInitialLoad(false);
		}
	}, []);

	useEffect(() => {
		fetchMembership();
	}, [fetchMembership]);

	useEffect(() => {
		const success = searchParams.get("success");
		const sessionId = searchParams.get("session_id");
		if (!success || !sessionId) return;
		(async () => {
			try {
				const res = await fetch(`/api/womens-soccer/retrieve-session?sessionId=${sessionId}`);
				if (!res.ok) throw new Error("Failed to confirm your checkout session");
				setMessage("Thank you for joining! Your membership is now active.");
				// Webhook may take a moment to land — poll briefly.
				await fetchMembership();
			} catch (err) {
				setError((err as Error).message);
			}
		})();
	}, [searchParams, fetchMembership]);

	const handleBuyNow = async (tier: MembershipTier, tshirtSize: string) => {
		setError("");
		if (tier.hasTshirt && !tshirtSize) {
			setError("Please select a T-shirt size before continuing.");
			return;
		}
		setLoading(true);
		try {
			const res = await fetch("/api/womens-soccer/create-checkout-session", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ tierId: tier.id, tshirtSize }),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Failed to start checkout");
			window.location.href = data.url;
		} catch (err) {
			setError((err as Error).message);
			setLoading(false);
		}
	};

	const handleUpgrade = async (tier: MembershipTier, tshirtSize: string) => {
		setError("");
		setPendingUpgrade({ tier, tshirtSize, amountDue: null });
		try {
			const res = await fetch("/api/womens-soccer/preview-upgrade", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ tierId: tier.id }),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Failed to preview upgrade cost");
			setPendingUpgrade({ tier, tshirtSize, amountDue: data.amountDue });
		} catch (err) {
			setError((err as Error).message);
			setPendingUpgrade(null);
		}
	};

	const confirmUpgrade = async () => {
		if (!pendingUpgrade) return;
		const { tier, tshirtSize } = pendingUpgrade;
		setError("");
		setLoading(true);
		try {
			const res = await fetch("/api/womens-soccer/manage", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ action: "upgrade", tierId: tier.id, tshirtSize }),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Failed to upgrade");
			setMessage(`You've been upgraded to ${tier.name}! Your renewal date has been reset to today.`);
			await fetchMembership();
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
			setPendingUpgrade(null);
		}
	};

	const handleDowngrade = async (tier: MembershipTier, tshirtSize: string) => {
		setError("");
		setLoading(true);
		try {
			const res = await fetch("/api/womens-soccer/manage", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ action: "downgrade", tierId: tier.id, tshirtSize }),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Failed to schedule downgrade");
			setMessage(`You'll move to ${tier.name} at your next renewal.`);
			await fetchMembership();
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		setError("");
		setPendingCancel(true);
	};

	const confirmCancel = async () => {
		setError("");
		setLoading(true);
		try {
			const res = await fetch("/api/womens-soccer/manage", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ action: "cancel" }),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Failed to cancel");
			setMessage("Your membership will end at your next renewal date. We're sad to see you go!");
			await fetchMembership();
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
			setPendingCancel(false);
		}
	};

	const handleReactivate = async () => {
		setError("");
		setLoading(true);
		try {
			const res = await fetch("/api/womens-soccer/manage", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ action: "reactivate" }),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Failed to reactivate");
			setMessage("Your membership will continue — cancellation removed.");
			await fetchMembership();
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	};

	const handleCancelScheduledDowngrade = async () => {
		setError("");
		setLoading(true);
		try {
			const res = await fetch("/api/womens-soccer/manage", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ action: "cancel_scheduled_downgrade" }),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Failed to cancel scheduled downgrade");
			setMessage("Your scheduled downgrade has been canceled — you'll stay on your current tier.");
			await fetchMembership();
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	};

	const hasActiveMembership = membership && membership.status === "active";

	return (
		<div className="bg-gray-50">
			<section className="bg-white py-24 relative">
				<div className="container mx-auto px-8 text-center relative">
					<h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-[#2067CE]">
						Women&apos;s Soccer Membership
					</h1>
					<p className="text-lg text-blue-900 max-w-3xl mx-auto leading-relaxed mb-12">
						Your support of GVSU Women&apos;s Soccer helps provide championship experiences,
						first-class resources, and life-changing opportunities for our student-athletes.
					</p>
					<div className="relative w-full max-w-5xl mx-auto aspect-video overflow-hidden rounded-xl shadow-2xl mb-12">
						<Image
							src="/WSOC_Hero_Team_Celebration.jpg"
							alt="GVSU Women's Soccer team celebrating on the field"
							fill
							style={{ objectFit: "cover" }}
							priority
						/>
					</div>
					<button
						onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
						className="bg-[#2067CE] text-white px-10 py-4 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-800 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:cursor-pointer">
						View Membership Tiers
					</button>
				</div>
			</section>

			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-8">
					<div className="flex flex-col md:flex-row items-center gap-12">
						<div className="relative w-full md:w-1/2 aspect-[4/5] max-w-md mx-auto overflow-hidden rounded-xl shadow-2xl">
							<Image
								src="/WSOC_Player_Action_4.jpg"
								alt="GVSU Women's Soccer player in action"
								fill
								style={{ objectFit: "cover" }}
							/>
						</div>
						<div className="md:w-1/2 text-center md:text-left">
							<h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
								Be Part of the Championship Culture
							</h2>
							<p className="text-gray-600 leading-relaxed text-lg mb-8">
								From the pregame huddle to the final whistle, our Women&apos;s Soccer
								program competes at the highest level in NCAA Division II. As a
								member, you&apos;ll get closer to the team and directly support the
								resources that keep the Lakers among the nation&apos;s best.
							</p>
							<button
								onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
								className="bg-[#2067CE] text-white px-10 py-4 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-800 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:cursor-pointer">
								View Membership Tiers
							</button>
						</div>
					</div>
				</div>
			</section>

			<section id="pricing" className="py-20 bg-white scroll-mt-24">
				<div className="container mx-auto px-8">
					{message && (
						<div className="max-w-3xl mx-auto mb-8 bg-green-50 border border-green-200 text-green-800 rounded-lg px-4 py-3 text-center">
							{message}
						</div>
					)}
					{error && (
						<div className="max-w-3xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-center">
							{error}
						</div>
					)}

					<SignedIn>
						{initialLoad && (
							<div id="manage-anchor" className="max-w-3xl mx-auto mb-12 animate-pulse">
								<div className="rounded-xl shadow-md p-6 border-l-4 border-gray-200 bg-white">
									<div className="h-5 w-64 bg-gray-200 rounded mb-3" />
									<div className="h-4 w-80 bg-gray-200 rounded" />
								</div>
							</div>
						)}
						{!initialLoad && hasActiveMembership && membership && (
							<div id="manage-anchor" className="max-w-3xl mx-auto">
								<StatusBanner membership={membership} />
								<div className="flex flex-wrap gap-3 justify-center mb-12">
									{membership.cancelAtPeriodEnd ? (
										<button
											onClick={handleReactivate}
											disabled={loading}
											className="bg-[#2067CE] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-800 transition-colors duration-200 disabled:opacity-50 hover:cursor-pointer">
											Keep My Membership
										</button>
									) : (
										<button
											onClick={handleCancel}
											disabled={loading}
											className="bg-white border-2 border-red-500 text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors duration-200 disabled:opacity-50 hover:cursor-pointer">
											Cancel Membership
										</button>
									)}
									{membership.scheduledTierId && !membership.cancelAtPeriodEnd && (
										<button
											onClick={handleCancelScheduledDowngrade}
											disabled={loading}
											className="bg-amber-100 border-2 border-amber-500 text-amber-800 px-6 py-3 rounded-lg font-semibold hover:bg-amber-200 transition-colors duration-200 disabled:opacity-50 hover:cursor-pointer">
											Cancel Scheduled Downgrade
										</button>
									)}
									<a
										href="mailto:grandvalleyas@gmail.com?subject=Women's Soccer Membership"
										className="bg-white border-2 border-[#2067CE] text-[#2067CE] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 inline-flex items-center">
										Contact Us
									</a>
								</div>
							</div>
						)}
					</SignedIn>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-end">
						{membershipTiers.map((tier, index) => (
							<TierCard
								key={tier.id}
								tier={tier}
								prestigeLevel={index}
								membership={membership}
								loading={loading}
								isInitialLoad={initialLoad}
								onBuyNow={handleBuyNow}
								onUpgrade={handleUpgrade}
								onDowngrade={handleDowngrade}
								onManage={() => {
									document.getElementById("manage-anchor")?.scrollIntoView({ behavior: "smooth" });
								}}
							/>
						))}
					</div>
				</div>
			</section>

			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Gallery</h2>
						<p className="text-gray-600 text-lg max-w-2xl mx-auto">
							Moments from the pitch — the team, the wins, and the community behind them.
						</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{[
							{ src: "/WSOC_Player_Celebration.jpg", alt: "GVSU Women's Soccer player celebrating" },
							{ src: "/WSOC_Players_Arms_Up.jpg", alt: "GVSU Women's Soccer players celebrating a goal" },
							{ src: "/WSOC_Team_Huddle.jpg", alt: "GVSU Women's Soccer team in a huddle" },
							{ src: "/WSOC_Players_Hug.jpg", alt: "GVSU Women's Soccer players embracing after a goal" },
						].map((image) => (
							<div
								key={image.src}
								className="group relative aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
								<Image
									src={image.src}
									alt={image.alt}
									fill
									className="object-cover transition-transform duration-300 group-hover:scale-105"
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			{pendingUpgrade && (
				<ConfirmDialog
					title={`Upgrade to ${pendingUpgrade.tier.name}?`}
					message={
						pendingUpgrade.amountDue === null
							? "Calculating the amount you'll be charged today..."
							: `You'll be charged $${pendingUpgrade.amountDue.toLocaleString(undefined, {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})} today — the full price of ${
									pendingUpgrade.tier.name
								} — and your membership will move to ${
									pendingUpgrade.tier.name
								} immediately. Your renewal date will reset to one year from today.`
					}
					confirmLabel={
						loading
							? "Processing..."
							: pendingUpgrade.amountDue === null
								? "Loading..."
								: `Confirm & Pay $${pendingUpgrade.amountDue.toLocaleString(undefined, {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}`
					}
					confirmDisabled={loading || pendingUpgrade.amountDue === null}
					onConfirm={confirmUpgrade}
					onCancel={() => setPendingUpgrade(null)}
				/>
			)}

			{pendingCancel && (
				<ConfirmDialog
					title="Cancel your membership?"
					message="Your membership will remain active until your next renewal date, then it will end. You won't be charged again unless you rejoin. This won't issue a refund for your current period."
					confirmLabel={loading ? "Canceling..." : "Confirm Cancellation"}
					confirmDisabled={loading}
					onConfirm={confirmCancel}
					onCancel={() => setPendingCancel(false)}
				/>
			)}
		</div>
	);
}

export default function MembershipPage() {
	return (
		<Suspense>
			<MembershipContent />
		</Suspense>
	);
}
