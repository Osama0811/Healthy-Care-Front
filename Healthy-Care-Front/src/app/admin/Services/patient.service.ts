import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse } from 'src/app/Shared/GeneralResponse';
import { environment } from 'src/app/environments/environment.prod';
import { DropDownModel, PatientDropDown, PatientHistoryInfo } from '../Model/DropDown';

export const BASE_URL = environment.BaseUrl;
export const Controller ="";
let _base="";
@Injectable({
  providedIn: 'root'
})
export class PatientService {


  constructor(
    protected _http: HttpClient,
  ) {}
  PatientDropDown(): Observable<GeneralResponse<PatientDropDown[]>> {
    _base=BASE_URL+"/Patient";
    let url_ = _base + '/GetAll';

    url_ = url_.replace(/[?&]$/, '');
    const options: RequestInit = {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
        'Authorization': 'Bearer ' + localStorage.getItem('Token'),
      },

    };
    return this.sendRequest<PatientDropDown>(url_, options);
  }

  GetUserInfo(PatientId:string): Observable<GeneralResponse<PatientHistoryInfo[]>> {
    _base=BASE_URL+"/Auth";
    let url_ = _base +  `/GetUserInfo?PatientId=${PatientId}`;
console.log(url_)
    url_ = url_.replace(/[?&]$/, '');
    console.log(url_)
    const options: RequestInit = {
      method: 'GET',

      headers: {
        
        'Content-Type': 'application/json',
        Accept: 'text/plain'
      },

    };
    return this.sendRequest<PatientHistoryInfo>(url_, options);
  }
  private sendRequest<T>(url: string, options: RequestInit): Observable<GeneralResponse<T[]>> {
    console.log(url);
    return new Observable<GeneralResponse<T[]>>(observer => {
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
