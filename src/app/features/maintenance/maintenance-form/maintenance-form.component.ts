import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MaintenanceService } from '../../../core/services/maintenance.service';
import { PropertyService } from '../../../core/services/property.service';
import { Property } from '../../../core/models/property.model';

@Component({
    selector: 'app-maintenance-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule],
    templateUrl: './maintenance-form.component.html',
    styleUrls: ['./maintenance-form.component.scss']
})
export class MaintenanceFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private maintenanceService = inject(MaintenanceService);
    private propertyService = inject(PropertyService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    properties: Property[] = [];
    isEditMode = false;
    id: string | null = null;
    categories = ['PLUMBING', 'ELECTRICAL', 'HVAC', 'CLEANING', 'REPAIR', 'RENOVATION'];

    form = this.fb.group({
        propertyId: ['', Validators.required],
        category: ['', Validators.required],
        description: ['', Validators.required],
        cost: [0, [Validators.required, Validators.min(0)]],
        contractorName: [''],
        contractorPhone: [''],
        serviceDate: ['', Validators.required]
    });

    ngOnInit() {
        this.propertyService.getAll().subscribe(p => this.properties = p);
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) {
            this.isEditMode = true;
            this.maintenanceService.getById(this.id).subscribe(data => this.form.patchValue(data));
        }
    }

    onSubmit() {
        if (this.form.invalid) return;
        const req = this.isEditMode
            ? this.maintenanceService.update(this.id!, this.form.value)
            : this.maintenanceService.create(this.form.value);

        req.subscribe({
            next: () => this.router.navigate(['/maintenance']),
            error: err => console.error(err)
        });
    }
}