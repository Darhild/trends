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

interface CarouselProps {
    title?: string;
    routeUrl?: string;
    margin: string;
    carouselId?: string;
    canBeHidden: boolean;
    children: React.ReactElement[];
    className?: string;
    itemClass?: string;
    tabs?: React.ReactNode;
    isHoverable?: boolean;
    scrollSize: number;
    arrowPosition?: string;
    rows: number;
}

interface CarouselState {
    isHidden: boolean;
    scrollLeft: number;
    maxScrollLeft: number;
}

class Carousel extends React.Component<CarouselProps, CarouselState> {
    public static defaultProps = {
        margin: 'm',
        canBeHidden: true,
        scrollSize: 400,
        rows: 1,
        children: [],
        isHoverable: true,
    };

    public state = {
        isHidden: false,
        scrollLeft: 0,
        maxScrollLeft: 100,
    };

    public list = React.createRef<HTMLDivElement>();

    public updateScrollLeft = debounce(() => {
        const { current } = this.list;
        if (current) {
            this.setState({
                scrollLeft: current.scrollLeft,
            });
        }
    }, 150);

    public updateMaxScrollLeft = debounce(() => {
        const { current } = this.list;
        if (current) {
            this.setState({
                maxScrollLeft:  current.scrollWidth - current.clientWidth,
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
            scroll.left(this.list.current, this.list.current.scrollLeft - this.props.scrollSize);
        }
    }

    public handleScrollRight = () => {
        if (this.list.current) {
            scroll.left(this.list.current, this.list.current.scrollLeft + this.props.scrollSize);
        }
    }

    public handleScroll = () => {
        this.updateScrollLeft();
    }

    public renderItems() {
        const {
            children,
            rows,
            margin,
            itemClass,
        } = this.props;

        const itemCn = classnames(
            'Carousel-Item',
            itemClass,
            margin && `Carousel-Item_margin_${margin}`,
        );

        const items = [];

        for (let i = 0; i < children.length; i += rows) {
            items.push(
                <div className={itemCn} key={i}>
                    {children.slice(i, i + rows)}
                </div>,
            );
        }

        return items;
    }

    public renderList = () => {
        const {
            isHoverable,
            arrowPosition,
        } = this.props;

        const listCn = classnames(
            'Carousel-List',
            isHoverable && 'Carousel-List_hoverable',
        );

        const arrowCn = classnames(
            'Carousel-Arrow',
            arrowPosition && `Carousel-Arrow_${arrowPosition}`,
        );

        this.updateMaxScrollLeft();

        const { scrollLeft, maxScrollLeft } = this.state;

        return  (
            <div className="Carousel-Wrapper">
                <div ref={this.list} onScroll={this.handleScroll} className={listCn}>
                    {this.renderItems()}
                </div>
                {
                    scrollLeft > 0  &&
                    <div className={classnames(arrowCn, 'Carousel-Arrow_left')}
                        onClick={this.handleScrollLeft}
                    >
                        <Arrow />
                    </div>
                }
                {
                    maxScrollLeft > scrollLeft &&
                    <div className={classnames(arrowCn, 'Carousel-Arrow_right')}
                        onClick={this.handleScrollRight}
                    >
                        <Arrow />
                    </div>
                }
            </div>
        );
    }

    public render() {
        const { title, routeUrl, carouselId, canBeHidden, tabs } = this.props;
        const { isHidden } = this.state;

        const carouselCn = classnames(
            'Carousel',
            this.props.className,
        );

        const titleCn = classnames(
            'Carousel-TitleWrapper',
            isHidden && 'Carousel-TitleWrapper_hidden',
        );
        const url = routeUrl
            ? routeUrl
            : carouselId && `https://yandex.ru/efir?from=efir_touch&stream_active=theme&stream_publisher=${carouselId}`;

        return (
            <div className={carouselCn}>
                {canBeHidden && <div className="Carousel-Header">
                    <div className={titleCn}>
                        {title && <Title cn="Caroucel-Title" url={url} route={Boolean(routeUrl)}>{title}</Title>}
                        {tabs}
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
