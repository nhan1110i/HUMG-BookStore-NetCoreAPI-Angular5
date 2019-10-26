import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { url, GetAuthorization } from '../../config/config';
import { error } from 'util';
import { identifierModuleUrl } from '@angular/compiler';
const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': GetAuthorization()
  })
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  getCustomers(): Observable<any> {
    return this.http.get<any>(url.host + url.customer.customers).pipe(
      tap(rs => {
        console.log(rs)
      }), catchError(error => of(console.log(error)))
    )
  }
  deleteCustomer(Id: any): Observable<any> {
    return this.http.delete(url.host + url.customer.delete + "/" + Id.toString(), httpOptions).pipe(
      tap(rs => { console.log(rs) }), catchError(error => of(console.log(error)))
    )
  }
  activeCustomer(Id : any) : Observable <any>{
    return this.http.put(url.host + url.customer.active + "/" + Id.toString(),Id,httpOptions).pipe(
      tap(rs => {console.log(rs)}),catchError(error => of(console.log(error)))
    )
  }
  getCities():Observable<any>{
    return this.http.get<any>(url.host + url.city.cities,httpOptions).pipe(
      tap(rs =>{
        console.log(rs);
      }), catchError(error => of(console.log(error)))
    )
  }
  getTownsById(Id : number): Observable<any>{
    return this.http.get<any>(url.host + url.town.townsByCityId + "/" + Id.toString(),httpOptions).pipe(
      tap(rs =>{}),catchError(error => of())
    )
  }
  insertAccountInCustomer(accountInCustomer : any) : Observable<any>{
    return this.http.post<any>(url.host + url.customer.insert,accountInCustomer,httpOptions).pipe(
      tap(rs => console.log(rs)),catchError(error => of(console.log(error)))
    )
  }
  customerLogin(customer : any) : Observable<any>{
    return this.http.post<any>(url.host + url.customer.login,customer,httpOptions).pipe(
      tap(rs => {}),catchError(error => of())
    )
  }
  constructor(
    private http: HttpClient
  ) { }
}
