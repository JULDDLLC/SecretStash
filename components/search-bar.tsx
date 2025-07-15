'use client';

import { Search, Filter } from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
}

export const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  categoryFilter, 
  onCategoryChange 
}: SearchBarProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search secrets..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
          />
        </div>
        
        <div className="flex items-center space-x-2 sm:w-48">
          <Filter className="h-4 w-4 text-gray-400" />
          <Select value={categoryFilter} onValueChange={onCategoryChange}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="all">All Categories</SelectItem>
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
    </div>
  );
};