/**
 * SEO Structured Data Utilities
 * Generate JSON-LD schemas for rich snippets
 */

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface TestimonialRating {
    author: string;
    rating: number;
    review: string;
    date: string;
}

interface FAQItem {
    question: string;
    answer: string;
}

/**
 * Generate BreadcrumbList schema
 * Improves SERP appearance and navigation
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

/**
 * Generate AggregateRating schema
 * Showcases testimonials with star ratings in search results
 */
export function generateAggregateRatingSchema(
    ratings: TestimonialRating[],
    businessName: string = 'BrandHub Morocco'
) {
    const totalRatings = ratings.length;
    const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings;

    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: businessName,
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: averageRating.toFixed(1),
            reviewCount: totalRatings,
            bestRating: '5',
            worstRating: '1',
        },
        review: ratings.map((rating) => ({
            '@type': 'Review',
            author: {
                '@type': 'Person',
                name: rating.author,
            },
            datePublished: rating.date,
            reviewRating: {
                '@type': 'Rating',
                ratingValue: rating.rating,
                bestRating: '5',
                worstRating: '1',
            },
            reviewBody: rating.review,
        })),
    };
}

/**
 * Generate FAQ schema
 * Enables FAQ rich snippets in search results
 */
export function generateFAQSchema(faqs: FAQItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

/**
 * Generate Organization schema
 * Enhances brand presence in search
 */
export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'BrandHub Morocco',
        url: 'https://brandhub.ma',
        logo: 'https://brandhub.ma/logo.png',
        description: 'Expert branding and web development services in Morocco',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Casablanca',
            addressCountry: 'MA',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+212-607-076-940',
            contactType: 'Customer Service',
            availableLanguage: ['French', 'Arabic', 'English'],
        },
        sameAs: [
            'https://www.facebook.com/brandhubmorocco',
            'https://www.linkedin.com/company/brandhub-morocco',
            'https://twitter.com/brandhubma',
        ],
    };
}

/**
 * Generate BlogPosting schema
 * For individual blog posts
 */
export function generateBlogPostingSchema(post: {
    title: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified: string;
    author: string;
    url: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: post.image,
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        author: {
            '@type': 'Person',
            name: post.author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'BrandHub Morocco',
            logo: {
                '@type': 'ImageObject',
                url: 'https://brandhub.ma/logo.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': post.url,
        },
    };
}

/**
 * React component to inject JSON-LD schema
 */
export function StructuredData({ data }: { data: object }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

/**
 * Hook to add structured data to page
 */
export function useStructuredData(schema: object) {
    React.useEffect(() => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [schema]);
}
