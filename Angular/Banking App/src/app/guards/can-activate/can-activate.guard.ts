import { Router } from '@angular/router';
import { UserService } from './../../services/user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CanActivateGuard implements CanActivate,CanActivateChild {
 

  

  constructor(private _userService : UserService,private _router : Router){}

  canActivate(){

    if (sessionStorage.loggedInUser && sessionStorage.loggedInUser!='null') {
      console.log("user logged in",sessionStorage.loggedInUser)
      return true;
    } else {
      console.log("user not logged",sessionStorage.loggedInUser)
      alert("Login Required")
      this._router.navigate(['/home']);
      return false;
    }

    // if(!sessionStorage.loggedInuser || sessionStorage.loggedInUser==="null"){
    //   console.log("user not logged",sessionStorage.loggedInUser)
    //   alert("Login Required")
    //   this._router.navigate(['/home']);
    //   return false;
    // }
      
    // else{
    //   console.log("user logged in",sessionStorage.loggedInUser)
    //   return true;
      
    // }
      
  }

  canActivateChild(){
    if(sessionStorage.loggedInUser==="null"){
      console.log("user not logged",sessionStorage.loggedInUser)
      return false;
    }
      
    else{
      console.log("user logged in",sessionStorage.loggedInUser)
      return true;
      
    }
  }
}
