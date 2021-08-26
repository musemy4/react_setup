// React
import React from 'react';
// External Lib
import _ from 'lodash';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
// Interfaces
import { IFunc, ILayer } from './setup_interface';

interface IProps {
    propsCctvFunctionInfo: Array<IFunc>;
    propLayerInfo: Array<ILayer>; 
    addData: (data: Array<IFunc | ILayer>, type: string) => void;
}

interface IState {
    stateCctvFunctionInfo: Array<IFunc>;
    stateLayerInfo: Array<ILayer>;
}

export class CctvFunction extends React.Component<IProps, IState> {

    public cctvFuncAllChecked = false;

    constructor(props: IProps) {
        super(props);
       
        const newStateCctvFuncInfo = props.propsCctvFunctionInfo.map((funcGroup: IFunc) => {
            const findChildren = _.find(props.propsCctvFunctionInfo, { func_code: 'CCTV_FUNCTION' } );
            if (findChildren) {
                const cctvCtrlObj = findChildren.children[0];
                this.cctvFuncAllChecked = !_.some(cctvCtrlObj.children, { setup_flag: false }); 
                cctvCtrlObj.setup_flag = _.some(cctvCtrlObj.children, { setup_flag: true });
            }
            return funcGroup;
        });
        this.state = { 
            stateCctvFunctionInfo: newStateCctvFuncInfo,
            stateLayerInfo: props.propLayerInfo
        };
        props.addData(newStateCctvFuncInfo, 'FUNCTION');
        props.addData(props.propLayerInfo, 'LAYER');

    }

    onCheckboxAllChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target;
        const check = e.target.checked;
        const { stateCctvFunctionInfo } = this.state;

        const newStateCctvFuncInfo = stateCctvFunctionInfo.map((funcGroup: IFunc) => {
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
            this.cctvFuncAllChecked = check;
        }

        this.setState({ stateCctvFunctionInfo: newStateCctvFuncInfo });
        const { addData } = this.props;
        addData(newStateCctvFuncInfo, 'FUNCTION');
    }

    onCheckboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target;
        const check = e.target.checked;
        const { stateCctvFunctionInfo } = this.state;

        const newStateCctvFuncInfo = stateCctvFunctionInfo.map((funcGroup: IFunc) => {
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
                this.cctvFuncAllChecked = !_.some(findChildren.children, { setup_flag: false });
            }   
            
            return funcGroup;
        });
        this.setState({ stateCctvFunctionInfo: newStateCctvFuncInfo });

        const { addData } = this.props;
        addData(newStateCctvFuncInfo, 'FUNCTION');
    }

    onCheckboxLayerChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target;
        const check = e.target.checked;
        const { stateLayerInfo } = this.state;

        if (!check) {
            confirmAlert({
                title: '[경고]',
                message: `※ 기본 레이어 선택 해제 시 해제된 레이어의 모든 자산 데이터까지 삭제됩니다.
                정말 수정하시겠습니까?`,
                overlayClassName: 'warning',
                buttons: [
                    { label: '취소', onClick: (() => null) },
                    { label: '선택 해제', onClick: (() => {
                        const copyStateLayerInfo = stateLayerInfo.map((layer: ILayer) => {
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
                        this.setState({ stateLayerInfo: copyStateLayerInfo });
                        const { addData } = this.props;
                        addData(copyStateLayerInfo, 'LAYER');
                    }) }
                ],
            });
        } else {
            const copyStateLayerInfo = stateLayerInfo.map((layer: ILayer) => {
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
            this.setState({ stateLayerInfo: copyStateLayerInfo });
            const { addData } = this.props;
            addData(copyStateLayerInfo, 'LAYER');
        }
    }

    render() {
        const { stateCctvFunctionInfo, stateLayerInfo } = this.state;
        return <div className="box-content" style={{ height: '100%' }}> {
            stateCctvFunctionInfo.map((funcInfo) => {
                return (
                    <div key={ funcInfo.func_code } className="cctv-function-content">
                        {
                            funcInfo.func_code === 'DEFAULT_LAYER' 
                                ? <h2>
                                    자동 생성 레이어
                                    <span style={{ color: '#ff0000', fontWeight: 'bold' }}> (* 함부로 수정하지 마시오!!)</span>
                                  </h2>
                                : <h2>{ funcInfo.func_name }</h2>
                        }
                        <ul className="menu_wrap">
                            {
                                funcInfo.func_code === 'DEFAULT_LAYER' 
                                    ? stateLayerInfo.map((layerInfo: ILayer) => {
                                        return <div key={ layerInfo.layer_id } className="menu_head">
                                                    <span className="menu_title">
                                                        <span className="checkbox_wrap">
                                                            <input className="form-check-input" onChange={ this.onCheckboxLayerChangeHandler } type="checkbox" id={ layerInfo.layer_id } checked={ layerInfo.setup_flag }/>
                                                            <label className="form-check-label" htmlFor={ layerInfo.layer_id }>{ layerInfo.layer_name }</label>
                                                        </span>
                                                    </span>
                                                </div>
                                    }) 
                                    : null
                            }
                            { funcInfo.children.map((funcChildInfo: IFunc) => {
                                return <li key={funcChildInfo.func_code} className="menu_list">
                                    <div className="menu_head">
                                        <span className="menu_title">
                                            <span className="checkbox_wrap">
                                                <input className="form-check-input" onChange={ this.onCheckboxAllChangeHandler } type="checkbox" id={ funcChildInfo.func_code } checked={ 
                                                    funcChildInfo.func_code === 'CCTV_CONTROL' 
                                                        ? funcChildInfo.setup_flag && this.cctvFuncAllChecked
                                                        : funcChildInfo.setup_flag
                                                }/>
                                                <label className="form-check-label" htmlFor={ funcChildInfo.func_code }>{ funcChildInfo.func_name }</label>
                                            </span>
                                        </span>
                                    </div>
                                    { funcChildInfo.children.length > 0 
                                        ? <div className="sub_menu">
                                            <ul>
                                                { funcChildInfo.children.map((funcInnerChildInfo: IFunc) => {
                                                    return (
                                                        <li key={ funcInnerChildInfo.func_code }>
                                                            <span className="menu_title">
                                                                <span className="checkbox_wrap">
                                                                    <input className="form-check-input" onChange={ this.onCheckboxChangeHandler } type="checkbox" id={ funcInnerChildInfo.func_code } checked={ funcInnerChildInfo.setup_flag }/>
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
            })
        }</div>

    }
}