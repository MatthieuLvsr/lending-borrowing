import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatAddress = (address: string) => {
	return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};
