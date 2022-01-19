"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardWidget = exports.ImageWidget = exports.HeaderWidget = exports.BlockWidget = exports.Widget = void 0;
const widget_types_1 = require("./widget.types");
class Widget {
    constructor(id) {
        this.id = id;
    }
    toJSON() {
        return { id: this.id, type: this.type };
    }
}
exports.Widget = Widget;
class BlockWidget extends Widget {
    constructor(id, widgets = []) {
        super(id);
        this.type = widget_types_1.BLOCK_WIDGET_TYPE;
        this.widgets = [];
        this.widgets = widgets;
    }
    addWidget(widget) {
        this.widgets = [...this.widgets, widget];
    }
    deleteWidget(id) {
        this.widgets = this.widgets.filter(w => w.id !== id);
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { widgets: this.widgets.map(w => w.toJSON()) });
    }
}
exports.BlockWidget = BlockWidget;
class HeaderWidget extends Widget {
    constructor(id, title) {
        super(id);
        this.type = widget_types_1.HEADER_WIDGET_TYPE;
        this.title = '';
        this.title = title;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { title: this.title });
    }
}
exports.HeaderWidget = HeaderWidget;
class ImageWidget extends Widget {
    constructor(id, url, title) {
        super(id);
        this.type = widget_types_1.IMAGE_WIDGET_TYPE;
        this.url = '';
        this.title = '';
        this.url = url;
        this.title = title;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { url: this.url, title: this.title });
    }
}
exports.ImageWidget = ImageWidget;
class CardWidget extends Widget {
    constructor(id, url, title, description) {
        super(id);
        this.type = widget_types_1.CARD_WIDGET_TYPE;
        this.url = '';
        this.title = '';
        this.description = '';
        this.url = url;
        this.title = title;
        this.description = description;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { url: this.url, title: this.title, description: this.description });
    }
}
exports.CardWidget = CardWidget;
