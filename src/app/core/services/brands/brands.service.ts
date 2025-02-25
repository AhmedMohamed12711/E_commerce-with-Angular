import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from '../../../base/enviroment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http:HttpClient) {}

  getAllBrands():Observable<any>{
    return this.http.get(`${Enviroment.baseURL}brands`)
  }
}
