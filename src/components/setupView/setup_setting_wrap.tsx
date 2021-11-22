// React
import _ from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
// confirm, toast
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
// spinner
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
// Redux lib
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
// Actions
import { setupCreateID, setupResetRole, setupResetPw, resetAdminStatus } from '../../store/admin';
import { resetSetupLogin } from '../../store/login';
import { getSetupProps, getSetupPropsJson, putSetupProps, addSetupData, resetGetSetupStatus, resetPutSetupStatus } from '../../store/setup';
// import { setupCreateID, setupResetRole, setupResetPw, resetAdminStatus } from '../../_actions/admin';
// import { resetSetupLogin } from '../../_actions/login';
// import { getSetupProps, getSetupPropsJson, putSetupProps, addSetupData, resetGetSetupStatus, resetPutSetupStatus } from '../../_actions/setup';

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

const override = css`
  display: block;
  position: absolute;
  left: 50%;
  top: 40%;
  border-width: 6px;
  z-index: 999999`;

  const SetupSettingWrap = ({ adminState, getSetupState, putSetupState, addSetupState, // stateToProps
    setupCreateID, setupResetRole, setupResetPw, resetAdminStatus,resetSetupLogin, // dispatchToProps
    getSetupProps, getSetupPropsJson, resetGetSetupStatus, putSetupProps, resetPutSetupStatus, addSetupData}: IProps) => {
const inputFile = useRef<HTMLInputElement | null>(null); // ***
const [refresh, setRefresh] = useState(String(new Date()));
const [loading, setLoading] = useState(false);
const [setupPropsList, setSetupPropsList] = useState(getSetupState);

console.log(setupPropsList);
// componentDidMount(with React hooks) : ,[]
useEffect(() => {
// 아래는 클래스 방식일때 처리
// refInputFIle = React.createRef<HTMLInputElement>();
console.log('useEff:[]');
resetSetupLogin(); // 왜 리셋?..
getSetupProps(); // ** 전체 리스트 가져옴
return () => {
console.log('componentWillUnmount:::');
}

}, []);

const mounted = useRef(false); // componentDidmount는 넘어가도록 처리(지역변수 너낌)
// componentDidUpdate(with React hooks) : 
useEffect(() => {
console.log('useEff: ');
if(!mounted.current) {
console.log('init'); // 여기 치고 넘어가죠
mounted.current = true;
} else {
console.log(getSetupState);
if (getSetupState && getSetupState.code) {
if (getSetupState.code === 200) {
updateState();
}
resetGetSetupStatus();
}

if (putSetupState && putSetupState.code) {
hideLoading();
if (putSetupState.code === 200) {
showAlert('셋업 설정 수정에 성공하였습니다.', 'success');
} else {
showAlert('셋업 설정 수정에 실패하였습니다.', 'failure');
}
resetPutSetupStatus();
}

if (adminState.admin && adminState.admin.type === 'create') {
hideLoading();
if (adminState.admin.status === 'SUCCESS') {
showAlert('관리자 계정 생성에 성공하였습니다.', 'success');
} else if (adminState.admin.status === 'DUPLICATE') {
showAlert('관리자 계정 [이노뎁]이 이미 생성되었습니다.', 'failure');
} else {
showAlert('관리자 계정 생성에 실패하였습니다.', 'failure');
}
resetAdminStatus();
}
if (adminState.admin && adminState.admin.type === 'auth') {
hideLoading();
if (adminState.admin.status === 'SUCCESS') {
showAlert('관리자 권한 초기화에 성공하였습니다.', 'success');
} else {
showAlert('관리자 권한 초기화에 실패하였습니다.', 'failure');
}
resetAdminStatus();
}
if (adminState.admin && adminState.admin.type === 'pw') {
hideLoading();
if (adminState.admin.status === 'SUCCESS') {
showAlert('관리자 비밀번호 초기화에 성공하였습니다.', 'success');
} else {
showAlert('관리자 비밀번호 초기화에 실패하였습니다.', 'failure');
}
resetAdminStatus();
}
}
});



const showLoading = () => {
setLoading(true);
}

const hideLoading = () => {
setLoading(false);
}

const updateState = () => {
setSetupPropsList(getSetupState);
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
계정으로 생성하시겟습니까?`,
buttons: [
{ label: '취소', onClick: () => null },
{ label: '생성', onClick: (() => {
showLoading();
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
showLoading();
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
showLoading();
setupResetPw() 
})}
],
});
break;
default :
break;
}
}

const onDownloadSetupFile = () => {
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

const showOpenFileDialog = () => {
console.log('onClickFileUpload!');
if(inputFile.current) inputFile.current.click();
}


const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
const fileReader = new FileReader();
if (event.target && event.target.files) {
fileReader.readAsText(event.target.files[0], 'UTF-8"');
fileReader.onload = e => {
if (e.target && e.target.result !== 'undefined' && !e.target.result) {
const response = { response: {...JSON.parse(String(e.target.result))} };
setRefresh(String(new Date()));
setSetupPropsList(response);
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

const onResetSetup = () => {
confirmAlert({
title: '[셋업 설정 초기화]',
message: '셋업 설정 정보를 초기화 하시겠습니까?',
buttons: [
{ label: '취소', onClick: () => null },
{ label: '초기화', onClick: () => window.location.reload() }
],
});
};

const onModifySetup = () => {
confirmAlert({
title: '[셋업 설정 정보 수정]',
message: '셋업 설정 정보를 수정하시겠습니까?',
buttons: [
{ label: '취소', onClick: () => null },
{ label: '수정', onClick: () => onPutSetupProps() }
],
});
};

// setupProps 초기화
const onPutSetupProps = () => {
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

putSetupProps(httpParam);
}

// div에 key를 왜
return (
<div key={ refresh }>
<ClipLoader color="#0d6efd" loading={loading} css={override} size={50} />
{
loading 
? <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.8)', zIndex: 99999 }} />
: null
}
{ 
setupPropsList ? 
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
: <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.8)', zIndex: 99999 }} />
}

<div className="bottom h-5">
<div className="btn-left">
<button type="button" className="btn btn-primary btn-sm mr-10" onClick={ () => onClickAdminAction('admin') } >관리자 계정 생성</button>
<button type="button" className="btn btn-primary btn-sm mr-10" onClick={ () => onClickAdminAction('auth') } >관리자 권한 초기화</button>
<button type="button" className="btn btn-primary btn-sm mr-10" onClick={ () => onClickAdminAction('pw') } >관리자 비밀번호 초기화</button>
</div>
<div className="btn-right">
<form>
<button type="button" className="btn btn-primary btn-sm mr-10" onClick={ onDownloadSetupFile } >백업(JSON)</button>
<button type="button" className="btn btn-primary btn-sm mr-10" onClick={ showOpenFileDialog } >복원(JSON)</button>
<input type="file" ref={inputFile} onChange={onChangeFile} accept=".json" style={{ display: 'none' }} />
<button type="button" className="btn btn-primary btn-sm mr-10" onClick={ onModifySetup } >수정</button>
<button type="button" className="btn btn-primary btn-sm" onClick={ onResetSetup } >초기화</button>
</form>
</div>
</div>
</div>
);
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

// get datas from reducers::
// export const reducers = {
//     adminState: adminReducer,
//     loginState: loginReducer,
//     getSetupState: getSetupPropsReducer,
//     putSetupState: putSetupPropsReducer,
//     addSetupState: returnSetupPropsReducer,
// };
const mapStateToProps = ({ adminState, getSetupState, putSetupState, addSetupState }: IStateToProps) => {
return { adminState, getSetupState, putSetupState, addSetupState };
}

// set
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