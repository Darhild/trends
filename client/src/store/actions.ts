import Trend from '../types/trend';
import {
    SET_TRENDS,
    SET_FEED,
    SET_COLLECTION,
    SET_TREND_VARIANT,
    SET_PERIOD,
    SET_SOURCE,
    SET_ALL_TRENDS_ON_MAIN,
    SET_COMMENTED,
} from './actionTypes';

export const setTrends = (payload: Trend[]) => ({ type: SET_TRENDS, payload });

export const setFeed = (payload: any, tag?: string) => ({ type: SET_FEED, tag, payload });

export const setCollection = (payload: any, id: string) => ({ type: SET_COLLECTION, payload, id });

export const setCommented = (payload: any) => ({ type: SET_COMMENTED, payload });

export const setAllTrendsOnMain = (payload: boolean) => ({ type: SET_ALL_TRENDS_ON_MAIN, payload });

export const setTrendVariant = (payload: string) => ({ type: SET_TREND_VARIANT, payload });

export const setPeriod = (payload: number) => ({ type: SET_PERIOD, payload });

export const setSource = (payload: string) => ({ type: SET_SOURCE, payload });

