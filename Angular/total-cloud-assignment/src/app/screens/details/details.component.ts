import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileFetchService } from 'src/app/services/user-profile-fetch.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  userData: any;

  constructor(public router: Router, public route: ActivatedRoute, private userProfileFetchService: UserProfileFetchService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.fetchUserDetail(params.userID);
    }
    );
  }

  fetchUserDetail(userID) {
    this.userProfileFetchService.fetchUserDetail(userID).subscribe(res => {
      this.userData = res['data'];
    });
  }
  navigateBackToHome() {
    this.router.navigate(['/home']);
  }

}
