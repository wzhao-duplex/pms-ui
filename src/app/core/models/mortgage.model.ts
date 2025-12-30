export interface MortgagePayment {
  paymentId?: string;
  propertyId: string;
  paymentMonth: string; // YYYY-MM-DD
  principalAmount: number;
  interestAmount: number;
  taxYear: number;
}