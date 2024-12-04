interface SourceType {
  id: string;
  name: string;
}

export interface NewsType {
  source: SourceType;
  id: string;
  name: string;
  description: string;
  url: string;
  title: string;
  author: string | null;
  publishedAt: string;
  urlToImage: string;
  content: string;
}

export interface NewsResponse {
  status: string;
  totalResults: string;
  articles: NewsType[];
}
