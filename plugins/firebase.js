import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyAhkciyMCOFQY4E2U7O64wYGgCn1l-t_vM',
  authDomain: 'test-a5423.firebaseapp.com',
  projectId: 'test-a5423',
  storageBucket: 'test-a5423.appspot.com',
  messagingSenderId: '698587096737',
  appId: '1:698587096737:web:052b63bf11dde4c9a972e0',
  measurementId: 'G-KW02MSCWH5'
}

export const app = initializeApp(firebaseConfig)
getAnalytics(app)
