import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class SavingService {
  exchangeRate:number;
  constructor(private _http: Http) { }


 getPrice(stockName:string):Observable<any>{
  return this._http.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+stockName+"&interval=1min&apikey=1LW5VQSI0S1CRS8H")
  .map((respose : Response)=> respose.json())
 }

 getExhangeRate(fromCurr:string,toCurr:string){
  return this._http.get("https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency="+fromCurr+"&to_currency="+toCurr+"&apikey=1LW5VQSI0S1CRS8H")
  .map((respose : Response)=> {return respose.json()["Realtime Currency Exchange Rate"]["5. Exchange Rate"]});
 }
}
