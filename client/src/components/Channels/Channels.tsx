import React from 'react';
import { State } from '../../store/createStore';
import { connect } from 'react-redux';
import { channelCategories } from './channelCategories';
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
    iconUrl: string;
}

interface ChannelProps {
    channels: Channel[];
    icons: Icons[];
}

class Channels extends React.Component<ChannelProps> {
    public renderItem(channel?: Channel) {
        if (!channel) {
            return (
                <div className="Channels-Item">
                    <div className="Channels-Icon" />
                    <a className="Channels-Link"
                        href="https://yandex.ru/efir?stream_active=channels-list%26from=efir">Список каналов</a>
                </div>
            );
        }
        const { icons } = this.props;
        const iconsItem = icons.find((item) => item.position.hasOwnProperty(channel.channelId));
        const iconUrl = iconsItem && `url('${iconsItem.iconUrl}')`;
        const position = iconsItem && iconsItem.position[channel.channelId] * 2.04;
        const url = `https://yandex.ru/efir?stream_channel=${channel.channelId}%26from=efir`;
        const title = channel.title;

        return (
            <div className="Channels-Item">
                <div className="Channels-Icon" style={{
                    backgroundImage: iconUrl,
                    backgroundPosition: position + '% 0',
                }} />
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

        return (
            <div className="Channels">
                {this.renderItem()}
                <div className="Channels-Category">РЕКОМЕНДАЦИИ</div>
                {this.renderItem(myEfir)}
                {channelCategories.map(this.renderCategory.bind(this))}
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    channels: state.channels,
    icons: state.channelIcons,
});

export default connect(mapStateToProps)(Channels);
