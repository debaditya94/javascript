import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { InvestorService } from '../../../services/investor-service/investor.service';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormArrayName } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-investor-sign-up',
  templateUrl: './investor-sign-up.component.html',
  styleUrls: ['./investor-sign-up.component.css']
})
export class InvestorSignUpComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    
  }

  constructor(
    private _investor:InvestorService,
    private _profile: UserService,
    private _router : Router
  ) { }


  isLinear = true;
  basicDetails: FormGroup;
  educationDetials: FormGroup;
  experienceDetails : FormGroup;
  accounts=[];
  image : File;
  
  ngOnInit() {
    this.basicDetails = new FormGroup({
      "name": new FormControl(null, Validators.required),
      "about" : new FormControl(null, Validators.required),
      "primary_acc" : new FormControl(null, Validators.required),
    
    });
    
    this.experienceDetails = new FormGroup({
      'experience' : new FormArray([
        new FormGroup({
          'companyName' : new FormControl(null,Validators.required),
          'designation' : new FormControl(null,Validators.required)
        })
      ]),
      'achievements' : new FormControl(null, Validators.required)
    })

    this._profile.getUserDetails().subscribe(
      (res:User)=>{
        console.log(res);
        this.basicDetails.controls.name.setValue(res.first_name+" "+res.last_name);
        this.accounts = Object.values(res.account_ids);
      }
    );

  }

  isFile : boolean = false;
  isFileErrorMsg = "";
  imageSelected(items:HTMLInputElement, profileImg:HTMLImageElement){
   
    if(items.files.length > 0){
      if(items.files[0].type =='image/jpeg' || items.files[0].type =='image/png'  || items.files[0].type =='image/bmp'){       
        this.isFile=true;
        let t : string = window.URL.createObjectURL(items.files[0]);
        profileImg.src = t;
    
      }
      else{
        this.isFile= false;
        this.isFileErrorMsg = "";
        this.isFileErrorMsg = "Only JPEG JPG PNG BMP images allowed";
        
      }
    }
    else{
      this.isFile = false;
      this. isFileErrorMsg = "";
      this.isFileErrorMsg = "Please select an Image";
    }
  }

  investorKey:string ="";

  saveButtonClicked(){
    this._investor.addInvestor(this.basicDetails.value);
    this._investor.addedInvestorKey.subscribe(
      (res) => {
        this.investorKey = res;
        this._profile.setInvestorId(res);
      }
    )
  }


  AddExperienceFrom(){
    let control = <FormArray>(this.experienceDetails.controls['experience']);
    control.push(
      new FormGroup({
      'companyName' : new FormControl(null,Validators.required),
      'designation' : new FormControl(null,Validators.required)
    }));
  }

  removeExperienceFrom(index : number){
    let control = <FormArray>(this.experienceDetails.controls['experience']);
    control.removeAt(index);
  }
  AddBasicExperienceDetails(){
    if(this.basicDetails.valid){
      this.image =  (<HTMLInputElement>document.getElementById('profile_pic')).files[0];
      this._investor.uploadInvestorFile(this.image,this.basicDetails.value);
    }
    else{
      console.log("error");
    }
    
  }

  AddInvestorExperience(){
    this._investor.AddInvestorExperience(this.experienceDetails.value);
  }

  SubmitInvestor(){
    this._investor.AddInvestorSignUp();
  }

  backtohome(){
    this._router.navigate(['landingPage']);
  }

}
