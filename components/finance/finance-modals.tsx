'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { IncomeStream, ExpenseFlow, Account } from '../../types/finance';

interface IncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (income: Omit<IncomeStream, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editingIncome?: IncomeStream;
}

export const IncomeModal = ({ isOpen, onClose, onSave, editingIncome }: IncomeModalProps) => {
  const [formData, setFormData] = useState({
    name: editingIncome?.name || '',
    type: editingIncome?.type || 'active',
    amount: editingIncome?.amount?.toString() || '',
    frequency: editingIncome?.frequency || 'monthly',
    status: editingIncome?.status || 'active',
    tags: editingIncome?.tags.join(', ') || '',
    notes: editingIncome?.notes || '',
    link: editingIncome?.link || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      type: formData.type as IncomeStream['type'],
      amount: parseFloat(formData.amount) || 0,
      frequency: formData.frequency as IncomeStream['frequency'],
      status: formData.status as IncomeStream['status'],
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      notes: formData.notes,
      link: formData.link
    });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gray-900/90 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {editingIncome ? 'Edit Income Stream' : 'Add Income Stream'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white mb-2 block">Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                placeholder="e.g., Freelance Development"
                required
              />
            </div>
            <div>
              <Label className="text-white mb-2 block">Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="passive">Passive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white mb-2 block">Amount *</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <Label className="text-white mb-2 block">Frequency *</Label>
              <Select value={formData.frequency} onValueChange={(value) => handleChange('frequency', value)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="one-off">One-off</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white mb-2 block">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-white mb-2 block">Link</Label>
              <Input
                type="url"
                value={formData.link}
                onChange={(e) => handleChange('link', e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <Label className="text-white mb-2 block">Tags</Label>
            <Input
              value={formData.tags}
              onChange={(e) => handleChange('tags', e.target.value)}
              className="bg-white/5 border-white/10 text-white"
              placeholder="e.g., freelance, primary, recurring"
            />
            <p className="text-sm text-gray-400 mt-1">Separate tags with commas</p>
          </div>

          <div>
            <Label className="text-white mb-2 block">Notes</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="bg-white/5 border-white/10 text-white"
              placeholder="Optional notes..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-white/20 text-white">
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400">
              <Plus className="h-4 w-4 mr-2" />
              {editingIncome ? 'Update' : 'Add'} Income
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: Omit<ExpenseFlow, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editingExpense?: ExpenseFlow;
}

export const ExpenseModal = ({ isOpen, onClose, onSave, editingExpense }: ExpenseModalProps) => {
  const [formData, setFormData] = useState({
    name: editingExpense?.name || '',
    type: editingExpense?.type || 'subscription',
    amount: editingExpense?.amount?.toString() || '',
    billingCycle: editingExpense?.billingCycle || 'monthly',
    status: editingExpense?.status || 'active',
    category: editingExpense?.category || '',
    notes: editingExpense?.notes || '',
    link: editingExpense?.link || '',
    nextDueDate: editingExpense?.nextDueDate ? editingExpense.nextDueDate.split('T')[0] : ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      type: formData.type as ExpenseFlow['type'],
      amount: parseFloat(formData.amount) || 0,
      billingCycle: formData.billingCycle as ExpenseFlow['billingCycle'],
      status: formData.status as ExpenseFlow['status'],
      category: formData.category,
      notes: formData.notes,
      link: formData.link,
      nextDueDate: formData.nextDueDate ? new Date(formData.nextDueDate).toISOString() : undefined
    });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gray-900/90 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {editingExpense ? 'Edit Expense Flow' : 'Add Expense Flow'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white mb-2 block">Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                placeholder="e.g., AWS Infrastructure"
                required
              />
            </div>
            <div>
              <Label className="text-white mb-2 block">Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="subscription">Subscription</SelectItem>
                  <SelectItem value="one-off">One-off</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white mb-2 block">Amount *</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <Label className="text-white mb-2 block">Billing Cycle *</Label>
              <Select value={formData.billingCycle} onValueChange={(value) => handleChange('billingCycle', value)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="one-off">One-off</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white mb-2 block">Category *</Label>
              <Input
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                placeholder="e.g., Infrastructure, Software"
                required
              />
            </div>
            <div>
              <Label className="text-white mb-2 block">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white mb-2 block">Link</Label>
              <Input
                type="url"
                value={formData.link}
                onChange={(e) => handleChange('link', e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                placeholder="https://..."
              />
            </div>
            <div>
              <Label className="text-white mb-2 block">Next Due Date</Label>
              <Input
                type="date"
                value={formData.nextDueDate}
                onChange={(e) => handleChange('nextDueDate', e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>

          <div>
            <Label className="text-white mb-2 block">Notes</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="bg-white/5 border-white/10 text-white"
              placeholder="Optional notes..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-white/20 text-white">
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400">
              <Plus className="h-4 w-4 mr-2" />
              {editingExpense ? 'Update' : 'Add'} Expense
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (account: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editingAccount?: Account;
}

export const AccountModal = ({ isOpen, onClose, onSave, editingAccount }: AccountModalProps) => {
  const [formData, setFormData] = useState({
    name: editingAccount?.name || '',
    type: editingAccount?.type || 'bank',
    balance: editingAccount?.balance?.toString() || '',
    institution: editingAccount?.institution || '',
    notes: editingAccount?.notes || '',
    link: editingAccount?.link || '',
    status: editingAccount?.status || 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      type: formData.type as Account['type'],
      balance: parseFloat(formData.balance) || 0,
      institution: formData.institution,
      notes: formData.notes,
      link: formData.link,
      status: formData.status as Account['status']
    });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gray-900/90 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {editingAccount ? 'Edit Account' : 'Add Account'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white mb-2 block">Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                placeholder="e.g., Business Checking"
                required
              />
            </div>
            <div>
              <Label className="text-white mb-2 block">Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="bank">Bank</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                  <SelectItem value="asset">Asset</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white mb-2 block">Balance *</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.balance}
                onChange={(e) => handleChange('balance', e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <Label className="text-white mb-2 block">Institution *</Label>
              <Input
                value={formData.institution}
                onChange={(e) => handleChange('institution', e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                placeholder="e.g., Chase Bank"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white mb-2 block">Link</Label>
              <Input
                type="url"
                value={formData.link}
                onChange={(e) => handleChange('link', e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                placeholder="https://..."
              />
            </div>
            <div>
              <Label className="text-white mb-2 block">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-white mb-2 block">Notes</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="bg-white/5 border-white/10 text-white"
              placeholder="Optional notes..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-white/20 text-white">
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400">
              <Plus className="h-4 w-4 mr-2" />
              {editingAccount ? 'Update' : 'Add'} Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};