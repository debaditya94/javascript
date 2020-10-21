import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileFetchService } from '../../services/user-profile-fetch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userList;

  constructor(private userProfileFetchService:UserProfileFetchService, public router: Router) {
    this.userList = [];
   }

  ngOnInit(): void {
    this.fetchUserList();
  }

  fetchUserList() {
    this.userProfileFetchService.fetchUsersList().subscribe(res => {
        this.userList = res['data']; 
      });
  }
  navigateToUserDetail(user) {
    this.router.navigate(['/details'], {queryParams: {userID : user.id}});
  }

}
