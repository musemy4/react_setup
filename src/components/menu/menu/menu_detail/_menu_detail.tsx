
// redux
import { useSelector } from 'react-redux';

// component
import { MenuDetailEmpty } from './_menu_detail_empty';
import { MenuDetailTitle } from './_menu_detail_title';
import { MenuDetailInfo } from './_menu_detail_info';
import { MenuDetailPath } from './_menu_detail_path';
import { MenuDetailBtnArea } from './_menu_detail_btn_area';


export const MenuDetail = () => {
    // redux
    const menuMode = useSelector((state: any) => state.menuMode.mode);


    // const eliminateExp = (str: string): string => {
    //     if(str.includes("%3D")) {
    //         str = str.replace(/%3D/g, '');
    //         console.log(str);
    //     } 
    //     return str;
    // }  

    // const decode = (str: string) => {
    //     console.log('str:: ', str);
    //     str = eliminateExp(str);
    //     console.log('result:', str)
    //     const decode = window.atob(str);
    //     console.log(decode);
    //     const result = decodeURIComponent(decode);
    //     console.log(result);
    //     return result;
    // }

    return (
        <>
            <div className="menu-detail box">
                { menuMode === 'default' ? (
                    <MenuDetailEmpty />
                    ): (
                    <>
                        <MenuDetailTitle />    
                        <div className="menu-content-wrap">
                            <MenuDetailInfo />
                            <MenuDetailPath />    
                            <MenuDetailBtnArea />        
                        </div>
                    </>
                )} 
            </div>
        </>
    )
}