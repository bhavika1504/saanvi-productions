import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    Timestamp,
    serverTimestamp
} from "firebase/firestore";
import { db } from "./firebase";
import { cloudinaryService } from "./cloudinaryService";

export interface Event {
    id?: string;
    title: string;
    subtitle: string;
    description: string;
    date: string;
    time: string;
    location: string;
    image: string; // Now stores Cloudinary URL
    category: "Workshop" | "Talent Hunt" | "Production";
    level?: string;
    duration?: string;
    participants?: string;
    price: string;
    originalPrice?: string;
    highlights?: string[];
    instructor?: string;
    rating?: number;
    reviews?: number;
    prizes?: string[];
    createdAt?: any;
    updatedAt?: any;
}

const EVENTS_COLLECTION = "events";

export const eventsService = {
    // Get all events
    async getAllEvents(): Promise<Event[]> {
        const q = query(collection(db, EVENTS_COLLECTION), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Event[];
    },

    // Add a new event
    async addEvent(event: Omit<Event, "id">): Promise<string> {
        const docRef = await addDoc(collection(db, EVENTS_COLLECTION), {
            ...event,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return docRef.id;
    },

    // Update an event
    async updateEvent(id: string, event: Partial<Event>): Promise<void> {
        const docRef = doc(db, EVENTS_COLLECTION, id);
        await updateDoc(docRef, {
            ...event,
            updatedAt: serverTimestamp()
        });
    },

    // Delete an event
    async deleteEvent(id: string): Promise<void> {
        const docRef = doc(db, EVENTS_COLLECTION, id);
        await deleteDoc(docRef);
    },

    // Upload event image to Cloudinary
    async uploadEventImage(file: File): Promise<string> {
        return await cloudinaryService.uploadEventImage(file);
    },

    // Upload casting application photos to Cloudinary
    async uploadCastingPhoto(file: File): Promise<string> {
        return await cloudinaryService.uploadCastingPhoto(file);
    }
};
