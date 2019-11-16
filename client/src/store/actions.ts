import Trend from '../types/trend';
import { SET_TRENDS, SET_MAIN_FEED, SELECT_EXPERIMENT, SELECT_TIME, SELECT_SOURCE } from './actionTypes';

export const setTrends = (payload: Trend[]) => ({ type: SET_TRENDS, payload });

export const setMainFeed = (payload: any) => ({ type: SET_MAIN_FEED, payload });

export const selectExperiment = (value: string) => ({ type: SELECT_EXPERIMENT, value });

export const selectTime = (value: number) => ({ type: SELECT_TIME, value });

export const selectSource = (value: string) => ({ type: SELECT_SOURCE, value });

export const DEFAULT = 'DEFAULT';
