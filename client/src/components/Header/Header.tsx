import React, { Component } from 'react';
import './Header.scss';
import { ReactComponent as Logo } from '../../images/svg/logo.svg';
import Search from './../Search/Search';

class Header extends Component {
    public render() {
        return (
            <div className="Header">
                <div className="Header-Logo">
                    <Logo />
                </div>
                <Search />
            </div>
        );
    }
}

export default Header;
