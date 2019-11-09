import React, { Component } from 'react';
import classnames from 'classnames';
import './Search.scss';
import Icon from '../Icon/Icon';
import { ReactComponent as SearchIcon } from '../../images/svg/search.svg';

interface SearchState {
    visible: boolean;
    value: string;
}

export default class Search extends Component<{}, SearchState> {
    constructor(props: object) {
        super(props);
        this.state = {
            visible: false,
            value: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            value: event.target.value,
        });
    }

    public handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        window.location.href = `https://yandex.ru/efir?stream_channel=1550142789&stream_active=serp&search_text=${this.state.value}`;
    }

    public render() {
        const cnSearch = classnames(
        'Search', 'Header-Search',
        this.state.visible && 'Search_state_mobile',
        );

        return (
        <div className={cnSearch}>
            <Icon className="Search-Icon">
            <SearchIcon onClick={() => {this.setState({
                visible: true,
            }); }}/>
            </Icon>
            <form className="Search-Form" onSubmit={this.handleSubmit}>
            <div className="Search-Close" onClick={() => {this.setState({
                visible: false,
            }); }}></div>
            <input className="Search-Input"
            placeholder={
                this.state.visible
                ? 'Канал, фильм или сериал'
                : 'Поиск по передачам и телеканалам'
            }
            onChange={this.handleChange}/>
            <button className="Search-Submit" type="submit">
                Найти
            </button>
            </form>
        </div>
        );
    }
}
