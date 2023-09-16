const Reminder = require("../models/Reminder");
const jwt = require("jsonwebtoken");
const { getMessaging } = require("firebase-admin/messaging");

const ReminderController = {
  saveReminder: async (req, res) => {
    try {
      const { reminderId, title, description, dateTime, user } = req.body;

      // Save the reminder to the MongoDB database
      const reminder = new Reminder({
        Reminderid: reminderId,
        title,
        description,
        date: dateTime.toISOString().split('T')[0], // Get date in "YYYY-MM-DD" format
        time: dateTime.toTimeString().split(' ')[0], // Get time in "HH:mm:ss" format
        user,
      });
      await reminder.save();

      // Send a notification to the 'reminders' topic
      const notificationTitle = 'New Reminder';
      const notificationBody = 'A new reminder has been created.';
      sendNotificationToRemindersTopic(notificationTitle, notificationBody);

      res.status(201).json({ message: 'Reminder created successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  fetchReminders: async (req, res) => {
    try {
      // Fetch all reminders from MongoDB database
      const reminders = await Reminder.find();
      res.json(reminders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

// Helper function to send notifications to 'reminders' topic
function sendNotificationToRemindersTopic(title, body) {
  // Implement the logic to send FCM notifications here
  // Use the Firebase Admin SDK or any other FCM library to send the notification
  // Example: You can use Firebase Admin SDK as follows
  const messaging = getMessaging();
  const message = {
    notification: {
      title,
      body,
    },
    topic: 'reminders',
  };

  messaging.send(message)
    .then((response) => {
      console.log('Notification sent successfully:', response);
    })
    .catch((error) => {
      console.error('Error sending notification:', error);
    });
}

module.exports = ReminderController;
