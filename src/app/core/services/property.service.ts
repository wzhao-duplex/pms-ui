import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Property } from '../models/property.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private api: ApiService, private http: HttpClient) { }

  getAllByOrg(orgId: string) {
    return this.http.get<Property[]>(
      `${environment.apiUrl}/properties?orgId=${orgId}`
    );
  }

  getById(id: string): Observable<Property> {
    return this.api.get<Property>(`/properties/${id}`);
  }

  create(property: Property): Observable<Property> {
    return this.api.post<Property>('/properties', property);
  }
}
