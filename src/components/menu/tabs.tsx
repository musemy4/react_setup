// React
export const TabType = {
    SETUP: "SETUP",
    MENU: "MENU",
};
  
export const TabLabel = {
    [TabType.SETUP]: "셋업 설정",
    [TabType.MENU]: "메뉴 관리",
};

interface ITabProps {
    selectedTab: string;
    onChange: (tabType: string) => void;
}


export const Tabs = ({ selectedTab = 'SETUP', onChange }: ITabProps) => {

    const handleTabClick = (tabType: string) => {
        // TODO TEMP:::TAB DISABLED
        onChange(tabType)
    }

    return (
        <div className="tab_wrap">  
			<ul className="nav_tabs">
                {Object.values(TabType).map((tabType) => (
                    <li
                        key={tabType}
                        className={selectedTab === tabType ? "nav_item on" : "nav_item"}
                        onKeyDown={()=>handleTabClick(tabType)}
                        onClick={()=>handleTabClick(tabType)}
                    >
                        <a href="#!" className="nav_link">
                            {TabLabel[tabType]}
                        </a>
                    </li>
                ))}
			</ul>
		</div>
    );
};