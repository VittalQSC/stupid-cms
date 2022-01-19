export interface IWidget {
    id?: string;
    type: string;
    toJSON(): object;
}
export interface Block {
    id?: string;
    widgets: IWidget[];
}
export declare class Widget implements IWidget {
    id: string;
    type: string;
    constructor(id: any);
    toJSON(): {
        id: string;
        type: string;
    };
}
export declare class BlockWidget extends Widget {
    id: string;
    type: string;
    widgets: IWidget[];
    constructor(id: any, widgets?: any[]);
    addWidget(widget: IWidget): void;
    deleteWidget(id: string): void;
    toJSON(): {
        widgets: object[];
        id: string;
        type: string;
    };
}
export declare class HeaderWidget extends Widget {
    id: string;
    type: string;
    title: string;
    constructor(id: any, title: any);
    toJSON(): {
        title: string;
        id: string;
        type: string;
    };
}
export declare class ImageWidget extends Widget {
    type: string;
    url: string;
    title: string;
    constructor(id: any, url: any, title: any);
    toJSON(): {
        url: string;
        title: string;
        id: string;
        type: string;
    };
}
export declare class CardWidget extends Widget {
    type: string;
    url: string;
    title: string;
    description: string;
    constructor(id: any, url: any, title: any, description: any);
    toJSON(): {
        url: string;
        title: string;
        description: string;
        id: string;
        type: string;
    };
}
