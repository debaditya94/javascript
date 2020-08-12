import { Router } from '@angular/router';

import { FormGroup } from '@angular/forms';
import { User } from './../../models/user';
import { UserService } from './../user/user.service';
import { Savings } from './../../models/savings';
import { Account } from './../../models/account';
import { Portfolio } from './../../models/portfolio';
import { IStartup, ITeamMember } from './../../models/innovHelp/startup';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from 'angularfire2/auth';
import 'firebase/storage';
import { IBeneficiary } from "../../models/digicheque/beneficiary";
import { IDigichequeTransaction } from '../../models/digicheque/digicheque-transaction';

var max;
@Injectable()
export class FirebaseServiceService {
  cheque_reference_of_user: any;
  startups: IStartup[];
  cheque_transactionID:string;
  cheques:IDigichequeTransaction[]=[];
  accounts: any;
  profiles: any;
  beneficiaries: any;
  startup: IStartup = {
    'name': "",
    'location': "",
    's_description': "",
    'l_description': "",
    'website': "",
    'team': [],
  }
  portfolios: FirebaseListObservable<Portfolio[]>;
  profilesListBeneficiaryAccountRef = this.db.list('profiles/'+sessionStorage.loggedInUser+'/beneficiaries/account_ids');
  profilesListAccountRef=this.db.list('profiles/'+sessionStorage.loggedInUser+'/account_ids');
  profilesChequeTransactionRef=this.db.list('transactions/cheque_transactions');
  constructor(public db: AngularFireDatabase,private _user:UserService, private _router : Router) {
  }

  getStartups() {
    console.log('working')
    var _startups = this.db.list('startups');
    _startups.subscribe(snapshot => console.log(snapshot));
    return _startups;
  }

  getAccounts(){
    return this.db.list('accounts');
  }
  getAccountsForEachProfile(profileID) {
    // var _accounts = this.db.list('accounts');
    // _accounts.subscribe(snapshot => this.accounts = snapshot);
    return  this.db.list('profiles/'+profileID+'/account_ids');
  }
  getProfiles() {
    // var _profiles = this.db.list('profiles');
    // _profiles.subscribe(snapshot => this.profiles = snapshot);
    return this.db.list('profiles');
  }
  getBeneficiaries() {
    //
    
    return this.db.list('profiles/'+sessionStorage.loggedInUser+'/beneficiaries/account_ids');
  }
  addBeneficiaries(profile:IBeneficiary,profilesListBeneficiaryAccountRef){
    // var _beneficiaries = this.db.list('beneficiaries');

    profilesListBeneficiaryAccountRef.push(profile).then((item)=>{
      console.log(item);
    });
  }
  getChequeTransaction(){
    return this.db.list('transactions/cheque_transactions')
  }
  addChequeTransactions(chequeTransaction:IDigichequeTransaction,sender,reciever){
    
    this.profilesChequeTransactionRef.push(chequeTransaction).then((item)=>{
      console.log(item);
       this.cheque_transactionID=item.key;
      console.log(this.cheque_transactionID);
      this.db.object('transactions/cheque_transactions/'+this.cheque_transactionID+'/transactionPassword').set(this.cheque_transactionID);
      // this.db.list('profiles/'+sender+'/cheque_reference').push(this.cheque_transactionID).then((item)=>{
      //   console.log(item);
      // });
      this.db.list('profiles/'+reciever+'/cheque_reference').push(this.cheque_transactionID).then((item)=>{
        console.log(item);
      });
    });
    
    
  }
  // addChequeReference(sender,reciever,chequeReference){
  //   this.db.list('profiles/'+sender+'/cheque_reference').push(chequeReference).then((item)=>{
  //     console.log(item);
  //   })
  //   this.db.list('profiles/'+reciever+'/cheque_reference').push(chequeReference).then((item)=>{
  //     console.log(item);
  //   })
  // }

  addGoalToPortfolio(goal: Savings) {
    if (sessionStorage.portfolio_key == "undefined") {
      var portfolios = this.db.list('portfolio');
      portfolios.push({ "goals": [goal] }).then((item) => {
        console.log(item);
        var portfolio_key = item.key;
        sessionStorage.portfolio_key = portfolio_key; 
        this.db.object('profiles/' + sessionStorage.loggedInUser + '/portfolio_key').set(portfolio_key);
      });
    }
    else {
      var goals = this.db.list('portfolio/' + sessionStorage.portfolio_key + "/goals");
      goals.push(goal)
    }
  }

  startupSignUp() {
    console.log(this.startup)
    this.db.list('startups').push(this.startup).then(
      (item) => {
                this.db.object('profiles/' + sessionStorage.loggedInUser + '/startup_id').set(item.key);
                sessionStorage.startup_id =item.key;
                console.log("success");
                this._router.navigate(['innovStartup']);
              },
      error => console.log(error)
            );

  }


  getGoals() {
    console.log(sessionStorage.portfolio_key);
    var goals = this.db.list('portfolio/' + sessionStorage.portfolio_key + '/goals');
    return goals;
  }
  

  findMax() {
    var keys = [];
    this.getGoals().subscribe((response: Savings[]) => {
      for (let goal of response) {
        keys.push(goal.financialGoal)
      }
      sessionStorage.max = this.mode(keys)
    })
  }

  mode(array) {
    if (array.length == 0)
      return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for (var i = 0; i < array.length; i++) {
      var el = array[i];
      if (modeMap[el] == null)
        modeMap[el] = 1;
      else
        modeMap[el]++;
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    return maxEl;
  }

  getProfileKey() {
    this.db.object('profiles/' + sessionStorage.loggedInUser).subscribe((item) => {
      sessionStorage.portfolio_key = item["portfolio_key"];
    });

    // 
  }


  UploadFile(image: File, basicStartupform: IStartup) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`image/` + image.name).put(image);
    uploadTask.then(
      (res) => {
        this.startup.name = basicStartupform.name;
        this.startup.location = basicStartupform.location;
        this.startup.s_description = basicStartupform.s_description;
        this.startup.website = basicStartupform.website;
        this.startup.primary_acc = basicStartupform.primary_acc;
        this.startup.logoUrl = res.downloadURL;
      },
      error => console.log(error)
    )
  }

  startupDetails(startupDetails: IStartup) {
    this.startup.l_description = startupDetails.l_description;
    this.startup.equity_offered = startupDetails.equity_offered;
    this.startup.investment_amount = startupDetails.investment_amount;
    this.startup.valuation = startupDetails.valuation;
    this.startup.investment_sought = startupDetails.investment_sought;
    console.log(this.startup);
  }
  addStartUpTeam(teamDetailsValues: ITeamMember[]) {
    // (<IStartup>this.startup).team = teamDetailsValues;
    for (let team of teamDetailsValues['team']) {
      console.log("for loop :: ", team);
      this.startup.team.push(team);
    }
    // this.startup.team = teamDetailsValues;
    console.log("from firebase service :: ", this.startup);
  }
 
  getChequeTransactions(){
    this.cheques=[];
    var chequeReference = this.db.list('profiles/' + sessionStorage.loggedInUser + '/cheque_reference');
    chequeReference.subscribe((snapshot)=>{
      for(let x of snapshot){
        var cheque=this.db.object('transactions/cheque_transactions/'+x["$value"]);
        cheque.subscribe((snapshot)=>{
          this.cheques.push(snapshot);
        })
      }
    })
  }


  getCheques(){
    return this.cheques;
  }
  encash(senderId:number,receiverId:number,amount:number,key:string){
    var senderBalance:number;
    var receiverBalance:number;
    var sender=this.db.object('accounts/'+senderId);
    var receiver=this.db.object('accounts/'+receiverId);
    
    sender.subscribe((snapshot)=>{
      console.log(snapshot);
      senderBalance=snapshot['balance'];
      receiver.subscribe((snapshot)=>{
        console.log(snapshot);
        receiverBalance=snapshot['balance'];
        console.log(receiverBalance);
      });
    });
 

    if(senderBalance<amount)
    console.log('Cheque got bounced');
    else
    {
    this.db.object('accounts/'+senderId+'/balance').set(senderBalance-amount);
    this.db.object('accounts/'+receiverId+'/balance').set(receiverBalance+amount);
    var chequeReferences=this.db.list('profiles/' + sessionStorage.loggedInUser + '/cheque_reference');
    chequeReferences.subscribe((snapshot)=>{
    for(let x of snapshot){
      if(x['$value']==key){
        this.db.object('profiles/' + sessionStorage.loggedInUser + '/cheque_reference/'+x['$key']).set(null);
      }
    }
    })
  }}



}

