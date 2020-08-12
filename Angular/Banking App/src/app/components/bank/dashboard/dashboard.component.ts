import { Router } from '@angular/router';
import { FirebaseServiceService } from './../../../services/firebase-service/firebase-service.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { accountId } from './../../../models/accountId';
import { FormControl, FormGroup,FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Http } from "@angular/http";
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {IDigichequeTransaction } from './../../../models/digicheque/digicheque-transaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  passcode: string;
  transferForm: FormGroup;
account:accountId;
accounts:accountId[]=[];
acc_num:number;
bal:number;
result:any;
profiles:any;
mobile:number=sessionStorage.mobile;
bal1:number;
amount:number;
private transaction_pwd : string;
private otp:number;
status:string="No";
cheques : IDigichequeTransaction[]=[]
chequeDetails:any;
chequeTransaction : IDigichequeTransaction[] = [];
displayedColumns = ['number', 'accountNumber','balance'];
dataSource: MatTableDataSource<IDigichequeTransaction>;
delCheque : any;
encashForm : FormGroup;
cheque:IDigichequeTransaction;
cheque_reference_of_user : any;
currDate:string;


 
constructor(private _firebase:FirebaseServiceService,private userService:UserService,private _http:Http,private _router:Router) { 
    this._firebase.getChequeTransactions();
    this.encashForm=new FormGroup({
      'transact_pwd' : new FormControl('',Validators.required),
      'otp':new FormControl('',Validators.required)
    })
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    
    var yyyy = today.getFullYear();
    // if(dd<10){
    //     dd=parseInt('0'+dd);
    //     console.log(dd);
    // } 
    // if(mm<10){
    //     mm=parseInt('0'+mm);
    // } 
    this.currDate = ""+yyyy+'/'+mm+'/'+dd+"";
    
  }


 

  ngOnInit() {
    this._firebase.findMax();
    this.cheques=this._firebase.getCheques();
    console.log(this.cheques);
     this._firebase.getProfiles().subscribe((snapshot)=>{
      this.profiles=snapshot;
     console.log(this.profiles);
    })
    
  
  
this.userService.getAccountIds().subscribe(
  (res)=>{
    Object.keys(res).forEach(element=>{
      this.userService.getAccounts(res[element]).subscribe(
        (data)=>{
          this.account={
         account_id:data["account_no"],
      
         account_name:data["account_type"],
         balance:data["balance"],
         
        }
       this.accounts.push(this.account);
       //console.log(this.account);
      }
      )
    })
  }
)


console.log(this.accounts);
    this.transferForm = new FormGroup({
      'account': new FormControl('', Validators.required),
      'bName': new FormControl('', Validators.required),
      'bAccount': new FormControl('', Validators.required),
      'bAccount1': new FormControl('', Validators.required),
      'amount': new FormControl('', Validators.required),
      'otp':new FormControl('',Validators.required),
  })



}





getIndex(vig){

console.log(vig);
this.acc_num=vig.controls.account.value;
console.log(this.acc_num);

for(var i=1;i<=this.accounts.length;i++)
{
  if(this.accounts[i].account_id==this.acc_num)
  {
   
   this.bal= this.accounts[i].balance;
  
   break;

  }
  
}
return this.bal;
}


nextAction(formData){

  console.log(formData);
 this.acc_num=formData.controls.account._value;
 this.amount=formData.controls.amount._value;
 console.log("values are"+this.acc_num+"and"+this.amount);
 //this.userService.updateSenderBalance(this.amount,this.acc_num,this.bal);
 for(var i=1;i<=this.accounts.length;i++)
 {
   if(this.accounts[i].account_id==formData.controls.bAccount._value)
   {
    
    this.bal1= this.accounts[i].balance;
   
    break;
 
   }
   
 }
 this.userService.updateReceiverBalance(this.amount,formData.controls.bAccount._value,this.bal1);

}

sendOtp(){
  this._http.get('https://cors-anywhere.herokuapp.com/https://control.msg91.com/api/sendotp.php?authkey=186731Az5B9sN8co15a25a4d3&mobile=919663581854').subscribe
  (
    (data)=>{console.log(data)},
    (err)=>{window.alert(err)}
  )
}



resendOtp(){
  this._http.get('https://cors-anywhere.herokuapp.com/https://control.msg91.com/api/retryotp.php?authkey=186731Az5B9sN8co15a25a4d3&mobile=918919981967').subscribe
  (
    (data)=>{console.log(data)
    },
    (err)=>{alert(err)}
  )
}


verifyOtp(form){
  this.otp=form.controls.otp.value;
console.log(this.otp);
  this._http.get('https://cors-anywhere.herokuapp.com/https://control.msg91.com/api/verifyRequestOTP.php?authkey=186731Az5B9sN8co15a25a4d3&mobile=919663581854'+'&otp='+this.otp).subscribe
  (
    (data)=>{console.log(data);
     this.status=data.statusText; 
    },
    (err)=>{window.alert(err)}
  )
  ;
}

onDelete(index : number){
this.cheques.splice(index,1);
}

encash(senderId : number ,receiverId :number , amount : number,key:string ,form)
{
  console.log(senderId,receiverId,amount,key);
  console.log(form.controls.transact_pwd.value);
  console.log(this.cheque.transactionPassword);
  console.log(form.controls.transact_pwd.value==this.cheque.transactionPassword);
  
  console.log("entered" +form.controls.otp.value);

  console.log("verifying otp");
  this._http.get('https://cors-anywhere.herokuapp.com/https://control.msg91.com/api/verifyRequestOTP.php?authkey=186731Az5B9sN8co15a25a4d3&mobile=919663581854'
             + '&otp=' +form.controls.otp.value).subscribe((response)=>{
              this.result=response.json();
              console.log(this.result);
              if(this.result.type=="success")
              {
              console.log("Verificaton successful");
              this._http.get('https://cors-anywhere.herokuapp.com/http://api.msg91.com/api/sendhttp.php?sender=JUBANK&route=4&mobiles=919663581854&authkey=186731Az5B9sN8co15a25a4d3&country=91&message=A cheque has been sent to your account in JustBank')
              
                .subscribe((data)=>{
                  
                  console.log(data);
                  this._firebase.encash(senderId,receiverId,amount,key);
                  this._router.navigateByUrl('/landingPage/accounts');

                });

           

                            
              }
              if (this.result.type=="error") {
                alert('Invalid otp');

              }
            })
  

}

setCheque(ch:IDigichequeTransaction){
  this.cheque=ch;
  console.log(ch.transactionPassword);
  this._http.get('https://cors-anywhere.herokuapp.com/https://control.msg91.com/api/sendotp.php?authkey=186731Az5B9sN8co15a25a4d3&mobile=919663581854').subscribe((response)=>{
    console.log(response);      
});
} 





}
