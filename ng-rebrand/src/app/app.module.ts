import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
import { EnumRoles } from './models/user';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        {
            provide: 'guardGuest',
            useFactory: (authService: AuthService, router: Router) =>
                new AuthGuard([EnumRoles.Guest, EnumRoles.Premium, EnumRoles.Admin], authService, router),
            deps: [AuthService, Router]
        },
        {
            provide: 'guardPremium',
            useFactory: (authService: AuthService, router: Router) =>
                new AuthGuard([EnumRoles.Premium, EnumRoles.Admin], authService, router),
            deps: [AuthService, Router]
        },
        {
            provide: 'guardAdmin',
            useFactory: (authService: AuthService, router: Router) =>
                new AuthGuard([EnumRoles.Admin], authService, router),
            deps: [AuthService, Router]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
