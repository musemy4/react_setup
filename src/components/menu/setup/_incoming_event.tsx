// React
import React, { useState, useEffect, useRef } from 'react';
// react-redux lib
import { useDispatch, useSelector } from 'react-redux';
// fetch
import { initTmpData, changeTmpData } from '../../../store/setup/tmpSetup';

// Interfaces
import { IEvent } from './setup_interface';

interface IProps {
    [index: string]: Array<IEvent>;
}



export const IncomingEvent = ({propsEventInfo}: IProps) => {
    const [allChecked, setAllChecked] = useState(!propsEventInfo.some((menuInfo: { setup_flag: any; }) => !menuInfo.setup_flag));
    const [stateEventInfo, setStateEventInfo] = useState<Array<IEvent> | undefined | null>();

    // get
    const { eventInfo }: IProps = useSelector((state:any)=> state.tmpSetup.response); // 정제된것 그냥 뿌린다
    // set
    const dispatch = useDispatch();

    useEffect(() => {
        // _incoming_event start
        dispatch(initTmpData({data:propsEventInfo, type:'EVENT'}));
        // 컴포넌트가 꺼질때
        return () => {
            // _incoming_event end
        }
    }, []);

    const mounted = useRef(false);
    useEffect(() => {
        if(!mounted.current) {
            mounted.current = true;
        } else 
            // 초기화 되어 menuInfo가 []이 되었을때 부모에서 온 props를 다시 셋팅
            if(eventInfo && eventInfo.length === 0 || !eventInfo) {
                setStateEventInfo(propsEventInfo);
            }
        
    }, [eventInfo]);

    useEffect(()=> {
        setStateEventInfo(propsEventInfo);
    }, [propsEventInfo]);

   
    const onCheckboxAllChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const check = e.target.checked;
        const newStateEventInfo = stateEventInfo?.map((eventInfo: IEvent) => {
            return {
                event_code: eventInfo.event_code,
                event_name: eventInfo.event_name,
                setup_flag: check
            }
        });
        setAllChecked(check);
        setStateEventInfo(newStateEventInfo);
        dispatch(changeTmpData({data:newStateEventInfo, type:'EVENT'}));
    }

    const onCheckboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target;
        const check = e.target.checked;

        const newStateEventInfo = stateEventInfo?.map((eventInfo: IEvent) => {
            if (eventInfo.event_code === id) {
                return {
                    event_code: eventInfo.event_code,
                    event_name: eventInfo.event_name,
                    setup_flag: check
                }
            }
            return eventInfo;
        });

        const isAllChecked = newStateEventInfo?.some((eventInfo: any) => !eventInfo.setup_flag );
        setAllChecked(!isAllChecked);
        setStateEventInfo(newStateEventInfo);
        dispatch(changeTmpData({data:newStateEventInfo, type:'EVENT'}));
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
                            { 
                                stateEventInfo?.length !== 0 ? stateEventInfo?.map((eventInfo: any) => {
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
                                }) :
                                <li>no data...</li>
                            }
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    )
};