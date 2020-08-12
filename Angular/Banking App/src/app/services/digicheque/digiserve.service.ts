import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'; 

@Injectable()
export class DigiserveService {

  //public onForm : Subject<boolean> = new Subject<boolean>();
  private _filled : boolean = false;

  constructor() { }

  // click(){
  //   this._filled.onForm.next(true);
  

}
