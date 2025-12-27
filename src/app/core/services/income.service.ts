import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { PropertyIncome } from '../models/income.model';

@Injectable({
    providedIn: 'root'
})
export class IncomeService {
    private api = inject(ApiService);

    getAll(): Observable<PropertyIncome[]> {
        return this.api.get<PropertyIncome[]>('/incomes');
    }

    getById(id: string): Observable<PropertyIncome> {
        return this.api.get<PropertyIncome>(`/incomes/${id}`);
    }

    create(data: any): Observable<PropertyIncome> {
        return this.api.post<PropertyIncome>('/incomes', data);
    }

    update(id: string, data: any): Observable<PropertyIncome> {
        return this.api.put<PropertyIncome>(`/incomes/${id}`, data);
    }

    delete(id: string): Observable<void> {
        return this.api.delete<void>(`/incomes/${id}`);
    }
}