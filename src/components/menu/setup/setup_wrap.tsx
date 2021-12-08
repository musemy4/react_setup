/* eslint-disable prefer-destructuring */
// React
import _ from 'lodash';
import { useState, useRef } from 'react';
// confirm, toast
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
// spinner
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
// redux
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// from redux store
// setup
import { fetchSetupProps, resetFetchSetupStatus } from '../../../store/setup/fetchSetup';
import { putTmpSetupProps, resetTmpSetupStatus } from '../../../store/setup/tmpSetup';
// admin
import { setupCreateID, setupResetRole, setupResetPw  } from '../../../store/setup/admin';
// utils
import { getConvertTreeData } from '../../../common/utils/convert-data';
import { dateFormat } from '../../../common/utils/date';
// interface
import { ISetupData, IPutSetupBody, IPutSetup } from './setup_interface';


// Component
import { ApplyMenu } from './_apply_menu';
import { IncomingEvent } from './_incoming_event';
import { CctvFunction } from './_cctv_function';
import { FrontSetup } from './_front_setup';

const override = css`
    display: block;
    position: absolute;
    left: 50%;
    top: 40%;
    border-width: 6px;
    z-index: 999999`;

const SetupWrap = () => {
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [setupPropsList, setSetupPropsList] = useState<ISetupData | undefined | null>();
    // redux (state: rootState)
    // get
    const fetchSetup = useSelector((state: any) => state.fetchSetup);
    const tmpSetup = useSelector((state: any)  => state.tmpSetup);
    // set
    const dispatch = useDispatch();


    // //////////////////////////// 여기까지 FETCH

    // component INIT!
    useEffect(() => {
        console.log('init***');
        if(!fetchSetup.code || fetchSetup.code !== 200) {
            console.log('!code || code !== 200');
            // fetch된 db 데이터가 없으면 가져온다
            dispatch(fetchSetupProps());
            setLoading(true);
        }
        return () => {
            console.log('SETUPcomponentWillUnmount=============');
            dispatch(resetTmpSetupStatus());
            // dispatch(resetFetchSetupStatus());
        }
    }, [])

    const mounted = useRef(false);
    useEffect(() => {
        if(!mounted.current) {
            mounted.current = true;
            } else {
            // fetch된 코드가 있고 제대로 들
            console.log('parent:::code감지');
            if(fetchSetup.code && fetchSetup.code === 200) {
                // dispatch(resetTmpSetupStatus());// 자식이 tmp로 들고있는 status 내용 지우기
                console.log(fetchSetup.response);
                setSetupPropsList(fetchSetup.response); // fetch된 코드를 다시 반영하자
                setLoading(false);
            }
        }
    }, [fetchSetup.code])



    // //////////////////////////// 여기까지 FETCH
    
    
    const mounted2 = useRef(false);
    useEffect(() => {
        if(!mounted2.current) {
            mounted2.current = true;
            } else {
            // fetch된 코드가 있고 제대로 들
            console.log('parent:::response감지');
            if(fetchSetup.code && fetchSetup.code === 200) {
                dispatch(resetTmpSetupStatus()); // 자식이 tmp로 들고있는 status 내용 지우기
                setSetupPropsList(fetchSetup.response); // fetch된 코드를 다시 반영하자
            }
        }
    }, [fetchSetup.response]) // fetch의 내용

    const mounted1 = useRef(false);
    useEffect(() => {
        console.log('child:::codeT감지');
        if(!mounted1.current) {
            mounted1.current = true;
        } else {
            console.log('reseponseT');
            if(tmpSetup.code && tmpSetup.code === 200) { // 성공 직후
                console.log('성공 이후');
                dispatch(fetchSetupProps());
            }
        }
    }, [tmpSetup.code])


    // /////////////////////////////////////////////////////////////////
    // ADMIN






    // /////////////////////////////////////////////////////////////////
    // FUNCTION

    const showLoading = () => {
        setLoading(true);
    }

    const hideLoading = () => {
        setLoading(false);
    }

    const updateState = () => {
        // setSetupPropsList(getSetupState);
    }

    const showAlert = (message: string, status?: string) => {
        confirmAlert({
            title: '[알림]',
            message,
            buttons: [
                {
                    label: '닫기',
                    onClick: (() => null)
                }
            ],
            overlayClassName: `${status}`
        });
    }

    const onClickAdminAction = (type: string) => {
        switch(type) {
            case 'admin' :
                confirmAlert({
                    title: '[관리자 계정 생성]',
                    message: `ID: 이노뎁.
                        Password: p@ssw0rd
                        계정으로 생성하시겠습니까?`,
                    buttons: [
                        { label: '취소', onClick: () => null },
                        { label: '생성', onClick: (() => {
                            showLoading();
                            dispatch(setupCreateID()); 
                            })
                        }
                    ],
                });
            break;

            case 'auth' :
                confirmAlert({
                    title: '[관리자 권한 초기화]',
                    message: '권한그룹: 관리자 그룹으로 초기화 하시겠습니까?',
                    buttons: [
                        { label: '취소', onClick: () => null },
                        { label: '초기화', onClick: (() => {
                            showLoading();
                            dispatch(setupResetRole()); 
                            })
                        }
                    ],
                });
            break;
            
            case 'pw' :
                confirmAlert({
                    title: '[관리자 비밀번호 초기화]',
                    message: '비밀번호를 p@ssw0rd로 초기화 하시겠습니까??',
                    buttons: [
                        { label: '취소', onClick: () => null },
                        { label: '초기화', onClick: (() => {
                            showLoading();
                            dispatch(setupResetPw()); 
                            })
                        }
                    ],
                });
            break;

            default: break;
        }
    }

    const onDownloadSetupFile = () => {
        if(!setupPropsList) return;
        const fileName = `vurix-dms-platform_셋업 정보_${dateFormat(new Date())}`;
        const json = JSON.stringify(setupPropsList, null, 4);
        const blob = new Blob([json],{type:'application/json'});
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = `${ fileName }.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const showOpenFileDialog = () => {
        if(inputFile.current) inputFile.current.click();
    }


    const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader();
        if (event.target && event.target.files) {
            fileReader.readAsText(event.target.files[0], 'UTF-8"');
            fileReader.onload = e => {
                if (e.target && e.target.result !== 'undefined' && !e.target.result) {
                    const response = { response: {...JSON.parse(String(e.target.result))} };
                    console.log(response);
                    // setSetupPropsList(response);
                } else {
                    showAlert(
                        `업로드에 실패하였습니다.
                        .json 파일 데이터를 확인해 주세요.`,
                        'failure'
                        );
                }   
            }
        }
    }   

   
    const onPutSetup = () => {
        console.log('onPutSetup::');
        const httpParam: IPutSetupBody = {
            menu_info: [],
            event_info: [],
            func_info: [],
            setup_info: [],
            layer_info: []
        };

        const setupTypes: { [index: string]: {code: string, value: string, param: string}} = {
            'MENU': { code: 'menu_code', value: 'setup_flag', param: 'menu_info' },
            'EVENT': { code: 'event_code', value: 'setup_flag', param: 'event_info' },
            'FUNCTION': { code: 'func_code', value: 'setup_flag', param: 'func_info' },
            'SETUP': { code: 'config_code', value: 'setup_data', param: 'setup_info' },
            'LAYER': { code: 'layer_id', value: 'setup_flag', param: 'layer_info' }
        };

        const setConvertPropsParam = (setupData: any, setupTypeInfo: {code: string, value: string, param: string}, setupType: string) => {
            _.forEach(setupData, (info) => {
                const infoObj: IPutSetup = {
                    key: info[setupTypeInfo.code],
                    value: info[setupTypeInfo.value],
                }
                if (info.area_flag) {
                    infoObj.area_flag = info.area_flag
                }
                    httpParam[setupTypeInfo.param].push(infoObj)
                if (info.children) {
                    setConvertPropsParam(info.children, setupTypeInfo, setupType);
                }
            });
        }

        // 약간 억지로 급하게 만든 부분
        const newSetupArr: any[] = [];
        if(tmpSetup.response) {
            const entries = Object.entries(tmpSetup.response);
            entries.forEach((ele) => {
                const obj: any = {type: '', data: []};
                if (ele[0]==='menuInfo') {
                    obj.type = 'MENU';
                    obj.data = ele[1];
                    newSetupArr.push(obj);
                } else if (ele[0]==='eventInfo') {
                    obj.type = 'EVENT';
                    obj.data = ele[1];
                    newSetupArr.push(obj);
                } else if (ele[0]==='funcInfo') {
                    obj.type = 'FUNCTION';
                    obj.data = ele[1];
                    newSetupArr.push(obj);
                } else if (ele[0]==='setupInfo') {
                    obj.type = 'SETUP';
                    obj.data = ele[1];
                    newSetupArr.push(obj);
                } else if (ele[0]==='layerInfo') {
                    obj.type = 'LAYER';
                    obj.data = ele[1];
                    newSetupArr.push(obj);
                }
            });
        }
        // // 약간 억지로 급하게 만든 부분
        console.log(newSetupArr);

        _.forEach(newSetupArr, (setupGroup) => {
            setConvertPropsParam(setupGroup.data, setupTypes[setupGroup.type], setupGroup.type);
        })

        // dispatch(putSetupProps(httpParam));
    }

    // [수정] 버튼
    const onModifySetup = () => {
        confirmAlert({
            title: '[셋업 설정 정보 수정]',
            message: '셋업 설정 정보를 수정하시겠습니까?',
            buttons: [
                { label: '취소', onClick: () => null },
                { label: '수정', onClick: () => onPutSetup() }
            ],
        });
    };

    // const forceUpdate = useReducer(() => ({}), {})[1] as () => void

    // [초기화] 버튼
    const onResetSetup = () => {
        confirmAlert({
            title: '[셋업 설정 초기화]',
            message: '셋업 설정 정보를 초기화 하시겠습니까?',
            buttons: [
                { label: '취소', onClick: () => null },
                { label: '초기화', onClick: () => {
                    setSetupPropsList(fetchSetup.response); // fetch된 코드를 다시 반영하자
                }}
            ],
        });
    };
  
 

    // div에 key를 왜? 렌더링 되는 VIEW
    return (
        <>
            <ClipLoader color="#0d6efd" loading={loading} css={override} size={50} />
            {
                loading ?
                    <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.8)', zIndex: 99999 }} /> 
                      :
                    <div className="row h-90">
                        {/* 1. 적용 메뉴 */}
                        <div className="apply-menu box">
                            <h2>적용메뉴</h2>
                            { 
                                !setupPropsList || setupPropsList && !setupPropsList.menuInfo?
                                <span>loading...</span> 
                                    : 
                                <div className="box-content">
                                    <ApplyMenu 
                                        propsMenuInfo={ getConvertTreeData(setupPropsList.menuInfo, 'root', { group: 'p_menu_code', code: 'menu_code' }) } 
                                    />
                                </div> 
                            }
                        </div>
                        {/* 2. 수신 이벤트 */}
                        <div className="incoming-event box">
                            <h2>수신 이벤트</h2>
                            { 
                                !setupPropsList || setupPropsList && !setupPropsList.eventInfo?
                                <span>loading...</span> 
                                    : 
                                <div className="box-content">
                                    <IncomingEvent 
                                        propsEventInfo={ setupPropsList.eventInfo } 
                                    />
                                </div> 
                            }
                        </div>
                        {/* 3. CCTV 기능 */}
                        <div className="cctv-function box">
                            { 
                                !setupPropsList || setupPropsList && !setupPropsList.layerInfo? 
                                <span>loading...</span> 
                                    : 
                                <CctvFunction 
                                    propsCctvFunctionInfo={ 
                                        getConvertTreeData(setupPropsList.funcInfo, 'root', 
                                        { group: 'func_group', code: 'func_code' }) 
                                    }
                                    propLayerInfo={ setupPropsList.layerInfo }
                                /> 
                            }
                        </div>
                        {/* 4. FRONT 설정 */}
                        <div className="front-setting box">
                            <h2>FRONT 설정</h2>
                            {
                                !setupPropsList || setupPropsList && !setupPropsList.setupInfo?
                                <span>loading...</span> 
                                    :  
                                <div className="box-content">
                                    <FrontSetup 
                                        propsSetupInfo={ getConvertTreeData(setupPropsList.setupInfo, 'root', { group: 'config_group', code: 'config_code' }) } 
                                    />
                                </div> 
                            }
                        </div>
                    </div> 
            }

            <div className="bottom h-5">
                <div className="btn-left">
                    <button type="button" className="btn btn-primary btn-sm mr-10">관리자 계정 생성</button> 
                    <button type="button" className="btn btn-primary btn-sm mr-10">관리자 권한 초기화</button> 
                    <button type="button" className="btn btn-primary btn-sm mr-10">관리자 비밀번호 초기화</button> 
                </div>
                <div className="btn-right">
                    <form>
                        <button type="button" className="btn btn-primary btn-sm mr-10" onClick={ onDownloadSetupFile } >백업(JSON)</button>
                        <button type="button" className="btn btn-primary btn-sm mr-10" onClick={ showOpenFileDialog } >복원(JSON)</button>
                        <input type="file" ref={inputFile} onChange={onChangeFile} accept=".json" style={{ display: 'none' }} />
                        <button type="button" className="btn btn-primary btn-sm mr-10" onClick={ onModifySetup } >수정</button>
                        <button type="button" className="btn btn-primary btn-sm mr-10" onClick={ onResetSetup } >초기화</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SetupWrap;