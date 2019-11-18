import React, { Component } from 'react';
import './SettingsPage.scss';
import { connect } from 'react-redux';
import { State } from '../../store/createStore';
import { selectExperiment, selectTime, selectSource } from './../../store/actions';

interface SettingProps {
    experiment: string;
    time: number;
    source: string;
    onChangeSelectExperiment: (value: string) => void;
    onChangeSelectTime: (value: number) => void;
    onChangeSelectSource: (value: string) => void;
}

class SettingsPage extends Component<SettingProps> {

    public handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {
            onChangeSelectExperiment,
            onChangeSelectTime,
            onChangeSelectSource,
        } = this.props;

        if (event.target.name === 'variant') {
            onChangeSelectExperiment(event.target.value);
        } else if (event.target.name === 'time') {
            onChangeSelectTime(Number(event.target.value));
        } else if (event.target.name === 'source') {
            onChangeSelectSource(event.target.value);
        }
    }

    public render() {
        const { experiment, time, source } = this.props;

        return (
            <div className="Settings">
                <div className="Settings-Item">
                    <div className="Settings-Text">Выберите вариант эксперимента:</div>
                    <select
                        className="Settings-Select"
                        name="variant"
                        value={experiment}
                        onChange={this.handleChange}
                    >
                        <option value="default">Дефолтный вариант</option>
                        <option value="second">Вариант 2</option>
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
    experiment: state.experiment,
    time: state.time,
    source: state.source,
});

const mapDispatchToProps = {
    onChangeSelectExperiment: selectExperiment,
    onChangeSelectTime: selectTime,
    onChangeSelectSource: selectSource,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
