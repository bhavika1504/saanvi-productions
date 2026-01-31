import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    serverTimestamp,
    deleteDoc,
    doc
} from "firebase/firestore";
import { db } from "./firebase";

export interface Submission {
    id?: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    status: 'new' | 'read' | 'contacted';
    createdAt: any;
    // Casting form specific fields
    type?: 'contact' | 'casting';
    service?: string; // For casting applications
    age?: string;
    gender?: string;
    category?: string;
    introduction?: string;
    photos?: string[]; // URLs of uploaded photos
}

const SUBMISSIONS_COLLECTION = "submissions";

export const submissionsService = {
    // Submit a new contact form
    async addSubmission(data: Omit<Submission, "id" | "status" | "createdAt">): Promise<string> {
        const docRef = await addDoc(collection(db, SUBMISSIONS_COLLECTION), {
            ...data,
            status: 'new',
            createdAt: serverTimestamp()
        });
        return docRef.id;
    },

    // Submit a casting application
    async addCastingApplication(data: {
        name: string;
        email: string;
        phone: string;
        service: string;
        age: string;
        gender: string;
        category: string;
        introduction?: string;
        photos: string[]; // URLs of uploaded photos
    }): Promise<string> {
        const docRef = await addDoc(collection(db, SUBMISSIONS_COLLECTION), {
            ...data,
            type: 'casting',
            message: `Casting application for ${data.service}. Age: ${data.age}, Gender: ${data.gender}, Category: ${data.category}. ${data.introduction || ''}`,
            status: 'new',
            createdAt: serverTimestamp()
        });
        return docRef.id;
    },

    // Get all submissions for Admin
    async getAllSubmissions(): Promise<Submission[]> {
        const q = query(collection(db, SUBMISSIONS_COLLECTION), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Submission[];
    },

    // Delete a submission
    async deleteSubmission(id: string): Promise<void> {
        const docRef = doc(db, SUBMISSIONS_COLLECTION, id);
        await deleteDoc(docRef);
    }
};
