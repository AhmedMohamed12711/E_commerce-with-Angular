import { Component, OnInit, PLATFORM_ID, WritableSignal, inject, signal } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { Products } from '../../../shared/interface/products/products';
import { CommonModule, CurrencyPipe, NgIf, isPlatformBrowser } from '@angular/common';
import { OnsalePipe } from '../../../shared/pipe/onsale.pipe';
import { FilterPipe } from '../../../shared/pipe/filter.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/carts/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../core/services/wishList/wish-list.service';

@Component({
  selector: 'app-products',
  imports: [NgIf,CurrencyPipe,OnsalePipe,FilterPipe,FormsModule,RouterLink,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  searchValue:string=''
  private platformId = inject(PLATFORM_ID);
  constructor(private _ProductsService:ProductsService,private _cart:CartService,private toastr: ToastrService,private _WishListService:WishListService){}
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      this.getAllProducts();
    }
  }
  productList:WritableSignal<Products[]> = signal([])
  isLoading: boolean = true; 

  getAllProducts(){
    this._ProductsService.getProduct().subscribe({
      next:(res)=>{        
        this.productList.set(res.data)
        this.isLoading=false;
      }
    })
  }
  likedProducts: { [key: string]: boolean } = {};

  toggleLike(productId: string, event: Event) {
      event.stopPropagation(); 
      this.likedProducts[productId] = !this.likedProducts[productId];
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
  

  AddToWishlist(id:string){
    this._WishListService.addToWishList(id).subscribe({
      next:(res)=>{console.log(res);
        this.toastr.success(res.message, '✔️ Added to wishList!', {
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
