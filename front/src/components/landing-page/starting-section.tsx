import { Button } from "../ui/button";
import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";

export const StartingSection = () => {
	return (
		<section className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-b from-background to-muted">
			<div className="container px-4 md:px-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
					<div className="space-y-4">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Comment ça fonctionne
						</h2>
						<p className="text-muted-foreground md:text-xl">
							Notre plateforme de prêt décentralisée utilise des contrats
							intelligents pour faciliter les prêts et les emprunts sans
							intermédiaires.
						</p>
						<ul className="space-y-4">
							<li className="flex items-start gap-2">
								<div className="rounded-full bg-primary/10 p-1">
									<span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
										1
									</span>
								</div>
								<div className="space-y-1">
									<h3 className="font-medium">Connectez votre wallet</h3>
									<p className="text-sm text-muted-foreground">
										Connectez votre portefeuille crypto pour accéder à la
										plateforme.
									</p>
								</div>
							</li>
							<li className="flex items-start gap-2">
								<div className="rounded-full bg-primary/10 p-1">
									<span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
										2
									</span>
								</div>
								<div className="space-y-1">
									<h3 className="font-medium">Déposez des actifs</h3>
									<p className="text-sm text-muted-foreground">
										Déposez vos actifs cryptographiques pour commencer à gagner
										des intérêts.
									</p>
								</div>
							</li>
							<li className="flex items-start gap-2">
								<div className="rounded-full bg-primary/10 p-1">
									<span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
										3
									</span>
								</div>
								<div className="space-y-1">
									<h3 className="font-medium">Empruntez ou prêtez</h3>
									<p className="text-sm text-muted-foreground">
										Utilisez vos actifs comme garantie pour emprunter ou gagnez
										des intérêts en prêtant.
									</p>
								</div>
							</li>
							<li className="flex items-start gap-2">
								<div className="rounded-full bg-primary/10 p-1">
									<span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
										4
									</span>
								</div>
								<div className="space-y-1">
									<h3 className="font-medium">Gérez vos positions</h3>
									<p className="text-sm text-muted-foreground">
										Suivez et gérez vos positions de prêt et d emprunt via le
										tableau de bord.
									</p>
								</div>
							</li>
						</ul>
						<Button className="mt-4">En savoir plus</Button>
					</div>
					<div className="rounded-lg overflow-hidden border bg-background p-6">
						<div className="space-y-4">
							<div className="space-y-2">
								<h3 className="text-xl font-bold">Simulateur de Prêt</h3>
								<p className="text-sm text-muted-foreground">
									Calculez vos gains potentiels en prêtant vos actifs.
								</p>
							</div>
							<CardHeader>
								<CardHeader>
									<CardTitle>Simulation de Prêt</CardTitle>
									<CardDescription>
										Estimez vos rendements annuels
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="space-y-2">
											<div className="flex justify-between">
												<span className="text-sm">Montant du dépôt</span>
												<span className="text-sm font-medium">10,000 USDC</span>
											</div>
											<div className="flex justify-between">
												<span className="text-sm">APY</span>
												<span className="text-sm font-medium">4.5%</span>
											</div>
											<div className="flex justify-between">
												<span className="text-sm">Durée</span>
												<span className="text-sm font-medium">12 mois</span>
											</div>
										</div>
										<div className="border-t pt-4">
											<div className="flex justify-between font-medium">
												<span>Intérêts estimés</span>
												<span className="text-primary">450 USDC</span>
											</div>
										</div>
									</div>
								</CardContent>
								<CardFooter>
									<Button className="w-full">Commencer à prêter</Button>
								</CardFooter>
							</CardHeader>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
