import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderManagementComponent } from './order-management.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api'; // Ajusta la ruta si es de PrimeNG
import { provideRouter } from '@angular/router';
import { UtilityService } from '../../../shared/serviceUtils';

describe('OrderManagementComponent', () => {
  let component: OrderManagementComponent;
  let fixture: ComponentFixture<OrderManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Al ser un componente Standalone
      imports: [OrderManagementComponent],
      providers: [
        // 1. Proveedores para peticiones HTTP (necesarios para el servicio de órdenes)
        provideHttpClient(),
        provideHttpClientTesting(),

        // 2. Proveedores para navegación (por si tienes botones de "Ver detalle")
        provideRouter([]),

        // 3. Servicios que causaban el NullInjectorError
        MessageService,
        UtilityService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
