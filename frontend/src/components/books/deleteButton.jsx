
// DeleteButton component
const DeleteButton = ({ showDeleteButton, handleDelete }) => (
    showDeleteButton && (
      <button
        onClick={handleDelete}
        className="tw-text-white tw-h-10 tw-rounded tw-shadow tw-shadow-slate-700  tw-bg-gradient-to-r tw-from-red-600 tw-to-pink-600 hover:tw-from-red-400 hover:tw-to-pink-400"
      >
        Delete Selected
      </button>
    )
  );
export default DeleteButton;