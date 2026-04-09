import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api'; // Ajusta según tu librería
import { CartService } from '../../../core/services/cart.service';
import { UtilityService } from '../../../shared/serviceUtils';


describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Al ser componente Standalone se mantiene en imports
      imports: [CartComponent],
      providers: [
        // Proveedores para el cliente HTTP
        provideHttpClient(),
        provideHttpClientTesting(),

        // Servicios necesarios para el funcionamiento del carrito
        CartService,
        MessageService,
        UtilityService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
