import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    titleAlert: string = 'This field is required';
    formGroup: FormGroup;
    emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
                'email': [null, [Validators.required, Validators.pattern(this.emailRegex)]],
                'password': [null, [Validators.required]]
            }
        );
    }

    login = (value: any): void =>{
        this.authService.login(value.email, value.password).subscribe(result=>{
            console.log(result);
            sessionStorage.setItem('product-access-key', result.token);
        });
    }

    signUp = (value: any): void =>{
        this.authService.signUp(value.email, value.password).subscribe(result=>console.log(result));
    }
}
