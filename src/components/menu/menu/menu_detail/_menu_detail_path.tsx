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

    //  USEEFFECT 
    //  ////////////////////////////////////////////////////////////
    // /////////////////////////////////////////////////////////////

    useEffect(() => {
        if(menu.menu_id !== '' && menuMode !== 'default') {
            console.log('initPathForm:::', menu);
            initPathForm();
        }
        setPathRadio('basic');
        console.log(menu);
    }, [menu])


    //  FUNCTION 
    //  ////////////////////////////////////////////////////////////
    // /////////////////////////////////////////////////////////////



    const getRefresh = () => {
        return String(new Date());
    }

    const initPathForm = () => {
        const path_full = menu.menu_page;
        let basic: string[] = [];
        let external: string[] = [];
        let side: string[] = ['/'];
        let mode: 'basic' | 'external' | 'side' = 'basic';
        const initialId = getRefresh();

        if(menuMode.substring(0,3) === 'Big') { // 대메뉴시에
            if(path_full.includes("/external-page/")) { // 외부페이지인 경우
                console.log('1');
                let afterExt = path_full.substr(15);
                afterExt = urlDecode(afterExt);
                
                mode = 'external';
                basic = ['/', '/'];
                external = ['/external-page/', afterExt, path_full];
            } else {
                console.log('2');
                mode = 'basic';
                basic= [path_full, ''];
                external = ['/external-page/', '', '/external-page/']
            }
        } else if(menuMode.substring(0,3) === 'Sml') { // 소메뉴시
            // external
            if(path_full.includes("/external-sub-page/")) {
                console.log('3');
                const pathArr = path_full.split('/external-sub-page/');
                mode = 'external';
                
                basic= [pathArr[0], '']
                external = [`${pathArr[0]}/external-sub-page/`, urlDecode(pathArr[1]), path_full];
                side = [pathArr[0]];
                // side                    
            } else if(isSide(path_full)) {
                console.log('4');
                mode = 'side';
                
                basic = [path_full, ''];
                external = [`${path_full}/external-sub-page/`,'',`${path_full}/external-sub-page/`]
                side=[path_full];
            // basic    
            } else {
                console.log('5');
                const splitArr = path_full.split('/');
                mode = 'basic';
                
                basic = [`/${splitArr[1]}`, `/${splitArr[2]}`]
                external = [`/${splitArr[1]}/external-sub-page/`,'',`/${splitArr[1]}/external-sub-page/`]
                side=[`/${splitArr[1]}`];
            }
        }

        setPathRadio(mode);
        setMenuPath({
            ...menuPath,
            mode,
            initialId,
            basic,
            external,
            side,
        });
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


    //  HANDLER 
    //  ////////////////////////////////////////////////////////////
    // /////////////////////////////////////////////////////////////

    const onPathInputChange=(e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.id.includes('external')) {
            const extArr = menuPath.external;
            extArr[1] = e.target.value;
            extArr[2] = extArr[0] + urlEncode(extArr[1]);
            setMenuPath({
                ...menuPath,
                mode: 'external',
                basic: ['',''],
                external: menuPath.external,
                side: ['']    
            });
        }
    }


    const onRadioChangeHandler = (mode: 'basic' | 'external' | 'side') => {
        setPathRadio(mode);
    }

    


    return (
        <div key={menuPath.initialId+pathRadio}>    
            <h3>메뉴 경로 설정</h3>
            <div className="w-bg-box">
                <div className="radio_area">
                    <span className="radio_wrap">
                        <label>
                            <input className="ml-5 mr-3" id="rdo_basic" type="radio"
                                checked={pathRadio === 'basic'} name='menu_path_grp'
                                onChange={()=> onRadioChangeHandler('basic') } />
                            기본 메뉴
                        </label>
                    </span>
                    <span className="radio_wrap">
                        <label>
                            <input className="ml-5 mr-3" id="rdo_external" type="radio"
                                checked={pathRadio === 'external'} name='menu_path_grp'
                                onChange={ () => onRadioChangeHandler('external')} />
                            외부 사이트 연계 메뉴
                        </label>
                    </span>
                    { menuMode.substring(0,3) === 'Sml' &&(
                        <span className="radio_wrap">
                        <label>
                            <input className="ml-5 mr-3" id="rdo_side" type="radio" 
                                checked={pathRadio === 'side'} name='menu_path_grp'
                                onChange={ () => onRadioChangeHandler('side') } />
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
                                <input disabled className="ui_input half" defaultValue={menuPath.external[0]} />
                                <input onChange={onPathInputChange} className="ui_input half" id="big_external" defaultValue={menuPath.external[1]} />
                                <div className="ui_input w_full">{menuPath.external[2]}</div>
                            </>
                        ) 
                    :
                        pathRadio === 'basic' && (
                            <>
                                <div className="ui_input half">{menuPath.basic[0]}</div>
                                <input onChange={ onPathInputChange } className="ui_input half" id="sml_basic" defaultValue={menuPath.basic[1]} />
                            </>
                        ) || pathRadio === 'external' && (
                            <>
                                <input disabled className="ui_input half" id="sml_path_external_0" defaultValue={menuPath.external[0]} />
                                <input onChange={ onPathInputChange } className="ui_input half" id="sml_external" defaultValue={menuPath.external[1]} />
                                <div className="ui_input w_full">{menuPath.external[2]}</div>
                            </>
                        ) || pathRadio === 'side' && (
                            <div className="ui_input w_full">{menuPath.side[0]}</div>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}