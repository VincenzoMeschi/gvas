import Image from "next/image";

export default function About() {
	return (
		<div className="bg-gray-50">
			{/* Mission Section */}
			<section className="py-32 bg-white relative">
				<div className="absolute z-0 bottom-0 w-full h-2/3 bg-[#2067CE]" />

				<div className="container mx-auto px-8 text-center relative">
					<h1 className="text-5xl md:text-6xl font-extrabold mb-12 text-[#2067CE]">
						About GVAS
					</h1>
					<div className="relative w-full max-w-2xl mx-auto aspect-square overflow-hidden rounded-xl shadow-2xl mb-12">
						<Image
							src="/GV_Football_Player_Pregame_Smiling.JPG"
							alt="Grand Valley football player smiling before game"
							fill
							style={{ objectFit: "cover" }}
							priority
						/>
					</div>
					<p className="text-lg text-white mb-8 max-w-4xl mx-auto leading-relaxed">
						The Grand Valley Athletic Society (GVAS) is dedicated to
						assisting Grand Valley football student-athletes by
						addressing their essential needs, such as nutrition,
						while attracting top talent to our program. We aim to
						foster a culture of excellence and community, empowering
						athletes to thrive both on and off the field.
					</p>
					<p className="text-lg text-white max-w-4xl mx-auto leading-relaxed">
						By focusing on fundamental needs like nutrition, GVAS
						not only enhances athletic performance but also builds a
						sense of belonging and support within the Grand Valley
						Athletics community.
					</p>
				</div>
			</section>

			{/* History Section */}
			<section className="py-32 bg-gray-100">
				<div className="container mx-auto px-8 flex flex-col md:flex-row items-center gap-12">
					<div className="relative w-96 aspect-square overflow-hidden rounded-xl shadow-2xl">
						<Image
							src="/GV_Football_Run_Tunnel.jpeg"
							alt="Grand Valley football players running through tunnel"
							fill
							style={{ objectFit: "cover" }}
						/>
					</div>
					<div className="max-w-2xl text-gray-600">
						<h2 className="text-4xl font-semibold mb-8 text-blue-900 text-center md:text-left">
							Our History
						</h2>
						<p className="mb-6 leading-relaxed text-lg">
							GVAS was established in June 2024 as a Name, Image,
							and Likeness (NIL) cooperative to provide financial
							support to Grand Valley football student-athletes,
							adhering to NCAA standards and state laws. In our
							inaugural year, we supported 19 football players
							with $28,000 in food gift cards, thanks to the
							generosity of 17 donors who contributed over
							$57,000.
						</p>
						<p className="leading-relaxed text-lg">
							Operating as an LLC, GVAS remains a separate entity
							from GVSU and the GV Football Alumni Association,
							ensuring compliance with NCAA regulations while
							maximizing support for our athletes.
						</p>
					</div>
				</div>
			</section>

			{/* Competitive Landscape */}
			<section className="py-32 bg-white">
				<div className="container mx-auto px-8 text-center">
					<h2 className="text-4xl font-semibold mb-12 text-blue-900">
						The Competitive Landscape
					</h2>
					<div className="relative w-full max-w-4xl mx-auto aspect-video overflow-hidden rounded-xl shadow-2xl mb-12">
						<Image
							src="/GV_Football_Players_Hype.JPG"
							alt="Grand Valley football players huddled and cheering"
							fill
							style={{ objectFit: "cover" }}
						/>
					</div>
					<p className="text-gray-600 mb-6 max-w-4xl mx-auto leading-relaxed text-lg">
						GVAS operates in a challenging environment where NCAA
						Division II schools increasingly rely on collectives to
						attract top athletes. These collectives provide
						significant support, making it imperative for GVAS to
						compete effectively.
					</p>
					<p className="text-gray-600 max-w-4xl mx-auto leading-relaxed text-lg">
						Our approach emphasizes not only financial assistance
						but also creating a culture of excellence. By
						highlighting Grand Valley’s values, exceptional
						facilities, and program culture, we aim to be the
						destination of choice for prospective athletes.
					</p>
				</div>
			</section>
		</div>
	);
}
