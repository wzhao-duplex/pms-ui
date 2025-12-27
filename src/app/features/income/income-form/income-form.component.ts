import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// Services & Models
import { IncomeService } from '../../../core/services/income.service';
import { PropertyService } from '../../../core/services/property.service';
import { Property } from '../../../core/models/property.model';

@Component({
    selector: 'app-income-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    templateUrl: './income-form.component.html',
    styleUrls: ['./income-form.component.scss'] // Create this empty file
})
export class IncomeFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private incomeService = inject(IncomeService);
    private propertyService = inject(PropertyService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    properties: Property[] = [];
    isEditMode = false;
    incomeId: string | null = null;

    // Predefined Income Types
    incomeTypes = ['RENT', 'PARKING', 'LAUNDRY', 'OTHER'];

    form = this.fb.group({
        propertyId: ['', Validators.required],
        incomeType: ['', Validators.required],
        amount: [0, [Validators.required, Validators.min(0)]],
        incomeDate: ['', Validators.required],
        taxYear: [new Date().getFullYear(), [Validators.required, Validators.min(2000)]],
        notes: ['']
    });

    ngOnInit() {
        // 1. Load Properties for Dropdown
        this.propertyService.getAll().subscribe(props => this.properties = props);

        // 2. Check for Edit Mode
        this.incomeId = this.route.snapshot.paramMap.get('incomeId');
        if (this.incomeId) {
            this.isEditMode = true;
            this.incomeService.getById(this.incomeId).subscribe(data => {
                this.form.patchValue(data);
            });
        }
    }

    onSubmit() {
        if (this.form.invalid) return;

        if (this.isEditMode && this.incomeId) {
            this.incomeService.update(this.incomeId, this.form.value).subscribe({
                next: () => this.router.navigate(['/incomes']),
                error: (err) => console.error('Update failed', err)
            });
        } else {
            this.incomeService.create(this.form.value).subscribe({
                next: () => this.router.navigate(['/incomes']),
                error: (err) => console.error('Create failed', err)
            });
        }
    }
}