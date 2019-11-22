import React, { Component } from 'react';
import classnames from 'classnames';
import './Tabs.scss';
import { connect } from 'react-redux';
import { State } from '../../store/createStore';
import { setPeriod } from './../../store/actions';

interface TabsProps {
    className?: string;
    period: number;
    onClickSetPeriod: (value: number) => void;
}

interface TabsState {
    tabsContent: TabsItem[];
}

interface TabsItem {
    value: number;
    name: string;
}

class Tabs extends Component<TabsProps, TabsState> {
    public state = {
        tabsContent: [
            {
                value: 1,
                name: 'Сегодня',
            },
            {
                value: 7,
                name: 'Неделю',
            },
            {
                value: 30,
                name: 'Месяц',
            },
        ],
    };

    public handleClick = (value: number) => {
        const { onClickSetPeriod } = this.props;
        onClickSetPeriod(value);
    }

    public render() {
        const { className, period } = this.props;
        const { tabsContent } = this.state;
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
                            onClick={() => this.handleClick(tab.value) }
                        >
                            {tab.name}
                        </div>
                    ))
                }
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    period: state.period,
});

const mapDispatchToProps = {
    onClickSetPeriod: setPeriod,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);

