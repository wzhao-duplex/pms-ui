import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterRequest } from '../../../core/models/auth.model';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    template: `
    <div class="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div class="card shadow p-4" style="width: 500px;">
        <div class="card-body">
          <h3 class="card-title text-center mb-4">Create Account</h3>
          <p class="text-muted text-center small mb-4">Register your Organization & Admin User</p>
          
          <div *ngIf="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>

          <form (ngSubmit)="onSubmit()">
            <h6 class="text-primary border-bottom pb-2 mb-3">User Details</h6>
            <div class="row">
                <div class="col-md-12 mb-3">
                    <label class="form-label">Full Name</label>
                    <input [(ngModel)]="model.fullName" name="fullName" class="form-control" required>
                </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" [(ngModel)]="model.email" name="email" class="form-control" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type="password" [(ngModel)]="model.password" name="password" class="form-control" required>
            </div>

            <h6 class="text-primary border-bottom pb-2 mt-4 mb-3">Organization Details</h6>
            <div class="mb-3">
              <label class="form-label">Company Name</label>
              <input [(ngModel)]="model.orgName" name="orgName" class="form-control" placeholder="e.g. My Real Estate Corp" required>
            </div>

            <button type="submit" class="btn btn-success w-100 mt-3" [disabled]="isLoading">
              {{ isLoading ? 'Creating Account...' : 'Register & Start Trial' }}
            </button>
          </form>

          <div class="mt-3 text-center">
            <small>Already have an account? <a routerLink="/login">Login here</a></small>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
    authService = inject(AuthService);
    router = inject(Router);

    model: RegisterRequest = {};
    isLoading = false;
    errorMessage = '';

    onSubmit() {
        this.isLoading = true;
        this.errorMessage = '';

        this.authService.register(this.model).subscribe({
            next: (res) => {
                this.authService.saveToken(res.token);
                this.router.navigate(['/properties']);
            },
            error: (err) => {
                this.isLoading = false;
                this.errorMessage = err.error?.message || 'Registration failed. Email might be in use.';
            }
        });
    }
}