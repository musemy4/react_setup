
import {useState, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMenu } from './menu_interface';


export const MenuDetail = ({menuSelected}: any) => {
       // 처음 시작될때
       useEffect(() => {
        console.log('start MenuDetail');
        console.log(menuSelected);
        // 컴포넌트가 꺼질때
        return () => {
            console.log('MenuDetail end');
        }
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
                    !isObjEmpty(menuSelected) ? (
                        <div className="row h-95">
                            <h3>부모 메뉴</h3>
                            <input className="input_t1 w_full" defaultValue={ menuSelected.p_menu_code } />

                            <h3>메뉴 이름</h3>
                            <input onChange={ onInputChange } className="input_t1" defaultValue={ menuSelected.menu_name } />

                            <h3>메뉴 코드</h3>
                            <input onChange={ onInputChange } className="input_t1" defaultValue={ menuSelected.menu_code } />

                            <h3>순서</h3>
                            <input onChange={ onInputChange } className="input_t1 w_full" defaultValue={ menuSelected.ordering } />
                            
                            <h3>메뉴 특수 기능 사용 여부</h3>
                            
                            <h3>메뉴 경로 설정</h3>
                            
                            <div className="bottom h-5">
                                <div className='btn-left'>
                                    dd
                                </div>
                                <div className="btn-right">
                                    <button type="button" className="btn btn-primary btn-sm mr-10">취소</button>
                                    <button type="button" className="btn btn-primary btn-sm mr-10">추가</button>
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