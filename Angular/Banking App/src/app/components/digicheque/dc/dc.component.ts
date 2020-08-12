import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { DigiformComponent } from '../digiform/digiform.component';





@Component({
  selector: 'app-dc',
  templateUrl: './dc.component.html',
  styleUrls: ['./dc.component.css']
})
export class DcComponent implements OnInit {

 
  constructor() {
   }


  ngOnInit() {
    
    // this.userService.getAccountIds().subscribe(
    //   (res)=>{
    //     this.accounts = [];
    //     Object.keys(res).forEach(element=>{
    //       this.userService.getAccounts(res[element]).subscribe(
    //         (res)=>{
    //           this.acc = {
    //             profile_id: res["profile_id"],
    //             account_no: res["account_no"],
    //             account_type:res["account_type"],
    //             balance:res["balance"],
    //           }
    //           this.accounts.push(this.acc);
    //           console.log(this.accounts);
    //         }
    //       )
    //     })
    //   }
    // );
 
  }

   
  
  
  }
  

