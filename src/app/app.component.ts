import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { SocketService } from '../core/services/socket.service';
import { UtilityService } from '../shared/serviceUtils';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

    constructor(
      private utilityService: UtilityService,
      private socketService: SocketService,
    ) {}


  ngOnInit(): void {
    this.socketService.onOrderStatusChanged().subscribe((data) => {
      console.log('Notificación recibida:', data);
      this.utilityService.showNotification(data.orderId, data.newStatus);
    });
  }
  title = 'PFA_front';
}
