import { element } from 'protractor';
import { Router } from '@angular/router';
import { InvestorService } from './../../../services/investor-service/investor.service';
import { ActivatedRoute } from '@angular/router';
import { IStartup } from './../../../models/innovHelp/startup';
import { Component, OnInit,Inject, Input } from '@angular/core';
import * as echarts from 'echarts';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-startup-details',
  templateUrl: './startup-details.component.html',
  styleUrls: ['./startup-details.component.css']
})
export class StartupDetailsComponent implements OnInit {

  startup: IStartup;
  startupProgress: number;
  startupInvestments: any[] = [];
  chartOption: any;
  myChart: any;
  investor_acc: any;
  dataX: any[] = [];
  dataY: any[] = [];
  myChart2: any;
  chartOptions2: any;
  constructor(@Inject(DOCUMENT) private document: Document, private _activatedRoute: ActivatedRoute, private _investorService: InvestorService, private _router: Router) { }

  ngOnInit() {
    this.document.body.scrollTop = 0;
    console.log(" bjbj" + sessionStorage.loggedInUser);
    this._activatedRoute.params.subscribe((param) => {
      this._investorService.getStartupById(param["id"]).subscribe(snapshot => {
        this.startup = snapshot;
        console.log("startup detaiils : ", this.startup.investment_amount.toString())
        var _progress = (Number.parseFloat(this.startup.investment_amount.toString()) / Number.parseFloat(this.startup.valuation.toString())) * 100;
        this.startupProgress = _progress
        console.log(this.startupProgress);
        this._investorService.getInvestmentsOfStartup(param["id"]);
        this._investorService.startupInvestmentSubject.subscribe(
          (res) => {
            this.startupInvestments = res;
            console.log("startup investments : ", this.startupInvestments);
            this.initializeChartOptions();
            this.initalizeStartupChart();
            
          }
        )

        // this.createChart();

      })

    })


  }

  initalizeStartupChart() {
    try {
      this.myChart2 = echarts.init(document.getElementById('chart2'));
      console.log(this.myChart2);
      this.initalizeStartupChartOptions();
    } catch (error) {
      console.log("chart", error);
      
    }
  
  }

  initalizeStartupChartOptions() {

    var labelTop = {
      normal: {
        label: {
          show: true,
          position: 'center',
          formatter: '{b}',
          textStyle: {
            baseline: 'bottom'
          }
        },
        labelLine: {
          show: false
        }
      }
    };
    var labelFromatter = {
      normal: {
        label: {
          formatter: function (params) {
            return 100 - params.value + '%'
          },
          textStyle: {
            baseline: 'top'
          }
        }
      },
    }
    var labelBottom = {
      normal: {
        color: '#ccc',
        label: {
          show: true,
          position: 'center'
        },
        labelLine: {
          show: false
        }
      },
      emphasis: {
        color: 'rgba(0,0,0,0)'
      }
    };
    var radius = [100, 55];
    this.chartOptions2 = {
      
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: {
            show: true,
            type: ['pie', 'funnel'],
            option: {
              funnel: {
                width: '20%',
                height: '30%',
                itemStyle: {
                  normal: {
                    label: {
                      formatter: function (params) {
                        return 'other\n' + params.value + '%\n'
                      },
                      textStyle: {
                        baseline: 'middle'
                      }
                    }
                  },
                }
              }
            }
          },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          type: 'pie',
          center: ['10%', '30%'],
          radius: radius,
          x: '0%', // for funnel
          itemStyle: labelFromatter,
          data: [
            { name: 'Yet to be Invested', value: (Number.parseFloat(this.startup.investment_sought.toString())-Number.parseFloat(this.startup.investment_amount.toString())), itemStyle: labelBottom },
            { name: 'Invested', value: this.startup.investment_amount, itemStyle: labelTop }
          ]
        },

      ]
    };

    if (this.myChart2) {
      this.myChart2.setOption(this.chartOptions2)
    }

  }


  ngAfterViewInit() {
    try {
      this.myChart = echarts.init(document.getElementById('chart1'));
      console.log(this.myChart);
      this.initializeChartOptions();

      this.initalizeStartupChart();
    } catch (error) {
      console.log("chart not initalized ", error);
    }

  }


  initializeChartOptions() {
    this.dataX = [];
    this.dataY = [];

    this.startupInvestments.forEach(element => {
      (this.startup.investment_amount) = Number.parseFloat(this.startup.investment_amount.toString()) - Number.parseFloat(element["amount"]);
    })

    this.startupInvestments.forEach(element => {
      var _date = new Date(element["date"]);
      this.startup.investment_amount = Number.parseFloat(this.startup.investment_amount.toString()) + Number.parseFloat(element["amount"])
      this.dataX.push(_date.getDate() + "/" + (Number.parseInt(_date.getMonth().toString()) + 1) + "/" + _date.getFullYear())
      this.dataY.push(this.startup.investment_amount)
      console.log(element["date"]);
    })
    console.log("data", this.dataX);
    this.setupChart(this.dataX, this.dataY);
  }

  setupChart(dataX, dataY) {
    console.log("dataX : ", dataX)
    // this.myChart = echarts.init(document.getElementById('chart1'));
    // console.log(this.myChart);
    // var dateList = data.map(function (item) {
    //   return item[0];
    // });
    // var valueList = data.map(function (item) {
    //   return item[1];
    // });

    this.chartOption = {
      title: {
        text: 'Fundings',

      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Investments']
      },
      toolbox: {
        show: false,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
        }
      },
      xAxis: [
        {
          show: true,
          type: 'category',
          data: dataX
        }
      ],
      yAxis: [
        {
          show: true,
          type: 'value',
        }
      ],

      series: [
        {
          name: 'Investments',
          type: 'line',
          data: dataY,
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
          }
        },

      ]
    };
    if (this.myChart) {
      this.myChart.setOption(this.chartOption)
    }

  }



  investInStartup(startup: IStartup) {
    console.log(startup["$key"]);
    this._router.navigate(['/investorLanding/investment', startup["$key"]]);
    // this._investorService.investInStartup(startup);
  }

  createChart() {
    this.myChart = echarts.init(document.getElementById('chart1'));
    console.log(this.myChart);


    // var data = [["2000-06-05", 116], ["2000-06-06", 129], ["2000-06-07", 135], ["2000-06-08", 86], ["2000-06-09", 73], ["2000-06-10", 85], ["2000-06-11", 73], ["2000-06-12", 68], ["2000-06-13", 92], ["2000-06-14", 130], ["2000-06-15", 245], ["2000-06-16", 139], ["2000-06-17", 115], ["2000-06-18", 111], ["2000-06-19", 309], ["2000-06-20", 206], ["2000-06-21", 137], ["2000-06-22", 128], ["2000-06-23", 85], ["2000-06-24", 94], ["2000-06-25", 71], ["2000-06-26", 106], ["2000-06-27", 84], ["2000-06-28", 93], ["2000-06-29", 85], ["2000-06-30", 73], ["2000-07-01", 83], ["2000-07-02", 125], ["2000-07-03", 107], ["2000-07-04", 82], ["2000-07-05", 44], ["2000-07-06", 72], ["2000-07-07", 106], ["2000-07-08", 107], ["2000-07-09", 66], ["2000-07-10", 91], ["2000-07-11", 92], ["2000-07-12", 113], ["2000-07-13", 107], ["2000-07-14", 131], ["2000-07-15", 111], ["2000-07-16", 64], ["2000-07-17", 69], ["2000-07-18", 88], ["2000-07-19", 77], ["2000-07-20", 83], ["2000-07-21", 111], ["2000-07-22", 57], ["2000-07-23", 55], ["2000-07-24", 60]];



  }

}
