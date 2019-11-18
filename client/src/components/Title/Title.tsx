import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Title.scss';

interface TitleProps {
    url?: string;
    linkUrl?: string;
}

export default class Title extends Component<TitleProps> {
    public render() {
        const { url, linkUrl, children } = this.props;
        if (url) {
            return <a className="Title-Link" href={url}><div className="Title">{children}</div></a>;
        }
        if (linkUrl) {
            return <Link className="Title-Link" to={linkUrl}><div className="Title">{children}</div></Link>;

        }

        return <div className="Title">{children}</div>;
    }
}
