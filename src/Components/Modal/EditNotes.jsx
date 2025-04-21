"use client";

import { useCreateNote, useUpdateNote } from "@/Apis/Notes";
import { useState } from "react";

const EditNotes = ({ onClose, editData }) => {
  const [title, setTitle] = useState(editData.title);
  const [desc, setDesc] = useState(editData.desc);

  const updateNote = useUpdateNote(onClose);

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) {
      alert("Please fill in all fields");
      return;
    }
    updateNote.mutate({ id: editData._id, title, desc });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-xl w-[90%] max-w-md relative">
        <button
          className="absolute top-2 right-3 text-black text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Add Note</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
          >
            {updateNote.isLoading ? "Updating..." : "Update Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditNotes;
