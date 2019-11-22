import React, { Component } from 'react';
import './Duration.scss';
import { convertTime } from '../../utils';

interface Props {
    duration: number;
}

export default class Duration extends Component<Props> {
    public render() {
        return (
            <div className="Duration">
                {convertTime(this.props.duration)}
            </div>
        );
    }
}
