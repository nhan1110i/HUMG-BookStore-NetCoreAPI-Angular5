import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { url, GetAuthorization } from '../../config/config';
import { error } from 'util';
const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': GetAuthorization()
  })
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  getOrder(): Observable<any> {
    return this.http.get<any>(url.host + url.order.orders,httpOptions).pipe(
      tap(rs => {
        console.log(rs)
      }), catchError(error => of(console.log(error)))
    )
  }
  completeOrder(id : number): Observable<any>{
    return this.http.put(url.host + url.order.complete,id,httpOptions).pipe(
      tap(rs =>{
        console.log(rs);
      }),catchError(error => of(console.log(error)))
    )
  }
  declineOrder(id : number): Observable<any>{
    return this.http.put(url.host + url.order.decline,id,httpOptions).pipe(
      tap(rs =>{
        console.log(rs);
      }),catchError(error => of(console.log(error)))
    )
  }
  deleteOrder(id : number): Observable<any>{
    return this.http.delete(url.host + url.order.delete + "/" + id.toString(),httpOptions).pipe(
      tap(rs => {console.log(rs)}),catchError(error => of(console.log(error)))
    )
  }
  getDetailOrder(id : number) : Observable<any>{
    return this.http.get<any>(url.host + url.order.orderDetail + "/" + id.toString(),httpOptions).pipe(
      tap(rs => {}),catchError(err => of([]))
    )
  }

  // BookStore
  checkOutSameAddress(checkout : any): Observable<any>{
    return this.http.post<any>(url.host + url.order.checkOutSameAddress,checkout,httpOptions).pipe(
      tap(rs => {}),catchError(error => of())
    )
  }
  checkOutDifferentAddress(checkout : any) : Observable<any>{
    return this.http.post<any>(url.host + url.order.checkOutDifferentAddress,checkout,httpOptions).pipe(
      tap(rs => {}),catchError(error => of())
    )
  }
  

  constructor(
    private http: HttpClient
  ) { }
}
