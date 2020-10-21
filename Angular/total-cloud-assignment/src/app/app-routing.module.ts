import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './screens/home/home.component';
import { DetailsComponent } from './screens/details/details.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { animationState: 'Home' }
  },
  {
    path: 'details',
    component: DetailsComponent,
    data: { animationState: 'Details' }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
