

import { HttpClient, HttpHeaders, HttpParams, HttpResponseBase } from '@angular/common/http';
import { CrudOperations } from './crud-operations.interface';
import { Injectable, Inject, Input } from '@angular/core';
import { environment } from 'src/app/environments/environment.prod';
import { GeneralResponse } from 'src/app/Shared/GeneralResponse';
import {
  Observable,
  throwError as _observableThrow,
  of as _observableOf,
} from 'rxjs';
import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
} from 'rxjs/operators';


export const BASE_URL = environment.BaseUrl;
export const Controller ="";
let _base="";
@Injectable({
  providedIn: 'root',
})
export  class GlobalService<T> implements CrudOperations<T> {


  constructor(@Inject(Controller) private _Controller: string,
    protected _http: HttpClient,
  ) {  _base=BASE_URL+"/"+_Controller;}

  Add<res,request>(t: request): Observable<GeneralResponse<res>> {

    let url_ = _base + '/Add';
    url_ = url_.replace(/[?&]$/, '');
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
        'Authorization': 'Bearer ' + localStorage.getItem('Token'),
      },
      body: JSON.stringify(t),
    };

    return this.sendRequest(url_, options);
  }

  update<res,request>(t: request): Observable<GeneralResponse<res>> {
    let url_ = _base + '/Update';
    url_ = url_.replace(/[?&]$/, '');
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
        'Authorization': 'Bearer ' + localStorage.getItem('Token'),
      },
      body: JSON.stringify(t),
    };

    return this.sendRequest(url_, options);
  }

  GetById<res>(id: string): Observable<GeneralResponse<res>> {
    let url_ = _base + '/Update?id=${id}`';
    url_ = url_.replace(/[?&]$/, '');
    const options: any = {
      method: 'GET',
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'text/plain',
        'Authorization': 'Bearer ' + localStorage.getItem('Token'),
      }),
      //params: new HttpParams().set('id', id),
    };

    return this.sendRequest(url_, options);
  }

  // GetAll(): Observable<T[]> {
  //   return this._http.get<T[]>(_base)
  // }
  GetAll<res,request>(t?: request): Observable<GeneralResponse<res[]>> {
    let url_ = _base + '/GetAll';
    url_ = url_.replace(/[?&]$/, '');
    const options: RequestInit = {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
        'Authorization': 'Bearer ' + localStorage.getItem('Token'),
      },
     body: JSON.stringify(t),
    };
    return this.sendRequest(url_, options);
  }
  delete<res>(id: string): Observable<GeneralResponse<res>> {
    let url_ = _base + `/SoftDelete?id=${id}`;

    url_ = url_.replace(/[?&]$/, '');
    const options: any = {
      method: 'Post',
      observe: 'response',
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
        Authorization: 'Bearer ' + localStorage.getItem('Token'),
      },
     // params: new HttpParams().set('id', id),

    };
    console.log(options );
    //return this._http.post<GeneralResponse<T>>(url_, options);
    return this.sendRequest(url_, options);
	}
  Rangedelete<res,request>(t: request): Observable<GeneralResponse<res>> {
    let url_ = _base + `/SoftRangeDelete`;
console.log(t);
    url_ = url_.replace(/[?&]$/, '');
    const options: any = {
       method: 'Post',
      // observe: 'response',
      // responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
        Authorization: 'Bearer ' + localStorage.getItem('Token'),
      },
      body: JSON.stringify(t),

    };
    return this.sendRequest(url_, options);
	}

  private sendRequest(url: string, options: RequestInit): Observable<GeneralResponse<any>> {
    return new Observable<GeneralResponse<T>>(observer => {
      fetch(url, options)
        .then(response => response.json())
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}


