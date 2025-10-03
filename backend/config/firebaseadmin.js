// config/firebaseAdmin.js (on your backend server)

const admin = require('firebase-admin');

// 1. Get the secure path from the .env file
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!serviceAccountPath) {
    // This throws an error if the .env file wasn't loaded or the variable is missing
    throw new Error("FIREBASE_SERVICE_ACCOUNT_PATH is not set in your .env file!");
}

// 2. Load the JSON file using the path provided in the .env file
const serviceAccount = require(serviceAccountPath); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// 3. Export the Firestore instance for use in your backend routes
const db = admin.firestore();

module.exports = { db };