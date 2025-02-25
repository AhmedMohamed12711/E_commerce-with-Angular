import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Enviroment } from '../../../base/enviroment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private headers: HttpHeaders = new HttpHeaders();
  cartItemNumber = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('userToken');
      if (token) {
        this.headers = new HttpHeaders({ token });
      }
      this.loadCartCount(); 
    }
  }

  
  private loadCartCount() {
    this.getCartProduct().subscribe({
      next: (res) => {
        this.cartItemNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        console.error('Error loading cart count:', err);
      }
    });
  }

  // ✅ إضافة منتج للسلة
  addProductToCart(id: string): Observable<any> {
    return this.http.post(`${Enviroment.baseURL}cart`, { productId: id });
  }

  // ✅ جلب المنتجات من السلة
  getCartProduct(): Observable<any> {
    return this.http.get(`${Enviroment.baseURL}cart`, { headers: this.headers });
  }

  // ✅ تحديث كمية المنتج في السلة
  updateProductInCart(id: string, count: number): Observable<any> {
    return this.http.put(`${Enviroment.baseURL}cart/${id}`, { count: count });
  }

  // ✅ حذف منتج معين من السلة
  deleteProductInCart(id: string): Observable<any> {
    return this.http.delete(`${Enviroment.baseURL}cart/${id}`);
  }

  // ✅ مسح جميع المنتجات من السلة
  clearProductInCart(): Observable<any> {
    return this.http.delete(`${Enviroment.baseURL}cart`).pipe(
      tap(() => {
        this.cartItemNumber.next(0); // تحديث العدد محليًا بعد المسح
      })
    );
  }
  
}
