import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from "../../../models/user";
import { UserService } from '../../../services/user/user.service';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, AbstractControl } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

declare var $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})



export class SignupComponent implements OnInit {

  userForm: FormGroup;
  

  
  

  constructor(private _userService:UserService, private _router:Router) { 
    
   }

  first_name:string;
  last_name:string;
  email:string;
  mobile_number:number;
  dob:Date;
  gender:string;
  user_name:string;
  password:string;
  confirm_password:string;
  disabled :boolean =  false;

  genders = [
    { value:"Female"},
    { value:"Male"},
    { value:"Other"}
  ]

  signUpFnc(myForm){
    console.log(myForm.value);
    let udet = myForm.value;
    console.log(udet['first_name'])
     this._userService.signup(udet,udet['password']);
  }

  emailcom(data)
  {
    let email = data.value as string;
    if(email.endsWith(".com") || email.endsWith(".in")) {
      return null;      
    } else {
      return {
        "emailcom": true
      }
    }

  }
  
  
  ngOnInit() {
    this.userForm = new FormGroup({
      'first_name': new FormControl(null, Validators.required),
      'last_name': new FormControl(null, Validators.required),
      'user_name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'mobile_number': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'dob': new FormControl(null),
      'gender': new FormControl(null),
      'confirm_password': new FormControl(null,Validators.required),
      'agreementRead' : new FormControl('',this.validateTermsAndCondition.bind(this))
    });
    
  }


  // passmatch(control:AbstractControl)
  // {
  //   console.log(control.value);
  //   return control.value==this.userForm.get('password').value?null:{pwd:true}
  // // return this.userForm.value.password == data.value ? null : { "passmatch" : true};

  // }
  isPassword : boolean = false;
  checkPassword(){
    this.isPassword = (this.userForm.get('password').value == this.userForm.get('confirm_password').value);
    if(this.isPassword)
      {
        //console.log("this.isPassword if:::: ",this.isPassword)
        this.isPassword = false;
      }
      else{
        //console.log("this.isPassword else:::: ",this.isPassword)
        this.isPassword = true;
      }
  }

  validateTermsAndCondition(control : AbstractControl){
    if (!control.value){
      return { readAgreement : true}
    }
    return null;
  }
  


  startDate = new Date(1990, 0, 1);

  backtohome(){
    this._router.navigate(['home/login']);
  }

}



