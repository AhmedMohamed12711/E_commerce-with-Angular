import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,NgIf,RouterLink],
templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private _Auth:AuthService,private router:Router){}
  
  showForgetPassword: boolean = false; 
  errMsg:string=''
  isLoading:boolean=false
  
  loginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required]),
  })
  
  SubmitForm() {
    this.isLoading = true;
    this.showForgetPassword = false; // إخفاء الرابط عند بدء المحاولة الجديدة

    if (this.loginForm.valid) {
      this._Auth.Login(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.message === "success") {
            this.router.navigate(['/home']);
            localStorage.setItem('userToken', res.token);
            this._Auth.decodeUserData();
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errMsg = err.error.message;
          
          // إذا كان الخطأ متعلقًا بكلمة المرور، إظهار "نسيت كلمة المرور"
          if (this.errMsg.toLowerCase().includes('password')) {
            this.showForgetPassword = true;
          }
        }
      });
    }
  }
}
