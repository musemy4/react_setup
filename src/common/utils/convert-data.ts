/* eslint-disable prefer-destructuring */
import _ from 'lodash';
import { IMenu, IFunc, ISetup, IPutSetupBody, IPutSetup } from '../../components/menu/setup/setup_interface';

interface IMenuCode {
    [index: string]: string | boolean | number | Array<IMenuCode> | undefined;
    area_flag: boolean;
    menu_code: string;
    menu_name: string;
    ordering: number;
    p_menu_code: string;
    setup_flag: boolean;
    children?: Array<IMenuCode>;
}

interface IFuncCode {
    [index: string]: string | boolean | Array<IFuncCode> | undefined;
    func_code: string;
    func_group: string;
    func_name: string;
    setup_flag: boolean;
    children?: Array<IFuncCode>;
}

interface IConfigCode {
    [index: string]: string | number | Array<IConfigCode> | undefined;
    config_code: string;
    config_group: string;
    config_name: string;
    data_type: string;
    order_load: number;
    children?: Array<IConfigCode>;
}

interface IConvertTreeOptions {
    group: string;
    code: string;
}

export const getConvertTreeData = 
    (
        setupData: Array<IMenuCode | IFuncCode | IConfigCode> | Array<IMenu | IFunc | ISetup>, 
        parentId: string, 
        options: IConvertTreeOptions
    ): any => {
        // p_code_name을 기준으로 묶는다.(children으로 분류한다)
        const filtered  = setupData
        .filter((node: IMenuCode | IFuncCode | IConfigCode | IMenu | IFunc | ISetup ) => node[options.group] === parentId)
        .reduce((tree: Array<IMenuCode | IFuncCode | IConfigCode>, node: IMenuCode | IFuncCode | IConfigCode) => [
                ...tree,
                {
                    ...node,
                    children: getConvertTreeData(setupData, String(node[options.code]), options)
                },
            ],
            []
        )
        return filtered;
}

export const getDeconvertTreeData = (tmpSetup: IPutSetupBody) => {
    const httpParam: IPutSetupBody = {
        menu_info: [],
        event_info: [],
        func_info: [],
        setup_info: [],
        layer_info: []
    };

    const setupTypes: { [index: string]: {code: string, value: string, param: string}} = {
        'MENU': { code: 'menu_code', value: 'setup_flag', param: 'menu_info' },
        'EVENT': { code: 'event_code', value: 'setup_flag', param: 'event_info' },
        'FUNC': { code: 'func_code', value: 'setup_flag', param: 'func_info' },
        'SETUP': { code: 'config_code', value: 'setup_data', param: 'setup_info' },
        'LAYER': { code: 'layer_id', value: 'setup_flag', param: 'layer_info' }
    };

    const setConvertPropsParam = (setupData: any, setupTypeInfo: {code: string, value: string, param: string}, setupType: string) => {
        _.forEach(setupData, (info) => {
            const infoObj: IPutSetup = {
                key: info[setupTypeInfo.code],
                value: info[setupTypeInfo.value],
            }
            if (info.area_flag) {
                infoObj.area_flag = info.area_flag
            }
                httpParam[setupTypeInfo.param].push(infoObj)
            if (info.children) {
                setConvertPropsParam(info.children, setupTypeInfo, setupType);
            }
        });
    }

    // ////////////////////////////////////////
    const newSetupArr: any[] = [];
    if(tmpSetup.response) {
        const entries = Object.entries(tmpSetup.response);
        entries.forEach((ele) => {
            const obj: any = {type: '', data: []};
            if (ele[0]==='menuInfo') {
                obj.type = 'MENU';
            } else if (ele[0]==='eventInfo') {
                obj.type = 'EVENT';
            } else if (ele[0]==='funcInfo') {
                obj.type = 'FUNC';
            } else if (ele[0]==='setupInfo') {
                obj.type = 'SETUP';
            } else if (ele[0]==='layerInfo') {
                obj.type = 'LAYER';
            }
            obj.data = ele[1];
            newSetupArr.push(obj);
        });
    }
    // /////////////////////////////////////////
    // console.log(newSetupArr);

    _.forEach(newSetupArr, (setupGroup) => {
        setConvertPropsParam(setupGroup.data, setupTypes[setupGroup.type], setupGroup.type);
    })

    return httpParam;
}