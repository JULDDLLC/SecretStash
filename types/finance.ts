import { FinancialSnapshot } from '../types/finance';

export interface IncomeStream {
  id: string;
  name: string;
  type: 'active' | 'passive';
  amount: number;
  frequency: 'monthly' | 'yearly' | 'one-off';
  status: 'active' | 'inactive';
  tags: string[];
  notes?: string;
  link?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseFlow {
  id: string;
  name: string;
  type: 'subscription' | 'one-off';
  amount: number;
  billingCycle: 'monthly' | 'yearly' | 'one-off';
  status: 'active' | 'cancelled';
  category: string;
  notes?: string;
  link?: string;
  nextDueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'bank' | 'investment' | 'asset';
  balance: number;
  institution: string;
  notes?: string;
  link?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface FinanceData {
  incomeStreams: IncomeStream[];
  expenseFlows: ExpenseFlow[];
  accounts: Account[];
  historicalData: FinancialSnapshot[];
}

export interface FinancialSnapshot {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  totalIncome: number;
  totalExpenses: number;
  netWorth: number;
  netCashFlow: number;
  activeIncomeStreams: number;
  activeExpenseFlows: number;
  totalAccounts: number;
  createdAt: string;
}