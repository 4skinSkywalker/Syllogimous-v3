import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { ANONYMOUS_USER, User } from '../models/user';
import { parseJwt } from '../utils/json';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _user$ = new BehaviorSubject<User | null>(ANONYMOUS_USER);
    user$: Observable<User | null> = this._user$.asObservable();

    private set user(user: User | null) {
        this._user$.next(user);
    }

    get user() {
        return this._user$.getValue();
    }

    constructor() {
        this.autoLogin();
    }

    setSession(authToken: string) {
        const user = parseJwt(authToken);
        localStorage.setItem("auth_token", authToken);
        localStorage.setItem("expires_at", JSON.stringify(user.exp * 1000));
        if (authToken && this.isLoggedIn()) {
            const parsed = parseJwt(authToken);
            console.log("authToken", authToken);
            console.log("parsed", parsed);
            this.user = parsed;
        }
        return this.user$;
    }

    autoLogin() {
        const authToken = localStorage.getItem("auth_token");
        if (authToken && this.isLoggedIn()) {
            const parsed = parseJwt(authToken);
            console.log("authToken", authToken);
            console.log("parsed", parsed);
            this.user = parsed;
        }
        // ToDo: Where is the logic for redirecting the user to the login on token expire?
        return this.user$;
    }

    logout() {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("expires_at");
        this.user = null;
    }

    isLoggedIn() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = parseInt(JSON.parse(expiration || "0"));
        return new Date().getTime() < expiresAt;
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }
}
