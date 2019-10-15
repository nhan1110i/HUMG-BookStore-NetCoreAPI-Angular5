import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError,map,tap} from 'rxjs/operators';

import {url} from '../../config/config';
import { error } from '@angular/compiler/src/util';
import { JsonPipe } from '@angular/common';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization' : 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzEyNTMwNTQsImlzcyI6ImFkbWluIiwiYXVkIjoic3RyaW5nIn0.1xef1hjNrF8nAbezzlbrGn2juBwVSJZekZl0-6gMA-w'
  })
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  getCategories(): Observable<any>{
    return this.http.get<any>(url.host + url.category.categories,httpOptions).pipe(
      tap(rs=>{}), catchError(error =>of([]))
    );
    //  return of(data)
  }
  getParentCategories(): Observable<any>{
    return this.http.get<any>(url.host + url.category.parentCategories,httpOptions).pipe(
      tap(rs =>{}), catchError(error =>of([]))
    )
  }
  addCategory(category : any): Observable<any>{
    return this.http.post<any>(url.host + url.category.addCategory,category,httpOptions).pipe(
      tap(rs =>{}), catchError(error => of(console.log(error)))
    )
  }
  deleteCategory(Id : number) : Observable<any>{
    return this.http.delete(url.host+url.category.deleteCategory +"/"+ Id.toString(),httpOptions).pipe(
      tap(rs =>{console.log("delete done 1")}),catchError(error => of(console.log(error)))
    )
  }
  // update category
  updateCategory(category : any) : Observable<any>{
    return this.http.put(url.host + url.category.updateCategory,category,httpOptions).pipe(
      tap(rs =>{console.log("ok")}),catchError(error =>of(console.log(error)))
    )
  }
  constructor(                  
    private http: HttpClient,
  ) { }
}
