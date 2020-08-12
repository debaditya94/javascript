import { Component, OnInit,AfterViewInit,OnChanges ,DoCheck} from '@angular/core';
import { FirebaseServiceService } from "../../../services/firebase-service/firebase-service.service";
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { IConfirmation } from './../../../models/digicheque/confirmation';

@Component({
  selector: 'app-digicheque-confirmation',
  templateUrl: './digicheque-confirmation.component.html',
  styleUrls: ['./digicheque-confirmation.component.css']
})
export class DigichequeConfirmationComponent implements OnInit {
  chequeTransactions: any;
  profiles:any;
  length:any;
  loadedData:number=0;
  // loadedDataForm:number=0;
  clicked:boolean=false;
  heroForm:FormGroup;
//var:string = sessionStorage.loggedInUser;
//  confirmation : IConfirmation;
//  profileBeneficiary=this.db.list('profiles/'+sessionStorage.loggedInUser+'/beneficiaries/account_ids');
  constructor(private _firebase : FirebaseServiceService,private _route:Router,private db:AngularFireDatabase) { 
    this.heroForm = new FormGroup({
      name: new FormControl('', Validators.required),
      mobileno: new FormControl('', Validators.required),
      referenceID: new FormControl('',Validators.required),
      amount: new FormControl('',Validators.required),
      date:new FormControl('',Validators.required),
      status: new FormControl('',Validators.required)
    });
    this.length=0;
  }

   ngOnInit() {
  
  // console.log(sessionStorage.loggedInUser);
  // console.log(this.profileBeneficiary);
  // console.log(this.confirmation);
  this._firebase.getChequeTransaction().subscribe((snapshot)=>{
    this.chequeTransactions=snapshot;
    // console.log(this.chequeTransactions);
    console.log(this.chequeTransactions[(this.chequeTransactions.length)-1]);
    this.loadedData=this.loadedData+1;
    console.log(this.loadedData);
    this._firebase.getProfiles().subscribe((snapshot)=>{
      this.profiles=snapshot;
      console.log(this.profiles);
      this.length=this.profiles.length;
      console.log(this.length);
       this.loadedData=this.loadedData+1;
       console.log(this.loadedData);
       for (var i=0;i<this.length;i++){
        if (this.chequeTransactions[(this.chequeTransactions.length)-1].recieverID == this.profiles[i].user_name)
          {
            this.heroForm.controls.name.setValue(this.profiles[i].first_name+' '+this.profiles[i].last_name);
            this.heroForm.controls.mobileno.setValue(this.profiles[i].mobile_number);
            this.heroForm.controls.status.setValue('Success');
            console.log('setting form');
            this.heroForm.controls.date.setValue(this.chequeTransactions[(this.chequeTransactions.length)-1].dateTime);
            this.heroForm.controls.amount.setValue(this.chequeTransactions[(this.chequeTransactions.length)-1].amount);
            this.heroForm.controls.referenceID.setValue(this.chequeTransactions[(this.chequeTransactions.length)-1].transactionPassword);
            this.loadedData=this.loadedData+1;
            console.log(this.loadedData);
            break;
          }
      }
    });
    //this.loadedData=1;
  });
 

  // console.log('on init function');
  // console.log("yooooooooooooo",this.length);
  
}

// ngAfterViewInit(){
//   console.log('After View Init function');
  

  

  
// }
 
  onClick(){
    console.log('clicked on button');
    this.clicked=true;
    this._route.navigateByUrl('/landingPage/dashboard');
  }
  

    
}
