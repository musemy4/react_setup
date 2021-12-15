// React
import { useState, useEffect, useRef } from 'react';
// confirm, toast
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
// spinner
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
// redux
import { useDispatch, useSelector } from 'react-redux';
// from redux store
// setup
import { resetAdminStatus, setupCreateID, setupResetRole, setupResetPw  } from '../../../store/setup/admin';
import { fetchSetupProps, resetFetchSetupStatus, afterPutSetup } from '../../../store/setup/fetchSetup';
import { putTmpSetupProps, resetTmpSetupStatus } from '../../../store/setup/tmpSetup';
// utils
import { getConvertTreeData, getDeconvertTreeData } from '../../../common/utils/convert-data';
import { dateFormat } from '../../../common/utils/date';
// interface
import { ISetupData } from './setup_interface';


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
    const [loading, setLoading] = useState(true);
    const [setupPropsList, setSetupPropsList] = useState<ISetupData | undefined | null>();
    // redux (state: rootState)
    // get
    const admin = useSelector((state: any) => state.admin);
    const fetchSetup = useSelector((state: any) => state.fetchSetup);
    const tmpSetup = useSelector((state: any)  => state.tmpSetup);
    // set
    const dispatch = useDispatch();


    // store에서 온 type에 따라 처리 ////////////////////////////////////////////////

    useEffect(() => {
        // "관리자 계정 생성"
        if (admin && admin.type === 'create') {
            hideLoading();
            if (admin.status === 'SUCCESS') {
                showAlert('관리자 계정 생성에 성공하였습니다.', 'success');
            } else if (admin.status === 'DUPLICATE') {
                showAlert('관리자 계정 [이노뎁]이 이미 생성되었습니다.', 'failure');
            } else {
                showAlert('관리자 계정 생성에 실패하였습니다.', 'failure');
            }

            dispatch(resetAdminStatus());
        }

        // "관리자 권한 초기화"
        if (admin && admin.type ==='auth') {
            hideLoading();
            if (admin.status === 'SUCCESS') {
                showAlert('관리자 권한 초기화에 성공하였습니다.', 'success');
            } else {
                showAlert('관리자 권한 초기화에 실패하였습니다.', 'failure');
            }
            dispatch(resetAdminStatus());
        }
        
        // "관리자 비밀번호 초기화"
        if (admin && admin.type === 'pw') {
            hideLoading();
            if (admin.status === 'SUCCESS') {
                showAlert('관리자 비밀번호 초기화에 성공하였습니다.', 'success');
            } else {
                showAlert('관리자 비밀번호 초기화에 실패하였습니다.', 'failure');
            }
            dispatch(resetAdminStatus());
        }
    });

    // //////////////////////////// 여기까지 FETCH

    // 처음 시작될때
    useEffect(() => {
        // setup_wrap start
        if(!fetchSetup.code) {
            // fetch된 db 데이터가 없으면 가져온다
            dispatch(fetchSetupProps());
        }

        // 컴포넌트가 꺼질때
        return () => {
            dispatch(resetTmpSetupStatus());
            dispatch(resetFetchSetupStatus());
        }
    }, [])

    const mounted = useRef(false);
    useEffect(() => {
        if(!mounted.current) {
            mounted.current = true;
        } else if (fetchSetup.code && fetchSetup.code === 200) {
            updateState(); // fetch된 코드를 다시 반영하자
            setLoading(false);
        } else if (fetchSetup.code && fetchSetup.code === -1)  {
            showAlert('셋업 설정이 수정되었습니다!', 'success');
            // code === -1 : afterputsetup fetchsetup reset
            dispatch(fetchSetupProps());
        } else if (fetchSetup.code && fetchSetup.code !== 200)  {
            showAlert(`셋업 정보를 가져오는데 실패하였습니다. 
            관리자에게 문의하세요.`, 'failure');
        } else if (!fetchSetup)  {
            updateState();
        }
        
    }, [fetchSetup.code])

    useEffect(() => {
        if(tmpSetup.code && tmpSetup.code === 200) { // put 성공 직후
            dispatch(resetTmpSetupStatus());
            dispatch(afterPutSetup()); // fetchSetup.code === -1
        }
    }, [tmpSetup.code])


    // /////////////////////////////////////////////////////////////////
    // FUNCTION

    const showLoading = () => {
        setLoading(true);
    }

    const hideLoading = () => {
        setLoading(false);
    }

    const updateState = () => {
        setSetupPropsList(fetchSetup.response);
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
        const httpParams = getDeconvertTreeData(tmpSetup);
        dispatch(putTmpSetupProps(httpParams));
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


    // [초기화] 버튼
    const onResetSetup = () => {
        confirmAlert({
            title: '[셋업 설정 초기화]',
            message: '셋업 설정 정보를 초기화 하시겠습니까?',
            buttons: [
                { label: '취소', onClick: () => null },
                { label: '초기화', onClick: () => {
                    
                    dispatch(resetTmpSetupStatus());
                    updateState();
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
                    <div className="row h-95">
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
                                    propsCctvFunctionInfo={getConvertTreeData(setupPropsList.funcInfo, 'root', { group: 'func_group', code: 'func_code' })}
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
                                        propsSetupInfo={getConvertTreeData(setupPropsList.setupInfo, 'root', { group: 'config_group', code: 'config_code'})} 
                                    />
                                </div> 
                            }
                        </div>
                    </div> 
            }

            <div className="bottom h-5">
                <div className="btn-left">
                    <button type="button" className="btn btn-primary btn-sm mr-10" onClick={ () => onClickAdminAction('admin') }>관리자 계정 생성</button>
                    <button type="button" className="btn btn-primary btn-sm mr-10" onClick={ () => onClickAdminAction('auth') }>관리자 권한 초기화</button>
                    <button type="button" className="btn btn-primary btn-sm mr-10" onClick={ () => onClickAdminAction('pw') }>관리자 비밀번호 초기화</button>
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