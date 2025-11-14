import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumber } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Toast } from 'primeng/toast';
import { ProductModel, ProductValidator } from 'src/core/models/product.model';
import { ProductService } from 'src/core/services/product.service';
import { RequestStatesEnum, RoutesEnum } from 'src/shared/Dictionary,enum';
import { LoaderComponent } from 'src/shared/loader/loader.component';
import { UtilityService } from 'src/shared/serviceUtils';

interface errorsInterface {
    nameError: string;
    priceError: string;
    [key: string]: string;
}

@Component({
    selector: 'app-product-form',
    imports: [CardModule, Toast, LoaderComponent, ButtonModule, FormsModule, InputNumber, InputTextModule, TextareaModule],
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
    selectedProduct: ProductModel = {
        id: 0,
        name: '',
        price: 0,
        description: '',
        productCategoryId: 0
    };
    RoutesEnum = RoutesEnum;
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
            if (this.currentMode == RoutesEnum.EDIT) {
                this.getProductById();
            }
            this.isLoading = false;
        });
    }

    getProductById() {
        this.productService.getProductbyId(this.Aroute.snapshot.queryParams['id']).subscribe({
            next: (resp) => {
                this.selectedProduct = resp.payload;
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
        let productValidator = new ProductValidator();
        const validationResult = productValidator.validate(dto);
        const hasErrors = this.utilityService.handleValidationErrors(validationResult, this.errors);
        if (hasErrors) {
            return;
        }
        const navigateAfterToast = () => {
            setTimeout(() => {
                this.goToProduct();
            }, 2000);
        };

        if (this.currentMode === RoutesEnum.CREATE) {
            dto.productCategoryId = 1;
            this.productService.createProduct(dto).subscribe({
                next: () => {
                    this.utilityService.showSuccess('Éxito', 'El producto se ha creado correctamente');
                    navigateAfterToast();
                },
                error: () => {
                    this.utilityService.showError('Error', 'Error al crear el producto');
                },
                complete: () => {}
            });
        } else if (this.currentMode === RoutesEnum.EDIT) {
            this.productService.editProduct(dto).subscribe({
                next: () => {
                    this.utilityService.showSuccess('Éxito', 'El producto se ha editado correctamente');
                    navigateAfterToast();
                },
                error: () => {
                    this.utilityService.showError('Error', 'Error al editar el producto');
                },
                complete: () => {}
            });
        }
    }

    goToProduct() {
        this.route.navigate([`${RoutesEnum.PRODUCT}`]);
    }

    clearErrors() {
        this.errors = {
            nameError: '',
            priceError: ''
        };
    }
}
