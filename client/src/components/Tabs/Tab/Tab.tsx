import React from 'react';

interface TabProps {
    className: string;
    children: string;
    onClick: (id: number) => void;
}

const Tab = ({ className, children }: TabProps) => (
    <div className={className}>
        {children}
    </div>
);

export default Tab;
