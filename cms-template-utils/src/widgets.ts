import { BLOCK_WIDGET_TYPE, CARD_WIDGET_TYPE, HEADER_WIDGET_TYPE, IMAGE_WIDGET_TYPE } from "./widget.types";

export interface IWidget {
    id: string;
    type: string;
    toJSON(): object;
}

export interface Block {
    id: string;
    widgets: string[];
}

export class Widget implements IWidget {
    id: string;
    type: string;

    constructor(id) {
        this.id = id;
    }

    toJSON() {
        return { id: this.id, type: this.type };
    }
}

export class BlockWidget extends Widget {
    id: string;
    type = BLOCK_WIDGET_TYPE
    widgets: string[] = []

    constructor(id, widgets = []) {
        super(id);
        this.widgets = widgets;
    }

    addWidget(widget: IWidget) {
        this.widgets = [...this.widgets, widget.id];
    }

    deleteWidget(id: string) {
        this.widgets = this.widgets.filter(wId => wId !== id);
    }

    toJSON() {
        return {
            ...super.toJSON(),
            widgets: this.widgets
        };
    }
}

export class HeaderWidget extends Widget {
    id: string;
    type = HEADER_WIDGET_TYPE
    title: string = ''

    constructor(id, title) {
        super(id);
        this.title = title;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            title: this.title,
        };
    }
}

export class ImageWidget extends Widget {
    type = IMAGE_WIDGET_TYPE
    url: string = ''
    title: string = ''

    constructor(id, url, title) {
        super(id);
        this.url = url;
        this.title = title;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            url: this.url,
            title: this.title,
        };
    }
}

export class CardWidget extends Widget {
    type = CARD_WIDGET_TYPE
    url: string = ''
    title: string = ''
    description: string = ''

    constructor(id, url, title, description) {
        super(id);
        this.url = url;
        this.title = title;
        this.description = description;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            url: this.url,
            title: this.title,
            description: this.description,
        };
    }
}