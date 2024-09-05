"use client";

import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';
import Sidebar from '@/menu/Sidebar';

const EditNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [importance, setImportance] = useState('medium');
    const [dueDate, setDueDate] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();
    const { id } = useParams();  // Captura del id desde la URL

    useEffect(() => {
        const fetchNote = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://system-notes.vercel.app/api/notes/${id}`);
                const note = response.data;
                console.log(note);
                setTitle(note.title);
                setContent(note.content);
                setImportance(note.importance);
                setDueDate(note.dueDate);
            } catch (error) {
                setError('Error fetching note data. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    const updateNote = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const updatedNote = { title, content, importance, dueDate };
            await axios.put(`https://system-notes.vercel.app/api/notes/${id}`, updatedNote);
            router.push('/notes/show');
        } catch (error) {
            setError('Error updating note. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-grow p-8">
                <article className="flex justify-center items-center flex-col select-none">
                    <section className="flex flex-col gap-4 border-b-2 border-blue-400">
                        <h4 className="font-bold text-5xl">✏️ Edit Note</h4>
                        <p className="font-semibold text-xl mb-4 text-gray-600">Modify the required fields and save the changes.</p>
                    </section>

                    <section className="w-full max-w-3xl mt-8 bg-white shadow-md rounded-xl p-6">
                        {error && <p className="text-red-500">{error}</p>}
                        <form onSubmit={updateNote} className="flex flex-col gap-6">
                            <input
                                name="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-400"
                                placeholder="Title of the note"
                                required
                            />
                            <textarea
                                name="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-400 h-36"
                                placeholder="Content of the note"
                                required
                            />
                            <div className="flex gap-4">
                                <select
                                    name="importance"
                                    value={importance}
                                    onChange={(e) => setImportance(e.target.value)}
                                    className="border-2 border-gray-300 p-3 w-1/2 rounded-lg focus:outline-none focus:border-blue-400"
                                >
                                    <option value="low">low</option>
                                    <option value="medium">medium</option>
                                    <option value="high">high</option>
                                </select>
                                <input
                                    name="dueDate"
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="border-2 border-gray-300 p-3 w-1/2 rounded-lg focus:outline-none focus:border-blue-400"
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg transition duration-300"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Keeping ...' : 'Update note'}
                            </button>
                        </form>
                    </section>
                </article>
            </div>
        </div>
    );
};

export default EditNote;
