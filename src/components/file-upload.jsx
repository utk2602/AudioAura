import { useState, useRef } from "react";
import Button from "./Button";
import { Music2, Upload } from "lucide-react";

export default function FileUpload({ onFileUpload }) {
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileUpload(file); // Pass the actual file here
    }
  };

  const handleButtonClick = () => {
    // Trigger the hidden file input when the button is clicked
    fileInputRef.current?.click();
  };

  return (
    <div className="text-center">
      {/* Hidden file input */}
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      {/* Button that triggers the file input */}
      <Button
        onClick={handleButtonClick} // This will trigger file input
        className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
        size="lg"
      >
        {fileName ? <Music2 className="mr-2 h-5 w-5" /> : <Upload className="mr-2 h-5 w-5" />}
        {fileName ? "Change Track" : "Upload Your Audio"}
      </Button>

      {/* Display the selected file name */}
      {fileName && (
        <p className="mt-4 text-sm text-cyan-400 flex items-center justify-center">
          <Music2 className="mr-2 h-4 w-4" />
          <span>Selected: {fileName}</span>
        </p>
      )}
    </div>
  );
}
