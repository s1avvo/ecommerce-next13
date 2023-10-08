"use client";
import React from "react";
import { useRouter } from "next/navigation";

export const CartModal = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	return (
		<>
			<div onClick={() => router.back()} className="absolute inset-0 bg-neutral-200 opacity-70" />
			<div className="absolute right-0 top-0 h-screen w-full max-w-xl bg-white">{children}</div>
		</>
	);
};
