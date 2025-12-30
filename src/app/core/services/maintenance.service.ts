import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { MaintenanceRecord } from '../models/maintenance.model';

@Injectable({ providedIn: 'root' })
export class MaintenanceService {
    private api = inject(ApiService);

    getAll(): Observable<MaintenanceRecord[]> {
        return this.api.get<MaintenanceRecord[]>('/maintenance');
    }

    getById(id: string): Observable<MaintenanceRecord> {
        return this.api.get<MaintenanceRecord>(`/maintenance/${id}`);
    }

    create(data: any): Observable<MaintenanceRecord> {
        return this.api.post<MaintenanceRecord>('/maintenance', data);
    }

    update(id: string, data: any): Observable<MaintenanceRecord> {
        return this.api.put<MaintenanceRecord>(`/maintenance/${id}`, data);
    }

    delete(id: string): Observable<void> {
        return this.api.delete<void>(`/maintenance/${id}`);
    }
}