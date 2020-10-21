import { Component, OnInit } from '@angular/core';
import { UserProfileFetchService } from '../../services/user-profile-fetch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userList:[];
  
  constructor(private userProfileFetchService:UserProfileFetchService) {
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

  onSortOrderChanged(sortBy) {
    this.sortUsers(sortBy);
  }
  sortUsers(property) {
    this.userList.sort((a, b) => {
      if(a[property] < b[property]) return -1;
      else if (a[property] > b[property]) return 1;
      else return 0;
    });
  }

}
