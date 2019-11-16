import Trend from '../types/trend';
import { SET_TRENDS, SET_MAIN_FEED } from './actionTypes';

export const setTrends = (payload: Trend[]) => ({ type: SET_TRENDS, payload });

export const setMainFeed = (payload: any) => ({ type: SET_MAIN_FEED, payload });

