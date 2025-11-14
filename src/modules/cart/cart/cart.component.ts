import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CartService } from '../../../core/services/cart.service';
import { ProductModel } from '../../../core/models/product.model';
import { UtilityService } from '../../../shared/serviceUtils';
import { Toast } from 'primeng/toast';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CardModule, Toast],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  items: (ProductModel & { quantity?: number })[] = [];
  total = 0;
  cartInfo: any;
  address: any;

  constructor(
    private cartService: CartService,
    private utilityService: UtilityService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getCart();
    this.getAddress();
  }

  removeItem(id: string) {
    this.cartService.removefromCart(id).subscribe({
      next: (resp: any) => {
        this.getCart();
      },
      error: (err: any) => {
        this.utilityService.showError(
          'Error de Conexión',
          'No se pudo obtener el historial de solicitudes.'
        );
      },
    });
  }

  checkout() {
    this.cartService.checkout().subscribe({
      next: (resp: any) => {
        this.utilityService.showSuccess(
          'Exito',
          'Tu carrito esta confirmado para la orden.'
        );
      },
      error: (err: any) => {
        this.utilityService.showError(
          'Error de Conexión',
          'No se pudo obtener el historial de solicitudes.'
        );
      },
    });
  }

  createOrder() {
    let body = {addressId: this.address._id}
    this.orderService.createOrder(body).subscribe({
      next: (resp: any) => {
        this.utilityService.showSuccess(
          'Exito',
          'Tu Orden creada satisfactoriamente'
        );
      },
      error: (err: any) => {
        this.utilityService.showError(
          'Error de Conexión',
          'Debes tener una dirección de entrega'
        );
      },
    });
  }

  getCart() {
    this.cartService.getCart().subscribe({
      next: (resp: any) => {
        console.log(resp.data);
        this.cartInfo = resp.data;
        this.items = resp.data.items;
      },
      error: (err: any) => {
        this.utilityService.showError(
          'Error de Conexión',
          'No se pudo obtener el historial de solicitudes.'
        );
      },
    });
  }

  getAddress() {
    this.orderService.getAddress().subscribe({
      next: (resp: any) => {
        this.address = resp.data;
        console.log(this.address)
      },
      error: (err: any) => {
        this.utilityService.showError(
          'Error de Conexión',
          'No se pudo obtener el historial de solicitudes.'
        );
      },
    });
  }
}
