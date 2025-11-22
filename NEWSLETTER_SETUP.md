# Newsletter Email Configuration Guide

This guide will help you set up email confirmation for newsletter subscriptions from contact@entropyailab.com.

## Overview

The newsletter system now includes:
- Backend API endpoint (`/api/subscribe.js`)
- Automatic confirmation email sending
- Professional HTML email template
- Error handling and validation

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

This installs `nodemailer` for email sending functionality.

### 2. Configure Email Service

You have several options for sending emails:

#### Option A: Hotmail/Outlook.com (Recommended for Personal Email)

1. **Use your Hotmail/Outlook.com account:**
   - Email: your-email@hotmail.com or @outlook.com
   - Password: Your regular email password

2. **If you have 2-Factor Authentication enabled:**
   - Go to https://account.microsoft.com/security
   - Select "Advanced security options"
   - Under "App passwords", create a new app password
   - Use this app password instead of your regular password

3. **Use these settings:**
   ```
   SMTP_HOST=smtp-mail.outlook.com
   SMTP_PORT=587
   SMTP_USER=your-email@hotmail.com (or @outlook.com)
   SMTP_PASSWORD=your-password-or-app-password
   ```

4. **Important Notes:**
   - Hotmail has sending limits (approximately 300 emails/day for free accounts)
   - Make sure "Less secure apps" is not blocking access
   - If emails fail, check your Microsoft account security settings

#### Option B: Office 365 / Microsoft 365 (For Custom Domains)

If contact@entropyailab.com is hosted on Microsoft 365:

1. **Use these settings:**
   ```
   SMTP_HOST=smtp.office365.com
   SMTP_PORT=587
   SMTP_USER=contact@entropyailab.com
   SMTP_PASSWORD=your-email-password
   ```

2. **With 2FA enabled:**
   - Create an App Password at https://account.microsoft.com/security
   - Use the App Password instead of your regular password

#### Option C: Gmail (Alternative Option)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the generated 16-character password
3. **Use these settings:**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-gmail@gmail.com
   SMTP_PASSWORD=your-16-char-app-password
   ```

#### Option B: Custom Domain Email (contact@entropyailab.com)

If you have email hosting for entropyailab.com:

1. **Get SMTP credentials from your email provider:**
   - Check your hosting provider's documentation (e.g., GoDaddy, Namecheap, Google Workspace)
   - Note the SMTP host, port, username, and password

2. **Common providers:**
   - **Google Workspace:** `smtp.gmail.com` port 587
   - **Microsoft 365:** `smtp.office365.com` port 587
   - **GoDaddy:** `smtpout.secureserver.net` port 587
   - **Namecheap:** `mail.privateemail.com` port 587

3. **Use these settings:**
   ```
   SMTP_HOST=your-smtp-server.com
   SMTP_PORT=587
   SMTP_USER=contact@entropyailab.com
   SMTP_PASSWORD=your-email-password
   ```

#### Option C: Third-Party Email Services (Recommended for Production)

For better deliverability and analytics:

**SendGrid:**
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

**Mailgun:**
```
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASSWORD=your-mailgun-password
```

**Amazon SES:**
```
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-ses-smtp-username
SMTP_PASSWORD=your-ses-smtp-password
```

### 3. Configure Vercel Environment Variables

1. **Go to Vercel Dashboard:**
   - Visit https://vercel.com/dashboard
   - Select your project (Entropy-AI-Lab-website)

2. **Add Environment Variables:**
   - Navigate to **Settings** → **Environment Variables**
   - Add each variable:
     - `SMTP_HOST` = your SMTP server
     - `SMTP_PORT` = 587 (or your port)
     - `SMTP_USER` = your email address
     - `SMTP_PASSWORD` = your password/app password
   
3. **Apply to all environments:**
   - ✅ Production
   - ✅ Preview
   - ✅ Development

4. **Redeploy:**
   - After adding variables, redeploy your project
   - Or the next git push will trigger a new deployment

### 4. Test Locally (Optional)

Create a `.env` file in your project root (already in .gitignore):

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

Run locally:
```bash
vercel dev
```

Visit http://localhost:3000 and test the newsletter form.

### 5. Test on Production

After deployment:
1. Visit your live website
2. Enter an email address in the newsletter form
3. Click "Subscribe"
4. Check the email inbox for confirmation

## Email Template

The confirmation email includes:

- **Professional HTML design** with gradient header
- **Feature highlights:**
  - 📧 Weekly AI Updates
  - 💡 Exclusive Insights
  - 📊 Industry Trends
- **Call-to-action** button to visit website
- **Plain text fallback** for email clients that don't support HTML
- **Professional footer** with unsubscribe links

## Troubleshooting

### "Authentication failed" error

- **Gmail:** Make sure you're using an App Password, not your regular password
- **Custom domain:** Verify SMTP credentials with your email provider
- **Port blocked:** Some networks block port 587, try port 465 with `secure: true`

### Emails not being received

- **Check spam folder** - first few emails might go to spam
- **Verify email address** in the "from" field matches your SMTP_USER
- **Domain authentication:** Add SPF and DKIM records for better deliverability
- **Use a dedicated email service** like SendGrid for production

### "Connection timeout" error

- **Firewall:** Ensure SMTP ports (587/465) aren't blocked
- **Wrong host:** Double-check SMTP_HOST is correct
- **SSL/TLS settings:** Try toggling `secure: true/false` in the code

### Emails go to spam

To improve deliverability:
1. **Add SPF record** to your domain's DNS
2. **Configure DKIM** authentication
3. **Use a dedicated email service** (SendGrid, Mailgun, SES)
4. **Warm up your domain** by sending gradually increasing volumes

## Security Best Practices

1. ✅ **Never commit** `.env` file with real credentials
2. ✅ **Use app-specific passwords** for Gmail/Google Workspace
3. ✅ **Rotate passwords regularly**
4. ✅ **Monitor Vercel logs** for suspicious activity
5. ✅ **Rate limit** the API endpoint (consider adding rate limiting middleware)
6. ✅ **Validate emails** server-side (already implemented)

## Next Steps

### Add Database Storage (Optional)

Store subscriber emails in a database:
- **Vercel Postgres**
- **MongoDB Atlas**
- **Supabase**
- **Airtable**

### Add Double Opt-In (Recommended)

For GDPR compliance:
1. Send confirmation email with verification link
2. Only add to mailing list after link is clicked

### Connect to Email Marketing Platform

Integrate with:
- **Mailchimp**
- **ConvertKit**
- **Sendinblue**
- **ActiveCampaign**

## Support

For issues or questions:
- Email: contact@entropyailab.com
- Check Vercel logs for error messages
- Review the API response in browser DevTools

## File Structure

```
/api/subscribe.js          # Serverless function endpoint
/script.js                 # Frontend form handling
/package.json              # Dependencies
/.env.example              # Environment variables template
/.gitignore               # Excludes .env from git
/NEWSLETTER_SETUP.md      # This guide
```

## Production Checklist

Before going live:
- [ ] Environment variables configured in Vercel
- [ ] Test email sent successfully
- [ ] Email appears correctly in inbox (not spam)
- [ ] Form validation working
- [ ] Success/error messages displaying
- [ ] Mobile-responsive design tested
- [ ] GDPR compliance considered (privacy policy, consent)
- [ ] Analytics tracking implemented (optional)

---

**Ready to Deploy!** Push your changes to GitHub, and Vercel will automatically deploy with the new email functionality.
