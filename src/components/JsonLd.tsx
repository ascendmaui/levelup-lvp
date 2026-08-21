import { CITIES, SITE } from "@/lib/site";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FlooringContractor",
    name: SITE.name,
    description: SITE.tagline,
    telephone: "+1-864-555-0123",
    email: SITE.email,
    url: "https://levelup-lvp-site.vercel.app",
    areaServed: CITIES.map((c) => ({
      "@type": "City",
      name: `${c.name}, SC`,
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Greenville",
      addressRegion: "SC",
      addressCountry: "US",
    },
    openingHours: "Mo-Sa 07:30-18:00",
    priceRange: "$$",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd() {
  return null;
}
