"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
	{ href: "/", label: "Home" },
	{ href: "/about", label: "About" },
	{ href: "/impact", label: "Impact" },
	{ href: "/goals", label: "Goals" },
	{ href: "/events", label: "Events" },
	{ href: "/get-involved", label: "Get Involved" },
];

export default function Navigation() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<>
			{/* Desktop Menu */}
			<ul className="hidden md:flex space-x-10 text-lg font-medium">
				{navItems.map((item) => (
					<li key={item.href}>
						<Link
							href={item.href}
							className="hover:text-blue-300 transition-colors duration-200 border-b-2 border-transparent hover:border-blue-300">
							{item.label}
						</Link>
					</li>
				))}
			</ul>

			{/* Hamburger Button */}
			<button
				className="md:hidden z-50 focus:outline-none"
				onClick={toggleMobileMenu}
				aria-label="Toggle mobile menu">
				<div className="w-8 h-8 flex flex-col justify-center items-center space-y-1.5">
					<span
						className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
							isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
						}`}></span>
					<span
						className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
							isMobileMenuOpen ? "opacity-0" : ""
						}`}></span>
					<span
						className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
							isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
						}`}></span>
				</div>
			</button>

			{/* Mobile Menu */}
			<div
				className={`md:hidden fixed top-0 right-0 h-full w-64 bg-[#2067CE] z-40 transform transition-transform duration-300 drop-shadow-2xl ${
					isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
				}`}>
				<ul className="flex flex-col items-center space-y-6 pt-20 text-lg font-medium">
					{navItems.map((item) => (
						<li key={item.href}>
							<Link
								href={item.href}
								className="hover:text-blue-300 transition-colors duration-200 border-b-2 border-transparent hover:border-blue-300"
								onClick={() => setIsMobileMenuOpen(false)}>
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
