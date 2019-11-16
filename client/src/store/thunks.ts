import { fetchTrends, fetchMainFeed } from '../apiService';
import { setTrends, setMainFeed } from './actions';
import { Dispatch } from './createStore';
import { mapTrends } from '../utils/mappers';

export const setTrendsThunk = () =>
    (dispatch: Dispatch) => fetchTrends()
        .then((res: any) => res && res.trends ? res.trends.map(mapTrends) : [])
        .then((trends: any) => dispatch(setTrends(trends)))
        .catch(() => []);

export const setMainFeedThunk = () =>
    (dispatch: Dispatch) => fetchMainFeed()
        .then((feed: any) => {
            if (feed) {
                dispatch(setMainFeed(feed));
            }
        })
        .catch(() => []);
