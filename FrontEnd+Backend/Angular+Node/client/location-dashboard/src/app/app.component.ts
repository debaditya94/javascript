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
      console.log('Socket 3', data);
      this.mapCars(3, data);
      // this.cars[0] = data;
      // this.cars.forEach(car => {
      //   car['name'] = 'Car 3';
      //   car['latitude'] = car.initial_latitude.toFixed(4);
      //   car['longitude'] = car.initial_longitude.toFixed(4);
      //   car['lastUpdated'] = car.timestamp;
      //   // car['speed'] = this.computeSpeedOfDroneInKmpH(0, car.timestamp, car.initial_latitude, car.initial_longitude);
      // });
      // console.log(this.cars[0]);
    });
    this.socketService.socket2.on('my broadcast', (data: string) => {
      console.log('Socket 2', data);
      this.mapCars(2, data);
      // this.cars[0] = data;
      // this.cars.forEach(car => {
      //   car['name'] = 'Car 3';
      //   car['latitude'] = car.initial_latitude.toFixed(4);
      //   car['longitude'] = car.initial_longitude.toFixed(4);
      //   car['lastUpdated'] = car.timestamp;
      //   // car['speed'] = this.computeSpeedOfDroneInKmpH(0, car.timestamp, car.initial_latitude, car.initial_longitude);
      // });
      // console.log(this.cars[0]);
    });
    this.socketService.socket1.on('my broadcast', (data: string) => {
      console.log('Socket 1', data);
      this.mapCars(1, data);
      // this.cars[0] = data;
      // this.cars.forEach(car => {
      //   car['name'] = 'Car 3';
      //   car['latitude'] = car.initial_latitude.toFixed(4);
      //   car['longitude'] = car.initial_longitude.toFixed(4);
      //   car['lastUpdated'] = car.timestamp;
      //   // car['speed'] = this.computeSpeedOfDroneInKmpH(0, car.timestamp, car.initial_latitude, car.initial_longitude);
      // });
      // console.log(this.cars[0]);
    });

  }

  mapCars(socketNo: number, car) {
    this.cars[socketNo - 1] = car;
    this.cars[socketNo - 1]['name'] = `Car ${socketNo}`;
    this.cars[socketNo - 1]['latitude'] = car.initial_latitude.toFixed(4);
    this.cars[socketNo - 1]['longitude'] = car.initial_longitude.toFixed(4);
    this.cars[socketNo - 1]['lastUpdated'] = car.timestamp;
    console.log(this.cars);
  }


}
