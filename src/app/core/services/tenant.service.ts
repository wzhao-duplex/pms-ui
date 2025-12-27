import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Tenant } from '../models/tenant.model';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private api = inject(ApiService);

  getAll(): Observable<Tenant[]> {
    return this.api.get<Tenant[]>('/tenants');
  }

  getById(id: string): Observable<Tenant> {
    return this.api.get<Tenant>(`/tenants/${id}`);
  }

  createTenant(data: any): Observable<Tenant> {
    return this.api.post<Tenant>('/tenants', data);
  }

  updateTenant(id: string, data: any): Observable<Tenant> {
    return this.api.put<Tenant>(`/tenants/${id}`, data);
  }

  deleteTenant(id: string): Observable<void> {
    return this.api.delete<void>(`/tenants/${id}`);
  }
}