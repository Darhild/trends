import React from 'react';
import classnames from 'classnames';
import debounce from 'debounce';
import Title from '../Title/Title';
import scroll from 'scroll';
import { ReactComponent as Close } from '../../images/svg/close.svg';
import { ReactComponent as Undo } from '../../images/svg/undo.svg';
import { ReactComponent as Arrow } from '../../images/svg/arrow.svg';
import Icon from '../Icon/Icon';
import './Carousel.scss';

const SCROLL_SIZE = 400;


interface CarouselProps {
    title?: string;
    margin: string;
    carouselId?: string;
    canBeHidden: boolean;
    children: unknown;
}

interface CarouselState {
    isHidden: boolean;
    scrollLeft: number;
}

class Carousel extends React.Component<CarouselProps, CarouselState> {
    public static defaultProps = {
        margin: 'm',
        canBeHidden: true,
    };

    public state = {
        isHidden: false,
        scrollLeft: 0,
    };

    public list = React.createRef<HTMLDivElement>();

    public updateScrollLeft = debounce(() => {
        if (this.list.current) {
            this.setState({
                scrollLeft: this.list.current.scrollLeft,
            });
        }
    }, 150);

    public handleHide = () => {
        this.setState((state) => ({
            isHidden: !state.isHidden,
        }));
    }

    public handleScrollLeft = () => {
        if (this.list.current) {
            scroll.left(this.list.current, this.list.current.scrollLeft - SCROLL_SIZE);
        }
    }

    public handleScrollRight = () => {
        if (this.list.current) {
            scroll.left(this.list.current, this.list.current.scrollLeft + SCROLL_SIZE);
        }
    }

    public handleScroll = () => {
        this.updateScrollLeft();
    }

    public renderList = () => {
        const { children, margin } = this.props;
        const itemCn = classnames(
            'Carousel-Item',
            margin && `Carousel-Item_margin_${margin}`,
        );

        const { current } = this.list;
        const maxScrollLeft = current ? current.scrollWidth - current.clientWidth : 100;
        const scrollLeft = this.state.scrollLeft;

        return  (
            <div className="Carousel-Wrapper">
                <div ref={this.list} onScroll={this.handleScroll} className="Carousel-List">
                    {
                        React.Children.map(children, (child, num) => (
                            <div className={itemCn} key={num}>{child}</div>
                        ))
                    }
                </div>
                {
                    scrollLeft > 0  &&
                    <div className={classnames('Carousel-Arrow', 'Carousel-Arrow_left')}
                        onClick={this.handleScrollLeft}
                    >
                        <Arrow />
                    </div>
                }
                {
                    maxScrollLeft > scrollLeft &&
                    <div className={classnames('Carousel-Arrow', 'Carousel-Arrow_right')}
                        onClick={this.handleScrollRight}
                    >
                        <Arrow />
                    </div>
                }
            </div>
        );
    }

    public render() {
        const { title, carouselId, canBeHidden } = this.props;
        const { isHidden } = this.state;


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
                { !isHidden && this.renderList() }
            </div>
        );
    }
}

export default Carousel;
