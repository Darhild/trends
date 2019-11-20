import React, { Component } from 'react';
import './SettingsPage.scss';
import { connect } from 'react-redux';
import { State } from '../../store/createStore';
import { setTrendVariant, setPeriod, setSource, setAllTrendsOnMain } from './../../store/actions';

interface SettingProps {
    allTrendsOnMain: boolean;
    trendVariant: string;
    time: number;
    source: string;
    onChangeAllTrendsOnMain: (value: boolean) => void;
    onChangeTrendVariant: (value: string) => void;
    onChangePeriod: (value: number) => void;
    onChangeSource: (value: string) => void;
}

class SettingsPage extends Component<SettingProps> {

    public handleChangeTrendVariant = (event: React.ChangeEvent<HTMLSelectElement>) =>
        this.props.onChangeTrendVariant(event.target.value)

    public handleChangeAllTrendsOnMain = (event: React.ChangeEvent<HTMLSelectElement>) =>
        this.props.onChangeAllTrendsOnMain(Boolean(Number(event.target.value)))

    public handleChangeTime = (event: React.ChangeEvent<HTMLSelectElement>) =>
        this.props.onChangePeriod(Number(event.target.value))

    public handleChangeSource = (event: React.ChangeEvent<HTMLSelectElement>) =>
        this.props.onChangeSource(event.target.value)

    public render() {
        const { allTrendsOnMain, trendVariant, time, source } = this.props;

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
                    <div className="Settings-Text">Выберите время:</div>
                    <select
                        className="Settings-Select"
                        name="time"
                        value={time}
                        onChange={this.handleChangeTime}
                    >
                        <option value="1" >День</option>
                        <option value="7" >Неделя</option>
                        <option value="30" >Месяц</option>
                    </select>
                </div>
                <div className="Settings-Item">
                    <div className="Settings-Text">Выберите источник:</div>
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
    period: state.period,
    source: state.source,
});

const mapDispatchToProps = {
    onChangeAllTrendsOnMain: setAllTrendsOnMain,
    onChangeTrendVariant: setTrendVariant,
    onChangePeriod: setPeriod,
    onChangeSource: setSource,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
