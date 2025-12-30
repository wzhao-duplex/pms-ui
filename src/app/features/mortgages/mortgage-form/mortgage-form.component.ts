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
import { MortgageService } from '../../../core/services/mortgage.service';
import { PropertyService } from '../../../core/services/property.service';
import { Property } from '../../../core/models/property.model';

@Component({
    selector: 'app-mortgage-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule],
    templateUrl: './mortgage-form.component.html',
    styleUrls: ['./mortgage-form.component.scss']
})
export class MortgageFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private mortgageService = inject(MortgageService);
    private propertyService = inject(PropertyService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    properties: Property[] = [];
    isEditMode = false;
    id: string | null = null;

    form = this.fb.group({
        propertyId: ['', Validators.required],
        paymentMonth: ['', Validators.required],
        principalAmount: [0, [Validators.required, Validators.min(0)]],
        interestAmount: [0, [Validators.required, Validators.min(0)]],
        taxYear: [new Date().getFullYear(), Validators.required]
    });

    ngOnInit() {
        this.propertyService.getAll().subscribe(p => this.properties = p);
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) {
            this.isEditMode = true;
            this.mortgageService.getById(this.id).subscribe(data => this.form.patchValue(data));
        }
    }

    onSubmit() {
        if (this.form.invalid) return;
        const req = this.isEditMode
            ? this.mortgageService.update(this.id!, this.form.value)
            : this.mortgageService.create(this.form.value);

        req.subscribe({
            next: () => this.router.navigate(['/mortgages']),
            error: err => console.error(err)
        });
    }
}