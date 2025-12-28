# Twilio SMS Setup Instructions

## Current Status
✅ **Twilio Credentials**: Configured correctly
✅ **Emergency Contact**: +919570088806
✅ **Twilio Phone Number**: +15674833860
❌ **SMS Delivery**: Blocked (Trial account limitation)

## Issue
Your Twilio account is in **trial mode** and can only send SMS to **verified phone numbers**. The error message shows:

```
The number +919570088806 is unverified. Trial accounts cannot send messages to unverified numbers
```

## Solution Options

### Option 1: Verify Your Phone Number (Recommended)
1. **Go to Twilio Console**: https://console.twilio.com/
2. **Navigate to**: Phone Numbers → Manage → Verified Caller IDs
3. **Click**: "Add a new number"
4. **Enter**: +919570088806
5. **Verify**: Enter the SMS verification code you receive
6. **Test**: Once verified, SMS will be sent successfully

### Option 2: Upgrade Twilio Account
- Purchase a Twilio phone number plan
- This removes trial account restrictions
- Allows sending to any phone number

## Testing SMS After Verification

Once your number is verified, you can test SMS functionality:

1. **Test SMS Endpoint**:
   ```bash
   POST http://localhost:3001/api/sos/test-notification
   ```

2. **Create SOS Alert** (will send SMS):
   ```bash
   POST http://localhost:3001/api/sos/alert
   Content-Type: application/json
   
   {
     "userId": "test-user",
     "type": "medical",
     "location": "Kolkata, West Bengal",
     "message": "Emergency test alert",
     "userName": "Test User"
   }
   ```

## Expected SMS Format

When working, you'll receive SMS like:
```
🚨 EMERGENCY ALERT 🚨

Type: MEDICAL
User: Test User
Message: Emergency test alert
Location: Kolkata, West Bengal
Time: 28/12/2025, 7:37:22 am
Alert ID: sos_1766887335255_182g4au8k

This is an automated emergency notification from YatriAI SOS System.
```

## Verification Steps
1. ✅ Twilio credentials are configured
2. ❌ **NEXT**: Verify +919570088806 in Twilio Console
3. ⏳ Test SMS functionality after verification
4. ⏳ Test SOS alert creation from frontend

## Support Links
- [Twilio Console](https://console.twilio.com/)
- [Verify Phone Numbers](https://console.twilio.com/us1/develop/phone-numbers/manage/verified)
- [Twilio Trial Account Limits](https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account)