import React, {Component} from 'react';
import './StarRating.scss';


export default class StarRating extends Component {
    public render() {
        return (
            <div className="StarRating">
                <div className="StarRating-Stars">
                    <div className="StarRating-Star"></div>
                    <div className="StarRating-Star"></div>
                    <div className="StarRating-Star"></div>
                    <div className="StarRating-Star"></div>
                    <div className="StarRating-Star"></div>
                </div>
                <div className="StarRaing-Dislike">
                    Не нравится
                </div>
            </div>
        );
    }
}