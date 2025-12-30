import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

import { PropertyService } from '../../../core/services/property.service';
import { ReportService } from '../../../core/services/report.service';
import { Property } from '../../../core/models/property.model';
import { TaxReportLine } from '../../../core/models/report.model';

@Component({
    selector: 'app-tax-report',
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        MatTableModule, MatSelectModule, MatButtonModule, MatFormFieldModule, MatCardModule
    ],
    templateUrl: './tax-report.component.html'
})
export class TaxReportComponent implements OnInit {
    private propertyService = inject(PropertyService);
    private reportService = inject(ReportService);

    properties: Property[] = [];
    reportData: TaxReportLine[] = [];
    displayedColumns = ['code', 'description', 'total'];

    // Filters
    selectedPropertyId: string = '';
    selectedYear: number = new Date().getFullYear();
    years: number[] = [2023, 2024, 2025, 2026];

    ngOnInit() {
        this.propertyService.getAll().subscribe(data => this.properties = data);
    }

    generateReport() {
        if (this.selectedPropertyId) {
            this.reportService.getT776Report(this.selectedPropertyId, this.selectedYear)
                .subscribe(data => this.reportData = data);
        }
    }

    calculateTotal() {
        return this.reportData.reduce((acc, curr) => acc + curr.totalAmount, 0);
    }
}