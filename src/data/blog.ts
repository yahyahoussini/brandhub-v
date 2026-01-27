export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    role: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
    slug: string;
    tags: string[];
}

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        slug: "guide-branding-morocco-2024",
        title: "Le Guide Ultime du Branding au Maroc en 2024",
        excerpt: "Comment créer une identité de marque forte qui résonne avec le public marocain ? Découvrez les stratégies gagnantes pour vous démarquer.",
        content: `
      <h2>L'Importance du Branding au Maroc</h2>
      <p>Au Maroc, le marché évolue rapidement. Les consommateurs sont de plus en plus exigeants et sensibles à l'image des marques. Une identité visuelle forte n'est plus un luxe, c'est une nécessité.</p>
      
      <h3>1. Comprendre la Culture Locale</h3>
      <p>Un branding réussi au Maroc doit marier modernité internationale et respect des codes culturels locaux. Les couleurs, les symboles et le ton de voix doivent parler au cœur des Marocains.</p>

      <h3>2. L'Authenticité avant tout</h3>
      <p>Les consommateurs marocains recherchent de l'authenticité. Votre histoire doit être vraie et touchante. Ne copiez pas les tendances occidentales aveuglément ; adaptez-les.</p>

      <h3>3. Le Digital comme Vitrine</h3>
      <p>Avec l'explosion de l'utilisation mobile au Maroc, votre marque doit vivre sur les réseaux sociaux. Votre identité visuelle doit être "Instagrammable" et cohérente sur tous les supports.</p>

      <h2>Les Étapes Clés</h2>
      <ul>
        <li><strong>Audit :</strong> Analysez votre positionnement actuel.</li>
        <li><strong>Stratégie :</strong> Définissez votre "Why".</li>
        <li><strong>Identité Visuelle :</strong> Logo, palette, typographie (comme notre usage de Playfair Display).</li>
        <li><strong>Déploiement :</strong> Soyez constant sur le web, le print et les réseaux.</li>
      </ul>
    `,
        author: "Amine El Alami",
        role: "Directeur Artistique",
        date: "23 Janvier 2024",
        readTime: "8 min",
        category: "Branding",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000",
        tags: ["Branding", "Maroc", "Stratégie", "Design"]
    },
    {
        id: "2",
        slug: "cout-site-web-maroc",
        title: "Combien Coûte un Site Web Professionnel au Maroc ?",
        excerpt: "Analyse détaillée des tarifs de création de sites web au Maroc. Du site vitrine à l'e-commerce, comprenez où va votre budget.",
        content: `
      <h2>Le Prix de la Qualité</h2>
      <p>C'est la question que tout entrepreneur se pose. La réponse courte : ça dépend. Mais analysons cela en détail.</p>

      <h3>Les Types de Sites</h3>
      <ul>
        <li><strong>Site Vitrine (WordPress/Custom) :</strong> Entre 5 000 et 15 000 MAD. Idéal pour présenter vos services.</li>
        <li><strong>Site E-commerce :</strong> Entre 15 000 et 40 000 MAD. Pour vendre en ligne avec paiement CMI/PayZone.</li>
        <li><strong>Application Web Sur Mesure :</strong> À partir de 50 000 MAD. Pour des besoins spécifiques (SaaS, ERP).</li>
      </ul>

      <h3>Ce qui Fait Varier le Prix</h3>
      <p>Le design (sur mesure vs template), les fonctionnalités (réservations, espace membre) et surtout la qualité du code (SEO, performance, sécurité) impactent le coût final.</p>

      <h3>L'Investissement SEO</h3>
      <p>Un beau site invisible ne sert à rien. Prévoyez un budget pour l'optimisation SEO (contenu, technique) pour apparaître sur les recherches "Agence Web Maroc".</p>
    `,
        author: "Sarah Benjelloun",
        role: "Tech Lead",
        date: "20 Janvier 2024",
        readTime: "6 min",
        category: "Développement Web",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000",
        tags: ["Web Dev", "Prix", "Business", "Maroc"]
    },
    {
        id: "3",
        slug: "digital-marketing-trends-casablanca",
        title: "Les Tendances du Marketing Digital à Casablanca en 2024",
        excerpt: "IA, Vidéo courte, SEO local... Découvrez ce qui marche vraiment pour les entreprises casablancaises cette année.",
        content: `
      <h2>Casablanca, Hub Digital</h2>
      <p>Casablanca n'est pas seulement la capitale économique, c'est le cœur de l'innovation digitale au Maroc. Voici ce qui buzz en ce moment.</p>

      <h3>1. La Vidéo Verticale (Reels/TikTok)</h3>
      <p>Le format roi. Si votre entreprise n'a pas de stratégie vidéo courte, vous perdez 50% de votre audience potentielle.</p>

      <h3>2. Le SEO Local</h3>
      <p>Être trouvé sur "Restaurant Casablanca" ou "Plombier Maarif" est crucial. Google My Business est votre meilleur ami.</p>

      <h3>3. L'Intelligence Artificielle</h3>
      <p>L'utilisation de ChatGPT et Midjourney pour la création de contenu explose. Les agences qui les maîtrisent produisent plus vite et mieux.</p>
    `,
        author: "Karim Tazi",
        role: "Marketing Manager",
        date: "15 Janvier 2024",
        readTime: "5 min",
        category: "Marketing",
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=2000",
        tags: ["Marketing", "Tendances", "Casablanca", "IA"]
    }
];
