# Vercel Environment Variables Setup Guide

## Quick Setup for Outlook.com Email Confirmation

Follow these steps to enable email confirmation from your Outlook.com/Hotmail account:

---

## Step 1: Get App Password (Required for 2FA accounts)

If your Outlook.com account has Two-Factor Authentication enabled (recommended):

1. Go to: https://account.microsoft.com/security
2. Click **Advanced security options**
3. Under **App passwords**, click **Create a new app password**
4. Copy the generated password (16 characters, format: xxxx-xxxx-xxxx-xxxx)
5. Save this password - you'll need it in Step 2

**Note:** If you don't have 2FA, you can use your regular email password, but App Passwords are more secure.

---

## Step 2: Add Environment Variables to Vercel

1. Go to your Vercel Dashboard: https://vercel.com/dashboard

2. Select your project: **Entropy-AI-Lab-website**

3. Click **Settings** (top menu)

4. Click **Environment Variables** (left sidebar)

5. Add these 4 variables (click "Add" for each):

### Variable 1: SMTP_HOST
```
Name: SMTP_HOST
Value: smtp-mail.outlook.com
Environments: ✅ Production ✅ Preview ✅ Development
```

### Variable 2: SMTP_PORT
```
Name: SMTP_PORT
Value: 587
Environments: ✅ Production ✅ Preview ✅ Development
```

### Variable 3: SMTP_USER
```
Name: SMTP_USER
Value: YOUR_EMAIL@outlook.com
(Replace with your actual Outlook.com or Hotmail email)
Environments: ✅ Production ✅ Preview ✅ Development
```

### Variable 4: SMTP_PASSWORD
```
Name: SMTP_PASSWORD
Value: your-app-password-from-step-1
(Paste the 16-character app password without dashes)
Environments: ✅ Production ✅ Preview ✅ Development
```

6. Click **Save** after adding each variable

---

## Step 3: Redeploy Your Project

After adding all environment variables:

1. Go to **Deployments** tab in Vercel
2. Click the **︙** (three dots) next to the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete (~30 seconds)

**OR** simply push a new commit to GitHub (Vercel will auto-deploy)

---

## Step 4: Test the Newsletter Form

1. Visit your live website: https://entropy-ai-lab-website.vercel.app
2. Scroll to the Newsletter section
3. Enter a test email address
4. Click **Subscribe**
5. Check the email inbox for the confirmation

---

## Expected Email Details

**From:** "Entropy AI Lab" <your-email@outlook.com>
**Subject:** ✓ Welcome to Entropy AI Lab Newsletter!
**Content:** Beautiful HTML email with gradient design and welcome message

---

## Troubleshooting

### "Authentication failed" error
- ✅ Make sure you're using an **App Password**, not your regular password
- ✅ Check that the App Password has no spaces or dashes
- ✅ Verify 2FA is enabled on your Microsoft account

### Emails not being received
- ✅ Check spam/junk folder
- ✅ Verify SMTP_USER matches the email you're sending from
- ✅ Wait a few minutes (first emails may be delayed)
- ✅ Check Vercel logs: Settings > Logs

### "SMTP not configured" message
- ✅ Verify all 4 environment variables are added
- ✅ Make sure you redeployed after adding variables
- ✅ Check variable names are exactly: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD

### Still not working?
- Check Vercel Function Logs for detailed error messages
- Ensure your Outlook.com account is not locked or restricted
- Try using Resend API instead (see Alternative Options below)

---

## Alternative Options (Easier Setup)

### Option 1: Resend API (Recommended)
**Pros:** Professional, reliable, 3,000 free emails/month
**Setup:**
1. Sign up: https://resend.com
2. Get API key from dashboard
3. Add to Vercel: `RESEND_API_KEY=re_xxxxx`
4. Redeploy

### Option 2: Web3Forms (Simplest)
**Pros:** Completely free, no credit card needed
**Setup:**
1. Sign up: https://web3forms.com
2. Get access key
3. Add to Vercel: `WEB3FORMS_ACCESS_KEY=xxxxx`
4. Redeploy

---

## Current Configuration

Based on Outlook.com official settings:

| Setting | Value |
|---------|-------|
| SMTP Server | smtp-mail.outlook.com |
| SMTP Port | 587 |
| Encryption | STARTTLS |
| Auth Method | OAuth2/Modern Auth (via App Password) |
| IMAP Server | outlook.office365.com (port 993, SSL/TLS) |
| POP Server | outlook.office365.com (port 995, SSL/TLS) |

---

## Security Best Practices

✅ **Always use App Passwords** instead of your main password
✅ **Enable 2FA** on your Microsoft account
✅ **Never commit** .env files with real credentials to git
✅ **Rotate passwords** regularly
✅ **Monitor Vercel logs** for suspicious activity

---

## Sending Limits

**Outlook.com/Hotmail:**
- Personal accounts: ~300 emails per day
- Perfect for newsletter confirmations

If you need more volume, consider:
- **Microsoft 365** (business): Higher limits
- **Resend API**: 3,000/month free, then paid tiers
- **SendGrid**: 100/day free forever

---

## Support

If you continue to have issues:
- Email: contact@entropyailab.com
- Check Vercel documentation: https://vercel.com/docs/environment-variables
- Review Microsoft SMTP docs: https://support.microsoft.com/outlook

---

**Ready to go!** Once you add the environment variables and redeploy, your newsletter confirmation emails will be sent automatically from your Outlook.com account. 📧✨
