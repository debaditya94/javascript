import { Router } from '@angular/router';
import { User } from './../../../models/user';
import { UserService } from './../../../services/user/user.service';
import { MaterialModule } from './../../../modules/material/material.module';
import { FirebaseServiceService } from './../../../services/firebase-service/firebase-service.service';
import { FormGroup, FormControl, Validator, Validators, FormArray, AbstractControl } from '@angular/forms';
import { IStartup } from './../../../models/innovHelp/startup';
import { Component, OnInit, AfterViewInit } from '@angular/core';




@Component({
  selector: 'app-innov-start-up-sign-up',
  templateUrl: './innov-start-up-sign-up.component.html',
  styleUrls: ['./innov-start-up-sign-up.component.css']
})
export class InnovStartUpSignUpComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
  }
  
  
  
  
  image : File;
  isLinear = true;
  basicDetailsForm : FormGroup;
  startupDetailsForm : FormGroup;
  teamDetailsForm : FormGroup;
  accounts=[];
  isNamebool : boolean[] = [false];
  isEmailbool : boolean[] = [false];
  isDesignationbool : boolean[] = [false];
  isTeamFormEmailValid : boolean = true;
  isTeamFormNameValid : boolean = true;
  isTeamFormDesignationValid : boolean = true;
  



  constructor(private _startupService:FirebaseServiceService,private _profile: UserService,private _router: Router) {
    
  }

  ngOnInit() {
   

    this.basicDetailsForm = new FormGroup({
      'name' : new FormControl(null,Validators.required),
      'location' : new FormControl(null,Validators.required),
      's_description' : new FormControl(null,Validators.required),     
      'website' : new FormControl(null,Validators.required),
      'primary_acc' : new FormControl(null,Validators.required)        
    })

   this.startupDetailsForm = new FormGroup({
     'l_description' : new FormControl(null,Validators.required),
     'equity_offered' : new FormControl(null,Validators.required),
     'investment_amount' : new FormControl(null,Validators.required),
     'valuation' : new FormControl(null,Validators.required),
     'investment_sought' : new FormControl(null,Validators.required)
   })

   this.teamDetailsForm = new FormGroup({
    'team' : new FormArray([
      new FormGroup({
        'name' : new FormControl(null,Validators.required),
        'email' : new FormControl(null,[Validators.required, Validators.email]),
        'designation' :  new FormControl(null,Validators.required),
        'phone_no' : new FormControl(null,[Validators.required,Validators.maxLength(10)]),
        //'imageUrl' : new FormControl(null,Validators.required)        
      })
    ])
  })
  let profile = this._profile.getUserDetails().subscribe(
    (res:User)=>{
      console.log(res);      
      this.accounts = Object.values(res.account_ids);
    }
  );

  }

  StartUpBasicDetails(){
    if(this.basicDetailsForm.valid){
      console.log(this.basicDetailsForm.value)
      this.image =  (<HTMLInputElement>document.getElementById('file')).files[0];
      this._startupService.UploadFile(this.image,this.basicDetailsForm.value);
    }
    else{
      console.log("Not valid");
    }
    
  }

  startupDetails(){
    this._startupService.startupDetails(this.startupDetailsForm.value);
    console.log(this.teamDetailsForm);
  }
  AddteamFrom(){
    let control = <FormArray>(this.teamDetailsForm.controls['team']);
    control.push(
      new FormGroup({
        'name' : new FormControl(null,Validators.required),
        'email' : new FormControl(null,[Validators.required, Validators.email]),
        'designation' :  new FormControl(null,Validators.required),
        'phone_no' : new FormControl(null,Validators.required)        
      })
    )

  }



  teamDetails(){
    console.log(this.teamDetailsForm)
    console.log("team details form value :: ",this.teamDetailsForm.value)
    if(this.teamDetailsForm.valid)
      {
        console.log("inside if of sighup ts of teamDetails")
        this._startupService.addStartUpTeam(this.teamDetailsForm.value);
      }
      else{
        console.log("Errror in teamform")
      }
    
  }
  isFile : boolean = false;
  isFileErrorMsg = "";
  isFileChange(fileinput : any){
    // console.log(fileinput.files);
    // console.log(fileinput.files.length);
    // console.log(fileinput.files[0].type);
    if(fileinput.files.length > 0){
      if(fileinput.files[0].type =='image/jpeg' || fileinput.files[0].type =='image/png'  || fileinput.files[0].type =='image/bmp'){       
        this.isFile=true;
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
      this.isFileErrorMsg = "Please select a Image";
    }
    
  }
  StratUp(){
    this._startupService.startupSignUp();
    
  }
  removeMemberForm(index : number){
    let control = <FormArray>(this.teamDetailsForm.controls['team']);
    control.removeAt(index);
  }
  backtohome(){
    this._router.navigate(['landingPage']);
  }
  // PhoneNoLengthValidator(control : AbstractControl){
  //   return control.value.length<=10? null : {ph:true};
  // }
  
  isEmailValid(file : any, i: number){
    console.log(file.value);
    var str = file.value; 
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var found = str.match(reg);
    if(!found){      
      this.isEmailbool[i] = true;
      this.isTeamFormEmailValid =true;      
    }
    else{     
      this.isEmailbool[i] = false;
      this.isTeamFormEmailValid =false;  
    }
    if(!file.value){
      this.isEmailbool[i] = false;
      this.isTeamFormEmailValid =false;
    }
  }

  
  isNameValid(file : any, i : number){
    var reg = /^[A-z ]+$/;
    var str = file.value;
    var found = str.match(reg);  
    if(!found){      
      this.isNamebool[i] = true;
      this.isTeamFormNameValid = true;
    }
    else{      
      this.isNamebool[i] = false;
      this.isTeamFormNameValid = false;    
    }
    if(!file.value){
      this.isNamebool[i] = false;
      this.isTeamFormNameValid = false;
    }
  }

  isDesignationValid(file : any, i : number){
    var reg = /^[A-z ]+$/;
    var str = file.value;
    var found = str.match(reg);  
    if(!found){      
      this.isDesignationbool[i] = true;
      this.isTeamFormDesignationValid = true;
    }
    else{      
      this.isDesignationbool[i] = false;
      this.isTeamFormDesignationValid = false;   
    }
    if(!file.value){
      this.isDesignationbool[i] = false;
      this.isTeamFormDesignationValid = false;
    }
  }

  isWebsitebool : boolean = false;
  isWebsiteValid(file : any){
    var reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    var str = file.value;
    var found = str.match(reg);  
    if(!found){      
      this.isWebsitebool = true;
    }
    else{      
      this.isWebsitebool = false;      
    }
    if(!file.value){
      this.isWebsitebool = false;
    }
  }
}


