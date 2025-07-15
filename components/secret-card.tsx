'use client';

import { useState } from 'react';
import { Copy, Eye, EyeOff, Edit, Trash2, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Secret } from '../types/secret';

interface SecretCardProps {
  secret: Secret;
  onEdit: (secret: Secret) => void;
  onDelete: (id: string) => void;
}

export const SecretCard = ({ secret, onEdit, onDelete }: SecretCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(secret.value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'api-keys': 'from-cyan-500 to-blue-500',
      'passwords': 'from-red-500 to-pink-500',
      'domains': 'from-green-500 to-emerald-500',
      'databases': 'from-purple-500 to-indigo-500',
      'certificates': 'from-orange-500 to-yellow-500',
      'tokens': 'from-teal-500 to-cyan-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const formatCategoryName = (category: string) => {
    return category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-semibold text-white text-lg group-hover:text-cyan-400 transition-colors">
              {secret.title}
            </h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getCategoryColor(secret.category)} text-white`}>
              {formatCategoryName(secret.category)}
            </span>
          </div>
          {secret.description && (
            <p className="text-gray-400 text-sm mb-3">{secret.description}</p>
          )}
        </div>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(secret)}
            className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(secret.id)}
            className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm text-gray-400">Value:</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(!isVisible)}
            className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 p-1"
          >
            {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-gray-400 hover:text-green-400 hover:bg-green-500/10 p-1"
          >
            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <div className="font-mono text-sm bg-black/20 rounded-lg p-3 border border-white/10 overflow-hidden">
          {isVisible ? (
            <span className="text-cyan-300 break-all">{secret.value}</span>
          ) : (
            <span className="text-gray-500">{'•'.repeat(Math.min(secret.value.length, 40))}</span>
          )}
        </div>
      </div>

      {secret.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {secret.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between text-xs text-gray-500">
        <span>Created: {new Date(secret.createdAt).toLocaleDateString()}</span>
        <span>Updated: {new Date(secret.updatedAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};