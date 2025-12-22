import { Component, Input } from '@angular/core';
import { DocumentService } from '../../../core/services/document.service';

@Component({
  selector: 'app-tenant-documents',
  templateUrl: './tenant-documents.component.html',
  styleUrls: ['./tenant-documents.component.scss']
})
export class TenantDocumentsComponent {
  @Input() tenantId!: string;
  selectedFile?: File;

  constructor(private documentService: DocumentService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    if (this.selectedFile && this.tenantId) {
      this.documentService.upload(this.tenantId, this.selectedFile).subscribe(event => {
        console.log('Upload event', event);
      });
    }
  }
}
