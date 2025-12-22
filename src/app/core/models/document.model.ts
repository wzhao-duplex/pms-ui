export interface TenantDocument {
  document_id?: string;
  tenant_id: string;
  document_type?: string;
  s3_key?: string;
  encrypted_key?: string;
  uploaded_at?: string;
  content_type?: string;
  file_size?: number;
  original_file_name?: string;
}
