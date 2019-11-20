import React, { Component } from 'react';
import './SettingsPage.scss';
import { connect } from 'react-redux';
import { State } from '../../store/createStore';
import { setTrendVariant, setSource, setAllTrendsOnMain } from './../../store/actions';

interface SettingProps {
    allTrendsOnMain: boolean;
    trendVariant: string;
    source: string;
    onChangeAllTrendsOnMain: (value: boolean) => void;
    onChangeTrendVariant: (value: string) => void;
    onChangeSource: (value: string) => void;
}

class SettingsPage extends Component<SettingProps> {

    public handleChangeTrendVariant = (event: React.ChangeEvent<HTMLSelectElement>) =>
        this.props.onChangeTrendVariant(event.target.value)

    public handleChangeAllTrendsOnMain = (event: React.ChangeEvent<HTMLSelectElement>) =>
        this.props.onChangeAllTrendsOnMain(Boolean(Number(event.target.value)))

    public handleChangeSource = (event: React.ChangeEvent<HTMLSelectElement>) =>
        this.props.onChangeSource(event.target.value)

    public render() {
        const { allTrendsOnMain, trendVariant, source } = this.props;

        return (
            <div className="Settings">
                <div className="Settings-Item">
                    <div className="Settings-Text">Выберите вариант отображения карточки тренда:</div>
                    <select
                        className="Settings-Select"
                        name="variant"
                        value={trendVariant}
                        onChange={this.handleChangeTrendVariant}
                    >
                        <option value="default">Широкие карточки</option>
                        <option value="second">Карточки с вынесеным описанием</option>
                    </select>
                </div>
                <div className="Settings-Item">
                    <div className="Settings-Text">Выберите вариант отображения трендов на главной:</div>
                    <select
                        className="Settings-Select"
                        name="main"
                        value={Number(allTrendsOnMain)}
                        onChange={this.handleChangeAllTrendsOnMain}
                    >
                        <option value={1} >Все тренды (карусель)</option>
                        <option value={0} >Топ-5</option>
                    </select>
                </div>
                <div className="Settings-Item">
                    <div className="Settings-Text">Выберите источник трендов:</div>
                    <select
                        className="Settings-Select"
                        name="source"
                        value={source}
                        onChange={this.handleChangeSource}
                    >
                        <option value="efir" >Яндекс.Эфир</option>
                        <option value="google" >Google</option>
                        <option value="mix" >Mixed</option>
                    </select>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    allTrendsOnMain: state.allTrendsOnMain,
    trendVariant: state.trendVariant,
    source: state.source,
});

const mapDispatchToProps = {
    onChangeAllTrendsOnMain: setAllTrendsOnMain,
    onChangeTrendVariant: setTrendVariant,
    onChangeSource: setSource,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
