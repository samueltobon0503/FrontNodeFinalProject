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
import { ProductService } from '../../../core/services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  imports: [CardModule, Toast, Dialog, ButtonModule, InputTextModule, InputIconModule, CommonModule, IconFieldModule, TagModule, FormsModule, TableModule, DividerModule, ToggleSwitchModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  orders!: any[];
  visible: boolean = false;
  selectedRequest: any = { _id: '' };

  isRepeatingRequest: boolean = false;

  @ViewChild('requestTable') requestTable!: Table;

  filterGlobal(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (this.requestTable && inputElement) {
      this.requestTable.filterGlobal(inputElement.value, 'contains');
    }
  }

  constructor(
    private utilityService: UtilityService, private readonly ordersService: OrderService, private productService: ProductService, private route: Router,
  ) { }

  ngOnInit() {
    this.getRequests();
  }

  getRequests() {
    this.productService.getProducts().subscribe({
      next: (resp: any) => {
        this.orders = resp.data;
        console.log(this.orders)
      },
      error: (err: any) => {
        this.utilityService.showError('Error de Conexión', 'No se pudo obtener el historial de solicitudes.');
      }
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
    this.isRepeatingRequest = false
  }

  getSeverity(status: number) {
    return 'success'
  }

  goToCreate() {
    this.route.navigate([`product/create`]);
  }

  goToEdit(id: number) {
    this.route.navigate([`product/edit`], { queryParams: { id: id } });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (resp) => {
        this.utilityService.showSuccess('Éxito', 'El producto se eliminó correctamente');
        this.getRequests();
      },
      error: () => {
        this.utilityService.showError('Error de Conexión', 'No se pudo eliminar el producto.');
      }
    });
  }
}