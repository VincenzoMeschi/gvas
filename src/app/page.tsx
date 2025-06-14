import Link from "next/link";
import Image from "next/image";

export default function Home() {
	return (
		<div className="bg-gray-50">
			{/* Hero Section */}
			<section className="bg-white text-[#2067CE] pt-32 relative">
				<div className="z-0 absolute bottom-0 w-full h-1/3 sm:h-1/2 bg-[#2067CE]" />
				<div className="container mx-auto px-8 text-center">
					<h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-12 text-[#2067CE]">
						Grand Valley Athletic Society
					</h1>
					<p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-blue-400">
						Empowering Grand Valley student-athletes, including
						football and women&apos;s basketball, through essential
						support and NIL opportunities.
					</p>
					<div className="relative w-full max-w-6xl mx-auto aspect-video overflow-hidden rounded-xl shadow-2xl">
						<Image
							src="/Alumni_Cookout_Group_Image.jpeg"
							alt="Grand Valley alumni and athletes at a community event"
							fill
							style={{ objectFit: "cover" }}
							priority
						/>
					</div>
					<Link href="/get-involved">
						<button className="mt-12 bg-blue-300 text-blue-900 px-10 py-5 rounded-lg font-semibold text-xl shadow-md hover:bg-blue-400 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:cursor-pointer">
							Support Our Athletes
						</button>
					</Link>
				</div>
			</section>

			{/* Overview Section */}
			<section className="py-32 bg-white">
				<div className="container mx-auto px-8">
					<h2 className="text-5xl font-bold text-center mb-16 text-[#2067CE]">
						Discover GVAS
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
						<div className="text-center bg-gray-50 p-10 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200">
							<h3 className="text-3xl font-semibold mb-6 text-blue-900">
								Our Mission
							</h3>
							<p className="text-gray-600 mb-8 leading-relaxed text-lg">
								Learn how GVAS supports Grand Valley
								student-athletes in football, women&apos;s
								basketball, and beyond with resources like
								nutrition assistance.
							</p>
							<Link
								href="/about"
								className="text-blue-300 hover:text-blue-400 font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-blue-400">
								Read More
							</Link>
						</div>
						<div className="text-center bg-gray-50 p-10 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200">
							<h3 className="text-3xl font-semibold mb-6 text-blue-900">
								Our Impact
							</h3>
							<p className="text-gray-600 mb-8 leading-relaxed text-lg">
								Discover how we&apos;ve supported 40 athletes
								with $28,000 in food assistance in our inaugural
								year.
							</p>
							<Link
								href="/impact"
								className="text-blue-300 hover:text-blue-400 font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-blue-400">
								Learn More
							</Link>
						</div>
						<div className="text-center bg-gray-50 p-10 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200">
							<h3 className="text-3xl font-semibold mb-6 text-blue-900">
								Get Involved
							</h3>
							<p className="text-gray-600 mb-8 leading-relaxed text-lg">
								Join us in uplifting Grand Valley athletes
								through donations, events, or volunteering.
							</p>
							<Link
								href="/get-involved"
								className="text-blue-300 hover:text-blue-400 font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-blue-400">
								Get Involved
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
