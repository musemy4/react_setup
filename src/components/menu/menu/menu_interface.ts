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

export interface IRefMenu {
    [index: string]: string | number | boolean | Array<IMenu> | undefined;
    id: number;
    parent: string; // p_menu_code
    droppable: boolean;
    text: string; // menu_name
    admin_auth_enable: boolean;
    area_flag: boolean;
    download_enable: boolean;
    gis_enable: boolean;
    icon: string;
    menu_code: string;
    menu_id: string;
    // menu_name: string;
    menu_page: string;
    ordering: number;
    // p_menu_code: string;
    reg_date: string;
    setup_flag: boolean;
    upd_date: string;
}