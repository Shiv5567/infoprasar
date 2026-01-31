
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContentService } from '../../services/api';

const AdminDashboard: React.FC = () => {
  const [recentContent, setRecentContent] = useState<any[]>([]);
  const [stats, setStats] = useState([
    { label: "Total Blogs", count: 0, type: "blog", color: "bg-purple-500" },
    { label: "Total Vacancies", count: 0, type: "vacancy", color: "bg-blue-500" },
    { label: "Total Results", count: 0, type: "result", color: "bg-green-500" },
    { label: "Total Notices", count: 0, type: "notice", color: "bg-orange-500" },
  ]);

  useEffect(() => {
    const fetchAll = async () => {
      const types: any[] = ['blog', 'vacancy', 'result', 'notice'];
      const results = await Promise.all(types.map(t => ContentService.getList(t)));
      
      const newStats = stats.map((s, idx) => ({
        ...s,
        count: results[idx].length
      }));
      
      setStats(newStats);
      
      // Merge and sort for recent updates
      const merged = results.flatMap((list, idx) => list.map(item => ({ ...item, type: types[idx] })))
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
        .slice(0, 10);
      
      setRecentContent(merged);
    };

    fetchAll();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Managing infoprasar via Cloudflare R2 & Firebase.</p>
        </div>
        <div className="flex space-x-4">
          <Link to="/admin/new/vacancy" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-blue-700 transition">
            + New Vacancy
          </Link>
          <Link to="/admin/new/blog" className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-purple-700 transition">
            + New Blog
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.type} className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-transparent hover:border-gray-200 transition">
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white mb-4`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-gray-500 font-medium mb-1">{stat.label}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="font-bold text-xl">Recent Content Updates</h2>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {recentContent.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{item.title}</td>
                <td className="px-6 py-4 capitalize">{item.type}</td>
                <td className="px-6 py-4 text-gray-500">{new Date(item.publishDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 flex space-x-3">
                  <Link to={`/admin/edit/${item.type}/${item.slug}`} className="text-blue-600 hover:font-bold">Edit</Link>
                  <button className="text-red-600 hover:font-bold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
