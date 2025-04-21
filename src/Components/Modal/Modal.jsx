"use client";

const Modal = ({ onClose, data }) => {
  const { title, desc, createdBy, date } = data;
  console.log(desc, "note");
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-xl w-[90%] max-w-md relative">
        <button
          className="absolute top-2 right-3 text-black text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          {title}
        </h2>
        <p className="text-gray-600">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default Modal;
