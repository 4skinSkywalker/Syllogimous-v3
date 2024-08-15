import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { intersection } from '../utils/array';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        @Inject(String) private allowedRoles: string[],
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authService.user$
            .pipe(
                map(user => intersection(this.allowedRoles, user?.roles || []).length > 0),
                tap(allowed => {
                    if (!allowed) {
                        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                    }
                })
            );
    }
}
