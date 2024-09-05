"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/menu/Sidebar";
import {
  FaTag,
  FaCalendarAlt,
  FaExclamationCircle,
  FaFileAlt,
  FaHeading,
} from "react-icons/fa";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [importance, setImportance] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const createNote = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const newNote = {
        title,
        content,
        status: "pending",
        importance,
        dueDate,
        tags,
      };
      await axios.post("http://localhost:3000/api/notes", newNote);
      router.push("/notes/show");
    } catch (error) {
      setError("Error creando la nota. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar/>

      {/* Main content */}
      <div className="flex-grow p-8 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
        <article className="flex justify-center items-center flex-col select-none">
          {/* Header */}
          <section className="flex flex-col gap-4 border-b-2 border-blue-300">
            <h4 className="font-bold text-4xl bg-clip-text">
              📝 Create New Note
            </h4>
            <p className="font-semibold text-xl mb-2">
              Complete the fields to create a new note.
            </p>
          </section>

          {/* Form container */}
          <section className="w-full md:w-3/4 lg:w-1/2 flex justify-center items-center mt-8 bg-white shadow-lg rounded-2xl p-6">
            <form
              onSubmit={createNote}
              className="w-full md:w-11/12 lg:w-10/12 flex flex-col gap-6"
            >
              {/* Form fields */}
              <div>
                <label className="text-xl font-semibold flex items-center gap-2">
                  <FaHeading /> Note title
                </label>
                <input
                  name="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:border-blue-300"
                  placeholder="Write the title of the note"
                  required
                />
              </div>

              <div>
                <label className="text-xl font-semibold flex items-center gap-2">
                  <FaFileAlt /> Content of the note
                </label>
                <textarea
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="border-2 border-gray-300 p-3 w-full h-40 rounded-md focus:outline-none focus:border-blue-300"
                  placeholder="Write the content of the note"
                  required
                />
              </div>

              {/* Grid layout for importance, due date, and tags */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xl font-semibold flex items-center gap-2">
                    <FaExclamationCircle /> Importance
                  </label>
                  <select
                    name="importance"
                    value={importance}
                    onChange={(e) => setImportance(e.target.value)}
                    className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:border-blue-300"
                  >
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                  </select>
                </div>

                <div>
                  <label className="text-xl font-semibold flex items-center gap-2">
                    <FaCalendarAlt /> Deadline
                  </label>
                  <input
                    name="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:border-blue-300"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xl font-semibold flex items-center gap-2">
                    <FaTag /> Tags (comma separated)
                  </label>
                  <input
                    name="tags"
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value.split(',')[0])}
                    className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:border-blue-300"
                    placeholder="Add comma-separated tags"
                  />
                </div>
              </div>

              {/* Error message */}
              {error && <p className="text-red-500">{error}</p>}

              {/* Submit button */}
              <button
                type="submit"
                className="mt-4 bg-blue-400 hover:bg-blue-700 duration-300 text-white text-xl font-semibold p-3 rounded-md w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Note"}
              </button>
            </form>
          </section>
        </article>
      </div>
    </div>
  );
};

export default CreateNote;
