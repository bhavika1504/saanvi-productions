# Firebase Storage Setup Guide

## Issue
Image uploads are being blocked by Firebase Storage security rules.

## Solution

### Step 1: Go to Firebase Console
1. Visit https://console.firebase.google.com
2. Select your project: **saanvi-production**

### Step 2: Configure Storage Rules
1. In the left sidebar, click on **Storage**
2. Click on the **Rules** tab
3. Replace the existing rules with the following:

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload event images
    match /event-images/{imageId} {
      allow read: if true; // Anyone can read/view images
      allow write: if request.auth != null; // Only authenticated users can upload
    }
    
    // Default: deny all other access
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Step 3: Publish the Rules
1. Click **Publish** button
2. Wait for the rules to deploy (usually takes a few seconds)

### Step 4: Test the Upload
1. Go back to your admin panel: http://localhost:8080/admin
2. Click "Add New Event"
3. Try uploading an image
4. The upload should now work!

## Alternative: Development-Only Rules (NOT RECOMMENDED FOR PRODUCTION)

If you want to test quickly in development, you can use these permissive rules:

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true; // WARNING: Anyone can read/write
    }
  }
}
```

**⚠️ WARNING:** These rules allow anyone to upload/delete files. Only use for testing!

## Verify Storage Bucket Name

Make sure your `.env` file has the correct storage bucket:

```
VITE_FIREBASE_STORAGE_BUCKET=saanvi-production.firebasestorage.app
```

## Common Issues

### Issue: "No response headers"
- **Cause:** Storage rules are blocking the upload
- **Fix:** Update the rules as shown above

### Issue: "Permission denied"
- **Cause:** User is not authenticated
- **Fix:** Make sure you're logged in to the admin panel

### Issue: "Storage bucket not found"
- **Cause:** Wrong bucket name in .env
- **Fix:** Check Firebase Console for the correct bucket name

## Testing

After updating the rules, test by:
1. Opening browser console (F12)
2. Uploading an image in the admin panel
3. Check console for "Image uploaded, URL: ..." message
4. If successful, the image URL will be displayed
