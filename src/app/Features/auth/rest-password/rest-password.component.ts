import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RestPasswordService } from '../../../core/services/resetPassword/rest-password.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.component.html',
  imports:[ReactiveFormsModule,NgIf],
  styleUrl: './rest-password.component.scss'
})
export class RestPasswordComponent {


  constructor(private _RestPasswordService:RestPasswordService,private toster:ToastrService,private _Auth:AuthService,private router:Router){}
  
  step: number = 1; // لمتابعة حالة الخطوات

  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\d{6}$/) // يجب أن يكون 6 أرقام فقط
    ])
  });

  verifyPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/) // تحقق من قوة الباسورد
    ])
  });

  // الانتقال إلى الخطوة التالية
  nextStep() {
    if (this.step < 3) this.step++;
  }

  // العودة إلى الخطوة السابقة
  prevStep() {
    if (this.step > 1) this.step--;
  }

  // إرسال البيانات
  submitData() {
    if (this.step === 1 && this.verifyEmail.valid) {
      console.log('Email Sent:', this.verifyEmail.value);
      this._RestPasswordService.VerifyEmail(this.verifyEmail.value).subscribe({
        next:(res)=>{
          if(res.statusMsg == "success"){
            this.nextStep();
            this.toster.success(res.message,'',{
              timeOut: 3000, 
              progressBar: true, 
              positionClass: 'toast-top-right',
              closeButton: true,
              easing: 'ease-in', 
              easeTime: 300, 
              tapToDismiss: false
            })
          }
        },error:(err)=>{
          this.toster.error(err,'',{
            timeOut: 3000, 
              progressBar: true, 
              positionClass: 'toast-top-right',
              closeButton: true,
              easing: 'ease-in', 
              easeTime: 300, 
              tapToDismiss: false 
          })
        }
      })
    } else if (this.step === 2 && this.verifyCode.valid) {
      console.log('Code Verified:', this.verifyCode.value);
      this._RestPasswordService.VerifyCode(this.verifyCode.value).subscribe({
        next:(res)=>{
          if(res.status == "Success"){
            this.nextStep();
          }
        }
      })
    } else if (this.step === 3 && this.verifyPassword.valid) {
      console.log('Password Reset:', this.verifyPassword.value);
      this._RestPasswordService.VerifyPassword(this.verifyPassword.value).subscribe({
        next:(res)=>{
          if(res.token){
            localStorage.setItem('userToken',res.token);
            this._Auth.decodeUserData()
            alert('Password Reset Successfully!');
            this.router.navigate(['/home'])
          }
        }
      })
    }
  }
}



