import React, { Component } from 'react';
import queryString from 'query-string';
import { RouteComponentProps } from 'react-router';
import Title from '../../components/Title/Title';
import TrendsList from '../../components/TrendsList/TrendsList';

interface TParam { category: string; }

class TrendsPage extends Component<RouteComponentProps<TParam>> {
    public render() {
        const params = queryString.parse(this.props.location.search);
        const { category } = this.props.match.params;
        const variant = params.variant && !Array.isArray(params.variant)
            ? params.variant
            : 'default';

        return (
            <>
                <Title>Сейчас популярно</Title>
                <TrendsList variant={variant} category={category}/>
            </>
        );
    }
}

export default TrendsPage;
