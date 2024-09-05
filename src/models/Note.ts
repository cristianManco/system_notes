// models/Note.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
    title: string;
    content: string;
    status: 'pending' | 'completed' | 'archived';
    importance: 'low' | 'medium' | 'high';
    createdAt: Date;
    dueDate?: Date;
    updatedAt?: Date;
    tags?: string[];
}

const NoteSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'archived'], default: 'pending' },
    importance: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    createdAt: { type: Date, default: Date.now },
    dueDate: { type: Date },
    updatedAt: { type: Date, default: Date.now },
    tags: { type: [String] },
});

export default mongoose.models.Note || mongoose.model<INote>('Note', NoteSchema);
