import axios, { AxiosResponse } from 'axios';

const api = (path: string) => axios.get(path)
    .then((res: AxiosResponse<any>) => res.data)
    .catch(() => []);

export const fetchTrends = (period: number, category?: string, source?: string) => {
    const path = source
        ? `/api/trends?tag=${category}&period=${period}&source=${source}`
        : `/api/trends?tag=${category}&period=${period}`;

    return api(path);
};

export const fetchFeed = (tag: string) => {
    const url = (tag === 'main') ? '/api/feed?limit=50' : `/api/feed?tag=${tag}&limit=50`;

    return api(url)
        .then((res: any) => res.data.items);
};
