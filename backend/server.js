const multer = require("multer");
const path = require("path");
require('dotenv').config();
const { db, admin } = require('./config/firebaseadmin'); 
// ----------------------
// Required modules
// ----------------------
const express = require("express");
const fs = require("fs");
const cors = require("cors");   // ✅ added cors

const app = express();
app.use(express.json());        // to parse JSON
app.use(express.urlencoded({ extended: true }));
app.use(cors());                // ✅ enable cors for frontend (localhost:3000)

// Create uploads directory if it doesn't exist
const uploadsDir = "uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ----------------------
// Multer setup (for photo and document upload)
// ----------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "uploads/";
    if (file.fieldname === 'faceImage') {
      uploadPath += "faces/";
    } else if (file.fieldname === 'document') {
      uploadPath += "documents/";
    }
    
    // Create subdirectory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter for document verification
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'faceImage') {
    // Allow only image files for face verification
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for face verification'), false);
    }
  } else if (file.fieldname === 'document') {
    // Allow image files for document verification (Aadhar card, etc.)
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for document verification'), false);
    }
  } else {
    cb(null, true);
  }
};

const upload = multer({ 
    // OLD diskStorage is GONE. We now use memoryStorage.
    storage: multer.memoryStorage(), 
    fileFilter: fileFilter, 
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// ----------------------
// Login route
// ----------------------
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Read users from users.json
  let users = [];
  try {
    const data = fs.readFileSync("users.json", "utf8");
    users = JSON.parse(data);
  } catch (err) {
    console.error("Error reading users.json:", err);
  }

  // Check if user exists
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Success
  res.json({
    message: "Login successful ✅",
    user: { name: user.name, email: user.email }
  });
});

// ----------------------
// Register route
// ----------------------
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Read users.json
  let users = [];
  try {
    const data = fs.readFileSync("users.json", "utf8");
    users = JSON.parse(data);
  } catch (err) {
    console.error("Error reading users.json:", err);
  }

  // Check if email already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Save new user
  const newUser = { name, email, password };
  users.push(newUser);
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

  res.json({ message: "Registration successful ✅", user: { name, email } });
});

// ----------------------
// Face Verification Upload route
// ----------------------
// server.js (Where the old /upload-face-photo route was)

// NOTE: Add this import at the very top of server.js with your other requires:
// const { uploadToFirebase } = require('./utils/upload'); 

app.post("/upload-face-photo", upload.single("faceImage"), async (req, res) => {
    // 1. Basic checks
    if (!req.file || !req.body.email) {
        return res.status(400).json({ error: "No image or email provided." });
    }
    
    try {
        // 2. Generate secure file name
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(req.file.originalname);
        const filename = `faceImage-${uniqueSuffix}${fileExtension}`;
        
        // 3. Upload to Firebase Storage (using the utility function)
        const fileUrl = await uploadToFirebase(
            req.file.buffer, 
            'faces/', // Folder name in your bucket
            filename, 
            req.file.mimetype
        );

        // 4. Update the user's secure profile in Firestore
        const userRef = db.collection('users').doc(req.body.email);
        await userRef.update({
            faceImageUrl: fileUrl, // Save the public URL
            faceImageStatus: 'uploaded'
        });

        res.json({
            message: "Face photo uploaded successfully to Firebase Storage ✅",
            url: fileUrl,
        });
    } catch (error) {
        console.error("Firebase Storage Upload Error:", error);
        res.status(500).json({ error: "Failed to upload file to storage." });
    }
});

// ----------------------
// Document Verification Upload route
// ----------------------
// server.js (Where the old /upload-document route was)

app.post("/upload-document", upload.single("document"), async (req, res) => {
    if (!req.file || !req.body.email) {
        return res.status(400).json({ error: "No document or email provided." });
    }

    try {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(req.file.originalname);
        const filename = `document-${uniqueSuffix}${fileExtension}`;
        
        // 1. Upload to Firebase Storage
        const fileUrl = await uploadToFirebase(
            req.file.buffer, 
            'documents/', // Folder name in your bucket
            filename, 
            req.file.mimetype
        );
        
        // 2. Update user's secure profile in Firestore
        const userRef = db.collection('users').doc(req.body.email);
        await userRef.update({
            documentImageUrl: fileUrl, // Save the public URL
            documentStatus: 'uploaded'
        });

        // 3. Respond with verification success (you can keep your existing verification logic structure)
        const verificationResult = {
            isFemale: true, 
            documentType: "Aadhar Card",
            status: "pending_review", // Status should be pending until admin checks
            message: "Document uploaded. Pending admin review."
        };

        res.json({
            message: "Document uploaded successfully to Firebase Storage ✅",
            verification: verificationResult,
            url: fileUrl
        });
    } catch (error) {
        console.error("Firebase Storage Upload Error:", error);
        res.status(500).json({ error: "Failed to upload file to storage." });
    }
});

// ----------------------
// Manual Document Verification route (for admin review)
// ----------------------
app.post("/manual-verify-document", (req, res) => {
  const { email, isVerified, adminNotes } = req.body;
  
  if (!email || typeof isVerified !== 'boolean') {
    return res.status(400).json({ error: "Email and verification status are required" });
  }

  try {
    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user verification status
    users[userIndex].verificationStatus = isVerified ? "verified" : "rejected";
    users[userIndex].adminNotes = adminNotes || "";
    users[userIndex].verificationDate = new Date().toISOString();
    
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
    
    res.json({ 
      message: isVerified ? "Document verified successfully ✅" : "Document verification rejected",
      verificationStatus: users[userIndex].verificationStatus
    });
  } catch (err) {
    console.error("Error updating verification:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ----------------------
// Complete Registration route
// ----------------------
app.post("/complete-registration", upload.fields([
  { name: 'faceImage', maxCount: 1 },
  { name: 'document', maxCount: 1 }
]), (req, res) => {
  const { name, email, password, phone, dateOfBirth } = req.body;
  
  if (!name || !email || !password || !phone || !dateOfBirth) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!req.files.faceImage || !req.files.document) {
    return res.status(400).json({ error: "Both face photo and document are required" });
  }

  // Read users.json
  let users = [];
  try {
    const data = fs.readFileSync("users.json", "utf8");
    users = JSON.parse(data);
  } catch (err) {
    console.error("Error reading users.json:", err);
  }

  // Check if email already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Save new user with verification data
  const newUser = { 
    name, 
    email, 
    password, 
    phone, 
    dateOfBirth,
    faceImage: req.files.faceImage[0].filename,
    document: req.files.document[0].filename,
    verificationStatus: "completed",
    registrationDate: new Date().toISOString()
  };
  
  users.push(newUser);
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

  res.json({ 
    message: "Welcome to HerWay! Registration completed successfully ✅", 
    user: { 
      name, 
      email, 
      verificationStatus: "completed" 
    } 
  });
});

// ----------------------
// Get User Profile route
// ----------------------
app.get("/profile/:email", (req, res) => {
  const { email } = req.params;
  
  try {
    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove password from response
    const { password, ...userProfile } = user;
    res.json(userProfile);
  } catch (err) {
    console.error("Error reading users.json:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ----------------------
// Update User Profile route
// ----------------------
app.put("/profile/:email", (req, res) => {
  const { email } = req.params;
  const updates = req.body;
  
  try {
    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user data (exclude password and email)
    const { password, email: userEmail, ...allowedUpdates } = updates;
    users[userIndex] = { ...users[userIndex], ...allowedUpdates };
    
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
    
    const { password: _, ...updatedUser } = users[userIndex];
    res.json({ 
      message: "Profile updated successfully ✅", 
      user: updatedUser 
    });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ----------------------
// Admin Verification Page
// ----------------------
app.get("/admin-verification", (req, res) => {
  try {
    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);
    
    // Filter users who need verification
    const pendingUsers = users.filter(user => 
      user.verificationStatus !== 'verified' && 
      user.document && 
      user.faceImage
    );
    
    let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>HerWay Admin - Document Verification</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
            .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 30px; color: #ff6b9d; }
            .user-card { border: 1px solid #ddd; margin: 15px 0; padding: 20px; border-radius: 8px; background: #fafafa; }
            .user-info { display: flex; gap: 20px; margin-bottom: 15px; }
            .user-details { flex: 1; }
            .document-images { display: flex; gap: 15px; }
            .document-image { max-width: 200px; border: 1px solid #ccc; border-radius: 4px; }
            .verification-actions { margin-top: 15px; }
            .btn { padding: 8px 16px; margin: 5px; border: none; border-radius: 4px; cursor: pointer; }
            .btn-approve { background: #10b981; color: white; }
            .btn-reject { background: #ef4444; color: white; }
            .btn:hover { opacity: 0.8; }
            .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
            .status-pending { background: #fef3c7; color: #92400e; }
            .status-verified { background: #d1fae5; color: #065f46; }
            .status-rejected { background: #fee2e2; color: #991b1b; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🔒 HerWay Admin - Document Verification</h1>
                <p>Review and verify user documents for female verification</p>
            </div>
    `;
    
    if (pendingUsers.length === 0) {
      html += `<p style="text-align: center; color: #666;">No pending verifications at this time.</p>`;
    } else {
      pendingUsers.forEach(user => {
        const statusClass = user.verificationStatus === 'verified' ? 'status-verified' : 
                           user.verificationStatus === 'rejected' ? 'status-rejected' : 'status-pending';
        
        html += `
        <div class="user-card">
            <div class="user-info">
                <div class="user-details">
                    <h3>${user.name}</h3>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Phone:</strong> ${user.phone || 'Not provided'}</p>
                    <p><strong>DOB:</strong> ${user.dateOfBirth || 'Not provided'}</p>
                    <p><strong>Status:</strong> <span class="status ${statusClass}">${user.verificationStatus || 'pending'}</span></p>
                </div>
                <div class="document-images">
                    <div>
                        <h4>Face Photo</h4>
                        <img src="/uploads/faces/${user.faceImage}" alt="Face Photo" class="document-image" onerror="this.style.display='none'">
                    </div>
                    <div>
                        <h4>Document (Aadhaar)</h4>
                        <img src="/uploads/documents/${user.document}" alt="Document" class="document-image" onerror="this.style.display='none'">
                    </div>
                </div>
            </div>
            <div class="verification-actions">
                <button class="btn btn-approve" onclick="verifyUser('${user.email}', true)">✅ Approve</button>
                <button class="btn btn-reject" onclick="verifyUser('${user.email}', false)">❌ Reject</button>
            </div>
        </div>
        `;
      });
    }
    
    html += `
        </div>
        <script>
            async function verifyUser(email, isVerified) {
                const adminNotes = prompt('Add admin notes (optional):');
                
                try {
                    const response = await fetch('/manual-verify-document', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, isVerified, adminNotes })
                    });
                    
                    const result = await response.json();
                    alert(result.message);
                    location.reload();
                } catch (error) {
                    alert('Error updating verification: ' + error.message);
                }
            }
        </script>
    </body>
    </html>
    `;
    
    res.send(html);
  } catch (err) {
    console.error("Error loading admin page:", err);
    res.status(500).send("Error loading admin page");
  }
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// ----------------------
// Route Matching API Routes
// ----------------------

// Store user trip requests
app.post("/api/trip-request", (req, res) => {
  const { email, source, destination, date, time, preferences } = req.body;
  
  if (!email || !source || !destination || !date || !time) {
    return res.status(400).json({ error: "All required fields must be provided" });
  }

  try {
    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add trip request to user data
    const tripRequest = {
      id: Date.now(),
      source,
      destination,
      date,
      time,
      preferences: preferences || [],
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    if (!users[userIndex].tripRequests) {
      users[userIndex].tripRequests = [];
    }
    
    users[userIndex].tripRequests.push(tripRequest);
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
    
    res.json({ 
      message: "Trip request created successfully", 
      tripRequest 
    });
  } catch (err) {
    console.error("Error creating trip request:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get matching trip requests
app.post("/api/find-matches", (req, res) => {
  const { email, source, destination, date, time, maxDistance = 5, timeWindow = 15 } = req.body;
  
  if (!email || !source || !destination || !date || !time) {
    return res.status(400).json({ error: "All required fields must be provided" });
  }

  try {
    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);
    
    // Filter out the requesting user
    const otherUsers = users.filter(u => u.email !== email && u.tripRequests && u.tripRequests.length > 0);
    
    const matches = [];
    
    otherUsers.forEach(user => {
      user.tripRequests.forEach(trip => {
        if (trip.status !== 'active') return;
        
        // Calculate time difference
        const requestTime = new Date(`${date} ${time}`).getTime();
        const tripTime = new Date(`${trip.date} ${trip.time}`).getTime();
        const timeDiff = Math.abs(requestTime - tripTime) / (1000 * 60); // minutes
        
        // Check if within time window
        if (timeDiff <= timeWindow) {
          // Mock route matching calculation
          const routeMatch = Math.floor(Math.random() * 30) + 70; // 70-100%
          const distanceMatch = Math.random() * maxDistance; // 0-maxDistance km
          
          matches.push({
            userId: user.email,
            userName: user.name,
            userAge: user.age || 25,
            userRating: user.rating || 4.5,
            userProfileImage: user.faceImage,
            userVerified: user.verificationStatus === 'verified',
            userBio: user.bio || '',
            userPreferences: user.preferences || [],
            tripId: trip.id,
            source: trip.source,
            destination: trip.destination,
            date: trip.date,
            time: trip.time,
            routeMatch,
            timeMatch: Math.round(timeDiff),
            distanceMatch: Math.round(distanceMatch * 10) / 10,
            matchScore: Math.round((routeMatch + (100 - timeDiff * 2) + (100 - distanceMatch * 10)) / 3)
          });
        }
      });
    });
    
    // Sort by match score
    matches.sort((a, b) => b.matchScore - a.matchScore);
    
    res.json({ 
      matches,
      totalMatches: matches.length,
      searchCriteria: { source, destination, date, time, maxDistance, timeWindow }
    });
  } catch (err) {
    console.error("Error finding matches:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Send connection request
app.post("/api/send-request", (req, res) => {
  const { fromEmail, toEmail, tripId, message } = req.body;
  
  if (!fromEmail || !toEmail || !tripId) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  try {
    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);
    
    // Find both users
    const fromUser = users.find(u => u.email === fromEmail);
    const toUser = users.find(u => u.email === toEmail);
    
    if (!fromUser || !toUser) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Create connection request
    const request = {
      id: Date.now(),
      fromEmail,
      toEmail,
      fromName: fromUser.name,
      tripId,
      message: message || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    // Add to both users' connection requests
    if (!fromUser.connectionRequests) fromUser.connectionRequests = [];
    if (!toUser.connectionRequests) toUser.connectionRequests = [];
    
    fromUser.connectionRequests.push({ ...request, type: 'sent' });
    toUser.connectionRequests.push({ ...request, type: 'received' });
    
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
    
    res.json({ 
      message: "Connection request sent successfully", 
      request 
    });
  } catch (err) {
    console.error("Error sending request:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get user's connection requests
app.get("/api/connection-requests/:email", (req, res) => {
  const { email } = req.params;
  
  try {
    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json({ 
      connectionRequests: user.connectionRequests || [],
      sentRequests: user.connectionRequests?.filter(r => r.type === 'sent') || [],
      receivedRequests: user.connectionRequests?.filter(r => r.type === 'received') || []
    });
  } catch (err) {
    console.error("Error getting connection requests:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ----------------------
// Start server
// ----------------------
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
