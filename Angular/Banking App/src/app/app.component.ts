import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private ref: ChangeDetectorRef){
    setInterval(()=>{
      this.ref.detectChanges();
    },1000)
  }
  title = 'app';
}
