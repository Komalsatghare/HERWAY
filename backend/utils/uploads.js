// utils/upload.js

const { bucket } = require('../config/firebaseAdmin'); // Import the bucket

async function uploadToFirebase(buffer, destination, filename, mimetype) {
    const fileRef = bucket.file(`${destination}${filename}`);
    
    await fileRef.save(buffer, {
        metadata: { contentType: mimetype },
        public: true, 
    });
    
    // Returns the URL where the image is stored on Google Cloud/Firebase Storage
    return `https://storage.googleapis.com/${bucket.name}/${destination}${filename}`;
}

module.exports = { uploadToFirebase };