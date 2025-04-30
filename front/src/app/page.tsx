import { Footer } from "@/components/footer";
import { AvailableActifSection } from "@/components/landing-page/available-actif-section";
import { HeroSection } from "@/components/landing-page/hero-section";
import { Navbar } from "@/components/landing-page/navbar";
import { StartingSection } from "@/components/landing-page/starting-section";
import { StatSection } from "@/components/landing-page/stat-section";

export default function Home() {
	return (
		<>
			<Navbar />
			<main className="flex-1">
				<HeroSection />
				<StatSection />
				<AvailableActifSection />
				<StartingSection />
			</main>
			<Footer />
		</>
	);
}
