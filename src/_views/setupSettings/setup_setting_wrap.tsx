// React
import _ from 'lodash';
import React, { RefObject } from 'react';
// confirm, toast
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
// spinner
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
// Actions
import { setupCreateID, setupResetRole, setupResetPw, resetAdminStatus } from '../../_actions/admin';
import { resetSetupLogin } from '../../_actions/login';
import { getSetupProps, getSetupPropsJson, putSetupProps, addSetupData, resetGetSetupStatus, resetPutSetupStatus } from '../../_actions/setup';
// Components
import { ApplyMenu } from './apply_menu';
import { IncomingEvent } from './incoming_event';
import { CctvFunction } from './cctv_function';
import { FrontSetup } from './front_setup';
// Util
import { getConvertTreeData } from '../../common/utils/convert-data';
import { dateFormat } from '../../common/utils/date';
// Interfaces
import { 
    IMenu, 
    IFunc, 
    IEvent, 
    ISetup, 
    ILayer,
    IGetSetupGroup,
    IGetSetupHttpBody, 
    IPutSetupGroup,
    IPutSetup, 
    IPutSetupHttpBody,
    IAddSetupData
} from './setup_interface';

// interfaces
interface IProps {
    setupCreateID: () => void; 
    setupResetRole: () => void;
    setupResetPw: () => void;
    resetAdminStatus: () => void;
    adminState: {
        [key: string] : {
            type: string;
            status: string;
         }   
    };
    getSetupProps: () => void;
    getSetupPropsJson: (param: IGetSetupGroup) => void;
    resetGetSetupStatus: () => void;
    putSetupProps: (param: IPutSetupGroup) => void;
    resetPutSetupStatus: () => void;
    addSetupData: (data: Array<IMenu | IFunc | IEvent | ISetup | ILayer>, type: string) => void;
    getSetupState: IGetSetupHttpBody;
    putSetupState: IPutSetupHttpBody;
    addSetupState: Array<IAddSetupData>;
    resetSetupLogin: () => void;
}

interface IState {
    refresh?: string;
    loading: boolean;
    setupPropsList: IGetSetupHttpBody;
}

const override = css`
  display: block;
  position: absolute;
  left: 50%;
  top: 40%;
  border-width: 6px;
  z-index: 999999`;

class SetupSettingWrap extends React.Component<IProps, IState> {
    private refInputFIle: RefObject<HTMLInputElement>;

    constructor(props: IProps) {
        super(props);
        this.state = { 
            refresh: String(new Date()),
            loading: false,
            setupPropsList: props.getSetupState 
        };
        this.refInputFIle = React.createRef<HTMLInputElement>();
    }

    componentDidMount() {
        const { getSetupProps, resetSetupLogin } = this.props;
        resetSetupLogin();
        getSetupProps();
    }

    componentDidUpdate() {
        const { getSetupState, putSetupState, adminState, resetAdminStatus, resetGetSetupStatus, resetPutSetupStatus } = this.props;

        if (getSetupState && getSetupState.code) {
            if (getSetupState.code === 200) {
                this.updateState();
            }
            resetGetSetupStatus();
        }

        if (putSetupState && putSetupState.code) {
            this.hideLoading();
            if (putSetupState.code === 200) {
                this.showAlert('셋업 설정 수정에 성공하였습니다.', 'success');
            } else {
                this.showAlert('셋업 설정 수정에 실패하였습니다.', 'failure');
            }
            resetPutSetupStatus();
        }

        if (adminState.admin && adminState.admin.type === 'create') {
            this.hideLoading();
            if (adminState.admin.status === 'SUCCESS') {
                this.showAlert('관리자 계정 생성에 성공하였습니다.', 'success');
            } else if (adminState.admin.status === 'DUPLICATE') {
                this.showAlert('관리자 계정 [이노뎁]이 이미 생성되었습니다.', 'failure');
            } else {
                this.showAlert('관리자 계정 생성에 실패하였습니다.', 'failure');
            }
            resetAdminStatus();
        }
        if (adminState.admin && adminState.admin.type === 'auth') {
            this.hideLoading();
            if (adminState.admin.status === 'SUCCESS') {
                this.showAlert('관리자 권한 초기화에 성공하였습니다.', 'success');
            } else {
                this.showAlert('관리자 권한 초기화에 실패하였습니다.', 'failure');
            }
            resetAdminStatus();
        }
        if (adminState.admin && adminState.admin.type === 'pw') {
            this.hideLoading();
            if (adminState.admin.status === 'SUCCESS') {
                this.showAlert('관리자 비밀번호 초기화에 성공하였습니다.', 'success');
            } else {
                this.showAlert('관리자 비밀번호 초기화에 실패하였습니다.', 'failure');
            }
            resetAdminStatus();
        }
    }

    showLoading = () => {
        this.setState({ loading: true });
    }

    hideLoading = () => {
        this.setState({ loading: false });
    }

    updateState = () => {
        const { getSetupState } = this.props;
        this.setState({ setupPropsList: getSetupState });
    }

    showAlert = (message: string, status?: string) => {
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

    onClickAdminAction = (type: string) => {
        const { setupCreateID, setupResetRole, setupResetPw } = this.props;
        switch(type) {
            case 'admin' :
                confirmAlert({
                    title: '[관리자 계정 생성]',
                    message: `ID: 이노뎁.
                    Password: p@ssw0rd
                    계정으로 생성하시겟습니까?`,
                    buttons: [
                        { label: '취소', onClick: () => null },
                        { label: '생성', onClick: (() => {
                            this.showLoading();
                            setupCreateID() 
                        })}
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
                            this.showLoading();
                            setupResetRole() 
                        })}
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
                            this.showLoading();
                            setupResetPw() 
                        })}
                    ],
                });
                break;
            default :
                break;
        }
    }

    onDownloadSetupFile = () => {
        const { setupPropsList } = this.state;
        const fileName = `vurix-dms-platform_셋업 정보_${dateFormat(new Date())}`;
        const json = JSON.stringify(setupPropsList.response, null, 4);
        const blob = new Blob([json],{type:'application/json'});
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = `${ fileName }.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    onClickFileUpload = () => {
        this.refInputFIle.current?.click()
    }

    onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader();
        if (event.target && event.target.files) {
            fileReader.readAsText(event.target.files[0], 'UTF-8"');
            fileReader.onload = e => {
                if (e.target && e.target.result !== 'undefined' && !e.target.result) {
                    const response = { response: {...JSON.parse(String(e.target.result))} };
                    this.setState({ 
                        refresh: String(new Date()),
                        setupPropsList: response
                        });
                } else {
                    this.showAlert(
                        `업로드에 실패하였습니다.
                        .json 파일 데이터를 확인해 주세요.`,
                         'failure'
                    );
                }   
            }
        }
    }   

    onResetSetup = () => {
        confirmAlert({
            title: '[셋업 설정 초기화]',
            message: '셋업 설정 정보를 초기화 하시겠습니까?',
            buttons: [
                { label: '취소', onClick: () => null },
                { label: '초기화', onClick: () => window.location.reload() }
            ],
        });
    };

    onModifySetup = () => {
        confirmAlert({
            title: '[셋업 설정 정보 수정]',
            message: '셋업 설정 정보를 수정하시겠습니까?',
            buttons: [
                { label: '취소', onClick: () => null },
                { label: '수정', onClick: () => this.onPutSetupProps() }
            ],
        });
    };

    onPutSetupProps = () => {
        const { addSetupState } = this.props;
        const httpParam: IPutSetupGroup = {
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
        _.forEach(addSetupState, (setupGroup) => {
            setConvertPropsParam(setupGroup.data, setupTypes[setupGroup.type], setupGroup.type);
        })

        const { putSetupProps } = this.props;
        putSetupProps(httpParam);
    }

    render() {
        const { addSetupData } = this.props;
        const { setupPropsList, refresh, loading } = this.state;
        if (!setupPropsList) {
            return null;
        }
        
        return (
            <div key={ refresh }>
                <ClipLoader color="#0d6efd" loading={loading} css={override} size={50} />
                {
                    loading 
                        ? <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.8)', zIndex: 99999 }} />
                        : null
                }
                <div className="row h-95">
                    <div className="apply-menu box">
                        <h2>적용메뉴</h2>
                        { 
                            !setupPropsList.response.menuInfo
                                ? <span>loading...</span> 
                                : <div className="box-content">
                                    <ApplyMenu 
                                        addData={ addSetupData } 
                                        propsMenuInfo={ getConvertTreeData(setupPropsList.response.menuInfo, 'root', { group: 'p_menu_code', code: 'menu_code' }) } 
                                    />
                                </div> 
                        }
                    </div>
                    <div className="incoming-event box">
                        <h2>수신 이벤트</h2>
                        { 
                            !setupPropsList.response.eventInfo
                                ? <span>loading...</span> 
                                : <div className="box-content">
                                    <IncomingEvent 
                                        addData={ addSetupData } 
                                        propsEventInfo={ setupPropsList.response.eventInfo } 
                                    />
                                </div> 
                        }
                    </div>
                    <div className="cctv-function box">
                        { 
                            !setupPropsList.response.layerInfo 
                                ? <span>loading...</span> 
                                : <CctvFunction 
                                    addData={ addSetupData }
                                    propsCctvFunctionInfo={ 
                                        getConvertTreeData(setupPropsList.response.funcInfo, 'root', 
                                        { group: 'func_group', code: 'func_code' }) 
                                    }
                                    propLayerInfo={ setupPropsList.response.layerInfo }
                                /> 
                        }
                    </div>
                    <div className="front-setting box">
                        <h2>FRONT 설정</h2>
                        { 
                            !setupPropsList.response.setupInfo
                                ? <span>loading...</span> 
                                : <div className="box-content">
                                        <FrontSetup 
                                            addData={ addSetupData } 
                                            propsSetupInfo={ getConvertTreeData(setupPropsList.response.setupInfo, 'root', { group: 'config_group', code: 'config_code' }) } 
                                        />
                                    </div> 
                        }
                    </div>
                </div>
                <div className="bottom h-5">
                    <div className="btn-left">
                        <button type="button" className="btn btn-primary btn-sm mr-10" onClick={ () => this.onClickAdminAction('admin') } >관리자 계정 생성</button>
                        <button type="button" className="btn btn-primary btn-sm mr-10" onClick={ () => this.onClickAdminAction('auth') } >관리자 권한 초기화</button>
                        <button type="button" className="btn btn-primary btn-sm mr-10" onClick={ () => this.onClickAdminAction('pw') } >관리자 비밀번호 초기화</button>
                    </div>
                    <div className="btn-right">
                        <button type="button" className="btn btn-primary btn-sm mr-10" onClick={ this.onDownloadSetupFile } >백업(JSON)</button>
                        <button type="button" className="btn btn-primary btn-sm mr-10" onClick={ this.onClickFileUpload } >복원(JSON)</button>
                        <input type="file" ref={ this.refInputFIle } onChange={ event => this.onChangeFile(event) } accept=".json" hidden/>
                        <button type="button" className="btn btn-primary btn-sm mr-10" onClick={ this.onModifySetup } >수정</button>
                        <button type="button" className="btn btn-primary btn-sm" onClick={ this.onResetSetup } >초기화</button>
                    </div>
                </div>
            </div>
        );
    }
}

interface IStateToProps {
    adminState: {
        [key: string] : {
            type: string;
            status: string;
        }   
    };
    getSetupState: IGetSetupHttpBody;
    putSetupState: IPutSetupHttpBody;
    addSetupState: Array<IAddSetupData>;
}

const mapStateToProps = ({ adminState, getSetupState, putSetupState, addSetupState }: IStateToProps) => {
    return { adminState, getSetupState, putSetupState, addSetupState };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({ 
        setupCreateID, 
        setupResetRole, 
        setupResetPw,
        resetAdminStatus,
        getSetupProps, 
        getSetupPropsJson,
        resetGetSetupStatus,
        putSetupProps, 
        resetPutSetupStatus,
        addSetupData, 
        resetSetupLogin,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupSettingWrap);