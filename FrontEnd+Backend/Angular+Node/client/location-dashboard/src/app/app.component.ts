import { Component } from '@angular/core';
import { SocketioService } from './socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'location-dashboard';
  cars = [{}, {}, {}];
  constructor(private socketService:SocketioService) {};

  ngOnInit() {
    this.socketService.setupSocketConnection();
    this.socketService.socket3.on('my broadcast', (data: string) => {
      this.mapCars(3, data);
    });
    this.socketService.socket2.on('my broadcast', (data: string) => {
      this.mapCars(2, data);
    });
    this.socketService.socket1.on('my broadcast', (data: string) => {
      this.mapCars(1, data);
    });

  }

  mapCars(socketNo: number, car) {
    this.cars[socketNo - 1] = car;
    this.cars[socketNo - 1]['name'] = `Car ${socketNo}`;
    this.cars[socketNo - 1]['latitude'] = car.initial_latitude.toFixed(4);
    this.cars[socketNo - 1]['longitude'] = car.initial_longitude.toFixed(4);
    this.cars[socketNo - 1]['lastUpdated'] = car.timestamp;
  }


}
