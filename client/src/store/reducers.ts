import * as redux from 'redux';
import { State } from '../store/createStore';
import { set as channels, icons as channelIcons } from '../channels.json';
import { filterChannels, mapChannels } from '../utils/mappers';
import {
    FETCH_TRENDS_REQUEST,
    FETCH_TRENDS_SUCCESS,
    FETCH_TRENDS_ERROR,
    FETCH_FEED_REQUEST,
    FETCH_FEED_SUCCESS,
    FETCH_FEED_ERROR,
    SET_COLLECTION,
    SET_COMMENTED,
    SET_TREND_VARIANT,
    SET_TRENDS_PERIOD,
    SET_VIDEOS_PERIOD,
    SET_SOURCE,
    SET_ALL_TRENDS_ON_MAIN,
} from './actionTypes';

interface Reducer extends redux.Reducer {
    (state: State, action: redux.AnyAction): State;
}

interface Settings {
    allTrendsOnMain: boolean;
    trendVariant: string;
    trendsPeriod: number;
    videosPeriod: number;
    source: string;
}

const defaultState = {
    feedIsLoading: false,
    trendsIsLoading: false,
    trends: [],
    commented: [],
    main: [],
    movie: [],
    series: [],
    kids: [],
    blogger: [],
    channels: channels.filter(filterChannels).map(mapChannels),
    channelIcons: channelIcons.map((item) => ({ position: item.position, iconUrl: item['url-white'] })),
    settings: {
        allTrendsOnMain: true,
        trendVariant: 'default',
        trendsPeriod: 1,
        videosPeriod: 1,
        source: 'efir',
    },
};

export const saveState = (state: State) => {
    try {
        const serializedSettings = JSON.stringify(state.settings);
        window.localStorage.setItem('settings', serializedSettings);
    } catch (err) {

        return;
    }
};

const loadStateFromLocalStorage = (settings: Settings) => {
    try {
      const serializedSettings = window.localStorage.getItem('settings');

      if (!serializedSettings) {
        return settings;
      }

      return JSON.parse(serializedSettings);
    } catch (err) {

        return settings;
    }
};

const initialState = {
    ...defaultState,
    settings: loadStateFromLocalStorage(defaultState.settings),
};

export const reducer: Reducer = (state: State = initialState, action: redux.AnyAction) => {
    switch (action.type) {
        case FETCH_TRENDS_REQUEST:
            return {
                ...state,
                trendsIsLoading: true,
            };
        case FETCH_TRENDS_SUCCESS:
            return {
                ...state,
                trends: action.payload,
                trendsIsLoading: false,
            };
        case FETCH_TRENDS_ERROR:
        return {
            ...state,
            trendsIsLoading: false,
        };
        case FETCH_FEED_REQUEST:
            return {
                ...state,
                feedIsLoading: true,
            };
        case FETCH_FEED_SUCCESS: {
            switch (action.tag) {
                case 'movie':
                    return {
                        ...state,
                        feedIsLoading: false,
                        movie: action.payload,
                    };
                case 'series':
                    return {
                        ...state,
                        feedIsLoading: false,
                        series: action.payload,
                    };
                case 'blogger':
                    return {
                        ...state,
                        feedIsLoading: false,
                        blogger: action.payload,
                    };
                case 'kids':
                    return {
                        ...state,
                        feedIsLoading: false,
                        kids: action.payload,
                    };
                default:
                    return {
                        ...state,
                        feedIsLoading: false,
                        main: action.payload,
                    };
            }
        }
        case FETCH_FEED_ERROR: return {
            ...state,
            feedIsLoading: false,
        };
        case SET_COLLECTION:
            const currentTrend = state.trends.find((trend) => trend.id === action.id);
            if (currentTrend) {
                currentTrend.collection = action.payload;
            }

            return {
                ...state,
            };
        case SET_COMMENTED:
            return {
                ...state,
                commented: action.payload,
            };
        case SET_ALL_TRENDS_ON_MAIN:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    allTrendsOnMain: action.payload,
                },
            };
        case SET_TREND_VARIANT:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    trendVariant: action.payload,
                },
            };
        case SET_TRENDS_PERIOD:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    trendsPeriod: action.payload,
                },
            };
        case SET_VIDEOS_PERIOD:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    videosPeriod: action.payload,
                },
            };
        case SET_SOURCE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    source: action.payload,
                },
            };
        default:
            return state;
    }
};
