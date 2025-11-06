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
					<div className="relative w-full max-h-[35rem] mx-auto aspect-square overflow-hidden rounded-xl shadow-2xl mb-12">
						<Image
							src="/GV_Football_Players_Win.jpg"
							alt="Grand Valley athlete smiling before a game"
							fill
							style={{ objectFit: "cover" }}
							priority
						/>
					</div>
					<p className="text-lg text-white mb-8 max-w-4xl mx-auto leading-relaxed">
						The Grand Valley Athletic Society (GVAS) supports
						student-athletes across sports, including football and
						women&apos;s basketball, by providing essential
						resources like nutrition assistance through NIL
						initiatives.
					</p>
					<p className="text-lg text-white max-w-4xl mx-auto leading-relaxed">
						Our mission is to foster excellence, build community,
						and empower athletes to succeed on and off the field.
					</p>
				</div>
			</section>

			{/* History Section */}
			<section className="py-32 bg-gray-100">
				<div className="container mx-auto px-8 flex flex-col md:flex-row items-center gap-12">
					<div className="relative w-96 aspect-square overflow-hidden rounded-xl shadow-2xl">
						<Image
							src="/WBB_Semi_Finals.jpeg"
							alt="Grand Valley athletes entering the field"
							fill
							style={{ objectFit: "cover" }}
						/>
					</div>
					<div className="max-w-2xl text-gray-600">
						<h2 className="text-4xl font-semibold mb-8 text-blue-900 text-center md:text-left">
							Our History
						</h2>
						<p className="mb-6 leading-relaxed text-lg">
							Founded in June 2024, GVAS is a Name, Image, and
							Likeness (NIL) collective supporting Grand Valley
							student-athletes. In our first year, we worked with 40
							athletes who earned $28,000 in food gift cards, funded by
							17 generous investors.
						</p>
						<p className="leading-relaxed text-lg">
							Operating as an LLC, GVAS complies with NCAA
							regulations and works independently from GVSU to
							maximize support for our athletes.
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
							src="/GV_Football_Player_Pregame.jpg"
							alt="Grand Valley athletes cheering together"
							fill
							style={{ objectFit: "cover" }}
						/>
					</div>
					<p className="text-gray-600 mb-6 max-w-4xl mx-auto leading-relaxed text-lg">
						In NCAA Division II, NIL collectives are vital for
						attracting top talent. GVAS competes by offering robust
						support to athletes in football, women&apos;s
						basketball, and other sports.
					</p>
					<p className="text-gray-600 max-w-4xl mx-auto leading-relaxed text-lg">
						We represent the values of GVSU Athletics in its "relentless pursuit of greatness", top-tier facilities, 
						and a vibrant program culture to make GVAS the premier choice for student athletes
					</p>
				</div>
			</section>
		</div>
	);
}
