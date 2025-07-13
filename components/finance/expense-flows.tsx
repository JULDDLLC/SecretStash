'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, TrendingDown, ExternalLink, Calendar, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { ExpenseFlow } from '../../types/finance';

interface ExpenseFlowsProps {
  expenseFlows: ExpenseFlow[];
  onAdd: () => void;
  onEdit: (expense: ExpenseFlow) => void;
  onDelete: (id: string) => void;
}

export const ExpenseFlows = ({ expenseFlows, onAdd, onEdit, onDelete }: ExpenseFlowsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTypeColor = (type: string) => {
    return type === 'subscription' ? 'from-red-500 to-pink-500' : 'from-orange-500 to-yellow-500';
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-red-400' : 'text-gray-500';
  };

  const calculateTotalMonthly = () => {
    return expenseFlows
      .filter(expense => expense.status === 'active')
      .reduce((total, expense) => {
        if (expense.billingCycle === 'monthly') return total + expense.amount;
        if (expense.billingCycle === 'yearly') return total + (expense.amount / 12);
        return total;
      }, 0);
  };

  const isUpcoming = (nextDueDate?: string) => {
    if (!nextDueDate) return false;
    const now = new Date();
    const dueDate = new Date(nextDueDate);
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  const formatDueDate = (nextDueDate?: string) => {
    if (!nextDueDate) return null;
    const date = new Date(nextDueDate);
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-500/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-red-500/20 to-pink-500/20">
            <TrendingDown className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Expense Flows</h3>
            <p className="text-sm text-gray-400">
              Total Monthly: <span className="text-red-400 font-semibold">{formatCurrency(calculateTotalMonthly())}</span>
            </p>
          </div>
        </div>
        <Button
          onClick={onAdd}
          size="sm"
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          New
        </Button>
      </div>

      <div className="space-y-4">
        {expenseFlows.length === 0 ? (
          <div className="text-center py-8">
            <TrendingDown className="h-12 w-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 mb-4">No expense flows yet</p>
            <Button
              onClick={onAdd}
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Expense
            </Button>
          </div>
        ) : (
          expenseFlows.map((expense) => (
            <div
              key={expense.id}
              className={`group p-4 rounded-lg bg-black/20 border transition-all duration-300 ${
                isUpcoming(expense.nextDueDate) 
                  ? 'border-orange-500/50 bg-orange-500/5' 
                  : 'border-white/10 hover:border-red-500/30'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-white">{expense.name}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getTypeColor(expense.type)} text-white`}>
                      {expense.type}
                    </span>
                    <span className={`text-sm ${getStatusColor(expense.status)}`}>
                      {expense.status}
                    </span>
                    {isUpcoming(expense.nextDueDate) && (
                      <div className="flex items-center text-orange-400">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span className="text-xs">Due Soon</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="font-mono text-red-400">
                      {formatCurrency(expense.amount)} / {expense.billingCycle}
                    </span>
                    <span className="px-2 py-1 text-xs bg-white/10 rounded-full">
                      {expense.category}
                    </span>
                    {expense.link && (
                      <a
                        href={expense.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-cyan-400 hover:text-cyan-300"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Link
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(expense)}
                    className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(expense.id)}
                    className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {expense.notes && (
                <p className="text-sm text-gray-400 mb-2">{expense.notes}</p>
              )}

              {expense.nextDueDate && (
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-3 w-3 text-gray-500" />
                  <span className={isUpcoming(expense.nextDueDate) ? 'text-orange-400' : 'text-gray-400'}>
                    Next due: {formatDueDate(expense.nextDueDate)}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};