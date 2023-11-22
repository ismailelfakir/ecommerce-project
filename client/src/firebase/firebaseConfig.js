import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUa8lZmLYsQ961t8otpFokm4HlA7oqi1A",
  authDomain: "ecomm-9f4bb.firebaseapp.com",
  projectId: "ecomm-9f4bb",
  storageBucket: "ecomm-9f4bb.appspot.com",
  messagingSenderId: "555303471965",
  appId: "1:555303471965:web:ea6aaddf0795e55d75b6b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;