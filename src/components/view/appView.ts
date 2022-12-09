import { Article, Articles, RemoteSources, Source } from '../entities/data';
import News from './news/news';
import Sources from './sources/sources';

export default class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: Partial<Pick<Articles, 'articles'>>) {
        const values: Readonly<Array<Article>> = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: Partial<Pick<RemoteSources, 'sources'>>) {
        const values: Readonly<Array<Source>> = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}
