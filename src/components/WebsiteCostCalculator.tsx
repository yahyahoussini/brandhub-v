import { useState } from "react";
import { Calculator, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { SparklesCore } from "./ui/sparkles";

interface CalculatorResult {
    minPrice: number;
    maxPrice: number;
    timeline: string;
    recommended: string[];
}

const WebsiteCostCalculator = () => {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
        websiteType: "",
        pages: "",
        design: "",
        features: [] as string[],
        timeline: ""
    });
    const [result, setResult] = useState<CalculatorResult | null>(null);

    const calculatePrice = () => {
        let basePrice = 0;
        let complexity = 1;

        switch (answers.websiteType) {
            case "vitrine": basePrice = 1000; break;
            case "corporate": basePrice = 2500; break;
            case "ecommerce": basePrice = 4000; break;
            case "custom": basePrice = 6000; break;
        }

        switch (answers.pages) {
            case "1-5": complexity *= 1; break;
            case "6-10": complexity *= 1.3; break;
            case "11-20": complexity *= 1.6; break;
            case "20+": complexity *= 2; break;
        }

        switch (answers.design) {
            case "template": complexity *= 1; break;
            case "custom": complexity *= 1.5; break;
            case "premium": complexity *= 2; break;
        }

        const featuresCost = answers.features.length * 500;
        const finalMin = Math.round(basePrice * complexity);
        const finalMax = Math.round((basePrice * complexity) + featuresCost + 2000);

        let timeline = "2-3 semaines";
        if (answers.websiteType === "corporate") timeline = "2-3 jours";
        if (answers.websiteType === "ecommerce") timeline = "6-12 jours";
        if (answers.websiteType === "custom") timeline = "2-4 semaines";

        const recommended = [
            "Design responsive mobile-first",
            "Optimisation SEO incluse",
            "Hébergement 1 an offert",
            "Formation à l'utilisation",
            "Support 30 jours gratuit"
        ];

        setResult({ minPrice: finalMin, maxPrice: finalMax, timeline, recommended });
    };

    const handleNext = () => {
        if (step === 5) {
            calculatePrice();
        } else {
            setStep(step + 1);
        }
    };

    const handleReset = () => {
        setStep(1);
        setAnswers({ websiteType: "", pages: "", design: "", features: [], timeline: "" });
        setResult(null);
    };

    const toggleFeature = (feature: string) => {
        setAnswers(prev => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature]
        }));
    };

    if (result) {
        return (
            <section className="py-24 bg-gradient-to-b from-background via-primary/5 to-background">
                <div className="container mx-auto px-4">
                    <Card className="max-w-3xl mx-auto shadow-2xl border-primary/20">
                        <CardContent className="p-8">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Calculator className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold mb-2">Estimation de Votre Projet</h3>
                                <p className="text-muted-foreground">Calculée selon vos besoins spécifiques</p>
                            </div>

                            <div className="bg-gradient-to-r from-primary to-accent p-8 rounded-xl text-white mb-8">
                                <div className="text-center">
                                    <p className="text-lg mb-2 opacity-90">Prix Estimé</p>
                                    <p className="text-5xl font-bold mb-2">
                                        {result.minPrice.toLocaleString()} - {result.maxPrice.toLocaleString()} MAD
                                    </p>
                                    <p className="opacity-90">Délai: {result.timeline}</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <h4 className="font-semibold text-lg">✨ Inclus dans votre projet:</h4>
                                <ul className="space-y-2">
                                    {result.recommended.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="text-primary mt-1">✓</span>
                                            <span className="text-muted-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex gap-4">
                                <Button onClick={handleReset} variant="outline" className="flex-1">
                                    Recalculer
                                </Button>
                                <Button
                                    onClick={() => window.open("https://wa.me/212607076940?text=Bonjour, j'ai utilisé votre calculateur et je souhaite discuter de mon projet.", "_blank")}
                                    className="flex-1 bg-gradient-to-r from-primary to-accent"
                                >
                                    Demander un Devis Gratuit
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>

                            <p className="text-sm text-center text-muted-foreground mt-4">
                                💬 Réponse garantie sous 2 heures • Consultation gratuite
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <div className="relative inline-block mb-6">
                        <div className="w-full h-20 absolute top-0">
                            <SparklesCore
                                background="transparent"
                                minSize={0.4}
                                maxSize={1}
                                particleDensity={800}
                                className="w-full h-full"
                                particleColor="#8b5cf6"
                            />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold relative z-10">
                            Calculateur de{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                                Prix Gratuit
                            </span>
                        </h2>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Obtenez une estimation instantanée du coût de votre site web
                    </p>
                </div>

                <Card className="max-w-2xl mx-auto shadow-2xl border-primary/20">
                    <CardContent className="p-8">
                        <div className="mb-8">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium">Étape {step} sur 5</span>
                                <span className="text-sm text-muted-foreground">{Math.round((step / 5) * 100)}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${(step / 5) * 100}%` }}
                                />
                            </div>
                        </div>

                        {step === 1 && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold">Quel type de site web souhaitez-vous ?</h3>
                                <RadioGroup value={answers.websiteType} onValueChange={(val) => setAnswers({ ...answers, websiteType: val })}>
                                    <div className="space-y-3">
                                        {[
                                            { value: "vitrine", label: "Site Vitrine", desc: "Présentation d'entreprise, portfolio" },
                                            { value: "corporate", label: "Site Corporate", desc: "Site professionnel avec plusieurs sections" },
                                            { value: "ecommerce", label: "E-commerce", desc: "Boutique en ligne avec paiement" },
                                            { value: "custom", label: "Application Web", desc: "Plateforme sur-mesure, SaaS" }
                                        ].map((option) => (
                                            <div key={option.value} className="flex items-center space-x-3 border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                                                <RadioGroupItem value={option.value} id={option.value} />
                                                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                                                    <div className="font-semibold">{option.label}</div>
                                                    <div className="text-sm text-muted-foreground">{option.desc}</div>
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold">Combien de pages environ ?</h3>
                                <RadioGroup value={answers.pages} onValueChange={(val) => setAnswers({ ...answers, pages: val })}>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { value: "1-5", label: "1-5 pages" },
                                            { value: "6-10", label: "6-10 pages" },
                                            { value: "11-20", label: "11-20 pages" },
                                            { value: "20+", label: "Plus de 20" }
                                        ].map((option) => (
                                            <div key={option.value} className="flex items-center space-x-3 border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                                                <RadioGroupItem value={option.value} id={`pages-${option.value}`} />
                                                <Label htmlFor={`pages-${option.value}`} className="cursor-pointer font-medium">
                                                    {option.label}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold">Niveau de design souhaité ?</h3>
                                <RadioGroup value={answers.design} onValueChange={(val) => setAnswers({ ...answers, design: val })}>
                                    <div className="space-y-3">
                                        {[
                                            { value: "template", label: "Design Standard", desc: "Templates modernes adaptés" },
                                            { value: "custom", label: "Design Sur-Mesure", desc: "Design unique créé pour vous" },
                                            { value: "premium", label: "Design Premium", desc: "Design haut de gamme avec animations" }
                                        ].map((option) => (
                                            <div key={option.value} className="flex items-center space-x-3 border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                                                <RadioGroupItem value={option.value} id={`design-${option.value}`} />
                                                <Label htmlFor={`design-${option.value}`} className="flex-1 cursor-pointer">
                                                    <div className="font-semibold">{option.label}</div>
                                                    <div className="text-sm text-muted-foreground">{option.desc}</div>
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold">Fonctionnalités supplémentaires ?</h3>
                                <p className="text-muted-foreground">Sélectionnez tout ce qui s'applique</p>
                                <div className="space-y-3">
                                    {[
                                        "Blog / Actualités",
                                        "Réservation en ligne",
                                        "Espace membre / Login",
                                        "Multilingue (FR/AR/EN)",
                                        "Intégration CRM",
                                        "Chat en direct",
                                        "Paiement en ligne",
                                        "Gestion de stock"
                                    ].map((feature) => (
                                        <div
                                            key={feature}
                                            onClick={() => toggleFeature(feature)}
                                            className={`border rounded-lg p-4 cursor-pointer transition-all ${answers.features.includes(feature)
                                                    ? "border-primary bg-primary/5"
                                                    : "hover:border-primary/50"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${answers.features.includes(feature) ? "border-primary bg-primary" : "border-muted-foreground"
                                                    }`}>
                                                    {answers.features.includes(feature) && (
                                                        <span className="text-white text-xs">✓</span>
                                                    )}
                                                </div>
                                                <span className="font-medium">{feature}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 5 && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold">Quand souhaitez-vous lancer ?</h3>
                                <RadioGroup value={answers.timeline} onValueChange={(val) => setAnswers({ ...answers, timeline: val })}>
                                    <div className="space-y-3">
                                        {[
                                            { value: "urgent", label: "Le plus tôt possible (< 1 semaine)" },
                                            { value: "soon", label: "D'ici 2-4 semaines" },
                                            { value: "flexible", label: "Pas pressé (1-2 mois)" },
                                            { value: "exploring", label: "En phase d'exploration" }
                                        ].map((option) => (
                                            <div key={option.value} className="flex items-center space-x-3 border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                                                <RadioGroupItem value={option.value} id={`timeline-${option.value}`} />
                                                <Label htmlFor={`timeline-${option.value}`} className="cursor-pointer font-medium">
                                                    {option.label}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>
                        )}

                        <div className="flex gap-4 mt-8">
                            {step > 1 && (
                                <Button onClick={() => setStep(step - 1)} variant="outline" className="flex-1">
                                    Retour
                                </Button>
                            )}
                            <Button
                                onClick={handleNext}
                                disabled={
                                    (step === 1 && !answers.websiteType) ||
                                    (step === 2 && !answers.pages) ||
                                    (step === 3 && !answers.design) ||
                                    (step === 5 && !answers.timeline)
                                }
                                className="flex-1 bg-gradient-to-r from-primary to-accent"
                            >
                                {step === 5 ? "Calculer le Prix" : "Suivant"}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="text-center mt-8 text-muted-foreground">
                    <p className="text-sm">✓ Gratuit • ✓ Sans engagement • ✓ Réponse sous 2h</p>
                </div>
            </div>
        </section>
    );
};

export default WebsiteCostCalculator;
