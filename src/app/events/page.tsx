import Image from "next/image";

export default function Events() {
	return (
		<div className="bg-gray-50">
			{/* Golf Outing Section */}
			<section className="py-32 bg-white relative">
				<div className="absolute z-0 bottom-0 w-full h-2/3 bg-[#2067CE]" />
				<div className="container mx-auto px-8 text-center relative">
					<h1 className="text-5xl md:text-6xl font-extrabold mb-12 text-[#2067CE]">
						Fundraising Events
					</h1>
					<div className="relative w-full max-h-[35rem] mx-auto aspect-video overflow-hidden rounded-xl shadow-2xl mb-12">
						<Image
							src="/golf_fundraiser.jpg"
							alt="Panoramic view of Grand Valley stadium on game day"
							fill
							style={{ objectFit: "cover" }}
						/>
					</div>
					<h2 className="text-4xl font-semibold mb-8 text-white">
						Grand Valley Alumni Golf Outing
					</h2>
					<p className="text-gray-100 mb-6 max-w-4xl mx-auto leading-relaxed text-lg">
						Join us on June 21, 2025, for the Grand Valley Alumni
						Golf Outing, organized by GVAS. This event unites alumni
						and supporters to raise funds for student-athletes in
						football, women&apos;s basketball, and other sports.
					</p>
					<p className="text-gray-100 max-w-4xl mx-auto leading-relaxed text-lg">
						Sponsorships through the Grand Valley Football Alumni
						Association ensure contributions benefit athletes while
						offering tax benefits.
					</p>
				</div>
			</section>

			{/* Donor Appreciation Dinner */}
			<section className="py-32 bg-white">
				<div className="container mx-auto px-8 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
					<div className="relative w-full max-w-2xl aspect-video overflow-hidden rounded-xl shadow-2xl">
						<Image
							src="/WBB_Finals.jpeg"
							alt="Grand Valley athletes charging onto the field"
							fill
							style={{ objectFit: "cover" }}
						/>
					</div>
					<div className="max-w-2xl">
						<h2 className="text-4xl font-semibold mb-8 text-blue-900">
							GVAS Donor Appreciation Dinner
						</h2>
						<p className="text-gray-600 mb-6 leading-relaxed text-lg">
							The GVAS Donor Appreciation Dinner celebrates our
							supporters and highlights their impact on Grand
							Valley student-athletes. Sponsors via the Grand
							Valley Football Alumni Association qualify for tax
							benefits.
						</p>
						<p className="text-gray-600 leading-relaxed text-lg">
							Stay tuned for details on this upcoming event!
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
