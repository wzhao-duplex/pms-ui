import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'; // ✅ Forms
import { MatFormFieldModule } from '@angular/material/form-field'; // ✅ Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { TenantService } from '../../../core/services/tenant.service'; // Make sure this path is correct

@Component({
  selector: 'app-tenant-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Fixes [formGroup]
    MatFormFieldModule,  // Fixes <mat-form-field>
    MatInputModule,      // Fixes <input matInput>
    MatButtonModule
  ],
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.scss']
})
export class TenantFormComponent {
  private fb = inject(FormBuilder);
  private tenantService = inject(TenantService);
  private router = inject(Router);

  tenantForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.email]],
    phone: [''],
    leaseStart: [''],
    leaseEnd: [''],
    monthlyRent: [0],
    propertyId: ['', Validators.required] // ✅ Required by backend
  });

  onSubmit() {
    if (this.tenantForm.valid) {

      // ✅ FIX: Manually map Form Values to the Tenant Interface
      const formValue = this.tenantForm.value;

      const tenantData: any = {
        // Map form 'fullName' -> API 'fullName' (or 'full_name' if your model uses snake_case)
        fullName: formValue.fullName,
        email: formValue.email,
        phone: formValue.phone,
        leaseStart: formValue.leaseStart,
        leaseEnd: formValue.leaseEnd,
        monthlyRent: formValue.monthlyRent,
        propertyId: formValue.propertyId
      };

      this.tenantService.createTenant(tenantData).subscribe({
        next: () => this.router.navigate(['/tenants']),
        error: (err) => console.error(err)
      });
    }
  }
}