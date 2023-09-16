const { getMessaging } = require("firebase-admin/messaging");

// Get the Messaging instance
const messaging = getMessaging();

// Function to send push notification to the 'reminders' topic
async function sendNotificationToRemindersTopic(title, body) {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    topic: 'reminders',
  };

  try {
    const response = await messaging.send(message);
    console.log('Notification sent successfully:', response);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

module.exports = { sendNotificationToRemindersTopic };
