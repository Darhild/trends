import axios, { AxiosResponse } from 'axios';

const api = (path: string) => axios.get(path)
    .then((res: AxiosResponse<any>) => res.data)
    .catch(() => []);

export const fetchTrends = () => api('/api/trends');

export const fetchMainFeed = () => api('/api/feed')
    .then((res: any) => res.data.items);
