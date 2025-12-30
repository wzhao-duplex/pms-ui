import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

// Services
import { PropertyService } from '../../core/services/property.service';
import { TenantService } from '../../core/services/tenant.service';
import { MaintenanceService } from '../../core/services/maintenance.service';
import { Tenant } from 'src/app/core/models/tenant.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private propertyService = inject(PropertyService);
  private tenantService = inject(TenantService);
  private maintenanceService = inject(MaintenanceService);

  // Statistics
  totalProperties = 0;
  totalTenants = 0;
  activeMaintenance = 0;
  occupancyRate = 0;

  expiringTenants: Tenant[] = [];

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    // 1. Get Properties
    this.propertyService.getAll().subscribe(props => {
      this.totalProperties = props.length;
      this.calculateOccupancy();
    });

    // 2. Get Tenants
    this.tenantService.getAll().subscribe(tenants => {
      this.totalTenants = tenants.length;
      this.calculateOccupancy();
    });

    // 3. Get Maintenance (Filter for pending if you had a status field, otherwise count all)
    this.maintenanceService.getAll().subscribe(records => {
      this.activeMaintenance = records.length;
    });

    // Get Tenants & Check Expiry
    this.tenantService.getAll().subscribe(tenants => {
      this.totalTenants = tenants.length;
      this.calculateOccupancy();
      this.checkExpiries(tenants); // ✅ Check dates
    });
  }

  checkExpiries(tenants: Tenant[]) {
    const today = new Date();
    const warningDate = new Date();
    warningDate.setDate(today.getDate() + 90); // Alert if expiring in next 3 months

    this.expiringTenants = tenants.filter(t => {
      if (!t.leaseEnd) return false;
      const endDate = new Date(t.leaseEnd);
      return endDate >= today && endDate <= warningDate;
    });
  }

  calculateOccupancy() {
    if (this.totalProperties > 0) {
      // Simple logic: Occupancy = Tenants / Properties * 100
      this.occupancyRate = Math.round((this.totalTenants / this.totalProperties) * 100);
    }
  }

  getDaysLeft(dateStr: string): number {
    const end = new Date(dateStr);
    const today = new Date();
    const diff = end.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }
}