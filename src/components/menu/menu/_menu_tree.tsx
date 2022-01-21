import {useState, useEffect, useRef} from 'react';
import { Tree, useDragOver } from "@minoru/react-dnd-treeview";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuList } from '../../../store/menu/getMenuList';
import { IMenu, IRefMenu } from './menu_interface';


export const MenuTree = ({menuClicked}: any) => {
    const [hover, setHover] = useState<boolean>(false);
    const [treeData, setTreeData] = useState([{
        id: 'root',
        parent: 0,
        droppable: false,
        text: 'root',
    }]);

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
            console.log(menuList.response.results);
            const refined = menuList.response.results.map((ele: IMenu) => ({
                id: ele.menu_code,
                parent: ele.p_menu_code,
                droppable: ele.p_menu_code === 'root',
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


    return (
        <div className="menu-tree box">
            <h2>메뉴 목록</h2>
            <div className="scroll-wrap" key={treeData.length}>
                <Tree
                    tree={treeData}
                    rootId= {0}
                    render={(node, { depth, isOpen, onToggle, hasChild }) => (
                    <div style={{ marginInlineStart: depth * 10 }}>
                        {hasChild && (
                            <button type="button" className="can-open" onClick={onToggle}>{isOpen  ? "▶" : "▼"}</button>
                        )}
                        {!hasChild && node.parent==='root' &&  (
                            <span className="can-open"> </span>
                        )}
                        {node.parent!=='root' && node.parent !== 0 && (
                            <span className="can-open sub-menu"> </span>
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