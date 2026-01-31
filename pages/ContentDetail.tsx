
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PDFViewer from '../components/PDFViewer';
import { ContentType } from '../types';

interface ContentDetailProps {
  type: ContentType;
}

const ContentDetail: React.FC<ContentDetailProps> = ({ type }) => {
  const { slug } = useParams<{ slug: string }>();

  // Mock single item - Replace with Firestore getDoc by slug query
  const data = {
    title: "नेपाल नागरिक उड्डयन प्राधिकरणको नयाँ विज्ञापन",
    description: "प्राधिकरणले रिक्त रहेका विभिन्न पदहरूका लागि दरखास्त आह्वान गरेको छ।",
    content: `
      <p class="mb-4">नेपाल नागरिक उड्डयन प्राधिकरणले लोक सेवा आयोगको सहमतिमा रिक्त रहेका तपसिलका पदहरूमा खुला प्रतियोगिताद्वारा पदपूर्ति गर्नुपर्ने भएकोले योग्यता पुगेका इच्छुक नेपाली नागरिकहरूबाट दरखास्त आह्वान गरिन्छ।</p>
      <h3 class="text-xl font-bold mb-2">मुख्य विवरणहरू:</h3>
      <ul class="list-disc pl-5 mb-4">
        <li>फारम भर्ने अन्तिम मिति: २०८१-०८-१०</li>
        <li>फारम दस्तुर: पद अनुसार रु ५०० देखि १५०० सम्म</li>
        <li>परीक्षाको किसिम: लिखित र अन्तर्वार्ता</li>
      </ul>
      <p>थप विवरणका लागि तल दिइएको आधिकारिक सूचनाको पीडीएफ फाइल हेर्नुहोस्।</p>
    `,
    category: "Government Job",
    publishDate: "२०८१/०७/०५",
    imageUrl: "https://picsum.photos/seed/detail/1200/600",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", // Sample PDF
    seo: {
      metaTitle: "CAAN Job Vacancy 2081 - Detail Information",
      metaDescription: "Check out the latest job openings at Civil Aviation Authority of Nepal (CAAN). Application details, deadlines and PDF notice."
    }
  };

  // Schema Markup generation
  const schema = {
    "@context": "https://schema.org",
    "@type": type === 'vacancy' ? "JobPosting" : "Article",
    "headline": data.title,
    "description": data.description,
    "image": data.imageUrl,
    "datePublished": "2024-10-24",
    "author": {
      "@type": "Organization",
      "name": "infoprasar"
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <SEO 
        title={data.title} 
        description={data.seo.metaDescription} 
        image={data.imageUrl}
        type="article"
        schema={schema}
      />

      {/* Header Image/Breadcrumb */}
      <div className="relative h-64 md:h-96 w-full overflow-hidden">
        <img src={data.imageUrl} alt={data.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8">
          <div className="container mx-auto">
             <nav className="text-white/80 text-sm mb-4">
              <Link to="/" className="hover:underline">Home</Link> / 
              <Link to={`/${type}s`} className="mx-1 hover:underline capitalize">{type}</Link> / 
              <span className="opacity-60">{slug}</span>
            </nav>
            <h1 className="text-2xl md:text-4xl font-bold text-white max-w-4xl">{data.title}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm">
              <div className="flex items-center text-sm text-gray-500 mb-6 border-b pb-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold mr-4">{data.category}</span>
                <span>Published on: {data.publishDate}</span>
              </div>

              <div 
                className="prose prose-blue max-w-none text-gray-700 text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />

              {/* PDF Viewer Section */}
              {data.pdfUrl && (
                <div className="mt-12 border-t pt-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h10V4H7zm2 4h6v2H9V8zm0 4h6v2H9v-2z"/>
                    </svg>
                    आधिकारिक सूचना (PDF Document)
                  </h2>
                  <PDFViewer url={data.pdfUrl} />
                </div>
              )}
            </div>
            
            {/* Disclaimer */}
            <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-sm text-blue-800">
              <strong>Disclaimer:</strong> This information is collected from public sources. While we strive for accuracy, users are advised to verify details from the official website of the concerned authority.
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
              <h3 className="text-lg font-bold mb-4 border-b pb-2">सम्बन्धित सामग्री (Related)</h3>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Link key={i} to={`/${type}/related-${i}`} className="flex gap-4 group">
                    <img src={`https://picsum.photos/seed/rel${i}/100/100`} className="w-20 h-20 object-cover rounded-lg" alt="" />
                    <div>
                      <h4 className="font-bold text-sm group-hover:text-blue-600 line-clamp-2">सम्बन्धित सामग्रीको शीर्षक यहाँ हुनेछ</h4>
                      <p className="text-xs text-gray-400 mt-1">२०८१/०७/०५</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Stay Updated!</h3>
              <p className="text-gray-400 text-sm mb-6">हाम्रो टेलिग्राम च्यानलमा जोडिनुहोस् र सबै सूचनाहरू तुरुन्त पाउनुहोस्।</p>
              <button className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-lg font-bold transition flex items-center justify-center">
                Join Telegram
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;
