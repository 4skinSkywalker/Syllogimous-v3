import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FAKE_TOKEN } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    email!: FormControl;
    username!: FormControl;
    password!: FormControl;

    loginForm!: FormGroup;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.email = new FormControl();
        this.username = new FormControl("admin");
        this.password = new FormControl("admin");

        this.loginForm = new FormGroup({
            username: this.username,
            password: this.password
        });
    }

    login() {
        this.authService.setSession(FAKE_TOKEN)
            .subscribe(() => {
                const returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/docs";
                this.router.navigateByUrl(returnUrl);
            });
    }

}
