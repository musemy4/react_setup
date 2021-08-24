// React
import _ from 'lodash';
import React from 'react';
// Interfaces
import { IMenu } from './setup_interface';

interface IProps {
    propsMenuInfo: Array<IMenu>;
    addData: (data: Array<IMenu>, type: string) => void;
}

interface IState {
    allChecked: boolean;
    stateMenuInfo: Array<IMenu>;
}

export class ApplyMenu extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { 
            allChecked: !props.propsMenuInfo.some(menuInfo => !menuInfo.setup_flag ),
            stateMenuInfo: props.propsMenuInfo
         };
        props.addData(props.propsMenuInfo, 'MENU')
    }

    onCheckboxAllChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const check = e.target.checked;
        const { stateMenuInfo } = this.state;

        const newStateMenuInfo = stateMenuInfo.map((menuInfo: IMenu) => {
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
        this.setState({ 
            allChecked: check,
            stateMenuInfo: newStateMenuInfo
        });
        const { addData } = this.props;
        addData(newStateMenuInfo, 'MENU');
    }

    onCheckboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target;
        const check = e.target.checked;
        const { stateMenuInfo } = this.state;

        const newStateMenuInfo = stateMenuInfo.map((menuGroup: IMenu) => {
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

        const isAllChecked = newStateMenuInfo.some(menuInfo => !menuInfo.setup_flag );
        this.setState({ 
            allChecked: !isAllChecked,
            stateMenuInfo: newStateMenuInfo 
        });
        const { addData } = this.props;
        addData(newStateMenuInfo, 'MENU');
    }

    onCheckboxAreaChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target;
        const check = e.target.checked;
        const { stateMenuInfo } = this.state;

        const newStateMenuInfo = stateMenuInfo.map((menuGroup: IMenu) => {
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
        this.setState({ stateMenuInfo: newStateMenuInfo });
        const { addData } = this.props;
        addData(newStateMenuInfo, 'MENU');
    }

    render() {
        const { allChecked } = this.state;
        const { stateMenuInfo } = this.state;
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
                                    <input onChange={ this.onCheckboxAllChangeHandler } className="form-check-input"  type="checkbox" id="allChecked" checked={ allChecked } value={ undefined } />
                                    <label className="form-check-label" htmlFor="allChecked">메뉴</label>
                                </span>
                            </th>
                            <th>서브메뉴</th>
                            <th>지역코드</th>
                        </tr>
                    </thead>
                    { stateMenuInfo.map((menuGroup: IMenu) => {
                        return <tbody key={menuGroup.menu_code}>{
                            menuGroup.children.length === 0
                            ? <tr key={menuGroup.menu_code}>
                                  <td style={{ textAlign: "left", borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
                                        <span className="checkbox_wrap">
                                            <input onChange={ this.onCheckboxChangeHandler } className="form-check-input" type="checkbox" id={ menuGroup.menu_code } checked={ menuGroup.setup_flag } />
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
                                                        <input onChange={ this.onCheckboxChangeHandler } className="form-check-input" type="checkbox" id={ menuGroup.menu_code } checked={ menuGroup.setup_flag } />
                                                        <label className="form-check-label" htmlFor={ menuGroup.menu_code }>{ menuGroup.menu_name }</label>
                                                    </span>
                                                </td>
                                            )
    
                                    }
                                    <td style={{ textAlign: "left", borderRight: '1px solid rgba(255, 255, 255, 0.15)' }}>
                                        <span className="checkbox_wrap">
                                            <input onChange={ this.onCheckboxChangeHandler } className="form-check-input" type="checkbox" id={ menu.menu_code } checked={ menu.setup_flag } />
                                            <label className="form-check-label" htmlFor={ menu.menu_code }>{ menu.menu_name }</label>
                                        </span>
                                    </td>
                                    {   // index 가 0 인 경우만
                                        index === 0 && 
                                            (
                                                <td rowSpan={menuGroup.children.length} style={{ textAlign: "center" }}>
                                                    <span className="checkbox_wrap" style={{ display: "inline-block" }}>
                                                        <input onChange={ this.onCheckboxAreaChangeHandler } className="form-check-input" type="checkbox" id={ menuGroup.menu_code } checked={ menuGroup.area_flag } />
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
    }
}