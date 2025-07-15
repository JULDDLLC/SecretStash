'use client';

import { Search, Filter, Heart } from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';

interface SnippetSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  languageFilter: string;
  onLanguageChange: (value: string) => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
}

export const SnippetSearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  languageFilter, 
  onLanguageChange,
  showFavoritesOnly,
  onToggleFavorites
}: SnippetSearchBarProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search snippets..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            size="sm"
            onClick={onToggleFavorites}
            className={showFavoritesOnly 
              ? "bg-red-500 hover:bg-red-600 text-white" 
              : "border-red-500/50 text-red-400 hover:bg-red-500/10"
            }
          >
            <Heart className={`h-4 w-4 mr-2 ${showFavoritesOnly ? 'fill-current' : ''}`} />
            Favorites
          </Button>
          
          <Filter className="h-4 w-4 text-gray-400" />
          <Select value={languageFilter} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-48 bg-white/5 border-white/10 text-foreground">
              <SelectValue placeholder="All Languages" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="all">All Languages</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="csharp">C#</SelectItem>
              <SelectItem value="php">PHP</SelectItem>
              <SelectItem value="ruby">Ruby</SelectItem>
              <SelectItem value="go">Go</SelectItem>
              <SelectItem value="rust">Rust</SelectItem>
              <SelectItem value="swift">Swift</SelectItem>
              <SelectItem value="kotlin">Kotlin</SelectItem>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="css">CSS</SelectItem>
              <SelectItem value="scss">SCSS</SelectItem>
              <SelectItem value="sql">SQL</SelectItem>
              <SelectItem value="bash">Bash</SelectItem>
              <SelectItem value="powershell">PowerShell</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="yaml">YAML</SelectItem>
              <SelectItem value="xml">XML</SelectItem>
              <SelectItem value="markdown">Markdown</SelectItem>
              <SelectItem value="text">Plain Text</SelectItem>
              <SelectItem value="prompt">AI Prompt</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};