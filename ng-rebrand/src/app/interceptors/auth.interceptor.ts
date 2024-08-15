import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem("auth_token");

        if (!idToken)
            return next.handle(req);

        const cloned = req.clone({
            headers: req.headers.set("Authorization", "Bearer " + idToken)
        });

        return next.handle(cloned);
    }
}