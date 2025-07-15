'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, TrendingUp, ExternalLink, Tag } from 'lucide-react';
import { Button } from '../ui/button';
import { IncomeStream } from '../../types/finance';

interface IncomeStreamsProps {
  incomeStreams: IncomeStream[];
  onAdd: () => void;
  onEdit: (income: IncomeStream) => void;
  onDelete: (id: string) => void;
}

export const IncomeStreams = ({ incomeStreams, onAdd, onEdit, onDelete }: IncomeStreamsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTypeColor = (type: string) => {
    return type === 'active' ? 'from-green-500 to-emerald-500' : 'from-blue-500 to-cyan-500';
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-green-400' : 'text-gray-500';
  };

  const calculateTotalMonthly = () => {
    return incomeStreams
      .filter(stream => stream.status === 'active')
      .reduce((total, stream) => {
        if (stream.frequency === 'monthly') return total + stream.amount;
        if (stream.frequency === 'yearly') return total + (stream.amount / 12);
        return total;
      }, 0);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-green-500/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20">
            <TrendingUp className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Income Streams</h3>
            <p className="text-sm text-gray-400">
              Total Monthly: <span className="text-green-400 font-semibold">{formatCurrency(calculateTotalMonthly())}</span>
            </p>
          </div>
        </div>
        <Button
          onClick={onAdd}
          size="sm"
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          New
        </Button>
      </div>

      <div className="space-y-4">
        {incomeStreams.length === 0 ? (
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 mb-4">No income streams yet</p>
            <Button
              onClick={onAdd}
              variant="outline"
              className="border-green-500/50 text-green-400 hover:bg-green-500/10"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Income Stream
            </Button>
          </div>
        ) : (
          incomeStreams.map((income) => (
            <div
              key={income.id}
              className="group p-4 rounded-lg bg-black/20 border border-white/10 hover:border-green-500/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-white">{income.name}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getTypeColor(income.type)} text-white`}>
                      {income.type}
                    </span>
                    <span className={`text-sm ${getStatusColor(income.status)}`}>
                      {income.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="font-mono text-green-400">
                      {formatCurrency(income.amount)} / {income.frequency}
                    </span>
                    {income.link && (
                      <a
                        href={income.link}
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
                    onClick={() => onEdit(income)}
                    className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(income.id)}
                    className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {income.notes && (
                <p className="text-sm text-gray-400 mb-2">{income.notes}</p>
              )}

              {income.tags.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Tag className="h-3 w-3 text-gray-500" />
                  <div className="flex flex-wrap gap-1">
                    {income.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};