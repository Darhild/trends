import * as redux from 'redux';
import { State } from '../store/createStore';
import { set as channels, icons as channelIcons } from '../channels.json';
import { SET_TRENDS, SET_FEED, SET_TREND_VARIANT, SET_PERIOD, SET_SOURCE, SET_ALL_TRENDS_ON_MAIN } from './actionTypes';

interface Reducer extends redux.Reducer {
    (state: State, action: redux.AnyAction): State;
}

const defaultState = {
    trends: [],
    main: [],
    movie: [],
    series: [],
    kids: [],
    blogger: [],
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
    period: 1,
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
        case SET_FEED: {
            switch (action.tag) {
                case 'movie':
                    return {
                        ...state,
                        movie: action.payload,
                    };
                case 'series':
                    return {
                        ...state,
                        series: action.payload,
                    };
                case 'blogger':
                    return {
                        ...state,
                        blogger: action.payload,
                    };
                case 'kids':
                    return {
                        ...state,
                        kids: action.payload,
                    };
                default:
                    return {
                        ...state,
                        main: action.payload,
                    };
            }
        }
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
        case SET_PERIOD:
            return {
                ...state,
                period: action.payload,
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
