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

import { ExpenseService } from '../../../core/services/expense.service';
import { PropertyService } from '../../../core/services/property.service';
import { Property } from '../../../core/models/property.model';

@Component({
    selector: 'app-expense-form',
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
    templateUrl: './expense-form.component.html',
    styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private expenseService = inject(ExpenseService);
    private propertyService = inject(PropertyService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    properties: Property[] = [];
    isEditMode = false;
    expenseId: string | null = null;

    expenseTypes = ['TAX', 'INSURANCE', 'MAINTENANCE', 'MANAGEMENT_FEE', 'UTILITIES', 'OTHER'];

    taxCodes = [
        { code: '8521', label: 'Advertising' },
        { code: '8690', label: 'Insurance' },
        { code: '8710', label: 'Interest' },
        { code: '8860', label: 'Professional Fees' },
        { code: '8960', label: 'Repairs & Maint.' },
        { code: '9180', label: 'Property Taxes' },
        { code: '9220', label: 'Utilities' },
        { code: '9999', label: 'Other' }
    ];

    form = this.fb.group({
        propertyId: ['', Validators.required],
        expenseType: ['', Validators.required],
        amount: [0, [Validators.required, Validators.min(0)]],
        expenseDate: ['', Validators.required],
        taxYear: [new Date().getFullYear(), [Validators.required]],
        notes: [''],
        taxCode: ['', Validators.required]
    });

    ngOnInit() {
        this.propertyService.getAll().subscribe(props => this.properties = props);

        this.expenseId = this.route.snapshot.paramMap.get('expenseId');
        if (this.expenseId) {
            this.isEditMode = true;
            this.expenseService.getById(this.expenseId).subscribe(data => {
                this.form.patchValue(data);
            });
        }
    }

    onSubmit() {
        if (this.form.invalid) return;

        if (this.isEditMode && this.expenseId) {
            this.expenseService.update(this.expenseId, this.form.value).subscribe({
                next: () => this.router.navigate(['/expenses']),
                error: (err) => console.error('Update failed', err)
            });
        } else {
            this.expenseService.create(this.form.value).subscribe({
                next: () => this.router.navigate(['/expenses']),
                error: (err) => console.error('Create failed', err)
            });
        }
    }
}