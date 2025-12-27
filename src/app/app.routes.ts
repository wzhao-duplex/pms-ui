import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PropertyListComponent } from './features/properties/property-list/property-list.component';
import { PropertyFormComponent } from './features/properties/property-form/property-form.component';
import { PropertyDetailComponent } from './features/properties/property-detail/property-detail.component'; // ✅ Import this
import { authGuard } from './core/guards/auth.guard';
import { TenantListComponent } from './features/tenants/tenant-list/tenant-list.component';
import { TenantFormComponent } from './features/tenants/tenant-form/tenant-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },

      // --- PROPERTY ROUTES ---
      { path: 'properties', component: PropertyListComponent },
      { path: 'properties/new', component: PropertyFormComponent },

      // ✅ THIS LINE IS LIKELY MISSING OR MISCONFIGURED:
      { path: 'properties/:propertyId', component: PropertyDetailComponent },

      { path: 'properties/:propertyId/edit', component: PropertyFormComponent },

      { path: 'tenants', component: TenantListComponent },
      { path: 'tenants/new', component: TenantFormComponent },
    ]
  },

  { path: '**', redirectTo: 'dashboard' } // Wildcard must be last
];