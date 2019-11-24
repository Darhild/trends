import React, { Component } from 'react';
import classnames from 'classnames';
import { State, Dispatch } from '../../store/createStore';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setTrendsThunk } from '../../store/thunks';
import Trend from '../../types/trend';
import TrendCard from '../TrendCard/TrendCard';
import './TrendsList.scss';

interface Props {
    trends: Trend[];
    variant: string;
    period: number;
    from: string;
    category: string;
    collectionsLength: number[];
    shortVariant?: boolean;
    onSetTrends(category: string, period: number, source?: string): void;
}

class TrendsList extends Component<Props> {
    public componentDidMount() {
        const { trends, category, period, from, onSetTrends } = this.props;
        if (!trends.length) {
            category === 'main'
            ? onSetTrends(category, period, from)
            : onSetTrends(category, period);
        }
    }

    public render() {
        const { trends, variant, category, shortVariant } = this.props;
        const cn = classnames(
            'TrendsList',
            variant && `TrendsList_variant_${variant}`,
            shortVariant && 'TrendsList_state_short',
        );

        if (!trends.length) {
            return null;
        }
        const items = shortVariant ? trends.slice(0, 5) : trends;

        return (
            <div className={cn}>
                {
                    items.map((props, index) => {
                        const { id, desc, source, commentsCount } = props;
                        const urlId = id ? id : desc;

                        return (
                            <Link className="TrendsList-Link TrendsList-Item" to={`/${category}/trends/${urlId}?source=${source}`}>
                                <TrendCard
                                    {...props}
                                    variant={variant}
                                    ratingPosition={index + 1}
                                    commentsCount={commentsCount}
                                />
                            </Link>
                        );
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    trends: state.trends,
    period: state.settings.period,
    from: state.settings.source,
    collectionsLength: state.trends.map((trend) => trend.commentsCount),
});

const mapDispatchToProps = (dispatch: Dispatch) =>  ({
        onSetTrends: (category: string, period: number, source?: string) => (
            dispatch(setTrendsThunk(category, period, source))),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendsList);
