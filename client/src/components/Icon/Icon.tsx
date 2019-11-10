import * as React from 'react';
import classnames from 'classnames';
import './Icon.scss';

interface Props {
    className?: string;
}

class Icon extends React.Component<Props> {
    public render() {
        const { children, className } = this.props;
        const ch = classnames('Icon', className);

        return (
            <div className={ch}>
                {children}
            </div>
        );
    }
}

export default Icon;
