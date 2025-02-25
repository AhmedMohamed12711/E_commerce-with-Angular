import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../../../shared/interface/auth';
import { JwtPayload, jwtDecode } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  userDate:WritableSignal<any>=signal(null);


  constructor(private _http:HttpClient,@Inject (PLATFORM_ID) Id:object,private router:Router) {
    if(isPlatformBrowser(Id)){
      if(localStorage.getItem('userToken') !== null){
        this.decodeUserData();
      }

    }
  }

  Register(formData:Auth):Observable<any>{
    return this._http.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,formData)
  }
  Login(formData:Auth):Observable<any>{
    return this._http.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,formData)
  }

  decodeUserData(){
    const token = localStorage.getItem('userToken');//data
    if(token){
      const decoded = jwtDecode(token);
      this.userDate.set(decoded);      
    }
  }

  logout(){
    //remove token from localstorage
    // userDate == null
    //navigate to login
    localStorage.removeItem('userToken');
    this.userDate.set(null);
    this.router.navigate(['/login'])
  }
}
