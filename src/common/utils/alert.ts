import { confirmAlert } from "react-confirm-alert";

export const showAlert = (message: string, status?: string) => {
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
