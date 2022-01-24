import React, {useState, useEffect, useRef} from 'react';
import { Tree, useDragOver } from "@minoru/react-dnd-treeview";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuList } from '../../../store/menu/getMenuList';
import { IMenu, IRefMenu } from './menu_interface';


export const MenuTree = ({menuClicked, getMode}: any) => {

    const [mode, setMode] = useState<'default'|'BigAdd'|'SmlAdd'|'BigMod'|'SmlMod'>();
    const [selected, setSelected] = useState('');
    const [treeData, setTreeData] = useState([{
        id: 'root',
        parent: 0,
        droppable: false,
        text: 'root',
    }]);

    const menuList = useSelector((state: any) => state.menuList);

    const dispatch = useDispatch();

    const handleDrop = (newTreeData: any) => setTreeData(newTreeData);


  



    // 처음 시작될때
    useEffect(() => {
        console.log('start menuTree');
        dispatch(fetchMenuList());
        // 컴포넌트가 꺼질때
        return () => {
            console.log('menuTree end');
        }
    }, [])

    const mounted = useRef(false);
    useEffect(() => {
        if(!mounted.current) {
            mounted.current = true;
        } else if(menuList.code === 200) {
            console.log(menuList.response.results);
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

            setTreeData(defaultTreeData);
            console.log(defaultTreeData);
        }
    }, [menuList.code])

    useEffect(() => {
        console.log('selected changed');
       console.log(selected);
    }, [selected])

    const handleClickMenu = (menu: string) => {
        // e.preventDefault();
        const menus = menuList.response.results;
        menus.forEach((m: IMenu) => {
            if(m.menu_name === menu) {
                menuClicked(m);
                setSelected(m.menu_name);
                if(m.parent === 0) {
                    setMode('BigMod');
                    getMode('BigMod');
                } else {
                    setMode('SmlMod');
                    getMode('SmlMod');
                }
            }
        });
        console.log(selected);
    }

    const handleAddMenu = (ele: any) => {
        console.log('handleAddMenu!');
        console.log(ele);
        menuClicked(ele);
        if(ele.parent === 0) {
            getMode('BigAdd');
        } else {
            getMode('SmlAdd');
        }
    }

    const refresh = String(new Date());
   
    return (
        <div className="menu-tree box">
            <h2>메뉴 목록</h2>
            <div className="scroll-wrap" key={ refresh }>
                <Tree
                    tree={treeData}
                    rootId= {0}
                    render={(node, { depth, isOpen = true, onToggle, hasChild }) => (
                    <div style={{ marginInlineStart: depth * 10 }}>
                        {/* > 혹은 v 표시 */}
                        { hasChild && (
                            <button type="button" className="can-open" onClick={onToggle}>{isOpen  ? <i className="fas fa-angle-right" /> : <i className="fas fa-angle-down" />}</button>
                        )}

                        {/* 소메뉴  */}
                        {!hasChild && node.parent==='root' &&  (
                            <span className="can-open"> </span>
                        )}
                        
                        {node.parent!=='root' && node.parent !== 0 && (
                            <span className="can-open sub-menu"> </span>
                        )}
                        <button type="button" className={selected === node.text? "menu-clicking clicked":"menu-clicking"} onClick={() => handleClickMenu(node.text)}>{node.text}</button>
                        
                        {/*  + 버튼 */}
                        {hasChild && (
                            <button type='button' onClick={()=>handleAddMenu(node)}>
                                <i className="fas fa-plus"/>
                            </button>
                        )}
                    </div>
                    )}
                    dragPreviewRender = {(monitorProps) => (
                        <div>{monitorProps.item.text}</div>
                    )}
                    onDrop={handleDrop}
                    initialOpen
                />
            </div>
            {mode}
        </div>
    )

}