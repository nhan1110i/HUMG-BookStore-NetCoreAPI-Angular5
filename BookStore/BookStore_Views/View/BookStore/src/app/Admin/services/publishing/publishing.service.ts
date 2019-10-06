import { Injectable } from '@angular/core';
import { url } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class PublishingService {
  getPublishings(): Observable<any> {
    return this.http.get<any>(url.host + url.publishing.publishings).pipe(
      tap(rs => { console.log(rs) }), catchError(error => of([]))
    );
  }
  constructor(private http: HttpClient, ) { }
}
