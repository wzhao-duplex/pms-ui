import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private baseUrl = 'http://localhost:8080/api/tenants';

  constructor(private http: HttpClient) {}

  /** Upload document for tenant */
  upload(tenantId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(
      `${this.baseUrl}/${tenantId}/documents`,
      formData
    );
  }

  /** Download document */
  download(documentId: string): Observable<Blob> {
    return this.http.get(
      `${this.baseUrl}/documents/${documentId}/download`,
      { responseType: 'blob' }
    );
  }

  /** List documents for a tenant (optional – if backend supports it) */
  listByTenant(tenantId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/${tenantId}/documents`
    );
  }
}
