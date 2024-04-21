"use client";
import { useState } from "react";

import BookTable from "@/components/books/table";
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
    if (updatedBooks.some((book) => book.selected)) setShowDeleteButton(true);
    else setShowDeleteButton(false);
  };

  const handleSelectAllChange = () => {
    const updatedBooks = books.map((book) => ({
      ...book,
      selected: !selectAll,
    }));

    setBooks(updatedBooks);
    setSelectAll(!selectAll);
    if (!selectAll) setShowDeleteButton(true);
    else setShowDeleteButton(false);
  };

  return (
    <div className="tw-container tw-mx-auto tw-mt-8 ">
      <div className=" tw-shadow-md tw-rounded tw-px-8 tw-py-6 tw-bg-white ">
        <div className="tw-flex tw-justify-between tw-mb-6">
          <div className="">
            <h1 className="tw-text-2xl tw-font-semibold tw-border-8">Books Page</h1>
            
          </div>
          
          <UploadForm handleUpload={handleUpload} />
          
          <DeleteButton
            showDeleteButton={showDeleteButton}
            handleDelete={handleDelete}
          />
        </div>
        

        <BookTable
          books={books}
          handleCheckboxChange={handleCheckboxChange}
          handleLike={handleLike}
          handleSelectAllChange={handleSelectAllChange}
        />
      </div>
    </div>
  );
}
