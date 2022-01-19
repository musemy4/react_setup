import React, {useState, useEffect, useRef} from 'react';
import { Tree } from "@minoru/react-dnd-treeview";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuList } from '../../../store/menu/getMenuList';

export const MenuTree = () => {
    const [treeData, setTreeData] = useState( [
        {
            "id": 1,
            "parent": 0,
            "droppable": true,
            "text": "Folder 1"
        },
        {
            "id": 2,
            "parent": 1,
            "text": "File 1-1"
        },
        {
            "id": 3,
            "parent": 1,
            "text": "File 1-2"
        },
        {
            "id": 4,
            "parent": 0,
            "droppable": true,
            "text": "Folder 2"
        },
        {
            "id": 5,
            "parent": 4,
            "droppable": true,
            "text": "Folder 2-1"
        },
        {
            "id": 6,
            "parent": 5,
            "text": "File 2-1-1"
        }
    ]);

    const menuList = useSelector((state: any) => state.menuList);

    const dispatch = useDispatch();

    const handleDrop = (newTreeData: any) => setTreeData(newTreeData);

    // 처음 시작될때
    useEffect(() => {
        console.log('start menuTree');
        dispatch(fetchMenuList());
        console.log(menuList);
        // 컴포넌트가 꺼질때
        return () => {
            console.log('menuTree end');
        }
    }, [])

    const mounted = useRef(false);
    useEffect(() => {
        if(!mounted.current) {
            mounted.current = true;
        } else{
            console.log(menuList);
        }
    }, [menuList.code])


    return (
        <div className="apply-menu box">
            <h2>메뉴 목록</h2>
            <Tree
                tree={treeData}
                rootId={0}
                render={(node, { depth, isOpen, onToggle }) => (
                <div style={{ marginInlineStart: depth * 10 }}>
                    {node.droppable && (
                    <button type="button" onClick={onToggle}>{isOpen ? "[-]" : "[+]"}</button>
                    )}
                    {node.text}
                </div>
                )}
                dragPreviewRender={(monitorProps) => (
                <div>{monitorProps.item.text}</div>
                )}
                onDrop={handleDrop}
            />
        </div>
    )

}