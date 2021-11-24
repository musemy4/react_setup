// React
import React, { useState, useEffect } from 'react';
// react-redux lib
import { useDispatch } from 'react-redux';
import { addSetupData } from '../../../store/setup';

// Interfaces
import { IEvent } from './setup_setting_interface';

interface IProps {
    propsEventInfo: Array<IEvent>;
    // addData: (data: Array<IEvent>, type: string) => void;
}

export const IncomingEvent = ({propsEventInfo}: IProps) => {
    const [allChecked, setAllChecked] = useState(!propsEventInfo.some((menuInfo: { setup_flag: any; }) => !menuInfo.setup_flag));
    const [stateEventInfo, setStateEventInfo] = useState(propsEventInfo);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(addSetupData(propsEventInfo, 'EVENT'));
        // addData(propsEventInfo, 'EVENT');
    }, []);

    const onCheckboxAllChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const check = e.target.checked;
        const newStateEventInfo = stateEventInfo.map((eventInfo: IEvent) => {
            return {
                event_code: eventInfo.event_code,
                event_name: eventInfo.event_name,
                setup_flag: check
            }
        });
        setAllChecked(check);
        setStateEventInfo(newStateEventInfo);
        dispatch(addSetupData(newStateEventInfo, 'EVENT'));
        // addData(newStateEventInfo, 'EVENT');
    }

    const onCheckboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target;
        const check = e.target.checked;

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
        setAllChecked(!isAllChecked);
        setStateEventInfo(newStateEventInfo);
        dispatch(addSetupData(newStateEventInfo, 'EVENT'));
        // addData(newStateEventInfo, 'EVENT');
    }

    return (
        <div className="incoming-event-content">
            <ul className="menu_wrap">
                <li className="menu_list">
                    <div className="menu_head">
                        <span className="menu_title">
                            <span className="checkbox_wrap">
                                <label className="form-check-label" htmlFor="allChk">
                                    <input className="form-check-input" onChange={ onCheckboxAllChangeHandler } type="checkbox" id="allChk" checked={ allChecked } />
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
                                                <input className="form-check-input" onChange={ onCheckboxChangeHandler } type="checkbox" id={ eventInfo.event_code } checked={ eventInfo.setup_flag }/>
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
