import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { UtilityService } from '../../../shared/serviceUtils';
import { AuthService } from '../../../core/services/auth.service';
import { LoginModel, LoginValidator } from '../../../core/models/login.model';
import { AppFloatingConfigurator } from '../../../app/layout/component/app.floatingconfigurator';

interface errorsInterface {
  emailError: string,
  passwordError: string,
  [key: string]: string;
}

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [ButtonModule, CheckboxModule,
    InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  login: LoginModel = {
    email: '',
    password: ''
  }
  errors: errorsInterface = {
    emailError: '',
    passwordError: ''
  }
  checked = false;
  visible: boolean = false;
  isLoading: boolean = false;

  constructor(private utilityService: UtilityService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void { }

  makeDto() {
    let requestValidator = new LoginValidator();
    const validationResult = requestValidator.validate(this.login);
    const hasErrors = this.utilityService.handleValidationErrors(validationResult, this.errors);
    if (hasErrors) return;

    this.isLoading = true;
    this.authService.authenticate(this.login).subscribe({
      next: (res) => {
        this.isLoading = false;
            console.log('✅ NEXT ejecutado:', res);

        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log("W",err.error)
        this.errors.emailError = err.error.error;
      }
    });

  }

  clearErrors() {
    this.errors = {
      emailError: '',
      passwordError: '',
    };
  }

  goToRegister() {
    this.router.navigate(['auth/register']);
  }
}
