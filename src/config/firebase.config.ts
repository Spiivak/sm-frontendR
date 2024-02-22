import { getAnalytics, logEvent } from "firebase/analytics"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCScQuffrtIY1w5M29m1R6PTeAP5yciPM0",
  authDomain: "shifts-876db.firebaseapp.com",
  projectId: "shifts-876db",
  storageBucket: "shifts-876db.appspot.com",
  messagingSenderId: "165306507820",
  appId: "1:165306507820:web:b7cacf3ac832b4f0b4a789",
  measurementId: "G-XHB5PR0PK5"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth(app)
