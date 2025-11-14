import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumber } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Toast } from 'primeng/toast';
import { ProductService } from '../../../core/services/product.service';
import { UtilityService } from '../../../shared/serviceUtils';

interface errorsInterface {
    nameError: string;
    priceError: string;
    [key: string]: string;
}

@Component({
    selector: 'app-product-form',
    imports: [CardModule, Toast, ButtonModule, FormsModule, InputNumber, InputTextModule, TextareaModule],
    templateUrl: './product-form.component.html',
    standalone: true,
    styleUrl: './product-form.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class ProductFormComponent implements OnInit {
    errors: errorsInterface = {
        nameError: '',
        priceError: ''
    };
    currentMode: string | undefined = '';
    selectedProduct: any;
    isLoading: boolean = true;

    constructor(
        private Aroute: ActivatedRoute,
        private route: Router,
        private readonly productService: ProductService,
        private utilityService: UtilityService
    ) {}

    ngOnInit(): void {
        this.Aroute.url.subscribe((segments) => {
            this.currentMode = segments.pop()?.path;
            if (this.currentMode == 'edit') {
                this.getProductById();
            }
            this.isLoading = false;
        });
    }

    getProductById() {
        this.productService.getProductbyId(this.Aroute.snapshot.queryParams['id']).subscribe({
            next: (resp) => {
                this.selectedProduct = resp.data;
                this.isLoading = false;
            },
            error: () => {
                this.isLoading = false;
                this.utilityService.showError('Error de Conexión', 'No se pudo obtener el producto.');
            }
        });
    }

    submit() {
        const dto = this.selectedProduct;

        if (this.currentMode === 'create') {
            dto.productCategoryId = 1;
            this.productService.createProduct(dto).subscribe({
                next: () => {
                    this.utilityService.showSuccess('Éxito', 'El producto se ha creado correctamente');
                },
                error: () => {
                    this.utilityService.showError('Error', 'Error al crear el producto');
                },
                complete: () => {}
            });
        } else if (this.currentMode === 'edit') {
            this.productService.editProduct(dto).subscribe({
                next: () => {
                    this.utilityService.showSuccess('Éxito', 'El producto se ha editado correctamente');
                },
                error: () => {
                    this.utilityService.showError('Error', 'Error al editar el producto');
                },
                complete: () => {}
            });
        }
    }

    clearErrors() {
        this.errors = {
            nameError: '',
            priceError: ''
        };
    }
}
