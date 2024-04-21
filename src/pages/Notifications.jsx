import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getNotifications } from '../features/selectors/selectors';

export default function NotificationsPage() {
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
  const  notificationInfo=useSelector(getNotifications).time.split(".")

console.log("not:minut",notificationInfo)
  useEffect(() => {
    const intervalId = setInterval(() => {
      sendMiddayNotification();
    }, 1000); // Check every second

    return () => clearInterval(intervalId);
  }, []);

  function sendMiddayNotification() {
    // Get current date and time
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    // Check if it's midday (12:00 PM)
    if (hours === Number(notificationInfo[0]) && minutes === Number(notificationInfo[1])) {
      // Check if the browser supports notifications
      if ("Notification" in window) {
        // Check if notification permission has already been granted
        if (Notification.permission === "granted") {
          // Create and display the notification
          new Notification("Midday Weather Update", {
            body: "Check the weather for the afternoon! It's 25°C.",
          });
        } else if (Notification.permission !== 'denied') {
          // Request permission from the user
          Notification.requestPermission().then((permission) => {
            // If permission is granted, create and display the notification
            if (permission === "granted") {
              new Notification("Midday Weather Update", {
                body: "Check the weather for the afternoon! It's 25°C.",
              });
            }
          });
        }
      } else {
        // Browser does not support notifications
        console.log("This browser does not support desktop notification");
      }
    }
  }

  const handleNotifications = () => {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (notificationPermission === "granted") {
      // If permission is granted, create a notification
      new Notification("Hello, World!");
    } else if (notificationPermission !== 'denied') {
      // Otherwise, ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, create a notification
        if (permission === "granted") {
          new Notification("Hello, World!");
        }
      });
    }
  };
const isNotification=Notification.permission
  return (
    <div>
      <h1>Notifications page</h1>
      <button id='notificationBoard' onClick={handleNotifications}>notification: {isNotification=="granted" ? "Granted" : "Denied"}</button>
    </div>
  );
}
