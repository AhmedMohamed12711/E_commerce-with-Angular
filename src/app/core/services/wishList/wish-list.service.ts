import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from '../../../base/enviroment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private  http:HttpClient ) { }


  addToWishList(id:string):Observable<any>{
    return this.http.post(`${Enviroment.baseURL}wishlist`,{ productId: id })
  }

  getWishListProduct():Observable<any>{
    return this.http.get(`${Enviroment.baseURL}wishlist`)
  }

  deleteProductInWishList(id:string):Observable<any>{
    return this.http.delete(`${Enviroment.baseURL}wishlist/${id}`)
  }
}
