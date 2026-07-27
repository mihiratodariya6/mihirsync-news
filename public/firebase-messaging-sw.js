// public/firebase-messaging-sw.js

// Firebase libraries import કરો
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// 🚀 અહી તારા ફાયરબેઝની સાચી Config નાખવાની છે (જે તારી lib/firebase.ts માં છે)
const firebaseConfig = {
  apiKey: "AIzaSyAIEul0E3lPP5UUWMeDwdhHeVJSJfmiZKc",
  authDomain: "mihirsync-news.firebaseapp.com",
  projectId: "mihirsync-news",
  storageBucket: "mihirsync-news.firebasestorage.app",
  messagingSenderId: "655643804828",
  appId: "1:655643804828:web:6e458847ac120dae711959",
  measurementId: "G-ZCWBNND5CV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// બેકગ્રાઉન્ડમાં મેસેજ રિસીવ કરવા માટે
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.ico', // તારો લોગો અહી દેખાશે
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});