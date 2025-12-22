import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from '../../../core/services/property.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent {
  propertyForm: FormGroup;

  constructor(private fb: FormBuilder, private propertyService: PropertyService, private router: Router) {
    this.propertyForm = this.fb.group({
      address: ['', Validators.required],
      city: [''],
      province: [''],
      postal_code: [''],
      property_type: [''],
      management_company: [''],
      ownership_percent: [100],
      self_use_percent: [0]
    });
  }

  submit() {
    if (this.propertyForm.valid) {
      this.propertyService.create(this.propertyForm.value).subscribe(() => {
        this.router.navigate(['/properties']);
      });
    }
  }
}
