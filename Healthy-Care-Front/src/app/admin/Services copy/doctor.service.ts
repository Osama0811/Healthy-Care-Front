import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse } from 'src/app/Shared/GeneralResponse';
import { environment } from 'src/app/environments/environment.prod';
import { DropDownModel, DoctorDropDown } from '../Model/DropDown';

export const BASE_URL = environment.BaseUrl;
export const Controller ="";
let _base="";
@Injectable({
  providedIn: 'root'
})
export class DoctorService {


  constructor(
    protected _http: HttpClient,
  ) {}
  DoctorDropDown(): Observable<GeneralResponse<DoctorDropDown[]>> {
    _base=BASE_URL+"/Doctor";
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
    return this.sendRequest(url_, options);
  }
  private sendRequest(url: string, options: RequestInit): Observable<GeneralResponse<DoctorDropDown[]>> {
    console.log(url);
    return new Observable<GeneralResponse<DoctorDropDown[]>>(observer => {
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
