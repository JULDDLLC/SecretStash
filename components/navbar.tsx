'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/theme-context'; // 👈 this is the correct hook now
import { Shield, Sun, Moon, LogOut, Settings, Calculator, Code, User } from 'lucide-react';
import { Button } from '../ui/button';
import { SubscriptionStatus } from './subscription/subscription-status';
import { usePathname, useRouter } from 'next/navigation';
import { AuthUser } from '../../lib/auth';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState<AuthUser | null>(null);

  // Add your Navbar logic and JSX here

  return (
    <nav>
      {/* ... your nav content ... */}
      {/* Example: */}
      <Button onClick={toggleTheme}>
        {theme === 'dark' ? <Sun /> : <Moon />}
      </Button>
    </nav>
  );
}