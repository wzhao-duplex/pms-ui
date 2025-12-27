import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IncomeService } from '../../../core/services/income.service';
import { PropertyIncome } from '../../../core/models/income.model';

@Component({
    selector: 'app-income-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './income-list.component.html',
    styleUrls: ['./income-list.component.scss'] // Create this empty file
})
export class IncomeListComponent implements OnInit {
    private incomeService = inject(IncomeService);

    incomes: PropertyIncome[] = [];
    displayedColumns: string[] = ['date', 'type', 'amount', 'taxYear', 'actions'];

    ngOnInit() {
        this.loadIncomes();
    }

    loadIncomes() {
        this.incomeService.getAll().subscribe({
            next: (data) => this.incomes = data,
            error: (err) => console.error('Error loading incomes', err)
        });
    }

    deleteIncome(id: string) {
        if (confirm('Are you sure you want to delete this record?')) {
            this.incomeService.delete(id).subscribe({
                next: () => this.loadIncomes(),
                error: (err) => alert('Failed to delete income.')
            });
        }
    }
}