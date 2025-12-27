import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TenantService } from '../../../core/services/tenant.service';
import { Tenant } from '../../../core/models/tenant.model';

@Component({
  selector: 'app-tenant-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss']
})
export class TenantListComponent implements OnInit {
  private tenantService = inject(TenantService);

  // ✅ FIX: Match the matColumnDef names in HTML
  displayedColumns: string[] = ['fullName', 'email', 'phone', 'leasePeriod', 'actions'];
  tenants: Tenant[] = [];

  ngOnInit() {
    this.loadTenants();
  }

  loadTenants() {
    this.tenantService.getAll().subscribe({
      next: (data) => this.tenants = data,
      error: (err) => console.error(err)
    });
  }

  deleteTenant(id: string) {
    if (confirm('Are you sure you want to delete this tenant?')) {
      this.tenantService.deleteTenant(id).subscribe({
        next: () => this.loadTenants(),
        error: (err) => alert('Failed to delete tenant.')
      });
    }
  }
}