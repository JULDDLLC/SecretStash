'use client';

import { useState, useEffect } from 'react';
import { Plus, Download, BarChart3, Shield, Key, Database, EyeOff, Lock } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Navbar } from '../../components/navbar';
import { ThemeProvider } from '../../contexts/theme-context';
import { SecretCard } from '../../components/secret-card';
import { AddSecretModal } from '../../components/add-secret-modal';
import { SearchBar } from '../../components/search-bar';
import { Secret } from '../../types/secret';
import { sampleSecrets } from '../../lib/sample-data';
import { getSecrets, saveSecrets, addSecret, updateSecret, deleteSecret } from '../../lib/storage';
import { exportToPDF } from '../../lib/pdf-export';

export default function DashboardPage() {
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [filteredSecrets, setFilteredSecrets] = useState<Secret[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSecret, setEditingSecret] = useState<Secret | undefined>();
  const [isPanicMode, setIsPanicMode] = useState(false);
  const [panicPassword, setPanicPassword] = useState('');
  const [showPanicModal, setShowPanicModal] = useState(false);

  useEffect(() => {
    const storedSecrets = getSecrets();
    if (storedSecrets.length === 0) {
      // Initialize with sample data
      saveSecrets(sampleSecrets);
      setSecrets(sampleSecrets);
    } else {
      setSecrets(storedSecrets);
    }
  }, []);

  useEffect(() => {
    let filtered = secrets;

    if (searchTerm) {
      filtered = filtered.filter(secret =>
        secret.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        secret.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        secret.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(secret => secret.category === categoryFilter);
    }

    setFilteredSecrets(filtered);
  }, [secrets, searchTerm, categoryFilter]);

  const handleAddSecret = (secretData: Omit<Secret, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSecret: Secret = {
      ...secretData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    addSecret(newSecret);
    setSecrets(prev => [...prev, newSecret]);
  };

  const handleEditSecret = (secret: Secret) => {
    setEditingSecret(secret);
    setIsAddModalOpen(true);
  };

  const handleUpdateSecret = (secretData: Omit<Secret, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingSecret) {
      const updatedSecret = {
        ...editingSecret,
        ...secretData,
        updatedAt: new Date().toISOString()
      };
      
      updateSecret(editingSecret.id, updatedSecret);
      setSecrets(prev => prev.map(s => s.id === editingSecret.id ? updatedSecret : s));
      setEditingSecret(undefined);
    }
  };

  const handleDeleteSecret = (id: string) => {
    deleteSecret(id);
    setSecrets(prev => prev.filter(s => s.id !== id));
  };

  const handleExportPDF = () => {
    exportToPDF(filteredSecrets);
  };

  const handlePanicMode = () => {
    setShowPanicModal(true);
  };

  const confirmPanicMode = () => {
    if (panicPassword === 'unlock') {
      setIsPanicMode(false);
      setShowPanicModal(false);
      setPanicPassword('');
    }
  };

  const activatePanicMode = () => {
    setIsPanicMode(true);
    setShowPanicModal(false);
  };

  const getCategoryStats = () => {
    const stats = secrets.reduce((acc, secret) => {
      acc[secret.category] = (acc[secret.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(stats).map(([category, count]) => ({
      category,
      count,
      name: category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
    }));
  };

  const categoryStats = getCategoryStats();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 dark:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50 light:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative z-10">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8 pt-24">
          {/* Demo Data Disclaimer */}
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-yellow-500" />
              <p className="text-yellow-200 text-sm">
                <strong>Demo Notice:</strong> The secrets displayed below are dummy data for demonstration purposes only. 
                Do not use these examples for real sensitive information. Your actual data is stored securely in your browser's local storage.
              </p>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Secret Vault</h1>
                <p className="text-gray-400">Manage your secrets securely</p>
              </div>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <Button
                  onClick={handlePanicMode}
                  variant="outline"
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                >
                  <EyeOff className="h-4 w-4 mr-2" />
                  Panic Button
                </Button>
                <Button
                  onClick={handleExportPDF}
                  variant="outline"
                  className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Secret
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Secrets</p>
                    <p className="text-2xl font-bold text-white">{secrets.length}</p>
                  </div>
                  <Shield className="h-8 w-8 text-cyan-400" />
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Categories</p>
                    <p className="text-2xl font-bold text-white">{categoryStats.length}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-400" />
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">API Keys</p>
                    <p className="text-2xl font-bold text-white">
                      {secrets.filter(s => s.category === 'api-keys').length}
                    </p>
                  </div>
                  <Key className="h-8 w-8 text-green-400" />
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Databases</p>
                    <p className="text-2xl font-bold text-white">
                      {secrets.filter(s => s.category === 'databases').length}
                    </p>
                  </div>
                  <Database className="h-8 w-8 text-orange-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
          />

          {/* Secrets Grid */}
          <div className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 ${isPanicMode ? 'blur-md pointer-events-none' : ''}`}>
            {filteredSecrets.map((secret) => (
              <SecretCard
                key={secret.id}
                secret={secret}
                onEdit={handleEditSecret}
                onDelete={handleDeleteSecret}
              />
            ))}
          </div>

          {filteredSecrets.length === 0 && (
            <div className="text-center py-12">
              <Shield className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                {searchTerm || categoryFilter !== 'all' ? 'No secrets found' : 'No secrets yet'}
              </h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || categoryFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'Start by adding your first secret to the vault.'}
              </p>
              {!searchTerm && categoryFilter === 'all' && (
                <Button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Secret
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Panic Mode Overlay */}
        {isPanicMode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-gray-900/90 backdrop-blur-md border border-red-500/50 rounded-2xl p-8 max-w-md mx-4">
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 mb-4">
                  <Lock className="h-8 w-8 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Vault Locked</h2>
                <p className="text-gray-400 mb-6">Your secrets are hidden for security. Enter the unlock code to continue.</p>
                <Button
                  onClick={() => setShowPanicModal(true)}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white"
                >
                  Unlock Vault
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Panic Mode Modal */}
        {showPanicModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPanicModal(false)} />
            <div className="relative bg-gray-900/90 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full max-w-md mx-4">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-4">
                  {isPanicMode ? 'Unlock Vault' : 'Activate Panic Mode'}
                </h3>
                {isPanicMode ? (
                  <div>
                    <p className="text-gray-400 mb-4">Enter "unlock" to restore access to your secrets:</p>
                    <input
                      type="password"
                      value={panicPassword}
                      onChange={(e) => setPanicPassword(e.target.value)}
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white mb-4"
                      placeholder="Enter unlock code"
                      onKeyPress={(e) => e.key === 'Enter' && confirmPanicMode()}
                    />
                    <div className="flex space-x-3">
                      <Button
                        onClick={() => setShowPanicModal(false)}
                        variant="outline"
                        className="flex-1 border-white/20 text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={confirmPanicMode}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400"
                      >
                        Unlock
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-400 mb-6">This will immediately hide all your secrets until you unlock the vault again.</p>
                    <div className="flex space-x-3">
                      <Button
                        onClick={() => setShowPanicModal(false)}
                        variant="outline"
                        className="flex-1 border-white/20 text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={activatePanicMode}
                        className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400"
                      >
                        Activate
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Secret Modal */}
        <AddSecretModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingSecret(undefined);
          }}
          onSave={editingSecret ? handleUpdateSecret : handleAddSecret}
          editingSecret={editingSecret}
        />
        </div>
      </div>
    </ThemeProvider>
  );
}