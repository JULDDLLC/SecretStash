import { Secret } from '../types/secret';

const STORAGE_KEY = 'secretstash_secrets';

export const getSecrets = (): Secret[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading secrets from localStorage:', error);
    return [];
  }
};

export const saveSecrets = (secrets: Secret[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(secrets));
  } catch (error) {
    console.error('Error saving secrets to localStorage:', error);
  }
};

export const addSecret = (secret: Secret): void => {
  const secrets = getSecrets();
  secrets.push(secret);
  saveSecrets(secrets);
};

export const updateSecret = (id: string, updates: Partial<Secret>): void => {
  const secrets = getSecrets();
  const index = secrets.findIndex(s => s.id === id);
  if (index !== -1) {
    secrets[index] = { ...secrets[index], ...updates, updatedAt: new Date().toISOString() };
    saveSecrets(secrets);
  }
};

export const deleteSecret = (id: string): void => {
  const secrets = getSecrets();
  const filtered = secrets.filter(s => s.id !== id);
  saveSecrets(filtered);
};