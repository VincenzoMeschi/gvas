import Image from "next/image";

export default function Events() {
	const images = [
		{
			title: "Group photo",
			url: "https://res.cloudinary.com/dazxax791/image/upload/v1754545301/IMG_3597_kv7jix.jpg",
		},
		{
			title: "Coach Wooster",
			url: "https://res.cloudinary.com/dazxax791/image/upload/v1754545301/IMG_3605_jetpkk.jpg",
		},
		{
			title: "Group photo",
			url: "https://res.cloudinary.com/dazxax791/image/upload/v1754545301/IMG_3601_llhbcc.jpg",
		},
		{
			title: "Group Photo",
			url: "https://res.cloudinary.com/dazxax791/image/upload/v1754545301/IMG_3606_om9qjf.jpg",
		},
		{
			title: "Group Photo",
			url: "https://res.cloudinary.com/dazxax791/image/upload/v1754545301/IMG_3658_zlehhz.jpg",
		},
		{
			title: "Group Photo",
			url: "https://res.cloudinary.com/dazxax791/image/upload/v1754545301/IMG_3655_q3012r.jpg",
		},
		{
			title: "Group Photo",
			url: "https://res.cloudinary.com/dazxax791/image/upload/v1754545302/IMG_3620_tc7odv.jpg",
		},
		{
			title: "Group Photo",
			url: "https://res.cloudinary.com/dazxax791/image/upload/v1754545303/IMG_3700_eb8f81.jpg",
		},
		{
			title: "Group Photo",
			url: "https://res.cloudinary.com/dazxax791/image/upload/v1754545303/IMG_3731_uze2ez.jpg",
		},
		{
			title: "Group Photo",
			url: "https://res.cloudinary.com/dazxax791/image/upload/v1754545303/IMG_3766_zq8tzn.jpg",
		},
		{
			title: "Group Photo",
			url: "https://res.cloudinary.com/dazxax791/image/upload/v1754545302/IMG_3666_oa7jpu.jpg",
		},
		{
			title: "Group Photo",
			url: "https://res.cloudinary.com/dazxax791/image/upload/v1754545303/IMG_3720_s7qnwd.jpg",
		},
		{
			title: "Group Photo",
			url: "https://res.cloudinary.com/dazxax791/image/upload/v1754545302/IMG_3684_e7pne6.jpg",
		},
		{
			title: "Group Photo",
			url: "https://res.cloudinary.com/dazxax791/image/upload/v1754545302/IMG_3625_qqboxq.jpg",
		},
		{
			title: "Group Photo",
			url: "https://res.cloudinary.com/dazxax791/image/upload/v1754545302/IMG_3690_se5teq.jpg",
		},
		{
			title: "Group Photo",
			url: "https://res.cloudinary.com/dazxax791/image/upload/v1754545302/IMG_3663_htuwu5.jpg",
		},
		{
			title: "Stadium View",
			url: "https://res.cloudinary.com/dazxax791/image/upload/v1741934404/popsilhfutww1ita2wjo.jpg",
		},
		{
			title: "Previous Year with Coaches",
			url: "https://res.cloudinary.com/dazxax791/image/upload/f_auto,q_auto/ku9ne1qkkqvdstpfso1d",
		},
		{
			title: "Golf Ball Close-Up",
			url: "https://res.cloudinary.com/dazxax791/image/upload/v1741935419/emybx2qs4km8ofeqeg5n.jpg",
		},
		{
			title: "Cookout Group",
			url: "https://res.cloudinary.com/dazxax791/image/upload/f_auto,q_auto/dhinuds7e2r87gsompld",
		},
	];

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
						Grand Valley Alumni Association Golf Outing
					</h2>
					<p className="text-gray-100 mb-6 max-w-4xl mx-auto leading-relaxed text-lg">
						Join us on June 17, 2026, for the Grand Valley Alumni Association
						Golf Outing, organized by the GV Football Alumni Association. This event unites alumni
						and all supporters to raise funds for student-athletes in
						football, women&apos;s basketball, and other sports.
					</p>
					<button className="w-full h-full flex justify-center pt-15">
						<a
							className="bg-blue-900 text-white px-10 py-5 rounded-lg font-semibold text-xl shadow-md hover:bg-blue-800 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 w-full md:w-fit hover:cursor-pointer"
							href="https://www.golf.gvathleticsociety.com">
							Register!
						</a>
					</button>
				</div>
			</section>

			{/* Donor Appreciation Dinner */}
			<section className="py-32 bg-white">
				<div className="container mx-auto px-8 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
					{/* <div className="w-full h-[35rem] relative rounded-xl shadow-2xl">
						<Image
							src="/dinner_brochure.jpg"
							alt="Dinner graphic"
							fill
							className="object-contain"
						/>
					</div> */}
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

			{/* Event Gallery Section */}
			<section className="py-32 bg-gray-50">
				<div className="container mx-auto px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2067CE]">
							Event Gallery
						</h2>
						<p className="text-gray-600 text-lg max-w-3xl mx-auto">
							Take a look at some memorable moments from our past
							events, showcasing the Grand Valley community coming
							together to support our student-athletes.
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{images.map((image, index) => (
							<div
								key={index}
								className="group relative aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
								<Image
									src={image.url}
									alt={image.title}
									fill
									className="object-cover transition-transform duration-300 group-hover:scale-105"
									sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
								/>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
