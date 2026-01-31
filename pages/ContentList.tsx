
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ContentType } from '../types';

interface ContentListProps {
  type: ContentType;
}

const ContentList: React.FC<ContentListProps> = ({ type }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const config = {
    blog: { title: "हाम्रो ब्लग", color: "text-purple-600", desc: "शैक्षिक र समसामयिक लेखहरू पढ्नुहोस्।" },
    vacancy: { title: "सरकारी तथा निजी भ्याकेन्सी", color: "text-blue-600", desc: "नेपालभरका जागिरका अवसरहरू।" },
    result: { title: "परीक्षाको नतिजा", color: "text-green-600", desc: "लोकसेवा, टिुयु, एनईबी आदि नतिजाहरू।" },
    notice: { title: "जरुरी सूचनाहरू", color: "text-orange-600", desc: "विभिन्न संघसंस्थाका सार्वजनिक सूचनाहरू।" },
  };

  const currentConfig = config[type];

  // Mock items
  const items = Array.from({ length: 9 }).map((_, i) => ({
    id: i.toString(),
    title: `${currentConfig.title} नमूना सामग्री ${i + 1}`,
    description: "यहाँ यो सामग्रीको छोटो विवरण राखिनेछ जसले पाठकलाई आकर्षित गर्नेछ।",
    date: "२०८१/०७/०५",
    slug: `sample-item-${i}`,
    category: "General",
    imageUrl: `https://picsum.photos/seed/${type}${i}/400/250`
  }));

  return (
    <div className="min-h-screen pb-12">
      <SEO 
        title={currentConfig.title} 
        description={currentConfig.desc} 
      />

      <div className="bg-gray-100 py-12 mb-8">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4">
            <Link to="/" className="text-gray-500 hover:text-blue-600">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700 font-medium">{currentConfig.title}</span>
          </nav>
          <h1 className={`text-3xl md:text-4xl font-bold ${currentConfig.color} mb-4`}>{currentConfig.title}</h1>
          <p className="text-gray-600 max-w-2xl">{currentConfig.desc}</p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Search & Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder={`Search ${type}...`}
            className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select className="p-3 border rounded-lg outline-none min-w-[200px]">
            <option>All Categories</option>
            <option>Education</option>
            <option>Technology</option>
            <option>Health</option>
          </select>
        </div>

        {/* Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <Link key={item.id} to={`/${type}/${item.slug}`} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition">
              <div className="relative">
                <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 text-xs font-bold rounded shadow">
                  {item.category}
                </span>
              </div>
              <div className="p-5">
                <div className="text-xs text-gray-500 mb-2 uppercase font-semibold">{item.date}</div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-blue-600">{item.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{item.description}</p>
                <div className="flex items-center text-blue-600 font-bold text-sm">
                  थप पढ्नुहोस् 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center space-x-2">
          <button className="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50">Prev</button>
          {[1, 2, 3].map(p => (
            <button key={p} className={`px-4 py-2 border rounded-md ${p === 1 ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-100'}`}>
              {p}
            </button>
          ))}
          <button className="px-4 py-2 border rounded-md hover:bg-gray-100">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ContentList;
