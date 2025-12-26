import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Required for | date pipe
import { MatTableModule } from '@angular/material/table'; // ✅ Required for mat-table
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router'; // ✅ Required for routerLink
import { TenantService } from '../../../core/services/tenant.service';

@Component({
  selector: 'app-tenant-list',
  standalone: true,
  imports: [
    CommonModule,   // Fixes the "No pipe found with name 'date'" error
    MatTableModule, // Fixes [dataSource] error
    MatButtonModule,
    RouterModule    // Fixes [routerLink] error
  ],
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss']
})
export class TenantListComponent implements OnInit {
  private tenantService = inject(TenantService);

  displayedColumns: string[] = ['fullName', 'email', 'leasePeriod', 'actions'];
  tenants: any[] = [];

  ngOnInit() {
    // Ensure you have a method to get tenants in your service
    // Often you might need to pass a propertyId if tenants are tied to properties,
    // or get all tenants for the organization if your backend supports it.
    // For now assuming getAll():
    this.tenantService.getAll().subscribe(data => {
      this.tenants = data;
    });
  }
}