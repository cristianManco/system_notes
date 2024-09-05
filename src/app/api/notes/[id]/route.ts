import { NextResponse } from "next/server";
import Note from "@/models/Note";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
    await connectToDatabase();


    try {
        const note = await Note.findById(params.id);
        if (!note) return NextResponse.json({ message: 'Note not found' }, { status: 404 });

        return NextResponse.json(note);
    } catch (error) {
        return NextResponse.json({ message: `Error fetching note: ${error}` }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
    await connectToDatabase();

    try {
        const { title, content, status, importance, dueDate, tags } = await req.json();

        const updatedNote = await Note.findByIdAndUpdate(
            params.id,
            { title, content, status, importance, dueDate, tags },
            { new: true }
        );

        if (!updatedNote) return NextResponse.json({ message: 'Note not found' }, { status: 404 });

        return NextResponse.json(updatedNote);
    } catch (error) {
        return NextResponse.json({ message: `Error updating note: ${error}` }, { status: 500 });
    }
}


export async function DELETE(req: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
    await connectToDatabase();

    try {
        const deletedNote = await Note.findByIdAndDelete(params.id);
        if (!deletedNote) return NextResponse.json({ message: 'Note not found' }, { status: 404 });

        return NextResponse.json({ message: 'Note deleted successfully' });
    } catch (error) {
        return NextResponse.json({ message: `Error deleting note: ${error}` }, { status: 500 });
    }
}
