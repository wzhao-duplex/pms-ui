import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Tenant } from '../models/tenant.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private apiUrl = 'http://localhost:8080/api/tenants';

  constructor(private api: ApiService, private http: HttpClient) {}

  getAll(): Observable<Tenant[]> {
    return this.api.get<Tenant[]>('/tenants');
  }

  getById(id: string): Observable<Tenant> {
    return this.api.get<Tenant>(`/tenants/${id}`);
  }

  createTenant(tenant: Tenant): Observable<Tenant> {
    return this.api.post<Tenant>('/tenants', tenant);
  }

  getByProperty(propertyId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?propertyId=${propertyId}`);
  }
}
