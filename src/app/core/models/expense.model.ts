export interface PropertyExpense {
  expenseId?: string;
  propertyId: string;
  expenseType: string;
  amount: number;
  expenseDate: string; // YYYY-MM-DD
  taxYear: number;
  notes?: string;
  taxCode?: string;
}