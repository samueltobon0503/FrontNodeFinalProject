import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const authToken = authService.getToken();

    if (authToken) {
        const clonedReq = req.clone({
            headers: req.headers.set('Authorization', `${authToken}`)
        });
        return next(clonedReq);
    }

    return next(req);
};
