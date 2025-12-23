import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../../core/services/property.service';
import { Property } from '../../../core/models/property.model';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {

  properties: Property[] = [];

  displayedColumns: string[] = [
    'address',
    'city',
    'type',
    'actions',
    'management'
  ];

  constructor(private propertyService: PropertyService) {}

ngOnInit(): void {
  const orgId = '85fd0e5d-e4a6-49a6-afd6-6f14a4848783'; // TEMP (see step 3)
  //const orgId = 'b3e94ed7-e57e-49c7-9825-82ce3ef40017'; // local

  this.propertyService.getAllByOrg(orgId).subscribe({
    next: (data: Property[]) => {
      this.properties = data;
    },
    error: err => console.error(err)
  });
}
}
