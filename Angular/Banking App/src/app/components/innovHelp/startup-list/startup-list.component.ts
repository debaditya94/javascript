import { IStartup } from './../../../models/innovHelp/startup';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from "../../../services/firebase-service/firebase-service.service";
import { InvestorService } from "../../../services/investor-service/investor.service";
import { Iinvestor } from "../../../models/innovHelp/investor";

@Component({
  selector: 'app-startup-list',
  templateUrl: './startup-list.component.html',
  styleUrls: ['./startup-list.component.css']
})
export class StartupListComponent implements OnInit {

  startups: IStartup[];
  isStartupDetails: boolean = false;
  detailedStartup: IStartup;
  investor: Iinvestor;
  no_of_investments: number = 0;
  followingStartups: string[] = [];

  constructor(private _firebaseService: FirebaseServiceService, private _router: Router, private _investorService: InvestorService) { }

  ngOnInit() {

    // this._investorService.getInvestorByUsername(sessionStorage.loggedInUser);
    // this.investor = this._investorService.investor
    // this._investorService.investorDetails.subscribe((snapshot)=>{
    //   console.log("snapshot",snapshot)
    // this.investor = snapshot;
    // this.no_of_investments = this._investorService.getTotalInvestorInvestments();
    // console.log("startup list investor : " ,this.investor);

    // this.no_of_investments = this._investorService.getTotalInvestorInvestments();
    // // this._firebaseService.getStartups().subscribe(snapshot=>{this.startups = snapshot
    // //   console.log(this.startups);
    // //   });
    // })

    console.log("ngonit ");
    this._investorService.getInvestorDetails(sessionStorage.investor_id);
    this._investorService.investorDetails.subscribe((res) => {
      this.investor = res;
      if (this.investor.following) {
        //console.log(Object.keys(this.investor.following));
      }

       
      
    })
    this._firebaseService.getStartups().subscribe(snapshot => {
      this.startups = snapshot;
        //console.log(this.startups);
        //console.log(this.investor);
        // if (this.investor.following) {
        //   Object.keys(this.investor.following).forEach((ele, i) => {
        //     this.followingStartups.push(this.investor.following[ele]);
        //   })
        // }

      });     

    //  this._investorService.getInvestor("0").subscribe((snapshot)=>{this.investor = snapshot
    //   console.log(this.investor);
    // });

  }

  showDetails(startup: IStartup) {
    this._router.navigate(['/investorLanding/startupDetails', startup["$key"]]);
  }

  investInStartup(startup: IStartup) {
    //console.log(startup["$key"]);
    this._router.navigate(['/investorLanding/investment', startup["$key"]]);
    // this._investorService.investInStartup(startup);
  }

  followUnfollow(startup: IStartup, follow: boolean) {
    //console.log("following unfollowing startup : ", startup);
    // if (follow) {
    //   if (this._investorService.followStartup(this.investor, startup)) {
    //     //console.log("successfully following");
    //     this.followingStartups.push(startup["$key"]);
     
      
    // } else {
    //   this._investorService.unfollowStartup(this.investor,startup); 
    //     console.log("successfully infollowed");
    //     // this._investorService.getInvestorFollowing(this.inv  estor["$key"]).subscribe(

    //     // )
    //     this.followingStartups.push(startup["$key"]);
    //   } 
    // } 
  }
}
