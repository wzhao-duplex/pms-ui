export interface MortgagePayment {
  payment_id?: string;
  property_id: string;
  payment_month: string;
  principal_amount: number;
  interest_amount: number;
  tax_year: number;
}
