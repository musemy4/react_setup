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
// fetch
// import { fetchSetupProps, putSetupProps, resetFetchedSetupStatus, resetSetupStatus } from '../../store/setup/setup';

// utils
import { getConvertTreeData } from '../../../common/utils/convert-data';

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
    const [setupPropsList, setSetupPropsList] = useState<ISetupData | undefined | null>();
    const [loading, setLoading] = useState(false);
    // redux (state: rootState)
    // get
    const {code, message, response, responseTime} = useSelector((state: any) => state.fetchSetup);
    const packedTmpSetup = useSelector((state: any)  => state.tmpSetup);
    // set
    const dispatch = useDispatch();



    // //////////////////////////// 여기까지 FETCH

    // component INIT!
    useEffect(() => {
        if(!code || code !== 200) {
            // fetch된 db 데이터가 없으면 가져온다
            // dispatch(fetchSetupProps());
        }
        return () => {
            console.log('SETUPcomponentWillUnmount=============');
            // dispatch(resetSetupStatus());
            // dispatch(resetFetchedSetupStatus());
        }
    }, [])

    const mounted = useRef(false);
    useEffect(() => {
        if(!mounted.current) {
            mounted.current = true;
            } else {
            // fetch된 코드가 있고 제대로 들
            console.log('parent:::code감지');
            if(code && code === 200) {
                // dispatch(resetSetupStatus());// 자식이 tmp로 들고있는 status 내용 지우기
                console.log(response);
                setSetupPropsList(response); // fetch된 코드를 다시 반영하자
            }
        }
    }, [code])




    // //////////////////////////// 여기까지 FETCH

    
    
    
    const mounted1 = useRef(false);
    useEffect(() => {
        console.log('parent:::codeT감지');
        if(!mounted1.current) {
            mounted1.current = true;
        } else {
            console.log('reseponseT');
            if(packedTmpSetup.code && packedTmpSetup.code === 200) { // 성공 직후
                console.log('성공 이후');
                // dispatch(fetchSetupProps());
            }
        }
    }, [packedTmpSetup.code])

    const mounted2 = useRef(false);
    useEffect(() => {
        if(!mounted2.current) {
            mounted2.current = true;
            } else {
            // fetch된 코드가 있고 제대로 들
            console.log('parent:::code감지');
            if(code && code === 200) {
                // dispatch(resetSetupStatus()); // 자식이 tmp로 들고있는 status 내용 지우기
                setSetupPropsList(response); // fetch된 코드를 다시 반영하자
            }
        }
    }, [response])


    

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
        if(packedTmpSetup.response) {
            const entries = Object.entries(packedTmpSetup.response);
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
                    // window.location.reload();  // 전체가 다 날라가버림!! ** 
                    // fetch된 코드를 다시 반영하자
                    // dispatch(resetSetupStatus()); // 자식이 tmp로 들고있는 status 내용 지우기
                    setSetupPropsList(response); // fetch된 코드를 다시 반영하자
                    // forceUpdate();    
                    }
                }
            ],
        });
    };
  
 

    // div에 key를 왜? 렌더링 되는 VIEW
    return (
        <>
            <ClipLoader color="#0d6efd" loading={loading} css={override} size={50} />
            {
                loading || !setupPropsList ?
                    <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.8)', zIndex: 99999 }} /> 
                      :
                    <div className="row h-90">
                        {/* 1. 적용 메뉴 */}
                        <div className="apply-menu box">
                            <h2>적용메뉴</h2>
                            {/* { 
                                !setupPropsList.response || setupPropsList && !setupPropsList.response.menuInfo?
                                <span>loading...</span> 
                                    :  */}
                                <div className="box-content">
                                    <ApplyMenu 
                                        // propsMenuInfo={ getConvertTreeData(setupPropsList.response.menuInfo, 'root', { group: 'p_menu_code', code: 'menu_code' }) } 
                                    />
                                </div> 
                            {/* } */}
                        </div>
                        {/* 2. 수신 이벤트 */}
                        <div className="incoming-event box">
                            <h2>수신 이벤트</h2>
                            {/* { 
                                !setupPropsList.response || !setupPropsList.response.eventInfo?
                                <span>loading...</span> 
                                    :  */}
                                <div className="box-content">
                                    <IncomingEvent 
                                        // propsEventInfo={ setupPropsList.response.eventInfo } 
                                    />
                                </div> 
                            {/* } */}
                        </div>
                        {/* 3. CCTV 기능 */}
                        <div className="cctv-function box">
                            {/* { 
                                !setupPropsList.response || !setupPropsList.response.layerInfo? 
                                <span>loading...</span> 
                                    :  */}
                                <CctvFunction 
                                    // propsCctvFunctionInfo={ 
                                    //     getConvertTreeData(setupPropsList.response.funcInfo, 'root', 
                                    //     { group: 'func_group', code: 'func_code' }) 
                                    // }
                                    // propLayerInfo={ setupPropsList.response.layerInfo }
                                /> 
                            {/* } */}
                        </div>
                        {/* 4. FRONT 설정 */}
                        <div className="front-setting box">
                            <h2>FRONT 설정</h2>
                            {/* { 
                                !setupPropsList.response || !setupPropsList.response.setupInfo?
                                <span>loading...</span> 
                                    :  */}
                                <div className="box-content">
                                    <FrontSetup 
                                        // propsSetupInfo={ getConvertTreeData(setupPropsList.response.setupInfo, 'root', { group: 'config_group', code: 'config_code' }) } 
                                    />
                                </div> 
                            {/* } */}
                        </div>
                    </div> 
            }

            <div className="bottom h-5">
                <div className="btn-left">
                    <button type="button" className="btn btn-primary btn-sm mr-10 disabled_btn">관리자 계정 생성</button> 
                    <button type="button" className="btn btn-primary btn-sm mr-10 disabled_btn">관리자 권한 초기화</button> 
                    <button type="button" className="btn btn-primary btn-sm mr-10 disabled_btn">관리자 비밀번호 초기화</button> 
                </div>
                <div className="btn-right">
                    <form>
                        <button type="button" className="btn btn-primary btn-sm mr-10 disabled_btn">백업(JSON)</button>
                        <button type="button" className="btn btn-primary btn-sm mr-10 disabled_btn">복원(JSON)</button>
                        <button type="button" className="btn btn-primary btn-sm mr-10" onClick={ onModifySetup } >수정</button>
                        <button type="button" className="btn btn-primary btn-sm mr-10" onClick={ onResetSetup } >초기화</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SetupWrap;