// React
import React, { useState, useEffect } from 'react';


// Component
import { Tabs, TabType } from "./tabs"; // tabs
import SetupWrap from './setup/setup_wrap';
import { Tabs2 } from './tab2/tab2';
import { Tabs3 } from './tab3/tab3';

const MenuWrap = () => {
    // TABS
    const [selectedTab, setSelectedTab] = useState(TabType.SETUP);
    const [refresh, setRefresh] = useState(String(new Date()));

    useEffect(() => {
        return () => {
            console.log('componentWillUnmount:::');
        }
    }, []);
    
    return (
         <div key={ refresh }>
             <SetupWrap />
            {/* <Tabs
                selectedTab={selectedTab}
                onChange={(selectedTab: string) => setSelectedTab(selectedTab)} 
            />
            {selectedTab === TabType.SETUP && (
                <SetupWrap />
            )}
            {selectedTab === TabType.TAB2 && (
                <Tabs2 />
            )}
            {selectedTab === TabType.TAB3 && (
                <Tabs3 />
            )} */}
        </div>
    );
}

export default MenuWrap;