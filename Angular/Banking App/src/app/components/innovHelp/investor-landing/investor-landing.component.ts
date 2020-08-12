import { UserService } from './../../../services/user/user.service';
import { element } from 'protractor';
import { Iinvestor } from './../../../models/innovHelp/investor';
import { InvestorService } from './../../../services/investor-service/investor.service';
import { RouterModule, Router } from '@angular/router';
import { FirebaseServiceService } from './../../../services/firebase-service/firebase-service.service';
import { IStartup } from './../../../models/innovHelp/startup';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-investor-landing',
  templateUrl: './investor-landing.component.html',
  styleUrls: ['./investor-landing.component.css']
})
export class InvestorLandingComponent implements OnInit {
  // startups :IStartup[];
  // investor : Iinvestor;
  // panelOpenState: boolean = false;
  // ngAfterViewInit(): void {
  //   this._investorService.getInvestorByUsername(sessionStorage.loggedInUser);
  //   this._investorService.investorDetails
  //   .map(snapshot=>
  //   // this.investor = snapshot
  //   {return snapshot}
  //    )
  //   .subscribe((snapshot)=>{
  //   this.investor = snapshot;
  //   console.log("investor landing investor : " ,this.investor);
      
  //   this._firebaseService.getStartups()
  //   .map((res)=>
  //   // this.startups = res
  //   {return res}
  //   )
  //   .subscribe(snapshot=>{
  //     this.startups = snapshot
  //     console.log(this.startups);
  //     });
  //   })
  // }

  startups: IStartup[];
  isStartupDetails: boolean = false;
  detailedStartup: IStartup;
  investor: Iinvestor;
  no_of_investments: number = 0;
  panelOpenState: boolean = false;
  progress:boolean = true;
  color = 'primary';
  mode = 'indeterminate';

  constructor(private _firebaseService: FirebaseServiceService, private _router: Router, private _investorService: InvestorService,private _user : UserService) { }

  ngOnInit() {

    // this.investor = this._investorService.investor;
    // if (!this.investor) {
    //   this._investorService.getInvestorDetails(sessionStorage.investor_id);
    //   this._investorService.investorDetails.subscribe((res) => {
    //     this.investor = res;
    //     console.log("investor landing investor",this.investor);
    //   })
    //   console.log(sessionStorage.investor_id)
    // }
    this._investorService.getInvestorByInvestorId(sessionStorage.investor_id)
                          .subscribe(res=>{
                            this.investor = res
                            this._investorService.investor = res;
                            this.progress = false;
                            })


    
              // this.no_of_investments = this._investorService.getTotalInvestorInvestments();
      // this._firebaseService.getStartups().map(res => {
      //   this.startups = res;
      //   return res;
      // }).subscribe(snapshot => {
      //   console.log(this.startups);
      // });
    // this._investorService.getInvestorByUsername(sessionStorage.loggedInUser);
    // this._investorService.investorDetails.subscribe((snapshot)=>{
    // this.investor = snapshot;
    // this.no_of_investments = this._investorService.getTotalInvestorInvestments();
    // console.log("investor landing investor : " ,this.investor);
      
    // this._firebaseService.getStartups().subscribe(snapshot=>{this.startups = snapshot
    //   console.log(this.startups);
    //   });
    // })

    //  this._investorService.getInvestor("0").subscribe((snapshot)=>{this.investor = snapshot
    //   console.log(this.investor);
    //   this.no_of_investments = this._investorService.getTotalInvestorInvestments();
    // });
  }

  investInStartup(startup: IStartup) {

  }

  logoutInvestor(){
    // this._investorService.investor = undefined;
    this._user.logout();
  }
}
