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
    id?: string;
    title: string;
    channelId?: string[];
}

interface Icons {
    position: {
        [keys: string]: number,
    };
    iconUrl: string;
}

interface ChannelsProps {
    channels: Channel[];
    icons: Icons[];
}

interface ChannelsItemProps {
    title: string;
    url: string;
    iconUrl?: string;
    position?: number;
}

const ChannelsItem = ({ title, url, iconUrl, position }: ChannelsItemProps) => (
    <div className="Channels-Item">
        <div className="Channels-Icon"
        style={{
            backgroundImage: iconUrl,
            backgroundPosition: position + '% 0',
        }}/>
        <a className="Channels-Link" href={url}>{title}</a>
    </div>
);

class Channels extends React.Component<ChannelsProps> {
    public getIconProps = (channelId: string) => {
        const { icons } = this.props;
        const iconsItem = icons.find((item) => item.position.hasOwnProperty(channelId));
        const iconUrl = iconsItem && `url('${iconsItem.iconUrl}')`;
        const position = iconsItem && iconsItem.position[channelId] * 2.04;

        return { iconUrl, position };
    }

    public getCategoryChannels = (category: ChannelCategory) => {
        const { id, channelId } = category;
        const { channels } = this.props;
        if (channelId) {
            return channelId.map((item) => channels.find((channel) => (channel.channelId === item)));
        }
        if (id) {
            return channels.filter((item) => (item.channelCategory && item.channelCategory.includes(id)));
        }

        return null;
    }

    public renderItem = (channel?: Channel) => {
        if (!channel) {
            return <ChannelsItem
                title="Список каналов"
                url="https://yandex.ru/efir?stream_active=channels-list%26from=efir" />;
        }
        const { iconUrl, position } = this.getIconProps(channel.channelId);
        const url = `https://yandex.ru/efir?stream_channel=${channel.channelId}%26from=efir`;

        return (
            <ChannelsItem
                title={channel.title}
                url={url}
                iconUrl={iconUrl}
                position={position} />
        );
    }

    public renderCategory = (category: ChannelCategory) => {
        const { title } = category;
        const categoryChannels = this.getCategoryChannels(category);

        return (categoryChannels &&
            <>
                <div className="Channels-Category">{title}</div>
                {categoryChannels.map(this.renderItem)}
            </>
        );
    }

    public render() {
        return (
            <div className="Channels">
                {this.renderItem()}
                {channelCategories.map(this.renderCategory)}
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    channels: state.channels,
    icons: state.channelIcons,
});

export default connect(mapStateToProps)(Channels);
