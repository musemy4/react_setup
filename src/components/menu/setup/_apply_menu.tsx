// React
import _ from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
// react-redux lib
import { useDispatch, useSelector } from 'react-redux';
// fetch
import { initTmpData, changeTmpData } from '../../../store/setup/tmpSetup';
// Interfaces
import { IMenu } from './setup_interface';

interface IProps {
    [index: string]: Array<IMenu>;
}

export const ApplyMenu = ({propsMenuInfo}: IProps) => {
    const [allChecked, setAllChecked] = useState(!propsMenuInfo.some((menuInfo: { setup_flag: any; }) => !menuInfo.setup_flag));
    const [stateMenuInfo, setStateMenuInfo] = useState<Array<IMenu> | undefined | null>(propsMenuInfo); // 초기화 작업

    // get
    const { menuInfo }: IProps = useSelector((state:any)=> state.tmpSetup.response); 
    // set 
    const dispatch = useDispatch();
    

    useEffect(() => {
        // _apply_menu start
        dispatch(initTmpData({data:propsMenuInfo, type:'MENU'}));
        // 컴포넌트가 꺼질때
        return () => {
            // _apply_menu end
        }
    }, []);


    const mounted = useRef(false);
    useEffect(() => {
        if(!mounted.current) {
            mounted.current = true;
        } else 
            // 초기화 되어 menuInfo가 []이 되었을때 부모에서 온 props를 다시 셋팅
            if(menuInfo && menuInfo.length === 0 || !menuInfo) {
                setStateMenuInfo(propsMenuInfo);
            }
        
    }, [menuInfo]);

    useEffect(()=> {
        if (menuInfo && menuInfo.length === 0) {
            // TODO: 여기가 왜 4번 불리냐
            setStateMenuInfo(propsMenuInfo);
        }
    }, [propsMenuInfo]);

    const onCheckboxAllChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const check = e.target.checked;

        const newStateMenuInfo = stateMenuInfo?.map((menuInfo: IMenu) => {
            return {
                area_flag: menuInfo.area_flag,
                menu_code: menuInfo.menu_code,
                menu_name: menuInfo.menu_name,
                ordering: menuInfo.ordering,
                p_menu_code: menuInfo.p_menu_code,
                setup_flag: check,
                children: menuInfo.children
            }
        });
        setAllChecked(e.target.checked);
        setStateMenuInfo(newStateMenuInfo);
        dispatch(changeTmpData({data:newStateMenuInfo, type:'MENU'}));
    }

    const onCheckboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target;
        const check = e.target.checked;
        // ** Cannot assign to read only property **
        const copyStateMenuInfo = JSON.parse(JSON.stringify(stateMenuInfo));

        const newStateMenuInfo = copyStateMenuInfo.map((menuGroup: IMenu) => {
            let copyMenuGroup = { ...menuGroup };
            if (menuGroup.menu_code === id) {
                copyMenuGroup = {
                    area_flag: menuGroup.area_flag,
                    menu_code: menuGroup.menu_code,
                    menu_name: menuGroup.menu_name,
                    ordering: menuGroup.ordering,
                    p_menu_code: menuGroup.p_menu_code,
                    setup_flag: check,
                    children: menuGroup.children
                };
                return copyMenuGroup;
            }

            const childrenIndex = _.findIndex(copyMenuGroup.children, [ 'menu_code', id ]);
            if (childrenIndex > -1) {
                const findMenu: IMenu = copyMenuGroup.children[childrenIndex];
                findMenu.setup_flag = check;
            }
            return menuGroup;
        });
        const isAllChecked = newStateMenuInfo.some((menuInfo: IMenu) => !menuInfo.setup_flag );
        setAllChecked(!isAllChecked);
        setStateMenuInfo(newStateMenuInfo);
        dispatch(changeTmpData({data:newStateMenuInfo, type:'MENU'}));
    }

    
    const onCheckboxAreaChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target;
        const check = e.target.checked;

        const newStateMenuInfo = stateMenuInfo?.map((menuGroup: IMenu) => {
            let copyMenuGroup = { ...menuGroup };
            if (menuGroup.menu_code === id) {
                copyMenuGroup = {
                    area_flag: check,
                    menu_code: menuGroup.menu_code,
                    menu_name: menuGroup.menu_name,
                    ordering: menuGroup.ordering,
                    p_menu_code: menuGroup.p_menu_code,
                    setup_flag:  menuGroup.setup_flag,
                    children: menuGroup.children
                };
                return copyMenuGroup;
            }
            return menuGroup;
        });
        setStateMenuInfo(newStateMenuInfo);
        dispatch(changeTmpData({data:newStateMenuInfo, type:'MENU'}));
    }

    return (
        <div className="apply-menu-content">
        <table className="tableArea" style={{ width: '100%', marginTop: '10px' }}>
             <colgroup>
                 <col style={{width: '40%'}} />
                 <col style={{width: '40%'}} />
                 <col style={{width: '20%'}} />
             </colgroup>
             <thead>
                 <tr>
                     <th>
                         <span className="checkbox_wrap">
                             <input onChange={ onCheckboxAllChangeHandler } className="form-check-input"  type="checkbox" id="allChecked" checked={ allChecked } value={ undefined } />
                             <label className="form-check-label" htmlFor="allChecked">메뉴</label>
                         </span>
                     </th>
                     <th>서브메뉴</th>
                     <th>지역코드</th>
                 </tr>
             </thead>
             { stateMenuInfo?.map((menuGroup: IMenu) => {
                 return <tbody key={menuGroup.menu_code}>{
                     menuGroup.children.length === 0
                     ? <tr key={menuGroup.menu_code}>
                           <td style={{ textAlign: "left", borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
                                 <span className="checkbox_wrap">
                                     <input onChange={ onCheckboxChangeHandler } className="form-check-input" type="checkbox" id={ menuGroup.menu_code } checked={ menuGroup.setup_flag } />
                                     <label className="form-check-label" htmlFor={ menuGroup.menu_code }>{ menuGroup.menu_name }</label>
                                 </span>
                             </td>
                             <td style={{ textAlign: "left", borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}/>
                             <td />
                       </tr>
                     : menuGroup.children.map((menu: IMenu, index: number) => {
                         return <tr key={menu.menu_code}>
                             {   // index 가 0 인 경우만
                                 index === 0 && 
                                     (
                                         <td rowSpan={menuGroup.children.length} style={{ textAlign: "left", borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
                                             <span className="checkbox_wrap">
                                                 <input onChange={ onCheckboxChangeHandler } className="form-check-input" type="checkbox" id={ menuGroup.menu_code } checked={ menuGroup.setup_flag } />
                                                 <label className="form-check-label" htmlFor={ menuGroup.menu_code }>{ menuGroup.menu_name }</label>
                                             </span>
                                         </td>
                                     )

                             }
                             <td style={{ textAlign: "left", borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
                                 <span className="checkbox_wrap">
                                     <input onChange={ onCheckboxChangeHandler } className="form-check-input" type="checkbox" id={ menu.menu_code } checked={ menu.setup_flag } />
                                     <label className="form-check-label" htmlFor={ menu.menu_code }>{ menu.menu_name }</label>
                                 </span>
                             </td>
                             {   // index 가 0 인 경우만
                                 index === 0 && 
                                     (
                                         <td rowSpan={menuGroup.children.length} style={{ textAlign: "center" }}>
                                             <span className="checkbox_wrap" style={{ display: "inline-block" }}>
                                                 <input onChange={ onCheckboxAreaChangeHandler } className="form-check-input" type="checkbox" id={ menuGroup.menu_code } checked={ menuGroup.area_flag } />
                                                 <label className="form-check-label" htmlFor={ menuGroup.menu_code }>{ }</label>
                                             </span>
                                         </td>
                                     )

                             }
                         </tr>
                     })
                 }</tbody>
             })}
        </table>
     </div>
    );
};