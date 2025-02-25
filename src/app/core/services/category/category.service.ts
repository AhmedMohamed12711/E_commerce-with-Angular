import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from '../../../base/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getAllCategory():Observable<any>{
    return this.http.get(`${Enviroment.baseURL}categories`)
  }


  getAllSubcategoryOncategory(id:string):Observable<any>{
    return this.http.get(`${Enviroment.baseURL}categories/${id}/subcategories`)
  }
}
