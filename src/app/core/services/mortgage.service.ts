import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { MortgagePayment } from '../models/mortgage.model';

@Injectable({ providedIn: 'root' })
export class MortgageService {
    private api = inject(ApiService);

    getAll(): Observable<MortgagePayment[]> {
        return this.api.get<MortgagePayment[]>('/mortgages');
    }

    getById(id: string): Observable<MortgagePayment> {
        return this.api.get<MortgagePayment>(`/mortgages/${id}`);
    }

    create(data: any): Observable<MortgagePayment> {
        return this.api.post<MortgagePayment>('/mortgages', data);
    }

    update(id: string, data: any): Observable<MortgagePayment> {
        return this.api.put<MortgagePayment>(`/mortgages/${id}`, data);
    }

    delete(id: string): Observable<void> {
        return this.api.delete<void>(`/mortgages/${id}`);
    }
}