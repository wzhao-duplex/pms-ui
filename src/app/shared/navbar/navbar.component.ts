import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Optional
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        RouterModule
    ],
    template: `
    <mat-toolbar color="primary" *ngIf="authService.currentUser() as user">
      <span>PMS System</span>
      
      <span class="spacer"></span>
      
      <button mat-button routerLink="/properties">Properties</button>
      <button mat-button routerLink="/tenants">Tenants</button>
      
      <span class="user-info ms-3 me-3">
        Hello, {{ user.sub }}
      </span>
      
      <button mat-raised-button color="warn" (click)="logout()">
        Logout
      </button>
    </mat-toolbar>
  `,
    styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .user-info {
      font-size: 14px;
      font-weight: 500;
    }
  `]
})
export class NavbarComponent {
    authService = inject(AuthService);

    logout() {
        this.authService.logout();
    }
}