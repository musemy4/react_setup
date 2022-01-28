import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { IPathObj } from '../menu_interface';



export const MenuDetailPath = () => {
    const [pathRadio, setPathRadio]=useState<'basic'|'external'|'side'>('basic');
    // redux
    const menuMode = useSelector((state: any) => state.menuMode.mode);
    const menu = useSelector((state: any) => state.menu);

    const [menuPath, setMenuPath]=useState<IPathObj>({
        mode: 'basic',
        initialId: '1',
        basic: ['/', '/'],
        external: ['/external-page/', '/', '/external-page/'],
        side: ['/'] // 소메뉴 시에만 있다. url 변경 없음
    });

    useEffect(() => {
        if(menu.menu_id !== ''){
            console.log('+++ 선택된 메뉴가 있음');
            if(menuMode !== 'default') {
                initPathForm();
            }
        }
    }, [menu])

    const getRefresh = () => {
        return String(new Date());
    }


    const initPathForm = () => {
        const path_full = menu.menu_page;
        let basic = [];
        let external = [];
        const side = [];
        const initialId = getRefresh();

        if(menuMode.substring(0,3) === 'Big') { // 대메뉴시에
            if(path_full.includes("/external-page/")) { // 외부페이지인 경우
                let afterExt = path_full.substr(15);
                afterExt = urlDecode(afterExt);
                external = ['/external-page/', afterExt, path_full];
                setMenuPath({
                    ...menuPath,
                    initialId,
                    mode: 'external',
                    external,
                })
                setPathRadio('external');
            } else {
                basic.push(path_full);
                setMenuPath({
                    ...menuPath,
                    initialId,
                    mode: 'basic',
                    basic,
                });
                setPathRadio('basic');
            }
        } else if(menuMode.substring(0,3) === 'Sml') { // 소메뉴시
            // external
            if(path_full.includes("/external-sub-page/")) {
                const pathArr = path_full.split('/external-sub-page/');
                external = [`${pathArr[0]}/external-sub-page/`, urlDecode(pathArr[1]), path_full];
                setMenuPath({
                    ...menuPath,
                    initialId,
                    mode: 'external',
                    external,  
                })
                setPathRadio('external');
                // side                    
            } else if(isSide(path_full)) {
                console.log('소메뉴_side');
                side.push(path_full);
                setMenuPath({
                    ...menuPath,
                    mode: 'side',
                    initialId,
                    side,
                });
                setPathRadio('side');
            // basic    
            } else {
                const splitArr = path_full.split('/');
                basic = [`/${splitArr[1]}`, `/${splitArr[2]}`]
                setMenuPath({
                    ...menuPath,
                    mode: 'basic',
                    initialId,
                    basic,
                });
                setPathRadio('basic');
            }
        }
    }

    const onPathInputChange=(e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.id.split('_')[0] === 'external') {
            const extArr = menuPath.external;
            extArr[1] = e.target.value;
            console.log(extArr[0]+urlEncode(extArr[1]));
            extArr[2]=extArr[0]+urlEncode(extArr[1]);
            setMenuPath({
                ...menuPath,
                mode: 'external',
                basic: ['',''],
                external: menuPath.external,
                side: ['']    
            });
            console.log(menuPath.external);
        }
    }


    const onRadioChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id.substring(4);
        console.log('바꾼다리', id);
        const path_full = menu.menu_page;
        const basic = [];
        const external = [];
        const side = [];

        if(id==='basic') {
            setPathRadio('basic');
        } else if(id==="external"){
            setPathRadio('external');
        } else {
            setPathRadio('side');
        }
        console.log(menuPath);
    }

    const urlDecode = (str: string) => {
        str = decodeURIComponent(str);
        try {
            str = atob(str);
        } catch(error) {
            console.log(error);
        }
        return str;
    }

    const urlEncode = (str: string) => {
        try{
            str = btoa(str);
        } catch(error) {
            console.log(error);
        }
        str = encodeURIComponent(str);
        return str;
    }

    const isSide = (full_path:string): boolean => {
        const text = full_path;
        let count = 0;
        const searchChar = '/';
        let pos = text.indexOf(searchChar);     
        while(pos !== -1) {
            count += 1;
            pos = text.indexOf(searchChar, pos+1);
        }
        return count === 1;
    }


    return (
        <div key={menuPath.initialId}>    
            <h3>메뉴 경로 설정</h3>
            <div className="w-bg-box">
                <div className="radio_area">
                    <span className="radio_wrap">
                        <label>
                            <input className="ml-5 mr-3" id="rdo_basic" type="radio"
                                checked={pathRadio === 'basic'} name='menu_path_grp'
                                onChange={ onRadioChangeHandler } />
                            기본 메뉴
                        </label>
                    </span>
                    <span className="radio_wrap">
                        <label>
                            <input className="ml-5 mr-3" id="rdo_external" type="radio"
                                checked={pathRadio === 'external'} name='menu_path_grp'
                                onChange={ onRadioChangeHandler } />
                            외부 사이트 연계 메뉴
                        </label>
                    </span>
                    { menuMode.substring(0,3) === 'Sml' &&(
                        <span className="radio_wrap">
                        <label>
                            <input className="ml-5 mr-3" id="rdo_side" type="radio" 
                                checked={pathRadio === 'side'} name='menu_path_grp'
                                onChange={ onRadioChangeHandler } />
                            서브메뉴 선택 시 사이드바 표출 메뉴
                        </label>
                    </span>
                    )}
                </div>
                <div className='content-box'>
                    { menuMode.substring(0,3) === 'Big' ? 
                        pathRadio === 'basic' && (
                            <input onChange={ onPathInputChange } className="ui_input w_full" id="big_basic" defaultValue={menuPath.basic[0]} />
                        ) || pathRadio === 'external' && (
                            <>
                                <input disabled className="ui_input half" value={menuPath.external[0]} />
                                <input onChange={onPathInputChange} className="ui_input half" id="big_external" defaultValue={menuPath.external[1]} />
                                <div className="ui_input w_full">{menuPath.external[2]}</div>
                            </>
                        ) 
                    :
                        pathRadio === 'basic' && (
                            <>
                                <input disabled className="ui_input half" defaultValue={menuPath.basic[0]} />
                                <input onChange={ onPathInputChange } className="ui_input half" id="sml_basic" defaultValue={menuPath.basic[1]} />
                            </>
                        ) || pathRadio === 'external' && (
                            <>
                                <input disabled className="ui_input half" id="sml_path_external_0" defaultValue={menuPath.external[0]} />
                                <input onChange={ onPathInputChange } className="ui_input half" id="sml_external" defaultValue={menuPath.external[1]} />
                                <div className="ui_input w_full" defaultValue={menuPath.external[2]} />
                            </>
                        ) || pathRadio === 'side' && (
                            <input disabled className="ui_input w_full" id="sml_side" defaultValue={menuPath.side[0]} />
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}