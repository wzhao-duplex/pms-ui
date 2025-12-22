export interface Expense {
  expense_id?: string;
  property_id: string;
  expense_type: string;
  amount: number;
  expense_date: string;
  tax_year: number;
  notes?: string;
}
