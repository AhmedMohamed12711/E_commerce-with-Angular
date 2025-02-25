import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from '../../../core/services/payment/payment.service';
import { CartService } from '../../../core/services/carts/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  constructor(private Payment:PaymentService ,private _cart:CartService){}
  id:string=''
  checkoutForm: FormGroup = new FormGroup({
    details: new FormControl(null, [
      Validators.required, 
      Validators.minLength(10), 
      Validators.maxLength(200)
    ]),
    phone: new FormControl(null, [
      Validators.required, 
      Validators.pattern(/^01[0-9]{9}$/) 
    ]),
    city: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ])
  });

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this._cart.getCartProduct().subscribe({
      next:(res)=>{
        this.id = res.data._id
      }
    })
  }

  submiData(){
    if(this.checkoutForm.valid){
      this.Payment.checkoutSession(this.id,this.checkoutForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          
          window.location.href = res.session.url
        }
      })
    }
    
  }
}
