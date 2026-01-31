
import React from 'react';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: 'article' | 'website';
  schema?: any;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  url = 'https://infoprasar.com', 
  image = 'https://picsum.photos/1200/630', 
  type = 'website',
  schema 
}) => {
  React.useEffect(() => {
    document.title = `${title} | infoprasar`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', description);

    // Open Graph
    const setOG = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setOG('og:title', title);
    setOG('og:description', description);
    setOG('og:url', url);
    setOG('og:image', image);
    setOG('og:type', type);

    // Schema Markup
    if (schema) {
      let script = document.getElementById('json-ld-schema');
      if (!script) {
        script = document.createElement('script');
        script.id = 'json-ld-schema';
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    }
  }, [title, description, url, image, type, schema]);

  return null;
};

export default SEO;
