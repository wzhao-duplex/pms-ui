import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service'; // Import your generic service

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  // Inject your generic ApiService
  private api = inject(ApiService);

  getAll(): Observable<any[]> {
    // Just pass the endpoint. ApiService adds the Base URL.
    return this.api.get<any[]>('/properties');
  }

  createProperty(data: any): Observable<any> {
    return this.api.post<any>('/properties', data);
  }

  getPropertyById(id: string): Observable<any> {
    return this.api.get<any>(`/properties/${id}`);
  }

  updateProperty(id: string, data: any): Observable<any> {
    return this.api.put<any>(`/properties/${id}`, data);
  }

  deleteProperty(id: string): Observable<void> {
    return this.api.delete<void>(`/properties/${id}`);
  }
}