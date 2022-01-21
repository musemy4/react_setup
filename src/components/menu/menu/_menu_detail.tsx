
import {useState, useEffect, useRef} from 'react';
import { IMenu } from './menu_interface';


export const MenuDetail = ({menuSelected}: any) => {
    const [menuObj, setMenuObj] =useState(menuSelected);

    // 처음 시작될때
    useEffect(() => {
        console.log('넘어온 menuSelected 바뀜');
        setMenuObj(menuSelected);
    }, [menuSelected])

    const isObjEmpty= (obj: any) => {
        return Object.keys(obj).length === 0;
    }

    const onInputChange=() => {
        console.log('oninput');
    }
    
    return (
        <div className="menu-detail box">
            <h2>메뉴 상세 정보</h2>
                {
                    !isObjEmpty(menuObj) ? (
                        <div className="menu-content-wrap" key={menuObj.menu_code}>
                            <h3>부모 메뉴</h3>
                            <div className="content-box">
                                <input className="ui_input w_full" defaultValue={ menuObj.p_menu_code } />
                            </div>

                            <h3>메뉴 이름</h3>
                            <div className="content-box">
                                <input onChange={ onInputChange } className="ui_input w_full" defaultValue={ menuObj.menu_name } />
                            </div>

                            <h3>메뉴 코드</h3>
                            <div className='content-box w_full'>
                                <input onChange={ onInputChange } className="ui_input half" defaultValue={ menuObj.menu_code } />
                                <input onChange={ onInputChange } className="ui_input half" defaultValue={ menuObj.menu_code } />
                            </div>

                            <h3>순서</h3>
                            <div className='content-box w_full'>
                                <input onChange={ onInputChange } className="ui_input w_full" defaultValue={ menuObj.ordering } />
                            </div>

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
                                <div className='menu_list'>
                                    <span className="menu_title">
                                        <span className="checkbox_wrap">
                                            <input className="form-check-input" type="checkbox"/>
                                            <label className="form-check-label">초기진입메뉴 1depth 여부</label>
                                        </span>
                                    </span>
                                </div>
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
                                </div>
                                <div className='content-box'>
                                    <input onChange={ onInputChange } className="ui_input half" defaultValue={ menuObj.menu_code } />
                                    <input onChange={ onInputChange } className="ui_input half" defaultValue={ menuObj.menu_code } />
                                    <input onChange={ onInputChange } className="ui_input w_full" defaultValue={ menuObj.menu_code } />
                                </div>
                            </div>






                            <div className="btn-container">
                                <div className="btn-right">
                                    <button type="button" className="btn">취소</button>
                                    <button type="button" className="btn solid danger">삭제</button>
                                    <button type="button" className="btn solid">추가</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            선택한 메뉴가 없습니다
                        </div>
                    )
                }
                
                                                
        </div>
    )

}