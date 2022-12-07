import { ApiOptions } from "./appLoader";

interface RespOptions {
    endpoint: string,
    options?: ApiOptions
}

class Loader {
    constructor(
        public baseLink: String, 
        public options: ApiOptions
    ) {
    }

    getResp(
        { endpoint, options = {} }: RespOptions,
        callback: (data?: any) => void = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: any) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: ApiOptions, endpoint: any) {
        const urlOptions: ApiOptions = { ...this.options, ...options };
        const url = `${this.baseLink}${endpoint}?` +
            Object.keys(urlOptions).reduce(
                (val: string, key: string) => val += `${key}=${urlOptions[key]}&`, 
                ''
            );

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: (data: any) => void, options: ApiOptions = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
