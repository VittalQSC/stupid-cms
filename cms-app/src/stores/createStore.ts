import { TemplateStore } from "./Template.store";
import { UserStore } from "./User.store"

export type TFriend = {
    name: string
    isFavorite: boolean
    isSingle: boolean
}
  
export function createStore() {
    // note the use of this which refers to observable instance of the store
    return {
        userStore: new UserStore(),
        templateStore: new TemplateStore(),
    };
}
  
export type TStore = ReturnType<typeof createStore>;