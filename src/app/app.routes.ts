import { Routes } from '@angular/router';

import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PropertyListComponent } from './features/properties/property-list/property-list.component';
import { PropertyFormComponent } from './features/properties/property-form/property-form.component';
import { TenantListComponent } from './features/tenants/tenant-list/tenant-list.component';
import { TenantFormComponent } from './features/tenants/tenant-form/tenant-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'dashboard', component: DashboardComponent },

  { path: 'properties', component: PropertyListComponent },
  { path: 'properties/new', component: PropertyFormComponent },

  { path: 'tenants', component: TenantListComponent },
  { path: 'tenants/new', component: TenantFormComponent },

  { path: '**', redirectTo: 'dashboard' }
];
