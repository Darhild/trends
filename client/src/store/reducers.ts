import * as redux from 'redux';
import { State } from '../store/createStore';
import { items as seriesFeed } from '../mobile_series.json';
import { items as blogersFeed } from '../blogers.json';
import { set as channels, icons as channelIcons } from '../channels.json';
import { SET_TRENDS, SET_MAIN_FEED, SET_TREND_VARIANT, SET_TIME, SET_SOURCE, SET_ALL_TRENDS_ON_MAIN } from './actionTypes';

interface Reducer extends redux.Reducer {
    (state: State, action: redux.AnyAction): State;
}

const defaultState = {
    trends: [],
    main: [],
    film: seriesFeed,
    series: seriesFeed,
    kids: seriesFeed,
    blogers: blogersFeed,
    sport: seriesFeed,
    music: seriesFeed,
    games: seriesFeed,
    channels: channels.map(({
        channel_id,
        computed_title,
        channel_category,
    }: any) => ({
            channelId: channel_id,
            title: computed_title,
            channelCategory: channel_category,
        })),
    channelIcons: channelIcons.map((item) => ({ position: item.position, iconUrl: item['url-white'] })),
    allTrendsOnMain: true,
    trendVariant: 'default',
    time: 7,
    source: 'efir',
};

export const saveState = (state: State) => {
    try {
        const serialisedState = JSON.stringify(state);

        window.localStorage.setItem('appState', serialisedState);
    } catch (err) {

        return;
    }
};

const loadStateFromLocalStorage = (state = {}) => {
    try {
      const serialisedState = window.localStorage.getItem('appState');

      if (!serialisedState) {
        return state;
      }

      return JSON.parse(serialisedState);
    } catch (err) {

        return state;
    }
};

const initialState = loadStateFromLocalStorage(defaultState);

export const reducer: Reducer = (state: State = initialState, action: redux.AnyAction) => {
    switch (action.type) {
        case SET_TRENDS:
            return {
                ...state,
                trends: action.payload,
            };
        case SET_MAIN_FEED:
            return {
                ...state,
                main: action.payload,
            };
        case SET_ALL_TRENDS_ON_MAIN:
            return {
                ...state,
                allTrendsOnMain: action.payload,
            };
        case SET_TREND_VARIANT:
            return {
                ...state,
                trendVariant: action.payload,
            };
        case SET_TIME:
            return {
                ...state,
                time: action.payload,
            };
        case SET_SOURCE:
            return {
                ...state,
                source: action.payload,
            };
        default:
            return state;
    }
};
