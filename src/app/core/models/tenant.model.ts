export interface Tenant {
  tenantId: string;
  propertyId: string;
  fullName: string;
  phone: string;
  email: string;
  leaseStart: string; // ISO Date String
  leaseEnd: string;
  monthlyRent: number;
}