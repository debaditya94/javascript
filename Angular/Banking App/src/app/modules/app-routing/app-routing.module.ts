import { PitchedStartupsComponent } from './../../components/innovHelp/pitched-startups/pitched-startups.component';
import { CanActivateGuard } from './../../guards/can-activate/can-activate.guard';
import { InvestmentSuccessComponent } from './../../components/innovHelp/investment-success/investment-success.component';
import { DefaultHomeComponent } from './../../components/bank/default-home/default-home.component';
import { InnovStartUpSignUpComponent } from './../../components/innovHelp/innov-start-up-sign-up/innov-start-up-sign-up.component';
import { InvestmentAgreementComponent } from './../../components/innovHelp/investment-agreement/investment-agreement.component';
import { StartupListComponent } from './../../components/innovHelp/startup-list/startup-list.component';
import { InvestorInvestmentsComponent } from './../../components/innovHelp/investor-investments/investor-investments.component';
import { StartupDetailsComponent } from './../../components/innovHelp/startup-details/startup-details.component';
import { SavingsCalculatorComponent } from './../../components/portfolio/savings-calculator/savings-calculator.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "../../components/bank/home/home.component";
import { LoginComponent } from "../../components/bank/login/login.component";
import { SignupComponent } from "../../components/bank/signup/signup.component";
import { LandingPageComponent } from "./../../components/bank/landing-page/landing-page.component";
import { DcComponent } from "../../components/digicheque/dc/dc.component";
import { PmsComponent } from "../../components/portfolio/pms/pms.component";
import { InnovHelpComponent } from "../../components/innovHelp/innov-help/innov-help.component";
import { DcinfoComponent } from "../../components/bank/dcinfo/dcinfo.component";
import { PmsinfoComponent } from "../../components/bank/pmsinfo/pmsinfo.component";
import { IhInfoComponent } from "../../components/bank/ih-info/ih-info.component";
import { InvestorLandingComponent } from "../../components/innovHelp/investor-landing/investor-landing.component";
import { DigichequeDetailsComponent } from "../../components/digicheque/digicheque-details/digicheque-details.component";
import { DashboardComponent } from '../../components/bank/dashboard/dashboard.component';
import { AccountsComponent } from '../../components/bank/accounts/accounts.component';
import { BeneficiaryFormsComponent } from "../../components/digicheque/beneficiary-forms/beneficiary-forms.component";
import { DigichequeOtpComponent } from "../../components/digicheque/digicheque-otp/digicheque-otp.component";
import { DefaultTryComponent } from "../../components/bank/default-try/default-try.component";
// import { PracticeComponent } from "../../components/bank/practice/practice.component";
import { DigichequeConfirmationComponent } from "../../components/digicheque/digicheque-confirmation/digicheque-confirmation.component";
import { StartUpLandingComponent } from '../../components/innovHelp/start-up-landing/start-up-landing.component';
import { InvestorSignUpComponent } from '../../components/innovHelp/investor-sign-up/investor-sign-up.component';
import { InvestorListComponent } from "../../components/innovHelp/investor-list/investor-list.component";
// import { DigichequeConfirmationComponent } from "../../components/digicheque/digicheque-confirmation/digicheque-confirmation.component";

const app_routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      { path: '', component: DefaultTryComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'digiCheque', component: DcinfoComponent },
      { path: 'portfolio', component: PmsinfoComponent },
      { path: "innovHelp", component: IhInfoComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: 'innovHelp', component: InnovHelpComponent, canActivate: [CanActivateGuard] },
  { path: 'startUpSignup', component: InnovStartUpSignUpComponent, canActivate: [CanActivateGuard]},
  { path: 'investorSignup', component: InvestorSignUpComponent, canActivate: [CanActivateGuard]},
  {
    path: 'innovStartup', component: StartUpLandingComponent, canActivate: [CanActivateGuard],
    children: [
      { path: 'investors', component: InvestorListComponent },
      { path: 'editProfile', component: InnovStartUpSignUpComponent },
      { path: '', redirectTo: "investors", pathMatch: 'full' },
      
    ]
  },
  {
    path: 'innovInvestor', component: InvestorLandingComponent,canActivate: [CanActivateGuard],
    children: [
      { path: 'landing', component: InvestorLandingComponent },
      { path: 'editProfile', component: InvestorSignUpComponent },
      { path: '', redirectTo: "innovInvestor", pathMatch: 'full' },
      
    ]
  },
  {
    path: 'investorLanding', component: InvestorLandingComponent,
    canActivate: [CanActivateGuard],
    children: [
      { path: '', redirectTo: "startupList", pathMatch:'full' },
      { path : 'pitchedStartups', component: PitchedStartupsComponent},
      { path: 'startupDetails/:id', component: StartupDetailsComponent },
      { path: 'investmentSuccess', component: InvestmentSuccessComponent },
      { path: 'investment/:id', component: InvestmentAgreementComponent, },
      { path: 'startupList', component: StartupListComponent },
      { path: 'myInvestments', component: InvestorInvestmentsComponent },
      {path : 'pitchedStartups',component : PitchedStartupsComponent},
    
    ]
  },
  {
    path: 'landingPage', component: LandingPageComponent,canActivate: [CanActivateGuard],
    children: [
      { path: 'digicheque', component: DcComponent },
      { path: 'digicheque/digicheque-details', component: DigichequeDetailsComponent },
      { path: 'digicheque/beneficiary-form', component: BeneficiaryFormsComponent },
      { path: 'digicheque/digicheque-otp', component: DigichequeOtpComponent },
      { path: 'digicheque/digicheque-confirmation', component: DigichequeConfirmationComponent },
      { path: 'portfolio', component: PmsComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'portfolio_savings', component: SavingsCalculatorComponent },
      { path: 'portfolio', component: PmsComponent },
      { path: 'portfolio/:type', component: SavingsCalculatorComponent },
      { path: '', redirectTo: "digicheque", pathMatch: 'full' },
      { path: '**', redirectTo: "digicheque", pathMatch: 'full' }
    ]
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },



]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(app_routes),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
