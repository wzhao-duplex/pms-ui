import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Required for *ngIf
import { ActivatedRoute, RouterModule } from '@angular/router'; // ✅ Required for routerLink
import { MatButtonModule } from '@angular/material/button'; // ✅ Required for mat-button
import { PropertyService } from '../../../core/services/property.service';
import { Property } from '../../../core/models/property.model';

@Component({
  selector: 'app-property-detail',
  standalone: true, // ✅ CRITICAL: Enable Standalone
  // ✅ FIX: Import modules so HTML works
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  property?: Property;

  // You can use inject() or constructor injection
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('propertyId');

    if (id) {
      // ✅ UPDATED: Calling 'getPropertyById' as you requested
      this.propertyService.getPropertyById(id).subscribe({
        next: (data) => this.property = data,
        error: (err) => console.error('Error loading property', err)
      });
        console.log("property id is: " + this.property?.propertyId);
    }
  }
}