import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../core/models/auth.model';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    template: `
    <div class="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div class="card shadow p-4" style="width: 400px;">
        <div class="card-body">
          <h3 class="card-title text-center mb-4">PMS Login</h3>
          
          <div *ngIf="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>

          <form (ngSubmit)="onSubmit()">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" [(ngModel)]="model.email" name="email" class="form-control" required>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type="password" [(ngModel)]="model.password" name="password" class="form-control" required>
            </div>

            <button type="submit" class="btn btn-primary w-100" [disabled]="isLoading">
              {{ isLoading ? 'Logging in...' : 'Login' }}
            </button>
          </form>

          <div class="mt-3 text-center">
            <small>Don't have an account? <a routerLink="/register">Register here</a></small>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
    authService = inject(AuthService);
    router = inject(Router);

    model: LoginRequest = {};
    isLoading = false;
    errorMessage = '';

    onSubmit() {
        this.isLoading = true;
        this.errorMessage = '';

        this.authService.login(this.model).subscribe({
            next: (res) => {
                this.authService.saveToken(res.token);
                this.router.navigate(['/dashboard']); // or /properties
            },
            error: (err) => {
                this.isLoading = false;
                this.errorMessage = err.error?.message || 'Invalid credentials';
            }
        });
    }
}