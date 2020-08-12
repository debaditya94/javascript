import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { IInvestmentDetails } from './../../../models/innovHelp/investmentDetails';
import { Account } from './../../../models/account';
import { User } from './../../../models/user';
import { Iinvestor } from './../../../models/innovHelp/investor';
import { InvestorService } from './../../../services/investor-service/investor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IStartup } from './../../../models/innovHelp/startup';
import { FormGroup, FormControl, Validators,AbstractControl } from '@angular/forms';
import { Component, OnInit, Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
  selector: 'app-investment-agreement',
  templateUrl: './investment-agreement.component.html',
  styleUrls: ['./investment-agreement.component.css']
})
export class InvestmentAgreementComponent implements OnInit,AfterViewInit {
  ngAfterViewInit(): void {
    this.initInvestmentForm();
  }

  investmentForm : FormGroup;
  startup : IStartup;
  investor : Iinvestor;
  investor_profile : User;
  investor_acc : Account={
    account_no:0,
    account_type:"",
    balance:0
  };
  startup_acc : Account={
    account_no:0,
    account_type:"",
    balance:0
  };;
  investmentDetails : IInvestmentDetails;
  isSuccess : boolean = false;
  isAccounts : number = 0;
  constructor(private _activatedRoute : ActivatedRoute,
    private _investorService : InvestorService,
    public dialog: MatDialog,private _router : Router,
    private _snack:MatSnackBar  
  ) { }

  ngOnInit() {
    this.initInvestmentForm();
    this._activatedRoute.params.subscribe(param=>this._investorService.getStartupById(param["id"]).subscribe(snapshot=>{
      this.startup = snapshot;
      console.log(snapshot)
      this.getStartupAccountDetails();
    }));
    this.investor = this._investorService.investor;
    if (!this.investor) {
      this._investorService.getInvestorDetails(sessionStorage.investor_id);
      this._investorService.investorDetails.subscribe(
        res=>{
          this.investor = res;
          this.getAccountDetails()
        }
      )
    }
    else{
      this.getAccountDetails()
    }
    console.log(this.investor);

  }

  processForm(){
    console.log(this.investmentForm.value);
    if (this.investmentForm.valid) {
      if (this.investor_acc.balance < this.investmentForm.value['amount']) {
        alert("Not enough Funds")
      }
      else
      {
        //send data
        this.investmentDetails = this.investmentForm.value;
        this.investmentDetails.date = Date();
        this.investmentDetails.investor_id = this.investor["$key"];
        this.investmentDetails.startup_id = this.startup["$key"];
        this.investor_acc.balance -= this.investmentForm.value["amount"];
        this.startup_acc.balance += this.investmentForm.value["amount"];
        this.startup.investment_amount = Number.parseInt(this.startup.investment_amount.toString()) + Number.parseFloat(this.investmentForm.value["amount"]);
        console.log(this.startup.investment_amount);
        this._investorService.investInStartup(this.startup,this.investmentDetails,this.investor_acc,this.startup_acc)
        this._snack.open("Successfully Invested","",{
          duration:2000
        });
        this._router.navigate(['/investorLanding']);

        this.isSuccess = true;
        $(".trigger").toggleClass("drawn");
        // this._router.navigate(['/investorLanding','investmentSuccess']);
      }
     console.log("valid") 
    }

  }

  cancelInvestment(){
    this._router.navigate(['/investorLanding/startupList']);
  }

  getStartupAccountDetails(){
    this._investorService.getStartupAccDetails(this.startup.primary_acc).map(res=><Account>res).subscribe(snapshot=>{
      this.startup_acc = snapshot;
      this.isAccounts++;
      console.log("startup acc : ",this.startup_acc);
    })
  }

  getAccountDetails(){
    this._investorService.getInvestorAccDetails(this.investor.primary_acc).subscribe(snapshot=>{
      this.investor_acc = snapshot;
      this.isAccounts++;
      console.log("investor acc : ",this.investor_acc);
    })
  }

  investEnable(){
    if (this.investmentForm.valid && this.investmentForm.value["amount"] < this.investor_acc.balance) {
      return false;
    } else {
      return true;
    }
  }
  
  validateZero(control : AbstractControl){
    if (  control.value <= 0 ){
      return { validZero : true}
    }
      
    return null;
  }

  validateAmount(control : AbstractControl){
    if (control.value > this.investor_acc.balance){
      return { validAmount : true}
    }
      
    return null;
  }

  validateTermsAndCondition(control : AbstractControl){
    if (!control.value){
      return { readAgreement : true}
    }
    return null;
  }

  ValidateEquity(control : AbstractControl){
    if (control.value <=0 ){
      return { validEquity : true}
    }
      
    return null;
  }
    
  initInvestmentForm(){
    this.investmentForm = new FormGroup({
      'amount' : new FormControl(0,[Validators.required,this.validateAmount.bind(this),this.validateZero.bind(this)]),
      'equity' : new FormControl(0,[Validators.required,this.ValidateEquity.bind(this)]),
      'agreementRead' : new FormControl(false,this.validateTermsAndCondition.bind(this))
      }
    )
  }
}


