// React
import React, { useState, useEffect, useRef } from 'react';

// External Lib
import _ from 'lodash';
// react-redux lib
import { useDispatch, useSelector } from 'react-redux';
// fetch
import { initTmpData, changeTmpData } from '../../../store/setup/tmpSetup';
// Interfaces
import { ISetup } from './setup_interface';

interface IProps {
    [index: string]: Array<ISetup>;
}

export const FrontSetup = ({propsSetupInfo}: IProps) => {
    const [stateSetupInfo, setStateSetupInfo] = useState<Array<ISetup> | undefined | null>(propsSetupInfo);

    // get
    const { setupInfo }: IProps = useSelector((state:any)=> state.tmpSetup.response); // 정제된것 그냥 뿌린다
    // set 
    const dispatch = useDispatch();


    // useEffect(() => {
    //     dispatch(addTmpData({data:propsSetupInfo, type:'SETUP'}));
    // }, []);

    // useEffect(() => {
    //     if(setupInfo && setupInfo.length === 0) {
    //         dispatch(addTmpData({data:propsSetupInfo, type:'SETUP'}));
    //     } else {
    //         setStateSetupInfo(setupInfo);
    //     }
    // }, [setupInfo]);

    useEffect(() => {
        // _front_setup start
        dispatch(initTmpData({data:propsSetupInfo, type:'SETUP'}));
        // 컴포넌트가 꺼질때
        return () => {
            // _front_setup end
        }
    }, []);

    const mounted = useRef(false);
    useEffect(() => {
        if(!mounted.current) {
            mounted.current = true;
        } else 
            // 초기화 되어 menuInfo가 []이 되었을때 부모에서 온 props를 다시 셋팅
            if(setupInfo && setupInfo.length === 0 || !setupInfo) {
                setStateSetupInfo(propsSetupInfo);
            }
        
    }, [setupInfo]);

    useEffect(()=> {
        if (setupInfo && setupInfo.length === 0 || !setupInfo) {
            // TODO: 여기가 왜 4번 불리냐
            setStateSetupInfo(propsSetupInfo);
        }
    }, [propsSetupInfo]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        const newStateSetupInfo = setupInfo?.map((setupGroup: ISetup) => {
            const findChildren = _.find(setupGroup.children, { config_code: id } );
            if (findChildren) {
                const copySetupGroup = { ...setupGroup };
                copySetupGroup.children = setupGroup.children.map((setupChildren: ISetup) => {
                    const findSetupInfo = setupChildren.config_code === id;
                    if (findSetupInfo) {
                        const copySetupInfo = { ...setupChildren };
                        return {
                            config_code: copySetupInfo.config_code,
                            config_group: copySetupInfo.config_group,
                            config_name: copySetupInfo.config_name,
                            data_type: copySetupInfo.data_type,
                            order_load: copySetupInfo.order_load,
                            setup_data: value,
                            children:copySetupInfo.children
                        }
                    }
                    return setupChildren;
                })
                return copySetupGroup;
            }
            return setupGroup;
        });
        setStateSetupInfo(newStateSetupInfo);
        dispatch(changeTmpData({data:newStateSetupInfo, type:'SETUP'}));
    }

    const onRadioChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        
        const newStateSetupInfo = setupInfo?.map((setupGroup: ISetup) => {
            const findRoot = setupGroup.config_code === id;
            if (findRoot) {
                const copyRootSetupInfo = { ...setupGroup };
                return {
                    config_code: copyRootSetupInfo.config_code,
                    config_group: copyRootSetupInfo.config_group,
                    config_name: copyRootSetupInfo.config_name,
                    data_type: copyRootSetupInfo.data_type,
                    order_load: copyRootSetupInfo.order_load,
                    setup_data: value,
                    children:copyRootSetupInfo.children
                }
            }
            return setupGroup;
        });
        setStateSetupInfo(newStateSetupInfo);
        dispatch(changeTmpData({data:newStateSetupInfo, type:'SETUP'}));
    }




    return (
        <div className="front-setting-content">
            <ul className="subgroup_setup mt10">
                {
                    stateSetupInfo?.length !== 0 ? stateSetupInfo?.map((setupInfo: any) => {
                        return (
                            <li key={ setupInfo.config_code }>
                                <h3>{ setupInfo.config_name }</h3>
                                { 
                                    setupInfo.data_type === 'string' && setupInfo.children.length > 0
                                        ? setupInfo.children.map((setupChildren: any) => {
                                            return (
                                                <div key={ setupChildren.config_code }>
                                                    <p>- {setupChildren.config_name}</p>
                                                    <input onChange={ onInputChange } className="input_t1 w_full" id={ setupChildren.config_code } value={ setupChildren.setup_data } />
                                                </div>
                                            )
                                        })
                                        : <div className="radio_area">
                                            <span className="radio_wrap">
                                                <label htmlFor={ setupInfo.config_code }>
                                                    <input className="ml-5 mr-3" onChange={ onRadioChangeHandler } value="true" type="radio" name={ setupInfo.config_code } id={ setupInfo.config_code } checked={ setupInfo.setup_data === 'true' } />
                                                    사용
                                                </label>
                                            </span>
                                            <span className="radio_wrap">
                                                <label htmlFor={ setupInfo.config_code }>
                                                    <input className="ml-5 mr-3" onChange={ onRadioChangeHandler } value="false" type="radio" name={ setupInfo.config_code } id={ setupInfo.config_code } checked={ setupInfo.setup_data === 'false' } />
                                                    미사용
                                                </label>
                                            </span>
                                        </div>
                                }
                            </li>
                        )
                    }) :  <li>no data...</li>
                }
            </ul>
        </div>
    )
};