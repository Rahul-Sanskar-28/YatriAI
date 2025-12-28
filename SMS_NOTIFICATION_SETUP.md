# SMS Notification Setup for Axicov SOS Agent

## Overview
The Axicov SOS Agent now includes automated SMS notifications that will send alerts to your phone number whenever the SOS button is triggered.

## Setup Instructions

### 1. Create Twilio Account
1. Go to [Twilio.com](https://www.twilio.com) and create a free account
2. Verify your phone number during signup
3. Get $15 in free credits for testing

### 2. Get Twilio Credentials
After creating your account:
1. Go to the Twilio Console Dashboard
2. Find your **Account SID** and **Auth Token**
3. Get a Twilio phone number:
   - Go to Phone Numbers → Manage → Buy a number
   - Choose a number from your country
   - Note down the phone number (format: +1234567890)

### 3. Configure Environment Variables
Update your `YatriAI/backend/.env` file with your Twilio credentials:

```env
# Twilio SMS Configuration (for SOS notifications)
TWILIO_ACCOUNT_SID="your_actual_account_sid_here"
TWILIO_AUTH_TOKEN="your_actual_auth_token_here"
TWILIO_PHONE_NUMBER="+1234567890"  # Your Twilio number

# Emergency Contact (Your personal phone number for SOS alerts)
EMERGENCY_CONTACT_NUMBER="+1234567890"  # Your personal number
```

**Important:** Replace the placeholder values with your actual Twilio credentials and phone numbers.

### 4. Phone Number Format
- Use international format: `+[country_code][phone_number]`
- Examples:
  - US: `+15551234567`
  - India: `+919876543210`
  - UK: `+447123456789`

### 5. Test the Setup
1. Start the backend server: `npm run dev` in the `YatriAI/backend` directory
2. Open the SOS Agent in the dashboard
3. Click the "Test SMS Notification" button at the bottom
4. You should receive a test SMS on your phone

## Features

### Automatic SOS Alerts
When someone triggers an SOS alert, you'll receive an SMS with:
- 🚨 Emergency type (Medical, Security, Transport, Weather)
- 👤 User name who triggered the alert
- 📍 Exact location with Google Maps link
- 💬 Emergency message description
- ⏰ Timestamp
- 🆔 Alert ID for tracking

### Status Updates
You'll also receive SMS updates when:
- Alert status changes (acknowledged, resolved)
- Emergency responders are dispatched
- Alert is resolved

### Sample SMS Format
```
🚨🚨 EMERGENCY ALERT 🚨🚨

🏥 Type: MEDICAL
👤 User: John Doe
📍 Location: Victoria Memorial, Kolkata
🗺️ Maps: https://maps.google.com/?q=22.5448,88.3426

💬 Message: "Having chest pain, need immediate help"

⏰ Time: 12/28/2025, 4:30:15 PM
🆔 Alert ID: sos_1735123456789_abc123

This is an automated emergency notification from Axicov SOS Agent.
```

## API Endpoints

### Test Notification
```bash
POST /api/sos/test-notification
```
Sends a test SMS to verify the setup.

### Check Service Status
```bash
GET /api/sos/notification-status
```
Returns the current status of the SMS notification service.

## Troubleshooting

### Common Issues

1. **SMS not received**
   - Check if your phone number is verified with Twilio
   - Ensure phone numbers are in correct international format
   - Check Twilio console for delivery logs

2. **"Twilio not configured" message**
   - Verify all environment variables are set correctly
   - Restart the backend server after updating .env
   - Check for typos in credentials

3. **Invalid phone number error**
   - Use international format: +[country_code][number]
   - Remove spaces, dashes, or parentheses
   - Verify the number is valid and can receive SMS

### Twilio Free Account Limitations
- Can only send SMS to verified phone numbers
- $15 free credit (approximately 100-200 SMS)
- To send to unverified numbers, upgrade to paid account

### Verification Process
For free accounts, verify your emergency contact number:
1. Go to Twilio Console → Phone Numbers → Manage → Verified Caller IDs
2. Add your personal phone number
3. Complete the verification process

## Security Considerations

### Environment Variables
- Never commit your Twilio credentials to version control
- Keep your .env file secure and private
- Rotate credentials periodically

### Phone Number Privacy
- Your emergency contact number is stored securely
- Only used for genuine emergency notifications
- Not shared with third parties

## Cost Estimation

### Twilio Pricing (approximate)
- SMS in US/Canada: $0.0075 per message
- SMS in India: $0.0075 per message
- SMS in Europe: $0.0075-$0.015 per message

### Monthly Cost Examples
- 10 emergency alerts: ~$0.08
- 50 emergency alerts: ~$0.38
- 100 emergency alerts: ~$0.75

## Advanced Configuration

### Multiple Emergency Contacts
To send alerts to multiple numbers, modify the `EMERGENCY_CONTACT_NUMBER` in the notification service:

```javascript
// In notificationService.js
const EMERGENCY_CONTACTS = [
  '+1234567890',  // Primary contact
  '+0987654321',  // Secondary contact
  '+1122334455'   // Backup contact
];
```

### Custom Message Templates
Modify the message templates in `notificationService.js` to customize the SMS format.

### Webhook Integration
For advanced users, set up Twilio webhooks to track delivery status and replies.

## Support

### Getting Help
1. Check Twilio documentation: https://www.twilio.com/docs
2. Review Twilio console logs for delivery issues
3. Test with the built-in test notification feature
4. Verify phone number formats and credentials

### Emergency Testing
- Always test the system before relying on it for emergencies
- Verify SMS delivery to all intended recipients
- Test from different locations and network conditions
- Keep backup emergency contact methods available

---

## Quick Setup Checklist

- [ ] Create Twilio account
- [ ] Get Account SID, Auth Token, and Twilio phone number
- [ ] Update .env file with credentials
- [ ] Set your emergency contact number
- [ ] Restart backend server
- [ ] Test SMS notification
- [ ] Verify SMS delivery
- [ ] Document emergency procedures

Once configured, the Axicov SOS Agent will automatically send SMS alerts to your phone whenever an emergency is reported, providing you with immediate notification and location details for rapid response.