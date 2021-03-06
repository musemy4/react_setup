export interface IMenu {
    [index: string]: string | number | boolean | [] | undefined;
    admin_auth_enable: boolean;
    download_enable: boolean;
    gis_enable: boolean;
    icon: string;
    menu_code: string;
    menu_id: string;
    menu_name: string;
    menu_page: string;
    ordering: number;
    p_menu_code: string;
}

export interface IMenuForDraw {
    [index: string]: string | number | boolean | undefined;
    id: string;
    parent: number | string;
    droppable: boolean;
    text: string;
}

export interface IPutMenu {
    mode : 'default' 
    | 'beReady' 
    | 'readyInfo' | 'readyPath'
    | 'successPut' | 'successPost' | 'successDel' 
    | 'failurePut' | 'failurePost' | 'failureDel' 
    menu : IMenu
}

export interface IPutOrdering {
    mode : 'default' | 'beReady' | 'success' | 'failure';
}

export interface IPutOrderingEle {
    menu_code: string;
    ordering: number;
}

export interface IPathObj {
    [index: string]: string | number | boolean | string[] | undefined;
   mode: 'basic' | 'external' | 'side';
   initialId: string; // for rendering
   basic: string[];
   external: string[];
   side:string[];
}


export interface IMode {
    mode: 'default'|'BigAdd'|'SmlAdd'|'BigMod'|'SmlMod'|'reset';
}
