import { NextResponse } from "next/server";
import Note from "@/models/Note";
import { connectToDatabase } from "@/lib/mongodb";

// Configuración de CORS
function createCORSHeaders() {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return headers;
}

export async function GET(req: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
    await connectToDatabase();

    const headers = createCORSHeaders();

    try {
        const note = await Note.findById(params.id);
        if (!note) return NextResponse.json({ message: 'Note not found' }, { status: 404, headers });

        return NextResponse.json(note, { headers });
    } catch (error) {
        return NextResponse.json({ message: `Error fetching note: ${error}` }, { status: 500, headers });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
    await connectToDatabase();

    const headers = createCORSHeaders();

    try {
        const { title, content, status, importance, dueDate, tags } = await req.json();

        const updatedNote = await Note.findByIdAndUpdate(
            params.id,
            { title, content, status, importance, dueDate, tags },
            { new: true }
        );

        if (!updatedNote) return NextResponse.json({ message: 'Note not found' }, { status: 404, headers });

        return NextResponse.json(updatedNote, { headers });
    } catch (error) {
        return NextResponse.json({ message: `Error updating note: ${error}` }, { status: 500, headers });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
    await connectToDatabase();

    const headers = createCORSHeaders();

    try {
        const deletedNote = await Note.findByIdAndDelete(params.id);
        if (!deletedNote) return NextResponse.json({ message: 'Note not found' }, { status: 404, headers });

        return NextResponse.json({ message: 'Note deleted successfully' }, { headers });
    } catch (error) {
        return NextResponse.json({ message: `Error deleting note: ${error}` }, { status: 500, headers });
    }
}
