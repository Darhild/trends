import React from 'react';
import classnames from 'classnames';
import { ReactComponent as Grow } from '../../../images/svg/grow.svg';
import { getPlural } from '../../../utils';
import './TrendDetails.scss';

interface Props {
    desc: string;
    commentsCount: number;
    variant?: string;
    className?: string;
}

const TrendDetails: React.FC< Props > = ({ desc, commentsCount, className, variant }) => {
    const cn = classnames(
        'TrendDetails',
        variant && `TrendDetails_variant_${variant}`,
        className,
    );

    const dictionary = {
        one: 'комментраий',
        few: 'комментария',
        many: 'комментариев',
    };

    const count = `${commentsCount} ${getPlural(commentsCount, dictionary)}`;

    return (
        <div className={cn}>
            <div className="TrendDetails-Label">
                <Grow className="TrendDetails-Icon" />
                <span className="TrendDetails-Caption">Сейчас популярно</span>
            </div>
            <div className="TrendDetails-Info">
                <div className="TrendDetails-Title">{desc}</div>
                {count && <div className="TrendDetails-Count">{count}</div>}
            </div>
        </div>
    );
};

export default TrendDetails;
