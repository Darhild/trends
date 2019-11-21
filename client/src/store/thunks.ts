import { fetchTrends, fetchFeed } from '../apiService';
import { setTrends, setFeed } from './actions';
import { Dispatch } from './createStore';
import { mapTrends } from '../utils/mappers';

export const setTrendsThunk = () =>
    (dispatch: Dispatch) => fetchTrends()
        .then((res: any) => res ? res.map(mapTrends) : [])
        .then((trends: any) => dispatch(setTrends(trends)))
        .catch(() => []);

export const setFeedThunk = (tag: string) =>
    (dispatch: Dispatch) => fetchFeed(tag)
        .then((feed: any) => {
            if (feed) {
                dispatch(setFeed(feed, tag));
            }
        })
        .catch(() => []);
