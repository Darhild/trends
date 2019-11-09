import React, { Component } from 'react';
import './Title.scss';

interface TitleProps {
    url?: string;
}

export default class Title extends Component<TitleProps> {
    public render() {
        const { url, children } = this.props;

        if (url) {
            return <a className="Title-Link" href={url}><div className="Title">{children}</div></a>;
        }

        return <div className="Title">{children}</div>;
    }
}
