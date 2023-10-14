import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Ecommerce",
	description: "Next13Master ecommerce project",
};

export default function RootLayout({
	children,
	modal,
}: {
	children: React.ReactNode;
	modal: React.ReactNode;
}) {
	return (
		<ClerkProvider
			appearance={{
				variables: { colorPrimary: "#D97706" },
				elements: {
					formButtonPrimary:
						"bg-amber-600 border border-amber-600 border-solid hover:bg-white hover:text-black",
					socialButtonsBlockButtonText: "font-semibold",
					formButtonReset:
						"bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
					card: "bg-white",
				},
			}}
		>
			<html lang="en">
				<body className={inter.className}>
					<Header />
					<main className="flex min-h-screen flex-col items-center justify-between">
						{children}
					</main>
					<Footer />
					{modal}
				</body>
			</html>
		</ClerkProvider>
	);
}
