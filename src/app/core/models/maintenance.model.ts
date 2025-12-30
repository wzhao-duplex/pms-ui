export interface MaintenanceRecord {
  maintenanceId?: string;
  propertyId: string;
  category: string;
  description: string;
  cost: number;
  contractorName?: string;
  contractorPhone?: string;
  serviceDate: string; // YYYY-MM-DD
}