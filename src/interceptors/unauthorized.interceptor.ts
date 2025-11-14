import {
    HttpErrorResponse,
    HttpInterceptorFn
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { RoutesEnum } from '../shared/Dictionary,enum';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return next(req).pipe(
        catchError((error: any) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                console.warn('Respuesta no autorizada');

                authService.logout();
                router.navigate([`${RoutesEnum.AUTH}/${RoutesEnum.LOGIN}`]);
            }

            if (error instanceof HttpErrorResponse && error.status === 403) {
                console.warn('Respuesta no autorizada');

            }

            return throwError(() => error);
        })
    );
};
