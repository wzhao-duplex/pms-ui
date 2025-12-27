import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // ✅ Add Select
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TenantService } from '../../../core/services/tenant.service';
import { PropertyService } from '../../../core/services/property.service';
import { Property } from '../../../core/models/property.model';

@Component({
  selector: 'app-tenant-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule, // ✅ Add Select
    RouterModule
  ],
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.scss']
})
export class TenantFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private tenantService = inject(TenantService);
  private propertyService = inject(PropertyService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEditMode = false;
  tenantId: string | null = null;
  properties: Property[] = []; // List of properties for dropdown

  // ✅ Form matches CamelCase model
  tenantForm = this.fb.group({
    // ✅ ADD Validators.required to match Backend @NotBlank
    fullName: ['', Validators.required],

    // ✅ ADD Validators.required to match Backend @NotBlank
    email: ['', [Validators.required, Validators.email]],

    // ✅ ADD Validators.required because Backend has @NotBlank on phone
    phone: ['', Validators.required],

    // ✅ ADD Validators.required (Backend @NotNull)
    leaseStart: ['', Validators.required],

    leaseEnd: [''],

    // ✅ ADD Validators.required (Backend @NotNull)
    monthlyRent: [0, [Validators.required, Validators.min(0)]],

    propertyId: ['', Validators.required]
  });

  ngOnInit() {
    // 1. Load Properties for the Dropdown
    this.propertyService.getAll().subscribe(props => this.properties = props);

    // 2. Check for Edit Mode
    const id = this.route.snapshot.paramMap.get('tenantId');
    if (id) {
      this.isEditMode = true;
      this.tenantId = id;
      this.tenantService.getById(id).subscribe(data => {
        this.tenantForm.patchValue(data);
      });
    }
  }

  onSubmit() {
    if (this.tenantForm.invalid) return;

    if (this.isEditMode && this.tenantId) {
      this.tenantService.updateTenant(this.tenantId, this.tenantForm.value)
        .subscribe({
          next: () => this.router.navigate(['/tenants']),
          error: (err) => console.error(err)
        });
    } else {
      this.tenantService.createTenant(this.tenantForm.value)
        .subscribe({
          next: () => this.router.navigate(['/tenants']),
          error: (err) => console.error(err)
        });
    }
  }
}