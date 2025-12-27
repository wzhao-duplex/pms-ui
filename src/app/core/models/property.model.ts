export interface Property {
  // ✅ Change these to camelCase to match Spring Boot JSON
  propertyId?: string;       // Was property_id
  orgId?: string;            // Was org_id

  address: string;
  city?: string;
  province?: string;

  postalCode?: string;       // Was postal_code
  propertyType?: string;     // Was property_type

  ownershipPercent?: number; // Was ownership_percent
  selfUsePercent?: number;   // Was self_use_percent
  managementCompany?: string;// Was management_company

  createdAt?: string;        // Was created_at
}