import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PropertyService } from '../../../core/services/property.service';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  private propertyService = inject(PropertyService);

  // ✅ FIX: These must match the matColumnDef names in HTML exactly
  displayedColumns: string[] = ['address', 'city', 'type', 'management', 'actions'];

  properties: any[] = [];

  ngOnInit() {
    this.propertyService.getAll().subscribe({
      next: (data) => {
        console.log('Properties loaded:', data); // Debug log
        this.properties = data;
      },
      error: (err) => console.error('Error loading properties', err)
    });
  }
}