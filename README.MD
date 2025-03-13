# SubDub - Subscription Management System

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Upstash](https://img.shields.io/badge/Upstash-00E396?style=for-the-badge)](https://upstash.com/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-0078D4?style=for-the-badge)](https://nodemailer.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)

## 📱 Project Overview

SubDub is a subscription management system that helps users keep track of their recurring payments. In today's subscription-based economy, people often lose track of their active subscriptions, leading to unwanted charges. SubDub solves this problem by providing timely reminders before subscription renewals, giving users the opportunity to evaluate and manage their subscriptions effectively.

**Key Problem Solved:** Preventing unexpected subscription renewals and helping users maintain control over their recurring expenses.

![SubDub Email Notification](https://github.com/Pepegakac123/subscriptionTracker/blob/main/assets/emailNotification.png)

## 🚀 Key Features

- **User Authentication**: Secure registration and login functionality with JWT
- **Subscription Management**: Add, view, and manage subscription details
- **Automated Email Reminders**: Receive notifications 7, 5, 2, and 1 day before renewal
- **Subscription Analytics**: Track spending across different categories
- **Security Features**: Rate limiting and bot protection with Arcjet

## 🛠️ Tech Stack

### Backend
- **Node.js v23**: Latest version with native TypeScript support
- **Express**: RESTful API framework
- **MongoDB & Mongoose**: NoSQL database for flexible data storage
- **JWT Authentication**: Secure user management
- **Upstash Workflow**: Scheduled background tasks for reminders
- **Nodemailer**: Email service for sending renewal notifications
- **Arcjet**: API security with rate limiting and bot detection

### Project Structure
```
subscription-tracker/
├── config/            # Configuration files for external services
├── controllers/       # Request handlers
├── db/                # Database models and connection
├── errors/            # Custom error handling
├── middleware/        # Express middleware
├── routes/            # API endpoints
├── types/             # TypeScript type definitions
└── utils/             # Helper functions
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v23+ (with native TypeScript support)
- MongoDB
- Upstash account for workflow scheduling
- Gmail account for email notifications

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/subdub.git
   cd subdub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file with the following variables:
   ```
   PORT=8000
   SERVER_URL=http://localhost:8000
   DB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=3600
   
   # Arcjet Security
   ARCJET_KEY=your_arcjet_key
   
   # Upstash Workflow
   QSTASH_URL=your_qstash_url
   QSTASH_TOKEN=your_qstash_token
   
   # Email Configuration
   EMAIL=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```

4. **Start the server**
   ```bash
   # Using Node.js v23 with native TypeScript support
   npm run dev
   ```

5. **Running Upstash Workflow Locally**
   For local testing of the workflow functionality, run the Upstash QStash CLI in a separate terminal:
   ```bash
   npx @upstash/qstash-cli dev
   ```
   This will start a local QStash server that will handle workflow requests for testing.

## 🔍 API Endpoints

| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| POST | `/api/v1/auth/sign-up` | Register a new user | ✅ Implemented |
| POST | `/api/v1/auth/sign-in` | User login | ✅ Implemented |
| POST | `/api/v1/auth/sign-out` | User logout | 🚧 Not Implemented |
| POST | `/api/v1/subscriptions` | Create a new subscription | ✅ Implemented |
| GET | `/api/v1/subscriptions/user/:id` | Get user's subscriptions | ✅ Implemented |
| GET | `/api/v1/subscriptions/:id` | Get subscription details | 🚧 Not Implemented |
| PATCH | `/api/v1/subscriptions/:id` | Update subscription | 🚧 Not Implemented |
| DELETE | `/api/v1/subscriptions/:id` | Delete subscription | 🚧 Not Implemented |
| GET | `/api/v1/subscriptions/:id/cancel` | Cancel subscription | 🚧 Not Implemented |
| GET | `/api/v1/subscriptions/upcoming-renewals` | Get upcoming renewals | 🚧 Not Implemented |
| GET | `/api/v1/users` | Get all users (admin) | ✅ Implemented |
| GET | `/api/v1/users/:id` | Get specific user | ✅ Implemented |
| POST | `/api/v1/workflows/subscription/reminder` | Trigger subscription reminder workflow | ✅ Implemented |

### Example API Request

To test the subscription reminder functionality, you can use this curl command:

```bash
curl -X POST http://localhost:8000/api/v1/workflows/subscription/reminder \
  -H "Content-Type: application/json" \
  -d '{"subscriptionId": "YOUR_SUBSCRIPTION_ID"}'
```

For protected routes, include the JWT token:

```bash
curl -X GET http://localhost:8000/api/v1/subscriptions/user/YOUR_USER_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 💡 Why This Project Matters

This project demonstrates my ability to build a complete backend system with several real-world applications:

- **Scheduled Tasks**: Implementation of a reminder system using Upstash Workflow shows my understanding of background job processing and scheduling.
- **Email Integration**: The project integrates with email services for sending personalized notifications.
- **Security Implementation**: API protection against common threats using rate limiting and bot detection.
- **Database Design**: MongoDB schema design with proper validation and relationships.
- **Transactional Processes**: Handling subscription creation and user authentication with error handling and rollback capabilities.
- **Modern Node.js**: Leveraging Node.js v23's native TypeScript support without transpilation.

The project also showcases my ability to integrate multiple third-party services into a cohesive application.

## 🔮 Future Improvements

As I continue to learn and grow, I plan to enhance SubDub with:

- Frontend implementation with React for a complete user experience
- Payment gateway integration for managing actual payments
- Machine learning to analyze spending patterns and recommend subscription optimizations
- Mobile application with push notifications
- Expanded analytics dashboard with spending visualizations
- Multi-currency support for international users
- Implementation of remaining API endpoints for full CRUD operations

## 🧪 Code Example: Email Reminder Workflow

```typescript
// Workflow implementation for sending reminder emails
export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `Reminder ${daysBefore} days before`,
        reminderDate,
      );
    }

    if (dayjs().isSame(reminderDate, "day")) {
      await triggerReminder(
        context,
        `${daysBefore} days before reminder`,
        subscription,
      );
    }
  }
});
```

## 📧 Email Template Preview

SubDub sends beautifully formatted HTML emails to remind users of upcoming subscription renewals:

```html
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7fa;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="background-color: #4a90e2; text-align: center;">
                <p style="font-size: 54px; line-height: 54px; font-weight: 800;">SubDub</p>
            </td>
        </tr>
        <!-- Email content -->
    </table>
</div>
```

## 📝 License

MIT License

---

*This project is part of my personal learning journey in backend development. I'm continuously working to improve my skills and would appreciate any feedback or suggestions!*