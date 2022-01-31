
import { useDispatch, useSelector } from 'react-redux';
// confirm, toast
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
// dispatch
import { resetMode } from '../../../../store/menu/menuMode';
import { resetMenu } from '../../../../store/menu/setMenu';
import { getReadyPutMenu, resetPutMenu } from '../../../../store/menu/putMenu';

export const MenuDetailBtnArea = () => {
    // redux
    const menuMode = useSelector((state: any) => state.menuMode.mode);
   
    const dispatch = useDispatch();

    const cancelBtnClicked = () => {
        dispatch(resetMenu());
        dispatch(resetMode());
    }

    // [추가] 버튼
    const onAddBtnClicked = () => {
        dispatch(getReadyPutMenu());
        confirmAlert({
            title: '[메뉴 추가]',
            message: '메뉴를 추가 하시겠습니까?',
            buttons: [
                { label: '취소', onClick: () => dispatch(resetPutMenu()) },
                { label: '추가', onClick: () => {
                    
                    // dispatch(resetTmpSetupStatus());
                    // updateState();
                }}
            ],
        });
    };

    // [수정] 버튼
    const onModiBtnClicked = () => {
        dispatch(getReadyPutMenu());
        confirmAlert({
            title: '[메뉴 수정]',
            message: '메뉴를 수정 하시겠습니까?',
            buttons: [
                { label: '취소', onClick: () => dispatch(resetPutMenu()) },
                { label: '수정', onClick: () => {
                    // 
                } }
            ],
        });
    };


    // [삭제] 버튼
    const onDeleteBtnClicked = () => {
        confirmAlert({
            title: '[메뉴 삭제]',
            message: '메뉴를 삭제 하시겠습니까?',
            buttons: [
                { label: '취소', onClick: () => null },
                { label: '삭제', onClick: () => {
                    // dispatch(resetTmpSetupStatus());
                    // updateState();
                }}
            ],
        });
    };


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