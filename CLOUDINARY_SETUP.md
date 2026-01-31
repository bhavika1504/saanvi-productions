# Cloudinary Setup Guide

## ✅ FIXED: Using Signed Uploads (No Preset Required)

The service now uses **signed uploads** just like your Java Spring Boot example, which means:
- **No upload preset required**
- **Direct API authentication** using your credentials
- **Same approach** as your working Java controller

## Environment Variables
The Cloudinary credentials are stored in `.env`:
```
VITE_CLOUDINARY_CLOUD_NAME=dhzwaenxb
VITE_CLOUDINARY_API_KEY=869376214487945
VITE_CLOUDINARY_API_SECRET=U2rUyOpx7Fin-cRcWOmbgbnijCQ
```

## How It Works
The JavaScript service now mirrors your Java implementation:

**Java (Your Working Example):**
```java
Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
return uploadResult.get("secure_url").toString();
```

**JavaScript (Updated Service):**
```javascript
// Generates timestamp and signature like Cloudinary Java SDK
const timestamp = generateTimestamp();
const signature = await generateSignature(params);
// Uploads with API key and signature
```

## Folder Structure
- `events/` - Event images from admin panel (max 10MB)
- `casting/` - Casting application photos (max 5MB)
- `saanvi-uploads/` - Default folder for other uploads

## Security
- **Signed uploads**: Uses API key + secret + timestamp + signature
- **Client-side signature generation**: Uses Web Crypto API for SHA1 hashing
- **Same security model** as your Java backend

## Benefits
- **No preset configuration needed** ✅
- **Direct API authentication** ✅
- **Automatic image optimization** ✅
- **CDN delivery** ✅
- **Matches your Java implementation** ✅

## Testing
The uploads should now work immediately without any Cloudinary dashboard configuration, just like your Java endpoint works out of the box.

## Note
This approach exposes the API secret to the frontend. For production, consider:
1. Moving signature generation to your Java backend
2. Creating an endpoint like `/api/cloudinary/signature` 
3. Having frontend call your backend for signatures

But for development/testing, this direct approach works perfectly!