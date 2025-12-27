import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TenantService } from '../../../core/services/tenant.service';
import { TenantDocument } from '../../../core/models/tenant.model';

@Component({
  selector: 'app-tenant-documents',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './tenant-documents.component.html',
  styleUrls: ['./tenant-documents.component.scss']
})
export class TenantDocumentsComponent implements OnInit {
  @Input() tenantId!: string;

  private tenantService = inject(TenantService);

  documents: TenantDocument[] = [];
  selectedFile: File | null = null;
  documentType: string = 'Lease Agreement'; // Default

  // Predefined types
  docTypes = ['Lease Agreement', 'ID Proof', 'Employment Letter', 'Credit Report', 'Other'];

  ngOnInit() {
    if (this.tenantId) {
      this.loadDocuments();
    }
  }

  loadDocuments() {
    this.tenantService.getDocuments(this.tenantId).subscribe({
      next: (data) => this.documents = data,
      error: (err) => console.error('Failed to load docs', err)
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    if (!this.selectedFile || !this.tenantId) return;

    this.tenantService.uploadDocument(this.tenantId, this.selectedFile, this.documentType)
      .subscribe({
        next: (newDoc) => {
          this.documents.push(newDoc); // Add to list
          this.selectedFile = null; // Reset
          alert('Upload Successful');
        },
        error: (err) => alert('Upload Failed')
      });
  }

  download(doc: TenantDocument) {
    this.tenantService.downloadDocument(doc.documentId).subscribe({
      next: (blob) => {
        // Create a temporary link to trigger download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = doc.originalFileName;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => console.error('Download failed', err)
    });
  }
}