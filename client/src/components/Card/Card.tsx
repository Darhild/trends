import React, { Component } from 'react';
import classnames from 'classnames';
import './Card.scss';
import { changeImageSize } from '../../utils/images';

export interface Props {
    title?: React.ReactNode;
    titleClass?: string;
    subtitle?: React.ReactNode;
    subtitleClass?: string;
    details?: React.ReactNode;
    content?: React.ReactNode;
    rightContent?: React.ReactNode;
    className?: string;
    img?: string;
    imgView?: string;
    size?: string;
    content_id?: string;
    poster?: string;
    bgColor?: string;
    withFooter?: boolean;
    shadowed?: boolean;
    bold?: boolean;
}

export default class Card extends Component<Props> {
    public renderContent() {
        const {
            title,
            titleClass,
            subtitle,
            subtitleClass,
            content,
            rightContent,
            bold,
        } = this.props;

        const titleCn = classnames(
            'Card-Title',
            bold && 'Card-Title_bold',
            titleClass,
        );

        const subtitleCn = classnames(
            'Card-Subtitle',
            bold && 'Card-Subtitle_bold',
            subtitleClass,
        );

        const titles = (
            <>
                {title && <div className={titleCn} >{title}</div>}
                {subtitle && <div className={subtitleCn}>{subtitle}</div>}
                {content}
            </>
        );

        if (rightContent) {
            return (
                <div className="Card-Content Card-Content_view_grid">
                    <div className="Card-Left">{titles}</div>
                    <div className="Card-Right">{rightContent}</div>
                </div>
            );
        }

        return <div className="Card-Content">{titles}</div>;
    }


    public render() {
        const {
            className,
            size = 'medium',
            content_id,
            bgColor,
            withFooter = true,
            img,
            imgView,
            details,
            poster,
            shadowed,
        } = this.props;

        const cardCn = classnames(
            'Card',
            `Card_size_${size}`,
            bgColor && `Card_bgColor_${bgColor}`,
            className,
        );

        const thumbCn = classnames(
            'Card-Thumb',
            imgView && `Card-Thumb_view_${imgView}`,
            shadowed && 'Card-Thumb_shadowed',
        );

        const background = { backgroundImage: img ? `url(${changeImageSize(img)})` : '' };

        return (
            <a
                className={cardCn}
                href={`https://yandex.ru/efir?from=efir&stream_id=${content_id}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <div
                    className={thumbCn}
                    style={background}
                >
                    {
                        poster && <img src={changeImageSize(poster, '200x150')} className="Card-Poster" alt="" />
                    }
                    {
                        details && <div className="Card-Details">{details}</div>
                    }
                    {!withFooter && this.renderContent()}
                </div>
                {withFooter && this.renderContent()}
            </a>
        );
    }
}
