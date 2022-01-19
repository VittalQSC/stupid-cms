import { makeAutoObservable } from "mobx";
import Cookies from 'js-cookie';

export class UserStore {
    static injectName = 'userStore'

    username = ''
    email = ''
    _token = ''

    get token(): string {
        return this._token;
    }

    get isLoggedIn(): boolean {
        return !!this._token;
    }

    set token(token: string) {
        if (!token) {
            Cookies.remove('token');
        } else {
            Cookies.set('token', token, { expires: 365 });
        }

        this._token = token;
    }

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

    getUser(apiUrl: string, token: string | undefined) {
        return fetch(apiUrl + '/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => res.json()).then((result) => {
            if (result.errors) {
                return;
            }
            const { user } = result;

            this.token = user.token;
            this.username = user.username;
            this.email = user.email;
        }).catch(() => {});
    }

    signOut() {
        this.token = '';
        this.username = '';
        this.email = '';
    }
}