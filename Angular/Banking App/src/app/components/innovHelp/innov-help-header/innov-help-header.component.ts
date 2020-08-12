import { UserService } from './../../../services/user/user.service';
import { Iinvestor } from './../../../models/innovHelp/investor';
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-innov-help-header',
  templateUrl: './innov-help-header.component.html',
  styleUrls: ['./innov-help-header.component.css']
})
export class InnovHelpHeaderComponent implements OnInit {

  @Input() investor : Iinvestor;
  constructor(private _userService : UserService) { }

  ngOnInit() {
  }

  logout(){
    this._userService.logout();
  }

}
