import React, {Component} from 'react';
import './StarRating.scss';


export default class StarRating extends Component {
    public render() {
        return (
            <div className="StarRating">
                <div className="StarRating-Stars">
                    <div className="StarRating-Star">
                        <svg className="StarRating-Icon" viewBox="0 30 30 30">
                            <use xlinkHref="../../images/star.svg" />
                        </svg>
                    </div>
                    <div className="StarRating-Star"></div>
                    <div className="StarRating-Star"></div>
                    <div className="StarRating-Star"></div>
                    <div className="StarRating-Star"></div>
                </div>
                <div className="StarRating-Dislike">
                    Не интересно
                </div>
            </div>
        );
    }
}