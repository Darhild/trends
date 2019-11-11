import React from 'react';
import { State } from '../../store/createStore';
import { connect } from 'react-redux';
import './Channels.scss';

interface Channel {
    channelId: string;
    title: string;
    channelCategory: string[];
}

interface ChannelCategory {
    id: string;
    title: string;
}

interface Icons {
    position: {
        [keys: string]: number,
    };
    'url-black': string;
    'url-white': string;
}

interface ChannelProps {
    channels: Channel[];
    icons: Icons[];
}

const channelCategories = [
    {
        id: 'own_region',
        title: 'МОЙ РЕГИОН',
    },
    {
        id: 'yandex',
        title: 'КАНАЛЫ ЯНДЕКСА',
    },
    {
        id: 'inform',
        title: 'ИНФОРМАЦИОННЫЕ',
    },
    {
        id: 'entertain',
        title: 'РАЗВЛЕКАТЕЛЬНЫЕ',
    },
    {
        id: 'business',
        title: 'БИЗНЕС',
    },
    {
        id: 'спорт',
        title: 'СПОРТИВНЫЕ',
    },
    {
        id: 'music',
        title: 'МУЗЫКАЛЬНЫЕ',
    },
    {
        id: 'educate',
        title: 'ПОЗНАВАТЕЛЬНЫЕ',
    },
    {
        id: 'films',
        title: 'КИНО И СЕРИАЛЫ',
    },
    {
        id: 'foreign',
        title: 'МЕЖДУНАРОДНЫЕ',
    },
    {
        id: 'region',
        title: 'РЕГИОНАЛЬНЫЕ',
    },
];

class Channels extends React.Component<ChannelProps> {
    public renderItem(channel?: Channel) {
        let iconUrl = '';
        let position = 0;
        const { icons } = this.props;
        icons.forEach((item) => {
            for (const key in item.position) {
                if (channel && key === channel.channelId) {
                    iconUrl = `url('${item['url-white']}')`;
                    position = item.position[key] * 2.04;
                }
            }
        });
        const url = channel
            ? `https://yandex.ru/efir?stream_channel=${channel.channelId}%26from=efir`
            : 'https://yandex.ru/efir?stream_active=channels-list%26from=efir';
        const title = channel ? channel.title : 'Список каналов';

        return (
            <div className="Channels-Item">
                <div className="Channels-Icon" style={{
                    backgroundImage: iconUrl,
                    backgroundPosition: position + '% 0',
                }}></div>
                <a className="Channels-Link" href={url}>{title}</a>
            </div>
        );
    }

    public renderCategory(category: ChannelCategory) {
        const { id, title } = category;
        const { channels } = this.props;

        return (
            <>
                <div className="Channels-Category">{title}</div>
                {channels.map((channel) => {
                    const { channelCategory } = channel;

                    return channelCategory && channelCategory.includes(id) && this.renderItem(channel);
                })}
            </>
        );
    }

    public render() {
        const { channels } = this.props;
        const myEfir = channels.find((channel) => channel.channelId === '1550142789');

        return (<div className="Channels">
            {this.renderItem()}
            <div className="Channels-Category">РЕКОМЕНДАЦИИ</div>
            {this.renderItem(myEfir)}
            {channelCategories.map((category) => this.renderCategory(category))}
        </div>);
    }
}

const mapStateToProps = (state: State) => ({
    channels: state.channels,
    icons: state.channelIcons,
});

export default connect(mapStateToProps)(Channels);
