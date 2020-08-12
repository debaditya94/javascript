import { Component, OnInit } from '@angular/core';
import { Iinvestor } from '../../../models/innovHelp/investor';
import { StartupService } from '../../../services/startup/startup.service';
import { IInvestment, IStartup } from '../../../models/innovHelp/startup';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-investor-list',
  templateUrl: './investor-list.component.html',
  styleUrls: ['./investor-list.component.css']
})
export class InvestorListComponent implements OnInit {

  constructor(private _startupService: StartupService,public snackBar: MatSnackBar) { }

  investors: Iinvestor[] = [];
  investment_ids: string[] = [];
  investments = [];

  investors_ids: string[] = [];
  sectionToShow:boolean[]=[];

  startups: IStartup[]=[];

  ngOnInit() {
    this._startupService.getInvestors().subscribe((res) => {
      console.log(res);
      this.investors_ids = Object.keys(res);
      this.investors = Object.values(res);
      Object.keys(res).forEach(element => {
        this.sectionToShow.push(false);
      });
    });
    this._startupService.getInvestments().subscribe((res) => {
      console.log(res);
      
      this.investors_ids.forEach((id)=>{
        let arr = [];
        Object.values(res).forEach((ele)=>{
          if(id === ele.investor_id){
            arr.push(ele);
          }
        }); 
        console.log(id);
        console.log(arr);
        
        this.investments.push({id:arr});
      });
      console.log(this.investments);
    });
    this._startupService.getStartups().subscribe((res)=>{
      this.startups = res;
      console.log(this.startups);
    })
  }

  pitchIdea(idx, message:HTMLTextAreaElement){
    let id = this.investors_ids[idx];
    let pitch = {
      date:new Date().toJSON().slice(0,10),
      msg:message.value,
      startup_key:sessionStorage.startup_id,
      investor_key:id
    }
    this._startupService.pushPitchInvestor(pitch,id);
    this._startupService.pushPitchStartup(pitch);
    this.snackBar.open("Idea Pitched","",{
      duration : 2000,
    })
  }
}
