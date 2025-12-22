import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TenantService } from '../../../core/services/tenant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.scss']
})
export class TenantFormComponent {
  tenantForm: FormGroup;

  constructor(private fb: FormBuilder, private tenantService: TenantService, private router: Router) {
    this.tenantForm = this.fb.group({
      property_id: ['', Validators.required],
      full_name: ['', Validators.required],
      phone: [''],
      email: [''],
      lease_start: [''],
      lease_end: [''],
      monthly_rent: ['']
    });
  }

onSubmit(): void {
  if (this.tenantForm.invalid) return;

  this.tenantService.create(this.tenantForm.value)
    .subscribe({
      next: () => alert('Tenant created successfully'),
      error: err => console.error(err)
    });
}
}
