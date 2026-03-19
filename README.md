# Rishca OS — Budget Dashboard

Password-protected team budget management dashboard.

## Deploy to GitHub Pages

Run these commands from your terminal:

```bash
cd ~/Documents/Claude/Rishca/rishca-budget-app

git init
git branch -m main
git add .
git commit -m "Rishca OS Budget Dashboard"

# Create the repo (private) under your org
gh repo create Risca-dev/rishca-budget --private --source=. --push

# Enable GitHub Pages
gh api repos/Risca-dev/rishca-budget/pages -X POST -f "build_type=legacy" -f "source[branch]=main" -f "source[path]=/"
```

Your dashboard will be live at: `https://risca-dev.github.io/rishca-budget/`

## Password

Default: `rishca2026`
