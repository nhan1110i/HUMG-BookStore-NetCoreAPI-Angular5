import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { url } from '../../config/config';
import { error } from 'util';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
// application/json
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProducts(): Observable<any> {
    return this.http.get<any>(url.host + url.product.products).pipe(
      tap(rs => {
        console.log(rs)
      }), catchError(errorr => of(console.log(error)))
    )
  }
  getProduct(id :number): Observable <any>{
    return this.http.get<any>(url.host + url.product.getProductById + id.toString(),httpOptions).pipe(
      tap(rs =>{console.log(rs)}),catchError(error =>of([]))
    )
  }
  upLoadImage(form: FormData): Observable<any>{
    console.log(form)
      return this.http.post<any>(url.host + "/upload", form).pipe(
      tap(rs => { 
  
      }), catchError(error => of([]))
    )
  }
  insertProduct(product : any): Observable<any>{
    return this.http.post<any>(url.host + url.product.insert,product,httpOptions).pipe(
      tap(rs =>{}),catchError(error => of([]))
    )
  }
  deleteProduct(Id : any) : Observable<any>{
    return this.http.delete(url.host + url.product.delete + "/" + Id.toString(),httpOptions).pipe(
      tap(rs =>{}),catchError(error => of(console.log(error)))
    )
  }
  updateProduct(product : any):Observable <any>{
    return this.http.put(url.host + url.product.updateProduct,product,httpOptions).pipe(
      tap(rs =>{}),catchError(error => of([]))
    )
  }
  deleteProducts(Ids : number []): Observable<any>{
    return this.http.post(url.host + url.product.deleteProducts,Ids,httpOptions).pipe(
      tap(rs =>{}),catchError(error =>of([]))
    )
  }

  constructor(
    private http: HttpClient
  ) { }
}
