export interface PropertyIncome {
  incomeId?: string;
  propertyId: string;
  incomeType: string; // e.g. RENT, PARKING
  amount: number;
  incomeDate: string; // YYYY-MM-DD
  taxYear: number;
  notes?: string;
}