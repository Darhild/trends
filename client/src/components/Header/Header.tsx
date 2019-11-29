import React, { Component } from 'react';
import './Header.scss';
import { ReactComponent as Logo } from '../../images/svg/logo.svg';
import Search from './../Search/Search';
import Authorization from './../Authorization/Authorization';

class Header extends Component {
    public render() {
        return (
            <div className="Header">
                <div className="Header-Logo">
                    <Logo />
                </div>
                <Search />
                <Authorization className="Header-Authorization" />
            </div>
        );
    }
}

export default Header;
