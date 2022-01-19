import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from 'uuid';
import { widgets } from 'cmstmplt-vitali-shatsou';

type Template = {
    blocks: widgets.Block[];
};

export class TemplateStore {
    static injectName = 'templateStore'

    _template: Template = {
        blocks: []
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

        this._template.blocks = this._template.blocks.filter(block => block.id !== id);
    }
}