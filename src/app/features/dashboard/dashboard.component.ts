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
  }

  calculateOccupancy() {
    if (this.totalProperties > 0) {
      // Simple logic: Occupancy = Tenants / Properties * 100
      this.occupancyRate = Math.round((this.totalTenants / this.totalProperties) * 100);
    }
  }
}