import { Component, OnInit ,AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FirebaseServiceService } from "../../../services/firebase-service/firebase-service.service";
import { BsDropdownModule } from 'ngx-bootstrap';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Router } from "@angular/router";
import { IDigichequeTransaction } from '../../../models/digicheque/digicheque-transaction';
import { MatDatepickerInputEvent } from '@angular/material';


@Component({
  selector: 'app-digiform',
  templateUrl: './digiform.component.html',
  styleUrls: ['./digiform.component.css'],
})
export class DigiformComponent implements OnInit {

  minDate=new Date;
  heroForm:FormGroup;
  profileSelected:number=0;
  date:string;
  senderID:string;
  accountNumber:number;
  digichequeTransaction:IDigichequeTransaction;
  chequeReference:any;
  accounts: any;
  profiles: any;
  accountsProfiles:any;
  beneficiaries: any;
  beneficiary:any;
  day:string;
  month:string;
  year:string;
  // profilesRef = this.db.object('profiles');
  // profilesListBeneficiaryAccountRef = this.db.list('profiles/'+sessionStorage.loggedInUser+'/beneficiaries/account_ids');

  clicked: boolean = false;
  forWidth: boolean = true;



  constructor(private _firebase: FirebaseServiceService,private db:AngularFireDatabase,private _router:Router) {

    this.heroForm = new FormGroup({
      name: new FormControl('', Validators.required),
      mobileno: new FormControl('', Validators.required),
      senderAccountNumber: new FormControl('',Validators.required),
      accountNumber: new FormControl('', Validators.required),
      amountInWords:new FormControl('',Validators.required),
      amount: new FormControl('',Validators.required),
      dateTime:new FormControl('',Validators.required)
    });

    this.digichequeTransaction={
      senderID:'',
      senderAccount:0,
      recieverID:'',
      recieverAccount:0,
      amount:0,
      status:'',
      dateTime:'',
      transactionPassword:''
  }

 
    }

    addEvent(event: MatDatepickerInputEvent<Date>) {
       console.log(event.value.getFullYear()+'/'+(event.value.getMonth()+1)+'/'+event.value.getDate());
      //  if (event.value.getDate()<10)
      //  this.date=event.value.getFullYear()+'/'+(event.value.getMonth()+1)+'/0'+event.value.getDate();
      //  else
       this.date=event.value.getFullYear()+'/'+(event.value.getMonth()+1)+'/'+event.value.getDate();
    }


  ngOnInit() {
    // console.log(document.documentElement.clientHeight);
    // console.log(document.documentElement.clientWidth);
    // this._firebase.getAccounts().subscribe((snapshot) => {
    //   this.accounts = snapshot;
    //   console.log(this.accounts);
    // });
    this._firebase.getAccountsForEachProfile(sessionStorage.loggedInUser).subscribe((snapshot)=>{
      this.accountsProfiles=Object.values(snapshot);
      console.log(this.accountsProfiles);
    });
    this._firebase.getProfiles().subscribe((snapshot) => {
      this.profiles = snapshot;
    });
    this._firebase.getBeneficiaries().subscribe((snapshot) => {
      this.beneficiaries = snapshot;
    });
    // console.log(this.beneficiaries);

    
    
  }

  fillSenderAccount(accountProfile){
    this.accountNumber=accountProfile.value;
    console.log(this.accountNumber);
    this.heroForm.controls.senderAccountNumber.setValue(this.accountNumber);
      
      
      
      
   
  }

  displayDetails(beneficiary) {
    console.log(beneficiary);
    beneficiary = beneficiary.value;
    // this.beneficiary=beneficiary.value;
    // console.log(this.beneficiary);
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; 
    let yyyy = today.getFullYear();
    if(dd<10) 
    {
        this.day='0'+dd;
    } 
    
    if(mm<10) 
    {
        this.month='0'+mm;
    } 
    this.year=mm+'/'+dd+'/'+yyyy;
    // this.heroForm.controls.accountNumber.setValue(beneficiary.account_number);
    this.heroForm.controls.mobileno.setValue(beneficiary.mobile_number);
    this.heroForm.controls.name.setValue(beneficiary.name);
    this.beneficiary=beneficiary.profile_id;
    console.log(beneficiary.profile_id);
    console.log(this.beneficiary);
  
    // this.profileSelected=1;
    this._firebase.getAccountsForEachProfile(beneficiary.profile_id).subscribe((snapshot)=>{
      this.accountsProfiles=snapshot;
      console.log(this.accountsProfiles);
    });
    this.profileSelected=1;
    // this.heroForm.controls.date.setValue(this.year);
    


  }
  fillRecipientAccount(accountNo){
    this.heroForm.controls.accountNumber.setValue(accountNo.value);
  }


  onSubmit(form) {
    console.log(form);

    this.digichequeTransaction.amount=form.controls.amount.value;
    this.digichequeTransaction.senderAccount=form.controls.senderAccountNumber.value;
    this.digichequeTransaction.status="SENT";
    console.log(form.controls.dateTime.value);
    this.digichequeTransaction.dateTime=this.date;
    console.log(this.digichequeTransaction.dateTime);
    this.digichequeTransaction.recieverAccount=form.controls.accountNumber.value;
    console.log(sessionStorage.loggedInUser);
    console.log(this.beneficiary);
    this.digichequeTransaction.senderID=sessionStorage.loggedInUser;
    this.digichequeTransaction.recieverID=this.beneficiary;

    console.log(this.digichequeTransaction);
this._firebase.addChequeTransactions(this.digichequeTransaction,sessionStorage.loggedInUser,this.beneficiary);
    // console.log(this.chequeReference);


 


    
    // this._firebase.addChequeTransactions()
    this._router.navigateByUrl('/landingPage/digicheque/digicheque-details');
  }


}
