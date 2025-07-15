'use client';

import { useState } from 'react';
import { Search, Filter, ExternalLink, Calendar, Download } from 'lucide-react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { FinanceData } from '../../types/finance';

interface FinanceMatrixTableProps {
  data: FinanceData;
  onExport: () => void;
}

export const FinanceMatrixTable = ({ data, onExport }: FinanceMatrixTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  // Combine all data into a unified format
  const allEntries = [
    ...data.incomeStreams.map(item => ({
      id: item.id,
      name: item.name,
      type: 'Income',
      subType: item.type,
      amount: item.amount,
      frequency: item.frequency,
      status: item.status,
      category: 'Income',
      link: item.link,
      nextDue: '-',
      notes: item.notes || '',
      tags: item.tags
    })),
    ...data.expenseFlows.map(item => ({
      id: item.id,
      name: item.name,
      type: 'Expense',
      subType: item.type,
      amount: -item.amount,
      frequency: item.billingCycle,
      status: item.status,
      category: item.category,
      link: item.link,
      nextDue: formatDate(item.nextDueDate),
      notes: item.notes || '',
      tags: []
    })),
    ...data.accounts.map(item => ({
      id: item.id,
      name: item.name,
      type: 'Account',
      subType: item.type,
      amount: item.balance,
      frequency: 'balance',
      status: item.status,
      category: item.institution,
      link: item.link,
      nextDue: '-',
      notes: item.notes || '',
      tags: []
    }))
  ];

  // Filter entries
  const filteredEntries = allEntries.filter(entry => {
    const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = typeFilter === 'all' || entry.type.toLowerCase() === typeFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || entry.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getAmountColor = (amount: number, type: string) => {
    if (type === 'Income') return 'text-green-400';
    if (type === 'Expense') return 'text-red-400';
    return 'text-purple-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/10';
      case 'inactive': return 'text-gray-400 bg-gray-500/10';
      case 'cancelled': return 'text-red-400 bg-red-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Finance Matrix</h3>
          <p className="text-gray-400 italic">
            "Complete financial transparency in cosmic harmony"
          </p>
        </div>
        <Button
          onClick={onExport}
          variant="outline"
          className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
              <SelectItem value="account">Account</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-gray-300 font-semibold">Name</th>
              <th className="text-left py-3 px-4 text-gray-300 font-semibold">Type</th>
              <th className="text-left py-3 px-4 text-gray-300 font-semibold">Status</th>
              <th className="text-right py-3 px-4 text-gray-300 font-semibold">Amount</th>
              <th className="text-left py-3 px-4 text-gray-300 font-semibold">Frequency</th>
              <th className="text-left py-3 px-4 text-gray-300 font-semibold">Category</th>
              <th className="text-left py-3 px-4 text-gray-300 font-semibold">Next Due</th>
              <th className="text-left py-3 px-4 text-gray-300 font-semibold">Link</th>
              <th className="text-left py-3 px-4 text-gray-300 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8 text-gray-400">
                  No entries found matching your criteria
                </td>
              </tr>
            ) : (
              filteredEntries.map((entry) => (
                <tr key={`${entry.type}-${entry.id}`} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-white">{entry.name}</div>
                    <div className="text-sm text-gray-400">{entry.subType}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      entry.type === 'Income' ? 'bg-green-500/20 text-green-400' :
                      entry.type === 'Expense' ? 'bg-red-500/20 text-red-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {entry.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(entry.status)}`}>
                      {entry.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-mono font-semibold ${getAmountColor(entry.amount, entry.type)}`}>
                      {formatCurrency(Math.abs(entry.amount))}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{entry.frequency}</td>
                  <td className="py-3 px-4 text-gray-300">{entry.category}</td>
                  <td className="py-3 px-4 text-gray-300">
                    {entry.nextDue !== '-' && (
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {entry.nextDue}
                      </div>
                    )}
                    {entry.nextDue === '-' && '-'}
                  </td>
                  <td className="py-3 px-4">
                    {entry.link && (
                      <a
                        href={entry.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-cyan-400 hover:text-cyan-300"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Link
                      </a>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-400 max-w-xs truncate">
                    {entry.notes || '-'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-400 text-center">
        Showing {filteredEntries.length} of {allEntries.length} entries
      </div>
    </div>
  );
};