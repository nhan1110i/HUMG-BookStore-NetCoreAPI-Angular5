import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError,map,tap} from 'rxjs/operators';

import {url} from '../../helper/helper';
import {Category} from './../../models/category';
import { error } from '@angular/compiler/src/util';
import { JsonPipe } from '@angular/common';

const httpOptions = {
  headers : new HttpHeaders({'Content-Type' : 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  getCategories(): Observable<any>{
    return this.http.get<any>(url.host + url.category.categories).pipe(
      tap(rs=>{console.log(rs)}), catchError(error =>of([]))
    );
    //  return of(data)
  }
  getParentCategories(): Observable<any>{
    return this.http.get<any>(url.host + url.category.parentCategories).pipe(
      tap(rs =>{console.log(rs)}), catchError(error =>of([]))
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
