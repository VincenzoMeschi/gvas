import Image from "next/image";

export default function Goals() {
	return (
		<div className="bg-gray-50">
			<section className="py-32 bg-white text-center relative">
				<div className="absolute z-0 bottom-0 w-full h-1/3 bg-[#2067CE]" />
				<div className="container mx-auto px-8 relative">
					<h1 className="text-5xl md:text-6xl font-extrabold mb-12 text-[#2067CE]">
						Our Goals for 2025-2026
					</h1>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
						<div className="bg-white p-10 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200">
							<h3 className="text-3xl font-semibold mb-6 text-blue-900">
								Support 50 Athletes
							</h3>
							<p className="text-gray-600 leading-relaxed text-lg">
								Expand our program to support 50
								student-athletes across sports like football and
								women&apos;s basketball with nutrition
								assistance.
							</p>
						</div>
						<div className="bg-white p-10 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200">
							<h3 className="text-3xl font-semibold mb-6 text-blue-900">
								Raise $150,000
							</h3>
							<p className="text-gray-600 leading-relaxed text-lg">
								Secure $150,000 to fund nutrition support,
								emergency needs, and administrative costs for
								our athletes.
							</p>
						</div>
						<div className="bg-white p-10 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200">
							<h3 className="text-3xl font-semibold mb-6 text-blue-900">
								Expand to All Sports
							</h3>
							<p className="text-gray-600 leading-relaxed text-lg">
								Serve as a model for all Grand Valley athletic
								programs, including women&apos;s basketball, to
								establish similar NIL support systems.
							</p>
						</div>
					</div>
					<div className="relative w-full max-w-2xl mx-auto aspect-video overflow-hidden rounded-xl shadow-2xl">
						<Image
							src="/WBB_Conf_Champs.jpeg"
							alt="Grand Valley athletes celebrating together"
							fill
							style={{ objectFit: "cover" }}
						/>
					</div>
				</div>
			</section>
		</div>
	);
}
