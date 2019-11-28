
import React, { Component } from 'react';
import { ReactComponent as Star } from '../../images/svg/star.svg';
import './Rating.scss';

interface Props {
    rating?: number;
    percentage?: number;
}

export default class Rating extends Component<Props> {
    public render() {
        const {
            rating,
            percentage,
        } = this.props;

        return (
            <div className="Rating">
                {
                    typeof rating === 'number'
                        ? <div className="Rating-Score">{Math.round(rating * 10) / 10}</div>
                        : null
                }
                {
                    typeof percentage === 'number'
                        ? <div className="Rating-Percentage"><Star className="StarIcon" />{`${percentage}%`}</div>
                        : null
                }
            </div>
        );
    }
}
