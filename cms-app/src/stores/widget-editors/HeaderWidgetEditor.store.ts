import { makeAutoObservable } from "mobx";
import { widgetTypes, widgets } from "cmstmplt-vitali-shatsou";
import { TemplateStore } from "@stores/Template.store";

export class HeaderWidgetEditorStore {
    _templateStore: TemplateStore

    get editingTitle(): string | null {
        if (!this._templateStore.editWidget || this._templateStore.editWidget.type !== widgetTypes.HEADER_WIDGET_TYPE) {
            return null;
        }

        return (this._templateStore.editWidget as widgets.HeaderWidget).title;
    }

    get edits() {
        return Object.values(this._templateStore.widgets).filter((w) => (w.type === widgetTypes.HEADER_WIDGET_TYPE));
    }

    constructor(templateStore: TemplateStore) {
        makeAutoObservable(this);

        this._templateStore = templateStore;
    }

    save(widgetId: string | null, title: string): void {
        if (!widgetId) {
            return;
        }

        this._templateStore.registerWidget(new widgets.HeaderWidget(widgetId, title));
    }
}