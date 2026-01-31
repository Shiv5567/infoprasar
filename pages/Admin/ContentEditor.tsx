
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContentService } from '../../services/api';
import { ContentType } from '../../types';

const ContentEditor: React.FC = () => {
  const { type, id } = useParams<{ type: string; id?: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<{ field: string | null }>({ field: null });

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    category: '',
    isPublished: true,
    metaTitle: '',
    metaDescription: '',
    imageUrl: '',
    pdfUrl: '',
    organization: '',
    deadline: '',
    publishDate: new Date().toISOString()
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      ContentService.getDetail(type as ContentType, id)
        .then(data => setFormData(data))
        .finally(() => setLoading(false));
    }
  }, [id, type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type: inputType } = e.target;
    const val = inputType === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => {
      const updated = { ...prev, [name]: val };
      if (name === 'title' && !id) {
        updated.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        updated.metaTitle = value;
      }
      return updated;
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'imageUrl' | 'pdfUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading({ field });
    try {
      const url = await ContentService.uploadFile(file);
      setFormData(prev => ({ ...prev, [field]: url }));
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading({ field: null });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await ContentService.saveContent(type as ContentType, formData, id);
      navigate('/admin');
    } catch (err) {
      alert('Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold capitalize">
          {id ? 'Edit' : 'Create New'} {type}
        </h1>
        <button onClick={() => navigate('/admin')} className="text-gray-500 hover:text-gray-700">
          Cancel & Return
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">Title (Nepali/English)</label>
              <input 
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">Slug (Unique URL)</label>
              <input 
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                readOnly={!!id}
                className={`w-full p-3 border rounded-lg outline-none ${id ? 'bg-gray-100' : ''}`}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">Detailed Content (HTML)</label>
              <textarea 
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={12}
                className="w-full p-3 border rounded-lg outline-none font-mono text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold mb-6">Media (R2 Cloud Storage)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2">Featured Image</label>
                <input type="file" onChange={(e) => handleFileUpload(e, 'imageUrl')} className="text-sm mb-2" />
                <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full p-2 border rounded text-xs" placeholder="Or paste URL" />
                {uploading.field === 'imageUrl' && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">PDF Document</label>
                <input type="file" onChange={(e) => handleFileUpload(e, 'pdfUrl')} className="text-sm mb-2" />
                <input name="pdfUrl" value={formData.pdfUrl} onChange={handleChange} className="w-full p-2 border rounded text-xs" placeholder="Or paste URL" />
                {uploading.field === 'pdfUrl' && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-bold mb-4">Settings</h2>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Category</label>
              <input name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            {type === 'vacancy' && (
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Deadline</label>
                <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full p-2 border rounded" />
              </div>
            )}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg mt-8 hover:bg-blue-700 disabled:bg-blue-300 transition"
            >
              {loading ? 'Saving to R2...' : 'Save Content'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContentEditor;
