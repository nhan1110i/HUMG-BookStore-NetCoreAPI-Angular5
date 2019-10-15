import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError,map,tap} from 'rxjs/operators';

import {url} from '../../config/config';
import { error } from 'util';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  loginAdmin(admin : any): Observable<any>{
    return this.http.post<any>(url.host + url.admin.login,admin,httpOptions).pipe(
      tap(rs=>{}),catchError(error =>of())
    );
  }
  constructor(
    private http: HttpClient,
  ) { }
}
