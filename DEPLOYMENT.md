# Deployment Guide for Entropy AI Lab Website

## 🚀 Deploy to Vercel with Custom Domain (www.entropyailab.com)

Your website is ready for deployment! Follow these steps:

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `entropy-ailab-website` (or your preferred name)
3. Set to **Public** or **Private** (your choice)
4. Do NOT initialize with README (we already have one)
5. Click "Create repository"

### Step 2: Push Code to GitHub

Run these commands in your terminal:

```bash
cd /home/fiftycentsjj/projects/entropy_website

# Add your GitHub repository as remote (replace with your GitHub username)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/entropy-ailab-website.git

# Push code to GitHub
git push -u origin main
```

**Alternative using SSH:**
```bash
git remote add origin git@github.com:YOUR_GITHUB_USERNAME/entropy-ailab-website.git
git push -u origin main
```

### Step 3: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com
2. Sign in with your GitHub account
3. Click "Add New" → "Project"
4. Import your GitHub repository: `entropy-ailab-website`
5. Vercel will auto-detect it as a static site
6. Click "Deploy"
7. Wait for deployment to complete (usually 1-2 minutes)

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd /home/fiftycentsjj/projects/entropy_website
vercel

# For production deployment
vercel --prod
```

### Step 4: Configure Custom Domain (www.entropyailab.com)

#### In Vercel Dashboard:

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add domain: `www.entropyailab.com`
4. Also add: `entropyailab.com` (will redirect to www)
5. Vercel will provide DNS records

#### Configure Your Domain DNS:

You need to update your domain's DNS settings at your domain registrar (e.g., GoDaddy, Namecheap, Google Domains).

**For www.entropyailab.com:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

**For entropyailab.com (apex/root domain):**
- Type: `A`
- Name: `@` or leave blank
- Value: `76.76.19.19` (Vercel's IP)

**Or use CNAME at root (if registrar supports it):**
- Type: `CNAME`
- Name: `@`
- Value: `cname.vercel-dns.com`

#### SSL Certificate:

Vercel automatically provisions SSL certificates via Let's Encrypt. It may take a few minutes to activate after DNS propagation.

### Step 5: Verify Deployment

1. Check your Vercel deployment URL (e.g., `entropy-ailab-website.vercel.app`)
2. Once DNS propagates (5 minutes to 48 hours), visit:
   - https://www.entropyailab.com
   - https://entropyailab.com

### DNS Propagation Check

Check DNS propagation status:
- https://www.whatsmydns.net/#CNAME/www.entropyailab.com
- https://dnschecker.org

## 🔄 Future Updates

To update your website:

```bash
cd /home/fiftycentsjj/projects/entropy_website

# Make your changes, then:
git add .
git commit -m "Description of changes"
git push origin main
```

Vercel will automatically redeploy on every push to the main branch!

## 📋 Project Structure

```
entropy_website/
├── index.html                  # Main HTML file
├── styles.css                  # Base styles
├── dark-theme-additions.css    # Dark theme styles
├── script.js                   # JavaScript interactions
├── vercel.json                 # Vercel configuration
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

## ✅ Checklist

- [x] Git repository initialized
- [x] Files committed to git
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Website deployed to Vercel
- [ ] Custom domain configured
- [ ] DNS records updated
- [ ] SSL certificate active
- [ ] www.entropyailab.com live!

## 🆘 Troubleshooting

**If deployment fails:**
- Check vercel.json syntax
- Ensure all files are committed
- Check Vercel build logs

**If domain doesn't work:**
- Wait for DNS propagation (can take up to 48 hours)
- Verify DNS records are correct
- Check domain registrar settings
- Clear browser cache

**Contact:**
- Email: contact@entropyailab.com
- Vercel Support: https://vercel.com/support

---

**Your website is ready for the world! 🚀**
