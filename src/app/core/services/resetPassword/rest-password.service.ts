import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/enviroment';
import { Observable } from 'rxjs';
import { Auth } from '../../../shared/interface/auth';

@Injectable({
  providedIn: 'root'
})
export class RestPasswordService {

  constructor(private http:HttpClient) { }

  VerifyEmail(payload:Auth):Observable<any>{
    return this.http.post(`${Enviroment.baseURL}auth/forgotPasswords`,payload)
  }

  VerifyCode(payload:Auth):Observable<any>{
    return this.http.post(`${Enviroment.baseURL}auth/verifyResetCode`,payload)
  }

  VerifyPassword(payload:Auth):Observable<any>{
    return this.http.put(`${Enviroment.baseURL}auth/resetPassword`,payload)
  }


}
