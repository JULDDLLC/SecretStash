import { FinancialSnapshot, FinanceData, IncomeStream, ExpenseFlow, Account } from '../types/finance';

const FINANCE_STORAGE_KEY = 'secretstash_finance_data';

const getDefaultFinanceData = (): FinanceData => ({
  incomeStreams: [
    {
      id: '1',
      name: 'Freelance Development',
      type: 'active',
      amount: 5000,
      frequency: 'monthly',
      status: 'active',
      tags: ['freelance', 'development', 'primary'],
      notes: 'Main freelance income from various clients',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'SaaS Product Revenue',
      type: 'passive',
      amount: 4200,
      frequency: 'monthly',
      status: 'active',
      tags: ['saas', 'passive', 'recurring'],
      notes: 'Monthly recurring revenue from SaaS product',
      link: 'https://dashboard.stripe.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  expenseFlows: [
    {
      id: '1',
      name: 'AWS Infrastructure',
      type: 'subscription',
      amount: 150,
      billingCycle: 'monthly',
      status: 'active',
      category: 'Infrastructure',
      notes: 'Cloud hosting and services',
      link: 'https://aws.amazon.com/billing',
      nextDueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Adobe Creative Suite',
      type: 'subscription',
      amount: 52.99,
      billingCycle: 'monthly',
      status: 'active',
      category: 'Software',
      notes: 'Design and creative tools',
      link: 'https://adobe.com/account',
      nextDueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  accounts: [
    {
      id: '1',
      name: 'Business Checking',
      type: 'bank',
      balance: 25000,
      institution: 'Chase Bank',
      notes: 'Primary business account',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Investment Portfolio',
      type: 'investment',
      balance: 75000,
      institution: 'Vanguard',
      notes: 'Long-term investment portfolio',
      link: 'https://investor.vanguard.com',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  historicalData: []
});

export const getFinanceData = (): FinanceData => {
  if (typeof window === 'undefined') return getDefaultFinanceData();
  
  try {
    const stored = localStorage.getItem(FINANCE_STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      // Ensure historicalData exists and is an array
      if (!data.historicalData || !Array.isArray(data.historicalData)) {
        data.historicalData = [];
      }
      return data;
    }
    return getDefaultFinanceData();
  } catch (error) {
    console.error('Error reading finance data from localStorage:', error);
    return getDefaultFinanceData();
  }
};

export const saveFinanceData = (data: FinanceData): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving finance data to localStorage:', error);
  }
};

export const addIncomeStream = (income: IncomeStream): void => {
  const data = getFinanceData();
  data.incomeStreams.push(income);
  saveFinanceData(data);
};

export const updateIncomeStream = (id: string, updates: Partial<IncomeStream>): void => {
  const data = getFinanceData();
  const index = data.incomeStreams.findIndex(i => i.id === id);
  if (index !== -1) {
    data.incomeStreams[index] = { ...data.incomeStreams[index], ...updates, updatedAt: new Date().toISOString() };
    saveFinanceData(data);
  }
};

export const deleteIncomeStream = (id: string): void => {
  const data = getFinanceData();
  data.incomeStreams = data.incomeStreams.filter(i => i.id !== id);
  saveFinanceData(data);
};

export const addExpenseFlow = (expense: ExpenseFlow): void => {
  const data = getFinanceData();
  data.expenseFlows.push(expense);
  saveFinanceData(data);
};

export const updateExpenseFlow = (id: string, updates: Partial<ExpenseFlow>): void => {
  const data = getFinanceData();
  const index = data.expenseFlows.findIndex(e => e.id === id);
  if (index !== -1) {
    data.expenseFlows[index] = { ...data.expenseFlows[index], ...updates, updatedAt: new Date().toISOString() };
    saveFinanceData(data);
  }
};

export const deleteExpenseFlow = (id: string): void => {
  const data = getFinanceData();
  data.expenseFlows = data.expenseFlows.filter(e => e.id !== id);
  saveFinanceData(data);
};

export const addAccount = (account: Account): void => {
  const data = getFinanceData();
  data.accounts.push(account);
  saveFinanceData(data);
};

export const updateAccount = (id: string, updates: Partial<Account>): void => {
  const data = getFinanceData();
  const index = data.accounts.findIndex(a => a.id === id);
  if (index !== -1) {
    data.accounts[index] = { ...data.accounts[index], ...updates, updatedAt: new Date().toISOString() };
    saveFinanceData(data);
  }
};

export const deleteAccount = (id: string): void => {
  const data = getFinanceData();
  data.accounts = data.accounts.filter(a => a.id !== id);
  saveFinanceData(data);
};

export const saveFinancialSnapshot = (snapshot: Omit<FinancialSnapshot, 'id' | 'createdAt'>): void => {
  const data = getFinanceData();
  const newSnapshot: FinancialSnapshot = {
    ...snapshot,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  
  // Check if we already have a snapshot for this date
  const existingIndex = data.historicalData.findIndex(s => s.date === snapshot.date);
  if (existingIndex !== -1) {
    // Update existing snapshot
    data.historicalData[existingIndex] = newSnapshot;
  } else {
    // Add new snapshot
    data.historicalData.push(newSnapshot);
  }
  
  // Keep only the last 24 months of data to prevent storage bloat
  data.historicalData = data.historicalData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 24);
  
  saveFinanceData(data);
};

export const calculateAndSaveSnapshot = (): void => {
  const data = getFinanceData();
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  // Calculate totals
  const totalIncome = data.incomeStreams
    .filter(stream => stream.status === 'active')
    .reduce((total, stream) => {
      if (stream.frequency === 'monthly') return total + stream.amount;
      if (stream.frequency === 'yearly') return total + (stream.amount / 12);
      return total;
    }, 0);
  
  const totalExpenses = data.expenseFlows
    .filter(expense => expense.status === 'active')
    .reduce((total, expense) => {
      if (expense.billingCycle === 'monthly') return total + expense.amount;
      if (expense.billingCycle === 'yearly') return total + (expense.amount / 12);
      return total;
    }, 0);
  
  const netWorth = data.accounts
    .filter(account => account.status === 'active')
    .reduce((total, account) => total + account.balance, 0);
  
  const netCashFlow = totalIncome - totalExpenses;
  
  const snapshot = {
    date: today,
    totalIncome,
    totalExpenses,
    netWorth,
    netCashFlow,
    activeIncomeStreams: data.incomeStreams.filter(s => s.status === 'active').length,
    activeExpenseFlows: data.expenseFlows.filter(e => e.status === 'active').length,
    totalAccounts: data.accounts.filter(a => a.status === 'active').length
  };
  
  saveFinancialSnapshot(snapshot);
};