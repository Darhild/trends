import React, { Component } from 'react';
import classnames from 'classnames';
import { ReactComponent as Grow } from '../../../images/svg/grow.svg';
import './style.scss';

interface Props {
    desc: string;
    variant?: string;
    className?: string;
}

const TrendDetails: React.FC< Props > = ({ desc, className, variant }) => {
    const cn = classnames(
        'TrendDetails',
        variant && `TrendDetails_variant_${variant}`,
        className,
    );

    return (
        <div className={cn}>
            <div className="TrendDetails-Label">
                <Grow className="TrendDetails-Icon" />
                <span>Сейчас популярно</span>
            </div>
            <div className="TrendDetails-Title">{desc}</div>
            <div className="TrendDetails-Count">123 видео и 2 тыс. историй</div>
        </div>
    );
};

export default TrendDetails;
