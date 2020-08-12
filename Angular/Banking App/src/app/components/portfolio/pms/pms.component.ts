import { FormGroup, FormControl } from '@angular/forms';
import { Currency } from './../../../models/currency';
import { Response } from '@angular/http';
import { SavingService } from './../../../services/saving.service';
import { FirebaseServiceService } from './../../../services/firebase-service/firebase-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Savings } from '../../../models/savings';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import * as $ from 'jquery';
import * as echarts from 'echarts';
import { error } from 'util';

@Component({
  selector: 'app-pms',
  templateUrl: './pms.component.html',
  styleUrls: ['./pms.component.css']
})
export class PmsComponent implements OnInit {

  goals: Savings[] = [];
  displayedColumns = ['financialGoal', 'savingsGoal', 'currentSavings', 'annualInterest', 'numberOfYears', 'monthlyInvestment', 'compounding'];
  dataSource: MatTableDataSource<Savings>;
  curr: FormGroup;

  stock: any;
  theData: Object;
  keys: any[] = [];
  data = [];
  finish: boolean = false;
  time: string[] = [];
  stockName: string[] = ['NIFTY', 'TATASTEEL', 'WIPRO', 'AXISBANK'];
  name: string[] = [];
  chartOption: any;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  max: string = sessionStorage.max;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _firebase: FirebaseServiceService, private _saving: SavingService) {

  }


  ngAfterViewInit() {
    try{
      this.plotChart(this.stockName[0])
    }
    catch(error){
      console.log(error)
    }
    this._firebase.getGoals().subscribe((snapshot) => {
      this.goals = snapshot.reverse();
      this.dataSource = new MatTableDataSource(this.goals);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  ngOnInit() {
    this._firebase.findMax();
    for (let comp of this.stockName) {
      this._saving.getPrice(comp).subscribe((Response) => {
        this.data.push(Response);
        this.theData = Response['Time Series (1min)'];
        this.time.push(Object.keys(this.theData)[0]);
      });
    }



    this.curr = new FormGroup({
      "from": new FormControl(),
      "fromCurr": new FormControl("USD"),
      "to": new FormControl(),
      "toCurr": new FormControl("INR")
    })

  }

  plotChart(name: string) {
    let closing_value: number[] = [];
    let time: string[] = [];
    let data: any[] = [];
    let time_series: any;
    let time_stamp: any[] = [];
    this._saving.getPrice(name).subscribe((Response) => {
      data.push(Response);

      time_series = Response['Time Series (1min)']
      time_stamp.push(Object.keys(time_series))

      for (let i = 0; i < 100; i++) {
        var x = time_stamp[0][i].split(" ")[1].split(":")
        time_stamp[0][i] = (x[0] + ":" + x[1]);
      }
      for (let a of Object.keys(time_series)) {
        let actData = time_series[a]
        closing_value.push(actData['4. close']);

      }
      this.createChart(name, time_stamp[0], closing_value);
    },
      (error) => {
        console.log(error);
      });
  }


  createChart(name: string, time: number[], closing_value: number[]) {
    let mychart = echarts.init(document.getElementById('chart'))

    if (name == "NIFTY") {
      name = "NIFTY 50";
    }
    else if (name == "TATASTEEL") {
      name = "TATA STEEL LTD.";
    }

    else if (name == "AXISBANK") {
      name = "AXIS BANK LTD.";

    }
    this.chartOption = {
      title: {
        text: name + " stock analysis"
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['意向', '预购', '成交']
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: time
        }
      ],

      yAxis: [
        {
          type: 'value',
          max: Math.max.apply(Math, closing_value) + .5,
          min: Math.min.apply(Math, closing_value) - .5,
        }
      ],


      series: [
        {
          name: 'closing',
          type: 'line',
          smooth: true,
          itemStyle: { normal: { areaStyle: { color: '#E8786E' }, lineStyle: { color: '#E54D65' } } },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#E54D65' // color at 0% position
                }, {
                  offset: 1, color: '#E8786E' // color at 100% position
                }],
                globalCoord: false // false by default
              }
            }
          },
          data: closing_value
        }
      ]
    };
    mychart.setOption(this.chartOption);
    this.finish = true;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  exchange(curr: FormGroup) {
    var data: Currency = curr.value
    this._saving.getExhangeRate(data.fromCurr, data.toCurr).subscribe((ex) => {
      ex = parseFloat(ex);
      var to = data.from * ex;
      this.curr.controls['to'].setValue(to);
    })
  }

  reset() {
    this.curr.controls['from'].setValue(null);
    this.curr.controls['to'].setValue(null);
  }


}


