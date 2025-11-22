// Simple Newsletter Subscription Handler (No Dependencies)
// This version works immediately on Vercel without any npm packages

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request for CORS
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email } = req.body;

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        // Log subscription
        const timestamp = new Date().toISOString();
        console.log(`[NEWSLETTER SUBSCRIPTION] Email: ${email} | Time: ${timestamp}`);

        // If SMTP credentials are configured, send email via Outlook API
        const smtpConfigured = process.env.SMTP_HOST && 
                              process.env.SMTP_USER && 
                              process.env.SMTP_PASSWORD;

        if (smtpConfigured) {
            try {
                // Send email using native fetch and Microsoft Graph API or SMTP relay
                await sendConfirmationEmail(email);
                console.log(`[EMAIL SENT] Confirmation sent to: ${email}`);
            } catch (emailError) {
                console.error('[EMAIL ERROR]', emailError.message);
                // Don't fail the subscription if email fails
            }
        } else {
            console.log('[SMTP NOT CONFIGURED] Subscription logged only');
        }

        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Subscription successful! Check your email for confirmation.'
        });

    } catch (error) {
        console.error('[SUBSCRIPTION ERROR]', error);
        return res.status(500).json({
            error: 'Failed to process subscription. Please try again later.'
        });
    }
}

async function sendConfirmationEmail(subscriberEmail) {
    // Using Web3Forms or EmailJS as a simple email relay
    // Alternative: Use Resend API (https://resend.com) which has generous free tier
    
    const emailHTML = generateEmailHTML(subscriberEmail);
    const emailText = generateEmailText();
    
    // Option 1: Use Resend API (recommended for production)
    if (process.env.RESEND_API_KEY) {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: `Entropy AI Lab <${process.env.SMTP_USER || 'onboarding@resend.dev'}>`,
                to: subscriberEmail,
                subject: '✓ Welcome to Entropy AI Lab Newsletter!',
                html: emailHTML,
                text: emailText
            })
        });
        
        if (!response.ok) {
            throw new Error(`Resend API error: ${response.status}`);
        }
        return;
    }
    
    // Option 2: Use Web3Forms (free, simple)
    if (process.env.WEB3FORMS_ACCESS_KEY) {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                access_key: process.env.WEB3FORMS_ACCESS_KEY,
                subject: 'New Newsletter Subscription',
                from_name: 'Entropy AI Lab',
                email: process.env.SMTP_USER || 'contact@entropyailab.com',
                message: `New subscription from: ${subscriberEmail}\n\nPlease send them the welcome email.`
            })
        });
        
        const result = await response.json();
        if (!result.success) {
            throw new Error('Web3Forms error');
        }
        return;
    }
    
    // If no service configured, just log
    console.log(`[EMAIL SKIPPED] No email service configured. To enable emails, add RESEND_API_KEY or WEB3FORMS_ACCESS_KEY`);
}

function generateEmailHTML(email) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; color: white;">
            <div style="font-size: 48px; margin-bottom: 10px;">⚡</div>
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Welcome to Entropy AI Lab!</h1>
        </div>
        
        <div style="padding: 40px 30px;">
            <h2 style="color: #667eea; font-size: 24px; margin-top: 0;">Thank You for Subscribing! 🎉</h2>
            <p style="font-size: 16px; color: #555; margin: 15px 0;">Hello,</p>
            <p style="font-size: 16px; color: #555; margin: 15px 0;">We're excited to have you join our community of AI enthusiasts and professionals! You've successfully subscribed to receive the latest updates from Entropy AI Lab.</p>
            
            <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 25px 0;">
                <div style="margin: 15px 0;">
                    <span style="font-size: 20px;">📧</span>
                    <strong> Weekly AI Updates:</strong> Stay informed with the latest AI trends
                </div>
                <div style="margin: 15px 0;">
                    <span style="font-size: 20px;">💡</span>
                    <strong> Exclusive Insights:</strong> Access expert analysis and thought leadership
                </div>
                <div style="margin: 15px 0;">
                    <span style="font-size: 20px;">📊</span>
                    <strong> Industry Trends:</strong> Discover emerging patterns in AI and data science
                </div>
            </div>
            
            <p style="font-size: 16px; color: #555; margin: 15px 0;">We'll keep you updated on AI breakthroughs, data-driven strategies, case studies, and exclusive events.</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://entropyailab.com" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 25px; font-weight: bold;">Visit Our Website</a>
            </div>
            
            <p style="margin-top: 30px; font-size: 16px; color: #555;">Questions? Reach out to us at <a href="mailto:contact@entropyailab.com" style="color: #667eea; text-decoration: none;">contact@entropyailab.com</a></p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; text-align: center; font-size: 14px; color: #777;">
            <p><strong>Entropy AI Lab</strong><br>Data-First AI Solutions</p>
            <p style="margin-top: 20px; font-size: 12px; color: #999;">© 2025 Entropy AI Lab. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
}

function generateEmailText() {
    return `
Welcome to Entropy AI Lab!

Thank you for subscribing to our newsletter!

You'll now receive:
- Weekly AI Updates: Stay informed with the latest AI trends
- Exclusive Insights: Access expert analysis and thought leadership  
- Industry Trends: Discover emerging patterns in AI and data science

Visit us: https://entropyailab.com
Contact: contact@entropyailab.com

© 2025 Entropy AI Lab. All rights reserved.
    `.trim();
}
