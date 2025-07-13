'use client';

import { useState } from 'react';
import { X, Plus, Code } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Snippet } from '../types/snippet';

interface AddSnippetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editingSnippet?: Snippet;
}

export const AddSnippetModal = ({ isOpen, onClose, onSave, editingSnippet }: AddSnippetModalProps) => {
  const [formData, setFormData] = useState({
    title: editingSnippet?.title || '',
    content: editingSnippet?.content || '',
    language: editingSnippet?.language || 'javascript',
    description: editingSnippet?.description || '',
    tags: editingSnippet?.tags.join(', ') || '',
    isFavorite: editingSnippet?.isFavorite || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: formData.title,
      content: formData.content,
      language: formData.language as Snippet['language'],
      description: formData.description,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      isFavorite: formData.isFavorite
    });
    onClose();
    setFormData({
      title: '',
      content: '',
      language: 'javascript',
      description: '',
      tags: '',
      isFavorite: false
    });
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'scss', label: 'SCSS' },
    { value: 'sql', label: 'SQL' },
    { value: 'bash', label: 'Bash' },
    { value: 'powershell', label: 'PowerShell' },
    { value: 'json', label: 'JSON' },
    { value: 'yaml', label: 'YAML' },
    { value: 'xml', label: 'XML' },
    { value: 'markdown', label: 'Markdown' },
    { value: 'text', label: 'Plain Text' },
    { value: 'prompt', label: 'AI Prompt' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gray-900/90 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {editingSnippet ? 'Edit Snippet' : 'Add New Snippet'}
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
              <Label htmlFor="title" className="text-foreground mb-2 block">
                Snippet Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground"
                placeholder="e.g., React useState Hook"
                required
              />
            </div>

            <div>
              <Label htmlFor="language" className="text-foreground mb-2 block">
                Language/Type *
              </Label>
              <Select value={formData.language} onValueChange={(value) => handleChange('language', value)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border max-h-60">
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="content" className="text-foreground mb-2 block">
              Code/Content *
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              className="bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground font-mono min-h-[300px]"
              placeholder="Paste your code snippet or prompt here..."
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-foreground mb-2 block">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground"
              placeholder="Brief description of what this snippet does..."
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="tags" className="text-foreground mb-2 block">
              Tags
            </Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => handleChange('tags', e.target.value)}
              className="bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground"
              placeholder="e.g., react, hooks, state, frontend"
            />
            <p className="text-sm text-muted-foreground mt-1">Separate tags with commas</p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isFavorite"
              checked={formData.isFavorite}
              onChange={(e) => handleChange('isFavorite', e.target.checked)}
              className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
            />
            <Label htmlFor="isFavorite" className="text-foreground">
              Mark as favorite
            </Label>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-white/20 text-foreground hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white"
            >
              <Code className="h-4 w-4 mr-2" />
              {editingSnippet ? 'Update Snippet' : 'Add Snippet'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};