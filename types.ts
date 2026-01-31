
export type ContentType = 'blog' | 'vacancy' | 'result' | 'notice';

export interface BaseContent {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string; // HTML/Rich text
  category: string;
  publishDate: any; // Firestore Timestamp
  imageUrl?: string;
  pdfUrl?: string;
  isPublished: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

export interface Blog extends BaseContent {}
export interface Vacancy extends BaseContent {
  deadline?: string;
  organization: string;
}
export interface Result extends BaseContent {
  examName: string;
}
export interface Notice extends BaseContent {
  issuer: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  isAdmin: boolean;
}
