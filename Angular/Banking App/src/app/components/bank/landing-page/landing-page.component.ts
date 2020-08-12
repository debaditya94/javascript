import { Component, OnInit , ViewChild, ElementRef,Renderer2, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from "../../../services/user/user.service";


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent implements OnInit, AfterViewInit {
  @ViewChild('dashimg') dashimg:ElementRef;
  @ViewChild('pmsimg') pmsimg:ElementRef;
  @ViewChild('chequeimg') chequeimg:ElementRef;
  @ViewChild('accountsimg') accountsimg:ElementRef;
  @ViewChild('innovimg') innovimg:ElementRef;

  ngAfterViewInit(): void {
    let sub = this.route.params.subscribe(params => {
      let y = this.route.firstChild.toString();
      console.log(this.route.children.toString());
      console.log(this.route.snapshot.children.toString());
      
      if(y.indexOf("digicheque")>0){
        console.log(this.chequeimg.nativeElement.src);
        this.clickedItem = this.chequeimg.nativeElement;
        this.btnHover(this.chequeimg.nativeElement);
      }
      else if(y.indexOf("portfolio")>0 && y.indexOf("portfolio_saviings")<0){
        console.log(this.pmsimg.nativeElement.src);
        this.clickedItem = this.pmsimg.nativeElement;
        this.btnHover(this.pmsimg.nativeElement);
      }
      else if(y.indexOf("accounts")>0){
        console.log(this.accountsimg.nativeElement.src);
        this.clickedItem = this.accountsimg.nativeElement;
        this.btnHover(this.accountsimg.nativeElement);
      }
      else if(y.indexOf("dashboard")>0){
        console.log(this.dashimg.nativeElement.src);
        this.clickedItem = this.dashimg.nativeElement;
        this.btnHover(this.dashimg.nativeElement);
      }
   });
  }

  constructor(private route:ActivatedRoute, private rd: Renderer2, private userService: UserService) { }

  clickedItem = null;
  hoveredItem = null;
  routedItem;
  ngOnInit() {
    console.log(sessionStorage.loggedInUser);
  }
  btnHover(item) {
    // if (item.src.indexOf("-white.png") < 0) {
    //   let str = item.src.substring(0, item.src.indexOf(".png"));
    //   str = str + "-white.png"
    //   item.src = str;
    //   this.hoveredItem = item;
    // }
  }
  btnClick(item) {
    // let temp = this.clickedItem;
    // this.clickedItem = item;
    // this.btnOut(temp);

  }
  btnOut(item) {
    // if (item !== this.clickedItem) {
    //   let str = item.src.substring(0, item.src.indexOf("-white.png"));
    //   str = str + ".png"
    //   item.src = str;
    // }
  }
}
