

import { HttpClient, HttpHeaders, HttpParams, HttpResponseBase } from '@angular/common/http';
import { CrudOperations } from './crud-operations.interface';
import { Injectable, Inject } from '@angular/core';
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

  Add(t: T): Observable<GeneralResponse<T>> {

    let url_ = _base + '/Add';
    url_ = url_.replace(/[?&]$/, '');
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(t),
    };

    return this.sendRequest(url_, options);
  }

  update(t: T): Observable<GeneralResponse<T>> {
    let url_ = _base + '/Update';
    url_ = url_.replace(/[?&]$/, '');
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(t),
    };

    return this.sendRequest(url_, options);
  }

  GetById(id: string): Observable<GeneralResponse<T>> {
    let url_ = _base + '/Update';
    url_ = url_.replace(/[?&]$/, '');
    const options: any = {
      method: 'GET',
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      }),
      params: new HttpParams().set('id', id),
    };

    return this.sendRequest(url_, options);
  }

  // GetAll(): Observable<T[]> {
  //   return this._http.get<T[]>(_base)
  // }
  GetAll(t?: T): Observable<GeneralResponse<T[]>> {
    let url_ = _base + '/GetAll';
    url_ = url_.replace(/[?&]$/, '');
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
     body: JSON.stringify(t),
    };
console.log(options);
    return this.sendRequest(url_, options);
  }
  delete(id: string): Observable<GeneralResponse<T>> {
    let url_ = _base + '/Delete';

    url_ = url_.replace(/[?&]$/, '');
    const options: any = {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      params: new HttpParams().set('id', id),
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


