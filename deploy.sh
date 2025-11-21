#!/bin/bash

# Entropy AI Lab - Quick Deployment Script
# This script helps you deploy to GitHub and Vercel

echo "🚀 Entropy AI Lab Website Deployment"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}✓ Git repository initialized${NC}"
echo -e "${GREEN}✓ All files committed${NC}"
echo ""

echo -e "${YELLOW}📋 Next Steps:${NC}"
echo ""
echo "1️⃣  CREATE GITHUB REPOSITORY"
echo "   • Go to: https://github.com/new"
echo "   • Repository name: entropy-ailab-website"
echo "   • Visibility: Public or Private"
echo "   • Do NOT initialize with README"
echo "   • Click 'Create repository'"
echo ""

echo "2️⃣  CONNECT TO GITHUB"
read -p "   Enter your GitHub username: " github_username
echo ""

if [ -z "$github_username" ]; then
    echo -e "${RED}❌ GitHub username is required${NC}"
    exit 1
fi

# Add remote
echo "   Adding GitHub remote..."
git remote add origin "https://github.com/$github_username/entropy-ailab-website.git" 2>/dev/null || \
git remote set-url origin "https://github.com/$github_username/entropy-ailab-website.git"

echo ""
echo "3️⃣  PUSH TO GITHUB"
echo "   Running: git push -u origin main"
echo "   You may need to authenticate..."
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✓ Successfully pushed to GitHub!${NC}"
    echo ""
    echo "4️⃣  DEPLOY TO VERCEL"
    echo "   • Go to: https://vercel.com"
    echo "   • Sign in with GitHub"
    echo "   • Click 'Add New' → 'Project'"
    echo "   • Import: $github_username/entropy-ailab-website"
    echo "   • Click 'Deploy'"
    echo ""
    echo "5️⃣  ADD CUSTOM DOMAIN"
    echo "   • In Vercel: Settings → Domains"
    echo "   • Add: www.entropyailab.com"
    echo "   • Add: entropyailab.com"
    echo "   • Update DNS records at your domain registrar"
    echo ""
    echo "   DNS Records:"
    echo "   • CNAME: www → cname.vercel-dns.com"
    echo "   • A: @ → 76.76.19.19"
    echo ""
    echo -e "${GREEN}🎉 Your website is ready for deployment!${NC}"
    echo ""
    echo "GitHub Repository: https://github.com/$github_username/entropy-ailab-website"
    echo "Next: Deploy on Vercel → https://vercel.com"
    echo ""
else
    echo ""
    echo -e "${RED}❌ Push failed. Please check:${NC}"
    echo "   • Your GitHub authentication"
    echo "   • The repository exists"
    echo "   • You have write access"
    echo ""
    echo "Manual push command:"
    echo "   git push -u origin main"
    echo ""
fi
