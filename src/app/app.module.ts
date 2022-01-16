import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
import {HomePageComponent} from './home-page/home-page.component';
import {JwtInterceptor} from "./interceptor/jwt-interceptor";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatListModule} from "@angular/material/list";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {GridModule} from '@progress/kendo-angular-grid';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        MatToolbarModule,
        ReactiveFormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot([
            {path: 'login', component: LoginComponent},
            {
                path: '', component: HomePageComponent, canActivate: [AuthGuard],
                children: [{
                    path: '**', redirectTo: 'product-list'
                },
                    {path: 'product-list', component: ProductListComponent},
                ]
            }
        ]),
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatCardModule,
        MatTooltipModule,
        MatListModule,
        MatTableModule,
        MatCheckboxModule,
        GridModule
    ],
    declarations: [
        AppComponent,
        TopBarComponent,
        ProductListComponent,
        LoginComponent,
        HomePageComponent
    ],
    bootstrap: [
        AppComponent
    ], providers: [
        {provide: "BASE_API_URL", useValue: environment.baseUrl},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BaseUrlInterceptor,
            multi: true,
        }, {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true,
        }
    ]
})
export class AppModule {
}