import React, { Component } from 'react';
import queryString from 'query-string';
import { RouteComponentProps } from 'react-router';
import Title from '../../components/Title/Title';
import TrendsList from '../../components/TrendsList/TrendsList';

class TrendsPage extends Component<RouteComponentProps> {
    public render() {
        const params = queryString.parse(this.props.location.search);
        const variant = params.variant && !Array.isArray(params.variant)
            ? params.variant
            : 'default';

        return (
            <>
                <Title>Сейчас популярно</Title>
                <TrendsList variant={variant} />
            </>
        );
    }
}

export default TrendsPage;
