import { Routes } from '@angular/router';

// Auth Components
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

// Feature Components
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PropertyListComponent } from './features/properties/property-list/property-list.component';
import { PropertyFormComponent } from './features/properties/property-form/property-form.component';
import { TenantListComponent } from './features/tenants/tenant-list/tenant-list.component';
import { TenantFormComponent } from './features/tenants/tenant-form/tenant-form.component';

// Guard
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // --- Public Routes ---
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // --- Protected Routes (require Login) ---
  {
    path: '',
    canActivate: [authGuard], // Protects all children
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      { path: 'dashboard', component: DashboardComponent },

      { path: 'properties', component: PropertyListComponent },
      { path: 'properties/new', component: PropertyFormComponent },

      { path: 'tenants', component: TenantListComponent },
      { path: 'tenants/new', component: TenantFormComponent },
    ]
  },

  // Fallback
  { path: '**', redirectTo: 'dashboard' }
];