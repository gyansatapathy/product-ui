import {Inject, Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

    constructor(
        @Inject('BASE_API_URL') private baseUrl: string) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const apiReq = request.clone({
            url: `${this.baseUrl}/${request.url}`,
            headers: new HttpHeaders().set("Authorization", 'Bearer '+sessionStorage.getItem('product-access-key'))
        });
        return next.handle(apiReq);
    }
}