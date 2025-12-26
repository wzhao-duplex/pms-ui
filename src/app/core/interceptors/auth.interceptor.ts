import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const token = localStorage.getItem('jwt_token');

    let authReq = req;

    if (token) {
        authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(authReq).pipe(
        catchError((error) => {
            // 401: Unauthorized, 403: Forbidden (Token invalid/expired)
            if (error.status === 401 || error.status === 403) {
                localStorage.removeItem('jwt_token');
                router.navigate(['/login']);
            }
            return throwError(() => error);
        })
    );
};