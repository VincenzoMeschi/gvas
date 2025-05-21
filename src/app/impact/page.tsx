import Image from "next/image";

export default function Impact() {
	return (
		<div className="bg-gray-50">
			{/* Impact Overview */}
			<section className="py-32 bg-white text-center">
				<div className="container mx-auto px-8">
					<h1 className="text-5xl md:text-6xl font-extrabold mb-12 text-gray-900">
						Our Impact
					</h1>
					<div className="relative w-full max-w-2xl mx-auto aspect-square overflow-hidden rounded-xl shadow-2xl mb-12">
						<Image
							src="/GV_Football_Players_Win.jpg"
							alt="Grand Valley football team and fans celebrating a victory"
							fill
							style={{ objectFit: "cover" }}
						/>
					</div>
					<p className="text-lg text-gray-600 mb-6 max-w-4xl mx-auto leading-relaxed">
						Since our inception in June 2024, GVAS has made a
						significant impact on Grand Valley football
						student-athletes. In our inaugural year, we supported 19
						athletes by providing $100 food cards every two weeks,
						totaling $28,000 in food assistance.
					</p>
					<p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
						This initiative has improved their nutritional intake,
						helping them sustain peak performance, while fostering a
						sense of community and support within Grand Valley
						Athletics.
					</p>
				</div>
			</section>

			{/* By the Numbers */}
			<section className="py-32 bg-gray-100">
				<div className="container mx-auto px-8">
					<h2 className="text-4xl font-semibold text-center mb-12 text-blue-900">
						By the Numbers
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
						<div className="bg-white p-10 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200">
							<h3 className="text-6xl font-bold text-blue-900 mb-4">
								19
							</h3>
							<p className="text-gray-600 text-lg">
								Football Athletes Supported
							</p>
						</div>
						<div className="bg-white p-10 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200">
							<h3 className="text-6xl font-bold text-blue-900 mb-4">
								$57,000
							</h3>
							<p className="text-gray-600 text-lg">
								Raised from 17 Donors
							</p>
						</div>
						<div className="bg-white p-10 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200">
							<h3 className="text-6xl font-bold text-blue-900 mb-4">
								$28,000
							</h3>
							<p className="text-gray-600 text-lg">
								Allocated for Food Support
							</p>
						</div>
					</div>
					<p className="text-center text-gray-600 mt-12 leading-relaxed text-lg">
						All operations are volunteer-driven, ensuring maximum
						resources go directly to supporting our athletes.
					</p>
				</div>
			</section>
		</div>
	);
}
