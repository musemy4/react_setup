// React
import { useState, useEffect, useRef } from 'react';
// confirm, toast
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
// spinner
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
    display: block;
    position: absolute;
    left: 50%;
    top: 40%;
    border-width: 6px;
    z-index: 999999`;

export const MenuManWrap = () => {
    const [loading, setLoading] = useState(false);
    return (
        <>
        <ClipLoader color="#0d6efd" loading={loading} css={override} size={50} />
        {
            loading ?
                <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.8)', zIndex: 99999 }} /> 
                  :
                <div className="row h-90">
                    <div className="apply-menu box">
                            <h2>메뉴 목록</h2>
                    </div>
                    <div className="menu-detail box">
                            <h2>메뉴 상세 정보</h2>
                    </div>
                </div> 
 
 
 
 
 
 }

        
    </>
    );
};