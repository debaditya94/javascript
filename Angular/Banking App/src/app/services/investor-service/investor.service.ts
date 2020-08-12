import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { IInvestmentDetails } from './../../models/innovHelp/investmentDetails';
import { Account } from './../../models/account';
import { User } from './../../models/user';
import { IStartup } from './../../models/innovHelp/startup';
import { Iinvestor, IPitchedStartup, IInvestorExperience } from './../../models/innovHelp/investor';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from 'angularfire2/auth';
import 'firebase/storage';
import * as firebase from 'firebase/app';
@Injectable()
export class InvestorService {


  investor : Iinvestor;
  constructor(public db: AngularFireDatabase, private _router : Router) { }
  investorDetails : Subject<any>  = new Subject<any>();
  investorSignUp : Iinvestor = {
    'name' : "",
    'about' : "",
    'experience' : [],
    'achievements' :"" 
  };
  
  getInvestorByInvestorId(investor_id : string){
      return this.db.object("investors/"+investor_id);
  }


  getInvestorDetails(investor_id : string){
    this.db.object('investors/'+investor_id).subscribe((res)=>{
      this.investor = res;
      this.investorDetails.next(res);
    })
    
  }
  
  getInvestorByUsername(profile_key : string){
    this.db.object('profiles/'+profile_key+'/investor_id').subscribe(
      (investor_id)=>{
        console.log(investor_id);
        this.db.object('investors/'+investor_id["$value"]).subscribe(
        ((snapshot)=>{
          this.investor = snapshot;
          this.investorDetails.next(snapshot);
        }),
        (error=>this.investorDetails.next("false"))
      )},
      (error)=>console.log("getting investor error")
    )
  }

  getInvestor(investorId : string){

    let _investor = this.db.object("investors/"+investorId);
    _investor.subscribe((snapshot)=>{
      this.investor = snapshot
    })
    console.log("investor is : ",this.investor)
    return _investor;    
  }

  getInvestorInvestmentDetails(startupId : string){
    this.db.object("startups/"+startupId).subscribe(snapshot=>console.log(snapshot));
    
  }

  getProfileOfInvestor(profileId : any){
    return this.db.object('profiles/'+profileId);
  }

  investInStartup(startup : IStartup,investmentDetails : IInvestmentDetails,investor_acc : Account,startup_acc : Account){
    console.log("investment details",investmentDetails);
    this.db.list('accounts/').update(investor_acc["$key"],investor_acc).then(success=>console.log(success),error=>console.log(error));
    this.db.list('accounts/').update(startup_acc["$key"],startup_acc).then(success=>console.log(success),error=>console.log(error));
    // this.db.list('investors/'+this.investor["$key"]+'/investments').update(startup["$key"],investmentDetails).then(success=>console.log(success))
    // this.db.list('startups/'+startup["$key"]+'/investments').push(investmentDetails).then(success=>console.log(success),error=>console.log(error))
    this.db.list('startups/'+startup["$key"]).set('investment_amount',startup.investment_amount).then(success=>console.log(success));
    this.db.list('investments').push(investmentDetails).then(success=>console.log(success),error=>console.log(error));

  }
  
  getTotalInvestorInvestments() : number{
    let noi = 0;
    if (this.investor.investments) {
      Object.keys(this.investor.investments).forEach(element=>noi++);
    } 
    console.log(noi);
    return noi;
  }

  getStartupById(startupId){
    return this.db.object('startups/'+startupId)
  }

  getInvestorAccDetails(accountId : string){
    return this.db.object('accounts/'+accountId)
  }

  getStartupAccDetails(accountId : string){
    return this.db.object('accounts/'+accountId)
    
  }

  getInvestmentsOfInvestor(){
    return this.db.list('investments');
    
  }
  startupInvestmentSubject : Subject<any>  = new Subject<any>();

  getInvestmentsOfStartup(startupId : string){
    var _startupIvestments = [];
   this.db.list('investments').subscribe(snapshot=>{
      snapshot.forEach(element=>{
        if (element["startup_id"]==startupId) {
          _startupIvestments.push(element);
        }
      })
      this.startupInvestmentSubject.next(_startupIvestments);
      //return _startupIvestments;
    })
    // return [];
  }

  followStartup(investor : Iinvestor, startup : IStartup){
    this.db.list('startups/'+startup["$key"]+"/followers").push(investor["$key"]).then(
      success=>console.log("investor added in startup following list",success),
      error=>{
        console.log("investor added in startup following list",error)
        })
    this.db.list('investors/'+investor["$key"]+'/following').push(startup["$key"]).then(
      success=>console.log("investor added in startup following list",success),
      error=>{
        console.log("investor added in startup following list",error)
        })
  }

  unfollowStartup(investor : Iinvestor, startup : IStartup){
    // this.db.list('startups/'+startup["$key"]+"/followers").remove(investor["$key"]).then(
    //   success=>console.log("investor removed in startup following list",success),
    //   error=>{
    //     console.log("error investor removed in startup following list",error)
    //     _isSuccess = false;
    //     })
    // this.db.list('investors/'+investor["$key"]+'/following').remove(startup["$key"]).then(
    //   success=>console.log("investor removed in startup following list",success),
    //   error=>{
    //     console.log("investor removed in startup following list",error)
    //     _isSuccess = false;
    //     })

    this.db.list('startups/'+startup["$key"]+"/followers").subscribe((snapshot)=>{
      snapshot.forEach((ele,i)=>{
        console.log("snapshot of i",snapshot[i]);
        if (snapshot[i]["$value"]==this.investor["$key"]) {
          this.removeStartupFollow(startup,snapshot[i]["$key"])
        }
      })
      console.log("removing:",snapshot);
    })

    this.db.list('investors/'+investor["$key"]+'/following').subscribe((snapshot)=>{
      snapshot.forEach((ele,i)=>{
        console.log("snapshot of i",snapshot[i]);
        if (snapshot[i]["$value"]==startup["$key"]) {
          // this.removeStartupFollow(startup,snapshot[i]["$key"])
          this.removeInvestorFollowing(investor,snapshot[i]["$key"])
        }
      })
    })
  }

  removeStartupFollow(startup,investorFollowKey){
    this.db.list("startups/"+startup["$key"]+"/followers/").remove(investorFollowKey).then(
      (success)=>{},
      (error)=>{}
    )
  }

  removeInvestorFollowing(investor,startupKey){
    this.db.list("investors/"+investor["$key"]+"/following").remove(startupKey).then(
      (success)=>{},
      (error)=>{}
    )

  }

  getInvestorFollowing(investorId : Iinvestor){
    return this.db.list('investors/'+investorId+"following")
  }

  addedInvestorKey: Subject<any> = new Subject<any>();


  addInvestor(investor:Iinvestor){
    this.db.list('investors').push(investor).then(
      (res)=> {this.addedInvestorKey.next(res.key);}
    );
  }
  getPitchedStartups(investor_id : String) : Observable<IPitchedStartup[]>{
    return this.db.list('investors/'+investor_id+'/pitchedStartups')
    .map((res)=>{
      return <IPitchedStartup[]>res
    })
    
  }

  removePitchedStartup(pitchedStartup : IPitchedStartup){
    this.db.list('investors/'+this.investor["$key"]+"/pitchedStartups").remove(pitchedStartup["$key"])
    .then(
      (success)=>console.log("successfully removed pitched startup"),
      (error)=>console.log("error in removeing pitched startup")
    )
  }

  uploadInvestorFile(image: File ,basicInvestorform : Iinvestor ){
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`image/`+ image.name).put(image);
    uploadTask.then(
      (res)=>{
        this.investorSignUp.name = basicInvestorform.name;
        this.investorSignUp.primary_acc = basicInvestorform.primary_acc;
        this.investorSignUp.about = basicInvestorform.about;
        this.investorSignUp.profilePic = res.downloadURL;
        console.log(this.investorSignUp);
      },
      (error)=>{
          console.log(error);
      }
    )
  }

  AddInvestorExperience(investorExperience : IInvestorExperience[]){
    this.investorSignUp.achievements =  investorExperience['achievements'];
    for(let exp of investorExperience['experience']){
      console.log(exp);
      this.investorSignUp.experience.push(exp);
    }
    
    console.log(this.investorSignUp);
  }

  AddInvestorSignUp(){
    this.db.list('investors').push(this.investorSignUp).then((item)=>{
      this.db.object('profiles/'+sessionStorage.loggedInUser+'/investor_id').set(item.key);
      console.log("success");
      sessionStorage.investor_id = item.key;
      this._router.navigate(['investorLanding']);
      console.log(this.investorSignUp);
    })
  }s

}
