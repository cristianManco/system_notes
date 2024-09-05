import { connectToDatabase } from "@/lib/mongodb";
import Note from "@/models/Note";
import { NextResponse } from "next/server";


export async function POST(req: Request): Promise<NextResponse> {
    await connectToDatabase();

    try {
        const { title, content, status, importance, dueDate, tags } = await req.json();

        const newNote = new Note({
            title,
            content,
            status,
            importance,
            dueDate,
            tags,
        });

        await newNote.save();

        return NextResponse.json(newNote, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: `Error creating note: ${error}` }, { status: 500 });
    }
}


export async function GET(request: Request): Promise<NextResponse> {
    await connectToDatabase();

    const url =  new URL(request.url);
    const page =  parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    try {
        const notes = await Note.find({}).skip(skip).limit(limit);
        const totalNotes = await Note.countDocuments({});

        const totalPages =await Math.ceil(totalNotes / limit);

        if (notes.length === 0) {
            return NextResponse.json({ message: 'No notes found' });
        }

        return NextResponse.json({
            notes,
            currentPage: page,
            totalPages,
        });
    } catch (error) {
        return NextResponse.json({ message: `Error fetching notes: ${error}` }, { status: 500 });
    }
}

