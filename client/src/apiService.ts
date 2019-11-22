import axios, { AxiosResponse } from 'axios';

const api = (path: string) => axios.get(path)
    .then((res: AxiosResponse<any>) => res.data)
    .catch(() => []);

export const fetchTrends = (category: string, period: number, source?: string) => {
    let path = (category === 'main')
        ? `/api/trends?period=${period}`
        : `/api/trends?tag=${category}&period=${period}`;

    if (source) {
        path += `&source=${source}`;
    }

    return api(path);
};

export const fetchFeed = (tag: string) => {
    const url = (tag === 'main') ? '/api/feed?limit=50' : `/api/feed?tag=${tag}&limit=50`;

    return api(url)
        .then((res: any) => res.data.items);
};

export const fetchCollection = (id: string) => {
    const url = `/api/collection?collection_id=${id}&limit=100`;

    return api(url)
        .then((res: any) => res.data.set);
};
