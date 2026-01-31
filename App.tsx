
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ContentList from './pages/ContentList';
import ContentDetail from './pages/ContentDetail';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import ContentEditor from './pages/Admin/ContentEditor';
import { auth, onAuthStateChanged } from './firebase';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real Firebase Auth listener from centralized firebase service
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAdmin(true);
        // Persist token for Cloudflare Function calls
        user.getIdToken().then(token => {
          localStorage.setItem('infoprasar_admin_token', token);
        });
      } else {
        setIsAdmin(false);
        localStorage.removeItem('infoprasar_admin_token');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-blue-900 font-bold">infoprasar loading...</p>
    </div>
  );

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header isAdmin={isAdmin} />
        
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            
            <Route path="/blogs" element={<ContentList type="blog" />} />
            <Route path="/blog/:slug" element={<ContentDetail type="blog" />} />
            
            <Route path="/vacancies" element={<ContentList type="vacancy" />} />
            <Route path="/vacancy/:slug" element={<ContentDetail type="vacancy" />} />
            
            <Route path="/results" element={<ContentList type="result" />} />
            <Route path="/result/:slug" element={<ContentDetail type="result" />} />
            
            <Route path="/notices" element={<ContentList type="notice" />} />
            <Route path="/notice/:slug" element={<ContentDetail type="notice" />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={!isAdmin ? <AdminLogin onLogin={() => setIsAdmin(true)} /> : <Navigate to="/admin" />} />
            <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
            <Route path="/admin/new/:type" element={isAdmin ? <ContentEditor /> : <Navigate to="/admin/login" />} />
            <Route path="/admin/edit/:type/:id" element={isAdmin ? <ContentEditor /> : <Navigate to="/admin/login" />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
