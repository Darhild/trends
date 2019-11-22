import React, { Component } from 'react';
import classnames from 'classnames';
import { State, Dispatch } from '../../store/createStore';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setTrendsThunk, setCollectionThunk } from '../../store/thunks';
import Trend from '../../types/trend';
import TrendCard from '../TrendCard/TrendCard';
import './TrendsList.scss';

interface Props {
    trends: Trend[];
    variant: string;
    category: string;
    collectionsLength: number[];
    shortVariant?: boolean;
    onInitCollection: (collectionId: string) => void;
    onInitTrends(): void;
}

class TrendsList extends Component<Props> {
    public componentDidMount() {
        const { trends, onInitTrends, onInitCollection } = this.props;
        if (!trends.length) {
            onInitTrends();
        } else {
            trends.forEach((trend) => {
                const { id, source } = trend;
                if (source === 'efir') {
                    onInitCollection(id);
                }
            });
        }
    }

    public componentDidUpdate(prevProps: Props) {
        const { trends, onInitCollection } = this.props;
        if (trends !== prevProps.trends) {
            trends.forEach((trend) => {
                const { id, source } = trend;
                if (source === 'efir') {
                    onInitCollection(id);
                }
            });
        }
    }

    public render() {
        const { trends, variant, category, shortVariant } = this.props;
        const cn = classnames(
            'TrendsList',
            variant && `TrendsList_variant_${variant}`,
            shortVariant && 'TrendsList_state_short',
        );

        const items = shortVariant ? trends.slice(0, 5) : trends;

        return (
            <div className={cn}>
                {
                    items.map((props, index) => {
                        const { id, desc, source, collectionLength } = props;
                        const urlId = id ? id : desc;

                        return (
                            <Link className="TrendsList-Link TrendsList-Item" to={`/${category}/trends/${urlId}?source=${source}`}>
                                <TrendCard
                                    {...props}
                                    variant={variant}
                                    ratingPosition={index + 1}
                                    collectionLength={collectionLength}
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
    collectionsLength: state.trends.map((trend) => trend.collectionLength),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onInitTrends: () => dispatch(setTrendsThunk()),
    onInitCollection: (id: string) => dispatch(setCollectionThunk(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendsList);
