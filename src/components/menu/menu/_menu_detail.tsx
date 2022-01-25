
import {useState, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const MenuDetail = () => {



    // redux
    const menuMode = useSelector((state: any) => state.menuMode.mode);
    const menu = useSelector((state: any) => state.menu);

    const dispatch = useDispatch();

    // 처음 시작될때
    useEffect(() => {
        console.log(menuMode);
    }, [])

    useEffect(() => {
        console.log('+++ 메뉴 변경 감지!+++');
        console.log(menu);
    }, [menu])

    useEffect(() => {
        console.log('+++ 메뉴 모드 감지!+++');
        console.log(menuMode);
    }, [menuMode])

    
    const onInputChange=() => {
        console.log('oninput');
    }
    
    return (
        <>
            <div className="menu-detail box">

                { menuMode === 'default' ? (
                            <div>
                                <div className="alert-msg">
                                    <i className="far fa-folder" />
                                    <span>선택한 메뉴가 없습니다</span>
                                </div>
                            </div>
                    ): (() => {

                        if(menuMode.substring(3,6) === 'Add') return (<h2>메뉴 추가</h2>);
                        return (<h2>메뉴 상세</h2>);

                    })()
                } 
                    

                <div className="menu-content-wrap">
                        <h3>부모 메뉴</h3>
                        <div className="content-box">
                            <input disabled className="ui_input w_full" defaultValue={ menu?.p_menu_code } />
                        </div>
                        <h3 className='half'>메뉴 이름</h3>
                        <h3 className='half'>메뉴 코드</h3>
                        <div className='content-box w_full'>
                            <input onChange={ onInputChange } className="ui_input half" defaultValue={ menu?.menu_name } />
                            <input onChange={ onInputChange } className="ui_input half" defaultValue={ menu?.menu_name } />
                        </div>


                        { menuMode.substring(0,3) === 'Big' ? (
                            <>
                                <h3 className='half'>순서</h3>
                                <div className='content-box w_full'>
                                    <input onChange={ onInputChange } className="ui_input w_full" defaultValue={ menu?.ordering } />
                                </div>
                            </>
                            ):(
                                <>
                                <h3 className='half'>아이콘 (Font Awesome 5)</h3>
                                <h3 className='half'>순서</h3>
                                <div className='content-box w_full'>
                                    <input onChange={ onInputChange } className="ui_input half" defaultValue={ menu?.icon } />
                                    <input onChange={ onInputChange } className="ui_input half" defaultValue={ menu?.ordering } />
                                </div>
                            </> 
                            )
                        }

                        <h3>메뉴 특수 기능 사용 여부</h3>
                        <div className="w-bg-box content-box">
                            <div className='menu_list'>
                                <span className="menu_title">
                                    <span className="checkbox_wrap">
                                        <input className="form-check-input" type="checkbox"/>
                                        <label className="form-check-label">관리 권한 셋업 여부</label>
                                    </span>
                                </span>
                            </div>
                            <div className='menu_list'>
                                <span className="menu_title">
                                    <span className="checkbox_wrap">
                                        <input className="form-check-input" type="checkbox"/>
                                        <label className="form-check-label">다운로드 권한 셋업 여부</label>
                                    </span>
                                </span>
                            </div>
                            { menuMode.substring(0,3) === 'Big' &&(
                                <div className='menu_list'>
                                    <span className="menu_title">
                                        <span className="checkbox_wrap">
                                            <input className="form-check-input" type="checkbox"/>
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
                                        <input className="ml-5 mr-3" value="true" type="radio" />
                                        기본 메뉴
                                    </label>
                                </span>
                                <span className="radio_wrap">
                                    <label>
                                        <input className="ml-5 mr-3" value="false" type="radio" />
                                        외부 사이트 연계 메뉴
                                    </label>
                                </span>
                                { menuMode.substring(0,3) === 'Sml' &&(
                                    <span className="radio_wrap">
                                    <label>
                                        <input className="ml-5 mr-3" value="false" type="radio" />
                                        서브메뉴 선택 시 사이드바 표출 메뉴
                                    </label>
                                </span>
                                )}
                            </div>
                            <div className='content-box'>
                                <input onChange={ onInputChange } className="ui_input half" defaultValue={ menu?.menu_code } />
                                <input onChange={ onInputChange } className="ui_input half" defaultValue={ menu?.menu_code } />
                                <input onChange={ onInputChange } className="ui_input w_full" defaultValue={ menu?.menu_code } />
                            </div>
                        </div>
                
            
                    <div className="btn-container">
                        <div className="btn-right">
                            <button type="button" className="btn">취소</button>
    
                            {
                                menuMode.substring(3) === 'Mod' ? (
                                <>
                                    <button type="button" className="btn solid danger">삭제</button>
                                    <button type="button" className="btn solid">수정</button>
                                </>
                                ) : (<button type="button" className="btn solid">추가</button>)
                            }
                        </div>
                    </div>
                
                </div>
            </div>
            </>
    )
}