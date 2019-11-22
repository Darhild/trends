import React, { Component } from 'react';
import classnames from 'classnames';
import './Tabs.scss';

interface TabsProps {
    className?: string;
    period: number;
    tabsContent: TabsItem[];
    onTabClickSetValue: (value: number) => void;
}

interface TabsState {
    activeTabValue: number;
}

interface TabsItem {
    value: number;
    name: string;
}

class Tabs extends Component<TabsProps, TabsState> {
    public state = {
        activeTabValue: this.props.period,
    };

    public handleTabClick = (value: number) => {
        const { onTabClickSetValue } = this.props;
        this.setState({
            activeTabValue: value,
        });
        onTabClickSetValue(value);
    }

    public render() {
        const { className, period, tabsContent } = this.props;
        const tabsCn = classnames(
            'Tabs',
            className,
        );

        return (
            <div className={tabsCn}>
                {
                    tabsContent.map((tab) => (
                        <div
                            key={tab.value}
                            className={classnames(
                                'Tabs-Item',
                                period === tab.value && 'Tabs-Item_state_active',
                                )
                            }
                            onClick={() => this.handleTabClick(tab.value) }
                        >
                            {tab.name}
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default Tabs;

