// Data Models for City Pulse App

export interface NewsArticle {
  title: string;
  description: string;
  content?: string;
  image: string;
  url: string;
  date: string;
  source: string;
  author?: string;
}

export interface City {
  id: string;
  name: string;
  country: string;
}

export interface EmergencyAlert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  date: string;
  category: string;
}

export interface BookmarkedArticle extends NewsArticle {
  bookmarkedAt: string;
}


