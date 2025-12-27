import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { PropertyExpense } from '../models/expense.model';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    private api = inject(ApiService);

    getAll(): Observable<PropertyExpense[]> {
        return this.api.get<PropertyExpense[]>('/expenses');
    }

    getById(id: string): Observable<PropertyExpense> {
        return this.api.get<PropertyExpense>(`/expenses/${id}`);
    }

    create(data: any): Observable<PropertyExpense> {
        return this.api.post<PropertyExpense>('/expenses', data);
    }

    update(id: string, data: any): Observable<PropertyExpense> {
        return this.api.put<PropertyExpense>(`/expenses/${id}`, data);
    }

    delete(id: string): Observable<void> {
        return this.api.delete<void>(`/expenses/${id}`);
    }
}