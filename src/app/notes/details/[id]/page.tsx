"use client";

import { useCallback } from "react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiEdit3, FiTrash2 } from "react-icons/fi";
import Sidebar from "@/menu/Sidebar";

// Define la estructura de las notas
interface Note {
  _id: string;
  title: string;
  content: string;
  importance: "high" | "medium" | "low";
  dueDate?: string;
  tags?: string[];
}

// Define la estructura de params
interface Params {
  id: string;
}


const NoteDetails = ({ params }: { params: Params }) => {
  const [note, setNote] = useState<Note | null>(null);
  const router = useRouter();

  const fetchNoteDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://system-notes.vercel.app/api/notes/${params.id}`
      );
      setNote(response.data);
    } catch (error) {
      console.error("Error fetching note details:", error);
    }
  }, [params.id]);

  useEffect(() => {
    fetchNoteDetails();
  }, [fetchNoteDetails]);

  const deleteNote = async () => {
    try {
      await axios.delete(`https://system-notes.vercel.app/api/notes/${params.id}`);
      router.push("/notes");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  if (!note) {
    return <p>Cargando nota...</p>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-16 p-8 w-full">
        <button
          onClick={() => router.push("/notes/show")}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-300 flex items-center mb-6"
        >
          <FiArrowLeft className="mr-2" /> Return to
        </button>
        <div className="bg-slate-200 p-6 rounded-xl shadow-md">
          <h2 className="text-4xl font-bold mb-4">{note.title}</h2>
          <p className="text-gray-700 mb-4">{note.content}</p>
          <p
            className={`inline-block px-4 py-2 text-sm font-semibold rounded-full ${
              note.importance === "high"
                ? "bg-red-400 text-red-900"
                : note.importance === "medium"
                ? "bg-yellow-400 text-yellow-900"
                : "bg-green-300 text-green-900"
            }`}
          >
            {note.importance.charAt(0).toUpperCase() + note.importance.slice(1)}{" "}
            ⭐
          </p>
          <p className="text-gray-500 mt-4">
            📅{" "}
            {note.dueDate
              ? new Date(note.dueDate).toLocaleDateString()
              : "No date"}
          </p>
          {note.tags && note.tags.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Tags:</h3>
              <div className="flex flex-wrap">
                {note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mr-2 mb-2"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => router.push(`/notes/${note._id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors duration-300 flex items-center"
            >
              <FiEdit3 className="mr-2" /> Update ✏️
            </button>
            <button
              onClick={deleteNote}
              className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-900 transition-colors duration-300 flex items-center"
            >
              <FiTrash2 className="mr-2" /> Delete 🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetails;
