import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExpenseService } from '../../../core/services/expense.service';
import { PropertyExpense } from '../../../core/models/expense.model';

@Component({
    selector: 'app-expense-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './expense-list.component.html',
    styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {
    private expenseService = inject(ExpenseService);

    expenses: PropertyExpense[] = [];
    displayedColumns: string[] = ['date', 'type', 'amount', 'taxYear', 'actions'];

    ngOnInit() {
        this.loadExpenses();
    }

    loadExpenses() {
        this.expenseService.getAll().subscribe({
            next: (data) => this.expenses = data,
            error: (err) => console.error('Error loading expenses', err)
        });
    }

    deleteExpense(id: string) {
        if (confirm('Are you sure you want to delete this expense?')) {
            this.expenseService.delete(id).subscribe({
                next: () => this.loadExpenses(),
                error: (err) => alert('Failed to delete expense.')
            });
        }
    }
}