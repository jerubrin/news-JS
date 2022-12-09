import { Articles, RemoteSources } from '../entities/data';
import AppLoader from './appLoader';

type GetSourcesCallback = (data: Partial<RemoteSources>) => void;
type GetNewsCallback = (data: Partial<Articles>) => void;
class AppController extends AppLoader {
    public getSources(callback: GetSourcesCallback) {
        super.getResp<Partial<RemoteSources>>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: GetNewsCallback) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<Partial<Articles>>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
