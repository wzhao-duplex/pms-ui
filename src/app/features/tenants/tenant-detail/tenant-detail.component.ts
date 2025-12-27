import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; // Optional for styling
import { TenantService } from '../../../core/services/tenant.service';
import { Tenant } from '../../../core/models/tenant.model';
import { TenantDocumentsComponent } from '../tenant-documents/tenant-documents.component';

@Component({
    selector: 'app-tenant-detail',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatCardModule,
        TenantDocumentsComponent
    ],
    templateUrl: './tenant-detail.component.html',
    styleUrls: ['./tenant-detail.component.scss'] // Create this file or remove this line
})
export class TenantDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private tenantService = inject(TenantService);

    tenant?: Tenant;

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('tenantId');
        if (id) {
            this.tenantService.getById(id).subscribe({
                next: (data) => this.tenant = data,
                error: (err) => console.error('Error loading tenant', err)
            });
        }
    }
}