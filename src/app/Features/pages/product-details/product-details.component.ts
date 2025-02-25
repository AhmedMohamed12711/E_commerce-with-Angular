import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { Products } from '../../../shared/interface/products/products';
import { CurrencyPipe, NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { CartService } from '../../../core/services/carts/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  imports: [CurrencyPipe, NgIf, CarouselModule, NgFor]
})
export class ProductDetailsComponent implements OnInit {
  id: string = '';  
  productDetails!: Products; 
  isBrowser: boolean;
  isLoading: boolean = true; 

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: any,
    private _cart: CartService,
    private toastr: ToastrService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) { 
      this.activatedRoute.params.subscribe(params => {
        this.id = params['id'];
        if (this.id) {
          this.getSpecificProduct();
        }
      });
    }
  }

  getSpecificProduct(): void {
    this.isLoading = true;
    this.productService.getSpacificProduct(this.id).subscribe({
      next: (res) => {
        if (res && res.data) {
          this.productDetails = res.data;

          this.productDetails.images = this.productDetails.images || [];

          // console.log(this.productDetails.images);
        } else {
          // console.error('No product data received');
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching product details:', err);
        this.isLoading = false;
      }
    });
  }

  addProduct(id: string, event: Event) {
    event.stopPropagation();
    this._cart.addProductToCart(id).subscribe({
      next: (res) => {
        this._cart.cartItemNumber.next(res.numOfCartItems);
        this.toastr.success(res.message, '', {
          timeOut: 5000, 
          progressBar: true, 
          positionClass: 'toast-top-right', 
          closeButton: true, 
          easing: 'ease-in', 
          easeTime: 300, 
          tapToDismiss: false 
        });
      }
    });
  }

customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: true,
  navSpeed: 700,
  autoWidth: true,
  responsive: {
    0: {
      items: 1
    }
  },
  nav: false
};

}
