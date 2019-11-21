import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import './Title.scss';

interface TitleProps {
    cn?: string;
    url?: string;
    route?: boolean;
}

export default class Title extends Component<TitleProps> {
    public render() {
        const { cn, url, route, children } = this.props;
        const cnTitle = classnames('Title', cn);
        const content = <div className={cnTitle}>{children}</div>;

        if (url) {
            return route
                ? <Link className="Title-Link" to={url}>{content}</Link>
                : <a className="Title-Link" href={url}>{content}</a>;
        }

        return content;
    }
}
