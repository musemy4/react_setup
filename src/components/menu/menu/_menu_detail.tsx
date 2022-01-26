
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

// dispatch
import { IPathObj } from './menu_interface';
import { MenuDetailBtnArea } from './_menu_detail_btn_area';
import { MenuDetailTitle } from './_menu_detail_title';

export const MenuDetail = () => {
    const [chkSpecs, setChkSpecs]=useState<boolean[]>([false,false,false]);
    const [pathMode, setPathMode]=useState<'basic'|'external'|'side'>('basic');
    const [inputPath, setInputPath]=useState<IPathObj>({
        mode: undefined,
        basic: [],
        external: ['/external-page/', '', '/external-page/'],
        side: []
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
        initialSetting();
    }, [menu])

    useEffect(() => {
        console.log('+++ 메뉴 모드 감지!+++');
        console.log(menuMode);
    }, [menuMode])

    
    useEffect(() => {
        console.log('+++ inputPath 변경 감지!+++');
        console.log(inputPath);
    }, [inputPath])

    const initialSetting = () => {
        if(menuMode?.substring(0,3) === 'big')
        setInputPath({...inputPath, mode: 'big'});
        else if(menuMode?.substring(0,3) === 'sml')
        setInputPath({...inputPath, mode: 'sml'});

        setChkSpecs([false,false,false]);
        setPathMode('basic');
    }

    const onInputChange=(e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        // if(e.target.id.substring(0,3)==='big') {
        //     console.log('대메뉴');
        //     const encoded = btoa(inputValue);
        //     console.log(encoded);
        //     const fullUrl = `/external-page/${encoded}`;
        //     console.log(fullUrl);
        //     setEncodePath(fullUrl);
        // } else { // 소메뉴
        //     console.log('소메뉴');
        // }
    }

    const onInputChangeEncode=(e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
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
                                            <input onChange={ onInputChange } className="ui_input w_full" id="big_path_basic" value={inputPath.basic[0]} defaultValue={ menu?.menu_page } />
                                        ) || pathMode === 'external' && (
                                            <>
                                                <input disabled className="ui_input half" id="big_path_external_0" value={inputPath.external[0]} defaultValue="/external-page/" />
                                                <input onChange={onInputChange} className="ui_input half" id="big_path_external_1" value={inputPath.external[1]} defaultValue="/external-page/"/>
                                                <input disabled className="ui_input w_full" id="big_path_external_2" value={inputPath.external[2]} defaultValue="/external-page/" />
                                            </>
                                        ) 
                                    :
                                        pathMode === 'basic' && (
                                            <>
                                                <input disabled onChange={ onInputChange } className="ui_input half" id="sml_path_basic_0" value={inputPath.basic[0]} defaultValue={ menu?.menu_code } />
                                                <input onChange={ onInputChange } className="ui_input half" id="sml_path_basic_1" value={inputPath.basic[1]} defaultValue={ menu?.menu_code } />
                                            </>
                                        ) || pathMode === 'external' && (
                                            <>
                                                <input disabled onChange={ onInputChange } className="ui_input half" id="sml_path_external_0" value={inputPath.external[0]} defaultValue={ menu?.menu_code } />
                                                <input onChange={ onInputChange } className="ui_input half" id="sml_path_external_1" value={inputPath.external[1]} defaultValue={ menu?.menu_code } />
                                                <input disabled onChange={ onInputChange } className="ui_input w_full" id="sml_path_external_2" value={inputPath.external[2]} defaultValue={ menu?.menu_code } />
                                            </>
                                        ) || pathMode === 'side' && (
                                            <input disabled onChange={ onInputChange } className="ui_input w_full" id="sml_path_side_0" value={inputPath.side[0]} defaultValue={ menu?.menu_page } />
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