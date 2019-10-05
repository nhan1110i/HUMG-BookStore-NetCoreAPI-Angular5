import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError,map,tap} from 'rxjs/operators';

import {url} from '../../helper/helper';
import { error } from 'util';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
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
  constructor(
    private http : HttpClient
  ) { }
}
