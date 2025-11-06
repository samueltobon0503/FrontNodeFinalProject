import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { UtilityService } from '../../../shared/serviceUtils';
import { AuthService } from '../../../core/services/auth.service';
import { AppFloatingConfigurator } from '../../../app/layout/component/app.floatingconfigurator';
import { RegisterModel, RegisterValidator } from '../../../core/models/register.model';

interface errorsInterface {
  nameError: string;
  emailError: string;
  passwordError: string;
  lastNameError: string;
  phoneError: string;
  userNameError: string;
  [key: string]: string;
}

@Component({
  selector: 'app-signup',
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
    AppFloatingConfigurator,
  ],
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  register: RegisterModel = {
    name: '',
    email: '',
    password: '',
    lastName: '',
    userName: '',
    phone: '',
  };

  errors: errorsInterface = {
    nameError: '',
    emailError: '',
    passwordError: '',
    lastNameError: '',
    userNameError: '',
    phoneError: '',
  };

  confirmedPassword!: string;
  isLoading: boolean = false;

  constructor(
    private utilityService: UtilityService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  makeDto() {
    let requestValidator = new RegisterValidator(this.confirmedPassword);
    const validationResult = requestValidator.validate(this.register);
    const hasErrors = this.utilityService.handleValidationErrors(
      validationResult,
      this.errors
    );
    if (hasErrors) return;

    this.isLoading = true;
    // this.authService.register(this.register).subscribe({
    //   next: () => {
    //     this.isLoading = false;
    //     // Redirige al login tras un registro exitoso
    //     this.router.navigate(['/auth/login']);
    //   },
    //   error: (err) => {
    //     // Asume que el error es por email duplicado
    //     // (puedes mejorar esta lógica de error)
    //     this.isLoading = false;
    //     this.errors.emailError = 'Este email ya está en uso.';
    //   }
    // });
  }

  clearErrors() {
   this.errors = {
    nameError: '',
    emailError: '',
    passwordError: '',
    lastNameError: '',
    userNameError: '',
    phoneError: '',
  };

  }
}
