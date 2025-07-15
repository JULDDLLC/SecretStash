'use client';

import { TrendingUp, TrendingDown, Wallet, Calendar } from 'lucide-react';
import { FinanceData } from '../../types/finance';

interface FinanceSummaryProps {
  data: FinanceData;
}

export const FinanceSummary = ({ data }: FinanceSummaryProps) => {
  const calculateMonthlyIncome = () => {
    return data.incomeStreams
      .filter(stream => stream.status === 'active')
      .reduce((total, stream) => {
        if (stream.frequency === 'monthly') return total + stream.amount;
        if (stream.frequency === 'yearly') return total + (stream.amount / 12);
        return total;
      }, 0);
  };

  const calculateMonthlyExpenses = () => {
    return data.expenseFlows
      .filter(expense => expense.status === 'active')
      .reduce((total, expense) => {
        if (expense.billingCycle === 'monthly') return total + expense.amount;
        if (expense.billingCycle === 'yearly') return total + (expense.amount / 12);
        return total;
      }, 0);
  };

  const calculateNetWorth = () => {
    return data.accounts
      .filter(account => account.status === 'active')
      .reduce((total, account) => total + account.balance, 0);
  };

  const getUpcomingBills = () => {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return data.expenseFlows
      .filter(expense => 
        expense.status === 'active' && 
        expense.nextDueDate && 
        new Date(expense.nextDueDate) <= nextWeek
      ).length;
  };

  const monthlyIncome = calculateMonthlyIncome();
  const monthlyExpenses = calculateMonthlyExpenses();
  const netWorth = calculateNetWorth();
  const upcomingBills = getUpcomingBills();
  const netCashFlow = monthlyIncome - monthlyExpenses;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getHealthCheckInsights = () => {
    const insights = [];
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    // Check for upcoming bills
    const upcomingBills = data.expenseFlows.filter(expense => 
      expense.status === 'active' && 
      expense.nextDueDate && 
      new Date(expense.nextDueDate) <= nextWeek
    );
    
    if (upcomingBills.length > 0) {
      insights.push({
        type: 'warning',
        message: `${upcomingBills.length} subscription${upcomingBills.length > 1 ? 's' : ''} due soon!`,
        icon: 'alert'
      });
    }
    
    // Check for no income sources
    if (data.incomeStreams.filter(stream => stream.status === 'active').length === 0) {
      insights.push({
        type: 'info',
        message: 'No active income sources added yet',
        icon: 'info'
      });
    }
    
    // Check for high expense ratio
    if (monthlyIncome > 0 && (monthlyExpenses / monthlyIncome) > 0.8) {
      insights.push({
        type: 'warning',
        message: 'High expense ratio detected - consider reviewing subscriptions',
        icon: 'alert'
      });
    }
    
    // Positive insights
    if (netCashFlow > 1000) {
      insights.push({
        type: 'success',
        message: `Great job! You're saving ${formatCurrency(netCashFlow)} monthly`,
        icon: 'success'
      });
    }
    
    return insights;
  };

  const healthInsights = getHealthCheckInsights();

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-green-500/30 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
              <TrendingUp className="h-6 w-6 text-green-400" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Monthly Income</p>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(monthlyIncome)}</p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-500/30 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-red-500/20 to-pink-500/20 group-hover:from-red-500/30 group-hover:to-pink-500/30 transition-all duration-300">
              <TrendingDown className="h-6 w-6 text-red-400" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Monthly Expenses</p>
              <p className="text-2xl font-bold text-red-400">{formatCurrency(monthlyExpenses)}</p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: monthlyIncome > 0 ? `${Math.min((monthlyExpenses / monthlyIncome) * 100, 100)}%` : '0%' }}
            />
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-indigo-500/20 group-hover:from-purple-500/30 group-hover:to-indigo-500/30 transition-all duration-300">
              <Wallet className="h-6 w-6 text-purple-400" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Net Worth</p>
              <p className="text-2xl font-bold text-purple-400">{formatCurrency(netWorth)}</p>
            </div>
          </div>
          <div className="text-sm">
            <span className={`font-medium ${netCashFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              Net Flow: {formatCurrency(netCashFlow)}
            </span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-orange-500/30 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500/20 to-yellow-500/20 group-hover:from-orange-500/30 group-hover:to-yellow-500/30 transition-all duration-300">
              <Calendar className="h-6 w-6 text-orange-400" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Upcoming Bills</p>
              <p className="text-2xl font-bold text-orange-400">{upcomingBills}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Next 7 days</p>
        </div>
      </div>

      {/* Finance Matrix Health Check */}
      {healthInsights.length > 0 && (
        <div className="mt-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Finance Matrix Health Check</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {healthInsights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  insight.type === 'warning' 
                    ? 'bg-orange-500/10 border-orange-500/20' 
                    : insight.type === 'success'
                    ? 'bg-green-500/10 border-green-500/20'
                    : 'bg-blue-500/10 border-blue-500/20'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {insight.type === 'warning' && <Calendar className="h-4 w-4 text-orange-400" />}
                  {insight.type === 'success' && <TrendingUp className="h-4 w-4 text-green-400" />}
                  {insight.type === 'info' && <Wallet className="h-4 w-4 text-blue-400" />}
                  <span className={`text-sm font-medium ${
                    insight.type === 'warning' 
                      ? 'text-orange-300' 
                      : insight.type === 'success'
                      ? 'text-green-300'
                      : 'text-blue-300'
                  }`}>
                    {insight.message}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Monthly Review Reminder */}
      <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg">
        <p className="text-cyan-300 text-sm text-center italic">
          "Monthly reviews keep your matrix current. No account hidden. No transaction invisible. Pure financial clarity."
        </p>
      </div>
    </div>
  );
};