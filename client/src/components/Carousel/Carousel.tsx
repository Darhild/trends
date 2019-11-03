import React from 'react';
import './Carousel.scss';

interface CarouselProps {
    title?: string;
    margin: string;
    children: unknown;
}

const CarouselTitle = ({title}: {title?: string}) => {
    if (title) {
        return <div className="Carousel-Title">{title}</div>
    }
    return null;
}

class Carousel extends React.Component<CarouselProps> {
    public static defaultProps = {
        margin: 'm',
    };
    public render() {
        const children = this.props.children;
        const modName = 'Carousel-Item_margin_' + this.props.margin;
        return (
            <div className="Carousel">
                <div className="Carousel-Header">
                    <CarouselTitle title={this.props.title} />
                    <div className="Carousel-Hide"></div>
                </div>
                <div className="Carousel-List">
                    {React.Children.map(children, (child, num) =>
                        <div className={"Carousel-Item " + modName} key={num}>{child}</div>)}
                </div>
            </div>
        );
    }
}

export default Carousel;
