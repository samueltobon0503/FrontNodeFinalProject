import { Component, computed, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { LayoutService } from '../../app/layout/service/layout.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { ProductModel } from '../../core/models/product.model';
import { UtilityService } from '../../shared/serviceUtils';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CartService } from '../../core/services/cart.service';
import { Toast } from 'primeng/toast';
import { SocketService } from '../../core/services/socket.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [
    ButtonModule,
    CardModule,
    ChartModule,
    CommonModule,
    PaginatorModule,
    Toast,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent implements OnInit {
  title = 'Nexus store';
  layoutService = inject(LayoutService);
  products!: ProductModel[];
  visibleProducts: ProductModel[] = [];
  totalRecords: number = 0;
  rows: number = 8;
  first: number = 0;

  currentPrimaryColorName = computed(
    () => this.layoutService.layoutConfig().primary
  );
  constructor(
    private productService: ProductService,
    private utilityService: UtilityService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (resp) => {
        this.products = resp.data;
        this.totalRecords = this.products.length;
        this.updateVisibleProducts();
      },
      error: () => {
        this.utilityService.showError(
          'Error de Conexión',
          'malpartido'
        );
      },
    });
  }

  addToCart(product: any) {
    let body = { productId: product._id, quantity: 1 };
    this.cartService.addCartItem(body).subscribe({
      next: (resp: any) => {
        this.utilityService.showSuccess(
          'Exito',
          'Producto agregado correctamente'
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

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 8;
    this.updateVisibleProducts();
    window.scrollTo(0, 0);
  }

  updateVisibleProducts() {
    const startIndex = this.first;
    const endIndex = this.first + this.rows;
    this.visibleProducts = this.products.slice(startIndex, endIndex);
  }
}
