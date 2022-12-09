import { ApiOptions, RespOptions } from '../entities/data';

class Loader {
    constructor(public baseLink: string, public options: ApiOptions) {}

    protected getResp<Data>(
        { endpoint, options = {} }: RespOptions,
        callback: (data: Data) => void = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load<Data>('GET', endpoint, callback, options as ApiOptions);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: ApiOptions, endpoint: string) {
        const urlOptions: ApiOptions = { ...this.options, ...options };
        const url =
            `${this.baseLink}${endpoint}?` +
            Object.keys(urlOptions).reduce((val, key) => (val += `${key}=${urlOptions[key] as string}&`), '');

        return url.slice(0, -1);
    }

    private load<Data>(method: string, endpoint: string, callback: (data: Data) => void, options: ApiOptions = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((status) => this.errorHandler(status))
            .then((res) => res.json())
            .then((data: Data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
