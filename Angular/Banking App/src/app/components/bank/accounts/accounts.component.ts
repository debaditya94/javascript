import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Account} from  '../../../models/account';
 @Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  aboutAccount: any;

  constructor(private userService:UserService) { }
  
  accountType:string = "Select account type";


  showCreateAccountBtn = false;
  
  acc:Account;

  accounts : Account[] = [];
  ngOnInit() {
    this.userService.getAccountIds().subscribe(
      (res)=>{
        this.accounts = [];
        Object.keys(res).forEach(element=>{
          this.userService.getAccounts(res[element]).subscribe(
            (res)=>{
              this.acc = {
                profile_id: res["profile_id"],
                account_no: res["account_no"],
                account_type:res["account_type"],
                balance:res["balance"],
              }
              this.accounts.push(this.acc);
              console.log(this.accounts);
            }
          )
        })
      }
    );
  }

  droppingDown(drop){
    drop.style.display="block";
  }
  uppingDown(drop){
    drop.style.display="none";
  }
  clickedDown(drop){
    if(drop.style.display==="none"){
      drop.style.display="block";
    }
    else{
      drop.style.display="none";
    }
  }

  liClicked(item){
      // console.log(item.textContent);
      this.accountType = item.textContent;
      this.aboutAccount = "Some generic text why "+this.accountType+" is very good for you and provides this ROI";
      this.showCreateAccountBtn = true;

  }
  addAccountCardClicked(item:HTMLDivElement, slideIn){
    item.classList.add('goAway');
    setInterval(
      ()=>{
        item.classList.add('displayNone');
        slideIn.classList.add('displayBlock');
        slideIn.classList.add('comein');
      },
      400
    )
    
    
  }

  createAccBtnClicked(item){
    item.style.display = 'block';
    this.userService.createAccount(this.accountType);
    this.userService.accountCreationSubject.subscribe((res)=>
      {
        item.style.display = 'none';
        console.log(res);
        
      } 
    );

  }
}
