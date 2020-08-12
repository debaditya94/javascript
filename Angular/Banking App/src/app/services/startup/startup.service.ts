import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database-deprecated";
import { Subject } from "rxjs/Subject";
import { IStartup } from "../../models/innovHelp/startup";

@Injectable()
export class StartupService {

  constructor(public db: AngularFireDatabase) { }

  startupDetails:Subject<any> = new Subject<any>();
  startup:IStartup;

  getStartupByUsername(){
    return this.db.object('startups/'+sessionStorage.startup_id);
  }

  getInvestors(){
    return this.db.object('investors');
  }
  getInvestments(){
    return this.db.object('investments');
  }
  getStartups(){
    return this.db.object('startups');
  }

  getInvestorById(id:string){
    return this.db.object('investors/'+id);
  }

  pushPitchStartup(pitch){
    this.db.list('startups/'+sessionStorage.startup_id+"/pitchedStartups").push(pitch);
  }
  pushPitchInvestor(pitch, id){
    this.db.list('investors/'+id+"/pitchedStartups").push(pitch);
  }
}
