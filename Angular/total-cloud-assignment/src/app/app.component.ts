import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routingAnimations } from './animations/routing-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routingAnimations]
})
export class AppComponent {
  title = 'total-cloud-assignment';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && 
      outlet.activatedRouteData && 
      outlet.activatedRouteData['animationState'];
   }
}
