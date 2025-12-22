import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../../core/services/property.service';
import { Property } from '../../../core/models/property.model';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  property?: Property;

  constructor(private route: ActivatedRoute, private propertyService: PropertyService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('propertyId')!;
    this.propertyService.getById(id).subscribe(data => this.property = data);
  }
}
