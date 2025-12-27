import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
// If you have an error interceptor, import it here too
// import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        // 1. Router
        provideRouter(routes),

        // 2. HTTP & Interceptors
        provideHttpClient(
            withInterceptors([
                authInterceptor,
                // httpErrorInterceptor // Add this if you implemented it
            ])
        ),

        // 3. Animations (replaces BrowserAnimationsModule)
        provideAnimations()
    ]
};