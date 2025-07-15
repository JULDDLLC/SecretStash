import { Snippet } from '../types/snippet';

const STORAGE_KEY = 'secretstash_snippets';

const sampleSnippets: Snippet[] = [
  {
    id: '1',
    title: 'React useState Hook',
    content: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Counter;`,
    language: 'javascript',
    description: 'Basic React useState hook example with counter',
    tags: ['react', 'hooks', 'state', 'counter'],
    createdAt: '2025-01-15T10:30:00Z',
    updatedAt: '2025-01-15T10:30:00Z',
    isFavorite: true
  },
  {
    id: '2',
    title: 'Python List Comprehension',
    content: `# Basic list comprehension
squares = [x**2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition
even_squares = [x**2 for x in range(10) if x % 2 == 0]
print(even_squares)  # [0, 4, 16, 36, 64]

# Nested list comprehension
matrix = [[j for j in range(3)] for i in range(3)]
print(matrix)  # [[0, 1, 2], [0, 1, 2], [0, 1, 2]]`,
    language: 'python',
    description: 'Python list comprehension examples with conditions',
    tags: ['python', 'list-comprehension', 'loops', 'functional'],
    createdAt: '2025-01-14T14:22:00Z',
    updatedAt: '2025-01-14T14:22:00Z'
  },
  {
    id: '3',
    title: 'SQL Join Query',
    content: `SELECT 
    u.id,
    u.username,
    u.email,
    p.title as post_title,
    p.created_at as post_date
FROM users u
INNER JOIN posts p ON u.id = p.user_id
WHERE u.active = 1
    AND p.published = 1
ORDER BY p.created_at DESC
LIMIT 10;`,
    language: 'sql',
    description: 'SQL query to get users with their latest posts',
    tags: ['sql', 'join', 'query', 'database'],
    createdAt: '2025-01-13T09:15:00Z',
    updatedAt: '2025-01-13T09:15:00Z'
  },
  {
    id: '4',
    title: 'Git Workflow Commands',
    content: `# Create and switch to new branch
git checkout -b feature/new-feature

# Stage and commit changes
git add .
git commit -m "Add new feature implementation"

# Push branch to remote
git push -u origin feature/new-feature

# Switch back to main and pull latest
git checkout main
git pull origin main

# Merge feature branch
git merge feature/new-feature

# Delete feature branch
git branch -d feature/new-feature
git push origin --delete feature/new-feature`,
    language: 'bash',
    description: 'Common Git workflow commands for feature development',
    tags: ['git', 'workflow', 'version-control', 'commands'],
    createdAt: '2025-01-12T16:45:00Z',
    updatedAt: '2025-01-12T16:45:00Z'
  },
  {
    id: '5',
    title: 'CSS Flexbox Layout',
    content: `.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.item {
  flex: 1;
  min-width: 0; /* Prevents flex items from overflowing */
}

.item:first-child {
  flex: 2; /* Takes twice the space */
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: stretch;
  }
}`,
    language: 'css',
    description: 'Responsive flexbox layout with common properties',
    tags: ['css', 'flexbox', 'layout', 'responsive'],
    createdAt: '2025-01-11T11:20:00Z',
    updatedAt: '2025-01-11T11:20:00Z'
  },
  {
    id: '6',
    title: 'API Error Handling',
    content: `async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    
    // Handle different error types
    if (error.name === 'TypeError') {
      throw new Error('Network error - please check your connection');
    }
    
    throw error;
  }
}

// Usage with error handling
fetchUserData(123)
  .then(user => console.log(user))
  .catch(error => console.error('Error:', error.message));`,
    language: 'javascript',
    description: 'Robust API error handling with fetch and async/await',
    tags: ['javascript', 'api', 'error-handling', 'fetch', 'async'],
    createdAt: '2025-01-10T13:33:00Z',
    updatedAt: '2025-01-10T13:33:00Z'
  },
  {
    id: '7',
    title: 'Docker Compose Setup',
    content: `version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
    depends_on:
      - db
      - redis
    volumes:
      - ./uploads:/app/uploads

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:`,
    language: 'yaml',
    description: 'Docker Compose setup for Node.js app with PostgreSQL and Redis',
    tags: ['docker', 'compose', 'postgresql', 'redis', 'devops'],
    createdAt: '2025-01-09T08:12:00Z',
    updatedAt: '2025-01-09T08:12:00Z'
  },
  {
    id: '8',
    title: 'AI Prompt: Code Review',
    content: `Please review the following code and provide feedback on:

1. **Code Quality**: Are there any bugs, inefficiencies, or code smells?
2. **Best Practices**: Does it follow language/framework conventions?
3. **Security**: Are there any potential security vulnerabilities?
4. **Performance**: Can performance be improved?
5. **Maintainability**: Is the code readable and maintainable?
6. **Testing**: What test cases should be added?

Please provide specific suggestions with code examples where applicable.

[PASTE YOUR CODE HERE]`,
    language: 'prompt',
    description: 'AI prompt template for comprehensive code review',
    tags: ['ai', 'prompt', 'code-review', 'quality', 'best-practices'],
    createdAt: '2025-01-08T17:55:00Z',
    updatedAt: '2025-01-08T17:55:00Z',
    isFavorite: true
  },
  {
    id: '9',
    title: 'TypeScript Generic Function',
    content: `// Generic function with constraints
function filterArray<T>(
  array: T[],
  predicate: (item: T) => boolean
): T[] {
  return array.filter(predicate);
}

// Generic function with multiple type parameters
function mapObject<T, U>(
  obj: Record<string, T>,
  mapper: (value: T, key: string) => U
): Record<string, U> {
  const result: Record<string, U> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    result[key] = mapper(value, key);
  }
  
  return result;
}

// Usage examples
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = filterArray(numbers, n => n % 2 === 0);

const userObj = { john: 25, jane: 30, bob: 35 };
const userAges = mapObject(userObj, (age, name) => \`\${name} is \${age} years old\`);`,
    language: 'typescript',
    description: 'TypeScript generic functions with type constraints',
    tags: ['typescript', 'generics', 'functions', 'types'],
    createdAt: '2025-01-07T12:18:00Z',
    updatedAt: '2025-01-07T12:18:00Z'
  },
  {
    id: '10',
    title: 'AI Prompt: Bug Debugging',
    content: `I'm encountering a bug in my [LANGUAGE/FRAMEWORK] application. Here are the details:

**Problem Description:**
[Describe what's happening vs what should happen]

**Error Message:**
\`\`\`
[Paste any error messages here]
\`\`\`

**Code:**
\`\`\`[language]
[Paste relevant code here]
\`\`\`

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Environment:**
- OS: [Operating System]
- Language/Framework Version: [Version]
- Dependencies: [Relevant package versions]

**What I've Tried:**
- [List debugging steps already attempted]

Please help me identify the root cause and provide a solution with explanation.`,
    language: 'prompt',
    description: 'AI prompt template for debugging assistance',
    tags: ['ai', 'prompt', 'debugging', 'troubleshooting', 'help'],
    createdAt: '2025-01-06T15:42:00Z',
    updatedAt: '2025-01-06T15:42:00Z'
  }
];

export const getSnippets = (): Snippet[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with sample data if no snippets exist
    saveSnippets(sampleSnippets);
    return sampleSnippets;
  } catch (error) {
    console.error('Error reading snippets from localStorage:', error);
    return [];
  }
};

export const saveSnippets = (snippets: Snippet[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
  } catch (error) {
    console.error('Error saving snippets to localStorage:', error);
  }
};

export const addSnippet = (snippet: Snippet): void => {
  const snippets = getSnippets();
  snippets.push(snippet);
  saveSnippets(snippets);
};

export const updateSnippet = (id: string, updates: Partial<Snippet>): void => {
  const snippets = getSnippets();
  const index = snippets.findIndex(s => s.id === id);
  if (index !== -1) {
    snippets[index] = { ...snippets[index], ...updates, updatedAt: new Date().toISOString() };
    saveSnippets(snippets);
  }
};

export const deleteSnippet = (id: string): void => {
  const snippets = getSnippets();
  const filtered = snippets.filter(s => s.id !== id);
  saveSnippets(filtered);
};

export const toggleSnippetFavorite = (id: string): void => {
  const snippets = getSnippets();
  const index = snippets.findIndex(s => s.id === id);
  if (index !== -1) {
    snippets[index].isFavorite = !snippets[index].isFavorite;
    snippets[index].updatedAt = new Date().toISOString();
    saveSnippets(snippets);
  }
};