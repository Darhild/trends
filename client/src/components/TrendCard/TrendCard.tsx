import React, { Component } from 'react';
import classnames from 'classnames';
import Trend from '../../types/trend';
import TrendDetails from './TrendDetails/TrendDetails';
import './TrendCard.scss';
import bgDefault from '../../images/efir_default-min.jpg';


interface Props extends Omit<Trend, 'videos' | 'stories'> {
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
        const bgUrl = img ? img : bgDefault;

        return (
            <div className={cn}>
                <div className="TrendCard-Poster" style={{ backgroundImage: `url(${bgUrl})` }}>
                </div>
                <TrendDetails desc={desc} variant={variant} />
                <div className="TrendCard-Placeholder"></div>
                <div className="TrendCard-Number">{ratingPosition}</div>
            </div>
        );
    }

}

export default TrendCard;
