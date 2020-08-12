import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { InvestorService } from '../../../services/investor-service/investor.service';
import { Router } from '@angular/router';
import { StartupService } from "../../../services/startup/startup.service";

@Component({
  selector: 'app-innov-help',
  templateUrl: './innov-help.component.html',
  styleUrls: ['./innov-help.component.css']
})
export class InnovHelpComponent implements OnInit, AfterViewInit {

  progressbarVisible: boolean = true;

  ngAfterViewInit(): void {
    // this.progressbar.nativeElement.style.display = 'block';
  }

  color = 'primary';
  mode = 'indeterminate';

  constructor(
    private _investorService: InvestorService,
    private _router: Router,
    private _startupService: StartupService
  ) { }

  isInvestor: boolean = false;
  isStartUp: boolean = false;
  cntr: number = 0;
  ngOnInit() {
    this.isInvestor = false;
    this.isStartUp = false;
    
    if(sessionStorage.investor_id !== "undefined"){
      this.isInvestor = true;
      console.log("isInvestor",sessionStorage.investor_id);
    }
    if(sessionStorage.startup_id !== "undefined"){
      this.isStartUp = true;
      console.log("isstartup");
    }
  
  }
  investorClicked() {
    if (this.isInvestor) {
      this._router.navigate(['/investorLanding']);
    }
    else {
      this._router.navigate(['/investorSignup']);
    }
  }

  startupClicked() {
    if (this.isStartUp) {console.log('/innovStartup');
      this._router.navigate(['/innovStartup']);
    }
    else {
      this._router.navigate(['/startUpSignup']);
    }
  }
}
