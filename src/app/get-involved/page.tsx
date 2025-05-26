import Image from "next/image";

export default function GetInvolved() {
	return (
		<div className="bg-gray-50">
			<section className="py-32 bg-white text-center">
				<div className="container mx-auto px-8">
					<h1 className="text-5xl md:text-6xl font-extrabold mb-12 text-[#2067CE]">
						Get Involved
					</h1>
					<p className="text-lg text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
						Your support can make a difference in the lives of Grand
						Valley football student-athletes. Whether through
						donations, volunteering, or spreading the word, every
						contribution helps us achieve our goals.
					</p>
					<div className="relative w-full max-w-2xl mx-auto aspect-video overflow-hidden rounded-xl shadow-2xl mb-12">
						<Image
							src="/GV_Football_Run_From_Tunnel.jpeg"
							alt="Grand Valley players running out of tunnel to kickoff"
							fill
							style={{ objectFit: "cover" }}
						/>
					</div>
					<div className="bg-white p-10 rounded-xl shadow-xl inline-block text-left max-w-2xl w-full">
						<h2 className="text-3xl font-semibold mb-8 text-blue-900">
							Contact Us
						</h2>
						<p className="text-gray-600 mb-4 text-lg">
							<strong>Email:</strong> grandvalleyas@gmail.com
						</p>
						<p className="text-gray-600 mb-4 text-lg">
							<strong>Curtis Holt:</strong> 616-788-3917,
							holtcurtis@sbcglobal.net
						</p>
						<p className="text-gray-600 mb-4 text-lg">
							<strong>Bill Hudson:</strong> 517-256-7052,
							billhudson50@gmail.com
						</p>
						<p className="text-gray-600 mb-8 text-lg">
							<strong>Darrell Niedzwiecki:</strong> 513-418-1805,
							drniedzwiecki@gmail.com
						</p>
						<h2 className="text-3xl font-semibold mb-8 text-blue-900">
							Donate
						</h2>
						<p className="text-gray-600 mb-4 text-lg">
							<strong>By Check:</strong> Grand Valley Athletic
							Society, 2538 Lakeside Drive, Stanton, MI 48888
						</p>
						<p className="text-gray-600 mb-8 text-lg">
							<strong>Venmo:</strong> @GVASociety
						</p>
						<button className="bg-blue-900 text-white px-10 py-5 rounded-lg font-semibold text-xl shadow-md hover:bg-blue-800 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 w-full">
							Donate Now
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}
