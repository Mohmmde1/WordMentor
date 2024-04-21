import BookTableRow from "@/components/books/row";

// BookTable component
const BookTable = ({
  books,
  handleCheckboxChange,
  handleLike,
  selectAll,
  handleSelectAllChange,
}) => (
  <table className="table  tw-text-white tw-w-full tw-text-sm tw-text-left rtl:tw-text-right  dark:tw-text-gray-400 ">
    <caption className="tw-text-sm tw-mb-4">
      List of Books
    </caption>
    <thead className="tw-text-xs tw-rounded tw-text-gray-700  tw-uppercase dark:tw-bg-gray-700 dark:tw-text-gray-400">
      <tr>
        <th className="tw-px-4 tw-py-2">Name</th>
        <th className="tw-px-4 tw-py-2">Uploaded At</th>
        <th className="tw-px-4 tw-py-2">
          <span className="tw-sr-only">Action</span>
        </th>
        <th className="tw-px-4 tw-py-2 ">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAllChange}
            className="tw-m-2 tw-w-4 tw-h-4 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300 tw-rounded focus:tw-ring-blue-500 dark:focus:tw-ring-blue-600 dark:tw-ring-offset-gray-800 dark:focus:tw-ring-offset-gray-800 focus:tw-ring-2 dark:tw-bg-gray-700 dark:tw-border-gray-600 tw-justify-end"
          />
        </th>
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
