import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from 'uuid';
import { widgets } from 'cmstmplt-vitali-shatsou';
import { IWidget } from "cmstmplt-vitali-shatsou/dist/widgets";

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

    get edit(): string | null {
        return this._edit;
    }

    get blocks() {
        return this._template.blocks;
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

    registerWidget(widget: IWidget) {}

    setEditWidget(id: string | null) {
        this._edit = this._edit === id ? null : id;
    }
}