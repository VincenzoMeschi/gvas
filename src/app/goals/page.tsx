import Image from "next/image";

export default function Goals() {
	return (
		<div className="bg-gray-50">
			<section className="py-32 bg-white text-center">
				<div className="container mx-auto px-8">
					<h1 className="text-5xl md:text-6xl font-extrabold mb-12 text-gray-900">
						Our Goals for 2025-2026
					</h1>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
						<div className="bg-white p-10 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200">
							<h3 className="text-3xl font-semibold mb-6 text-blue-900">
								Support 50 Athletes
							</h3>
							<p className="text-gray-600 leading-relaxed text-lg">
								Expand our food assistance program to support 50
								football athletes, ensuring upperclassmen have
								the nutrition they need to excel.
							</p>
						</div>
						<div className="bg-white p-10 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200">
							<h3 className="text-3xl font-semibold mb-6 text-blue-900">
								Raise $150,000
							</h3>
							<p className="text-gray-600 leading-relaxed text-lg">
								Secure $150,000 to fund our expanded program,
								including food support, one-time emergency
								needs, and administrative costs.
							</p>
						</div>
						<div className="bg-white p-10 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200">
							<h3 className="text-3xl font-semibold mb-6 text-blue-900">
								Collaborate with Other Sports
							</h3>
							<p className="text-gray-600 leading-relaxed text-lg">
								Integrate programs like Grand Valley Girls
								Basketball into GVAS as a model for other
								sports, sharing administrative resources while
								maintaining separate funds.
							</p>
						</div>
					</div>
					<div className="relative w-full max-w-2xl mx-auto aspect-video overflow-hidden rounded-xl shadow-2xl">
						<Image
							src="/GV_Football_Players_Win.jpg"
							alt="Grand Valley football players celebrating after a win"
							fill
							style={{ objectFit: "cover" }}
						/>
					</div>
				</div>
			</section>

			<section className="py-32 bg-gray-100">
				<div className="container mx-auto px-8">
					<h2 className="text-4xl font-semibold text-center mb-12 text-blue-900">
						Challenges and Solutions
					</h2>
					<div className="max-w-4xl mx-auto text-gray-600">
						<h3 className="text-3xl font-semibold mb-6 text-blue-900">
							Challenge: Nonprofit Status
						</h3>
						<p className="mb-6 leading-relaxed text-lg">
							GVAS operates as an LLC, not a nonprofit, which
							limits tax benefits for donors. Several large
							investors have indicated they would invest more if
							donations were tax-deductible.
						</p>
						<h3 className="text-3xl font-semibold mb-6 text-blue-900">
							Solution: Sponsorship Opportunities
						</h3>
						<p className="leading-relaxed text-lg">
							GVAS is creating sponsorship opportunities that
							allow organizations like the Grand Valley Football
							Alumni Association to purchase sponsorships for
							events such as the Football Alumni Golf Outing. This
							enables donors to contribute to a nonprofit (like
							the Alumni Association) while indirectly supporting
							GVAS, qualifying for tax benefits.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
