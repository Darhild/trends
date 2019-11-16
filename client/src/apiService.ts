import axios, { AxiosResponse } from 'axios';
const API_URL = 'http://84.201.160.40:8080';

const api = (path: string) => axios.get(`${API_URL}${path}`)
    .then((res: AxiosResponse<any>) => res.data)
    .catch(() => []);

export const fetchTrends = () => api('/api/trends');

export const fetchMainFeed = () => api('/api/feed')
    .then((res: any) => res.data.items);
