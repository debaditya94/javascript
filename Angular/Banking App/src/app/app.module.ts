import { InvestorListComponent } from './components/innovHelp/investor-list/investor-list.component';
import { DefaultTryComponent } from './components/bank/default-try/default-try.component';
import { FeedbackComponent } from './components/bank/feedback/feedback.component';
import { CanActivateGuard } from './guards/can-activate/can-activate.guard';
import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';
import { DefaultHomeComponent } from './components/bank/default-home/default-home.component';
import { InnovStartUpSignUpComponent } from './components/innovHelp/innov-start-up-sign-up/innov-start-up-sign-up.component';
import { DigiformComponent } from './components/digicheque/digiform/digiform.component';
import { InnovHelpHeaderComponent } from './components/innovHelp/innov-help-header/innov-help-header.component';
import { InvestorService } from './services/investor-service/investor.service';
import { SavingService } from './services/saving.service';
import { StartupDetailsComponent } from './components/innovHelp/startup-details/startup-details.component';
import { FirebaseServiceService } from './services/firebase-service/firebase-service.service';
import { RouterModule } from "@angular/router";
import { UserService } from './services/user/user.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/app-routing/app-routing.module';
     
   
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/bank/navbar/navbar.component';
import { HomeComponent } from './components/bank/home/home.component';
import { LoginComponent } from './components/bank/login/login.component';
import { FooterComponent } from './components/bank/footer/footer.component';
import { SignupComponent } from './components/bank/signup/signup.component';
import { LandingPageComponent } from './components/bank/landing-page/landing-page.component';
import { DcComponent } from './components/digicheque/dc/dc.component';
import { PmsComponent } from './components/portfolio/pms/pms.component';
import { SavingsCalculatorComponent } from "./components/portfolio/savings-calculator/savings-calculator.component";
import { InnovHelpComponent } from './components/innovHelp/innov-help/innov-help.component';
import { DcinfoComponent } from './components/bank/dcinfo/dcinfo.component';
import { PmsinfoComponent } from './components/bank/pmsinfo/pmsinfo.component';
import { IhInfoComponent } from './components/bank/ih-info/ih-info.component';

import { UserHeaderComponent } from './components/bank/user-header/user-header.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {DropdownModule} from "ngx-dropdown";
import { environment } from '../environments/environment';
import { DigichequeOtpComponent } from './components/digicheque/digicheque-otp/digicheque-otp.component';
import { InvestorLandingComponent } from './components/innovHelp/investor-landing/investor-landing.component';
import { DigichequeDetailsComponent } from './components/digicheque/digicheque-details/digicheque-details.component';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { HttpModule } from "@angular/http";
import { DashboardComponent } from './components/bank/dashboard/dashboard.component';
import { AccountsComponent } from './components/bank/accounts/accounts.component';
import { BeneficiaryFormsComponent } from "./components/digicheque/beneficiary-forms/beneficiary-forms.component";
import { InvestorInvestmentsComponent } from './components/innovHelp/investor-investments/investor-investments.component';
import { StartupListComponent } from './components/innovHelp/startup-list/startup-list.component';
import { InvestmentAgreementComponent } from './components/innovHelp/investment-agreement/investment-agreement.component';
import { InvestmentSuccessComponent } from './components/innovHelp/investment-success/investment-success.component';
import { MatNativeDateModule } from "@angular/material/core";
import { NewAccountComponent } from "./components/bank/new-account/new-account.component";
import { DigichequeConfirmationComponent } from "./components/digicheque/digicheque-confirmation/digicheque-confirmation.component";
import { DigiserveService } from "./services/digicheque/digiserve.service";
import { PitchedStartupsComponent } from './components/innovHelp/pitched-startups/pitched-startups.component';
import { StartUpLandingComponent } from './components/innovHelp/start-up-landing/start-up-landing.component';
import { InvestorSignUpComponent } from './components/innovHelp/investor-sign-up/investor-sign-up.component';
import { StartUpListComponent } from './components/innovHelp/start-up-list/start-up-list.component';
import { StartupService } from "./services/startup/startup.service";
import { GoalsComponent } from "./components/portfolio/goals/goals.component";
import { SearchStartupPipe } from './pipes/innov-help/search-startup.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    SignupComponent,
    LandingPageComponent,
    DcComponent,
    PmsComponent,
    SavingsCalculatorComponent,
    InnovHelpComponent,
    DcinfoComponent,
    PmsinfoComponent,
    IhInfoComponent,
    InvestorLandingComponent,
    UserHeaderComponent,
    FilterPipe,
    DigichequeDetailsComponent,
    BeneficiaryFormsComponent,
    DigichequeOtpComponent,
    DashboardComponent,
    AccountsComponent,
    NewAccountComponent,
    InnovStartUpSignUpComponent,
    NewAccountComponent,
    DefaultHomeComponent,
    DigiformComponent,
    DigichequeConfirmationComponent,
    StartupDetailsComponent,
    InvestorInvestmentsComponent,
    StartupListComponent,
    InnovHelpHeaderComponent,
    InvestmentAgreementComponent,
    InvestmentSuccessComponent,
    DigiformComponent,
    DefaultTryComponent,
    FeedbackComponent,
    GoalsComponent,
    PitchedStartupsComponent,
    StartUpLandingComponent,
    InvestorSignUpComponent,
    StartUpListComponent,
    SearchStartupPipe,
    InvestorListComponent
  ],
  imports: [
  
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    MaterialModule,
    RouterModule,
    HttpModule,
    DropdownModule,
  ],

  providers: [FirebaseServiceService,
    SavingService,
    UserService,
    DigiserveService,
    InvestorService,
    CanActivateGuard,
    StartupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
