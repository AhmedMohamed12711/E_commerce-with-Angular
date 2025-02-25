import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-registeration',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './registeration.component.html',
  styleUrl: './registeration.component.scss'
})
export class RegisterationComponent {
  constructor(private _Auth:AuthService,private router:Router){}
  
  errMsg:string=''
  isLoading:boolean=false
  registerForm:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.minLength(3),Validators.maxLength(10),Validators.required]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{6,}$/)]),
    rePassword:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },this.ConfirmPassword)
  
  ConfirmPassword(group:AbstractControl){
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    if(password === rePassword){
      return null
    }
    else{
      return {mismatch:true}
    }
  }

  SubmitForm(){
    this.isLoading=true;
    //send data to api
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
    }
    else{
      this._Auth.Register(this.registerForm.value).subscribe({
        next:(res)=>{
          this.isLoading=false;
          if(res.message=="success"){
            this.router.navigate(['/login'])
          }
          
        },
        error:(err)=>{
          this.isLoading=false
          this.errMsg=err.error.message;
        }
      })  
    }
    }
    // if(this.registerForm.valid){}
  
      
}
