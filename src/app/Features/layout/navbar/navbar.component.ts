import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartService } from '../../../core/services/carts/cart.service';
import { CommonModule, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive, RouterLink, NgIf, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'] // ✅ تصحيح الاسم
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen: boolean = false;
  isLogin: boolean = false;
  cartNumber: number = 0;
  private subscriptions: Subscription = new Subscription(); // ✅ لإدارة الاشتراكات

  constructor(public _AuthService: AuthService, private _cart: CartService) {}

  ngOnInit(): void {
    // ✅ الاشتراك في عدد عناصر السلة
    this.subscriptions.add(
      this._cart.cartItemNumber.subscribe((res) => {
        this.cartNumber = res;
      })
    );

    // ✅ تحديث حالة تسجيل الدخول
    this.isLogin = this._AuthService.userDate() !== null;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // ✅ تفادي memory leaks
  }
}
