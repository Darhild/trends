import React from 'react';
import classnames from 'classnames';
import Button from './../Button/Button';
import './Authorization.scss';

interface AuthorizationProps {
    className?: string;
}

const Authorization = ({ className }: AuthorizationProps) => {
    const authorizationCn = classnames(
        'Authorization',
        className,
    );

    return (
        <div className={authorizationCn}>
            <a href="https://passport.yandex.ru/registration" target="_blank" className="Authorization-SignIn">
                Регистрация
            </a>
            <Button type="authorization" />
        </div>
    );
};

export default Authorization;
