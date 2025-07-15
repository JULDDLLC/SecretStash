'use client';

import { useState } from 'react';
import { Copy, Eye, EyeOff, Edit, Trash2, Check, Heart, Code, FileText, Terminal, Database } from 'lucide-react';
import { Button } from './ui/button';
import { Snippet } from '../types/snippet';

interface SnippetCardProps {
  snippet: Snippet;
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export const SnippetCard = ({ snippet, onEdit, onDelete, onToggleFavorite }: SnippetCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const getLanguageColor = (language: string) => {
    const colors = {
      'javascript': 'from-yellow-500 to-orange-500',
      'typescript': 'from-blue-500 to-indigo-500',
      'python': 'from-green-500 to-blue-500',
      'java': 'from-red-500 to-orange-500',
      'csharp': 'from-purple-500 to-blue-500',
      'php': 'from-indigo-500 to-purple-500',
      'ruby': 'from-red-500 to-pink-500',
      'go': 'from-cyan-500 to-blue-500',
      'rust': 'from-orange-500 to-red-500',
      'swift': 'from-orange-500 to-pink-500',
      'kotlin': 'from-purple-500 to-indigo-500',
      'html': 'from-orange-500 to-red-500',
      'css': 'from-blue-500 to-cyan-500',
      'scss': 'from-pink-500 to-purple-500',
      'sql': 'from-blue-500 to-green-500',
      'bash': 'from-gray-500 to-gray-700',
      'powershell': 'from-blue-500 to-indigo-500',
      'json': 'from-yellow-500 to-green-500',
      'yaml': 'from-red-500 to-pink-500',
      'xml': 'from-orange-500 to-yellow-500',
      'markdown': 'from-gray-500 to-blue-500',
      'text': 'from-gray-500 to-gray-600',
      'prompt': 'from-purple-500 to-pink-500'
    };
    return colors[language as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getLanguageIcon = (language: string) => {
    if (language === 'prompt') return FileText;
    if (['bash', 'powershell'].includes(language)) return Terminal;
    if (language === 'sql') return Database;
    return Code;
  };

  const formatLanguageName = (language: string) => {
    const names = {
      'javascript': 'JavaScript',
      'typescript': 'TypeScript',
      'python': 'Python',
      'java': 'Java',
      'csharp': 'C#',
      'php': 'PHP',
      'ruby': 'Ruby',
      'go': 'Go',
      'rust': 'Rust',
      'swift': 'Swift',
      'kotlin': 'Kotlin',
      'html': 'HTML',
      'css': 'CSS',
      'scss': 'SCSS',
      'sql': 'SQL',
      'bash': 'Bash',
      'powershell': 'PowerShell',
      'json': 'JSON',
      'yaml': 'YAML',
      'xml': 'XML',
      'markdown': 'Markdown',
      'text': 'Text',
      'prompt': 'AI Prompt'
    };
    return names[language as keyof typeof names] || language.toUpperCase();
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const IconComponent = getLanguageIcon(snippet.language);

  return (
    <div className="group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-semibold text-foreground text-lg group-hover:text-cyan-400 transition-colors">
              {snippet.title}
            </h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getLanguageColor(snippet.language)} text-white flex items-center space-x-1`}>
              <IconComponent className="h-3 w-3" />
              <span>{formatLanguageName(snippet.language)}</span>
            </span>
            {snippet.isFavorite && (
              <Heart className="h-4 w-4 text-red-400 fill-current" />
            )}
          </div>
          {snippet.description && (
            <p className="text-muted-foreground text-sm mb-3">{snippet.description}</p>
          )}
        </div>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorite(snippet.id)}
            className={`text-gray-400 hover:bg-red-500/10 ${snippet.isFavorite ? 'text-red-400 hover:text-red-300' : 'hover:text-red-400'}`}
          >
            <Heart className={`h-4 w-4 ${snippet.isFavorite ? 'fill-current' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(snippet)}
            className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(snippet.id)}
            className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm text-muted-foreground">Content:</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 p-1"
          >
            {isExpanded ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
          <pre className="whitespace-pre-wrap text-cyan-300 break-words">
            {isExpanded ? snippet.content : truncateContent(snippet.content)}
          </pre>
        </div>
      </div>

      {snippet.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {snippet.tags.map((tag, index) => (
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
        <span>Created: {new Date(snippet.createdAt).toLocaleDateString()}</span>
        <span>Updated: {new Date(snippet.updatedAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};