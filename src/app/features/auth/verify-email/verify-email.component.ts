import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-verify-email',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div class="card shadow p-4" style="width: 400px;">
        <h3 class="text-center mb-3">Verify Email</h3>
        
        <div *ngIf="message" class="alert alert-success">{{ message }}</div>
        <div *ngIf="error" class="alert alert-danger">{{ error }}</div>

        <p class="text-muted small text-center">
          We sent a code to <strong>{{ email }}</strong>.
        </p>

        <form (ngSubmit)="onSubmit()">
          <div class="mb-3">
            <label class="form-label">Verification Code</label>
            <input [(ngModel)]="code" name="code" class="form-control text-center fs-4" maxlength="6" placeholder="123456" required>
          </div>

          <button type="submit" class="btn btn-primary w-100" [disabled]="isLoading">
            {{ isLoading ? 'Verifying...' : 'Verify Account' }}
          </button>
        </form>
      </div>
    </div>
  `
})
export class VerifyEmailComponent {
    authService = inject(AuthService);
    router = inject(Router);
    route = inject(ActivatedRoute);

    email = '';
    code = '';
    isLoading = false;
    message = '';
    error = '';

    constructor() {
        // Get email passed from Register page
        this.route.queryParams.subscribe(params => {
            this.email = params['email'] || '';
        });
    }

    onSubmit() {
        this.isLoading = true;
        this.error = '';

        this.authService.verifyEmail(this.email, this.code).subscribe({
            next: () => {
                this.message = 'Verification successful! Redirecting to login...';
                setTimeout(() => this.router.navigate(['/login']), 2000);
            },
            error: (err) => {
                this.isLoading = false;
                this.error = err.error?.message || 'Verification failed';
            }
        });
    }
}