import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from "../../../services/user/user.service";
import { Router } from "@angular/router";
import { User } from "../../../models/user";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  username : string;
  password : string;
  email:string;

  subheading:string = "Sign In";
  subsubheading:string = "and bank the right way";
  forgotText:string = "Forgot Username?"

  usernameAvailable:boolean = false;
  errorFound:boolean = false;
  error:string = "";

  constructor(private userService: UserService, private Router:Router) { }

  color = 'primary';
  mode = 'indeterminate';

  user: User;
  
  ngOnInit() {

    if(sessionStorage.loggedInUser)
    if(sessionStorage.loggedInUser!='null'){
      this.Router.navigate(['landingPage/digicheque']);
    }
  }

  login(progress){
    progress.style.display='block';
    this.userService.login(this.user, this.password).then(
      (res)=>{
        progress.style.display = "none";
        console.log("signed in");
        this.errorFound = false;
        this.error = ""; 
        this.Router.navigate(['/landingPage/digicheque']);
        // redirect to dashboard
      },
      (err)=>{
        progress.style.display = "none";        
        this.errorFound = true;
        this.error = err; 
      }
    );
  }
  inputClicked(){
    this.errorFound = false;
  }

  usernameEntered(progress){
    progress.style.display='block';
    this.userService.getProfilesSnapshot().subscribe(
      (snapshot)=>{
        try{
        console.log(snapshot[this.username].email);
        this.email = snapshot[this.username].email;
        //this.userService.login(snapshot[this.username].email,this.password);
        this.user = snapshot[this.username];
        progress.style.display = "none";
        this.usernameAvailable = true;
        this.subheading = "Welcome";
        this.subsubheading = "Log in as "+this.email;
        this.forgotText="Forgot Password?";
        }
        catch(e){
          console.log(e);
          progress.style.display = "none";
          this.error="Username not found";
          this.errorFound = true;        
        }
        
      },
      (err)=>{  
        
      }
    );  
  }
  backClicked(progress){
    this.usernameAvailable =false;

    this.subheading = "Sign In";
    this.subsubheading = "and bank the right way";
    this.forgotText="Forgot Username?";
  }
  backtohome(){
    this.Router.navigate(['home']);
  }
}

