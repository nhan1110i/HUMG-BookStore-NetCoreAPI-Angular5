import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError,map,tap} from 'rxjs/operators';

import {url,GetAuthorization} from '../../config/config';
import { error } from '@angular/compiler/src/util';
import { JsonPipe } from '@angular/common';
import { Url } from 'url';
const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization' : GetAuthorization()
  })
}
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  getEmployees(): Observable<any>{
    return this.http.get<any>(url.host + url.employee.employees,httpOptions).pipe(
      tap(rs =>{}),catchError(error => of ([]))
    );
  }
  addEmployee(employee : any): Observable<any>{
    return this.http.post<any>(url.host + url.employee.insert,employee,httpOptions).pipe(
      tap(rs =>{}), catchError(error => of(console.log(error)))
    )
  }
  updateEmployee(employee : any): Observable<any>{
    return this.http.put(url.host + url.employee.update,employee,httpOptions).pipe(
      tap(rs =>{}),catchError(error => of())
    )
  }
  deleteAdmin(id : number) : Observable<any>{
    return this.http.delete(url.host + url.employee.delete + "/" + id.toString(),httpOptions).pipe(
      tap(rs => {}),catchError(error => of())
    )
  }
  constructor(private http: HttpClient,) { }
}
