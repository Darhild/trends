import * as redux from 'redux';
import { State } from '../store/createStore';
import { items as seriesFeed } from '../mobile_series.json';
import { items as blogersFeed } from '../blogers.json';
import { set as channels, icons as channelIcons } from '../channels.json';
import { SET_TRENDS, SET_MAIN_FEED } from './actionTypes';

interface Reducer extends redux.Reducer {
    (state: State, action: redux.AnyAction): State;
}

const initialState = {
    trends: [],
    main: [],
    film: seriesFeed,
    series: seriesFeed,
    kids: seriesFeed,
    blogers: blogersFeed,
    sport: seriesFeed,
    music: seriesFeed,
    games: seriesFeed,
    channels: channels.map(({ channel_id, computed_title }: any) => ({ channelId: channel_id, title: computed_title })),
    channelIcons: channelIcons.map((item) => ({ position: item.position, iconUrl: item['url-white'] })),
};

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
        default:
            return state;
    }
};
