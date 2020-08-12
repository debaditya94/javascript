import { Router } from '@angular/router';
import { Account } from './../../models/account';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Observable } from "rxjs/Observable";
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/subject'


@Injectable()
export class UserService {

  profilesRef = this.db.object('profiles');
  accountsRef = this.db.object('accounts');
  accountsListRef = this.db.list('accounts');
  profilesListRef = this.db.list('profiles');

  profile:User;

  mAccount_ids :Array<number> = new Array<number>();
  constructor(private db: AngularFireDatabase, private af: AngularFireAuth,private _router : Router) {}

  signup(user:User, password:string){
    
    this.af.auth.createUserWithEmailAndPassword(user.email, password).then(
      (res) => {
        //alert("Signed up!");
        let str = user.user_name;
        this.createAccount("Savings Account");
        this.profilesListRef.update(str, user);
        this._router.navigate(['home/login']);
        
      },
      (error) => {
        alert(error);
      }
    );
  }

  login(user:User, password){
    let promise = this.af.auth.signInWithEmailAndPassword(user.email,password);
    promise.then(
      (res)=>{
        sessionStorage.loggedInUser= user.user_name;
        sessionStorage.investor_id=user.investor_id;
        sessionStorage.startup_id=user.startup_id;
        sessionStorage.portfolio_key=user.portfolio_key;
        this.profile = user;
      },
      (err)=>{
        sessionStorage.loggedInUser = null;
      }
    )
    return promise;
  }

  getProfilesSnapshot(){
    console.log();
    return this.profilesRef;
  }

  getLoggedInUser(){
    return sessionStorage.loggedInUserDetails;
  }

  accountCreationSubject: Subject<any> = new Subject<any>();

  cntr: number = 0;
  createAccount(accountType: string) {
    let account: Account = {
      account_no: 0,
      account_type: 'savings',
      balance: 0,
      profile_id: ""
    };
    let accno = this.generateAccountNumber();
    //console.log(accno);

    let accounts = this.accountsRef;

    if (!accounts[accno]) {
      account.account_no = accno;
      account.account_type = accountType;
      account.balance = 100000;
      //account.profile_id = sessionStorage.loggedInUser;
      let alreadyPresentAccounts;
      
      console.log();

      this.accountCreationSubject.next(account);
      this.accountsListRef.update(""+accno,account);
      let account_ids :Array<number> = new Array<number>();
      this.db.list('profiles/'+sessionStorage.loggedInUser+"/account_ids").push(accno); 
      
    }
    else if (this.cntr < 5) {
      this.cntr++;
      console.log('account already exists');
      this.createAccount(accountType);
    }
  }

  userDetailsSubject:Subject<any> = new Subject<any>();

  getUserDetails(){
    
     return this.db.object('profiles/'+sessionStorage.loggedInUser)
      .map((res)=>{
        this.userDetailsSubject.next(res);
        return res;
      });
    
  }
  getAccounts(accountId){
    return this.db.object('accounts/'+accountId);
  }
  getAccountIds(){
    return this.db.object('profiles/'+sessionStorage.loggedInUser+"/account_ids");
  }
  generateAccountNumber(): number {
    let max = 1181200000;
    let min = 1181100000;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  setInvestorId(key:string){
    this.db.object('profiles/'+sessionStorage.loggedInUser).update({"investor_id":key});
  }
  getBalance(accountId){
    return this.db.object('accounts/'+accountId +'/balance');
    
  }
  updateSenderBalance(amount:number,accountId:number,bal:number){
    //window.alert("In a service and received values are "+amount+" and "+accountId+" and "+bal)
    bal=bal-amount;
    console.log("fresh balance is"+bal);

    this.db.object('accounts/'+accountId )
    .update({ balance:bal}).catch(
      (err)=>{console.log(err)}
    );
    
  }
  updateReceiverBalance(amount:number,accountId:number,bal:number){
    //window.alert("In a service and received values are "+amount+" and "+accountId+" and "+bal)
    bal=bal+amount;
    console.log("fresh balance is"+bal);

    this.db.object('accounts/'+accountId )
    .update({ balance:bal}).catch(
      (err)=>{console.log(err)}
    );
    
  }

  logout(){
    console.log("logout")
    sessionStorage.loggedInUser= null;
    sessionStorage.portfolio_key= null;
    sessionStorage.investor_id= null;
    sessionStorage.startup_id= null;
    sessionStorage.max= null;
    this._router.navigate(['/']);
  }
}
