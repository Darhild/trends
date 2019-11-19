import React, { Component } from 'react';
import classnames from 'classnames';
import './Tabs.scss';
import Tab from './Tab/Tab';
/*
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

interface TabsProps {
    className?: string;
}

export default ({ className }: TabsProps) => {
    const tabsCn = classnames(
        'Tabs',
        className,
    );

    return (
        <Tabs className={tabsCn}>
            <TabList className="Tablist">
                <Tab>Сегодня</Tab>
                <Tab>Неделю</Tab>
                <Tab>Месяц</Tab>
            </TabList>
        </Tabs>
    );
};
*/

interface TabsProps {
    className?: string;
}

interface TabsState {
    tabsContent: TabsItem[];
    activeTab: number;
}

interface TabsItem {
    id: number;
    name: string;
}

export default class Tabs extends Component<TabsProps, TabsState> {
    public state = {
        tabsContent: [
            {
                id: 1,
                name: 'День',
            },
            {
                id: 2,
                name: 'Неделю',
            },
            {
                id: 3,
                name: 'Месяц',
            },
        ],
        activeTab: 1,
    };

    public handleClick = (id: number) => {
        this.setState(() => ({
                activeTab: id,
            }));
    }

    public render() {
        const { className } = this.props;
        const { tabsContent, activeTab } = this.state;
        const tabsCn = classnames(
            'Tabs',
            className,
        );

        return (
            <div className={tabsCn}>
                {
                    tabsContent.map((tab) => (
                        <div
                            key={tab.id}
                            className={classnames(
                                'Tabs-Item',
                                activeTab === tab.id && 'Tabs-Item_state_active',
                                )
                            }
                            onClick={() => {this.handleClick(tab.id); }}
                        >
                            {tab.name}
                        </div>
                    ))
                }
            </div>
        );
    }
}

