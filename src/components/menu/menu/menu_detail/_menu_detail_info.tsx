import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { IMenu } from '../menu_interface';
import { setMenuInfoPart } from '../../../../store/menu/putMenu';

export const MenuDetailInfo = () => {
    const [render, setRender] = useState<string>('');
    const [menuInfo, setMenuInfo] = useState<IMenu>({
            admin_auth_enable: false,
            download_enable: false,
            gis_enable: false,
            icon: '',
            menu_code: 'root',
            menu_id: '',
            menu_name: 'root',
            menu_page: '',
            ordering: -1,
            p_menu_code: '',
    });
    const dispatch = useDispatch();
    // redux
    const menuMode = useSelector((state: any) => state.menuMode.mode);
    const menu = useSelector((state: any) => state.menu);
    const putMenu = useSelector((state: any) => state.putMenu);
    

    //  USEEFFECT 
    //  ////////////////////////////////////////////////////////////
    // /////////////////////////////////////////////////////////////


    useEffect(() => {
        setMenuInfo(menu);
        setRender(getRefresh());
    }, [menu])
    
    useEffect(() => {
        if(putMenu.mode === 'beReady') {
            dispatch(setMenuInfoPart(menuInfo)); // mode: ready
        }
    }, [putMenu])



    //  HANDLER 
    //  ////////////////////////////////////////////////////////////
    // /////////////////////////////////////////////////////////////


    const onCheckboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target.id.substring(4);
        if(target === 'admin_auth_enable') {
            setMenuInfo({
                ...menuInfo,
                admin_auth_enable: !menuInfo.admin_auth_enable
            })
        } else if(target === 'download_enable') {
            setMenuInfo({
                ...menuInfo,
                download_enable: !menuInfo.download_enable
            })
        } else {
            setMenuInfo({
                ...menuInfo,
                gis_enable: !menuInfo.gis_enable
            })
        }
    }


    const onInputChange=(e: React.ChangeEvent<HTMLInputElement>) => {
        const {id} = e.target;
        if(id === 'menu_name') {
            setMenuInfo({
                ...menuInfo,
                menu_name: e.target.value
            })
        } else if (id === 'menu_code') {
            setMenuInfo({
                ...menuInfo,
                menu_code: e.target.value
            })
        }
    }

    const onFontInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMenuInfo({
            ...menuInfo,
            icon: e.target.value
        })
    }

    
    //  FUNCTION 
    //  ////////////////////////////////////////////////////////////
    // /////////////////////////////////////////////////////////////


    const getRefresh = () => {
        return String(new Date());
    }

    return (
        <div key={render}>
            <h3>부모 메뉴</h3>
            <div className="content-box">
                <input disabled className="ui_input w_full" id="p_menu_code" defaultValue={ menuInfo.p_menu_code } />
            </div>

            <h3 className='half'>메뉴 이름</h3>
            <h3 className='half'>메뉴 코드</h3>
            <div className='content-box w_full'>
                <input onChange={ onInputChange } className="ui_input half" id='menu_name' defaultValue={ menuInfo.menu_name } />
                <input onChange={ onInputChange } className="ui_input half" id='menu_code' defaultValue={ menuInfo.menu_code } />
            </div>


            { menuMode.substring(0,3) === 'Big' ? (
                <>
                    <h3 className='half'>순서</h3>
                    <div className='content-box w_full'>
                        <input disabled className="ui_input w_full" defaultValue={ menuInfo.ordering } />
                    </div>
                </>
                ):(
                    <>
                    <h3 className='half'>순서</h3>
                    <h3 className='half'>아이콘 (Font Awesome 5)</h3>
                    <div className='content-box w_full' style={{position: 'relative'}}>
                        <input disabled className="ui_input half" defaultValue={ menuInfo.ordering } />
                        
                        <input onChange={ onFontInputChange } className="ui_input forPreview mr-10" defaultValue={ menuInfo.icon } />
                        <span className='preview'>
                            <i className={menuInfo.icon}> </i>
                        </span>
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
                                onChange={(e) => onCheckboxHandler(e)} id="chk_admin_auth_enable" defaultChecked={menuInfo.admin_auth_enable} />
                            <label className="form-check-label">관리 권한 셋업 여부</label>
                        </span>
                    </span>
                </div>
                <div className='menu_list'>
                    <span className="menu_title">
                        <span className="checkbox_wrap">
                            <input className="form-check-input" type="checkbox"
                                onChange={(e) => onCheckboxHandler(e)} id="chk_download_enable" defaultChecked={menuInfo.download_enable} />
                            <label className="form-check-label">다운로드 권한 셋업 여부</label>
                        </span>
                    </span>
                </div>
                { menuMode.substring(0,3) === 'Big' &&(
                    <div className='menu_list'>
                        <span className="menu_title">
                            <span className="checkbox_wrap">
                                <input className="form-check-input" type="checkbox"
                                    onChange={(e) => onCheckboxHandler(e)} id="chk_gis_enable" defaultChecked={menuInfo.gis_enable} />
                                <label className="form-check-label">초기진입메뉴 1depth 여부</label>
                            </span>
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}