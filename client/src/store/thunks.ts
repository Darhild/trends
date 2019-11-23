import { fetchTrends, fetchFeed, fetchCollection, fetchCommented } from '../apiService';
import { setTrends, requestFeed, setFeed, setCommented, setCollection, requestTrends } from './actions';
import { Dispatch } from './createStore';
import { mapTrends, mapCommented } from '../utils/mappers';

export const setTrendsThunk = (category: string, period: number, source?: string) =>
    (dispatch: Dispatch) => {
        dispatch(requestTrends());
        fetchTrends(category, period, source)
        .then((res: any) => res ? res.map(mapTrends) : [])
        .then((trends: any) => dispatch(setTrends(trends)))
        .catch(() => []);
    };

export const setFeedThunk = (tag: string) =>
    (dispatch: Dispatch) => {
        dispatch(requestFeed());
        fetchFeed(tag)
        .then((feed: any) => {
            if (feed) {
                dispatch(setFeed(feed, tag));
            }
        })
        .catch(() => []);
    };

export const setCollectionThunk = (id: string) =>
        (dispatch: Dispatch) => fetchCollection(id)
            .then((collection: any) => {
                if (collection) {
                    dispatch(setCollection(collection, id));
                }
            })
            .catch(() => []);

export const setCommentedThunk = (id: string) =>
            (dispatch: Dispatch) => fetchCommented(id)
                .then((res: any) => res ? res.map(mapCommented) : [])
                .then((commented: any) => {
                    if (commented) {
                        dispatch(setCommented(commented));
                    }
                })
                .catch(() => []);
