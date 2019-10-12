import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError,map,tap} from 'rxjs/operators';

import {url} from '../../config/config';
import { error } from 'util';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'multipart/form-data; boundary=070002080409050901090203'})
}
// application/json
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProducts(): Observable<any>{
    return this.http.get<any>(url.host + url.product.products).pipe(
      tap(rs=>{
        console.log(rs)
      }),catchError(errorr =>of(console.log(error)))
    )
  }
  insertProduct(form : FormData, product : any): Observable<any>{
    console.log(form)
    return this.http.post<any>(url.host + "/upload",form).pipe(
      tap(rs=>{product.productImage = rs}),catchError(error=> of([]))
    )
    
  }
  
  constructor(
    private http : HttpClient
  ) { }
}
