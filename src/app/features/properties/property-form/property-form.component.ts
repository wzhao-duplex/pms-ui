import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PropertyService } from '../../../core/services/property.service';

@Component({
  selector: 'app-property-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private propertyService = inject(PropertyService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEditMode = false;
  propertyId: string | null = null;

  // ✅ FIX: Keys MUST be camelCase to match Backend JSON
  propertyForm = this.fb.group({
    address: ['', Validators.required],
    city: [''],
    province: [''],
    postalCode: [''],        // camelCase
    propertyType: [''],      // camelCase
    ownershipPercent: [100], // camelCase
    selfUsePercent: [0],     // camelCase
    managementCompany: ['']  // camelCase
  });

  ngOnInit() {
    // ✅ FIX: Use 'propertyId' to match app.routes.ts
    const id = this.route.snapshot.paramMap.get('propertyId');

    console.log('Route ID:', id); // Debugging: check console

    if (id) {
      this.isEditMode = true;
      this.propertyId = id;

      this.propertyService.getPropertyById(id).subscribe({
        next: (data) => {
          console.log('Data fetched:', data); // Debugging
          // This fills the form. Keys in 'data' must match keys in 'propertyForm'
          this.propertyForm.patchValue(data);
        },
        error: (err) => console.error('Failed to load property', err)
      });
    }
  }

  submit() {
    if (this.propertyForm.invalid) return;

    if (this.isEditMode && this.propertyId) {
      this.propertyService.updateProperty(this.propertyId, this.propertyForm.value)
        .subscribe({
          next: () => this.router.navigate(['/properties']),
          error: (err) => console.error('Update failed', err)
        });
    } else {
      this.propertyService.createProperty(this.propertyForm.value)
        .subscribe({
          next: () => this.router.navigate(['/properties']),
          error: (err) => console.error('Create failed', err)
        });
    }
  }
}