'use client';

import { useState, useEffect } from 'react';
import { Plus, Download, Code, FileText, Heart, Zap } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Navbar } from '../../components/navbar';
import { ThemeProvider } from '../../contexts/theme-context';
import { SnippetCard } from '../../components/snippet-card';
import { AddSnippetModal } from '../../components/add-snippet-modal';
import { SnippetSearchBar } from '../../components/snippet-search-bar';
import { Snippet } from '../../types/snippet';
import { getSnippets, addSnippet, updateSnippet, deleteSnippet, toggleSnippetFavorite } from '../../lib/snippet-storage';

export default function SnippetsPage() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<Snippet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<Snippet | undefined>();

  useEffect(() => {
    const storedSnippets = getSnippets();
    setSnippets(storedSnippets);
  }, []);

  useEffect(() => {
    let filtered = snippets;

    if (searchTerm) {
      filtered = filtered.filter(snippet =>
        snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (languageFilter !== 'all') {
      filtered = filtered.filter(snippet => snippet.language === languageFilter);
    }

    if (showFavoritesOnly) {
      filtered = filtered.filter(snippet => snippet.isFavorite);
    }

    setFilteredSnippets(filtered);
  }, [snippets, searchTerm, languageFilter, showFavoritesOnly]);

  const handleAddSnippet = (snippetData: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSnippet: Snippet = {
      ...snippetData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    addSnippet(newSnippet);
    setSnippets(prev => [...prev, newSnippet]);
  };

  const handleEditSnippet = (snippet: Snippet) => {
    setEditingSnippet(snippet);
    setIsAddModalOpen(true);
  };

  const handleUpdateSnippet = (snippetData: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingSnippet) {
      const updatedSnippet = {
        ...editingSnippet,
        ...snippetData,
        updatedAt: new Date().toISOString()
      };
      
      updateSnippet(editingSnippet.id, updatedSnippet);
      setSnippets(prev => prev.map(s => s.id === editingSnippet.id ? updatedSnippet : s));
      setEditingSnippet(undefined);
    }
  };

  const handleDeleteSnippet = (id: string) => {
    deleteSnippet(id);
    setSnippets(prev => prev.filter(s => s.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    toggleSnippetFavorite(id);
    setSnippets(prev => prev.map(s => 
      s.id === id ? { ...s, isFavorite: !s.isFavorite, updatedAt: new Date().toISOString() } : s
    ));
  };

  const handleExportSnippets = () => {
    const dataStr = JSON.stringify(filteredSnippets, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'snippets-export.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getLanguageStats = () => {
    const stats = snippets.reduce((acc, snippet) => {
      acc[snippet.language] = (acc[snippet.language] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(stats).map(([language, count]) => ({
      language,
      count,
      name: language.charAt(0).toUpperCase() + language.slice(1)
    }));
  };

  const languageStats = getLanguageStats();
  const favoriteCount = snippets.filter(s => s.isFavorite).length;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 dark:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50 light:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative z-10">
          <Navbar />
          
          <div className="container mx-auto px-4 py-8">
            {/* Demo Data Disclaimer */}
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Code className="h-5 w-5 text-blue-400" />
                <p className="text-blue-200 text-sm">
                  <strong>Demo Notice:</strong> The snippets displayed below are sample code and prompts for demonstration purposes. 
                  Replace these with your own code snippets, templates, and AI prompts for maximum productivity.
                </p>
              </div>
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Code Snippets & Prompts</h1>
                  <p className="text-muted-foreground">Store and organize your code snippets, templates, and AI prompts</p>
                </div>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <Button
                    onClick={handleExportSnippets}
                    variant="outline"
                    className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export JSON
                  </Button>
                  <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Snippet
                  </Button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Snippets</p>
                      <p className="text-2xl font-bold text-foreground">{snippets.length}</p>
                    </div>
                    <Code className="h-8 w-8 text-cyan-400" />
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Languages</p>
                      <p className="text-2xl font-bold text-foreground">{languageStats.length}</p>
                    </div>
                    <FileText className="h-8 w-8 text-purple-400" />
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Favorites</p>
                      <p className="text-2xl font-bold text-foreground">{favoriteCount}</p>
                    </div>
                    <Heart className="h-8 w-8 text-red-400" />
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">AI Prompts</p>
                      <p className="text-2xl font-bold text-foreground">
                        {snippets.filter(s => s.language === 'prompt').length}
                      </p>
                    </div>
                    <Zap className="h-8 w-8 text-yellow-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <SnippetSearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              languageFilter={languageFilter}
              onLanguageChange={setLanguageFilter}
              showFavoritesOnly={showFavoritesOnly}
              onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
            />

            {/* Snippets Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSnippets.map((snippet) => (
                <SnippetCard
                  key={snippet.id}
                  snippet={snippet}
                  onEdit={handleEditSnippet}
                  onDelete={handleDeleteSnippet}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>

            {filteredSnippets.length === 0 && (
              <div className="text-center py-12">
                <Code className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  {searchTerm || languageFilter !== 'all' || showFavoritesOnly ? 'No snippets found' : 'No snippets yet'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm || languageFilter !== 'all' || showFavoritesOnly
                    ? 'Try adjusting your search or filter criteria.' 
                    : 'Start by adding your first code snippet or AI prompt.'}
                </p>
                {!searchTerm && languageFilter === 'all' && !showFavoritesOnly && (
                  <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Snippet
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Add/Edit Snippet Modal */}
          <AddSnippetModal
            isOpen={isAddModalOpen}
            onClose={() => {
              setIsAddModalOpen(false);
              setEditingSnippet(undefined);
            }}
            onSave={editingSnippet ? handleUpdateSnippet : handleAddSnippet}
            editingSnippet={editingSnippet}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}