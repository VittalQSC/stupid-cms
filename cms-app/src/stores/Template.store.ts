import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from 'uuid';
import { widgets } from 'cmstmplt-vitali-shatsou';

type Template = {
    blocks: widgets.Block[];
    widgets: { [key: string]: widgets.IWidget },
};

export class TemplateStore {
    static injectName = 'templateStore'

    _template: Template = {
        blocks: [],
        widgets: {}
    }

    _edit: string | null = null

    get editWidget(): widgets.IWidget | null {
        return this._edit ? this.widgets[this._edit] : null;
    }

    get edit(): string | null {
        return this._edit;
    }

    get blocks() {
        return this._template.blocks;
    }

    get widgets() {
        return this._template.widgets;
    }

    constructor() {
        makeAutoObservable(this);

        this._template;
    }

    addBlock() {
        this._template.blocks = [
            ...this._template.blocks,
            { id: uuidv4(), widgets: [] }
        ];
    }

    deleteBlock(id: string | undefined) {
        if (!id) {
            return;
        }

        this._template.blocks = this._template.blocks.filter(block => {
            if ((block.id === id) && block.widgets.find(w => w === this._edit)) {
                this.setEditWidget(null);
            }

            if (block.id === id) {
                this.unregisterWidget(...block.widgets);
            }

            return (block.id !== id);
        });
    }

    getWidgetIds(blockId: string): string[] {
        return this._template.blocks.find(b => b.id === blockId)?.widgets || [];
    }

    addWidgetToBlock(blockId: string, widgetId: string) {
        const block = this._template.blocks.find(b => b.id === blockId)
        if (!block) {
            return;
        }

        block.widgets = [...block.widgets, widgetId];
    }

    registerWidget(widget: widgets.IWidget) {
        this._template.widgets = {
            ...this._template.widgets,
            [widget.id]: widget
        };
    }

    unregisterWidget(...widgetIds: (string | null)[]) {
        const widgets = {...this._template.widgets};
        widgetIds.forEach((wId) => {
            if (wId) {
                delete widgets[wId];
            }
        });

        this._template.widgets = widgets;
    }

    setEditWidget(id: string | null) {
        this._edit = this._edit === id ? null : id;
    }
}