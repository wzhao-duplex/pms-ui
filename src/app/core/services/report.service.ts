import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { TaxReportLine } from '../models/report.model';

@Injectable({ providedIn: 'root' })
export class ReportService {
    private api = inject(ApiService);

    getT776Report(propertyId: string, year: number): Observable<TaxReportLine[]> {
        return this.api.get<TaxReportLine[]>(`/reports/t776?propertyId=${propertyId}&year=${year}`);
    }
}