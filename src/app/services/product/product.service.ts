import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
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

  save(value: any, isNew: any): Observable<any>{
    if(isNew){
      return this.saveNewProduct(value);
    } else{
      return this.updateProducts(value);
    }
  }

  private updateProducts(value): Observable<any>{
    return this.http.put('product/'+ value.productId, value);
  }

  private saveNewProduct(value): Observable<any>{
    return this.http.post('product', value);
  }


  deleteProducts(selectedProductIds: Array<string>) {
    return this.http.delete('product?productIds='+selectedProductIds.join(','));

  }
}
