import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneralResponse } from 'src/app/Shared/GeneralResponse';
import { environment } from 'src/app/environments/environment.prod';
import {  MenusMainDetailsDropDown, MenusMainDetailsDto } from '../Model/DropDown';
import { TabMenu } from 'primeng/tabmenu';

export const BASE_URL = environment.BaseUrl;
export const Controller ="";
let _base="";
@Injectable({
  providedIn: 'root'
})
export class MenusMainDetailsService {
  private tabDataSubject = new BehaviorSubject<string>('AddressTab');

  constructor(
    protected _http: HttpClient,
  ) {}
  MenusMainDetailsDropDown(Action:string): Observable<GeneralResponse<MenusMainDetailsDropDown[]>> {
    _base=BASE_URL+"/MenusMainDetails/";
    let url_ = _base + Action;

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
  GetAll(): Observable<GeneralResponse<MenusMainDetailsDto[]>> {
    _base=BASE_URL+"/MenusMainDetails/";
     let Id:string|undefined;

//     this.getTabData().subscribe(data => { not work
//        console.log(data)
//       if(data='Country'){
//         Id='9dd922e5-d3d3-45f4-dc6c-08dc2e418a8c';
//       }else if(data='City'){
// Id='d56fdd2f-c29f-4701-dc6a-08dc2e418a8c';
// }else{

//   Id='c0c49786-bd8f-4010-dc6d-08dc2e418a8c';
//       }
//     });
    let url_ = _base + 'GetAll';

    url_ = url_.replace(/[?&]$/, '');
    const options: RequestInit = {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
        'Authorization': 'Bearer ' + localStorage.getItem('Token'),

      },

    };
    return new Observable<GeneralResponse<MenusMainDetailsDto[]>>(observer => {
      fetch(url_, options)
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
  private sendRequest(url: string, options: RequestInit): Observable<GeneralResponse<MenusMainDetailsDropDown[]>> {
    console.log(url);
    return new Observable<GeneralResponse<MenusMainDetailsDropDown[]>>(observer => {
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
  sendTabData(data: string) {
    this.tabDataSubject.next(data);
  }

  getTabData(): Observable<string> {
    return this.tabDataSubject.asObservable();
  }
}
