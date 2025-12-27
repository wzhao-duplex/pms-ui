import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // ✅ 1. Import this
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Tenant, TenantDocument } from '../models/tenant.model';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private api = inject(ApiService);
  private http = inject(HttpClient); // ✅ 2. Inject this

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

  // --- Document Methods ---

  getDocuments(tenantId: string): Observable<TenantDocument[]> {
    return this.api.get<TenantDocument[]>(`/tenants/${tenantId}/documents`);
  }

  uploadDocument(tenantId: string, file: File, docType: string): Observable<TenantDocument> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', docType);

    // Using api.post is fine here, FormData is handled automatically by Angular
    return this.api.post<TenantDocument>(`/tenants/${tenantId}/documents`, formData);
  }

  downloadDocument(documentId: string): Observable<Blob> {
    // We use this.http directly here because we need 'responseType: blob'
    // Ensure this URL matches your backend environment
    const url = `http://localhost:8080/api/tenants/documents/${documentId}/download`;

    return this.http.get(url, {
      responseType: 'blob',
      headers: {
        // Manually attach token since ApiService isn't wrapping this specific call
        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
      }
    });
  }
}