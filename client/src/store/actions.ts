import Trend from '../types/trend';
import { SET_TRENDS, SET_FEED, SET_TREND_VARIANT, SET_TIME, SET_SOURCE, SET_ALL_TRENDS_ON_MAIN } from './actionTypes';

export const setTrends = (payload: Trend[]) => ({ type: SET_TRENDS, payload });

export const setFeed = (payload: any, tag?: string) => ({ type: SET_FEED, tag, payload });

export const setAllTrendsOnMain = (payload: boolean) => ({ type: SET_ALL_TRENDS_ON_MAIN, payload });

export const setTrendVariant = (payload: string) => ({ type: SET_TREND_VARIANT, payload });

export const setTime = (payload: number) => ({ type: SET_TIME, payload });

export const setSource = (payload: string) => ({ type: SET_SOURCE, payload });

