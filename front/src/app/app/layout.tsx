import { Header } from "@/components/dashboard/header";
import { Footer } from "@/components/footer";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			<main className="flex flex-col justify-center items-center md:px-24 px-4 py-10">
				{children}
			</main>
			<Footer />
		</>
	);
}
