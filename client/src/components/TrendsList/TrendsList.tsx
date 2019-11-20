import React, { Component } from 'react';
import classnames from 'classnames';
import { State } from '../../store/createStore';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Trend from '../../types/trend';
import TrendCard from '../TrendCard/TrendCard';

import './TrendsList.scss';

interface Props {
    trends: Trend[];
    variant: string;
    category: string;
    shortVariant?: boolean;
}

class TrendsList extends Component<Props> {
    public render() {
        const { trends, variant, category, shortVariant } = this.props;
        const cn = classnames(
            'TrendsList',
            variant && `TrendsList_variant_${variant}`,
        );

        const items = shortVariant ? trends.slice(0, 5) : trends;

        return (
            <div className={cn}>
                {
                    items.map((props, index) => (
                        <Link className="TrendsList-Link TrendsList-Item" to={`/${category}/trends/${index + 1}`}>
                            <TrendCard
                                {...props}
                                variant={variant}
                                ratingPosition={index + 1}
                            />
                        </Link>
                    ))
                }
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    trends: state.trends,
});

export default connect(mapStateToProps)(TrendsList);
