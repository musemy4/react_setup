interface IMenuDetail {
    menuSelected: string;
}

export const MenuDetail = ({menuSelected}: IMenuDetail) => {


    return (
        <div className="menu-detail box">
            <h2>메뉴 상세 정보</h2>
        </div>
    )

}