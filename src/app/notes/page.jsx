"use client"
import React, { useEffect, useState } from "react";
import { useDeleteNote, useNotes } from "@/Apis/Notes";
import Modal from "@/Components/Modal/Modal";
import { useLogout } from "@/Apis/Auth";
import AddNotes from "@/Components/Modal/AddNotes";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditNotes from "@/Components/Modal/EditNotes";


const Page = () => {

  const [user, setUser] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [isEditNoteOpen, setIsEditNoteOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [selectedNote, setSelectedNote] = useState({
    title: "",
    desc: "",
    createdBy: "",
    date: "",
  });

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(10);  

  const { data, isLoading, error } = useNotes(page, limit);

  const logoutMutation = useLogout();
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const deleteNoteMutation = useDeleteNote();
  const HandleDeleteNote = (id) => {
    deleteNoteMutation.mutate(id);
  }

  const handleOpen = (title, createdBy, date, desc) => {
    setSelectedNote({
      title,
      createdBy,
      date,
      desc,
    });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedNote({
      title: "",
      createdBy: "",
      desc: "",
      date: "",
    });
  };

  const toggleNoteAddModal = () => {
    setIsAddNoteOpen(() => !isAddNoteOpen)
  }

  const openEditModal = (item) => {
    setEditData(item);
    setIsEditNoteOpen(true)
  }

  const closeEditModal= () => {
    setEditData(null);
    setIsEditNoteOpen(false)    
  }

  const nextPage = () => {
    if (data?.currentPage < data?.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (data?.currentPage > 1) {
      setPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <p>Redirecting to login...</p>; // or show spinner
  }


  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-screen h-screen flex flex-col overflow-x-hidden">
      <div className="w-full bg-white border-b border-b-blue-600 shadow-2xl px-10 py-6">
        <div className="flex justify-between">
          <h1 className="text-3xl text-black font-semibold">MY NOTES</h1>
          
          <div className="flex gap-5">
          <h3
            onClick={toggleNoteAddModal}
            className="text-2xl text-black font-semibold cursor-pointer"
            >
          Add Notes
          </h3>
          <h3
            onClick={handleLogout}
            className="text-2xl text-black font-semibold cursor-pointer"
            >
            Logout
          </h3>
            </div>
        </div>
      </div>

<div className="relative grid grid-cols-5 gap-6 px-10 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 py-10">
  {data?.data.map((note, index) => (
    <div
      key={`notes${index}`}
      onClick={() => handleOpen(note.title, note.createdBy, note.date, note.desc)}
      className="relative rounded-3xl border border-blue-600 p-4 flex flex-col cursor-pointer hover:bg-blue-50 transition"
    >
      {/* Edit + Delete Icons */}
      {note.createdBy._id === user._id && (
        <div className="absolute top-3 right-3 flex gap-2 z-10" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => openEditModal(note)}
            className="text-blue-600 hover:text-blue-800"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => HandleDeleteNote(note._id)}
            className="text-red-600 hover:text-red-800"
          >
            <FaTrash />
          </button>
        </div>
      )}

      {/* Note content */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-black">{note.title}</h2>
        <div className="flex items-center justify-between">
          <p className="text-base font-medium text-gray-500">
            {new Date(note.createdAt).toLocaleDateString("en-GB")}
          </p>
          <p className="text-base font-medium text-gray-500">
            Created By: {note.createdBy.username}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>


      {data?.totalPages > 1 && (
        <div className="flex justify-between px-10 py-4">
          <button onClick={prevPage} disabled={page === 1}>
            Previous
          </button>
          <span>
            Page {data?.currentPage} of {data?.totalPages}
          </span>
          <button onClick={nextPage} disabled={page === data?.totalPages}>
            Next
          </button>
        </div>
      )}

      {isOpen && selectedNote && (
        <Modal data={selectedNote} onClose={handleClose} />
      )}
      {isAddNoteOpen && (
        <AddNotes  onClose={toggleNoteAddModal} />
      )}
      {isEditNoteOpen && editData && (
        <EditNotes  onClose={closeEditModal} editData={editData} />
      )}
    </div>
  );
};

export default Page;
