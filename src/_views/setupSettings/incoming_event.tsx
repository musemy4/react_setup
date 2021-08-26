// React
import React from 'react';
// Interfaces
import { IEvent } from './setup_interface';

interface IProps {
    propsEventInfo: Array<IEvent>;
    addData: (data: Array<IEvent>, type: string) => void;
}

interface IState {
    allChecked: boolean;
    stateEventInfo: Array<IEvent>;
}

export class IncomingEvent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { 
            allChecked: !props.propsEventInfo.some(eventInfo => !eventInfo.setup_flag ),
            stateEventInfo: props.propsEventInfo 
        };
        props.addData(props.propsEventInfo, 'EVENT');
    }

    onCheckboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target;
        const check = e.target.checked;
        const { stateEventInfo } = this.state;

        const newStateEventInfo = stateEventInfo.map((eventInfo: IEvent) => {
            if (eventInfo.event_code === id) {
                return {
                    event_code: eventInfo.event_code,
                    event_name: eventInfo.event_name,
                    setup_flag: check
                }
            }
            return eventInfo;
        });

        const isAllChecked = newStateEventInfo.some(eventInfo => !eventInfo.setup_flag );
        this.setState({ 
            allChecked: !isAllChecked,
            stateEventInfo: newStateEventInfo
        });
        const { addData } = this.props;
        addData(newStateEventInfo, 'EVENT');
    }

    onCheckboxAllChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const check = e.target.checked;
        const { stateEventInfo } = this.state;

        const newStateEventInfo = stateEventInfo.map((eventInfo: IEvent) => {
            return {
                event_code: eventInfo.event_code,
                event_name: eventInfo.event_name,
                setup_flag: check
            }
        });
        this.setState({ 
            allChecked: check,
            stateEventInfo: newStateEventInfo
        });
        const { addData } = this.props;
        addData(newStateEventInfo, 'EVENT');
    }

    render() {
        const { allChecked } = this.state;
        const { stateEventInfo } = this.state;
        return (
            <div className="incoming-event-content">
                <ul className="menu_wrap">
                    <li className="menu_list">
                        <div className="menu_head">
                            <span className="menu_title">
                                <span className="checkbox_wrap">
                                    <label className="form-check-label" htmlFor="allChk">
                                        <input className="form-check-input" onChange={ this.onCheckboxAllChangeHandler } type="checkbox" id="allChk" checked={ allChecked } />
                                        이벤트 종류
                                    </label>
                                </span>
                            </span>
                        </div>
                        <div className="sub_menu">
                            <ul>
                                { stateEventInfo.map((eventInfo: IEvent) => {
                                    return (
                                        <li key={ eventInfo.event_code }>
                                            <span className="menu_title">
                                                <span className="checkbox_wrap">
                                                    <input className="form-check-input" onChange={ this.onCheckboxChangeHandler } type="checkbox" id={ eventInfo.event_code } checked={ eventInfo.setup_flag }/>
                                                    <label className="form-check-label" htmlFor={ eventInfo.event_code }>{ eventInfo.event_name }</label>
                                                </span>
                                            </span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}