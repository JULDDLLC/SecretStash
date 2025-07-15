'use client';

import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Navbar } from '../../components/navbar';
import { ThemeProvider } from '../../contexts/theme-context';
import { FinanceSummary } from '../../components/finance/finance-summary';
import { IncomeStreams } from '../../components/finance/income-streams';
import { ExpenseFlows } from '../../components/finance/expense-flows';
import { Accounts } from '../../components/finance/accounts';
import { FinanceMatrixTable } from '../../components/finance/finance-matrix-table';
import { FinancialHistory } from '../../components/finance/financial-history';
import { IncomeModal, ExpenseModal, AccountModal } from '../../components/finance/finance-modals';
import { FinanceData, IncomeStream, ExpenseFlow, Account } from '../../types/finance';
import {
  getFinanceData,
  saveFinanceData,
  addIncomeStream,
  updateIncomeStream,
  deleteIncomeStream,
  addExpenseFlow,
  updateExpenseFlow,
  deleteExpenseFlow,
  addAccount,
  updateAccount,
  deleteAccount
} from '../../lib/finance-storage';
import { calculateAndSaveSnapshot } from '../../lib/finance-storage';

export default function FinancePage() {
<<<<<<< HEAD
 const [data, setData] = useState<FinanceData>({
  incomeStreams: [],
  expenseFlows: [],
  accounts: [],
  historicalData: [],
});
=======
  const [data, setData] = useState<FinanceData>({ incomeStreams: [], expenseFlows: [], accounts: [] });
>>>>>>> 3f405ad5be1c4f87915b3a52b7aba4e9289950ff
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [editingIncome, setEditingIncome] = useState<IncomeStream | undefined>();
  const [editingExpense, setEditingExpense] = useState<ExpenseFlow | undefined>();
  const [editingAccount, setEditingAccount] = useState<Account | undefined>();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history'>('dashboard');

  useEffect(() => {
    const financeData = getFinanceData();
    setData(financeData);
  }, []);

  useEffect(() => {
    // Auto-save snapshot when data changes (debounced)
    const timer = setTimeout(() => {
      if (data.incomeStreams.length > 0 || data.expenseFlows.length > 0 || data.accounts.length > 0) {
        calculateAndSaveSnapshot();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [data]);

  const handleAddIncome = (incomeData: Omit<IncomeStream, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newIncome: IncomeStream = {
      ...incomeData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    addIncomeStream(newIncome);
    setData(prev => ({ ...prev, incomeStreams: [...prev.incomeStreams, newIncome] }));
  };

  const handleEditIncome = (income: IncomeStream) => {
    setEditingIncome(income);
    setIsIncomeModalOpen(true);
  };

  const handleUpdateIncome = (incomeData: Omit<IncomeStream, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingIncome) {
      const updatedIncome = {
        ...editingIncome,
        ...incomeData,
        updatedAt: new Date().toISOString()
      };
      
      updateIncomeStream(editingIncome.id, updatedIncome);
      setData(prev => ({
        ...prev,
        incomeStreams: prev.incomeStreams.map(i => i.id === editingIncome.id ? updatedIncome : i)
      }));
      setEditingIncome(undefined);
    }
  };

  const handleDeleteIncome = (id: string) => {
    deleteIncomeStream(id);
    setData(prev => ({ ...prev, incomeStreams: prev.incomeStreams.filter(i => i.id !== id) }));
  };

  const handleAddExpense = (expenseData: Omit<ExpenseFlow, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newExpense: ExpenseFlow = {
      ...expenseData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    addExpenseFlow(newExpense);
    setData(prev => ({ ...prev, expenseFlows: [...prev.expenseFlows, newExpense] }));
  };

  const handleEditExpense = (expense: ExpenseFlow) => {
    setEditingExpense(expense);
    setIsExpenseModalOpen(true);
  };

  const handleUpdateExpense = (expenseData: Omit<ExpenseFlow, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingExpense) {
      const updatedExpense = {
        ...editingExpense,
        ...expenseData,
        updatedAt: new Date().toISOString()
      };
      
      updateExpenseFlow(editingExpense.id, updatedExpense);
      setData(prev => ({
        ...prev,
        expenseFlows: prev.expenseFlows.map(e => e.id === editingExpense.id ? updatedExpense : e)
      }));
      setEditingExpense(undefined);
    }
  };

  const handleDeleteExpense = (id: string) => {
    deleteExpenseFlow(id);
    setData(prev => ({ ...prev, expenseFlows: prev.expenseFlows.filter(e => e.id !== id) }));
  };

  const handleAddAccount = (accountData: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAccount: Account = {
      ...accountData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    addAccount(newAccount);
    setData(prev => ({ ...prev, accounts: [...prev.accounts, newAccount] }));
  };

  const handleEditAccount = (account: Account) => {
    setEditingAccount(account);
    setIsAccountModalOpen(true);
  };

  const handleUpdateAccount = (accountData: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingAccount) {
      const updatedAccount = {
        ...editingAccount,
        ...accountData,
        updatedAt: new Date().toISOString()
      };
      
      updateAccount(editingAccount.id, updatedAccount);
      setData(prev => ({
        ...prev,
        accounts: prev.accounts.map(a => a.id === editingAccount.id ? updatedAccount : a)
      }));
      setEditingAccount(undefined);
    }
  };

  const handleDeleteAccount = (id: string) => {
    deleteAccount(id);
    setData(prev => ({ ...prev, accounts: prev.accounts.filter(a => a.id !== id) }));
  };

  const handleExportCSV = () => {
    const allEntries = [
      ...data.incomeStreams.map(item => ({
        Name: item.name,
        Type: 'Income',
        SubType: item.type,
        Amount: item.amount,
        Frequency: item.frequency,
        Status: item.status,
        Category: 'Income',
        Link: item.link || '',
        Notes: item.notes || '',
        Tags: item.tags.join(', ')
      })),
      ...data.expenseFlows.map(item => ({
        Name: item.name,
        Type: 'Expense',
        SubType: item.type,
        Amount: item.amount,
        Frequency: item.billingCycle,
        Status: item.status,
        Category: item.category,
        Link: item.link || '',
        Notes: item.notes || '',
        Tags: ''
      })),
      ...data.accounts.map(item => ({
        Name: item.name,
        Type: 'Account',
        SubType: item.type,
        Amount: item.balance,
        Frequency: 'balance',
        Status: item.status,
        Category: item.institution,
        Link: item.link || '',
        Notes: item.notes || '',
        Tags: ''
      }))
    ];

    const headers = Object.keys(allEntries[0] || {});
    const csvContent = [
      headers.join(','),
      ...allEntries.map(entry => 
        headers.map(header => `"${entry[header as keyof typeof entry] || ''}"`).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'finance-matrix-export.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 dark:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50 light:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative z-10">
          <Navbar />
          
          <div className="container mx-auto px-4 py-8 pt-24">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 mb-4">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Finance Matrix</h1>
              <p className="text-muted-foreground text-lg italic">
               "Where every dollar is mapped, and clarity becomes your superpower."
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-1 flex">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'dashboard'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'history'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  History
                </button>
              </div>
            </div>

            {/* Summary */}
            {activeTab === 'dashboard' && <FinanceSummary data={data} />}

            {/* Financial History */}
            {activeTab === 'history' && <FinancialHistory historicalData={data.historicalData} />}

            {/* Three Pillars */}
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <IncomeStreams
                incomeStreams={data.incomeStreams}
                onAdd={() => setIsIncomeModalOpen(true)}
                onEdit={handleEditIncome}
                onDelete={handleDeleteIncome}
              />
              
              <ExpenseFlows
                expenseFlows={data.expenseFlows}
                onAdd={() => setIsExpenseModalOpen(true)}
                onEdit={handleEditExpense}
                onDelete={handleDeleteExpense}
              />
              
              <Accounts
                accounts={data.accounts}
                onAdd={() => setIsAccountModalOpen(true)}
                onEdit={handleEditAccount}
                onDelete={handleDeleteAccount}
              />
              </div>
            )}

            {/* Matrix Table */}
            {activeTab === 'dashboard' && <FinanceMatrixTable data={data} onExport={handleExportCSV} />}
          </div>

          {/* Modals */}
          <IncomeModal
            isOpen={isIncomeModalOpen}
            onClose={() => {
              setIsIncomeModalOpen(false);
              setEditingIncome(undefined);
            }}
            onSave={editingIncome ? handleUpdateIncome : handleAddIncome}
            editingIncome={editingIncome}
          />

          <ExpenseModal
            isOpen={isExpenseModalOpen}
            onClose={() => {
              setIsExpenseModalOpen(false);
              setEditingExpense(undefined);
            }}
            onSave={editingExpense ? handleUpdateExpense : handleAddExpense}
            editingExpense={editingExpense}
          />

          <AccountModal
            isOpen={isAccountModalOpen}
            onClose={() => {
              setIsAccountModalOpen(false);
              setEditingAccount(undefined);
            }}
            onSave={editingAccount ? handleUpdateAccount : handleAddAccount}
            editingAccount={editingAccount}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}