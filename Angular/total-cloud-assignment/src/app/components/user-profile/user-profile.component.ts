import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input('user') user: any;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  navgateToUserDetail(id) {
    this.router.navigate(['/details'], {queryParams: {userID : id}});
  }

}
