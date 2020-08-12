import { Iinvestor } from './../../../models/innovHelp/investor';
import { element } from 'protractor';
import { IStartup } from './../../../models/innovHelp/startup';
import { InvestorService } from './../../../services/investor-service/investor.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IPitchedStartup } from '../../../models/innovHelp/investor';

@Component({
  selector: 'app-pitched-startups',
  templateUrl: './pitched-startups.component.html',
  styleUrls: ['./pitched-startups.component.css']
})
export class PitchedStartupsComponent implements OnInit {
 
 
  pitchedStartups : IPitchedStartup[] = [];
  startups : IStartup[] = [];
  investor : Iinvestor;

  constructor(private _investorService : InvestorService) { }

  ngOnInit() {
    this.investor = this._investorService.investor;
    if (!this.investor) {
      this._investorService.getInvestorDetails(sessionStorage.investor_id);
      this._investorService.investorDetails.subscribe(snapshot=>{this.investor = snapshot; 
        this.getPitchedStartups()
    })
  }
  else{
    this.getPitchedStartups()
  }
    

  }

  getPitchedStartups(){
    this._investorService.getPitchedStartups(this.investor["$key"]).subscribe(
      (snapshot)=>{
        this.pitchedStartups = snapshot
        this.getStartupDetails()
        
      },
      (error)=>console.log(error),
    )
  }

  getStartupDetails(){
    this.pitchedStartups.forEach(element=>
      this._investorService.getStartupById(element["startup_key"]).subscribe(
        (snapshot)=>{
          this.startups.push(snapshot)
          console.log(this.startups)
        },
        (error)=>console.log(error)
      )
    )
  }

  ignoreStartup(pitchedStartup : IPitchedStartup,index){
    this._investorService.removePitchedStartup(pitchedStartup)
    this.startups.splice(index,1);
    this.pitchedStartups.splice(index,1);
  }

  

}
