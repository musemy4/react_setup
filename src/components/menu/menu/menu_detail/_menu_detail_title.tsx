import { useSelector } from 'react-redux';

export const MenuDetailTitle = () => {
    // redux
    const menuMode = useSelector((state: any) => state.menuMode.mode);
    const menu = useSelector((state: any) => state.menu);

    return (
        <div key={menu.menu_id}>
            { menuMode.substring(3, 6) === 'Add' ? (
                <h2>메뉴 추가</h2>
            ): (
                <h2>메뉴 상세</h2>
            )}
        </div>
    )
}