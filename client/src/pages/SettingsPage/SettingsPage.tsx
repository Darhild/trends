import React, { Component } from 'react';
import './SettingsPage.scss';
import { connect } from 'react-redux';
import { State } from '../../store/createStore';
import { selectExperiment, selectTime, selectSource } from './../../store/actions';

interface SettingProps {
    experiment: string;
    time: number;
    source: string;
    selectExperiment: (value: string) => void;
    selectTime: (value: number) => void;
    selectSource: (value: string) => void;
}

class SettingsPage extends Component<SettingProps> {
    constructor(props: SettingProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
      }

    public handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        if (event.target.name === 'variant') {
            this.props.selectExperiment(event.target.value);
        } else if (event.target.name === 'time') {
            this.props.selectTime(+event.target.value);
        } else if (event.target.name === 'source') {
            this.props.selectSource(event.target.value);
        }
    }

    public render() {
        return (
            <div className="Settings">
                <div className="Settings-Item">
                    <div className="Settings-Text">Выберите вариант эксперимента:</div>
                    <select
                        className="Settings-Select"
                        name="variant"
                        value={this.props.experiment}
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
                        value={this.props.time}
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
                        value={this.props.source}
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
    selectExperiment,
    selectTime,
    selectSource,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
