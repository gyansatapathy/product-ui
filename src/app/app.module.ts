import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {ProductListComponent} from './product-list/product-list.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {LoginComponent} from './login/login.component';
import {AuthGuard} from "./guard/auth.guard";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";
import {BaseUrlInterceptor} from "./interceptor/http-request-base-url.interceptor";

@NgModule({
    imports: [
        BrowserModule,
        MatToolbarModule,
        ReactiveFormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot([
            {path: 'login', component: LoginComponent},
            {path: '', component: ProductListComponent, canActivate: [AuthGuard]},
        ]),
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatCardModule
    ],
    declarations: [
        AppComponent,
        TopBarComponent,
        ProductListComponent,
        LoginComponent
    ],
    bootstrap: [
        AppComponent
    ], providers: [
        {provide: "BASE_API_URL", useValue: environment.baseUrl},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BaseUrlInterceptor,
            multi: true,
        }
    ]
})
export class AppModule {
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/