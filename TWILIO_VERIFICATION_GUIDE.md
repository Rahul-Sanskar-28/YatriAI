# Twilio Phone Number Verification Guide

## ✅ Your Twilio Credentials Are Now Configured!

Your Twilio credentials have been added to the system:
- **Account SID**: AC839ecb428a51c9949b69bb38bfb93cb8
- **Auth Token**: 988b8df47a82b8f9259f56a8aa391806  
- **Twilio Phone**: +15674833860

## 📱 Next Step: Verify Your Phone Number

Since you're on a **Twilio Trial Account**, you can only send SMS to verified phone numbers.

### How to Verify Your Phone Number:

1. **Go to Twilio Console**: https://console.twilio.com
2. **Navigate to**: Phone Numbers → Manage → Verified Caller IDs
3. **Click**: "Add a new Caller ID"
4. **Enter your phone number** in international format:
   - US: `+1-555-123-4567`
   - India: `+91-98765-43210`
   - UK: `+44-7123-456789`
5. **Complete verification** by entering the code sent to your phone

### Update Your Emergency Contact Number:

After verification, update your phone number in the `.env` file:

```env
# Replace this with your verified phone number
EMERGENCY_CONTACT_NUMBER="+your_verified_phone_number"
```

## 🧪 Test the System:

1. **Start the backend server**: `npm run dev` in the backend folder
2. **Open the dashboard**: http://localhost:5174/tourist-dashboard
3. **Click the Axicov agent** in the sidebar
4. **Click "Test SMS Notification"** button
5. **Check your phone** for the test message!

## 📋 Phone Number Format Examples:

| Country | Format | Example |
|---------|--------|---------|
| United States | +1XXXXXXXXXX | +15551234567 |
| India | +91XXXXXXXXXX | +919876543210 |
| United Kingdom | +44XXXXXXXXXXX | +447123456789 |
| Canada | +1XXXXXXXXXX | +14161234567 |
| Australia | +61XXXXXXXXX | +61412345678 |

## 🚨 Emergency Alert Format:

Once configured, you'll receive SMS alerts like this:

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

## 💰 Trial Account Limitations:

- **Free Credit**: $15.00 (approximately 100-200 SMS)
- **Verified Numbers Only**: Can only send to verified phone numbers
- **Twilio Branding**: Messages include "Sent from your Twilio trial account"

## 🔧 Troubleshooting:

### "Unverified Number" Error:
- Verify your phone number in Twilio Console
- Make sure the number format is correct (+country_code + number)

### "Invalid Credentials" Error:
- Double-check Account SID and Auth Token
- Restart the backend server after updating .env

### "No SMS Received":
- Check if your phone can receive SMS
- Verify the phone number format
- Check Twilio Console logs for delivery status

## 🎯 Quick Setup Checklist:

- [x] Twilio credentials added to .env
- [ ] Phone number verified in Twilio Console  
- [ ] Emergency contact number updated in .env
- [ ] Backend server restarted
- [ ] Test SMS sent successfully
- [ ] Real emergency alert tested

Once you complete the phone verification, your Axicov SOS Agent will send real SMS alerts to your phone whenever an emergency is reported!