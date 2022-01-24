// React
import { useState } from 'react';
// confirm, toast
import 'react-confirm-alert/src/react-confirm-alert.css';
// spinner
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
import { MenuDetail } from './_menu_detail';
import { MenuTree } from './_menu_tree';
import { IMenu, IMode } from './menu_interface';



const override = css`
    display: block;
    position: absolute;
    left: 50%;
    top: 40%;
    border-width: 6px;
    z-index: 999999`;

export const MenuManWrap = () => {
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<'default'|'BigAdd'|'SmlAdd'|'BigMod'|'SmlMod'>('default');
    const [menuSelected, setMenuSelected] =useState<IMenu>();

    const menuClicked = (menu: IMenu) => {
        console.log('wrap:::', menu);
        setMenuSelected(menu);
    }
    const getMode = (mode: 'default'|'BigAdd'|'SmlAdd'|'BigMod'|'SmlMod') => {
        console.log(mode);
        setMode(mode);
    }

    return (
        <>
            <ClipLoader color="#0d6efd" loading={loading} css={override} size={50} />
            {
                loading ?
                    <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.8)', zIndex: 99999 }} /> 
                    :
                    <>
                        <div className="row h-90">
                            <MenuTree menuClicked={menuClicked} getMode={getMode} />     
                            <MenuDetail menuSelected={menuSelected} mode={mode}/>
                        </div> 
                    </>
            }
        </>
    );
};