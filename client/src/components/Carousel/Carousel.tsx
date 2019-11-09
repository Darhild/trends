import React from 'react';
import classnames from 'classnames';
import debounce from 'debounce';
import Title from '../Title/Title';
import Scroller from '../Scroller/Scroller';
import { ReactComponent as Close } from '../../images/svg/close.svg';
import { ReactComponent as Undo } from '../../images/svg/undo.svg';
import { ReactComponent as Arrow } from '../../images/svg/arrow.svg';
import Icon from '../Icon/Icon';
import './Carousel.scss';


interface CarouselProps {
    title?: string;
    margin: string;
    carouselId?: string;
    canBeHidden: boolean;
    children: unknown;
}

interface CarouselState {
    isHidden: boolean;
    marginLeft: number;
    scrollLength: number;
}

class Carousel extends React.Component<CarouselProps, CarouselState> {
    public static defaultProps = {
        margin: 'm',
        canBeHidden: true,
    };

    public state = {
        isHidden: false,
        marginLeft: 0,
        scrollLength: 250,
    };

    public list = React.createRef<HTMLDivElement>();

    public scroller = React.createRef<HTMLDivElement>();

    public handleHide = () => {
        this.setState((state) => ({
            isHidden: !state.isHidden,
        }));
    }

    public calculateMinMargin = () => {
        if (this.list.current && this.scroller.current) {
            return this.list.current.offsetWidth - this.scroller.current.scrollWidth + 16;
        }

        return 1;
    }

    public handleScrollLeft = () => {
        const { marginLeft, scrollLength } = this.state;
        this.setState({
            marginLeft: Math.min(marginLeft + scrollLength, 0),
        });
    }

    public handleScrollRight = () => {
        const { marginLeft, scrollLength } = this.state;
        this.setState({
            marginLeft: Math.max(marginLeft - scrollLength, this.calculateMinMargin()),
        });
    }

    public componentDidMount = () => {
        window.addEventListener('resize', debounce(() => {
            this.setState({
                marginLeft: 0,
            });
        }, 250));
    }

    public render() {
        const { children, margin, title, carouselId, canBeHidden } = this.props;
        const { isHidden, marginLeft } = this.state;
        const itemCn = classnames(
            'Carousel-Item',
            margin && `Carousel-Item_margin_${margin}`,
        );
        const titleCn = classnames(
            'Carousel-TitleWrapper',
            isHidden && 'Carousel-TitleWrapper_hidden',
        );
        const url = carouselId && `https://yandex.ru/efir?from=efir_touch&stream_active=theme&stream_publisher=${carouselId}`;

        return (
            <div className="Carousel">
                {canBeHidden && <div className="Carousel-Header">
                    <div className={titleCn}>
                        {title && <Title url={url}>{title}</Title>}
                        {isHidden &&
                            <div className="Carousel-HideInfo">Вы скрыли подборку видео из ленты</div>}
                    </div>
                    <Icon className="Carousel-Hide">
                        {
                            isHidden
                                ? <Undo width="17" height="17" viewBox="2 0 18 17" onClick={this.handleHide}/>
                                : <Close width="13" height="13" viewBox="0 0 16 16" onClick={this.handleHide}/>
                        }
                    </Icon>
                </div>}
                {!isHidden && <div ref={this.list} className="Carousel-List">
                    <Scroller ref={this.scroller} style={{ marginLeft: `${marginLeft - 16}px` }}>
                            {React.Children.map(children, (child, num) =>
                                <div className={itemCn} key={num}>{child}</div>)}
                    </Scroller>
                    {marginLeft !== 0
                        && <div className={classnames('Carousel-Arrow', 'Carousel-Arrow_left')}
                                onClick={this.handleScrollLeft}>
                            <Arrow />
                        </div>}
                    {marginLeft !== this.calculateMinMargin()
                        && <div className={classnames('Carousel-Arrow', 'Carousel-Arrow_right')}
                                onClick={this.handleScrollRight}>
                            <Arrow />
                        </div>}
                </div>}
            </div>
        );
    }
}

export default Carousel;
