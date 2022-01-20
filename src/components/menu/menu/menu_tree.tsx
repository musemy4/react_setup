import {useState, useEffect, useRef} from 'react';
import { Tree } from "@minoru/react-dnd-treeview";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuList } from '../../../store/menu/getMenuList';
import { IMenu } from './menu_interface';

export const MenuTree = ({menuClicked}: any) => {
    const [treeData, setTreeData] = useState([]);

    const menuList = useSelector((state: any) => state.menuList);

    const dispatch = useDispatch();

    const handleDrop = (newTreeData: any) => setTreeData(newTreeData);


    const handleClickMenu = (menu: string) => {
        // e.preventDefault();
        const menus = menuList.response.results;
        menus.forEach((m: IMenu) => {
            if(m.menu_name === menu) {
                menuClicked(m);
            }
        });
    }



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
            const refined = menuList.response.results.map((ele: IMenu, idx: number) => ({
                id: ele.menu_code,
                parent: ele.p_menu_code,
                droppable: ele.p_menu_code === 'root',
                text: ele.menu_name,
            }));
            setTreeData(refined);
        }
    }, [menuList.code])


    return (
        <div className="apply-menu box">
            <h2>메뉴 목록</h2>
            <div className="scroll-wrap">
                <Tree
                    tree={treeData}
                    rootId='root'
                    render={(node, { depth, isOpen, onToggle, hasChild }) => (
                    <div style={{ marginInlineStart: depth * 10 }}>
                        {hasChild && node.parent==='root' && (
                            <button type="button" className="can-open" onClick={onToggle}>{isOpen  ? "▶" : "▼"}</button>
                        )}
                        {!hasChild && node.parent==='root' && (
                            <span className="can-open"> </span>
                        )}
                        {node.parent!=='root' && (
                            <span className="can-open sub-menu">┗</span>
                        )}
                        <button type="button" className="menu-clicking" onClick={() => handleClickMenu(node.text)}>{node.text}</button>
                    </div>
                    )}
                    dragPreviewRender = {(monitorProps) => (
                        <div>{monitorProps.item.text}</div>
                    )}
                    onDrop={handleDrop}
                />
            </div>
        </div>
    )

}