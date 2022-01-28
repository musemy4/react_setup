import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export const MenuDetailInfo = () => {
    const [chkSpecs, setChkSpecs]=useState<boolean[]>([false,false,false]);
    const [render, setRender] = useState<string>('');
    // redux
    const menuMode = useSelector((state: any) => state.menuMode.mode);
    const menu = useSelector((state: any) => state.menu);
    
    
    useEffect(() => {
        console.log(menu);
        let chklist = [];
        if(menu.menu_id !== '') {
            console.log('+++ 선택된 메뉴가 있음');
            chklist.push(!!menu.admin_auth_enable);
            chklist.push(!!menu.download_enable);
            chklist.push(!!menu.gis_enable);
        } else {
            chklist= [false, false, false];
        }
        setChkSpecs(chklist);
        setRender(getRefresh());
    }, [menu])
    
    const onCheckboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = Number(e.target.id[3]);
        const chklist = chkSpecs;
        chklist[id] = !chklist[id];
        setChkSpecs(chklist);
    }


    const onInputChange=(e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(e.target.id);
        console.log(e.target.value);
    }


    const getRefresh = () => {
        return String(new Date());
    }

    return (
        <div key={render}>
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
                        <input disabled className="ui_input w_full" defaultValue={ menu?.ordering } />
                    </div>
                </>
                ):(
                    <>
                    <h3 className='half'>아이콘 (Font Awesome 5)</h3>
                    <h3 className='half'>순서</h3>
                    <div className='content-box w_full'>
                        <input onChange={ onInputChange } className="ui_input half" defaultValue={ menu?.icon } />
                        <input disabled className="ui_input half" defaultValue={ menu?.ordering } />
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
        </div>
    )
}