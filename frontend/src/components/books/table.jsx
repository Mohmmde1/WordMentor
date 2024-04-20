import BookTableRow from "@/components/books/row";

// BookTable component
const BookTable = ({ books, handleCheckboxChange, handleLike }) => (

    <table className="table tw-w-full tw-text-sm tw-text-left rtl:tw-text-right tw-text-gray-500 dark:tw-text-gray-400 tw-border-none">
      <caption className="tw-text-gray-500 tw-text-sm tw-mb-4">List of Books</caption>
      <thead className="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50 dark:tw-bg-gray-700 dark:tw-text-gray-400">
        <tr>
          <th className="tw-px-6 tw-py-3">Name</th>
          <th className="tw-px-6 tw-py-3">Uploaded At</th>
          <th className="tw-px-6 tw-py-3"><span className="tw-sr-only">Action</span></th>
          <th className="tw-px-6 tw-py-3 "></th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <BookTableRow
            key={book.id}
            book={book}
            handleCheckboxChange={handleCheckboxChange}
            handleLike={handleLike}

          />
        ))}
      </tbody>
    </table>
  );
  
export default BookTable;