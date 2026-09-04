/**
 * LawTrack Firebase client — the single initialization point for the app.
 *
 * SECURITY: The Firebase web app config is PUBLIC by design (it ships with
 * every client). Server-side secrets (ASU AIR API key, model, service
 * credentials) must NEVER appear here — they live only in server/.env
 * (local dev) and Firebase Function secrets (production).
 *
 * STATUS: PLACEHOLDER CONFIG. The Firebase project does not exist yet.
 * Replace PROJECT_CONFIG with the values from Firebase Console
 * (Project settings → General → Your apps → Web app) once the project is
 * created. Until then this module is not imported by any page, so the
 * existing mock auth flow is completely unaffected.
 */
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

/**
 * Local development flag: when true, Auth and Firestore SDK calls are
 * redirected to the Firebase emulators started with
 * `npx firebase emulators:start`. Keep false in production.
 */
const USE_EMULATORS = false;

// PLACEHOLDER — replace with the real (public) Firebase web app config.
const PROJECT_CONFIG = {
  apiKey: 'PLACEHOLDER_API_KEY',
  authDomain: 'PLACEHOLDER_PROJECT_ID.firebaseapp.com',
  projectId: 'PLACEHOLDER_PROJECT_ID',
  storageBucket: 'PLACEHOLDER_PROJECT_ID.appspot.com',
  messagingSenderId: 'PLACEHOLDER_SENDER_ID',
  appId: 'PLACEHOLDER_APP_ID',
};

const app = initializeApp(PROJECT_CONFIG);

export const auth = getAuth(app);
export const db = getFirestore(app);

if (USE_EMULATORS) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  connectFirestoreEmulator(db, '127.0.0.1', 8085);
}