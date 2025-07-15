import { Secret } from '../types/secret';

export const sampleSecrets: Secret[] = [
  {
    id: '1',
    title: 'Stripe API Key',
    category: 'api-keys',
    value: 'sk_test_51HdSGw2eZvKYlo2CrZODxrPzWnKJkWe8LgRTaZEDgKfFWBIa3jHuU7J8ZXJpzJuiG6qhqOxvTgPz5LdYUdYbdK3t00jQfSxqrH',
    description: 'Test API key for Stripe payment processing',
    createdAt: '2025-01-15T10:30:00Z',
    updatedAt: '2025-01-15T10:30:00Z',
    tags: ['payment', 'test', 'stripe']
  },
  {
    id: '2',
    title: 'GitHub Personal Access Token',
    category: 'tokens',
    value: 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    description: 'Personal access token for GitHub API with repo access',
    createdAt: '2025-01-14T14:22:00Z',
    updatedAt: '2025-01-14T14:22:00Z',
    tags: ['github', 'git', 'development']
  },
  {
    id: '3',
    title: 'AWS Access Key',
    category: 'api-keys',
    value: 'AKIAIOSFODNN7EXAMPLE',
    description: 'AWS access key for S3 bucket management',
    createdAt: '2025-01-13T09:15:00Z',
    updatedAt: '2025-01-13T09:15:00Z',
    tags: ['aws', 'cloud', 's3']
  },
  {
    id: '4',
    title: 'Database Password',
    category: 'passwords',
    value: 'MyS3cur3P@ssw0rd!',
    description: 'Production database password for main application',
    createdAt: '2025-01-12T16:45:00Z',
    updatedAt: '2025-01-12T16:45:00Z',
    tags: ['database', 'production', 'mysql']
  },
  {
    id: '5',
    title: 'Domain SSL Certificate',
    category: 'certificates',
    value: '-----BEGIN CERTIFICATE-----\nMIIDVTCCAj2gAwIBAgIJAJGKnwxVYxnLMA0GCSqGSIb3DQEBCwUAMEIxCzAJBgNV\n...',
    description: 'SSL certificate for api.example.com',
    createdAt: '2025-01-11T11:20:00Z',
    updatedAt: '2025-01-11T11:20:00Z',
    tags: ['ssl', 'security', 'domain']
  },
  {
    id: '6',
    title: 'Vercel Deploy Hook',
    category: 'api-keys',
    value: 'https://api.vercel.com/v1/integrations/deploy/prj_xxxxxxxxxxxxxxxxxxxx/xxxxxxxxxx',
    description: 'Webhook URL for triggering deployments',
    createdAt: '2025-01-10T13:33:00Z',
    updatedAt: '2025-01-10T13:33:00Z',
    tags: ['vercel', 'deployment', 'webhook']
  },
  {
    id: '7',
    title: 'MongoDB Connection String',
    category: 'databases',
    value: 'mongodb+srv://username:password@cluster0.mongodb.net/database?retryWrites=true&w=majority',
    description: 'MongoDB Atlas connection string for production',
    createdAt: '2025-01-09T08:12:00Z',
    updatedAt: '2025-01-09T08:12:00Z',
    tags: ['mongodb', 'database', 'nosql']
  },
  {
    id: '8',
    title: 'SendGrid API Key',
    category: 'api-keys',
    value: 'SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    description: 'SendGrid API key for email service',
    createdAt: '2025-01-08T17:55:00Z',
    updatedAt: '2025-01-08T17:55:00Z',
    tags: ['sendgrid', 'email', 'api']
  },
  {
    id: '9',
    title: 'Redis Password',
    category: 'passwords',
    value: 'redis_secure_password_123',
    description: 'Redis instance password for caching',
    createdAt: '2025-01-07T12:18:00Z',
    updatedAt: '2025-01-07T12:18:00Z',
    tags: ['redis', 'cache', 'password']
  },
  {
    id: '10',
    title: 'Cloudinary API Secret',
    category: 'api-keys',
    value: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    description: 'Cloudinary API secret for image management',
    createdAt: '2025-01-06T15:42:00Z',
    updatedAt: '2025-01-06T15:42:00Z',
    tags: ['cloudinary', 'images', 'media']
  },
  {
    id: '11',
    title: 'Domain Registrar Password',
    category: 'passwords',
    value: 'DomainP@ss2024!',
    description: 'Password for domain registrar account',
    createdAt: '2025-01-05T10:25:00Z',
    updatedAt: '2025-01-05T10:25:00Z',
    tags: ['domain', 'registrar', 'account']
  },
  {
    id: '12',
    title: 'JWT Secret Key',
    category: 'tokens',
    value: 'your-256-bit-secret-key-here-make-it-long-and-secure',
    description: 'JWT secret key for authentication',
    createdAt: '2025-01-04T14:08:00Z',
    updatedAt: '2025-01-04T14:08:00Z',
    tags: ['jwt', 'auth', 'security']
  },
  {
    id: '13',
    title: 'Postgres Database URL',
    category: 'databases',
    value: 'postgresql://user:password@localhost:5432/myapp_production',
    description: 'PostgreSQL connection string for production',
    createdAt: '2025-01-03T09:30:00Z',
    updatedAt: '2025-01-03T09:30:00Z',
    tags: ['postgresql', 'database', 'sql']
  },
  {
    id: '14',
    title: 'Google Analytics Key',
    category: 'api-keys',
    value: 'UA-123456789-1',
    description: 'Google Analytics tracking ID',
    createdAt: '2025-01-02T16:14:00Z',
    updatedAt: '2025-01-02T16:14:00Z',
    tags: ['analytics', 'google', 'tracking']
  },
  {
    id: '15',
    title: 'Docker Hub Token',
    category: 'tokens',
    value: 'dckr_pat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    description: 'Docker Hub personal access token',
    createdAt: '2025-01-01T11:47:00Z',
    updatedAt: '2025-01-01T11:47:00Z',
    tags: ['docker', 'containers', 'registry']
  },
  {
    id: '16',
    title: 'Slack Bot Token',
    category: 'tokens',
    value: 'xoxb-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    description: 'Slack bot token for notifications',
    createdAt: '2024-12-31T13:22:00Z',
    updatedAt: '2024-12-31T13:22:00Z',
    tags: ['slack', 'bot', 'notifications']
  },
  {
    id: '17',
    title: 'Custom Domain',
    category: 'domains',
    value: 'api.myapp.com',
    description: 'Custom domain for API endpoints',
    createdAt: '2024-12-30T08:55:00Z',
    updatedAt: '2024-12-30T08:55:00Z',
    tags: ['domain', 'api', 'custom']
  },
  {
    id: '18',
    title: 'Twilio Auth Token',
    category: 'tokens',
    value: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    description: 'Twilio authentication token for SMS',
    createdAt: '2024-12-29T19:33:00Z',
    updatedAt: '2024-12-29T19:33:00Z',
    tags: ['twilio', 'sms', 'communication']
  },
  {
    id: '19',
    title: 'SSL Private Key',
    category: 'certificates',
    value: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...',
    description: 'Private key for SSL certificate',
    createdAt: '2024-12-28T12:18:00Z',
    updatedAt: '2024-12-28T12:18:00Z',
    tags: ['ssl', 'private-key', 'security']
  },
  {
    id: '20',
    title: 'OpenAI API Key',
    category: 'api-keys',
    value: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    description: 'OpenAI API key for GPT integration',
    createdAt: '2024-12-27T15:41:00Z',
    updatedAt: '2024-12-27T15:41:00Z',
    tags: ['openai', 'ai', 'gpt']
  }
];