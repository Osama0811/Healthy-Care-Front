import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ILoginRequest, ILoginResponse, LoginRequest, LoginResponse } from '../Interfaces/auth';
import { environment } from 'src/app/environments/environment.prod';
import { Observable } from 'rxjs';
import { GeneralResponse } from 'src/app/Shared/GeneralResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOption;
  private baseUrl = `${environment.BaseUrl}`;


  constructor(private http: HttpClient) {

     this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      }),
    };
  }



  login(Input: ILoginRequest):Observable<GeneralResponse<LoginResponse>> {
   debugger;
      return this.http.post<GeneralResponse<LoginResponse>>(`${this.baseUrl}/Auth/Login`,JSON.stringify(Input) ,this.httpOption);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('Token');
    return !!token;
  }
  // login(LoginReq: ILoginRequest): Observable<ILoginResponse> {
  //   return this.http.get<ILoginResponse>(`${this.baseUrl}?nationalNum=${email}`);
  // }

}
