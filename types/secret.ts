export interface Secret {
  id: string;
  title: string;
  category: 'api-keys' | 'passwords' | 'domains' | 'databases' | 'certificates' | 'tokens';
  value: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface SecretCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}