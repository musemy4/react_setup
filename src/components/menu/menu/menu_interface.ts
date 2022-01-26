export interface IMenu {
    [index: string]: string | number | boolean | Array<IMenu> | undefined;
    admin_auth_enable: boolean;
    area_flag: boolean;
    download_enable: boolean;
    gis_enable: boolean;
    icon: string;
    menu_code: string;
    menu_id: string;
    menu_name: string;
    menu_page: string;
    ordering: number;
    p_menu_code: string;
    reg_date: string;
    setup_flag: boolean;
    upd_date: string;
}

export interface IMenuForDraw {
    [index: string]: string | number | boolean | Array<IMenu> | undefined;
    id: string;
    parent: number | string;
    droppable: boolean;
    text: string;
    // data: {
    //     admin_auth_enable?: boolean;
    //     area_flag?: boolean;
    //     download_enable?: boolean;
    //     gis_enable?: boolean;
    //     icon?: string;
    //     menu_id?: string;
    //     menu_page?: string;
    //     ordering?: number;
    //     reg_date?: string;
    //     setup_flag?: boolean;
    //     upd_date?: string;
    // }
}


export interface IMode {
    mode: 'default'|'BigAdd'|'SmlAdd'|'BigMod'|'SmlMod'|'reset';
}
