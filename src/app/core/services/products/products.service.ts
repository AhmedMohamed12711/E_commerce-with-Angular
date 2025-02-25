import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getProduct():Observable<any>{
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  getSpacificProduct(id:string):Observable<any>{
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }


}
