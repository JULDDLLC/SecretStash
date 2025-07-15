# 🔐 SecretStash - Developer Secrets Vault

**A beautiful, secure, and user-friendly web application for managing your sensitive developer data like API keys, passwords, certificates, and more.**

![SecretStash Banner](https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

---

## 🌟 What is SecretStash?

SecretStash is a modern web application designed specifically for developers who need a secure and organized way to store sensitive information. Whether you're managing API keys, database passwords, SSL certificates, or authentication tokens, SecretStash provides a beautiful and intuitive interface to keep everything organized and easily accessible.

### ✨ Key Features

- **🔒 100% Local Storage** - Your secrets never leave your browser
- **🎨 Beautiful Dark/Light Theme** - Sleek design with smooth transitions
- **📱 Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- **🔍 Smart Search & Filter** - Find your secrets instantly
- **📂 Organized Categories** - API Keys, Passwords, Domains, Databases, Certificates, Tokens
- **📄 Export to PDF** - Generate professional reports of your secrets
- **👁️ Show/Hide Values** - Toggle visibility for sensitive data
- **📋 One-Click Copy** - Copy secrets to clipboard with visual feedback
- **🏷️ Tag System** - Organize secrets with custom tags
- **⚡ Lightning Fast** - Instant loading and smooth performance

---

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have the following installed on your computer:

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Choose the "LTS" (Long Term Support) version
   - Follow the installation wizard for your operating system

2. **A Code Editor** (optional, but recommended)
   - Visual Studio Code: https://code.visualstudio.com/
   - Or any text editor of your choice

### Step 1: Download the Project

1. Download the project files to your computer
2. Extract the files to a folder (e.g., `SecretStash`)
3. Open your terminal/command prompt
4. Navigate to the project folder:
   ```
   cd path/to/SecretStash
   ```

### Step 2: Install Dependencies

In your terminal, run the following command to install all required packages:

```bash
npm install
```

This will download and install all the necessary components for the application to work.

### Step 3: Start the Application

Once installation is complete, start the development server:

```bash
npm run dev
```

You should see output similar to:
```
✓ Ready in 2.3s
○ Local:        http://localhost:3000
○ Network:      http://192.168.1.100:3000
```

### Step 4: Open in Your Browser

1. Open your web browser
2. Go to: `http://localhost:3000`
3. You should see the SecretStash landing page!

---

## 📖 How to Use SecretStash

### First Time Setup

1. **Landing Page**: When you first open the app, you'll see a beautiful landing page with information about SecretStash
2. **Get Started**: Click the "Start Securing Now" or "Get Started" button to go to the dashboard
3. **Demo Data**: The app comes with sample secrets to show you how it works

### Managing Your Secrets

#### Adding a New Secret

1. Click the **"Add Secret"** button (blue button with a plus icon)
2. Fill out the form:
   - **Secret Name**: Give your secret a descriptive name (e.g., "Stripe API Key")
   - **Category**: Choose from API Keys, Passwords, Domains, Databases, Certificates, or Tokens
   - **Secret Value**: Enter the actual secret (password, API key, etc.)
   - **Description**: Optional description for context
   - **Tags**: Optional tags for organization (separate with commas)
3. Click **"Add Secret"** to save

#### Viewing and Managing Secrets

- **View Secret**: Click the eye icon to show/hide the secret value
- **Copy Secret**: Click the copy icon to copy the value to your clipboard
- **Edit Secret**: Click the edit icon (pencil) to modify the secret
- **Delete Secret**: Click the trash icon to remove the secret

#### Searching and Filtering

- **Search Bar**: Type in the search box to find secrets by name, description, or tags
- **Category Filter**: Use the dropdown to show only secrets from specific categories
- **Real-time Results**: Results update as you type

#### Exporting Your Data

1. Click the **"Export PDF"** button
2. A PDF file will be automatically downloaded with all your visible secrets
3. The PDF includes secret names, categories, descriptions, and truncated values for security

### Theme Switching

- Click the **sun/moon icon** in the top navigation to switch between dark and light modes
- The app starts in dark mode by default
- Light mode provides high contrast for better accessibility

---

## 🔒 Privacy & Security

### Your Data is Safe

- **Local Storage Only**: All your secrets are stored in your browser's local storage
- **No Server Communication**: Your data never leaves your device
- **No Account Required**: No sign-up, no login, no data collection
- **Browser-Based Security**: Data is tied to your specific browser and device

### Important Security Notes

1. **Demo Data**: The app includes sample secrets for demonstration - replace these with your real data
2. **Browser Clearing**: If you clear your browser data, your secrets will be lost
3. **Backup Recommended**: Export your secrets to PDF regularly as backup
4. **Device Security**: Keep your device secure as anyone with access can view your secrets

---

## 🛠️ Technical Information

### Technology Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React icon library
- **UI Components**: Radix UI primitives with custom styling
- **PDF Export**: jsPDF library
- **Storage**: Browser localStorage API

### Project Structure

```
SecretStash/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Main dashboard page
│   ├── login/            # Login page (demo)
│   ├── terms/            # Terms and conditions
│   └── page.tsx          # Landing page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── hero-section.tsx  # Landing page hero
│   ├── navbar.tsx        # Navigation bar
│   └── secret-card.tsx   # Secret display card
├── lib/                  # Utility functions
│   ├── storage.ts        # Local storage management
│   ├── sample-data.ts    # Demo data
│   └── pdf-export.ts     # PDF generation
└── types/                # TypeScript type definitions
```

### Browser Compatibility

SecretStash works in all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 🔧 Customization

### Adding New Categories

To add new secret categories:

1. Open `types/secret.ts`
2. Add your category to the `Secret` interface
3. Update the category options in `components/add-secret-modal.tsx` and `components/search-bar.tsx`

### Changing Colors

The app uses CSS custom properties for theming. You can modify colors in `app/globals.css`:

- Dark theme colors are in the `:root` section
- Light theme colors are in the `.dark` section

### Modifying Sample Data

Edit `lib/sample-data.ts` to change the demo secrets that appear when first using the app.

---

## 🆘 Troubleshooting

### Common Issues

**Problem**: "npm install" fails
- **Solution**: Make sure you have Node.js 18+ installed and try running `npm cache clean --force` then `npm install` again

**Problem**: App won't start
- **Solution**: Check that port 3000 isn't being used by another application, or try `npm run dev -- --port 3001`

**Problem**: Secrets disappeared
- **Solution**: Check if browser data was cleared. Secrets are stored in localStorage and will be lost if browser data is cleared

**Problem**: Export PDF not working
- **Solution**: Make sure your browser allows downloads and check if popup blockers are interfering

**Problem**: Theme toggle not working
- **Solution**: Try refreshing the page. The theme state is stored in localStorage

### Getting Help

If you encounter issues:

1. Check the browser console for error messages (F12 → Console tab)
2. Try refreshing the page
3. Clear browser cache and reload
4. Restart the development server (`Ctrl+C` then `npm run dev`)

---

## 📄 Legal Information

### Terms & Conditions

SecretStash is operated by **JULDD LLC**. By using this application, you agree to our terms and conditions. View the full terms at `/terms` when running the application.

### Privacy Policy

- We do not collect any personal data
- All secrets are stored locally in your browser
- No data is transmitted to external servers
- You have full control over your data

### Demo Data Disclaimer

The application includes sample secrets for demonstration purposes only. These are dummy examples and should not be used for real sensitive information. Please replace all demo data with your actual secrets.

---

## 🎯 Tips for Best Use

1. **Regular Backups**: Export your secrets to PDF regularly
2. **Organize with Tags**: Use tags to group related secrets
3. **Descriptive Names**: Use clear, descriptive names for easy searching
4. **Category Consistency**: Keep similar secrets in the same category
5. **Security First**: Don't store secrets on shared computers
6. **Update Regularly**: Keep your secrets current and remove old ones

---

## 🚀 Building for Production

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `.next` folder that can be deployed to any web server.

---

**Made with ❤️ for developers by JULDD LLC**

*SecretStash - Keep your secrets safe, organized, and accessible.*
## Known Issues – Hackathon Version (Work In Progress)
- Custom cursor is missing or not rendering (CSS/JS issue).
- Font not appearing as Manrope—default browser font showing.
- Navbar links/pages not clickable due to missing cursor.
- Some animations and transitions still in progress.
- Site is a live MVP-in-progress; more polish landing soon!

Still, all code and core UI are here for demo/judging. Final fixes coming ASAP!
