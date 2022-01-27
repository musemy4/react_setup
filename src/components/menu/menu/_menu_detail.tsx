
import { stringify } from 'querystring';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

// dispatch
import { IPathObj } from './menu_interface';
import { MenuDetailBtnArea } from './_menu_detail_btn_area';
import { MenuDetailTitle } from './_menu_detail_title';

export const MenuDetail = () => {
    const [chkSpecs, setChkSpecs]=useState<boolean[]>([false,false,false]);
    const [pathMode, setPathMode]=useState<'basic'|'external'|'side'>('basic');
    const [menuPath, setMenuPath]=useState<IPathObj>({
        mode: 'basic',
        basic: ['/', '/'],
        external: ['/', '/', '/'],
        side: ['/'] // 소메뉴 시에만 있다. url 변경 없음
    });
    const [encodePath, setEncodePath]=useState<string>('');
    // redux
    const menuMode = useSelector((state: any) => state.menuMode.mode);
    const menu = useSelector((state: any) => state.menu);


    // 처음 시작될때
    useEffect(() => {
        console.log(menuMode);
    }, [])

    useEffect(() => {
        console.log('+++ 메뉴 변경 감지!+++');
        console.log(menu);
        const chklist = [];
        chklist.push(!!menu.admin_auth_enable);
        chklist.push(!!menu.download_enable);
        chklist.push(!!menu.gis_enable);
        setChkSpecs(chklist);
        if(menuMode !== 'default') {
            console.log('initMenuForm::');
            initMenuForm();
        }
    }, [menu])

    useEffect(() => {
        console.log('+++ 메뉴 모드 감지! +++');
        console.log(menuMode);
    }, [menuMode])

    
    useEffect(() => {
        console.log('+++ inputPath 변경 감지! +++');
        console.log(menuPath);
    }, [menuPath])


    // const eliminateExp = (str: string): string => {
    //     if(str.includes("%3D")) {
    //         str = str.replace(/%3D/g, '');
    //         console.log(str);
    //     } 
    //     return str;
    // }  


    // const decode = (str: string) => {
    //     console.log('str:: ', str);
    //     str = eliminateExp(str);
    //     console.log('result:', str)
    //     const decode = window.atob(str);
    //     console.log(decode);
    //     const result = decodeURIComponent(decode);
    //     console.log(result);
    //     return result;
    // }

    const decode = (str: string) => {
        // console.log('str:: ', str);
        str = decodeURIComponent(str);
        // console.log(str);
        try {
            str = atob(str);
        } catch(error) {
            console.log(error);
        }
        // console.log('result:', str)
        return str;
    }

    // const encode = () => {

    // }

    const initMenuForm = () => {
        const path_full = menu.menu_page;
        const basic = [];
        const external = [];
        const side = [];
        console.log(path_full);
        console.log((path_full.match('/') || []).length);
        console.log(path_full.includes("/external-page/"));
        if(menuMode?.substring(3,6) === 'Mod') { // 상세일때 (내용이 이미 있음)
            if(menuMode?.substring(0,3) === 'Big') { // 대메뉴시에
                if(path_full.includes("/external-page/")) { // 외부페이지인 경우
                    let afterExt = path_full.substr(15);
                    afterExt = decode(afterExt);
                    external.push('/external-page/');
                    external.push(afterExt);
                    external.push(path_full);
                    setMenuPath({
                        ...menuPath,
                        mode: 'external',
                        external,
                    })
                    setPathMode('external');
                } else {
                    basic.push(path_full);
                    setMenuPath({
                        ...menuPath,
                        mode: 'basic',
                        basic,
                    });
                    setPathMode('basic');
                }
            } else if(menuMode?.substring(0,3) === 'Sml') { // 소메뉴시
                console.log('소메뉴선택');
                // external
                if(path_full.includes("/external-sub-page/")) {
                    const pathArr = path_full.split('/external-sub-page/');
                    console.log(pathArr);
                    const afterExt = decode(pathArr[1]);
                    external.push(`${pathArr[0]}/external-sub-page/`);
                    external.push(afterExt);
                    external.push(path_full);
                    setMenuPath({
                        ...menuPath,
                        mode: 'external',
                        external,
                    })
                    setPathMode('external');
                // side                    
                } else if((path_full.match('/') || []).length === 1) {
                    side.push(path_full);
                    setMenuPath({
                        ...menuPath,
                        mode: 'side',
                        side,
                    });
                    setPathMode('side');
                // basic    
                } else {
                    basic.push(path_full);
                    setMenuPath({
                        ...menuPath,
                        mode: 'basic',
                        basic,
                    });
                    setPathMode('basic');
                }
            }
        }
        if(menuPath.mode === 'basic') {
            setChkSpecs([true,false,false]);
        } else if(menuPath.mode === 'external') {
            setChkSpecs([false, true,false]);
        } else {
            setChkSpecs([false, false, true]);
        }
        
    }

    const onInputChange=(e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.id);
        console.log(e.target.value);
    }

    const onInputChangeEncode=(e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.id);
        console.log(e.target.value);
        setMenuPath({
            ...menuPath,
        })
    }
    
    const onRadioChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id.substring(4);
        if(id==='basic') {
            setPathMode('basic');
        } else if(id==="external"){
            setPathMode('external');
        } else {
            setPathMode('side');
        }
    }

    const onCheckboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = Number(e.target.id[3]);
        const chklist = chkSpecs;
        chklist[id] = !chklist[id];
        setChkSpecs(chklist);
    }

  

    const refresh = String(new Date());

    return (
        <>
            <div className="menu-detail box" key={menu?.menu_code + refresh}>

                { menuMode === 'default' ? (
                            <div>
                                <div className="alert-msg">
                                    <i className="far fa-folder" />
                                    <span>선택한 메뉴가 없습니다</span>
                                </div>
                            </div>
                    ): (

                        <>
                        <MenuDetailTitle />    
                        
                        <div className="menu-content-wrap">
                            <h3>부모 메뉴</h3>
                            <div className="content-box">
                                <input disabled className="ui_input w_full" defaultValue={ menu?.p_menu_code } />
                            </div>

                            <h3 className='half'>메뉴 이름</h3>
                            <h3 className='half'>메뉴 코드</h3>
                            <div className='content-box w_full'>
                                <input onChange={ onInputChange } className="ui_input half" defaultValue={ menu?.menu_name } />
                                <input onChange={ onInputChange } className="ui_input half" defaultValue={ menu?.menu_code } />
                            </div>


                            { menuMode.substring(0,3) === 'Big' ? (
                                <>
                                    <h3 className='half'>순서</h3>
                                    <div className='content-box w_full'>
                                        <input disabled onChange={ onInputChange } className="ui_input w_full" defaultValue={ menu?.ordering } />
                                    </div>
                                </>
                                ):(
                                    <>
                                    <h3 className='half'>아이콘 (Font Awesome 5)</h3>
                                    <h3 className='half'>순서</h3>
                                    <div className='content-box w_full'>
                                        <input onChange={ onInputChange } className="ui_input half" defaultValue={ menu?.icon } />
                                        <input disabled onChange={ onInputChange } className="ui_input half" defaultValue={ menu?.ordering } />
                                    </div>
                                </> 
                                )
                            }

                            <h3>메뉴 특수 기능 사용 여부</h3>
                            <div className="w-bg-box content-box">
                                <div className='menu_list'>
                                    <span className="menu_title">
                                        <span className="checkbox_wrap">
                                            <input className="form-check-input" type="checkbox"
                                                onChange={(e) => onCheckboxHandler(e)} id="chk0" defaultChecked={chkSpecs[0]} />
                                            <label className="form-check-label">관리 권한 셋업 여부</label>
                                        </span>
                                    </span>
                                </div>
                                <div className='menu_list'>
                                    <span className="menu_title">
                                        <span className="checkbox_wrap">
                                            <input className="form-check-input" type="checkbox"
                                                onChange={(e) => onCheckboxHandler(e)} id="chk1" defaultChecked={chkSpecs[1]} />
                                            <label className="form-check-label">다운로드 권한 셋업 여부</label>
                                        </span>
                                    </span>
                                </div>
                                { menuMode.substring(0,3) === 'Big' &&(
                                    <div className='menu_list'>
                                        <span className="menu_title">
                                            <span className="checkbox_wrap">
                                                <input className="form-check-input" type="checkbox"
                                                    onChange={(e) => onCheckboxHandler(e)} id="chk2" defaultChecked={chkSpecs[2]} />
                                                <label className="form-check-label">초기진입메뉴 1depth 여부</label>
                                            </span>
                                        </span>
                                    </div>
                                )}
                            </div>

                            <h3>메뉴 경로 설정</h3>
                            <div className="w-bg-box">
                                <div className="radio_area">
                                    <span className="radio_wrap">
                                        <label>
                                            <input className="ml-5 mr-3" id="rdo_basic" type="radio"
                                                checked={pathMode === 'basic'} name='menu_path_grp'
                                                onChange={ onRadioChangeHandler } />
                                            기본 메뉴
                                        </label>
                                    </span>
                                    <span className="radio_wrap">
                                        <label>
                                            <input className="ml-5 mr-3" id="rdo_external" type="radio"
                                                checked={pathMode === 'external'} name='menu_path_grp'
                                                onChange={ onRadioChangeHandler } />
                                            외부 사이트 연계 메뉴
                                        </label>
                                    </span>
                                    { menuMode.substring(0,3) === 'Sml' &&(
                                        <span className="radio_wrap">
                                        <label>
                                            <input className="ml-5 mr-3" id="rdo_side" type="radio" 
                                                checked={pathMode === 'side'} name='menu_path_grp'
                                                onChange={ onRadioChangeHandler } />
                                            서브메뉴 선택 시 사이드바 표출 메뉴
                                        </label>
                                    </span>
                                    )}
                                </div>
                                <div className='content-box'>
                                    { menuMode.substring(0,3) === 'Big' ? 
                                        pathMode === 'basic' && (
                                            <input onChange={ onInputChange } className="ui_input w_full" id="big_path_basic" value={menuPath.basic[0]} />
                                        ) || pathMode === 'external' && (
                                            <>
                                                <input disabled className="ui_input half" id="big_path_external_0" value={menuPath.external[0]} />
                                                <input onChange={onInputChangeEncode} className="ui_input half" id="big_path_external_1" value={menuPath.external[1]} />
                                                <input disabled className="ui_input w_full" id="big_path_external_2" value={menuPath.external[2]} />
                                            </>
                                        ) 
                                    :
                                        pathMode === 'basic' && (
                                            <>
                                                <input disabled className="ui_input half" id="sml_path_basic_0" defaultValue={menuPath.basic[0]} />
                                                <input onChange={ onInputChange } className="ui_input half" id="sml_path_basic_1" defaultValue={menuPath.basic[1]} />
                                            </>
                                        ) || pathMode === 'external' && (
                                            <>
                                                <input disabled className="ui_input half" id="sml_path_external_0" defaultValue={menuPath.external[0]} />
                                                <input onChange={ onInputChange } className="ui_input half" id="sml_path_external_1" defaultValue={menuPath.external[1]} />
                                                <input disabled className="ui_input w_full" id="sml_path_external_2" defaultValue={menuPath.external[2]} />
                                            </>
                                        ) || pathMode === 'side' && (
                                            <input disabled className="ui_input w_full" id="sml_path_side_0" defaultValue={menuPath.side[0]} />
                                        )
                                    }
                                    
                                </div>
                            </div>
                                    
                            <MenuDetailBtnArea />        
                           
                        </div>
                    </>
                )} 
            </div>
            </>
    )
}