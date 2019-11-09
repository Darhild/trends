import React, { Component } from 'react';
import classnames from 'classnames';
import Trend from '../../types/trend';
import { ReactComponent as Grow } from '../../images/svg/grow.svg';
import './style.scss';


interface Props extends Trend {
    ratingPosition: number;
    className?: string;
    variant?: string;
}

class TrendCard extends Component<Props> {
    public render() {
        const { img, desc, className, variant, ratingPosition } =  this.props;
        const cn = classnames(
            'TrendCard',
            variant && `TrendCard_variant_${variant}`,
            className,
        );

        return (
            <div className={cn}>
                <div className="TrendCard-Poster" style={{ backgroundImage: `url(${img})` }}>
                </div>
                <div className="TrendCard-Details TrendDetails">
                    <div className="TrendDetails-Label"><Grow className="TrendDetails-Icon"/>
                        <span>Сейчас популярно</span>
                    </div>
                    <div className="TrendDetails-Title">{desc}</div>
                    <div className="TrendDetails-Count">123 видео и 2 тыс. историй</div>
                </div>
                <div className="TrendCard-Placeholder"></div>
                <div className="TrendCard-Number">{ratingPosition}</div>
            </div>
        );
    }

}

export default TrendCard;
