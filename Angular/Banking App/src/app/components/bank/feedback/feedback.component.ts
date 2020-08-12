import { Component, OnInit } from '@angular/core';
declare var round:any;

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
 
  public i;
  constructor() { 
    
  }

  ngOnInit() {
  
     
    setInterval(window.onload=function() {
     var feedback=[
        'Simple, but awesome design!! Very smooth flow through out the site. Even naive users can experience it.  ',
         'Thanks to Innov Help of Just Bank thorugh because of which I am implementing my Start-Up',
         'Digi-Cheque service is quite awesome. I am now using it for all my business needs. Thankyou Just Bank',
         'Loved the customer support Just Bank is providing. The transactions are very secure here. Take a bow Just Bank :-)', 
         'I have saved Rs.1,00,000 with the help of Goal Planner of Just Bank. Services are simply awesome. ' 
       ];
       var cite=[
         'Mr.Prakash Rao',
         'Mr.Bala Vignesh',
         
         'Ms. Nivetha Thomas',
         'Ms.Catherine Teresa',
         'Mr.Antony Raj'
       ]
       var i = Math.round((Math.random()) * feedback.length);
   
     // console.log(i);
  
       if (i == feedback.length) --i;
    // document.getElementById("bq").innerText=feedback[i];
     //document.getElementById("ci").innerText=cite[i];
     }, 3*1000);
     
   }
  }
