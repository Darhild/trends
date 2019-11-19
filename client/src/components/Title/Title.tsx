import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Title.scss';

interface TitleProps {
    url?: string;
    route?: boolean;
}

export default class Title extends Component<TitleProps> {
    public render() {
        const { url, route, children } = this.props;
        const content = <div className="Title">{children}</div>;

        if (url) {
            return route
                ? <Link className="Title-Link" to={url}>{content}</Link>
                : <a className="Title-Link" href={url}>{content}</a>;
        }

        return content;
    }
}
