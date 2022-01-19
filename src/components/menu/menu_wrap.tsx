// React
import { useState, useEffect } from 'react';


// Component
import { Tabs, TabType } from "./tabs"; // tabs
import SetupWrap from './setup/setup_wrap';
import { MenuManWrap } from './menu/menu_wrap';
import { Tabs3 } from './tab3/tab3';

const MenuWrap = () => {
    // TABS
    const [selectedTab, setSelectedTab] = useState(TabType.MENU);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [refresh, setRefresh] = useState(String(new Date()));

    useEffect(() => {
        return () => {
            console.log('componentWillUnmount:::');
        }
    }, []);
    
    return (
         <div key={ refresh }>
            <Tabs
                selectedTab={selectedTab}
                onChange={(selectedTab: string) => setSelectedTab(selectedTab)} 
            />
            {selectedTab === TabType.SETUP && (
                <SetupWrap />
            )}
            {selectedTab === TabType.MENU && (
                <MenuManWrap />
            )}
            {selectedTab === TabType.TAB3 && (
                <Tabs3 />
            )}
        </div>
    );
}

export default MenuWrap;