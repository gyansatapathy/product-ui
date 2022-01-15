import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(userName: string, password: string):Observable<any>{
    return this.http.post('authenticate', {username: userName, password: password});
  }

  signUp(userName: string, password: string):Observable<any>{
    return this.http.post('signup', {username: userName, password: password});
  }

}
