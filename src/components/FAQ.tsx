import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { SparklesCore } from "./ui/sparkles";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "Quels services propose BrandHub à Casablanca et au Maroc ?",
        answer: "BrandHub.ma est une agence digitale complète basée au Maroc. Nous offrons des services de développement web sur-mesure, création d'identité de marque (branding), design graphique, marketing digital, SEO, développement d'applications mobiles, et solutions e-commerce. Nous servons des clients à Casablanca, Rabat, Marrakech et dans toute l'Afrique, l'Europe et le Moyen-Orient."
    },
    {
        question: "Combien coûte la création d'un site web professionnel au Maroc ?",
        answer: "Le coût d'un site web dépend de vos besoins spécifiques. Un site vitrine professionnel commence à partir de 1 000 MAD, tandis qu'une boutique e-commerce complète peut varier entre 2 000 et 7 000 MAD. Nous proposons des devis gratuits personnalisés adaptés à votre budget et vos objectifs. Contactez-nous pour une estimation précise."
    },
    {
        question: "Combien de temps faut-il pour développer un site web ?",
        answer: "Le délai de développement varie selon la complexité du projet. Un site vitrine simple prend généralement 2-3 semaines, un site corporate 2-3 jours, et une plateforme e-commerce complète 6-12 jours. Nous travaillons en méthodologie agile pour vous livrer rapidement tout en maintenant la qualité."
    },
    {
        question: "Proposez-vous des services de maintenance après la livraison ?",
        answer: "Oui ! Nous offrons des contrats de maintenance mensuels incluant mises à jour de sécurité, sauvegardes régulières, optimisation des performances, support technique prioritaire, et ajout de nouvelles fonctionnalités. Notre équipe reste à votre disposition 24/7 pour assurer le bon fonctionnement de votre site."
    },
    {
        question: "BrandHub travaille-t-il avec des clients internationaux ?",
        answer: "Absolument ! Bien que basés au Maroc (Casablanca), nous travaillons avec des clients au Maroc, en Espagne, Arabie Saoudite, Allemagne, Italie, et dans toute l'Afrique. Nous offrons nos services en français, arabe, anglais, espagnol, allemand et italien. Notre expérience internationale garantit des solutions adaptées à chaque marché."
    },
    {
        question: "Quelles technologies utilisez-vous pour le développement web ?",
        answer: "Nous utilisons les technologies les plus récentes et performantes : React, Next.js, TypeScript pour le frontend ; Node.js, PostgreSQL, Firebase pour le backend ; et des solutions cloud comme Vercel et AWS. Nous maîtrisons également l'IA (OpenAI, TensorFlow), le design (Figma, Adobe Creative Suite), et l'analyse de données (Python, Tableau)."
    },
    {
        question: "Offrez-vous des services de référencement SEO au Maroc ?",
        answer: "Oui, nous sommes experts en SEO local et international. Nos services incluent audit SEO complet, optimisation on-page et technique, création de contenu optimisé, link building, SEO local pour Google My Business, et reporting mensuel détaillé. Nous vous aidons à dominer les résultats de recherche au Maroc et à l'international."
    },
    {
        question: "Comment se déroule le processus de création d'une identité de marque ?",
        answer: "Notre processus de branding comprend 5 étapes : (1) Découverte et recherche de votre marché, (2) Définition de la stratégie de marque, (3) Création de l'identité visuelle (logo, couleurs, typographie), (4) Développement de la charte graphique complète, (5) Application sur tous vos supports. Nous vous impliquons à chaque étape pour garantir un résultat aligné avec votre vision."
    },
    {
        question: "Puis-je gérer mon site web moi-même après la livraison ?",
        answer: "Oui ! Nous créons des sites avec des systèmes de gestion de contenu (CMS) intuitifs. Nous vous formons à l'utilisation de votre site et fournissons une documentation complète en français. Vous pourrez facilement ajouter des articles de blog, modifier du contenu, gérer vos produits e-commerce, et consulter vos statistiques."
    },
    {
        question: "Quels sont les délais de réponse de votre support client ?",
        answer: "Nous offrons un support réactif : réponse sous 2 heures en jours ouvrables pour les demandes standards, et intervention immédiate pour les urgences critiques. Nos clients premium bénéficient d'un support prioritaire 24/7. Vous pouvez nous contacter par email, téléphone (+212-607-076-940), ou via notre formulaire de contact."
    },
    {
        question: "BrandHub propose-t-il des solutions e-commerce pour les boutiques en ligne ?",
        answer: "Oui ! Nous créons des boutiques en ligne complètes avec paiement sécurisé (CMI, Stripe, PayPal), gestion des stocks, multi-devises, intégration aux transporteurs marocains, tableaux de bord analytics, et options de marketing automatisé. Nos solutions e-commerce sont optimisées pour convertir vos visiteurs en clients."
    },
    {
        question: "Travaillez-vous avec des startups et PME au Maroc ?",
        answer: "Définitivement ! Nous accompagnons les startups et PME marocaines dans leur transformation digitale. Nous proposons des packages adaptés aux budgets des jeunes entreprises, des plans de paiement flexibles, et un accompagnement personnalisé. Plus de 300 entreprises nous font confiance au Maroc et en Afrique."
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Generate FAQ Schema for SEO/AEO
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <section className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
            {/* Schema.org markup for SEO/AEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="relative inline-block mb-8">
                        <div className="w-full h-20 absolute top-0 pointer-events-none">
                            <SparklesCore
                                background="transparent"
                                minSize={0.4}
                                maxSize={1}
                                particleDensity={800}
                                className="w-full h-full"
                                particleColor="#8b5cf6"
                            />
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold relative z-10">
                            Questions{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                                Fréquentes
                            </span>
                        </h2>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Tout ce que vous devez savoir sur nos services de développement web et branding au Maroc
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {faqData.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="bg-card border border-border/50 rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-lg">
                                <button
                                    onClick={() => toggleQuestion(index)}
                                    className="w-full px-6 py-5 flex items-start justify-between text-left hover:bg-muted/30 transition-colors"
                                    aria-expanded={openIndex === index}
                                    aria-controls={`faq-answer-${index}`}
                                >
                                    <div className="flex items-start gap-4 flex-1">
                                        <HelpCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                                        <h3 className="text-lg font-semibold text-foreground pr-4">
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <ChevronDown
                                        className={`w-6 h-6 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180 text-primary" : ""
                                            }`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            id={`faq-answer-${index}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 pt-2 pl-16">
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-lg text-muted-foreground mb-6">
                        Vous avez d'autres questions ? Notre équipe est là pour vous aider !
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        Contactez-nous
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQSection;
