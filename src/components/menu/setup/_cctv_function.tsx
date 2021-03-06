// React
import _ from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
// react-redux lib
import { useDispatch, useSelector } from 'react-redux';
// confirm, toast
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
// fetch
import { initTmpData, changeTmpData  } from '../../../store/setup/tmpSetup';
// Interfaces
import { IFunc, ILayer } from './setup_interface';

interface IProps {
    propsCctvFunctionInfo: Array<IFunc>;
    propLayerInfo: Array<ILayer>; 
}

export const CctvFunction = ({propsCctvFunctionInfo, propLayerInfo}: IProps) => {  
    const [cctvFuncAllChecked, setCctvFuncAllChecked] = useState(false);
    const [stateCctvFunctionInfo, setStateCctvFunctionInfo] = useState<Array<IFunc> | undefined | null>(propsCctvFunctionInfo);
    const [stateLayerInfo, setStateLayerInfo] = useState<Array<ILayer> | undefined | null>(propLayerInfo);
    
    
    // get
    const { funcInfo, layerInfo }: any = useSelector((state:any)=> state.tmpSetup.response); // 정제된것 그냥 뿌린다
    // set
    const dispatch = useDispatch();
    
    useEffect(() => {
        const returnedInfo = destruct();
        dispatch(initTmpData({data:returnedInfo, type:'FUNC'}));
        dispatch(initTmpData({data:propLayerInfo, type:'LAYER'}));
    }, []);

    const mountedFunc = useRef(false);
    useEffect(() => {
        if(!mountedFunc.current) {
            mountedFunc.current = true;
        } else if(funcInfo && funcInfo.length === 0 || !funcInfo) {
            setStateCctvFunctionInfo(propsCctvFunctionInfo);
        }
    }, [funcInfo]);
    
    const mountedLayer = useRef(false);
    useEffect(() => {
        if(!mountedLayer.current) {
            mountedLayer.current = true;
        } else if(layerInfo && layerInfo.length === 0 || !layerInfo) {
            setStateLayerInfo(propLayerInfo);
        }
    }, [layerInfo]);

    useEffect(()=> {
        if(funcInfo && funcInfo.length === 0 || !funcInfo) {
            setStateCctvFunctionInfo(propsCctvFunctionInfo);
        }
    }, [propsCctvFunctionInfo]);

    useEffect(()=> {
        if(layerInfo && layerInfo.length === 0 || !layerInfo) {
            setStateLayerInfo(propLayerInfo);
        }
    }, [propLayerInfo]);

    const destruct = () => {
        // ** Cannot assign to read only property **
        // const copyStateFuncInfo = JSON.parse(JSON.stringify(stateCctvFunctionInfo));
        const newStateCctvFuncInfo = propsCctvFunctionInfo?.map((funcGroup: IFunc) => {
            const findChildren = _.find(propsCctvFunctionInfo, { func_code: 'CCTV_FUNCTION' } );
            if (findChildren) {
                const cctvCtrlObj = findChildren.children[0];
                setCctvFuncAllChecked(!_.some(cctvCtrlObj.children, { setup_flag: false })); 
                cctvCtrlObj.setup_flag = _.some(cctvCtrlObj.children, { setup_flag: true });
            }
            return funcGroup;
        });
        return newStateCctvFuncInfo
    }

    const onCheckboxAllChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target;
        const check = e.target.checked;
        // ** Cannot assign to read only property **
        const copyStateFuncInfo = JSON.parse(JSON.stringify(stateCctvFunctionInfo));
        const newStateCctvFuncInfo = copyStateFuncInfo?.map((funcGroup: IFunc) => {
            const findChildren = _.find(funcGroup.children, { func_code: id } );
            if (findChildren) {
                findChildren.setup_flag = check;
                findChildren.children = findChildren.children.map((children: IFunc) => {
                    const copyFuncChildren = { ...children };
                    return {
                        func_code: copyFuncChildren.func_code,
                        func_group: copyFuncChildren.func_group,
                        func_name: copyFuncChildren.func_name,
                        setup_flag: check,
                        children: copyFuncChildren.children
                    }
                })
            }
            return funcGroup;
        });
        if (check) {
            setCctvFuncAllChecked(check);
        }
        setStateCctvFunctionInfo(newStateCctvFuncInfo);
        dispatch(changeTmpData({data:newStateCctvFuncInfo, type:'FUNC'}));
    }

    const onCheckboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target;
        const check = e.target.checked;
        // ** Cannot assign to read only property **
        const copyStateFuncInfo = JSON.parse(JSON.stringify(stateCctvFunctionInfo));
        const newStateCctvFuncInfo = copyStateFuncInfo?.map((funcGroup: IFunc) => {
            const findChildren = _.find(funcGroup.children, (firstChildren: IFunc) => {
                return _.some(firstChildren.children, { func_code: id } ); 
            });
            if (findChildren) {
                findChildren.children = findChildren.children.map((children: IFunc) => {
                    const copyFuncChildren = { ...children };
                    if (children.func_code === id) {
                        return {
                            func_code: copyFuncChildren.func_code,
                            func_group: copyFuncChildren.func_group,
                            func_name: copyFuncChildren.func_name,
                            setup_flag: check,
                            children: copyFuncChildren.children
                        }
                    }
                    return children;
                })
                findChildren.setup_flag = _.some(findChildren.children, { setup_flag: true });
                setCctvFuncAllChecked(!_.some(findChildren.children, { setup_flag: false }));
            }   
            
            return funcGroup;
        });
        setStateCctvFunctionInfo(newStateCctvFuncInfo);
        dispatch(changeTmpData({data:newStateCctvFuncInfo, type:'FUNC'}));
    }

    const onCheckboxLayerChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target;
        const check = e.target.checked;

        if (!check) {
            confirmAlert({
                title: '[경고]',
                message: `※ 기본 레이어 선택 해제 시 해제된 레이어의 모든 자산 데이터까지 삭제됩니다.
                정말 수정하시겠습니까?`,
                overlayClassName: 'warning',
                buttons: [
                    { label: '취소', onClick: (() => null) },
                    { label: '선택 해제', onClick: (() => {
                        const copyStateLayerInfo = stateLayerInfo?.map((layer: ILayer) => {
                            const copyLayer = { ...layer };
                            if (copyLayer.layer_id === id) {
                                return {
                                    layer_id: copyLayer.layer_id,
                                    layer_name: copyLayer.layer_name,
                                    setup_flag: check,
                                }
                            }
                            return layer;
                        })
                        setStateLayerInfo(copyStateLayerInfo);
                        dispatch(changeTmpData({data:copyStateLayerInfo, type:'LAYER'}));
                    }) }
                ],
            });
        } else {
            const copyStateLayerInfo = stateLayerInfo?.map((layer: ILayer) => {
                const copyLayer = { ...layer };
                if (copyLayer.layer_id === id) {
                    return {
                        layer_id: copyLayer.layer_id,
                        layer_name: copyLayer.layer_name,
                        setup_flag: check,
                    }
                }
                return layer;
            })
            setStateLayerInfo(copyStateLayerInfo);
            dispatch(changeTmpData({data:copyStateLayerInfo, type:'LAYER'}));
        }
    }

    
    return (
        <div className="box-content" style={{ height: '100%' }}> {
            stateCctvFunctionInfo?.length !== 0 ? stateCctvFunctionInfo?.map((info: any) => {
                return (
                    <div key={ info.func_code } className="cctv-function-content">
                        {
                            info.func_code === 'DEFAULT_LAYER' 
                                ? <h2>
                                    자동 생성 레이어
                                    <span style={{ color: '#ff0000', fontWeight: 'bold' }}> (* 함부로 수정하지 마시오!!)</span>
                                  </h2>
                                : <h2>{ info.func_name }</h2>
                        }
                        <ul className="menu_wrap">
                            {
                                info.func_code === 'DEFAULT_LAYER' 
                                    ? stateLayerInfo?.map((lInfo: any) => {
                                        return <div key={ lInfo.layer_id } className="menu_head">
                                                    <span className="menu_title">
                                                        <span className="checkbox_wrap">
                                                            <input className="form-check-input" onChange={ onCheckboxLayerChangeHandler } type="checkbox" id={ lInfo.layer_id } checked={ lInfo.setup_flag }/>
                                                            <label className="form-check-label" htmlFor={ lInfo.layer_id }>{ lInfo.layer_name }</label>
                                                        </span>
                                                    </span>
                                                </div>
                                    }) 
                                    : null
                            }
                            { info.children.map((funcChildInfo: any) => {
                                return <li key={funcChildInfo.func_code} className="menu_list">
                                    <div className="menu_head">
                                        <span className="menu_title">
                                            <span className="checkbox_wrap">
                                                <input className="form-check-input" onChange={ onCheckboxAllChangeHandler } type="checkbox" id={ funcChildInfo.func_code } checked={ 
                                                    funcChildInfo.func_code === 'CCTV_CONTROL' 
                                                        ? funcChildInfo.setup_flag && cctvFuncAllChecked
                                                        : funcChildInfo.setup_flag
                                                }/>
                                                <label className="form-check-label" htmlFor={ funcChildInfo.func_code }>{ funcChildInfo.func_name }</label>
                                            </span>
                                        </span>
                                    </div>
                                    { funcChildInfo.children.length > 0 
                                        ? <div className="sub_menu">
                                            <ul>
                                                { funcChildInfo.children.map((funcInnerChildInfo: any) => {
                                                    return (
                                                        <li key={ funcInnerChildInfo.func_code }>
                                                            <span className="menu_title">
                                                                <span className="checkbox_wrap">
                                                                    <input className="form-check-input" onChange={ onCheckboxChangeHandler } type="checkbox" id={ funcInnerChildInfo.func_code } checked={ funcInnerChildInfo.setup_flag }/>
                                                                    <label className="form-check-label" htmlFor={ funcInnerChildInfo.func_code }>{ funcInnerChildInfo.func_name }</label>
                                                                </span>
                                                            </span>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                        : null
                                    }
                                </li>
                            })}
                        </ul>
                    </div>
                )
            }) : <div>no data...</div>
        }</div>
    )
};