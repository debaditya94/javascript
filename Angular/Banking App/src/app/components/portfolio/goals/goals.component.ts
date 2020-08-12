import { Portfolio } from './../../../models/portfolio';
import { FirebaseServiceService } from './../../../services/firebase-service/firebase-service.service';
import { Savings } from './../../../models/savings';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import * as echarts from 'echarts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  chartOption: any;
  savingsForm: FormGroup;
  savingsEstimator: FormGroup;
  timeEstimator: FormGroup;
  goals:string[]=['Marriage','Travel','Education','Buy an asset'];
  form:Savings;
  emi:number;
  total_savings:number;
  years:number;
  months:number;
  cummInvestment: number[] = [];
  cummInterest: number[] = [];
  time: number[] = [];
  factor: number = 0;
  factor1: number = 0;
  constructor(private _route:ActivatedRoute,private _firebase:FirebaseServiceService) {
    this.savingsForm = new FormGroup({
      financialGoal: new FormControl("Marriage", [Validators.required,this.goalsValidator]),
      savingsGoal: new FormControl(200000, [Validators.required,this.Validator]),
      currentSavings: new FormControl(1000),
      annualInterest: new FormControl(2.5, [Validators.required,this.Validator]),
      compounding: new FormControl("Monthly", Validators.required),
      numberOfYears: new FormControl(5,[Validators.required,this.Validator]),
    })

    this.savingsEstimator = new FormGroup({
      financialGoal: new FormControl("Marriage", [Validators.required,this.goalsValidator]),
      currentSavings: new FormControl(1000),
      monthlyInvestment: new FormControl(100, [Validators.required,this.Validator]),
      annualInterest: new FormControl(2.5, [Validators.required,this.Validator]),
      compounding: new FormControl("Quarterly", Validators.required),
      numberOfYears: new FormControl(10, [Validators.required,this.Validator]),
    })

    this.timeEstimator = new FormGroup({
      financialGoal: new FormControl("Marriage", [Validators.required,this.goalsValidator]),
      currentSavings: new FormControl(1000),
      savingsGoal: new FormControl(50000, [Validators.required,this.Validator]),
      monthlyInvestment: new FormControl(100, [Validators.required,this.Validator]),
      annualInterest: new FormControl(2.5, [Validators.required,this.Validator]),
      compounding: new FormControl("Monthly", Validators.required),
    })
  }

  ngOnInit() {
  }
  ngAfterViewInit(){
   
  }
  

  submitForm(form: FormGroup) {
    console.log(form)
    this.form = form.value
    this.getFactors(this.form);
    this.cummInvestment = [];
    this.cummInterest = [];
    this.time = [];
    let savgoal = this.form.savingsGoal;
    let curr = this.form.currentSavings;
    let time = this.form.numberOfYears;
    let annInt = this.form.annualInterest;
    let factoralInterest = (annInt / this.factor) / 100;

    let emi = 0, temp = 0, sum = 0;
    savgoal -= curr;
    temp = (100 / (100 + factoralInterest)) ** (this.factor * time);
    temp = 100 * (1 - temp);
    sum = savgoal * factoralInterest;
    emi = sum / temp / this.factor1;
    this.emi=Math.floor(emi);
    let total_months = time * 12;
    this.getdatatoPlot(curr, emi, total_months, factoralInterest);
    this.analyse(time, this.factor1, this.time, this.cummInvestment, this.cummInterest);
    this.total_savings=null;
    this.years=null;
  }

  submitSavingsEstimator(form: FormGroup) {
    console.log(form.value);
    this.cummInvestment = [];
    this.cummInterest = [];
    this.time = [];
    this.form = form.value;
    this.getFactors(this.form);
    let curr = this.form.currentSavings;
    let annInt = this.form.annualInterest;
    let factoralInterest = (annInt / this.factor) / 100;
    let monthlyInvestment = this.form.monthlyInvestment;
    let total_months = this.form.numberOfYears * 12
    this.getdatatoPlot(curr, monthlyInvestment, total_months, factoralInterest);
    this.analyse(total_months / 12, this.factor1, this.time, this.cummInvestment, this.cummInterest);
    this.emi=null;
    this.years=null;
  }


  submitGoalTime(form: FormGroup) {
    console.log(form.value);
    this.cummInvestment = [];
    this.cummInterest = [];
    this.time = [];
    this.form = form.value;
    this.getFactors(this.form);

    let curr = this.form.currentSavings;
    let monthlyInvestment = this.form.monthlyInvestment;
    let annint = this.form.annualInterest;
    let factoralInterest = (annint / 100) / this.factor;
    let savegoal = this.form.savingsGoal;
    let sum = curr, i = 1;
    let interest = 0, cuminvest = 0, cumsavings = curr, cuminterest = 0;
    while (sum < savegoal) {

      if (i % this.factor1 == 0) {
        interest = sum * factoralInterest;
        cuminterest += interest;
        sum = sum + interest + monthlyInvestment;
        sum = Math.floor(sum);

      }
      else { sum += monthlyInvestment; }
      i++;
    }
    let total_months = i;
    this.years = Math.floor(i / 12);
    this.months = Math.floor(i % 12);
    this.getdatatoPlot(curr, monthlyInvestment, total_months, factoralInterest);
    this.analyse(this.years, this.factor1, this.time, this.cummInvestment, this.cummInterest);
    this.emi=null;
    this.total_savings=null;
  }

  getFactors(form: Savings) {
    switch (form.compounding) {
      case "Monthly":
        this.factor = 12;
        this.factor1 = 1;
        break;
      case "Quarterly":
        this.factor = 4;
        this.factor1 = 3;
        break;
      case "Half-yearly":
        this.factor = 6;
        this.factor1 = 2;
        break;
      case "Yearly":
        this.factor = 1;
        this.factor1 = 12;
        break;
    }
  }

  getdatatoPlot(curr: number, monthlyInvestment: number, total_months: number, factoralInterest) {
    let interest = 0, cuminvest = 0, cumsavings = curr, cuminterest = 0;
    let sum = curr + monthlyInvestment;
    let saving = 0;
    for (let i = 1; i <= (total_months); i++) {
      if (i % this.factor1 == 0) {
        this.time.push(i);
        saving = sum - this.factor1 * monthlyInvestment + cuminterest;
        interest = Math.ceil(saving * factoralInterest);
        cuminterest += interest;
        this.cummInterest.push(cuminterest);
        this.cummInvestment.push(sum);
        sum = sum + monthlyInvestment;
        sum = Math.ceil(sum);

      }
      else {
        sum += monthlyInvestment;
        sum = Math.ceil(sum);
      }
    }
    this.total_savings=sum+cuminterest-monthlyInvestment;
  }

  analyse(years: number, f: number, time: number[], cummInv: number[], cummInt: number[]) {
    var t: number[] = [];
    var Inv: number[] = [];
    var Inr: number[] = [];
    let yLabel;

    if (years >= 10) {
      for (var i = 0; i < time.length; i++) {
        if (time[i] % 12 == 0) {
          t.push(time[i] / 12);
          Inv.push(cummInv[i]);
          Inr.push(cummInt[i]);
          yLabel = "Years"
        }
      }
    }
    else if (years >= 5) {
      for (var i = 0; i < time.length; i++) {
        if (time[i] % 6 == 0) {
          if (f == 12) {
            t.push(time[i] / f);
            yLabel = "Years"
          }
          else {
            t.push(time[i]);
            yLabel = "Months"
          }
          Inv.push(cummInv[i]);
          Inr.push(cummInt[i]);
        }
      }
    }
    else if (years >= 2) {
      for (var i = 0; i < time.length; i++) {
        if (time[i] % 3 == 0) {
          if (f == 12) {
            t.push(time[i] / f);
            yLabel = "Years"
          }
          else {
            t.push(time[i]);
            yLabel = "Months"
          }
          Inv.push(cummInv[i]);
          Inr.push(cummInt[i]);
        }
      }
    }
    else {
      yLabel = "Months"
      t = time;
      Inv = cummInv;
      Inr = cummInt;
    }
    this.createChart(yLabel, t, Inv, Inr)
  }

  createChart(yLabel: string, time: number[], cummInv: number[], cummInt: number[]) {
    let mychart = echarts.init(document.getElementById('chart1'))
    this.chartOption = {
      title: ({
        text: yLabel,
        top: 'bottom',
        left: 'center'
      }),
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Cumulative Investment', 'Cumulative Interest']
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: time
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Cumulative Investment',
          type: 'bar',
          stack: 'advertising',
          data: cummInv
        },
        {
          name: 'Cumulative Interest',
          type: 'bar',
          stack: 'advertising',
          data: cummInt
        }
      ]
    };
    mychart.setOption(this.chartOption);
  }

  Validator(Control:AbstractControl){
    return (Control.value) <=0 ?{invalid:true}:null;
  };

  goalsValidator(financialGoalControl:AbstractControl){
    return ['Marriage','Travel','Education','Buy an asset'].indexOf(financialGoalControl.value) < 0 ?{goal:true}:null;
  }

  addGoal(form:FormGroup){
    var goal:Savings;
    goal=form.value;
      if(this.emi){
        goal.monthlyInvestment=this.emi
      }
      else if(this.years || this.months){
        goal.numberOfYears = this.years+Math.round((this.months)/12*100)/100;
      }
      else{
        goal.savingsGoal=this.total_savings
      }
    this._firebase.addGoalToPortfolio(goal);
    }

    al(){
      console.log("njn,");
    }

}
