# Git Setup and Push Guide

This guide will help you push your GymBro AI project to a Git repository.

## Files Created

I've created the following files for your Git repository:

1. **`.gitignore`** - Excludes sensitive files (API keys, database, virtual environments, etc.)
2. **`README.md`** - Comprehensive project documentation
3. **`LICENSE`** - MIT License for open-source distribution
4. **`.env.example`** - Template showing required environment variables

## Important: Secure Your API Keys

⚠️ **Your `env.txt` file contains an API key and will NOT be committed** (it's excluded in `.gitignore`).

## Step-by-Step: Push to GitHub

### 1. Create a GitHub Repository (if you haven't already)
- Go to https://github.com/new
- Create a new repository (e.g., `gymbro-ai`)
- **Do NOT** initialize with README, .gitignore, or license (we already have these)

### 2. Add All Files to Git
```bash
cd /Users/ejaz/Desktop/new_pj
git add .
```

### 3. Commit Your Changes
```bash
git commit -m "Initial commit: GymBro AI - AI-powered gym routine generator"
```

### 4. Connect to Your Remote Repository
Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

Or if using SSH:
```bash
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
```

### 5. Push to GitHub
```bash
git branch -M main
git push -u origin main
```

## Alternative: Push to GitLab/Bitbucket

### GitLab
```bash
git remote add origin https://gitlab.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Bitbucket
```bash
git remote add origin https://bitbucket.org/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## Verify Everything is Working

After pushing, you can verify with:
```bash
git remote -v
git log
```

## Future Updates

When you make changes to your project:
```bash
git add .
git commit -m "Description of your changes"
git push
```

## What's Being Ignored

The following files/folders will NOT be pushed to Git (as configured in `.gitignore`):
- `env.txt` - Your API keys (IMPORTANT!)
- `gym_buddy.db` - Your local database
- `myenv/` - Virtual environment
- `__pycache__/` - Python cache files

## Security Checklist

Before pushing, ensure:
- ✅ No API keys are hardcoded in source files
- ✅ `env.txt` is in `.gitignore`
- ✅ Database files are excluded
- ✅ Virtual environment is excluded

## Need Help?

If you encounter any issues:
1. Check that Git is installed: `git --version`
2. Ensure you're logged into GitHub: `git config user.name` and `git config user.email`
3. If needed, configure Git:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

---

Happy coding! 💪
