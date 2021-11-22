// React
export const TabType = {
    SETUP: "SETUP",
    TAB2: "TAB2",
    TAB3: "TAB3",
};
  
export const TabLabel = {
    [TabType.SETUP]: "셋업 설정",
    [TabType.TAB2]: "탭 2 - 미정",
    [TabType.TAB3]: "탭 3 - 미정",
};

interface ITabProps {
    selectedTab: string;
    onChange: (tabType: string) => void;
}


export const Tabs = ({ selectedTab = 'SETUP', onChange }: ITabProps) => {

    const handleTabClick = (tabType: string) => {
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