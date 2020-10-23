import { Component } from '@angular/core';
import { SocketioService } from './socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'location-dashboard';
  cars = [];
  constructor(private socketService:SocketioService) {};

  ngOnInit() {
    this.socketService.setupSocketConnection();
    this.socketService.socket.on('my broadcast', (data: string) => {
      // console.log(data);
      this.cars[0] = data;
      this.cars.forEach(car => {
        car['name'] = 'Car 1';
        car['latitude'] = car.initial_latitude.toFixed(4);
        car['longitude'] = car.initial_longitude.toFixed(4);
        car['lastUpdated'] = car.timestamp;
        // car['speed'] = this.computeSpeedOfDroneInKmpH(0, car.timestamp, car.initial_latitude, car.initial_longitude);
      });
      console.log(this.cars[0]);
    });
  }


}
