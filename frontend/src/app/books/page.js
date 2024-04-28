'use client'
import { useEffect, useState } from "react";

import BookTable from "@/components/books/table";
import DeleteButton from "@/components/books/deleteButton";
import UploadForm from "@/components/books/uploadForm";
import { fetchBooks, saveBook, deleteBook } from "@/lib/actions";

// Main Page component
export default function Page() {
  const [books, setBooks] = useState([]);

  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchBooks();
      const data = response.map((book) => ({
        id: book.id,
        name: book.title,
        uploadedAt: book.created_at,
        pages: book.pages,
        selected: false,
      }));
      setBooks(data);
    };
    fetchData();
  }, []);

  const handleUpload = async (event) => {
    try {
      // Retrieve uploaded file
      const file = event.target.files[0];
      const form = new FormData();
      form.append("file", file);
      await saveBook(form).then((response) => {
        console.log(response);
      });
      console.log("Uploaded file:", file);
      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDelete = async () => {
    const selectedBooks = books.filter((book) => book.selected);
    setBooks(books.filter((book) => !book.selected));
    selectedBooks.forEach( async(book) => {
      await deleteBook(book.id);
    });
  
    setSelectAll(false);
    setShowDeleteButton(false);
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
    setSelectAll(updatedBooks.every((book) => book.selected));
    setShowDeleteButton(updatedBooks.some((book) => book.selected));
  };

  const handleSelectAllChange = () => {
    const updatedSelectAll = !selectAll;
    const updatedBooks = books.map((book) => ({
      ...book,
      selected: updatedSelectAll,
    }));

    setBooks(updatedBooks);
    setSelectAll(updatedSelectAll);
    setShowDeleteButton(updatedSelectAll);
  };

  return (
    <div className="tw-container tw-mx-auto tw-mt-8 ">
      <div className=" tw-shadow-md tw-rounded tw-px-8 tw-py-6 tw-bg-white ">
        <div className="tw-flex tw-justify-between tw-mb-6">
          <div className="">
            <h1 className="tw-text-2xl tw-font-semibold tw-border-8">
              Books Page
            </h1>
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
          selectAll={selectAll} // Pass selectAll state to BookTable component
        />
      </div>
    </div>
  );
}
