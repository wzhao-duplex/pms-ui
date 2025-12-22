export interface Income {
  income_id?: string;
  property_id: string;
  income_type: string;
  amount: number;
  income_date: string;
  tax_year: number;
  notes?: string;
}
