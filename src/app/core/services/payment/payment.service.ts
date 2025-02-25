import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Enviroment } from '../../../base/enviroment';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { Payment } from '../../../shared/interface/payment/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private http:HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {44
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('userToken');
      if (token) {
        this.headers = new HttpHeaders({ token });
      }
    }
  }

  checkoutSession(id:string,formData:Payment):Observable<any>{
      return this.http.post(`${Enviroment.baseURL}orders/checkout-session/${id}?url=http://localhost:4200`,
    {
      shippingAddress:formData
    },{
      headers:this.headers
    })
  }

  createCashOrder(id:string,formData:Payment):Observable<any>{
    return this.http.post(`${Enviroment.baseURL}orders/${id}`,{shippingAddress:formData})
  }

  getAllOrder():Observable<any>{
    return this.http.get(`${Enviroment.baseURL}orders`)
  }
  getUserOrder(id:string):Observable<any>{
    return this.http.get(`${Enviroment.baseURL}orders/user/${id}`)
  }
}
