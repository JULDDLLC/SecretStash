import { useState } from 'react';
import { Calendar, TrendingUp, TrendingDown, BarChart3, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FinancialSnapshot } from '../../types/finance';

interface FinancialHistoryProps {
  historicalData: FinancialSnapshot[];
}

export const FinancialHistory = ({ historicalData }: FinancialHistoryProps) => {
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return viewMode === 'monthly' 
      ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
      : date.getFullYear().toString();
  };

  const groupDataByPeriod = () => {
    const grouped: { [key: string]: FinancialSnapshot[] } = {};
    
    historicalData.forEach(snapshot => {
      const date = new Date(snapshot.date);
      const key = viewMode === 'monthly' 
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        : date.getFullYear().toString();
      
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(snapshot);
    });

    // Get the latest snapshot for each period
    const periodData: { [key: string]: FinancialSnapshot } = {};
    Object.keys(grouped).forEach(key => {
      const snapshots = grouped[key].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      periodData[key] = snapshots[0];
    });

    return periodData;
  };

  const periodData = groupDataByPeriod();
  const periods = Object.keys(periodData).sort().reverse();
  
  if (!selectedPeriod && periods.length > 0) {
    setSelectedPeriod(periods[0]);
  }

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return { percentage: 0, amount: current };
    const percentage = ((current - previous) / Math.abs(previous)) * 100;
    const amount = current - previous;
    return { percentage, amount };
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4" />;
    if (change < 0) return <TrendingDown className="h-4 w-4" />;
    return <BarChart3 className="h-4 w-4" />;
  };

  const currentPeriodIndex = periods.indexOf(selectedPeriod);
  const previousPeriod = currentPeriodIndex < periods.length - 1 ? periods[currentPeriodIndex + 1] : null;
  
  const currentData = periodData[selectedPeriod];
  const previousData = previousPeriod ? periodData[previousPeriod] : null;

  const changes = previousData ? {
    income: calculateChange(currentData?.totalIncome || 0, previousData.totalIncome),
    expenses: calculateChange(currentData?.totalExpenses || 0, previousData.totalExpenses),
    netWorth: calculateChange(currentData?.netWorth || 0, previousData.netWorth),
    cashFlow: calculateChange(currentData?.netCashFlow || 0, previousData.netCashFlow)
  } : null;

  if (historicalData.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
        <Calendar className="h-16 w-16 text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No Historical Data Yet</h3>
        <p className="text-gray-400 mb-6">
          Financial snapshots will be automatically saved as you use the app. 
          Check back here to see your financial journey over time.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20">
            <Calendar className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Financial History</h3>
            <p className="text-gray-400 italic">
              "Track your cosmic journey through the financial universe"
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={viewMode} onValueChange={(value: 'monthly' | 'yearly') => setViewMode(value)}>
            <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Period Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const nextIndex = Math.min(currentPeriodIndex + 1, periods.length - 1);
            setSelectedPeriod(periods[nextIndex]);
          }}
          disabled={currentPeriodIndex >= periods.length - 1}
          className="text-gray-400 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <div className="text-center">
          <h4 className="text-xl font-semibold text-white">
            {currentData ? formatDate(currentData.date) : 'No Data'}
          </h4>
          {previousData && (
            <p className="text-sm text-gray-400">
              vs {formatDate(previousData.date)}
            </p>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const prevIndex = Math.max(currentPeriodIndex - 1, 0);
            setSelectedPeriod(periods[prevIndex]);
          }}
          disabled={currentPeriodIndex <= 0}
          className="text-gray-400 hover:text-white"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {currentData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Income */}
          <div className="bg-black/20 border border-white/10 rounded-xl p-6 hover:border-green-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              {changes && (
                <div className={`flex items-center space-x-1 ${getChangeColor(changes.income.amount)}`}>
                  {getChangeIcon(changes.income.amount)}
                  <span className="text-sm font-medium">
                    {changes.income.percentage > 0 ? '+' : ''}{changes.income.percentage.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Income</p>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(currentData.totalIncome)}</p>
              {changes && (
                <p className={`text-sm ${getChangeColor(changes.income.amount)}`}>
                  {changes.income.amount > 0 ? '+' : ''}{formatCurrency(changes.income.amount)} vs previous
                </p>
              )}
            </div>
          </div>

          {/* Total Expenses */}
          <div className="bg-black/20 border border-white/10 rounded-xl p-6 hover:border-red-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-red-500/20 to-pink-500/20">
                <TrendingDown className="h-6 w-6 text-red-400" />
              </div>
              {changes && (
                <div className={`flex items-center space-x-1 ${getChangeColor(-changes.expenses.amount)}`}>
                  {getChangeIcon(-changes.expenses.amount)}
                  <span className="text-sm font-medium">
                    {changes.expenses.percentage > 0 ? '+' : ''}{changes.expenses.percentage.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Expenses</p>
              <p className="text-2xl font-bold text-red-400">{formatCurrency(currentData.totalExpenses)}</p>
              {changes && (
                <p className={`text-sm ${getChangeColor(-changes.expenses.amount)}`}>
                  {changes.expenses.amount > 0 ? '+' : ''}{formatCurrency(changes.expenses.amount)} vs previous
                </p>
              )}
            </div>
          </div>

          {/* Net Worth */}
          <div className="bg-black/20 border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-indigo-500/20">
                <BarChart3 className="h-6 w-6 text-purple-400" />
              </div>
              {changes && (
                <div className={`flex items-center space-x-1 ${getChangeColor(changes.netWorth.amount)}`}>
                  {getChangeIcon(changes.netWorth.amount)}
                  <span className="text-sm font-medium">
                    {changes.netWorth.percentage > 0 ? '+' : ''}{changes.netWorth.percentage.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-400">Net Worth</p>
              <p className="text-2xl font-bold text-purple-400">{formatCurrency(currentData.netWorth)}</p>
              {changes && (
                <p className={`text-sm ${getChangeColor(changes.netWorth.amount)}`}>
                  {changes.netWorth.amount > 0 ? '+' : ''}{formatCurrency(changes.netWorth.amount)} vs previous
                </p>
              )}
            </div>
          </div>

          {/* Net Cash Flow */}
          <div className="bg-black/20 border border-white/10 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                <Eye className="h-6 w-6 text-cyan-400" />
              </div>
              {changes && (
                <div className={`flex items-center space-x-1 ${getChangeColor(changes.cashFlow.amount)}`}>
                  {getChangeIcon(changes.cashFlow.amount)}
                  <span className="text-sm font-medium">
                    {changes.cashFlow.percentage > 0 ? '+' : ''}{changes.cashFlow.percentage.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-400">Net Cash Flow</p>
              <p className={`text-2xl font-bold ${currentData.netCashFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatCurrency(currentData.netCashFlow)}
              </p>
              {changes && (
                <p className={`text-sm ${getChangeColor(changes.cashFlow.amount)}`}>
                  {changes.cashFlow.amount > 0 ? '+' : ''}{formatCurrency(changes.cashFlow.amount)} vs previous
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Additional Metrics */}
      {currentData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/20 border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Active Income Streams</span>
              <span className="text-white font-semibold">{currentData.activeIncomeStreams}</span>
            </div>
          </div>
          <div className="bg-black/20 border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Active Expense Flows</span>
              <span className="text-white font-semibold">{currentData.activeExpenseFlows}</span>
            </div>
          </div>
          <div className="bg-black/20 border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Total Accounts</span>
              <span className="text-white font-semibold">{currentData.totalAccounts}</span>
            </div>
          </div>
        </div>
      )}

      {/* Cosmic Quote */}
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg">
        <p className="text-indigo-300 text-sm text-center italic">
          "Every financial decision creates ripples across the cosmic timeline. Your history illuminates the path forward."
        </p>
      </div>
    </div>
  );
};