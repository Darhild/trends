import React, { Component } from 'react';
import { ReactComponent as LikeIcon } from '../../images/svg/like.svg';
import './Likes.scss';

export default class Likes extends Component {
    public render() {
        return (
            <div className="Likes">
                <div className="Likes-Like">
                    <LikeIcon/>
                </div>
                <div className="Likes-Dislike">
                    <LikeIcon/>
                </div>
            </div>
        );
    }
}
