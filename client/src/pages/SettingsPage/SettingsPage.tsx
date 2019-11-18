import React, { Component } from 'react';
import './SettingsPage.scss';
import { connect } from 'react-redux';
import { State } from '../../store/createStore';
import { setTrendVariant, setTime, setSource, setAllTrendsOnMain } from './../../store/actions';

interface SettingProps {
    allTrendsOnMain: boolean;
    trendVariant: string;
    time: number;
    source: string;
    onChangeAllTrendsOnMain: (value: boolean) => void;
    onChangeTrendVariant: (value: string) => void;
    onChangeTime: (value: number) => void;
    onChangeSource: (value: string) => void;
}

class SettingsPage extends Component<SettingProps> {

    public handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {
            onChangeTrendVariant,
            onChangeAllTrendsOnMain,
            onChangeTime,
            onChangeSource,
        } = this.props;

        if (event.target.name === 'variant') {
            onChangeTrendVariant(event.target.value);
        } else if (event.target.name === 'main') {
            onChangeAllTrendsOnMain(Boolean(Number(event.target.value)));
        } else if (event.target.name === 'time') {
            onChangeTime(Number(event.target.value));
        } else if (event.target.name === 'source') {
            onChangeSource(event.target.value);
        }
    }

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
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
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
    time: state.time,
    source: state.source,
});

const mapDispatchToProps = {
    onChangeAllTrendsOnMain: setAllTrendsOnMain,
    onChangeTrendVariant: setTrendVariant,
    onChangeTime: setTime,
    onChangeSource: setSource,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
