import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../services/login/login.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../services/auth/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    titleAlert: string = 'This field is required';
    formGroup: FormGroup;
    signUpSuccessful;

    constructor(private formBuilder: FormBuilder, private loginService: LoginService,
                private activatedRoute: ActivatedRoute,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
                'email': [null, [Validators.required]],
                'password': [null, [Validators.required]]
            }
        );
    }

    login = (value: any): void =>{
        this.loginService.login(value.email, value.password).subscribe(result=>{
            this.activatedRoute.queryParams.subscribe(params => {
                this.authService.login(result.token, params);
            })
        }, error => {
            this.formGroup.setErrors(error);
        });
    }

    signUp = (): void =>{
        this.loginService.signUp(this.formGroup.get('email').value, this.formGroup.get('password').value).subscribe(()=>{
            this.signUpSuccessful = 'Sign Up SuccessFull Please try to login now with the same';
        });
    }
}
