import React from 'react';
import { ReactComponent as Like } from '../../images/svg/like.svg';
import { ReactComponent as Next } from '../../images/svg/next.svg';
import './Player.scss';
import classnames from 'classnames';


interface PlayerProps {
    url?: string;
    preview?: string;
    title?: string;
    blogger?: any;
    className?: string;
}

class Player extends React.Component<PlayerProps> {
    public static defaultProps = {
        url: 'https://strm.yandex.ru/vh-ott-converted/ott-content/481883744-4279c3b744c498bbb5beedf09a8debcf/master_quality.m3u8',
        // tslint:disable-next-line:max-line-length
        preview: '//avatars.mds.yandex.net/get-vh/175796/13996069488215590475-ZFAyqdyKUVMfn2k2elQJAA-1528154905/400x300',
        title: 'Области тьмы',
        blogger: '',
    };

    public render() {
        const { url, preview, title, blogger, className } = this.props;
        if (!url) {
            return null;
        }

        const playerCn = classnames(
            'Player',
            className,
        );

        const src = `https://yastatic.net/yandex-video-player-iframe-api/index.html?stream_url=${url}&preview=${preview}&preload=false`;

        return (
            <div className={playerCn}>
                <div className="Player-Container">
                    <iframe
                        title="Player"
                        src={src}
                        className="Player-Iframe"
                        allow="fullscreen"
                    />
                </div>
                <div className="Player-Info">
                    {blogger && <img className="Player-Avatar" src={blogger.avatar} alt="avatar" />}
                    <div className="Player-Text">
                        <div className="Player-Title">{title}</div>
                        {blogger && <div className="Player-Channel">{blogger.title}</div>}
                    </div>
                    <div className="Player-Controls">
                        <div className="Player-Icon Player-Icon_like">
                            <Like width="16px" height="16px" />
                        </div>
                        <div className="Player-Icon Player-Icon_dislike">
                            <Like width="16px" height="16px" />
                        </div>
                        <div className="Player-Icon Player-Icon_next">
                            <Next />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;
