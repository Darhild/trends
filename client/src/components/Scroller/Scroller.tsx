import React, { ReactNode } from 'react';
import './Scroller.scss';

interface ScrollerProps {
    children?: ReactNode;
    style?: React.CSSProperties;
}

const Scroller = React.forwardRef<HTMLDivElement, ScrollerProps>((props: ScrollerProps, ref) => {
    const { children, style } = props;

    return <div ref={ref} style={style} className="Scroller">{children}</div>;
});

export default Scroller;
