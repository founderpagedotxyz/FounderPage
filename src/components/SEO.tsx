import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "profile" | "article";
}

export const SEO = ({
  title = "Founder Page - Showcase Your Startups",
  description = "Create your Founder Page to showcase your startups and verified revenue. Join makers building in public.",
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  url,
  type = "website",
}: SEOProps) => {
  const fullUrl = url ? `${window.location.origin}${url}` : window.location.href;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};
