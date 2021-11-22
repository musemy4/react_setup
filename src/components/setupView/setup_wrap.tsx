// React
import _ from 'lodash';
import React, { useState, useEffect, useRef } from 'react';


// Component
import { Tabs, TabType } from "./tabs"; // tabs
import SetupSettingWrap from './setupSetting/setup_setting_wrap';
import { Tabs2 } from './tab2/tab2';
import { Tabs3 } from './tab3/tab3';

const SetupWrap = () => {
    // TABS
    const [selectedTab, setSelectedTab] = useState(TabType.SETUP);
    const [refresh, setRefresh] = useState(String(new Date()));
    
    useEffect(() => {
        console.log('useEff:[]');
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
                <SetupSettingWrap />
            )}
            {selectedTab === TabType.TAB2 && (
                <Tabs2 />
            )}
            {selectedTab === TabType.TAB3 && (
                <Tabs3 />
            )}
        </div>
    );
}

export default SetupWrap;