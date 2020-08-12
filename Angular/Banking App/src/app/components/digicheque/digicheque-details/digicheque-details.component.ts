import { Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Http } from "@angular/http";
import { FirebaseServiceService } from './../../../services/firebase-service/firebase-service.service';
import { FormControl, FormGroup,FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from "../../../models/user";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Modal } from './../../../../../node_modules/ngx-modialog';

@Component({
  selector: 'app-digicheque-details',
  templateUrl: './digicheque-details.component.html',
  styleUrls: ['./digicheque-details.component.css']
})
export class DigichequeDetailsComponent implements OnInit {


  accounts:any;
  mobile:number;
  chequeTransactions:any
  profiles:any;
  load:number=0;
  userForm: FormGroup;
  user:User;

  // @Input() profileID : string;
  // @Output() profileObj = new EventEmitter<string>();
  // @ViewChild('dataContainer') dataContainer: ElementRef;
 
  constructor(private _http:Http,private _firebase: FirebaseServiceService,public dialog: MatDialog) { 
  
  }


  ngOnInit() {
    // this._firebase.getAccounts().subscribe((snapshot) => {
    //   this.accounts = snapshot;
    // });
    this._firebase.getProfiles().subscribe((snapshot) => {
      this.profiles = snapshot;
      console.log(this.profiles);
    });
    // this._firebase.getChequeTransaction().subscribe((snapshot)=>{
    //   this.chequeTransactions=snapshot;
    //   // console.log(this.chequeTransactions);
    //   console.log(this.chequeTransactions[(this.chequeTransactions.length)-1].senderID);
    // });
    
   
  }
  

 

//   loadData(data:any) {
//     this.dataContainer.nativeElement.innerHTML = data.first_name+" "+data.last_name;
// }
sendOTP(){
  
      for (let x of this.profiles){
        if (x["user_name"]==sessionStorage.loggedInUser){
            this.mobile=x["mobile_number"];
  
            
        }
      }
  
      console.log("entered");
      console.log(this.mobile);
      // var body={authkey:'185645AlPe3jj56H5a1be67d',
      //           mobile:919831741783 };
      this._http.get('https://cors-anywhere.herokuapp.com/https://control.msg91.com/api/sendotp.php?authkey=186731Az5B9sN8co15a25a4d3&mobile='+this.mobile).subscribe((response)=>{
                  console.log(response);
  
     
    });
    }
  // displayDetails(account){
  //   console.log(account.profile_id);
  //   // console.log(this.profiles);
  //   for(var i=0;i<this.profiles.length;i++){
  //     if (account.profile_id==this.profiles[i].user_name){
  //       console.log('matched!');
  //       var full_name=this.profiles[i].first_name+" "+this.profiles[i].last_name;
  //       console.log(full_name);
  //       this.load=1;
  //       this.heroForm.setValue({
  //         name: full_name
  //       });
        
  //     }
        

  //   }
  
   
    
  // }
}
