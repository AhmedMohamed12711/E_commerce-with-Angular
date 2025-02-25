import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './Features/layout/auth-layout/auth-layout.component';
import { MainlayoutComponent } from './Features/layout/mainlayout/mainlayout.component';
import { authGuard } from './core/guard/auth/auth.guard';
import { checkTokenGuard } from './core/guard/checkToken/check-token.guard';


export const routes: Routes = [

    // ✅ إعادة توجيه افتراضية
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // LazyLoading for component
    // ✅ صفحات المصادقة (Authentication Pages)
    { 
        path: '', 
        component: AuthLayoutComponent, 
        canActivate: [checkTokenGuard], 
        children: [
            { path: 'forgetPassword', loadComponent: () => import('./Features/auth/rest-password/rest-password.component').then((c) => c.RestPasswordComponent), title: "Reset Password" },
            { path: 'login', loadComponent: () => import('./Features/auth/login/login.component').then((c) => c.LoginComponent), title: "Reset Password" },
            { path: 'signup', loadComponent: () => import('./Features/auth/registeration/registeration.component').then((c) => c.RegisterationComponent), title: "Reset Password" },
        ] 
    },

    // ✅ الصفحات الرئيسية
    { 
        path: '', 
        component: MainlayoutComponent, 
        children: [
            { path: 'home', loadComponent: () => import('./Features/pages/home/home.component').then((c) => c.HomeComponent), title: "Home" },
            { path: 'products', loadComponent: () => import('./Features/pages/products/products.component').then((c) => c.ProductsComponent), title: "Products" },
            { path: 'wishList', loadComponent: () => import('./Features/pages/wish-list/wish-list.component').then((c) => c.WishListComponent), title: "wishList" },
            { path: 'brands', loadComponent: () => import('./Features/pages/brands/brands.component').then((c) => c.BrandsComponent), title: "Brands" },
            { path: 'categories', loadComponent: () => import('./Features/pages/category/category.component').then((c) => c.CategoryComponent), title: "Categories" },
            { path: 'productDetails/:id', loadComponent: () => import('./Features/pages/product-details/product-details.component').then((c) => c.ProductDetailsComponent), title: "Product Details" },
        ] 
    },

    // ✅ الصفحات المحمية بالحارس (Protected Routes)
    { 
        path: '', 
        component: MainlayoutComponent, 
        canActivate: [authGuard], 
        children: [
            { path: 'cart', loadComponent: () => import('./Features/pages/cart/cart.component').then((c) => c.CartComponent), title: "Cart" },
            { path: 'allorders', loadComponent: () => import('./Features/pages/allorders/allorders.component').then((c) => c.AllordersComponent), title: "Cart" },
            { path: 'checkout', loadComponent: () => import('./Features/pages/checkout/checkout.component').then((c) => c.CheckoutComponent), title: "Cart" },
        ] 
    },

    // ✅ صفحة غير موجودة (404)
    { path: '**', loadComponent: () => import('./Features/pages/notfound/notfound.component').then((c) => c.NotfoundComponent ), title: "Page Not Found" },
];
