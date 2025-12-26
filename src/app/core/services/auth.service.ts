import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ApiService } from './api.service'; // Import generic service
import { AuthResponse, LoginRequest, RegisterRequest, UserTokenPayload } from '../models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private api = inject(ApiService);
    private router = inject(Router);

    currentUser = signal<UserTokenPayload | null>(this.getUserFromStorage());

    login(credentials: LoginRequest) {
        // /auth/login is appended to environment.apiUrl
        return this.api.post<AuthResponse>('/auth/login', credentials);
    }

    register(data: RegisterRequest) {
        return this.api.post<AuthResponse>('/auth/register', data);
    }

    // ... keep saveToken, getToken, logout, isLoggedIn, etc. exactly the same ...

    saveToken(token: string) {
        localStorage.setItem('jwt_token', token);
        const decoded = this.decodeToken(token);
        this.currentUser.set(decoded);
    }

    getToken(): string | null {
        return localStorage.getItem('jwt_token');
    }

    logout() {
        // 1. Notify Backend using your ApiService wrapper
        // The ApiService automatically prepends the Base URL, so just pass '/auth/logout'
        this.api.post('/auth/logout', {}).subscribe({
            next: () => console.log('Backend logout successful'),
            error: (err) => console.warn('Backend logout failed', err)
        });

        // 2. Clear Client State
        localStorage.removeItem('jwt_token');
        this.currentUser.set(null);
        this.router.navigate(['/login']);
    }
    isLoggedIn(): boolean {
        const token = this.getToken();
        if (!token) return false;
        const payload = this.decodeToken(token);
        if (!payload || (payload.exp * 1000) < Date.now()) {
            this.logout();
            return false;
        }
        return true;
    }

    private getUserFromStorage(): UserTokenPayload | null {
        const token = this.getToken();
        return token ? this.decodeToken(token) : null;
    }

    private decodeToken(token: string): UserTokenPayload | null {
        try {
            return jwtDecode<UserTokenPayload>(token);
        } catch (e) {
            return null;
        }
    }
}