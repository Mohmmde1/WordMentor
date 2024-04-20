'use client'
import { useState } from "react";

import BookTable  from "@/components/books/table";
import DeleteButton from "@/components/books/deleteButton";
import UploadForm from "@/components/books/uploadForm";



// Main Page component
export default function Page() {
  const [books, setBooks] = useState([
    { id: 1, name: "Book 1", uploadedAt: "2022-04-20", selected: false },
    { id: 2, name: "Book 2", uploadedAt: "2022-04-21", selected: false },
    { id: 3, name: "Book 3", uploadedAt: "2022-04-22", selected: false },
  ]);

  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleUpload = (event) => {
    // Prevent default form submission
    event.preventDefault();

    // Retrieve uploaded file
    const file = event.target.files[0];
    
    // Here you can implement logic to handle the uploaded file
    console.log("Uploaded file:", file);
  };

  const handleDelete = () => {
    setBooks(books.filter((book) => !book.selected));
    setSelectAll(false);
  };

  const handleLike = (id) => {
    // Your like logic here
    console.log(`Book with id ${id} liked`);
  };

  const handleCheckboxChange = (id) => {
    const updatedBooks = books.map((book) =>
      book.id === id ? { ...book, selected: !book.selected } : book
    );
    setBooks(updatedBooks);
    if(updatedBooks.some((book) => book.selected)) setShowDeleteButton(true);
    else setShowDeleteButton(false);
  };

  const handleSelectAllChange = () => {
    const updatedBooks = books.map((book) => ({
      ...book,
      selected: !selectAll,
    }));
    
    setBooks(updatedBooks);
    setSelectAll(!selectAll);
    if(!selectAll) setShowDeleteButton(true);
    else setShowDeleteButton(false);
  };

  return (
    <div className="tw-container tw-mx-auto tw-mt-8">
      <div className="tw-bg-white tw-shadow-md tw-rounded tw-px-8 tw-py-6">
        <div className="tw-flex tw-justify-between tw-mb-6">
          <div>
            <h1 className="tw-text-2xl tw-font-semibold">Books Page</h1>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
              className='tw-m-2 tw-w-4 tw-h-4 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300 tw-rounded focus:tw-ring-blue-500 dark:focus:tw-ring-blue-600 dark:tw-ring-offset-gray-800 dark:focus:tw-ring-offset-gray-800 focus:tw-ring-2 dark:tw-bg-gray-700 dark:tw-border-gray-600'
            />
            <label htmlFor="select-all" className="tw-text-sm tw-text-gray-500 tw-cursor-pointer">
              Select All
            </label>
          </div>
          <UploadForm handleUpload={handleUpload} />
          <DeleteButton showDeleteButton={showDeleteButton} handleDelete={handleDelete} />
        </div>
        
        <BookTable
          books={books}
          handleCheckboxChange={handleCheckboxChange}
          handleLike={handleLike}
        />
      </div>
    </div>
  );
}
