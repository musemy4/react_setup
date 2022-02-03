import {useState, useEffect, useRef} from 'react';
import { Tree } from "@minoru/react-dnd-treeview";
import { useDispatch, useSelector } from 'react-redux';
import { getMenuList, resetMenulist } from '../../../../store/menu/getMenuList';
import { IMenu, IMenuForDraw } from '../menu_interface';


// dispatch
import { setMode, defaultMode } from '../../../../store/menu/menuMode';
import { setMenu } from '../../../../store/menu/setMenu';


const initialMenu : IMenu = {
    admin_auth_enable: false,
    download_enable: false,
    gis_enable: false,
    icon: '',
    menu_code: 'root',
    menu_id: '',
    menu_name: '',
    menu_page: '',
    ordering: -1,
    p_menu_code: '',
}


export const MenuTree = () => {
    const [chosen, setChosen] = useState<IMenu | undefined>(undefined);
    const [openArr, setOpenArr] = useState<string[]>(['root']);
    const [treeDataForDraw, setTreeDataForDraw] = useState<IMenuForDraw[]>([{
        id: 'root',
        parent: 0,
        droppable: true,
        text: 'root',
    }]);

    const [treeData, setTreeData] = useState<IMenu[]>([initialMenu])

     // redux
    const menuList = useSelector((state: any) => state.getMenuList);
    const menuMode = useSelector((state: any) => state.menuMode.mode);
    const putMenu = useSelector((state: any) => state.putMenu);
    
    const dispatch = useDispatch();

    // about tree handle
    const handleDrop = () => { console.log('handle drop cancel');};
    
    
    
    //  USEEFFECT 
    //  ////////////////////////////////////////////////////////////
    // /////////////////////////////////////////////////////////////
    
    
    // 처음 시작될때
    useEffect(() => {
        if(menuList.code === 200) {
            init();
        } else {
            dispatch(getMenuList());
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
        } else if(menuList.code === 200) {
            init();
            dispatch(defaultMode());
        } else if(menuList.code === undefined) {
            dispatch(getMenuList());
        }
    }, [menuList.code])

    useEffect(() => {
        if(menuMode === 'reset') {
            initTreeForDraw();
            dispatch(defaultMode());
        }
    }, [menuMode])

    useEffect(() => {
        if(putMenu.mode.includes('success')) {
            dispatch(resetMenulist());
        }
    }, [putMenu])


    //  FUNCTION 
    //  ////////////////////////////////////////////////////////////
    // /////////////////////////////////////////////////////////////




    const setChosenMenu = (m: IMenu) => {
        dispatch(setMenu(m));
        setChosen(m);
    } 

    const initTreeForDraw = () => {
        setChosen(undefined);
        const refined = menuList.response.results.map((ele: IMenu) => ({
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

    const initTree = () => {
        const initialData = [{
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
        }];
        menuList.response.results.forEach((fetchMenu: IMenu)=> {
            initialData.push(fetchMenu);
        })

        setTreeData(initialData);
    }

    const init = () => {
        initTree();
        initTreeForDraw();
    }

    const openAll = () => {
        const parents: any[] = [];
        treeDataForDraw.forEach((ele) => {
            if(ele.parents !== 0 && !parents.includes(ele.parent)) {
                parents.push(ele.parent);
            }
        })
        setOpenArr(parents);
    }

    const closeAll = () => {
        setOpenArr([]);
    }

    const untitledTreeForAddMode = (mode: string, parent_id: string | number) => {
        const tmpTreeForDraw: IMenuForDraw[] = [];

        if (mode === 'Big') { // 대메뉴 추가
            tmpTreeForDraw.push(treeDataForDraw[0]);
            tmpTreeForDraw.push({
                id: '*untitled',
                parent: parent_id,
                droppable: false,
                text: '*untitled',
            });
            treeDataForDraw.forEach((ele, idx)=> {
                if(idx!==0)tmpTreeForDraw.push(ele);
            })  
        } else {
            treeDataForDraw.forEach((ele)=> {
                tmpTreeForDraw.push(ele);
            }) 
            treeData.forEach((ele)=> {
                if(parent_id === ele.menu_code) {
                    tmpTreeForDraw.push({
                        id: '*untitled',
                        parent: ele.menu_code,
                        droppable: false,
                        text: '*untitled',
                    })
                    const openArr = ['root'];
                    openArr.push(ele.menu_code);
                    setOpenArr(openArr);
                }
            });
        }
        setTreeDataForDraw(tmpTreeForDraw);
    }


    //  HANDLER 
    //  ////////////////////////////////////////////////////////////
    // /////////////////////////////////////////////////////////////



    const handleClickMenu = (menu_id: string | number) => {
        if(menu_id === 'root' || menu_id === "*untitled") return;
        initTreeForDraw();
        treeData.forEach((m: IMenu) => {
            if(m.menu_code === menu_id) {
                setChosenMenu(m);
                if(m.p_menu_code === 'root') {
                    dispatch(setMode('BigMod'))
                } else {
                    dispatch(setMode('SmlMod'))
                }
            }
        });
    }

    const handleAddMenu = (menu_id: string | number) => {
        if(menuMode.substring(3,6) === 'Add') return;
        treeData.forEach((m: any) => {
            if(m.menu_code === menu_id) {
                if(m.menu_code === 'root') { // 대메뉴
                    dispatch(setMode('BigAdd'));
                    untitledTreeForAddMode('Big', 'root');
                    setChosenMenu({
                        admin_auth_enable: false,
                        download_enable: false,
                        gis_enable: false,
                        icon: '',
                        menu_code: '',
                        menu_id: '',
                        menu_name: '',
                        menu_page: m.menu_page,
                        ordering: -1,
                        p_menu_code: 'root',
                    });
                } else { // 소메뉴
                    dispatch(setMode('SmlAdd'));
                    untitledTreeForAddMode('Sml', m.menu_code);
                    setChosenMenu({
                        admin_auth_enable: false,
                        download_enable: false,
                        gis_enable: false,
                        icon: '',
                        menu_code: '',
                        menu_id: '',
                        menu_name: '',
                        menu_page: m.menu_page,
                        ordering: -1,
                        p_menu_code: m.menu_code,
                    });
                }
            }
        });
    }

    return (
        <div className="menu-tree box" key={treeData.length}>
            <h2>메뉴 목록</h2>
                <div className='tree-btn'>
                    <button type="button" className='btn' onClick={() => openAll()}>openAll</button>
                    <button type="button" className='btn' onClick={() => closeAll()}>closeAll</button>
                </div>
            <div className="scroll-wrap" key={ treeDataForDraw.length+openArr.length}>
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

                            {node.id==='root' ? (
                                <button type="button"
                                    className="menu-root">
                                    {node.text}
                                </button>

                            ):(
                                <button type="button"
                                    className={node.id === "*untitled" || chosen?.menu_code === node.id? "menu-clicking clicked" : "menu-clicking" }
                                    onClick={() => handleClickMenu(node.id)}>
                                    {node.text}
                                </button>
                            )}    

                            {(node.parent === 0 || node.parent === 'root') && (node.id !== '*untitled') && (
                                <button type='button' onClick={() => handleAddMenu(node.id)}>
                                    <i className="fas fa-plus" />
                                </button>
                            )}        
                        </div>
                    )}
                    sort={false}
                    initialOpen={openArr}
                    onDrop={handleDrop}
                /> 
            </div>
        </div>
    )

}