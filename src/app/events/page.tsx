import Image from "next/image";

export default function Events() {
	return (
		<div className="bg-gray-50">
			{/* Golf Outing Section */}
			<section className="py-32 bg-white">
				<div className="container mx-auto px-8 text-center">
					<h1 className="text-5xl md:text-6xl font-extrabold mb-12 text-gray-900">
						Fundraising Events
					</h1>
					<div className="relative w-full max-w-4xl mx-auto aspect-video overflow-hidden rounded-xl shadow-2xl mb-12">
						<Image
							src="/Landscape_of_Stadium.jpeg"
							alt="Panoramic view of Grand Valley stadium on game day"
							fill
							style={{ objectFit: "cover" }}
						/>
					</div>
					<h2 className="text-4xl font-semibold mb-8 text-blue-900">
						Grand Valley Football Alumni Golf Outing
					</h2>
					<p className="text-gray-600 mb-6 max-w-4xl mx-auto leading-relaxed text-lg">
						Join us on June 21, 2025, for the Grand Valley Football
						Alumni Golf Outing, organized by GVAS. This event
						connects alumni with current athletes, raising funds to
						support our mission of providing essential resources to
						football student-athletes.
					</p>
					<p className="text-gray-600 max-w-4xl mx-auto leading-relaxed text-lg">
						The Football Alumni Association can sponsor this event,
						ensuring all contributions benefit our athletes while
						providing tax benefits for donors.
					</p>
				</div>
			</section>

			{/* Donor Appreciation Dinner */}
			<section className="py-32 bg-gray-100">
				<div className="container mx-auto px-8 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
					<div className="relative w-full max-w-2xl aspect-video overflow-hidden rounded-xl shadow-2xl">
						<Image
							src="/GV_Football_Run_From_Tunnel.jpeg"
							alt="Football players charging onto field with American flag"
							fill
							style={{ objectFit: "cover" }}
						/>
					</div>
					<div className="max-w-2xl">
						<h2 className="text-4xl font-semibold mb-8 text-blue-900">
							GVAS Donor Appreciation Dinner
						</h2>
						<p className="text-gray-600 mb-6 leading-relaxed text-lg">
							The GVAS Donor Appreciation Dinner is a special
							event to honor our supporters and showcase the
							impact of their contributions. Donors can sponsor
							this event through the Grand Valley Football Alumni
							Association, ensuring their support benefits
							student-athletes while qualifying for tax benefits.
						</p>
						<p className="text-gray-600 leading-relaxed text-lg">
							Stay tuned for more details on this upcoming event!
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
