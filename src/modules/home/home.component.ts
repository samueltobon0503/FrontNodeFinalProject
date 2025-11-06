import { Component, computed, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { LayoutService } from '../../app/layout/service/layout.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { ProductModel } from '../../core/models/product.model';
import { UtilityService } from '../../shared/serviceUtils';

@Component({
  selector: 'app-home',
  imports: [ButtonModule, CardModule, ChartModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent implements OnInit {
  title = 'Nexus store';
  layoutService = inject(LayoutService);
  // products = [
  //   {
  //     id: 1,
  //     name: 'Producto A',
  //     image:
  //       'https://www.ktronix.com/medias/4711387666333-001-1400Wx1400H?context=bWFzdGVyfGltYWdlc3w0NDY4MnxpbWFnZS93ZWJwfGFERXpMMmd3T0M4eE5EWXlNVGN3TmpNNE56UTROaTgwTnpFeE16ZzNOalkyTXpNelh6QXdNVjh4TkRBd1YzZ3hOREF3U0F8M2QyMWUzZDk4MTNjNjkxYWE5YjM3NTMyYTkyZGM4ZTU2NTRjNzE3OGZmZDdmZTQ0MzI1NDRiZDhhOTI1NzQ2Ng',
  //     price: 29.99,
  //     description: 'Descripción del producto A',
  //   },
  //   {
  //     id: 2,
  //     name: 'Producto B',
  //     image:
  //       'https://http2.mlstatic.com/D_NQ_NP_746011-MLA54835790960_042023-O.webp',
  //     price: 49.99,
  //     description: 'Descripción del producto B',
  //   },
  //   {
  //     id: 2,
  //     name: 'Producto B',
  //     image:
  //       'https://http2.mlstatic.com/D_NQ_NP_746011-MLA54835790960_042023-O.webp',
  //     price: 49.99,
  //     description: 'Descripción del producto B',
  //   },
  //   {
  //     id: 2,
  //     name: 'Producto B',
  //     image:
  //       'https://http2.mlstatic.com/D_NQ_NP_746011-MLA54835790960_042023-O.webp',
  //     price: 49.99,
  //     description: 'Descripción del producto B',
  //   },

  //   // … más productos
  // ];

products!: ProductModel[];

  currentPrimaryColorName = computed(
    () => this.layoutService.layoutConfig().primary
  );
  constructor(private productService: ProductService,  private utilityService: UtilityService) {}

  ngOnInit(): void {
    console.log('From Home');
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (resp) => {
        this.products = resp.data;

      },
      error: () => {
        this.utilityService.showError(
          'Error de Conexión',
          'No se pudo obtener los productos.'
        );
      },
    });
  }

  goToDetail(id: string) {}
}
