import { Component, OnInit } from '@angular/core';
import { StartupService } from "../../../services/startup/startup.service";
import { IStartup } from "../../../models/innovHelp/startup";

@Component({
  selector: 'app-start-up-landing',
  templateUrl: './start-up-landing.component.html',
  styleUrls: ['./start-up-landing.component.css']
})
export class StartUpLandingComponent implements OnInit {

  constructor(private _startupService: StartupService) { }

  startup: IStartup={
    name : "StartUp",
    location : "",
    s_description : "",
    l_description : " ",
    website : "",
    logoUrl: "https://www.seoclerk.com/pics/551103-1TOqFD1502285018.jpg",
  };
  
  ngOnInit() {
    this._startupService.getStartupByUsername().subscribe((res)=>{
      this.startup = res;
    })
  }

}
