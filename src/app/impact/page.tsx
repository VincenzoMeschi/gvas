import Image from "next/image";

export default function Impact() {
	return (
		<div className="bg-gray-50">
			{/* Impact Overview */}
			<section className="py-32 bg-white text-center relative">
				<div className="absolute z-0 bottom-0 w-full h-2/3 bg-[#2067CE]" />
				<div className="container mx-auto px-8 relative">
					<h1 className="text-5xl md:text-6xl font-extrabold mb-12 text-[#2067CE]">
						Our Impact
					</h1>
					<div className="relative w-full mx-auto aspect-video overflow-hidden rounded-xl shadow-2xl mb-12">
						<Image
							src="/WBB_National_Champions.jpg"
							alt="Grand Valley football team and fans celebrating a victory"
							fill
							style={{ objectFit: "cover" }}
						/>
					</div>
					<p className="text-lg text-white mb-6 max-w-4xl mx-auto leading-relaxed">
						Since launching in June 2024, GVAS has partnered with 40
						Grand Valley student-athletes, including those in
						football and women&apos;s basketball, providing access to $28,000 in
						nutrtitional benefits in exchange for their work with the GVAS community.
					</p>
					<p className="text-lg text-white max-w-4xl mx-auto leading-relaxed">
						This support enhances nutritional access, boosts
						performance, and fosters a strong sense of community
						for these Grand Valley athletes.
					</p>
				</div>
			</section>

			{/* By the Numbers */}
			<section className="py-32 bg-white">
				<div className="container mx-auto px-8">
					<h2 className="text-4xl font-semibold text-center mb-12 text-blue-900">
						By the Numbers
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
						<div className="bg-white p-10 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200">
							<h3 className="text-6xl font-bold text-blue-900 mb-4">
								40
							</h3>
							<p className="text-gray-600 text-lg">
								Athletes Supported
							</p>
						</div>
						<div className="bg-white p-10 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200">
							<h3 className="text-6xl font-bold text-blue-900 mb-4">
								17
							</h3>
							<p className="text-gray-600 text-lg">
								Generous Investors
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
						All operations are volunteer-driven, ensuring every
						dollar directly benefits our athletes.
					</p>
				</div>
			</section>
		</div>
	);
}
