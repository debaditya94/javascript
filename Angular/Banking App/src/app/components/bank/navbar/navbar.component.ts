import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {


  servicesDropdownShow:boolean = false;
  productsDropdownShow:boolean = false;

  constructor() { }
  servicesHover(){
    this.servicesDropdownShow = true;
  }
  servicesMouseLeave(){
    this.servicesDropdownShow = false;
  }
  servicesClick(){
    this.servicesDropdownShow = !this.servicesDropdownShow;
  }
  productsHover(){
    this.productsDropdownShow = true;
  }
  productsMouseLeave(){
    this.productsDropdownShow = false;
  }
  productsClick(){
    this.productsDropdownShow = !this.productsDropdownShow;
  }
  ngOnInit() {

  }

  navbarCollapsed:boolean = false;
  toggleCollapseNavbar(){
    this.navbarCollapsed = !this.navbarCollapsed;
  }

}
