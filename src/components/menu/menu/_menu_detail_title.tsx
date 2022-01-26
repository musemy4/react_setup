import { useSelector } from 'react-redux';

export const MenuDetailTitle = () => {
    // redux
    const menuMode = useSelector((state: any) => state.menuMode.mode);
   
    return (
            menuMode === '' ? (
                <h2>메뉴 추가</h2>
            ): (
                <h2>메뉴 상세</h2>
            )
    )
}