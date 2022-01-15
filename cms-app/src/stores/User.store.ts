import { makeAutoObservable } from "mobx";

export class UserState {
    static injectName = 'userState'

    username = ''
    email = ''
    token = ''

    constructor() {
        makeAutoObservable(this);
    }

    login(apiUrl: string, email: string, password: string) {
        return fetch(apiUrl + '/user', {
            method: 'POST',
            body: JSON.stringify({
                user: { email, password, }
            })
        }).then((res) => res.json()).then(({ user }) => {
            this.token = user.token;
            this.username = user.username;
            this.email = user.email;
        });
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

    signOut() {
        this.token = '';
        this.username = '';
        this.email = '';
    }
}