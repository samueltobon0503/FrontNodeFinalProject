import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { enviroment } from '../config/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;
   private isConnected = false;

  constructor() {
    this.socket = io(enviroment.socketUrl, {
      transports: ['websocket'],
      autoConnect: false
    });
  }

  connect(userId: string) {
    if (!this.isConnected) {
      this.socket.connect();
      this.socket.emit('registerUser', userId);
      this.isConnected = true;
    }
  }

  onOrderStatusChanged(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('orderStatusChanged', (data) => {
        observer.next(data);
      });
    });
  }

  disconnect() {
    if (this.isConnected) {
      this.socket.disconnect();
      this.isConnected = false;
    }
  }
}
