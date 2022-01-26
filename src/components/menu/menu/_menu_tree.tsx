import React, {useState, useEffect, useRef} from 'react';
import { Tree, NodeModel, OpenHandler, TreeMethods } from "@minoru/react-dnd-treeview";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuList } from '../../../store/menu/getMenuList';
import { IMenu, IMenuForDraw } from './menu_interface';


// dispatch
import { setMode } from '../../../store/menu/menuMode';
import { setMenu } from '../../../store/menu/setMenu';

export const MenuTree = () => {
    const [treeDataForDraw, setTreeDataForDraw] = useState<IMenuForDraw[]>([{
        id: 'root',
        parent: 0,
        droppable: true,
        text: 'root',
    }]);

    const [treeData, setTreeData] = useState<IMenu[]>([{
        admin_auth_enable: false,
        area_flag: false,
        download_enable: false,
        gis_enable: false,
        icon: '',
        menu_code: 'root',
        menu_id: '',
        menu_name: '',
        menu_page: '',
        ordering: -1,
        p_menu_code: '',
        reg_date: '',
        setup_flag: false,
        upd_date: ''
    }])

     // redux
    const fetchMenus = useSelector((state: any) => state.fetchMenuList);
    const menuMode = useSelector((state: any) => state.menuMode.mode);
    const menu = useSelector((state: IMenu) => state.menu);

    const dispatch = useDispatch();

    // about tree handle
    const handleDrop = () => { console.log('이동못하게 막음');};
    const ref = useRef<TreeMethods>(null);
    const handleOpenAll = () => {
        console.log('handleOpenAll!');
        console.log(ref);
        ref.current?.open('root');
    }
    // 처음 시작될때
    useEffect(() => {
        console.log('start menuTree');
        if(fetchMenus.code === 200) {
            initialSetting();
        } else {
            dispatch(fetchMenuList());
        }
        // 컴포넌트가 꺼질때
        return () => {
            console.log('menuTree end');
        }
    }, [])

    // 한번만 울린다(**INITIAL SETTING)
    const mounted = useRef(false);
    useEffect(() => {
        if(!mounted.current) {
            mounted.current = true;
        } else if(fetchMenus.code === 200) {
            initialSetting();
        }
    }, [fetchMenus.code])

    useEffect(() => {
        console.log('=== 메뉴 선택 변경! ===');
        console.log(menu);
    }, [menu])

    useEffect(() => {
        console.log('=== 메뉴 모드 변경! ===');
        console.log(menuMode);
        handleOpenAll();
    }, [menuMode])

    const initialSetting = () => {
        const initialData = [{
            admin_auth_enable: false,
            area_flag: false,
            download_enable: false,
            gis_enable: false,
            icon: '',
            menu_code: 'root',
            menu_id: '',
            menu_name: 'root',
            menu_page: '',
            ordering: -1,
            p_menu_code: '',
            reg_date: '',
            setup_flag: false,
            upd_date: ''
        }];
        fetchMenus.response.results.forEach((fetchMenu: IMenu)=> {
            initialData.push(fetchMenu);
        })

        setTreeData(initialData);
        //
        const refined = fetchMenus.response.results.map((ele: IMenu) => ({
            id: ele.menu_code,
            parent: ele.p_menu_code,
            droppable: false, // TMP
            text: ele.menu_name,
        }));
        const defaultTreeData = [{
            id: 'root',
            parent: 0,
            droppable: false,
            text: 'root',
        }];
        
        refined.forEach((ele: any) => {
            defaultTreeData.push(ele);
        });

        setTreeDataForDraw(defaultTreeData);
    }


    const untitledTreeForAddMode = (mode: string, parent: string) => {
        console.log(treeDataForDraw);
        const tmpTree: IMenuForDraw[] = [];
        if (mode === 'Big') {
            tmpTree.push(treeDataForDraw[0]);
            tmpTree.push({
                id: 'untitled',
                parent,
                droppable: false,
                text: 'untitled',
            })    
        } else {
            tmpTree.push(treeDataForDraw[0]);
            tmpTree.push({
                id: 'root',
                parent,
                droppable: false,
                text: 'root',
            }) 
        }
        console.log(tmpTree);
        setTreeDataForDraw(tmpTree);
    }

    const handleClickMenu = (menu_name: string) => {
        if(menu_name === 'root') return
        console.log('=== handleClickMenu! ===');
        console.log(treeData);
        console.log(menu_name);
        treeData.forEach((m: IMenu) => {
            if(m.menu_name === menu_name) {
                console.log(m);
                dispatch(setMenu(m));
                if(m.p_menu_code === 'root') {
                    dispatch(setMode('BigMod'))
                } else {
                    dispatch(setMode('SmlMod'))
                }
            }
        });
    }

    const handleAddMenu = (menu_name: string) => {
        console.log('=== handleAddMenu! ===');
        console.log(menu_name);
        console.log(treeData);
        treeData.forEach((m: any) => {
            if(m.menu_name === menu_name) {
                console.log(m);
                if(m.menu_code === 'root') { // 대메뉴
                    dispatch(setMenu({
                        admin_auth_enable: false,
                        area_flag: false,
                        download_enable: false,
                        gis_enable: false,
                        icon: '',
                        menu_code: '',
                        menu_id: '',
                        menu_name: '',
                        menu_page: m.menu_page,
                        ordering: -1,
                        p_menu_code: 'root',
                        reg_date: '',
                        setup_flag: false,
                        upd_date: ''
                    }));
                    dispatch(setMode('BigAdd'));
                    untitledTreeForAddMode('Big','root');
                } else { // 소메뉴
                    dispatch(setMenu({
                        admin_auth_enable: false,
                        area_flag: false,
                        download_enable: false,
                        gis_enable: false,
                        icon: '',
                        menu_code: '',
                        menu_id: '',
                        menu_name: '',
                        menu_page: m.menu_page,
                        ordering: 0,
                        p_menu_code: m.menu_name,
                        reg_date: '',
                        setup_flag: false,
                        upd_date: ''
                    }));
                    dispatch(setMode('SmlAdd'));
                    untitledTreeForAddMode('Sml', m.menu_name);
                }
            }
        });
    }

          
    return (
        <div className="menu-tree box">
            <h2>메뉴 목록</h2>
            <div className="scroll-wrap" key={ treeDataForDraw.length }>
                <Tree
                    tree={treeDataForDraw}
                    rootId= {0}
                    render={(node, { depth, isOpen, onToggle, hasChild }) => (
                        <div style={{ marginInlineStart: depth * 10 }}>
                            {hasChild && (
                                <button type="button" className="can-open" onClick={onToggle}>
                                    {isOpen? <i className="fas fa-angle-right" /> : <i className="fas fa-angle-down" />}
                                </button>
                            )}
                            {!hasChild && node.parent === 'root' && (
                                <span className="can-open"> </span>        
                            )}
                            {node.parent !== 'root' && node.parent !== 0 && (
                                <span className="can-open sub-menu">-</span>        
                            )}
                            <button type="button" className="menu-clicking"
                                onClick={() => handleClickMenu(node.text)}>
                                {node.text}
                            </button>
                            {(node.parent === 0 || node.parent === 'root') && (node.id !== 'untitled') && (
                                <button type='button' onClick={() => handleAddMenu(node.text)}>
                                    <i className="fas fa-plus" />
                                </button>
                            )}        
                        </div>
                    )}
                    initialOpen={['root']}
                    onDrop={handleDrop}
                /> 
            </div>
        </div>
    )

}