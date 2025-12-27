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
import { TenantDetailComponent } from './features/tenants/tenant-detail/tenant-detail.component';
import { IncomeListComponent } from './features/income/income-list/income-list.component';
import { IncomeFormComponent } from './features/income/income-form/income-form.component';

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

      { path: 'properties/:propertyId', component: PropertyDetailComponent },

      { path: 'properties/:propertyId/edit', component: PropertyFormComponent },

      { path: 'tenants', component: TenantListComponent },
      { path: 'tenants/new', component: TenantFormComponent },
      { path: 'tenants/:tenantId', component: TenantDetailComponent },
      { path: 'tenants/:tenantId/edit', component: TenantFormComponent }, // Reuses form
      // { path: 'tenants/:tenantId', component: TenantDetailComponent }, // Create this if you want a detail view    

      { path: 'incomes', component: IncomeListComponent },
      { path: 'incomes/new', component: IncomeFormComponent },
      { path: 'incomes/:incomeId/edit', component: IncomeFormComponent },
    ]
  },

  { path: '**', redirectTo: 'dashboard' } // Wildcard must be last
];