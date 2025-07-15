'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Secret } from '../types/secret';

interface AddSecretModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (secret: Omit<Secret, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editingSecret?: Secret;
}

export const AddSecretModal = ({ isOpen, onClose, onSave, editingSecret }: AddSecretModalProps) => {
  const [formData, setFormData] = useState({
    title: editingSecret?.title || '',
    category: editingSecret?.category || 'api-keys',
    value: editingSecret?.value || '',
    description: editingSecret?.description || '',
    tags: editingSecret?.tags.join(', ') || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: formData.title,
      category: formData.category as Secret['category'],
      value: formData.value,
      description: formData.description,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    });
    onClose();
    setFormData({
      title: '',
      category: 'api-keys',
      value: '',
      description: '',
      tags: ''
    });
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
            {editingSecret ? 'Edit Secret' : 'Add New Secret'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-white mb-2 block">
                Secret Name *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                placeholder="e.g., Stripe API Key"
                required
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-white mb-2 block">
                Category *
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="api-keys">API Keys</SelectItem>
                  <SelectItem value="passwords">Passwords</SelectItem>
                  <SelectItem value="domains">Domains</SelectItem>
                  <SelectItem value="databases">Databases</SelectItem>
                  <SelectItem value="certificates">Certificates</SelectItem>
                  <SelectItem value="tokens">Tokens</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="value" className="text-white mb-2 block">
              Secret Value *
            </Label>
            <Textarea
              id="value"
              value={formData.value}
              onChange={(e) => handleChange('value', e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 font-mono"
              placeholder="Enter your secret value here..."
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-white mb-2 block">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              placeholder="Optional description..."
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="tags" className="text-white mb-2 block">
              Tags
            </Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => handleChange('tags', e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              placeholder="e.g., production, stripe, payment"
            />
            <p className="text-sm text-gray-400 mt-1">Separate tags with commas</p>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              {editingSecret ? 'Update Secret' : 'Add Secret'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};