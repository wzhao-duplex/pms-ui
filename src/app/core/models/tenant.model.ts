export interface Tenant {
  tenant_id?: string;
  property_id: string;
  full_name: string;
  phone?: string;
  email?: string;
  lease_start?: string;
  lease_end?: string;
  monthly_rent?: number;
  created_at?: string;
}
