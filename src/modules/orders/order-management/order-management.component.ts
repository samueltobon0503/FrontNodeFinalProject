import { OrderService } from './../../../core/services/order.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Checkbox } from 'primeng/checkbox';
import { Dialog } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Toast } from 'primeng/toast';
import { UtilityService } from '../../../shared/serviceUtils';
import { SelectModule } from 'primeng/select';

interface ProductOption {
  name: string;
  code: string;
}

@Component({
  selector: 'app-order-management',
  imports: [
    CardModule,
    Toast,
    Dialog,
    ButtonModule,
    InputTextModule,
    InputIconModule,
    CommonModule,
    IconFieldModule,
    SelectModule,
    TagModule,
    FormsModule,
    TableModule,
    DividerModule,
    ToggleSwitchModule,
  ],
  standalone: true,
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.scss',
})
export class OrderManagementComponent implements OnInit {
  orders!: any[];
  visible: boolean = false;
  selectedRequest: any = { _id: '' };

  isRepeatingRequest: boolean = false;
  status: string = '';

  @ViewChild('requestTable') requestTable!: Table;

  filterGlobal(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (this.requestTable && inputElement) {
      this.requestTable.filterGlobal(inputElement.value, 'contains');
    }
  }

  constructor(
    private utilityService: UtilityService,
    private readonly ordersService: OrderService
  ) {}

  ngOnInit() {
    this.getRequests();
  }

  options: ProductOption[] = [
    { name: 'Pendiente', code: 'PENDIENTE' },
    { name: 'Preparando', code: 'PREPARANDO' },
    { name: 'En Tránsito', code: 'EN_TRANSITO' },
    { name: 'En Entrega', code: 'EN_ENTREGA' },
    { name: 'Entregado', code: 'ENTREGADO' },
    { name: 'Cancelado', code: 'CANCELADO' },
    { name: 'Perdido', code: 'PERDIDO' },
  ];

  getRequests() {
    this.ordersService.getOrders().subscribe({
      next: (resp: any) => {
        this.orders = resp.data;
        console.log(this.orders);
      },
      error: (err: any) => {
        this.utilityService.showError(
          'Error de Conexión',
          'No se pudo obtener el historial de solicitudes.'
        );
      },
    });
  }

  clear(table: Table) {
    table.clear();
  }

  showDialog(request: any) {
    this.selectedRequest = request;
    this.visible = true;
  }

  closedialog() {
    this.isRepeatingRequest = false;
  }

  getSeverity(status: number) {
    return 'success';
  }

  updateState() {
    let body = {newStatus: this.status}
    this.ordersService.updateOrder(this.selectedRequest._id, body).subscribe({
      next: (resp: any) => {

      },
      error: (err: any) => {
        console.log("sdaasd", err)
        this.utilityService.showError(
          'Error de Conexión',
          err.error.message
        );
      },
    });
  }
}
