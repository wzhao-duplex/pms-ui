import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'; // ✅ Required for [formGroup]
import { MatFormFieldModule } from '@angular/material/form-field'; // ✅ Required for <mat-form-field>
import { MatInputModule } from '@angular/material/input'; // ✅ Required for <input matInput>
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { PropertyService } from '../../../core/services/property.service';

@Component({
  selector: 'app-property-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Fixes [formGroup] error
    MatFormFieldModule,  // Fixes <mat-form-field> error
    MatInputModule,      // Fixes <input matInput> error
    MatButtonModule
  ],
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent {
  private fb = inject(FormBuilder);
  private propertyService = inject(PropertyService);
  private router = inject(Router);

  propertyForm = this.fb.group({
    address: ['', Validators.required],
    city: [''],
    province: [''],
    postalCode: [''], // Ensure matches DTO
    propertyType: [''],
    ownershipPercent: [100],
    selfUsePercent: [0],
    managementCompany: ['']
  });

  submit() {
    if (this.propertyForm.valid) {
      // ✅ FIX: The service method is likely named 'createProperty' now
      this.propertyService.createProperty(this.propertyForm.value).subscribe({
        next: () => this.router.navigate(['/properties']),
        error: (err) => console.error(err)
      });
    }
  }
}