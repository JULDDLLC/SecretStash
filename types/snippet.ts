export interface Snippet {
  id: string;
  title: string;
  content: string;
  language: 'javascript' | 'typescript' | 'python' | 'java' | 'csharp' | 'php' | 'ruby' | 'go' | 'rust' | 'swift' | 'kotlin' | 'html' | 'css' | 'scss' | 'sql' | 'bash' | 'powershell' | 'json' | 'yaml' | 'xml' | 'markdown' | 'text' | 'prompt';
  description?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean;
}

export interface SnippetCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}