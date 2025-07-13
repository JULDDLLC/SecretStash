'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Wallet, Building, TrendingUp, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { Account } from '../../types/finance';

interface AccountsProps {
  accounts: Account[];
  onAdd: () => void;
  onEdit: (account: Account) => void;
  onDelete: (id: string) => void;
}

export const Accounts = ({ accounts, onAdd, onEdit, onDelete }: AccountsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bank': return Building;
      case 'investment': return TrendingUp;
      case 'asset': return Wallet;
      default: return Wallet;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'bank': return 'from-blue-500 to-cyan-500';
      case 'investment': return 'from-purple-500 to-indigo-500';
      case 'asset': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-green-400' : 'text-gray-500';
  };

  const calculateTotalBalance = () => {
    return accounts
      .filter(account => account.status === 'active')
      .reduce((total, account) => total + account.balance, 0);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-indigo-500/20">
            <Wallet className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Net Worth Building</h3>
            <p className="text-sm text-gray-400">
              Total Balance: <span className="text-purple-400 font-semibold">{formatCurrency(calculateTotalBalance())}</span>
            </p>
          </div>
        </div>
        <Button
          onClick={onAdd}
          size="sm"
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          New
        </Button>
      </div>

      <div className="space-y-4">
        {accounts.length === 0 ? (
          <div className="text-center py-8">
            <Wallet className="h-12 w-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 mb-4">No accounts yet</p>
            <Button
              onClick={onAdd}
              variant="outline"
              className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Account
            </Button>
          </div>
        ) : (
          accounts.map((account) => {
            const IconComponent = getTypeIcon(account.type);
            return (
              <div
                key={account.id}
                className="group p-4 rounded-lg bg-black/20 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${getTypeColor(account.type)} bg-opacity-20`}>
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <h4 className="font-semibold text-white">{account.name}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getTypeColor(account.type)} text-white`}>
                        {account.type}
                      </span>
                      <span className={`text-sm ${getStatusColor(account.status)}`}>
                        {account.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="font-mono text-purple-400 text-lg">
                        {formatCurrency(account.balance)}
                      </span>
                      <span>{account.institution}</span>
                      {account.link && (
                        <a
                          href={account.link}
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
                      onClick={() => onEdit(account)}
                      className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(account.id)}
                      className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {account.notes && (
                  <p className="text-sm text-gray-400">{account.notes}</p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};