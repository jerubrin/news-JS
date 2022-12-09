export interface ApiOptions {
    [index: string]: string;
}

export interface RespOptions {
    endpoint: string;
    options?: ApiOptions | null;
}

interface State {
    status: Status;
    code?: string;
    message?: string;
}

enum Status {
    ok = 'ok',
    error = 'error',
}

export interface RemoteSources extends State {
    sources: Array<Source>;
}

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface Articles extends State {
    totalResults: number;
    articles: Array<Article>;
}

export interface Article {
    source: SourceInArticle;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

interface SourceInArticle {
    id: string;
    name: string;
}
