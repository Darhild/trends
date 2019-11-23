import React from 'react';
import classnames from 'classnames';
import { ReactComponent as Grow } from '../../../images/svg/grow.svg';
import './TrendDetails.scss';

interface Props {
    desc: string;
    collectionLength: number;
    variant?: string;
    className?: string;
}

const TrendDetails: React.FC< Props > = ({ desc, collectionLength, className, variant }) => {
    const cn = classnames(
        'TrendDetails',
        variant && `TrendDetails_variant_${variant}`,
        className,
    );
    const count = `${collectionLength} видео и 2 тыс. историй`;

    return (
        <div className={cn}>
            <div className="TrendDetails-Label">
                <Grow className="TrendDetails-Icon" />
                <span className="TrendDetails-Caption">Сейчас популярно</span>
            </div>
            <div className="TrendDetails-Info">
                <div className="TrendDetails-Title">{desc}</div>
                <div className="TrendDetails-Count">{count}</div>
            </div>
        </div>
    );
};

export default TrendDetails;
