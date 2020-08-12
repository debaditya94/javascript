import { IInvestmentDetails } from './../innov-start-up-sign-up/models/innovHelp/investmentDetails';
import { element } from 'protractor';
import { IStartup, IInvestment } from './../../../models/innovHelp/startup';
import { Iinvestor } from './../../../models/innovHelp/investor';
import { InvestorService } from './../../../services/investor-service/investor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-investor-investments',
  templateUrl: './investor-investments.component.html',
  styleUrls: ['./investor-investments.component.css']
})
export class InvestorInvestmentsComponent implements OnInit {

  investor : Iinvestor;
  startups : IStartup[] = [];
  isStartupPresent:boolean = false;
  investmentDetails : IInvestmentDetails[] = [];
  constructor(private _investorService : InvestorService) { }

  ngOnInit() {

    // this._investorService.getInvestorDetails(sessionStorage.investor_id);
    // this._investorService.investorDetails.subscribe(
    //   (snapshot)=>{ 
    //                 this.investor = snapshot;
    //                 this.initMyInvestments();
    //               }
    // )
    // this._investorService.getInvestor("0").subscribe(snapshot=>{this.investor = snapshot
    //   this.initMyInvestments();
    // });
    this.investor = this._investorService.investor;
    if (this.investor) {
      this.initMyInvestments();
    }
    else{
      this._investorService.getInvestorDetails(sessionStorage.investor_id);
      this._investorService.investorDetails.subscribe(snapshot=>{this.investor = snapshot;
        this.initMyInvestments();
      })
       
    }
    
  }

  initMyInvestments(){
    // if (this.investor.investments) {
    //   Object.keys(this.investor.investments).forEach(element=>{
    //     console.log(element);
    //     this._investorService.getInvestorInvestmentDetails(element)
    //     // .subscribe(snapshot=>{console.log(snapshot)
    //     // this.startups.push(snapshot);
    //     // console.log(this.startups);
        
    //     // })
    //   })
    // }
    this.investor.investments = [];
    this.startups = [];
    this._investorService.getInvestmentsOfInvestor().subscribe(snapshot=>{snapshot.forEach((element,index)=>{
    if (element["investor_id"]==this.investor["$key"]) {
      this.investmentDetails.push(element);
      console.log(element)
      this._investorService.getStartupById(element["startup_id"]).subscribe((snapshot)=>{
        
        this.startups.push(snapshot);
        this.isStartupPresent = true;
      })
        /*this.investor.investments.push(element);
        this.startups.push(element[index]);*/
        console.log(this.investmentDetails)
      }
    })
    // console.log("investor investments ",this.startups );
  }
  )
  
  }

}
