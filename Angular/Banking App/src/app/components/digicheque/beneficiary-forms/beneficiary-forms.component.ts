import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { FirebaseServiceService } from "../../../services/firebase-service/firebase-service.service";
import { IBeneficiary } from "./../../../models/digicheque/beneficiary";
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-beneficiary-forms',
  templateUrl: './beneficiary-forms.component.html',
  styleUrls: ['./beneficiary-forms.component.css']
})
export class BeneficiaryFormsComponent implements OnInit {

  newBeneficiary:IBeneficiary;
  profiles: any;

  // profilesRef = this.db.object('profiles');
  // profilesListRef = this.db.list('profiles');
  profilesListBeneficiaryAccountRef = this.db.list('profiles/'+sessionStorage.loggedInUser+'/beneficiaries/account_ids');

  constructor(private _firebase: FirebaseServiceService,private _route:Router,private db:AngularFireDatabase, private _snack:MatSnackBar) { }

  ngOnInit() {

    this._firebase.getProfiles().subscribe((snapshot) => {
      this.profiles = snapshot;
      console.log(this.profiles);
    });
    console.log(sessionStorage.loggedInUser);
    this.newBeneficiary={
      account_number:0,
      mobile_number:0,
      name:"",
      profile_id:""
    }
    console.log(this.profilesListBeneficiaryAccountRef);
  }
  onSubmit(myForm:NgForm) {
    console.log(  "Information of form" , myForm);
    // console.log(myForm.controls.confirmAccount.value!=myForm.controls.account.value);
    console.log(  "Name" , myForm.controls.name.value);
    console.log(  "Account Number" , myForm.controls.confirmAccount.value);
    console.log(  "Mobile Number" , myForm.controls.mobileNumber.value);

    // console.log(this.newBeneficiary.account_number);
      
    this.newBeneficiary.account_number = myForm.controls.confirmAccount.value;
    
    this.newBeneficiary.mobile_number=myForm.controls.mobileNumber.value;
 
    this.newBeneficiary.name=myForm.controls.name.value;
    for (var i=0;i<this.profiles.length;i++){
      if (this.profiles[i].mobile_number==myForm.controls.mobileNumber.value)
        this.newBeneficiary.profile_id=this.profiles[i].user_name;
    }
    
    this._firebase.addBeneficiaries(this.newBeneficiary,this.profilesListBeneficiaryAccountRef);
    console.log(this._firebase.getBeneficiaries());
    this._snack.open("Beneficiary Added", "", {
      duration:1500
    })
    this._route.navigateByUrl('/landingPage/digicheque');

    } 
  
}
