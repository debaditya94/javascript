import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  user:string= sessionStorage.loggedInUser;
  constructor(private _router : Router) { }

  ngOnInit() {
  }

  logOut(){
    console.log("logout")
    sessionStorage.loggedInUser= null;
    sessionStorage.portfolio_key= null;
    this._router.navigate(['/']);
  }

}
