import React, { Component } from 'react';
import classnames from 'classnames';
import Trend from '../../types/trend';
import TrendDetails from './TrendDetails/TrendDetails';
import './TrendCard.scss';
import bgDefault from '../../images/efir_default-min.jpg';


interface Props extends Omit<Trend, 'id' | 'source' | 'collection' | 'stories'> {
    ratingPosition: number;
    collectionLength: number;
    className?: string;
    variant?: string;
    isWide?: boolean;
}

class TrendCard extends Component<Props> {
    public render() {
        const { img, desc, collectionLength, className, variant, ratingPosition = 1, poster, isWide } =  this.props;
        const cn = classnames(
            'TrendCard',
            variant && `TrendCard_variant_${variant}`,
            className,
            isWide && 'TrendCard_wide',
        );
        let bgUrl = poster ? poster : bgDefault;
        let cnDetails;
        if (isWide) {
            bgUrl = img ? img : bgDefault;
            cnDetails = 'TrendDetails_wide';
        }

        return (
            <div className={cn}>
                <div className="TrendCard-Poster" style={{ backgroundImage: `url(${bgUrl})` }}>
                </div>
                <TrendDetails desc={desc} variant={variant} collectionLength={collectionLength} className={cnDetails}/>
                <div className="TrendCard-Placeholder"></div>
                <div className="TrendCard-Number">{ratingPosition}</div>
            </div>
        );
    }

}

export default TrendCard;
