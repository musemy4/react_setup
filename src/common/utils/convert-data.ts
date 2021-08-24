import { IMenu, IFunc, ISetup } from '../../_views/setupSettings/setup_interface';

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
    (setupData: Array<IMenuCode | IFuncCode | IConfigCode> | Array<IMenu | IFunc | ISetup>, parentId: string, options: IConvertTreeOptions): any => {
        return setupData
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
}