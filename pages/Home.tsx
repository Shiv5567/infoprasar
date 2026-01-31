
import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  // Mock data for initial rendering - replace with Firestore fetch
  const featured = {
    title: "नेपाल प्रहरीमा ठुलो संख्यामा नयाँ भर्ना खुल्यो",
    description: "नेपाल प्रहरीले विभिन्न पदका लागि ३००० भन्दा बढी दरखास्त आह्वान गरेको छ।",
    type: "vacancy",
    slug: "nepal-police-vacancy-2081",
    imageUrl: "https://picsum.photos/seed/police/800/400"
  };

  const categories = [
    { title: "Latest Vacancies", type: "vacancy", path: "/vacancies", color: "bg-blue-600" },
    { title: "Exam Results", type: "result", path: "/results", color: "bg-green-600" },
    { title: "Important Notices", type: "notice", path: "/notices", color: "bg-orange-600" },
    { title: "Educational Blog", type: "blog", path: "/blogs", color: "bg-purple-600" },
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Home - Nepal's Information Hub" 
        description="Get the latest Job Vacancies, Exam Results, Notices, and News updates from Nepal on infoprasar." 
      />

      {/* Hero Section */}
      <section className="relative h-[400px] bg-blue-900 overflow-hidden">
        <img 
          src={featured.imageUrl} 
          alt={featured.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative h-full flex flex-col justify-end pb-12">
          <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-full w-fit mb-4">HOT UPDATE</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            {featured.title}
          </h1>
          <p className="text-blue-100 text-lg md:max-w-2xl mb-6">
            {featured.description}
          </p>
          <Link to={`/${featured.type}/${featured.slug}`} className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition w-fit">
            विवरण हेर्नुहोस्
          </Link>
        </div>
      </section>

      {/* Grid Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link key={cat.type} to={cat.path} className={`${cat.color} p-6 rounded-xl shadow-lg transform hover:-translate-y-1 transition text-white`}>
                <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
                <p className="text-white/80 text-sm">भर्खरै अपडेट गरिएका {cat.title} को सूची हेर्नुहोस्।</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Content Sections */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h2 className="text-2xl font-bold border-l-4 border-blue-600 pl-4">भर्खरैका सूचनाहरू (Latest Notices)</h2>
            <Link to="/notices" className="text-blue-600 font-medium hover:underline">View All &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group border rounded-lg overflow-hidden hover:shadow-xl transition">
                <img src={`https://picsum.photos/seed/notice${i}/400/250`} className="w-full h-48 object-cover" alt="Notice" />
                <div className="p-4">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <span>Oct 24, 2024</span>
                    <span className="mx-2">•</span>
                    <span className="text-blue-600">TU Exam</span>
                  </div>
                  <h3 className="font-bold text-lg group-hover:text-blue-600 transition mb-2">
                    त्रिभुवन विश्वविद्यालय परीक्षा नियन्त्रण कार्यालयको विशेष सूचना
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    बी.एड प्रथम वर्षको परीक्षा समय तालिकामा हेरफेर गरिएको बारे अत्यन्त जरुरी सूचना...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Section */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center uppercase tracking-widest text-blue-900">भ्याकेन्सी अपडेट (Top Vacancies)</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Organization</th>
                  <th className="px-6 py-4">Position</th>
                  <th className="px-6 py-4">Deadline</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium">Nepal Rastra Bank</td>
                    <td className="px-6 py-4">Assistant Director (Admin)</td>
                    <td className="px-6 py-4 text-red-500 font-medium">2081-08-15</td>
                    <td className="px-6 py-4">
                      <Link to="/vacancy/nrb-vacancy" className="text-blue-600 hover:font-bold">View Detail</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
