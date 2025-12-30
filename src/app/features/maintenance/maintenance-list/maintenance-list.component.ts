import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaintenanceService } from '../../../core/services/maintenance.service';
import { MaintenanceRecord } from '../../../core/models/maintenance.model';

@Component({
    selector: 'app-maintenance-list',
    standalone: true,
    imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatIconModule],
    templateUrl: './maintenance-list.component.html',
    styleUrls: ['./maintenance-list.component.scss']
})
export class MaintenanceListComponent implements OnInit {
    private service = inject(MaintenanceService);
    records: MaintenanceRecord[] = [];
    displayedColumns = ['date', 'category', 'cost', 'contractor', 'actions'];

    ngOnInit() { this.load(); }

    load() {
        this.service.getAll().subscribe(data => this.records = data);
    }

    delete(id: string) {
        if (confirm('Delete this record?')) {
            this.service.delete(id).subscribe(() => this.load());
        }
    }
}
