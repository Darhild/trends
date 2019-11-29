import React from 'react';
import classnames from 'classnames';
import { ReactComponent as Checkmark } from '../../images/svg/checkmark.svg';
import { ReactComponent as Camera } from '../../images/svg/camera.svg';
import { ReactComponent as User } from '../../images/svg/user.svg';
import './Button.scss';

interface ButtonProps {
    type: string;
}

interface SubscribeButtonState {
    isSubscribed?: boolean;
}

interface TypedButtonProps {
    cn: string;
}

interface ButtonsTypes {
    [propName: string]: React.ReactElement;
}

class SubscribeButton extends React.Component<TypedButtonProps, SubscribeButtonState> {
    public state = {
        isSubscribed: false,
    };

    public subscribe = () => {
        this.setState((state) => ({
            isSubscribed: !state.isSubscribed,
        }));
    }

    public render = () => {
        const { cn } = this.props;
        const { isSubscribed } = this.state;
        const subscribeButtonCn = classnames(cn, isSubscribed && 'Button_subscribe_off');

        return (
            <div className={subscribeButtonCn} onClick={this.subscribe}>
                {isSubscribed
                    ? <>
                        <Checkmark className="Button-Icon"/>
                        <span>Вы подписаны</span>
                    </>
                    : <span>Подписаться</span>}
            </div>
        );
    }
}

const AddVideoButton = ({ cn }: TypedButtonProps) => (
    <div className={cn}>
        <Camera className="Button-Icon"/>
        <span>Добавить видео</span>
    </div>
);

const AuthorizationButton = ({ cn }: TypedButtonProps) => (
    <a href="https://passport.yandex.ru/auth" className={cn} target="_blank" rel="noopener noreferrer">
        <User className="Button-Icon"/>
        <div className="Button-Text">Войти</div>
    </a>
);


const Button = ({ type }: ButtonProps) => {
        const buttonCn = classnames('Button', `Button_type_${type}`);

        const buttons: ButtonsTypes = {
            subscribe: (
                <SubscribeButton cn={buttonCn} />
            ),
            authorization: (
                <AuthorizationButton cn={buttonCn} />
            ),
            addVideo: (
                <AddVideoButton cn={buttonCn} />
            ),
        };

        return buttons[type];
};

export default Button;
