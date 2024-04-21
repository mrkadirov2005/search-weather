import React from 'react'

export default function NotificationsPage() {
    function sendMiddayNotification() {
        // Get current date and time
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        // Check if it's midday (12:00 PM)
        if (hours === 18 && minutes === 10) {
          // Check if the browser supports notifications
          if ("Notification" in window) {
            // Check if notification permission has already been granted
            if (Notification.permission === "granted") {
              // Create and display the notification
              var notification = new Notification("Midday Weather Update", {
                body: "Check the weather for the afternoon it is 25! ",
              });
            } else if (Notification.permission !== 'denied') {
              // Request permission from the user
              Notification.requestPermission().then(function (permission) {
                // If permission is granted, create and display the notification
                if (permission === "granted") {
                  var notification = new Notification("Midday Weather Update", {
                    body: "Check the weather for the afternoon!",
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
    
      // Check for midday notification every minute
      setInterval(sendMiddayNotification, 60000);



const handleNotifications=()=>{
        // Check if the browser supports notifications
        if (!("Notification" in window)) {
          alert("This browser does not support desktop notification");
        }
  
        // Check if notification permission has already been granted
        else if (Notification.permission === "granted") {
          // If it's okay let's create a notification
          var notification = new Notification("Hello, World!");
        }
  
        // Otherwise, ask the user for permission
        else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then(function (permission) {
            // If the user accepts, create a notification
            if (permission === "granted") {
                alert(Date.now()/1000/60/60/24/365)
              var notification = new Notification("Hello, World!");
            }
          });
        }
}

const isNotification=Notification.permission

  return (
    <div>
        <h1>Notifications page</h1>
        <button id='notificationBoard' onClick={()=>handleNotifications()}>notification: {isNotification?"Granted":"denied"}</button>

    </div>
  )
}


