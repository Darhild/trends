import React, { Component } from 'react';
import classnames from 'classnames';
import { State } from '../../store/createStore';
import { connect } from 'react-redux';
import Trend from '../../types/trend';
import TrendCard from '../TrendCard/TrendCard';

import './TrendsList.scss';

interface Props {
    trends: Trend[];
    variant: string;
}

class TrendsList extends Component<Props> {
    public render() {
        const { trends, variant } = this.props;
        const cn = classnames(
            'TrendsList',
            variant && `TrendsList_variant_${variant}`,
        );

        return (
            <div className={cn}>
                {
                    trends.map((props, index) =>
                        <TrendCard
                            {...props}
                            className="TrendsList-Item"
                            variant={variant}
                            ratingPosition={index + 1}
                        />)
                }
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    trends: state.trends,
});

export default connect(mapStateToProps)(TrendsList);
