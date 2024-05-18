import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.prod';
import { EnumModel } from '../Model/DropDown';
export const BASE_URL = environment.BaseUrl;
export const Controller ="";
let _base="";
@Injectable({
  providedIn: 'root'
})
export class EnumService {

  constructor(
    protected _http: HttpClient,
  ) { }
  GetEnumDropDown(Action:string): Observable<EnumModel[]> {
    _base=BASE_URL+"/Enum";
    let url_ = _base + '/'+Action;

    url_ = url_.replace(/[?&]$/, '');
    const options: RequestInit = {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
        'Authorization': 'Bearer ' + localStorage.getItem('Token'),
      },

    };
    return this.sendRequest(url_, options);
  }
  private sendRequest(url: string, options: RequestInit): Observable<EnumModel[]> {
    console.log(url);
    return new Observable<EnumModel[]>(observer => {
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
