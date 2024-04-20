// BookTableRow.jsx
import React from 'react';

const BookTableRow = ({ book, handleCheckboxChange, handleLike }) => (
  <tr className="tw-bg-white dark:tw-bg-gray-800  hover:tw-bg-gray-50 dark:hover:tw-bg-gray-600">
    <td className=" tw-px-4 tw-py-2">{book.name}</td>
    <td className=" tw-px-4 tw-py-2">{book.uploadedAt}</td>
    <td className=" tw-px-4 tw-py-2">
      <button
        onClick={() => handleLike(book.id)}
        className="tw-bg-gradient-to-r tw-from-cyan-500 tw-to-blue-500 hover:tw-from-cyan-400 hover:tw-to-blue-400 tw-text-white tw-py-1 tw-px-2 tw-rounded tw-mr-2"
      >
        Select Pages
      </button>
      
    </td>
    <td className="tw-px-4 tw-py-2 ">
      <input
        type="checkbox"
        checked={book.selected}
        onChange={() => handleCheckboxChange(book.id)}
        className="tw-m-2 tw-w-4 tw-h-4 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300 tw-rounded focus:tw-ring-blue-500 dark:focus:tw-ring-blue-600 dark:tw-ring-offset-gray-800 dark:focus:tw-ring-offset-gray-800 focus:tw-ring-2 dark:tw-bg-gray-700 dark:tw-border-gray-600 tw-justify-end"
      />
    </td>
  </tr>
);

export default BookTableRow;
