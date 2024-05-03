'use client'
import {saveBook} from "@/lib/actions";
// UploadForm component
const UploadForm = ({ handleUpload }) => (
    <form>
      <label htmlFor="file-upload" className="tw-text-white tw-cursor-pointer  tw-py-2 tw-px-4 tw-rounded tw-bg-gradient-to-r tw-from-sky-700 tw-to-pink-700 hover:tw-from-sky-400 hover:tw-to-pink-400 hover:tw-text-white">
        Upload
      </label>
      <input
        id="file-upload"
        type="file"
        className="tw-hidden"
        onChange={handleUpload}
      />
    </form>
  );  
  
export default UploadForm;