// Cloudinary service for image uploads (matching Java Spring Boot implementation)
export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
}

export const cloudinaryService = {
  // Cloudinary configuration from environment variables
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
  apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET,

  // Generate timestamp for signed uploads
  generateTimestamp(): number {
    return Math.round(new Date().getTime() / 1000);
  },

  // Generate SHA1 signature for Cloudinary (simplified client-side version)
  async generateSignature(params: Record<string, any>): Promise<string> {
    // Sort parameters
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    
    const stringToSign = `${sortedParams}${this.apiSecret}`;
    
    // Use Web Crypto API to generate SHA1 hash
    const encoder = new TextEncoder();
    const data = encoder.encode(stringToSign);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  },

  // Upload image to Cloudinary using signed upload (like Java example)
  async uploadImage(file: File, folder: string = 'saanvi-uploads'): Promise<string> {
    try {
      const timestamp = this.generateTimestamp();
      
      // Parameters for signature generation
      const params = {
        timestamp: timestamp,
        folder: folder
      };
      
      // Generate signature
      const signature = await this.generateSignature(params);
      
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('timestamp', timestamp.toString());
      formData.append('folder', folder);
      formData.append('api_key', this.apiKey);
      formData.append('signature', signature);
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Upload failed: ${errorData.error?.message || response.statusText}`);
      }

      const result: CloudinaryUploadResult = await response.json();
      return result.secure_url;
      
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw new Error('Failed to upload image to Cloudinary');
    }
  },

  // Upload event image
  async uploadEventImage(file: File): Promise<string> {
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('Image size must be less than 10MB');
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Please upload an image file');
    }

    return await this.uploadImage(file, 'events');
  },

  // Upload casting photo
  async uploadCastingPhoto(file: File): Promise<string> {
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Photo size must be less than 5MB');
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Please upload an image file');
    }

    return await this.uploadImage(file, 'casting');
  },

  // Delete image from Cloudinary (optional)
  async deleteImage(publicId: string): Promise<void> {
    try {
      // This would require server-side implementation due to API secret
      // For now, we'll just log it
      console.log('Image deletion requested for:', publicId);
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  }
};