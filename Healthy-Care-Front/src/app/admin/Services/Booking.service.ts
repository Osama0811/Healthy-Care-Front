import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse } from 'src/app/Shared/GeneralResponse';
import { environment } from 'src/app/environments/environment.prod';
import { DropDownModel, Booking_X_RayDropDown } from '../Model/DropDown';

export const BASE_URL = environment.BaseUrl;
export const Controller ="";
let _base="";
@Injectable({
  providedIn: 'root'
})
export class BookingService {


  constructor(
    protected _http: HttpClient,
  ) {}
  Booking_X_RayDropDown(): Observable<GeneralResponse<Booking_X_RayDropDown[]>> {
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
    return this.sendRequest(url_, options);
  }
  private sendRequest(url: string, options: RequestInit): Observable<GeneralResponse<Booking_X_RayDropDown[]>> {
    console.log(url);
    return new Observable<GeneralResponse<Booking_X_RayDropDown[]>>(observer => {
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
