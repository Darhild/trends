import React, { Component } from 'react';
import classnames from 'classnames';
import './Tabs.scss';
import { connect } from 'react-redux';
import { selectPeriod } from './../../store/actions';

interface TabsProps {
    className?: string;
    onClickSelectPeriod: (value: number) => void;
}

interface TabsState {
    tabsContent: TabsItem[];
    activeTab: number;
}

interface TabsItem {
    id: number;
    value: number;
    name: string;
}

class Tabs extends Component<TabsProps, TabsState> {
    public state = {
        tabsContent: [
            {
                id: 1,
                value: 1,
                name: 'День',
            },
            {
                id: 2,
                value: 7,
                name: 'Неделю',
            },
            {
                id: 3,
                value: 30,
                name: 'Месяц',
            },
        ],
        activeTab: 1,
    };

    public handleClick = (id: number, value: number) => {
        this.setState(() => ({
                activeTab: id,
            }));
        this.props.onClickSelectPeriod(value);
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
                            onClick={() => {this.handleClick(tab.id, tab.value); }}
                        >
                            {tab.name}
                        </div>
                    ))
                }
            </div>
        );
    }
}

const mapDispatchToProps = {
    onClickSelectPeriod: selectPeriod,
};

export default connect(null, mapDispatchToProps)(Tabs);

