import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
  selector: 'app-investment-success',
  templateUrl: './investment-success.component.html',
  styleUrls: ['./investment-success.component.css']
})
export class InvestmentSuccessComponent implements OnInit {

  constructor() { }

  ngOnInit() {

   console.log("init")
  }

  ngAfterViewInit(){
    console.log("afterview")
    this.btnClick();
  }

  btnClick(){
    setTimeout(
      $(".trigger").toggleClass("drawn")
    ,2000);
   
  }
}
