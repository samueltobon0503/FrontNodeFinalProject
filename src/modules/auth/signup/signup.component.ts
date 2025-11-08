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
import {
  RegisterModel,
  RegisterValidator,
} from '../../../core/models/register.model';

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

    this.authService.createUser(this.register).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.errors.emailError = 'Este email ya está en uso.';
      }
    });
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

  goToLogin() {
    this.router.navigate(['auth/login']);
  }
}
