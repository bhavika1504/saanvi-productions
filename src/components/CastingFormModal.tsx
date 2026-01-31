import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, Camera, Upload, Check, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { submissionsService } from '@/lib/submissionsService';
import { eventsService } from '@/lib/eventsService';

interface FormData {
  fullName: string;
  age: string;
  category: string;
  phone: string;
  email: string;
  introduction: string;
  photos: File[];
}

interface CastingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: string;
}

export function CastingFormModal({ isOpen, onClose, selectedService }: CastingFormModalProps) {
  // shared class to force black text and readable placeholders
  const INPUT_TEXT_CLASS = 'text-black placeholder:text-gray-500';

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    age: '',
    category: '',
    phone: '',
    email: '',
    introduction: '',
    photos: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [photosPreviews, setPhotosPreviews] = useState<string[]>([]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos = Array.from(files).slice(0, 3 - formData.photos.length);
    
    // Validate each file
    for (const file of newPhotos) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Maximum size is 5MB.`);
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file.`);
        return;
      }
    }

    const allPhotos = [...formData.photos, ...newPhotos].slice(0, 3);
    setFormData((prev) => ({ ...prev, photos: allPhotos }));

    // Create previews
    const newPreviews = allPhotos.map((file) => URL.createObjectURL(file));
    setPhotosPreviews(newPreviews);
    
    toast.success(`${newPhotos.length} photo(s) selected successfully!`);
  };

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    const newPreviews = photosPreviews.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, photos: newPhotos }));
    setPhotosPreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName || !formData.age || !formData.category || !formData.phone || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.photos.length === 0) {
      toast.error('Please upload at least one photo');
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload photos to Cloudinary
      toast.loading('Uploading photos...', { id: 'photo-upload' });
      const photoUrls: string[] = [];
      
      for (const photo of formData.photos) {
        try {
          const url = await eventsService.uploadCastingPhoto(photo);
          photoUrls.push(url);
        } catch (error) {
          console.error('Photo upload error:', error);
          toast.error('Failed to upload one or more photos');
          setIsSubmitting(false);
          return;
        }
      }
      
      toast.success('Photos uploaded successfully!', { id: 'photo-upload' });

      // Submit casting application to Firestore
      toast.loading('Submitting application...', { id: 'submit' });
      
      await submissionsService.addCastingApplication({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        service: selectedService,
        age: formData.age,
        category: formData.category,
        introduction: formData.introduction,
        photos: photoUrls
      });

      toast.success('Application submitted successfully!', { id: 'submit' });
      setIsSubmitted(true);
      
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error('Failed to submit application: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      age: '',
      category: '',
      phone: '',
      email: '',
      introduction: '',
      photos: [],
    });
    setPhotosPreviews([]);
    setIsSubmitted(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (isSubmitted) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={handleClose}
            />
            <div className="fixed inset-0 z-[51] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-xl p-8 max-w-md w-full text-center relative pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="font-display text-2xl font-bold text-black mb-2">
                  Application Submitted!
                </h3>
                
                <p className="text-black mb-6">
                  Thank you for applying for {selectedService}. We'll review your application and get back to you within 48 hours.
                </p>
                
                <Button
                  onClick={handleClose}
                  className="w-full bg-cta hover:bg-cta/90 text-cta-foreground"
                >
                  Close
                </Button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />
          <div className="fixed inset-0 z-[51] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
            {/* Header */}
            <div className="bg-card border-b border-border p-6 shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold text-black">
                    Apply for {selectedService}
                  </h2>
                  <p className="text-sm text-black">
                    Fill out the form below to submit your application
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form - Scrollable */}
<div
  className="flex-1 overflow-y-auto p-6 overscroll-contain"
  onWheel={(e) => e.stopPropagation()}
>

              <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-black font-medium flex items-center gap-2">
                    <User className="w-4 h-4 text-cta" />
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`border-border focus:border-cta focus:ring-cta ${INPUT_TEXT_CLASS}`}
                    required
                  />
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-black font-medium">
                    Age *
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    min="1"
                    max="40"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Your age (1-40)"
                    className={`border-border focus:border-cta focus:ring-cta ${INPUT_TEXT_CLASS}`}
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-black font-medium">
                    Category *
                  </Label>
                  <Select onValueChange={handleCategoryChange} value={formData.category}>
                    <SelectTrigger className={`border-border focus:border-cta focus:ring-cta ${INPUT_TEXT_CLASS}`}>
                      <SelectValue placeholder="Select category" className="text-gray-500" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kid">Kid (1-12 years)</SelectItem>
                      <SelectItem value="male">Male (13-40 years)</SelectItem>
                      <SelectItem value="female">Female (13-40 years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-black font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4 text-cta" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    className={`border-border focus:border-cta focus:ring-cta ${INPUT_TEXT_CLASS}`}
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email" className="text-black font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cta" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className={`border-border focus:border-cta focus:ring-cta ${INPUT_TEXT_CLASS}`}
                    required
                  />
                </div>

                {/* Photo Upload */}
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-black font-medium flex items-center gap-2">
                    <Camera className="w-4 h-4 text-cta" />
                    Upload Photos (up to 3) *
                  </Label>
                  <div className="flex flex-wrap gap-4">
                    {photosPreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg border-2 border-border"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {formData.photos.length < 3 && (
                      <label className="w-20 h-20 border-2 border-dashed border-border hover:border-cta rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors">
                        <Upload className="w-5 h-5 text-black mb-1" />
                        <span className="text-xs text-black">Add</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          multiple
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-black">
                    Upload clear, recent photos. At least one photo is required.
                  </p>
                </div>

                {/* Introduction */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="introduction" className="text-black font-medium">
                    Short Introduction / Notes
                  </Label>
                  <Textarea
                    id="introduction"
                    name="introduction"
                    value={formData.introduction}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself, your interests, and why you want to pursue this opportunity..."
                    className={`border-border focus:border-cta focus:ring-cta min-h-[100px] ${INPUT_TEXT_CLASS}`}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-black pt-6 border-t border-border">
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-cta hover:bg-cta/90 text-cta-foreground"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </Button>
                </div>
                <p className="text-xs text-black mt-4 text-center">
                  By submitting, you agree to our terms and conditions.
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  )}
</AnimatePresence>
  );
}
