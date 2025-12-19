# n8n Workflow Automation Setup for YatriAI

This guide explains how to set up n8n for workflow automation and notifications in the YatriAI project.

## What is n8n?

[n8n](https://n8n.io) is an open-source workflow automation tool that can be self-hosted or used via cloud. It allows you to:

- **Automate notifications** (email, SMS, push)
- **Connect services** (payment gateways, AI, databases)
- **Create complex workflows** with visual editor
- **No vendor lock-in** - fully self-hostable

## YatriAI n8n Workflows

YatriAI uses the following n8n workflows:

| Workflow | Purpose | Triggers |
|----------|---------|----------|
| **User Registration** | Welcome email, onboarding | New user signup |
| **Booking Confirmation** | Email + SMS confirmation, calendar invite | Booking created |
| **Itinerary Generated** | PDF generation and email | AI itinerary created |
| **Guide Assigned** | Notify guide and tourist | Guide booking confirmed |
| **Payment Received** | Receipt email, blockchain recording | Payment successful |
| **Trip Reminder** | Pre-trip reminder | Scheduled (1 day before) |
| **Review Reminder** | Post-trip review request | Scheduled (1 day after) |
| **Emergency Alert** | SOS to contacts and authorities | Emergency button pressed |

## Installation Options

### Option 1: Self-Hosted (Recommended for Development)

```bash
# Using npm
npm install n8n -g
n8n start

# Using Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

n8n will be available at `http://localhost:5678`

### Option 2: n8n Cloud

1. Sign up at [n8n.cloud](https://n8n.cloud)
2. Create a new instance
3. Get your instance URL (e.g., `https://your-instance.app.n8n.cloud`)

## Configuration

### 1. Environment Variables

Add to your `.env.local`:

```env
# Enable n8n integration
VITE_USE_N8N=true

# n8n instance URL
VITE_N8N_URL=http://localhost:5678
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook
VITE_N8N_API_URL=http://localhost:5678/api/v1

# Optional: Custom workflow paths
VITE_N8N_WORKFLOW_USER_REGISTRATION=user-registration
VITE_N8N_WORKFLOW_BOOKING_CONFIRMATION=booking-confirmation
VITE_N8N_WORKFLOW_ITINERARY_GENERATED=itinerary-generated
VITE_N8N_WORKFLOW_GUIDE_ASSIGNED=guide-assigned
VITE_N8N_WORKFLOW_PAYMENT_RECEIVED=payment-received
VITE_N8N_WORKFLOW_REVIEW_REMINDER=review-reminder
VITE_N8N_WORKFLOW_TRIP_REMINDER=trip-reminder
VITE_N8N_WORKFLOW_EMERGENCY_ALERT=emergency-alert
```

### 2. Notification Channels

```env
# Enable/disable notification channels
VITE_EMAIL_NOTIFICATIONS=true
VITE_SMS_NOTIFICATIONS=false
VITE_PUSH_NOTIFICATIONS=true
```

## Creating n8n Workflows

### 1. User Registration Workflow

Create a new workflow in n8n:

1. **Trigger**: Webhook → Set path to `user-registration`
2. **Action 1**: Send Email (SendGrid/Mailgun)
   - To: `{{ $json.email }}`
   - Subject: "Welcome to YatriAI! 🌟"
   - Body: Welcome email template
3. **Action 2**: (Optional) Add to mailing list
4. **Action 3**: Respond to Webhook

**Webhook URL**: `http://localhost:5678/webhook/user-registration`

### 2. Booking Confirmation Workflow

```json
{
  "name": "Booking Confirmation",
  "nodes": [
    {
      "type": "n8n-nodes-base.webhook",
      "name": "Webhook",
      "parameters": {
        "path": "booking-confirmation",
        "httpMethod": "POST"
      }
    },
    {
      "type": "n8n-nodes-base.sendEmail",
      "name": "Send Confirmation Email",
      "parameters": {
        "to": "={{ $json.userEmail }}",
        "subject": "Booking Confirmed: {{ $json.title }}",
        "text": "Your booking for {{ $json.title }} on {{ $json.date }} is confirmed!"
      }
    },
    {
      "type": "n8n-nodes-base.twilio",
      "name": "Send SMS",
      "parameters": {
        "to": "={{ $json.userPhone }}",
        "message": "YatriAI: Your booking for {{ $json.title }} is confirmed!"
      }
    }
  ]
}
```

### 3. Emergency Alert Workflow

This is a high-priority workflow:

1. **Trigger**: Webhook → `emergency-alert`
2. **Action 1**: Send SMS to all emergency contacts
3. **Action 2**: Send email with location details
4. **Action 3**: (Optional) Notify local authorities API
5. **Action 4**: Log to database

## Using n8n in Code

### Service Import

```typescript
import { n8nService, notificationService, analyticsService } from './lib/services';
```

### Triggering Workflows

```typescript
// User registration
await n8nService.onUserRegistration({
  userId: 'user-123',
  email: 'john@example.com',
  name: 'John Doe',
  role: 'tourist',
  registeredAt: new Date().toISOString(),
});

// Booking confirmation
await n8nService.onBookingConfirmation({
  bookingId: 'book-456',
  userId: 'user-123',
  userEmail: 'john@example.com',
  userName: 'John Doe',
  bookingType: 'guide',
  title: 'Wildlife Safari Tour',
  date: '2024-01-15',
  amount: 7500,
  currency: 'INR',
  status: 'confirmed',
});

// Emergency alert
await n8nService.sendEmergencyAlert({
  userId: 'user-123',
  userName: 'John Doe',
  userPhone: '+91-9876543210',
  location: {
    lat: 23.3441,
    lng: 85.3096,
    address: 'Near Hundru Falls, Jharkhand',
  },
  alertType: 'sos',
  message: 'Need immediate assistance',
  emergencyContacts: [
    { name: 'Emergency Contact', phone: '+91-9876543211' },
  ],
  timestamp: new Date().toISOString(),
});
```

### Custom Workflows

```typescript
// Trigger any custom workflow
await n8nService.triggerCustomWorkflow('my-custom-workflow', {
  customField: 'value',
  anotherField: 123,
});
```

## Notification Service

The notification service works alongside n8n for in-app notifications:

```typescript
// Send in-app notification
await notificationService.send({
  userId: 'user-123',
  type: 'booking_confirmed',
  title: 'Booking Confirmed! 🎉',
  message: 'Your safari tour is confirmed for Jan 15.',
  priority: 'high',
  channels: ['in_app', 'email'],
});

// Get user notifications
const notifications = notificationService.getNotifications('user-123', {
  unreadOnly: true,
  limit: 10,
});

// Mark as read
notificationService.markAsRead('user-123', 'notif-456');

// Subscribe to real-time notifications
const unsubscribe = notificationService.subscribe('user-123', (notification) => {
  console.log('New notification:', notification);
});
```

## Analytics Service

Track user events alongside notifications:

```typescript
// Track page view
analyticsService.pageView('Booking Page');

// Track conversion
analyticsService.conversion('booking_completed', 7500);

// Track booking funnel
analyticsService.trackBookingFunnel('started', 'book-456');
analyticsService.trackBookingFunnel('payment', 'book-456');
analyticsService.trackBookingFunnel('completed', 'book-456');

// AI interaction tracking
analyticsService.aiInteraction('itinerary', {
  duration: 5,
  interests: ['nature', 'wildlife'],
});
```

## Mock Mode

When n8n is not configured, the service operates in mock mode:

- Workflows are logged to console
- No external HTTP calls are made
- Perfect for development without n8n

Console output in mock mode:
```
📧 [Mock] n8n workflow "User Registration" would be triggered with: { ... }
```

## Workflow Templates

Import these workflow templates in n8n:

### Email Template: Welcome Email

```html
<h1>Welcome to YatriAI, {{ $json.userName }}! 🌟</h1>
<p>Thank you for joining us. You're now ready to explore the beauty of Jharkhand!</p>
<h2>Quick Start:</h2>
<ul>
  <li>🗺️ Discover amazing destinations</li>
  <li>🤖 Get AI-powered itinerary recommendations</li>
  <li>👨‍🏫 Connect with local guides</li>
  <li>🛒 Shop authentic handicrafts</li>
</ul>
<a href="https://yatriai.app/dashboard">Start Exploring →</a>
```

### SMS Template: Booking Confirmation

```
YatriAI: Your booking "{{ $json.title }}" on {{ $json.date }} is confirmed! 
Amount: ₹{{ $json.amount }}
Ref: {{ $json.bookingId }}
```

## Integration with Other Services

n8n workflows can integrate with:

| Service | Use Case |
|---------|----------|
| **SendGrid/Mailgun** | Email delivery |
| **Twilio** | SMS notifications |
| **Google Calendar** | Calendar invites |
| **Slack** | Team notifications |
| **Airtable** | Database logging |
| **Webhook.site** | Testing |

## Monitoring & Debugging

1. **n8n Dashboard**: View all executions at `http://localhost:5678/executions`
2. **Console Logs**: Check browser console for mock mode logs
3. **Workflow Logs**: Click on any execution to see step-by-step logs

## Security Considerations

1. **Authentication**: Enable n8n authentication in production
2. **HTTPS**: Use HTTPS for webhook URLs in production
3. **Rate Limiting**: Configure rate limits on webhook endpoints
4. **Secret Management**: Use n8n credentials for API keys

## Troubleshooting

### Workflow Not Triggering

1. Check if n8n is running: `curl http://localhost:5678/healthz`
2. Verify `VITE_USE_N8N=true` is set
3. Check browser console for errors
4. Verify webhook path matches workflow

### Email Not Sending

1. Check email credentials in n8n
2. Verify recipient email in payload
3. Check n8n execution logs for errors

### Mock Mode Unexpectedly

If seeing mock logs when n8n should be active:
1. Verify `VITE_N8N_URL` is set correctly
2. Check if n8n instance is accessible
3. Restart the dev server after env changes

