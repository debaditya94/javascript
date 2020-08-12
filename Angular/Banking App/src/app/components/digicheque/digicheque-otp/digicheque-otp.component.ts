import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { FirebaseServiceService } from "../../../services/firebase-service/firebase-service.service";
import { IDigichequeTransaction } from "../../../models/digicheque/digicheque-transaction";

@Component({
  selector: 'app-digicheque-otp',
  templateUrl: './digicheque-otp.component.html',
  styleUrls: ['./digicheque-otp.component.css']
})
export class DigichequeOtpComponent implements OnInit {

  @Input()
  diameter: number=50;
  result:any;
  mobile:number;
  passcode:string;
  cheques:IDigichequeTransaction[]=[];
  beneficiaryMobile:number;
  match:boolean=false;
  chequeTransactions:any
  transaction_pwd : string;
  profiles:any;
  progress:number=0;
  otp_status:number=0;
  constructor(private _http:Http,private _router:Router,private _firebase: FirebaseServiceService) { }

  ngOnInit() {
    this._firebase.getProfiles().subscribe((snapshot) => {
      this.profiles = snapshot;
      console.log(this.profiles);
    });
    this.passcode=this._firebase.cheque_transactionID;
    this._firebase.getChequeTransactions();
    this.cheques= this._firebase.getCheques();
    
    
  }
  
  
  verifyOTP(form:NgForm){
    for (let x of this.profiles){
      if (x["user_name"]==sessionStorage.loggedInUser){
          this.mobile=x["mobile_number"];
      }
    if (x["user_name"]==this.cheques[(this.cheques.length)-1].recieverID){
        this.transaction_pwd=x["mobile_number"];
    }
    }
    console.log("length is:",this.cheques.length); 

    console.log("Receiver ID:",this.cheques[(this.cheques.length)-1].recieverID)
    for (let x of this.profiles){
 
      
      if (this.cheques[(this.cheques.length)-1].recieverID==x["user_name"]){
           this.match=true;    
           this.transaction_pwd=this.cheques[(this.cheques.length)-1].transactionPassword;
           console.log(this.transaction_pwd);
        //   
        
        this.beneficiaryMobile=x["mobile_number"];
        console.log(this.beneficiaryMobile);
        break;    
    }
    console.log(this.match);
    }
    this.progress=1;
    console.log("entered" +form.controls.otp.value);
    console.log("for mobile number" +this.mobile);
    console.log("Reciever's mobile number" +this.beneficiaryMobile);
    console.log("verifying otp");
    this._http.get('https://cors-anywhere.herokuapp.com/https://control.msg91.com/api/verifyRequestOTP.php?authkey=186731Az5B9sN8co15a25a4d3&mobile=919831741783'
               + '&otp=' +form.controls.otp.value).subscribe((response)=>{
                this.result=response.json();
                console.log(this.result);
                if(this.result.type=="success")
                {
                console.log("Verificaton successful");
                this._http.get('https://cors-anywhere.herokuapp.com/http://api.msg91.com/api/sendhttp.php?sender=JUSBNK&route=4&mobiles=919663581854'+'&authkey=186731Az5B9sN8co15a25a4d3&country=91&message=A cheque has been sent to your account in Just Bank . Your cheque transaction password is '+this.transaction_pwd+'  . Login to enchash')
                
                  .subscribe((data)=>{
                    
                    console.log(data);
                  });

                this._router.navigateByUrl('/landingPage/digicheque/digicheque-confirmation');

                              
                }
                if (this.result.type=="error") {
                  this.otp_status=1;
                  alert("wrong otp entered!Transaction cancelled ! Please fill check again");
                  // this._router.navigateByUrl('/landingPage/digicheque');

                }
              })

            
  }


}
