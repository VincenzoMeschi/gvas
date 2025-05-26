import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/app/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Grand Valley Athletic Society",
	description:
		"Supporting Grand Valley football student-athletes through NIL initiatives.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} flex flex-col min-h-screen bg-gray-50 antialiased`}>
				{/* Header */}
				<header className="bg-[#2067CE] text-white sticky top-0 z-50 shadow-lg">
					<div className="container mx-auto px-8 py-6 flex justify-between items-center">
						<div className="text-4xl font-extrabold tracking-tight">
							<Link href="/">GVAS</Link>
						</div>
						<Navigation />
					</div>
				</header>

				{/* Main Content */}
				<main className="flex-grow">{children}</main>

				{/* Footer Wave */}
				<div className="relative w-full h-56 overflow-hidden bg-white">
					<Image
						src="/GVAS_Bottom_Wave.svg"
						alt="Decorative footer wave"
						fill
						style={{ objectFit: "cover" }}
						priority
					/>
				</div>

				{/* Footer */}
				<footer className="bg-[#2067CE] text-white pb-12">
					<div className="container mx-auto px-8 text-center">
						<p className="mb-8 text-gray-200 text-lg">
							© 2025 Grand Valley Athletic Society. All rights
							reserved.
						</p>
						<div className="flex justify-center space-x-8">
							<Link
								href="/about"
								className="text-gray-200 hover:text-blue-300 transition-colors duration-200 border-b-2 border-transparent hover:border-blue-300">
								About
							</Link>
							<Link
								href="/impact"
								className="text-gray-200 hover:text-blue-300 transition-colors duration-200 border-b-2 border-transparent hover:border-blue-300">
								Impact
							</Link>
							<Link
								href="/get-involved"
								className="text-gray-200 hover:text-blue-300 transition-colors duration-200 border-b-2 border-transparent hover:border-blue-300">
								Get Involved
							</Link>
						</div>
					</div>
				</footer>
			</body>
		</html>
	);
}
