import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any>{
    return this.http.get('product');
  }

  searchByCategory(category: string): Observable<any> {
    return this.http.get('product/'+ category);
  }
}
