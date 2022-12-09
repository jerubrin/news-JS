import { Article } from '../../entities/data';
import './news.css';

class News {
    draw(data: Array<Article>) {
        const news = data.length >= 10 ? data.filter((_item: Article, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLMetaElement = document.querySelector('#newsItemTemp') as HTMLMetaElement;

        news.forEach((item: Article, idx: number) => {
            if (!(newsItemTemp instanceof HTMLTemplateElement)) return;
            const newsClone: HTMLTemplateElement = newsItemTemp.content.cloneNode(true) as HTMLTemplateElement;

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            (newsClone.querySelector('.news__meta-photo') as HTMLDivElement).style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            const author = newsClone.querySelector('.news__meta-author') as HTMLElement;
            author.textContent = item.author || item.source.name;
            const date = newsClone.querySelector('.news__meta-date') as HTMLElement;
            date.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const title = newsClone.querySelector('.news__description-title') as HTMLElement;
            title.textContent = item.title;
            const descriptionSource = newsClone.querySelector('.news__description-source') as HTMLElement;
            descriptionSource.textContent = item.source.name;
            const descriptionContent = newsClone.querySelector('.news__description-content') as HTMLElement;
            descriptionContent.textContent = item.description;
            const moreLink = newsClone.querySelector('.news__read-more a') as HTMLLinkElement;
            moreLink.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsBlock: HTMLElement | null = document.querySelector('.news');
        if (newsBlock) {
            newsBlock.innerHTML = '';
            newsBlock.appendChild(fragment);
        }
    }
}

export default News;
