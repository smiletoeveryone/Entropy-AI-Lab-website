// Simple Newsletter Subscription Handler
// Saves to a simple log and can be extended later

module.exports = async (req, res) => {
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

        // Log subscription (in production, this should save to a database)
        const timestamp = new Date().toISOString();
        console.log(`[NEWSLETTER SUBSCRIPTION] Email: ${email} | Time: ${timestamp}`);

        // Here you can add integrations with:
        // - Database (Vercel Postgres, MongoDB, etc.)
        // - Email marketing platform (Mailchimp, ConvertKit, etc.)
        // - Or trigger a separate email service

        // Check if SMTP is configured
        const smtpConfigured = process.env.SMTP_HOST && 
                              process.env.SMTP_USER && 
                              process.env.SMTP_PASSWORD;

        if (smtpConfigured) {
            // Try to send email using nodemailer
            try {
                const nodemailer = require('nodemailer');
                
                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST,
                    port: parseInt(process.env.SMTP_PORT || '587'),
                    secure: false,
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASSWORD,
                    },
                    tls: {
                        ciphers: 'SSLv3'
                    }
                });

                const mailOptions = {
                    from: `"Entropy AI Lab" <${process.env.SMTP_USER}>`,
                    to: email,
                    subject: '✓ Welcome to Entropy AI Lab Newsletter!',
                    html: generateEmailHTML(email),
                    text: generateEmailText()
                };

                await transporter.sendMail(mailOptions);
                console.log(`[EMAIL SENT] Confirmation sent to: ${email}`);
            } catch (emailError) {
                console.error('[EMAIL ERROR]', emailError.message);
                // Don't fail the subscription if email fails
            }
        } else {
            console.log('[SMTP NOT CONFIGURED] Email notification skipped');
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
};

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
                <div style="display: flex; align-items: center; margin: 15px 0;">
                    <span style="font-size: 24px; margin-right: 15px;">📧</span>
                    <span style="font-size: 15px; color: #555;"><strong>Weekly AI Updates:</strong> Stay informed with the latest AI trends and technologies</span>
                </div>
                <div style="display: flex; align-items: center; margin: 15px 0;">
                    <span style="font-size: 24px; margin-right: 15px;">💡</span>
                    <span style="font-size: 15px; color: #555;"><strong>Exclusive Insights:</strong> Access expert analysis and thought leadership</span>
                </div>
                <div style="display: flex; align-items: center; margin: 15px 0;">
                    <span style="font-size: 24px; margin-right: 15px;">📊</span>
                    <span style="font-size: 15px; color: #555;"><strong>Industry Trends:</strong> Discover emerging patterns in AI and data science</span>
                </div>
            </div>
            
            <p style="font-size: 16px; color: #555; margin: 15px 0;">We'll be sending you curated content about AI and Machine Learning breakthroughs, data-driven solution strategies, industry case studies, and exclusive webinars.</p>
            
            <div style="text-align: center;">
                <a href="https://entropyailab.com" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0;">Visit Our Website</a>
            </div>
            
            <p style="margin-top: 30px; font-size: 16px; color: #555;">If you have any questions, reach out to us at <a href="mailto:contact@entropyailab.com" style="color: #667eea;">contact@entropyailab.com</a>.</p>
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
    `;
}
