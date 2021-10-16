import { makeAutoObservable } from "mobx";

export class UserState {
    static injectName = 'userState'

    username: string
    email: string
    token: string

    constructor() {
        makeAutoObservable(this);
    }

    register(apiUrl: string, username: string, email: string, password: string) {
        return fetch(apiUrl + '/users', {
            method: 'POST',
            body: JSON.stringify({
                user: { username, email, password }
            })
        }).then((res) => res.json()).then(({ user }) => {
            this.token = user.token;
            this.username = user.username;
            this.email = user.email;
        });
    }
}