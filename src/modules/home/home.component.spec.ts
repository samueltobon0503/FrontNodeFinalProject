import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api'; // O la ruta de tu MessageService
import { ProductService } from '../../core/services/product.service';
import { UtilityService } from '../../shared/serviceUtils';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        // Proveedores para las peticiones HTTP
        provideHttpClient(),
        provideHttpClientTesting(),

        // Proveedores para el sistema de mensajes y utilidades
        MessageService,
        UtilityService,

        // El servicio que probablemente usa tu Home para cargar datos
        ProductService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
