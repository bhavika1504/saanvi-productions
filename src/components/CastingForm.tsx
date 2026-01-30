import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Camera, Upload, Check, Loader2 } from 'lucide-react';
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

interface FormData {
  fullName: string;
  age: string;
  category: string;
  phone: string;
  email: string;
  introduction: string;
  photos: File[];
}

export function CastingForm() {
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
    const allPhotos = [...formData.photos, ...newPhotos].slice(0, 3);

    setFormData((prev) => ({ ...prev, photos: allPhotos }));

    // Create previews
    const newPreviews = allPhotos.map((file) => URL.createObjectURL(file));
    setPhotosPreviews(newPreviews);
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

    // Simulate API call - will be replaced with actual Firestore submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Application submitted successfully!');
  };

  if (isSubmitted) {
    return (
      <section id="casting" className="py-24 bg-primary relative overflow-hidden">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center py-16"
          >
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-accent-foreground" />
            </div>
            <h2 className="font-display text-4xl font-bold text-primary-foreground mb-4">
              Application Submitted!
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Thank you for applying to Saanvi Films & Production. We'll review your
              application and get back to you within 48 hours.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false);
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
              }}
              className="bg-cta hover:bg-cta/90 text-cta-foreground transition-all duration-300"
            >
              Submit Another Application
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="casting" className="py-24 bg-primary relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cta/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="section-container relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-cta bg-cta/20 rounded-full mb-4">
            🎬 Apply Now
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground mb-4">
            Start Your <span className="text-cta">Journey</span> Today
          </h2>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Fill out the form below to apply for auditions. We welcome fresh talent
            of all ages from 1-40 years.
          </p>
        </motion.div>

        {/* Form - Casting Board Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="max-w-3xl mx-auto"
        >
          {/* Casting Board Container */}
          <div className="casting-board p-4 md:p-6">
            {/* Paper/Form inside the board */}
            <form onSubmit={handleSubmit} className="casting-paper p-8 md:p-12">
              {/* Form Header - like a casting sheet */}
              <div className="text-center mb-8 pb-6 border-b-2 border-dashed border-amber-200">
                <h3 className="font-display text-2xl font-bold text-amber-900">CASTING APPLICATION</h3>
                <p className="text-amber-700 text-sm mt-1">Saanvi Films & Production</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-amber-900 font-semibold flex items-center gap-2">
                    <User className="w-4 h-4 text-cta" />
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="bg-white/80 border-amber-300 focus:border-cta focus:ring-cta text-amber-900 placeholder:text-amber-400"
                    required
                  />
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-amber-900 font-semibold">
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
                    className="bg-white/80 border-amber-300 focus:border-cta focus:ring-cta text-amber-900 placeholder:text-amber-400"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-amber-900 font-semibold">
                    Category *
                  </Label>
                  <Select onValueChange={handleCategoryChange} value={formData.category}>
                    <SelectTrigger className="bg-white/80 border-amber-300 focus:border-cta focus:ring-cta text-amber-900">
                      <SelectValue placeholder="Select category" />
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
                  <Label htmlFor="phone" className="text-amber-900 font-semibold flex items-center gap-2">
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
                    className="bg-white/80 border-amber-300 focus:border-cta focus:ring-cta text-amber-900 placeholder:text-amber-400"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email" className="text-amber-900 font-semibold flex items-center gap-2">
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
                    className="bg-white/80 border-amber-300 focus:border-cta focus:ring-cta text-amber-900 placeholder:text-amber-400"
                    required
                  />
                </div>

                {/* Photo Upload */}
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-amber-900 font-semibold flex items-center gap-2">
                    <Camera className="w-4 h-4 text-cta" />
                    Upload Photos (up to 3) *
                  </Label>
                  <div className="flex flex-wrap gap-4">
                    {photosPreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg border-2 border-amber-300 shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {formData.photos.length < 3 && (
                      <label className="w-24 h-24 border-2 border-dashed border-amber-400 hover:border-cta rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 bg-white/50">
                        <Upload className="w-6 h-6 text-amber-600 mb-1" />
                        <span className="text-xs text-amber-600">Add Photo</span>
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
                  <p className="text-xs text-amber-600">
                    Upload clear, recent photos. At least one photo is required.
                  </p>
                </div>

                {/* Introduction */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="introduction" className="text-amber-900 font-semibold">
                    Short Introduction / Notes
                  </Label>
                  <Textarea
                    id="introduction"
                    name="introduction"
                    value={formData.introduction}
                    onChange={handleInputChange}
                    placeholder="Tell us a bit about yourself, your interests, and why you want to pursue acting..."
                    className="bg-white/80 border-amber-300 focus:border-cta focus:ring-cta min-h-[120px] text-amber-900 placeholder:text-amber-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 text-center pt-6 border-t-2 border-dashed border-amber-200">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-cta hover:bg-cta/90 text-cta-foreground text-lg px-12 py-6 rounded-xl cta-glow disabled:opacity-50 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
                <p className="text-sm text-amber-600 mt-4">
                  By submitting, you agree to our terms and conditions.
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
