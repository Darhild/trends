import { createStore, applyMiddleware, AnyAction } from 'redux';
import { reducer } from './reducers';
import thunk, { ThunkDispatch } from 'redux-thunk';
import Trend from '../types/trend';
import { items } from '../feed.json';
import { items as seriesFeed } from '../mobile_series.json';
import { items as blogersFeed } from '../blogers.json';
import { items as mainFeed } from '../desktop_all.json';
import { set as channels, icons as channelIcons } from '../channels.json';

export interface State {
    trends: Trend[];
    [name: string]: any;
}

interface StoreExtension {
    dispatch: ThunkDispatch<State, void, AnyAction>;
}

const trends: any[] = items[0].includes;
const initialState = {
    trends: trends.map(({ title, thumbnail }: any) => ({ desc: title, img: thumbnail }) ),
    main: mainFeed,
    film: seriesFeed,
    series: seriesFeed,
    kids: seriesFeed,
    blogers: blogersFeed,
    sport: seriesFeed,
    music: seriesFeed,
    games: seriesFeed,
    channels: channels.map(({ channel_id, title, channel_category }: any) =>
                            ({ channelId: channel_id, title, channelCategory: channel_category })),
    channelIcons: channelIcons.map((item) => ({ position: item.position, iconUrl: item['url-white'] })),
};
const store = createStore<State, AnyAction, StoreExtension, void>(reducer, initialState, applyMiddleware(thunk));

export default store;
