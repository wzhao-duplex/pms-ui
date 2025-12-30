import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MortgageService } from '../../../core/services/mortgage.service';
import { MortgagePayment } from '../../../core/models/mortgage.model';

@Component({
    selector: 'app-mortgage-list',
    standalone: true,
    imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatIconModule],
    templateUrl: './mortgage-list.component.html',
    styleUrls: ['./mortgage-list.component.scss']
})
export class MortgageListComponent implements OnInit {
    private service = inject(MortgageService);
    payments: MortgagePayment[] = [];
    displayedColumns = ['date', 'principal', 'interest', 'total', 'actions'];

    ngOnInit() { this.load(); }

    load() {
        this.service.getAll().subscribe(data => this.payments = data);
    }

    delete(id: string) {
        if (confirm('Delete this payment?')) {
            this.service.delete(id).subscribe(() => this.load());
        }
    }
}