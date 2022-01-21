import { TemplateStore } from "./Template.store";
import { UserStore } from "./User.store"
import { HeaderWidgetEditorStore } from "./widget-editors/HeaderWidgetEditor.store";

export const userStore = new UserStore();
export const templateStore = new TemplateStore();

// edit widgetTypes forms
export const headerWidgetEditorStore = new HeaderWidgetEditorStore(templateStore);

export function createStore() {
    // note the use of this which refers to observable instance of the store
    return {
        userStore,
        templateStore,
        headerWidgetEditorStore,
    };
}
  
export type TStore = ReturnType<typeof createStore>;