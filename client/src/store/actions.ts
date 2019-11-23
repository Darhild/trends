import Trend from '../types/trend';
import {
    FETCH_TRENDS_REQUEST,
    FETCH_TRENDS_SUCCESS,
    FETCH_TRENDS_ERROR,
    FETCH_FEED_REQUEST,
    FETCH_FEED_SUCCESS,
    FETCH_FEED_ERROR,
    SET_COLLECTION,
    SET_TREND_VARIANT,
    SET_PERIOD,
    SET_SOURCE,
    SET_ALL_TRENDS_ON_MAIN,
    SET_COMMENTED,
} from './actionTypes';

export const requestTrends = () => ({ type: FETCH_TRENDS_REQUEST });

export const setTrends = (payload: Trend[]) => ({ type: FETCH_TRENDS_SUCCESS, payload });

export const trendsErroe = () => ({ type: FETCH_TRENDS_ERROR });

export const requestFeed = () => ({ type: FETCH_FEED_REQUEST });

export const setFeed = (payload: any, tag?: string) => ({ type: FETCH_FEED_SUCCESS, tag, payload });

export const feedError = (payload: any, tag?: string) => ({ type: FETCH_FEED_ERROR, tag, payload });

export const setCollection = (payload: any, id: string) => ({ type: SET_COLLECTION, payload, id });

export const setCommented = (payload: any) => ({ type: SET_COMMENTED, payload });

export const setAllTrendsOnMain = (payload: boolean) => ({ type: SET_ALL_TRENDS_ON_MAIN, payload });

export const setTrendVariant = (payload: string) => ({ type: SET_TREND_VARIANT, payload });

export const setPeriod = (payload: number) => ({ type: SET_PERIOD, payload });

export const setSource = (payload: string) => ({ type: SET_SOURCE, payload });

