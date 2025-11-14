import { Address, AdressValidator } from './../../../core/models/addressModel';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { UtilityService } from '../../../shared/serviceUtils';
import { CardModule } from 'primeng/card';
import { Toast, ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { OrderService } from '../../../core/services/order.service';

export interface errorsInterface {
  userIdError: string;
  streetError: string;
  cityError: string;
  stateError: string;
  postalCodeError: string;
  countryError: string;
  [key: string]: string;
}
@Component({
  selector: 'app-profile',
  imports: [
    CardModule,
    TagModule,
    DividerModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: any;
  adress: Address = {
    userId: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  };
  errors: errorsInterface = {
    userIdError: '',
    streetError: '',
    cityError: '',
    stateError: '',
    postalCodeError: '',
    countryError: '',
  };

  ngOnInit(): void {
    this.getUser();
  }

  constructor(
    private userService: UserService,
    private utilityService: UtilityService,
    private orderService: OrderService
  ) {}

  getUser() {
    this.userService.getUserById().subscribe({
      next: (resp: any) => {
        this.user = resp.data;
        console.log(this.user);
      },
      error: (err: any) => {
        this.utilityService.showError(
          'Error de Conexión',
          'No se pudo obtener el historial de solicitudes.'
        );
      },
    });
  }

  send() {
    let requestValidator = new AdressValidator();
    const validationResult = requestValidator.validate(this.adress);
    const hasErrors = this.utilityService.handleValidationErrors(
      validationResult,
      this.errors
    );
    if (hasErrors) return;

    this.adress.userId = this.user._id

    this.orderService.createAddress(this.adress).subscribe({
      next: (res) => {
        this.utilityService.showSuccess(
          'Exito',
          'Dirección creada'
        );
      },
      error: (err) => {},
    });
  }

  clearErrors() {
    this.errors = {
      userIdError: '',
      streetError: '',
      cityError: '',
      stateError: '',
      postalCodeError: '',
      countryError: '',
    };
  }
}
