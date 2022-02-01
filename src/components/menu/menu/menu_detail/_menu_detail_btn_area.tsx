
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// confirm, toast
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
// dispatch
import { resetMode } from '../../../../store/menu/menuMode';
import { resetMenu } from '../../../../store/menu/setMenu';
import { getBeReadyPutMenu, resetPutMenu, modiMenu, postMenu, deleteMenu } from '../../../../store/menu/putMenu';

export const MenuDetailBtnArea = () => {
    // redux
    const menuMode = useSelector((state: any) => state.menuMode.mode);
    const putMenu = useSelector((state: any) => state.putMenu);
    const menu = useSelector((state: any) => state.menu);
    
    const dispatch = useDispatch();

    //  USEEFFECT 
    //  ////////////////////////////////////////////////////////////
    // /////////////////////////////////////////////////////////////

    useEffect(() => {
        console.log(putMenu);
        if(putMenu.mode === 'readyPath') {
            console.log(putMenu.menu);
            if(putMenu.menu.menu_id !== '') {
                confirmAlert({
                    title: '[메뉴 수정]',
                    message: '메뉴를 수정 하시겠습니까?',
                    buttons: [
                        { label: '취소', onClick: () => dispatch(resetPutMenu())},
                        { label: '수정', onClick: () => dispatch(modiMenu(putMenu.menu))} 
                    ],
                });
            } else {
                confirmAlert({
                    title: '[메뉴 추가]',
                    message: '메뉴를 추가 하시겠습니까?',
                    buttons: [
                        { label: '취소', onClick: () => dispatch(resetPutMenu()) },
                        { label: '추가', onClick: () => dispatch(postMenu(putMenu.menu))}
                    ],
                });
            }
        } else if(putMenu.mode.includes('success')) {
            if(putMenu.mode.includes('Post')) {
                showAlert('메뉴 생성에 성공하였습니다.', 'success');
            } else if(putMenu.mode.includes('Put')) {
                showAlert('메뉴 수정에 성공하였습니다.', 'success');
            } else {
                showAlert('메뉴 삭제에 성공하였습니다.', 'success');
            }
            dispatch(resetPutMenu());
            // dispatch(resetMode());
        } else if (putMenu.mode.includes('failure')) {
            if(putMenu.mode.includes('Post')) {
                showAlert('메뉴 생성에 실패하였습니다.', 'failure');
            } else if(putMenu.mode.includes('Put')) {
                showAlert('메뉴 수정에 실패하였습니다.', 'failure');
            } else {
                showAlert('메뉴 삭제에 실패하였습니다.', 'failure');
            }
            dispatch(resetPutMenu());
        }
    }, [putMenu])


    //  HANDLER 
    //  ////////////////////////////////////////////////////////////
    // /////////////////////////////////////////////////////////////

    
    const cancelBtnClicked = () => {
        dispatch(resetMenu());
        dispatch(resetMode());
    }

    // [추가] 버튼
    const onAddBtnClicked = () => {
        dispatch(getBeReadyPutMenu());
    };

    // [수정] 버튼
    const onModiBtnClicked = () => {
        dispatch(getBeReadyPutMenu());
    };


    // [삭제] 버튼
    const onDeleteBtnClicked = () => {
        confirmAlert({
            title: '[메뉴 삭제]',
            message: '메뉴를 삭제 하시겠습니까?',
            buttons: [
                { label: '취소', onClick: () => dispatch(resetPutMenu()) },
                { label: '삭제', onClick: () => dispatch(deleteMenu(menu.menu_code)) }
            ],
        });
    };

    const showAlert = (message: string, status?: string) => {
        confirmAlert({
            title: '[알림]',
            message,
            buttons: [
                {
                    label: '닫기',
                    onClick: (() => null)
                }
            ],
            overlayClassName: `${status}`
        });
    }

    return (
        <div className="btn-container">
        <div className="btn-right">
            <button type="button" className="btn" onClick={cancelBtnClicked}>취소</button>

            {
                menuMode.substring(3) === 'Mod' ? (
                <>
                    <button type="button" className="btn solid danger" onClick={onDeleteBtnClicked}>삭제</button>
                    <button type="button" className="btn solid" onClick={onModiBtnClicked}>수정</button>
                </>
                ) : (<button type="button" className="btn solid" onClick={onAddBtnClicked}>추가</button>)
            }
        </div>
    </div>
    )
}