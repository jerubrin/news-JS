import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '5e310b72eeb8471bbe192238fa52962b', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
