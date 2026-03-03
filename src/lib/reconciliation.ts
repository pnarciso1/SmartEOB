export interface ReconInput {
  providerBilled: number;
  insuranceAllowed: number;
  planRuleAmount: number;
}

export interface ReconOutput {
  memberOwes: number;
  status: 'VERIFIED' | 'DISPUTED';
  varianceNote: string | null;
}

/**
 * Core Engine Logic: Performs the Three-Way Reconciliation.
 * Compares the Provider Invoice, Payer EOB, and Plan Benefit Rule.
 */
export function performThreeWayReconciliation(data: ReconInput): ReconOutput {
  const { providerBilled, insuranceAllowed, planRuleAmount } = data;

  // The 'Truth' says the member should ultimately owe the Plan Rule Amount
  const memberOwes = planRuleAmount;
  let status: 'VERIFIED' | 'DISPUTED' = 'VERIFIED';
  let varianceNote: string | null = null;

  // Rule 1: Insurance Allowed differs from Plan Rules (Contract Violation)
  if (insuranceAllowed !== planRuleAmount && insuranceAllowed > 0) {
    status = 'DISPUTED';
    varianceNote = `Discrepancy Detected: Plan Rule dictates $${planRuleAmount.toFixed(2)}, but Insurance Allowed $${insuranceAllowed.toFixed(2)}.`;
  }
  
  // Rule 2: Potential Balance Billing (Provider billing more than allowed amount)
  else if (providerBilled > insuranceAllowed && insuranceAllowed > 0) {
     status = 'DISPUTED';
     varianceNote = `Potential Balance Billing: Provider billed $${providerBilled.toFixed(2)}, but Insurance contracted limit is $${insuranceAllowed.toFixed(2)}.`;
  }

  // Rule 3: Wrongful Denial (Insurance denied it, but Plan says it's covered)
  else if (insuranceAllowed === 0 && planRuleAmount > 0) {
    status = 'DISPUTED';
    varianceNote = `Claim Denied: Insurance allowed $0 but Employer Plan Rule covers this service at $${planRuleAmount.toFixed(2)}.`;
  }

  return { memberOwes, status, varianceNote };
}
