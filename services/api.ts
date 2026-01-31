
import { ContentType, BaseContent } from '../types';

const API_BASE = '/api';

export const ContentService = {
  async getList(type: ContentType): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE}/content?type=${type}`);
      if (!response.ok) throw new Error('Failed to fetch list');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  async getDetail(type: ContentType, slug: string): Promise<any> {
    const response = await fetch(`${API_BASE}/content/${slug}?type=${type}`);
    if (!response.ok) throw new Error('Content not found');
    return await response.json();
  },

  async saveContent(type: ContentType, data: any, id?: string): Promise<void> {
    const token = localStorage.getItem('infoprasar_admin_token');
    const response = await fetch(`${API_BASE}/content`, {
      method: id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ type, data, id })
    });
    if (!response.ok) throw new Error('Failed to save content');
  },

  async uploadFile(file: File): Promise<string> {
    const token = localStorage.getItem('infoprasar_admin_token');
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) throw new Error('Upload failed');
    const result = await response.json();
    return result.url;
  }
};
