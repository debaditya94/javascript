import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket1;
  socket2;
  socket3;

  constructor() { }

  setupSocketConnection() {
    this.socket1 = io(environment.SOCKET_ENDPOINT1);
    this.socket2 = io(environment.SOCKET_ENDPOINT2);
    this.socket3 = io(environment.SOCKET_ENDPOINT3);
  }
}
