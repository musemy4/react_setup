
import { useDispatch, useSelector } from 'react-redux';
// dispatch
import { resetMode } from '../../../../store/menu/menuMode';
import { resetMenu } from '../../../../store/menu/setMenu';

export const MenuDetailBtnArea = () => {
    // redux
    const menuMode = useSelector((state: any) => state.menuMode.mode);
   
    const dispatch = useDispatch();

    const cancelClicked = () => {
        dispatch(resetMenu());
        dispatch(resetMode());
    }

    return (
        <div className="btn-container">
        <div className="btn-right">
            <button type="button" className="btn" onClick={cancelClicked}>취소</button>

            {
                menuMode.substring(3) === 'Mod' ? (
                <>
                    <button type="button" className="btn solid danger">삭제</button>
                    <button type="button" className="btn solid">수정</button>
                </>
                ) : (<button type="button" className="btn solid">추가</button>)
            }
        </div>
    </div>
    )
}