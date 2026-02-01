import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Upload,
    Loader2,
    Calendar,
    MapPin,
    Tag,
    Plus,
    Clock,
    DollarSign,
    Users,
    Trash2,
    Star,
    Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Event, eventsService } from '@/lib/eventsService';

interface EventFormProps {
    event?: Event | null;
    onClose: () => void;
    onSuccess: () => void;
}

export function EventForm({ event, onClose, onSuccess }: EventFormProps) {
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>(event?.image || '');

    const initialState = {
        title: event?.title || '',
        subtitle: event?.subtitle || '',
        description: event?.description || '',
        date: event?.date || '',
        time: event?.time || '',
        location: event?.location || '',
        image: event?.image || '',
        category: (event?.category as any) || 'Workshop',
        level: event?.level || 'Beginner',
        duration: event?.duration || '',
        participants: event?.participants || '',
        price: event?.price || '',
        originalPrice: event?.originalPrice || '',
        highlights: event?.highlights || [],
        instructor: event?.instructor || '',
        rating: event?.rating || 5.0,
        reviews: event?.reviews || 0,
        prizes: event?.prizes || [],
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value // Always store as string in formData for input values
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size must be less than 5MB');
                return;
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload an image file');
                return;
            }

            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            toast.success('Image selected! Click "Add Event" to upload.');
        }
    };

    const handleArrayChange = (field: 'highlights' | 'prizes', index: number, value: string) => {
        const newArray = [...(formData[field] || [])];
        newArray[index] = value;
        setFormData(prev => ({ ...prev, [field]: newArray }));
    };

    const addArrayItem = (field: 'highlights' | 'prizes') => {
        setFormData(prev => ({ ...prev, [field]: [...(prev[field] || []), ''] }));
    };

    const removeArrayItem = (field: 'highlights' | 'prizes', index: number) => {
        const newArray = (formData[field] || []).filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, [field]: newArray }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting Event Data:", formData);
        setLoading(true);

        try {
            let imageUrl = formData.image;
            if (imageFile) {
                console.log("Uploading image to Cloudinary...");
                toast.loading('Uploading image...', { id: 'image-upload' });
                try {
                    imageUrl = await eventsService.uploadEventImage(imageFile);
                    console.log("Image uploaded to Cloudinary, URL:", imageUrl);
                    toast.success('Image uploaded successfully!', { id: 'image-upload' });
                } catch (uploadError: any) {
                    console.error("Image upload error:", uploadError);
                    toast.error('Image upload failed: ' + uploadError.message, { id: 'image-upload' });
                    throw uploadError;
                }
            }

            // Parse numbers before saving
            const finalData = {
                ...formData,
                image: imageUrl,
                rating: parseFloat(formData.rating as any) || 0,
                reviews: parseInt(formData.reviews as any) || 0
            };
            console.log("Final data for API call:", finalData);

            if (event?.id) {
                console.log("Updating existing event:", event.id);
                await eventsService.updateEvent(event.id, finalData);
                toast.success('Event updated successfully');
                console.log("Event updated successfully.");
            } else {
                console.log("Adding new event...");
                await eventsService.addEvent(finalData);
                toast.success('New event added successfully!');
                console.log("New event added successfully.");
            }
            console.log("Submission successful, calling onSuccess");
            onSuccess();
        } catch (error: any) {
            console.error("Submission Error:", error);
            toast.error('Event Error: ' + error.message);
        } finally {
            setLoading(false);
            console.log("Submission process finished.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}

          className="w-full max-h-[95vh] bg-zinc-950 border border-zinc-800 rounded-2xl sm:rounded-3xl md:rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex flex-col"
            onClick={(e) => e.stopPropagation()}
            >


            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 md:p-8 bg-zinc-900 border-b border-zinc-800 shrink-0">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="p-2 sm:p-2.5 bg-cta/10 rounded-xl border border-cta/20 shrink-0">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-cta" />
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-display tracking-tight text-white uppercase truncate">
                            {event ? 'Edit Event' : 'New Event'}
                        </h2>
                        <p className="text-zinc-500 text-[10px] sm:text-xs mt-0.5 hidden sm:block">EVENT STATUS: {event ? 'UPDATING' : 'READY TO POST'}</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white shrink-0"
                >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8 lg:p-10 touch-pan-y overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
                <form id="production-form" onSubmit={handleSubmit} className="space-y-8 sm:space-y-10 md:space-y-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">

                        {/* Column 1: Media & Technicals */}
                        <div className="space-y-6 sm:space-y-8 md:space-y-10">
                            {/* Poster Upload */}
                            <div className="space-y-4">
                                <Label className="text-zinc-400 font-black uppercase text-[11px] tracking-widest block pl-1">
                                    Visual Assets/Poster
                                </Label>
                                <div className="relative group aspect-[11/14] max-w-[320px] mx-auto lg:mx-0 rounded-[2rem] overflow-hidden border-2 border-dashed border-zinc-800 hover:border-cta/40 transition-all duration-500 bg-zinc-900/50 shadow-inner flex flex-col items-center justify-center">
                                    {imagePreview ? (
                                        <>
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="text-center text-white">
                                                    <Upload className="w-8 h-8 mx-auto mb-2" />
                                                    <p className="text-xs font-bold uppercase">Change Image</p>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center p-8 space-y-4 pointer-events-none">
                                            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto group-hover:bg-cta/20 transition-colors">
                                                <Upload className="w-8 h-8 text-zinc-600 group-hover:text-cta" />
                                            </div>
                                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">Upload Asset</p>
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleImageChange} 
                                        className="absolute inset-0 opacity-0 cursor-pointer z-20 w-full h-full"
                                        title="Upload image"
                                    />
                                </div>
                            </div>

                            {/* Technical Specs */}
                            <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl space-y-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-500 uppercase block pl-1">Category</Label>
                                        <Select value={formData.category} onValueChange={(val) => setFormData(p => ({ ...p, category: val as any }))}>
                                            <SelectTrigger className="bg-zinc-900 border-zinc-800 h-12 rounded-xl text-white">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                <SelectItem value="Workshop">Workshop</SelectItem>
                                                <SelectItem value="Talent Hunt">Talent Hunt</SelectItem>
                                                <SelectItem value="Production">Production</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-500 uppercase block pl-1">Level</Label>
                                        <Select value={formData.level} onValueChange={(val) => setFormData(p => ({ ...p, level: val }))}>
                                            <SelectTrigger className="bg-zinc-900 border-zinc-800 h-12 rounded-xl text-white">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                <SelectItem value="Beginner">Beginner</SelectItem>
                                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                                <SelectItem value="Advanced Pro">Advanced Pro</SelectItem>
                                                <SelectItem value="All Levels">All Levels</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 pl-1">
                                            <Clock className="w-3 h-3 text-cta" /> Duration
                                        </Label>
                                        <Input name="duration" value={formData.duration} onChange={handleChange} placeholder="6 hours" className="bg-zinc-900 border-zinc-800 h-12 rounded-xl text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 pl-1">
                                            <Users className="w-3 h-3 text-cta" /> Capacity
                                        </Label>
                                        <Input name="participants" value={formData.participants} onChange={handleChange} placeholder="e.g. 50 Participants" className="bg-zinc-900 border-zinc-800 h-12 rounded-xl text-white" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 pl-1">
                                            <Star className="w-3 h-3 text-amber-500" /> Rating
                                        </Label>
                                        <Input name="rating" type="number" step="0.1" min="0" max="5" value={formData.rating} onChange={handleChange} className="bg-zinc-900 border-zinc-800 h-12 rounded-xl font-bold text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 pl-1">
                                            <Award className="w-3 h-3 text-cta" /> Reviews Count
                                        </Label>
                                        <Input name="reviews" type="number" value={formData.reviews} onChange={handleChange} className="bg-zinc-900 border-zinc-800 h-12 rounded-xl text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Content & Logistics */}
                        <div className="space-y-6 sm:space-y-8 md:space-y-10">
                            {/* Primary Info */}
                            <div className="space-y-6">
                                <div className="relative group">
                                    <Label className="absolute -top-3 left-4 bg-zinc-950 px-2 text-[10px] font-black text-cta uppercase z-10 transition-colors group-focus-within:text-white">
                                        Event Title
                                    </Label>
                                    <Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Acting Workshop" className="bg-transparent border-2 border-zinc-800 h-16 rounded-2xl px-6 text-xl font-bold uppercase tracking-tight focus:border-cta transition-all text-white" required />
                                </div>
                                <div className="relative group">
                                    <Label className="absolute -top-3 left-4 bg-zinc-950 px-2 text-[10px] font-bold text-zinc-500 uppercase z-10 group-focus-within:text-cta transition-colors">
                                        Subtitle / Short Description
                                    </Label>
                                    <Input name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="A short tagline for the event" className="bg-transparent border-2 border-zinc-800 h-14 rounded-2xl px-6 text-white focus:border-cta transition-all" />
                                </div>
                                <div className="relative group">
                                    <Label className="absolute -top-3 left-4 bg-zinc-950 px-2 text-[10px] font-bold text-zinc-500 uppercase z-10 group-focus-within:text-cta transition-colors">
                                        Speaker / Instructor (Optional)
                                    </Label>
                                    <Input name="instructor" value={formData.instructor} onChange={handleChange} placeholder="Name of the lead" className="bg-transparent border-2 border-zinc-800 h-14 rounded-2xl px-6 text-white focus:border-cta transition-all" />
                                </div>
                            </div>

                            {/* Logistics */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 pl-1">
                                        <Calendar className="w-3 h-3 text-cta" /> Event Date
                                    </Label>
                                    <Input name="date" value={formData.date} onChange={handleChange} placeholder="Feb 15, 2024" className="bg-zinc-900 border-zinc-800 h-12 rounded-xl text-white" required />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 pl-1">
                                        <Clock className="w-3 h-3 text-cta" /> Specific Time
                                    </Label>
                                    <Input name="time" value={formData.time} onChange={handleChange} placeholder="10:00 AM - 4:00 PM" className="bg-zinc-900 border-zinc-800 h-12 rounded-xl text-white" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 pl-1">
                                    <MapPin className="w-3 h-3 text-cta" /> Event Venue
                                </Label>
                                <Input name="location" value={formData.location} onChange={handleChange} placeholder="e.g. West Gate Business Bay" className="bg-zinc-900 border-zinc-800 h-12 rounded-xl text-white" required />
                            </div>

                            {/* Pricing */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 pl-1">
                                        <DollarSign className="w-3 h-3 text-cta" /> Price (Display)
                                    </Label>
                                    <Input name="price" value={formData.price} onChange={handleChange} placeholder="₹2,999" className="bg-zinc-900 border-zinc-800 h-12 rounded-xl font-bold text-white" required />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black text-zinc-500 uppercase flex items-center gap-2 pl-1">
                                        <Tag className="w-3 h-3 text-zinc-600" /> Original Price
                                    </Label>
                                    <Input name="originalPrice" value={formData.originalPrice} onChange={handleChange} placeholder="₹4,999" className="bg-zinc-900 border-zinc-800 h-12 rounded-xl text-white" />
                                </div>
                            </div>

                            {/* Lists: Highlights & Prizes */}
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-[11px] font-black text-white uppercase tracking-widest pl-1">Highlights</Label>
                                        <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('highlights')} className="h-7 text-[9px] bg-cta/10 border-cta/20 text-cta hover:bg-cta hover:text-white rounded-full">
                                            <Plus className="w-3 h-3 mr-1" /> ADD POINT
                                        </Button>
                                    </div>
                                    <div className="space-y-3">
                                        {formData.highlights?.map((h, i) => (
                                            <div key={i} className="flex gap-2">
                                                <Input value={h} onChange={(e) => handleArrayChange('highlights', i, e.target.value)} placeholder="Point Description..." className="bg-zinc-900 text-white border-zinc-800 h-12 rounded-xl" />
                                                <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('highlights', i)} className="shrink-0 text-white hover:text-destructive">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-[11px] font-black text-white uppercase tracking-widest pl-1">Prizes/Perks</Label>
                                        <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('prizes')} className="h-7 text-[9px] bg-cta/10 border-cta/20 text-cta hover:bg-cta hover:text-white rounded-full">
                                            <Plus className="w-3 h-3 mr-1" /> ADD PERK
                                        </Button>
                                    </div>
                                    <div className="space-y-3">
                                        {formData.prizes?.map((p, i) => (
                                            <div key={i} className="flex gap-2">
                                                <Input value={p} onChange={(e) => handleArrayChange('prizes', i, e.target.value)} placeholder="Perk details..." className="bg-zinc-900 text-white border-zinc-800 h-12 rounded-xl" />
                                                <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('prizes', i)} className="shrink-0 text-white hover:text-destructive">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black text-white uppercase pl-1">Full Description</Label>
                                <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter full production details..." className="bg-zinc-900 text-white border-zinc-800 min-h-[150px] rounded-2xl p-6 italic" required />
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 z-30 p-4 sm:p-6 bg-zinc-950 border-t border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                <div className="text-[10px] font-bold text-zinc-500 uppercase hidden sm:block">SYSTEM READY</div>
                <div className="flex gap-3 sm:gap-4 w-full sm:w-auto">
                    <Button variant="ghost" onClick={onClose} disabled={loading} className="h-11 sm:h-12 px-6 sm:px-8 rounded-xl font-bold text-zinc-500 flex-1 sm:flex-none">CANCEL</Button>
                    <Button form="production-form" type="submit" disabled={loading} className="h-11 sm:h-12 min-w-[140px] sm:min-w-[180px] bg-cta hover:bg-cta/90 text-white rounded-xl font-bold flex-1 sm:flex-none">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (event ? 'UPDATE EVENT' : 'ADD EVENT')}
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}