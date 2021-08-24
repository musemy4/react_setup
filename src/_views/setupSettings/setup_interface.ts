export interface IMenu {
    [index: string]: string | number | boolean | Array<IMenu> | undefined;
    area_flag: boolean;
    menu_code: string;
    menu_name: string;
    ordering: number;
    p_menu_code: string;
    setup_flag: boolean;
    children: Array<IMenu>
}

export interface IFunc {
    [index: string]: string | boolean | Array<IFunc> | undefined;
    func_code: string;
    func_group: string;
    func_name: string;
    setup_flag: boolean;
    children: Array<IFunc>
}

export interface ILayer {
    layer_id: string;
    layer_name: string;
    setup_flag: boolean;
}

export interface IEvent {
    [index: string]: string | boolean | Array<IEvent> | undefined;
    event_code: string;
    event_name: string;
    setup_flag: boolean;
}

export interface ISetup {
    [index: string]: string | number | Array<ISetup> | undefined;
    config_code: string;
    config_group: string;
    config_name: string;
    data_type: string;
    order_load: number;
    setup_data: string;
    children: Array<ISetup>
}

export interface IPutSetup {
    key: string;
    value: boolean;
    area_flag?: boolean;
}

export interface IPutSetupGroup {
    [index: string]: Array<IPutSetup>;
    menu_info: Array<IPutSetup>;
    event_info: Array<IPutSetup>;
    func_info: Array<IPutSetup>;
    setup_info: Array<IPutSetup>;
    layer_info: Array<IPutSetup>;
}

export interface IPutSetupHttpBody {
    code: number;
    message: string;
    response: IPutSetupGroup
    responseTime: string;
}

export interface IGetSetupGroup {
    menuInfo: Array<IMenu>;
    eventInfo: Array<IEvent>;
    funcInfo: Array<IFunc>;
    setupInfo: Array<ISetup>;
    layerInfo: Array<ILayer>;
}

export interface IGetSetupHttpBody {
    code?: number;
    message?: string;
    response: IGetSetupGroup
    responseTime?: string;
}

export interface IAddSetupData {
    type: string;
    data: Array<IMenu | IEvent | IFunc | ISetup | ILayer>;
}