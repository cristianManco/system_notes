"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiTrash2, FiEdit3, FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Sidebar from "@/menu/Sidebar";

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
    const [totalPages, setTotalPages] = useState(1); // Estado para el total de páginas
    const router = useRouter();

    // Método para obtener las notas con paginación
    const fetchNotes = async (page = 1) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/notes?page=${page}&limit=6`);
            const { notes, totalPages } = response.data;
            setNotes(notes);
            setTotalPages(totalPages); // Establece el total de páginas desde la API
            setCurrentPage(page); // Establece la página actual
        } catch (error) {
            console.error("Error fetching notes:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes(currentPage); // Obtiene las notas en la página actual
    }, [currentPage]);

    const deleteNote = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/api/notes/${id}`);
            setNotes(notes.filter((note) => note._id !== id)); // se usa _id para filtrar
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex min-h-screen">
            <Sidebar className="fixed top-0 left-0 h-screen w-16 bg-gray-800" />
            <div className="ml-16 p-8 w-full overflow-x-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-4xl font-bold shadow-red-500">📚 Your Notes</h2>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="🔍 Search notes..."
                            className="border-2 border-gray-300 p-2 py-3 rounded-md focus:outline-none focus:border-blue-500 mr-2"
                        />
                        <FiSearch size={24} className="text-gray-600" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        <p>Loading notes...</p>
                    ) : filteredNotes.length === 0 ? (
                        <p>No notes found</p>
                    ) : (
                        filteredNotes.map((note) => (
                            <div
                                key={note._id}
                                className="bg-slate-200 p-4 rounded-xl shadow-md hover:shadow-black transition-shadow duration-300 relative"
                            >
                                <h3 className="text-xl font-bold mb-2">{note.title}</h3>
                                <p className="text-gray-700 mb-4">
                                    {note.content.length > 100 ? (
                                        <>
                                            {note.content.substring(0, 100)}
                                            <button
                                                onClick={() => router.push(`/notes/details/${note._id}`)}
                                                className="text-blue-500 flex"
                                            >
                                                See more ...
                                            </button>
                                        </>
                                    ) : (
                                        note.content
                                    )}
                                </p>
                                <p
                                    className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                                        note.importance === "high" ? "bg-red-400 text-red-900" :
                                        note.importance === "medium" ? "bg-yellow-400 text-yellow-900" :
                                        "bg-green-300 text-green-900"
                                    }`}
                                >
                                    {note.importance.charAt(0).toUpperCase() + note.importance.slice(1)} ⭐
                                </p>
                                <p className="text-gray-500 mt-4">
                                    📅 {note.dueDate ? new Date(note.dueDate).toLocaleDateString() : 'No date'}
                                </p>
                                <div className="mt-4 flex justify-between items-center">
                                    <button
                                        onClick={() => router.push(`/notes/${note._id}`)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors duration-300 flex items-center"
                                    >
                                        <FiEdit3 className="mr-2" /> Update ✏️
                                    </button>
                                    <button
                                        onClick={() => deleteNote(note._id)}
                                        className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-900 transition-colors duration-300 flex items-center"
                                    >
                                        <FiTrash2 className="mr-2" /> Delete 🗑️
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Paginación */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={() => fetchNotes(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-black hover:bg-blue-900 transition-colors duration-300'}`}
                    >
                        <FiChevronLeft /> Previous
                    </button>
                    <p className="text-gray-600">Page {currentPage} of {totalPages}</p>
                    <button
                        onClick={() => fetchNotes(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-black hover:bg-blue-950 transition-colors duration-300'}`}
                    >
                        Next <FiChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteList;
