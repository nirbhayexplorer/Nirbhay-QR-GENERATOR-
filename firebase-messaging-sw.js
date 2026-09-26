/* firebase-messaging-sw.js
   ------------------------------------------------------------------
   Upload this file to the ROOT of your website (same place as your
   index.html — it MUST be reachable at https://yourdomain/firebase-messaging-sw.js,
   not inside a subfolder), so the browser can install it and show
   push notifications while your tab is in the background or closed.
   ------------------------------------------------------------------ */

importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

/* Same config as in index.html */
firebase.initializeApp({
  apiKey: "AIzaSyB9mFSs68ZzW577yA2q60xo2urkgATY6QQ",
  authDomain: "nirbhay-explorer-ai-f6eba.firebaseapp.com",
  projectId: "nirbhay-explorer-ai-f6eba",
  storageBucket: "nirbhay-explorer-ai-f6eba.firebasestorage.app",
  messagingSenderId: "528263522448",
  appId: "1:528263522448:web:b0fa93d5c1db0251c21015"
});

var messaging = firebase.messaging();

/* Shown when the site is in the background or closed. */
messaging.onBackgroundMessage(function (payload) {
  var n = (payload && payload.notification) || {};
  var title = n.title || "Nirbhay QR Generator";
  var options = {
    body: n.body || "",
    icon: n.icon || "/favicon.ico",
    image: n.image || undefined,
    badge: "/favicon.ico",
    data: payload.data || {}
  };
  self.registration.showNotification(title, options);
});

/* Clicking the OS notification focuses/opens the site. */
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  var url = (event.notification.data && event.notification.data.click_action) || "/";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (list) {
      for (var i = 0; i < list.length; i++) {
        if ("focus" in list[i]) return list[i].focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
