import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { WishListService } from '../../../core/services/wishList/wish-list.service';
import { wishlist } from '../../../shared/interface/wishlist/wishlist';
import { CartService } from '../../../core/services/carts/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {
  constructor(private _WishListService:WishListService,private _cart:CartService,private toastr:ToastrService){}

  productList:WritableSignal<wishlist[]>=signal([])
  ngOnInit(): void {
    this.getWishListProduct();
  }
  addProduct(id: string, event: Event) {
    event.stopPropagation();
    this._cart.addProductToCart(id).subscribe({
      next: (res) => {
        this._cart.cartItemNumber.next(res.numOfCartItems);
        this.toastr.success(res.message,'', {
          timeOut: 3000, // مدة ظهور الرسالة
          progressBar: true, // شريط التحميل
          positionClass: 'toast-top-right', // مكان الرسالة
          closeButton: true, // زر الإغلاق
          easing: 'ease-in', // تأثير الدخول
          easeTime: 300, // مدة التأثير
          tapToDismiss: false // عدم الإخفاء عند الضغط
        });
      }
    });
  }
  getWishListProduct(){
    this._WishListService.getWishListProduct().subscribe({
      next:(res)=>{
        this.productList.set(res.data)
      }
    })
  }

  deleteProductInWishList(id:string){
    this._WishListService.deleteProductInWishList(id).subscribe({
      next:(res)=>{
        this.getWishListProduct();
        this.toastr.success(res.message,'', {
          timeOut: 3000, // مدة ظهور الرسالة
          progressBar: true, // شريط التحميل
          positionClass: 'toast-top-right', // مكان الرسالة
          closeButton: true, // زر الإغلاق
          easing: 'ease-in', // تأثير الدخول
          easeTime: 300, // مدة التأثير
          tapToDismiss: false // عدم الإخفاء عند الضغط
        });
      }
    })
  }
}
