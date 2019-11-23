import React from 'react';
import classnames from 'classnames';
import { ReactComponent as Checkmark } from '../../images/svg/checkmark.svg';
import { ReactComponent as Camera } from '../../images/svg/camera.svg';
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
        const subscribeButtonCn = classnames(
            cn,
            isSubscribed && 'Button_subscribe_off',
        );

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

const Button = ({ type }: ButtonProps) => {
        const buttonCn = classnames('Button', `Button_type_${type}`);

        return (
            type === 'subscribe'
                ? <SubscribeButton cn={buttonCn} />
                : <AddVideoButton cn={buttonCn} />
        );
};

export default Button;
