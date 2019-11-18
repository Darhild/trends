import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Title.scss';

interface TitleProps {
    url?: string;
    route?: boolean;
}

const TitleContent: React.FC = ({ children }) => (
    <div className="Title">{children}</div>
);

export default class Title extends Component<TitleProps> {
    public render() {
        const { url, route, children } = this.props;
        if (route && url) {
            return <Link className="Title-Link" to={url}>><TitleContent children={children}/></Link>;

        }
        if (url) {
            return <a className="Title-Link" href={url}><TitleContent children={children}/></a>;
        }

        return <TitleContent children={children}/>;
    }
}
