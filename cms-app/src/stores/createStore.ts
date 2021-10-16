import { UserState } from "./User.store"

export type TFriend = {
    name: string
    isFavorite: boolean
    isSingle: boolean
}
  
export function createStore() {
    // note the use of this which refers to observable instance of the store
    return {
        [UserState.injectName]: new UserState(),
    }
}
  
  export type TStore = ReturnType<typeof createStore>