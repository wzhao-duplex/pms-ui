export interface Maintenance {
  maintenance_id?: string;
  property_id: string;
  category?: string;
  description?: string;
  cost?: number;
  contractor_name?: string;
  contractor_phone?: string;
  service_date?: string;
}
