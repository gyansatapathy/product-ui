import {Injectable} from '@angular/core';

import jwt_decode from 'jwt-decode';
import {Params, Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly key = 'product-access-key';

    constructor(private router: Router) {
    }

    login(token: string, params: Params) {
        sessionStorage.setItem(this.key, token);
        let redirectTo = '/'
        if (params['goTo']) {
            redirectTo = params['goTo'];
        }

        this.router.navigate([redirectTo]);
    }

    getAccessToken(): any {
        return sessionStorage.getItem(this.key);
    }

    getLoggedInUser(): any {
        if (this.getAccessToken()) {
            return jwt_decode(this.getAccessToken());
        } else {
            return null;
        }
    }

    logout(): void {
        sessionStorage.removeItem(this.key);
        this.router.navigate(['/login']);
    }
}
