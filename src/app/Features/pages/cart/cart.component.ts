import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/carts/cart.service';
import { Product2 ,Data} from '../../../shared/interface/cart/carts';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [NgIf,RouterLink],
templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  constructor(private _cart:CartService){}
  cartItems!:Data
  productList:Product2[]=[]
  ngOnInit(): void {
    this.getCartProductItems();
  }
  getCartProductItems(){
    this._cart.getCartProduct().subscribe({
      next:(res)=>{
        this._cart.cartItemNumber.next(res.numOfCartItems)        
        this.cartItems=res.data
        this.productList=res.data.products
      }
    })
  }

  updateProduct(id: string, count: number) {
    if (count <= 0) {
      this.deleteProduct(id);
      return;
    }
  
    // تحديث السعر والكمية محليًا قبل إرسال الطلب
    const productIndex = this.productList.findIndex((item) => item.product._id === id);
    if (productIndex !== -1) {
      const product = this.productList[productIndex];
      const pricePerUnit = product.price / product.count;
      product.count = count;
      product.price = pricePerUnit * count;
      this.cartItems.totalCartPrice = this.productList.reduce((total, p) => total + p.price, 0);
    }
  
    this._cart.updateProductInCart(id, count).subscribe({
      next: (res) => {
        this._cart.cartItemNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        console.error("Error updating product:", err);
      }
    });
  }
  

  deleteProduct(id:string){
    this._cart .deleteProductInCart(id).subscribe({
      next:(res)=>{
        this._cart.cartItemNumber.next(res.numOfCartItems)
        this.cartItems=res.data
        this.productList=res.data.products
      }
    })
  }

  clearProduct() {
    this._cart.clearProductInCart().subscribe({
      next: () => {
        this._cart.cartItemNumber.next(0); 
        this.cartItems.totalCartPrice = 0;
        this.productList = []; 
      },
      error: (err) => {
        console.error("Error clearing cart:", err);
      }
    });
  }
  
  
}
