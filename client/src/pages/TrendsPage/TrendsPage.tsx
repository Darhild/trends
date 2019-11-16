import React, { Component } from 'react';
import { connect } from 'react-redux';
import Title from '../../components/Title/Title';
import TrendsList from '../../components/TrendsList/TrendsList';
import { State } from '../../store/createStore';

interface TrendsPageProps {
    variant: string;
}

class TrendsPage extends Component<TrendsPageProps> {
    public render() {
        const { variant } = this.props;

        return (
            <>
                <Title>Сейчас популярно</Title>
                <TrendsList variant={variant} category={category}/>
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({
    variant: state.experiment,
});

export default connect(mapStateToProps)(TrendsPage);
