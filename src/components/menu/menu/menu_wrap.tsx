// React
import { useState } from 'react';
// confirm, toast
import 'react-confirm-alert/src/react-confirm-alert.css';
// spinner
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
import { MenuDetail } from './menu_detail';
import { MenuTree } from './menu_tree';

const override = css`
    display: block;
    position: absolute;
    left: 50%;
    top: 40%;
    border-width: 6px;
    z-index: 999999`;

export const MenuManWrap = () => {
    const [loading, setLoading] = useState(false);
    const [menuSelected, setMenuSelected] =useState('');

    const menuClicked = (menu: string) => {
        console.log('wrap:::', menu);
        setMenuSelected(menu);
    }

    return (
        <>
            <ClipLoader color="#0d6efd" loading={loading} css={override} size={50} />
            {
                loading ?
                    <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.8)', zIndex: 99999 }} /> 
                    :
                    <div className="row h-90">
                        <MenuTree menuClicked={menuClicked} />     
                        <MenuDetail menuSelected={menuSelected}/>
                    </div> 
            }
        </>
    );
};