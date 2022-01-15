import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getAccessToken();
        if(token) {
            req = req.clone({
                headers: new HttpHeaders({
                    'Authorization': `Bearer ${token}`
                })
            });
        }

        return next.handle(req);
    }

}