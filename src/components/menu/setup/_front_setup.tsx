// React
import React, { useState, useEffect, useRef } from 'react';

// External Lib
import _ from 'lodash';
// react-redux lib
import { useDispatch, useSelector } from 'react-redux';
// fetch
// import { addPartsData } from '../../store/setup/setup';
// Interfaces
import { ISetup } from './setup_interface';

interface IProps {
    [index: string]: Array<ISetup>;
}

export const FrontSetup = ({propsSetupInfo}: IProps) => {
    const [stateSetupInfo, setStateSetupInfo] = useState<Array<ISetup> | undefined | null>();

    // get
    const { setupInfo }: IProps = useSelector((state:any)=> state.setup.packedTmpSetup.response); // 정제된것 그냥 뿌린다
    // set 
    const dispatch = useDispatch();


    useEffect(() => {
        // setStateSetupInfo(propsSetupInfo); // props
        // dispatch(addPartsData({data:propsSetupInfo, type:'SETUP'}));
    }, []);

    const mounted = useRef(false);
    useEffect(() => {
        if(!mounted.current) {
            mounted.current = true;
        } else {
            console.log('setInfo 변경 감지!');
            setStateSetupInfo(setupInfo);
        } 
    }, [setupInfo]);


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
        // setStateSetupInfo(newStateSetupInfo);
        // dispatch(addPartsData({data:newStateSetupInfo, type:'SETUP'}));
        // dispatch(addSetupData(newStateSetupInfo, 'SETUP'));
        // addData(newStateSetupInfo, 'SETUP');
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
        // setStateSetupInfo(newStateSetupInfo);
        // dispatch(addPartsData({data:newStateSetupInfo, type:'SETUP'}));
        // dispatch(addSetupData(newStateSetupInfo, 'SETUP'));
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
                    }) :  <div>부모가 준 정보가 도달한게 없다!!</div>
                }
            </ul>
        </div>
    )
};