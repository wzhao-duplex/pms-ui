import { Component, Input, OnInit } from '@angular/core';
import { TenantService } from '../../../core/services/tenant.service';
import { Tenant } from '../../../core/models/tenant.model';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss']
})
export class TenantListComponent implements OnInit {
  @Input() propertyId!: string;
  tenants: Tenant[] = [];
  displayedColumns = ['full_name', 'email', 'phone', 'lease', 'actions'];

  constructor(private tenantService: TenantService) { }

  ngOnInit(): void {
    if (this.propertyId) {
      this.tenantService
        .getByProperty(this.propertyId)
        .subscribe((data: any[]) => {
          this.tenants = data;
        });

    }
  }
}
