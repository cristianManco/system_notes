export interface Note {
    id?: number;
    title: string;
    content: string;
    status: 'pending' | 'completed' | 'archived';
    importance: 'low' | 'medium' | 'high';
    createdAt: Date;
    dueDate?: Date;
    updatedAt?: Date;
    tags?: string[];
}